import { hostname, networkInterfaces } from 'node:os'
import { isIP } from 'node:net'
import { randomBytes } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import type { ControlResult } from './control-result.js'
import { parseLanConfig, resolveConfig, type Config, type ConfigInput, type ResolvedConfig } from './config.js'
import {
  ClientModeError,
  type ClientModeRuntime,
  type HostConnectionHandle,
  type HostAuthorizationControl,
} from './client-runtime.js'
import { IdentityStore, serverStorageDirectory } from './identity-store.js'
import { ClientServerApi, HostServerApi } from './server-api.js'
import { ServerCredentialStore } from './server-credentials.js'
import { registerControlRoute, type HostWebServerLike } from './control-route.js'
import { ControlStatusStream } from './control-stream.js'
import { codexBinaryCandidates } from './codex/domain.js'
import { cursorBinaryCandidates } from './acp/gateway.js'

export interface PluginSettingsView {
  config: Config
  deviceName: string
  writable: boolean
  applies: 'live' | 'restart'
  association?: PluginAssociation
  associations: Partial<Record<'host' | 'client', PluginAssociation>>
  acpAvailability?: Record<string, boolean>
}

export interface PluginAssociation {
  method: 'account' | 'host_registration_code' | 'owned_device'
  account?: string
}

/**
 * Live read/write face of the plugin's profile-owned entry Config.
 *
 * DSH 0.1.7-rc.1 (DSH-0.1.7-RC1-04) removed the settings-namespace registry
 * and its scope type: the entry's editable fields are a single
 * `.volatile()` Cordis Config, read through `.get()`, and writes go to
 * `ctx.settings.replace(entryId, section)` (persisted in the active profile's
 * `cordis.patch.yml` under the entry id).
 */
export interface PluginSettingsBinding {
  /** The current config, read from the entry's live volatile reference. */
  get(): ConfigInput
  /** Replace the entry's editable fields in the active profile. */
  replace(section: Config): Promise<void>
}

/** Loopback-only control plane shared by Local/Remote switching and plugin setup. */
export class PluginControlRuntime {
  private logoutFlight?: Promise<PluginSettingsView>
  private serverSwitchFlight?: Promise<PluginSettingsView>
  // A non-rejecting tail keeps a failed save from poisoning later retries.
  private lanSettingsTail: Promise<void> = Promise.resolve()
  private lanConfigError?: 'LAN_CONFIG_APPLY_FAILED' | 'LAN_CONFIG_ROLLBACK_FAILED'

  constructor(
    private config: ResolvedConfig,
    private readonly identityDirectory: string,
    private readonly settings: PluginSettingsBinding | undefined,
    private client: ClientModeRuntime | undefined,
    private host: HostAuthorizationControl | undefined,
    private readonly switchServer?: (config: ResolvedConfig) => Promise<{
      client: ClientModeRuntime | undefined
      host: HostAuthorizationControl
    }>,
    private readonly onRemoteToolsChanged?: (enabled: boolean) => void | Promise<void>,
  ) {
    this.config = { ...config, serverUrl: undefined }
  }

  private currentConfig(): ResolvedConfig {
    // Legacy account configuration and DSH_REMOTE_SERVER never enable a Server.
    return { ...resolveConfig(this.settings?.get() ?? this.config), serverUrl: undefined }
  }

  register(connection: HostConnectionHandle, webServer?: HostWebServerLike): () => Promise<void> {
    const statusStream = new ControlStatusStream(() => this.streamStatus())
    return registerControlRoute(
      connection,
      (endpoint, payload, signal) => this.handle(endpoint, payload, signal),
      webServer,
      statusStream,
    )
  }

  /**
   * Read the value the status event stream pushes. It resolves through the same
   * endpoint handler as the unary `status` control call, so a pushed status and
   * a polled one can never diverge.
   */
  private async streamStatus(): Promise<unknown> {
    const result = await this.handle('status', {}, new AbortController().signal)
    if (!result.ok) throw new ClientModeError('STATUS_UNAVAILABLE', result.error.message)
    return result.value
  }

  private async handle(endpoint: string, payload: unknown, signal: AbortSignal): Promise<ControlResult<unknown>> {
    try {
      // Enqueue before awaiting anything: concurrent saves preserve arrival order.
      if (endpoint === 'lan.settings.set') return ok(await this.setLanSettings(payload))
      await this.lanSettingsTail
      // A request arriving during replacement must not reference a closed runtime.
      if (endpoint !== 'settings.server.set') await this.serverSwitchFlight
      if (endpoint === 'lan.settings.get') return ok(this.lanSettingsView())
      if (endpoint === 'settings.configure' || endpoint === 'settings.server.set' || endpoint === 'settings.role.set'
        || endpoint === 'settings.logout' || endpoint.startsWith('client.account.')
        || endpoint.startsWith('host.account.') || endpoint.startsWith('host.registration-code.')) {
        throw new ClientModeError('METHOD_NOT_ALLOWED', 'LAN connections use IP and port; account registration is unavailable.')
      }
      if (endpoint === 'settings.development.set') return ok(await this.setDevelopment(payload))
      if (endpoint === 'settings.get') return ok(await this.settingsView())
      if (endpoint === 'settings.configure') return ok(await this.configure(payload))
      if (endpoint === 'settings.server.set') return ok(await this.setServer(payload))
      if (endpoint === 'settings.role.set') return ok(await this.setRole(payload))
      if (endpoint === 'settings.codex.set') return ok(await this.setCodex(payload))
      if (endpoint === 'settings.cursor.set') return ok(await this.setCursor(payload))
      if (endpoint === 'settings.acp.set') return ok(await this.setAcp(payload))
      if (endpoint === 'settings.acp.add') return ok(await this.addAcp(payload))
      if (endpoint === 'settings.acp.remove') return ok(await this.removeAcp(payload))
      if (endpoint === 'settings.logout') return ok(await this.logout())
      if (endpoint === 'host.authorization.set' && this.client !== undefined) {
        const value = record(payload)
        if (typeof value.enabled !== 'boolean') throw new ClientModeError('INVALID_MESSAGE', 'Host authorization state is required.')
        const status = await this.client.setHostAuthorization(value.enabled)
        if (this.settings !== undefined) {
          const current = this.currentConfig()
          await this.settings.replace(editableConfig({ ...current, hostControl: { enabled: value.enabled } }))
        }
        return ok(status)
      }
      if (endpoint === 'host.reconnect') {
        if (this.host === undefined) throw new ClientModeError('METHOD_NOT_ALLOWED', 'This plugin is not running as a Host.')
        this.host.reconnectHost()
        return ok(this.hostOnlyStatus())
      }
      if (this.client !== undefined) return this.client.handleControl(endpoint, payload, signal)

      if (endpoint === 'status') return ok(this.hostOnlyStatus())
      if (endpoint === 'devices') return ok([])
      if (endpoint === 'host.account.login') {
        if (this.host === undefined) throw new ClientModeError('METHOD_NOT_ALLOWED', 'This plugin is not running as a Host.')
        const value = record(payload)
        if (typeof value.email !== 'string' || typeof value.password !== 'string') {
          throw new ClientModeError('INVALID_MESSAGE', 'Email and password are required.')
        }
        return ok(await this.host.authorizeHostWithAccount(value.email, value.password))
      }
      if (endpoint === 'host.registration-code.submit') {
        if (this.host === undefined) throw new ClientModeError('METHOD_NOT_ALLOWED', 'This plugin is not running as a Host.')
        const value = record(payload)
        if (typeof value.code !== 'string' || value.code.trim() === '') {
          throw new ClientModeError('INVALID_MESSAGE', 'A Host registration code is required.')
        }
        return ok(await this.host.authorizeHostWithCode(value.code))
      }
      if (endpoint === 'mode.set' && record(payload).mode === 'local') return ok(this.hostOnlyStatus())
      throw new ClientModeError('METHOD_NOT_ALLOWED', 'Remote Client mode is disabled by the plugin role.')
    } catch (error) {
      return fail(error)
    }
  }

  private lanSettingsView() {
    const current = this.currentConfig()
    return {
      config: current.lan,
      interfaces: Object.entries(networkInterfaces()).flatMap(([name, addresses]) =>
        (addresses ?? []).filter(address => isIP(address.address) !== 0).map(address => ({
          name, address: address.address, family: address.family, internal: address.internal,
        }))),
      writable: this.settings !== undefined && this.switchServer !== undefined,
      ...(this.lanConfigError === undefined ? {} : { error: this.lanConfigError }),
    }
  }

  private setLanSettings(payload: unknown): Promise<ReturnType<PluginControlRuntime['lanSettingsView']>> {
    const task = this.lanSettingsTail.then(() => this.applyLanSettings(payload))
    this.lanSettingsTail = task.then(() => undefined, () => undefined)
    return task
  }

  private async applyLanSettings(payload: unknown): Promise<ReturnType<PluginControlRuntime['lanSettingsView']>> {
    if (this.settings === undefined || this.switchServer === undefined) {
      throw new ClientModeError('SETTINGS_UNAVAILABLE', 'LAN settings are unavailable in this profile.')
    }
    const current = this.currentConfig()
    const values = record(payload)
    if (typeof values.accessToken === 'string' && values.accessToken !== '' && values.accessToken.trim().length < 16) {
      throw new ClientModeError('LAN_TOKEN_TOO_SHORT', 'Access token must contain at least 16 characters, excluding leading and trailing spaces.')
    }
    let lan
    try {
      const token = values.accessToken === '' || values.accessToken === undefined
        ? current.lan.accessToken || randomBytes(32).toString('base64url')
        : values.accessToken
      lan = parseLanConfig({ ...current.lan, ...values, accessToken: token })
    } catch {
      // Schema diagnostics may include credentials: never return raw input/errors.
      throw new ClientModeError('INVALID_MESSAGE', 'The LAN configuration is invalid.')
    }
    if (lan.accessToken === '') lan.accessToken = current.lan.accessToken || randomBytes(32).toString('base64url')
    const next = { ...resolveConfig({ ...editableConfig(current), lan }), serverUrl: undefined }
    let switchAttempted = false
    try {
      await this.settings.replace(editableConfig(next))
      switchAttempted = true
      const runtimes = await this.switchServer(next)
      this.client = runtimes.client
      this.host = runtimes.host
      this.config = next
      this.lanConfigError = undefined
      return this.lanSettingsView()
    } catch {
      // Persistence may have partially committed even when replace rejects.
      try {
        await this.settings.replace(editableConfig(current))
        if (switchAttempted) {
          const restored = await this.switchServer(current)
          this.client = restored.client
          this.host = restored.host
        }
        this.config = current
      } catch {
        // Never dispatch through stale, possibly closed authorities. A later save
        // still invokes switchServer, allowing recovery without profile edits.
        const client = this.client
        const host = this.host as (HostAuthorizationControl & { close?: () => Promise<void> }) | undefined
        this.client = undefined
        this.host = undefined
        await Promise.allSettled([client?.close(), host?.close?.()])
        this.lanConfigError = 'LAN_CONFIG_ROLLBACK_FAILED'
        throw new ClientModeError('LAN_CONFIG_ROLLBACK_FAILED', 'LAN configuration failed and recovery failed. Dependent control runtimes are stopped; save LAN settings again to retry.')
      }
      this.lanConfigError = 'LAN_CONFIG_APPLY_FAILED'
      throw new ClientModeError('LAN_CONFIG_APPLY_FAILED', 'LAN configuration was not applied. The previous configuration was restored; save LAN settings again to retry.')
    }
  }

  private async configure(payload: unknown): Promise<Record<string, unknown>> {
    if (this.settings === undefined) {
      throw new ClientModeError('SETTINGS_UNAVAILABLE', 'DSH user settings are unavailable in this profile.')
    }
    const value = record(payload)
    if (value.role !== 'host' && value.role !== 'client') {
      throw new ClientModeError('INVALID_MESSAGE', 'Role must be Host or Client.')
    }
    if (typeof value.serverUrl !== 'string') {
      throw new ClientModeError('INVALID_MESSAGE', 'Server URL is required.')
    }
    const current = editableConfig(this.currentConfig())
    const next = resolveConfig({ ...current, role: value.role, serverUrl: value.serverUrl })

    const identities = new IdentityStore({
      directory: serverStorageDirectory(this.identityDirectory, next.serverUrl!, value.role),
    })
    let identity = await identities.loadOrCreate(hostname())
    const api = value.role === 'host'
      ? new HostServerApi(next.serverUrl!, new ServerCredentialStore(identities.directory))
      : new ClientServerApi(next.serverUrl!, new ServerCredentialStore(identities.directory))
    let authorization
    if (value.role === 'host' && typeof value.registrationCode === 'string' && value.registrationCode.trim() !== '') {
      authorization = await api.authorizeHostWithCode(identity, value.registrationCode)
    } else {
      if (typeof value.email !== 'string' || typeof value.password !== 'string') {
        throw new ClientModeError('INVALID_MESSAGE', 'Email and password are required for account authorization.')
      }
      authorization = await api.authorizeWithAccount(identity, value.email, value.password, async () => {
        identity = await identities.reset(hostname())
        return identity
      })
    }
    if (value.role === 'client' && this.currentConfig().hostControl?.enabled !== false) {
      await this.client?.authorizeHostByDefault()
    }
    await this.settings.replace(editableConfig(next))
    return {
      status: 'authorized',
      role: value.role,
      ...(authorization.account === undefined ? {} : { account: authorization.account }),
      settings: await this.settingsView(),
    }
  }

  private async setServer(payload: unknown): Promise<PluginSettingsView> {
    if (this.serverSwitchFlight !== undefined) {
      throw new ClientModeError('SERVER_SWITCH_BUSY', 'A Server switch is already in progress.')
    }
    const flight = this.applyServer(payload)
    this.serverSwitchFlight = flight
    try {
      return await flight
    } finally {
      if (this.serverSwitchFlight === flight) this.serverSwitchFlight = undefined
    }
  }

  private async applyServer(payload: unknown): Promise<PluginSettingsView> {
    await this.logoutFlight
    if (this.settings === undefined) {
      throw new ClientModeError('SETTINGS_UNAVAILABLE', 'DSH user settings are unavailable in this profile.')
    }
    const value = record(payload)
    if (typeof value.serverUrl !== 'string') {
      throw new ClientModeError('INVALID_MESSAGE', 'Server URL is required.')
    }
    const current = editableConfig(this.currentConfig())
    const next = resolveConfig({ ...current, serverUrl: value.serverUrl })
    await this.settings.replace(editableConfig(next))
    if (this.switchServer !== undefined) {
      if (next.serverUrl !== this.config.serverUrl) {
        const runtimes = await this.switchServer(next)
        this.client = runtimes.client
        this.host = runtimes.host
      }
      this.config = next
      return { ...await this.settingsView(), applies: 'live' }
    }
    return this.settingsView()
  }

  private async setRole(payload: unknown): Promise<PluginSettingsView> {
    if (this.settings === undefined) {
      throw new ClientModeError('SETTINGS_UNAVAILABLE', 'DSH user settings are unavailable in this profile.')
    }
    const role = record(payload).role
    if (role !== 'host' && role !== 'client') {
      throw new ClientModeError('INVALID_MESSAGE', 'Role must be Host or Client.')
    }
    const current = editableConfig(this.currentConfig())
    const currentRole = current.role === 'client' ? 'client' : 'host'
    if (role !== currentRole && current.serverUrl !== undefined
      && await this.association(current.serverUrl, role) === undefined) {
      await this.authorizeOwnedRole(current.serverUrl, currentRole, role)
    }
    await this.settings.replace({ ...current, role })
    return this.settingsView()
  }

  private async setDevelopment(payload: unknown): Promise<PluginSettingsView> {
    if (this.settings === undefined) throw new ClientModeError('SETTINGS_UNAVAILABLE', 'DSH user settings are unavailable in this profile.')
    const value = record(payload)
    if (value.remoteToolsEnabled !== undefined && typeof value.remoteToolsEnabled !== 'boolean') throw new ClientModeError('INVALID_MESSAGE', 'The Remote Tools switch must be a boolean.')
    if (value.terminalEnabled !== undefined && typeof value.terminalEnabled !== 'boolean') throw new ClientModeError('INVALID_MESSAGE', 'The terminal switch must be a boolean.')
    if (value.ports !== undefined && (!Array.isArray(value.ports) || value.ports.some((port) => !Number.isInteger(port)))) throw new ClientModeError('INVALID_MESSAGE', 'Loopback ports must be integers.')
    if (value.terminalEnabled === undefined && value.remoteToolsEnabled === undefined && value.ports === undefined) throw new ClientModeError('INVALID_MESSAGE', 'A development setting is required.')
    const current = editableConfig(this.currentConfig())
    const next = resolveConfig({ ...current,
      terminal: { enabled: value.terminalEnabled === undefined ? (current.terminal?.enabled ?? true) : value.terminalEnabled },
      remoteTools: { enabled: value.remoteToolsEnabled === undefined ? (current.remoteTools?.enabled ?? true) : value.remoteToolsEnabled },
      loopback: { ports: value.ports === undefined ? (current.loopback?.ports ?? []) : value.ports },
    })
    await this.settings.replace(editableConfig(next))
    if (value.remoteToolsEnabled !== undefined) await this.onRemoteToolsChanged?.(value.remoteToolsEnabled)
    if (value.terminalEnabled !== undefined) this.host?.setTerminalEnabled?.(value.terminalEnabled)
    if (value.ports !== undefined) this.host?.setLoopbackPorts?.(value.ports)
    return this.settingsView()
  }

  private async setCodex(payload: unknown): Promise<PluginSettingsView> {
    if (this.settings === undefined) {
      throw new ClientModeError('SETTINGS_UNAVAILABLE', 'DSH user settings are unavailable in this profile.')
    }
    const enabled = record(payload).enabled
    if (typeof enabled !== 'boolean') {
      throw new ClientModeError('INVALID_MESSAGE', 'Codex Remote enabled must be a boolean.')
    }
    return this.setAcp({ backend: 'codex', enabled })
  }

  private async setCursor(payload: unknown): Promise<PluginSettingsView> {
    if (this.settings === undefined) {
      throw new ClientModeError('SETTINGS_UNAVAILABLE', 'DSH user settings are unavailable in this profile.')
    }
    const enabled = record(payload).enabled
    if (typeof enabled !== 'boolean') {
      throw new ClientModeError('INVALID_MESSAGE', 'Cursor Remote enabled must be a boolean.')
    }
    const current = editableConfig(this.currentConfig())
    const next = resolveConfig({
      ...current,
      cursor: { ...current.cursor, enabled },
      acp: {
        enabled: enabled || current.acp?.enabled === true,
        backends: current.acp?.backends?.map(item => item.id === 'cursor' ? { ...item, enabled } : item),
      },
    })
    await this.settings.replace(editableConfig(next))
    await this.host?.setAgentBackends?.(this.currentConfig())
    return { ...await this.settingsView(), applies: 'live' }
  }

  private async setAcp(payload: unknown): Promise<PluginSettingsView> {
    if (this.settings === undefined) throw new ClientModeError('SETTINGS_UNAVAILABLE', 'DSH user settings are unavailable in this profile.')
    const value = record(payload)
    const backend = value.backend
    const enabled = value.enabled
    if (typeof backend !== 'string' || typeof enabled !== 'boolean') throw new ClientModeError('INVALID_MESSAGE', 'ACP backend and enabled are required.')
    const current = this.currentConfig()
    if (!current.acp?.backends.some(item => item.id === backend)) throw new ClientModeError('INVALID_MESSAGE', 'Unknown ACP backend.')
    const backends = current.acp.backends.map(item => item.id === backend ? { ...item, enabled } : item)
    await this.settings.replace({
      ...editableConfig(current),
      ...(backend === 'cursor' ? { cursor: { ...current.cursor, enabled } } : {}),
      ...(backend === 'codex' ? { codex: { ...current.codex, enabled } } : {}),
      acp: { enabled: enabled || current.acp.enabled, backends },
    })
    await this.host?.setAgentBackends?.(this.currentConfig())
    return { ...await this.settingsView(), applies: 'live' }
  }

  private async addAcp(payload: unknown): Promise<PluginSettingsView> {
    if (this.settings === undefined) throw new ClientModeError('SETTINGS_UNAVAILABLE', 'DSH user settings are unavailable in this profile.')
    const value = record(payload)
    if (typeof value.id !== 'string' || typeof value.command !== 'string' || !Array.isArray(value.args) || !value.args.every(item => typeof item === 'string')) {
      throw new ClientModeError('INVALID_MESSAGE', 'ACP name, command, and arguments are required.')
    }
    const current = this.currentConfig()
    if (value.id === 'kimi') throw new ClientModeError('INVALID_MESSAGE', 'Kimi is not implemented.')
    if (current.acp?.backends.some(item => item.id === value.id)) throw new ClientModeError('INVALID_MESSAGE', 'ACP backend already exists.')
    const backends = [...(current.acp?.backends ?? []), { id: value.id, command: value.command, args: value.args, enabled: false }]
    const next = resolveConfig({ ...editableConfig(current), acp: { enabled: current.acp?.enabled ?? true, backends } })
    await this.settings.replace(editableConfig(next))
    await this.host?.setAgentBackends?.(this.currentConfig())
    return { ...await this.settingsView(), applies: 'live' }
  }

  private async removeAcp(payload: unknown): Promise<PluginSettingsView> {
    if (this.settings === undefined) throw new ClientModeError('SETTINGS_UNAVAILABLE', 'DSH user settings are unavailable in this profile.')
    const id = record(payload).id
    if (typeof id !== 'string' || ['codex', 'cursor', 'antigravity', 'pi', 'claude', 'opencode'].includes(id)) throw new ClientModeError('INVALID_MESSAGE', 'Only custom ACP backends can be removed.')
    const current = this.currentConfig()
    const backends = (current.acp?.backends ?? []).filter(item => item.id !== id)
    await this.settings.replace(editableConfig({ ...current, acp: { enabled: current.acp?.enabled ?? true, backends } }))
    await this.host?.setAgentBackends?.(this.currentConfig())
    return { ...await this.settingsView(), applies: 'live' }
  }
  private async authorizeOwnedRole(
    serverUrl: string,
    sourceRole: 'host' | 'client',
    targetRole: 'host' | 'client',
  ): Promise<void> {
    const sourceDirectory = serverStorageDirectory(this.identityDirectory, serverUrl, sourceRole)
    const sourceIdentity = await new IdentityStore({ directory: sourceDirectory }).loadOrCreate(hostname())
    const sourceStore = new ServerCredentialStore(sourceDirectory)
    if (await sourceStore.load(serverUrl, sourceIdentity.deviceId) === undefined) return
    const sourceApi = sourceRole === 'host'
      ? new HostServerApi(serverUrl, sourceStore)
      : new ClientServerApi(serverUrl, sourceStore)
    const sourceCredentials = await sourceApi.authenticate(sourceIdentity)

    const targetDirectory = serverStorageDirectory(this.identityDirectory, serverUrl, targetRole)
    const targetIdentity = await new IdentityStore({ directory: targetDirectory }).loadOrCreate(hostname())
    const targetApi = targetRole === 'host'
      ? new HostServerApi(serverUrl, new ServerCredentialStore(targetDirectory))
      : new ClientServerApi(serverUrl, new ServerCredentialStore(targetDirectory))
    await targetApi.authorizeOwnedRole(targetIdentity, sourceCredentials.accessToken, sourceCredentials.account)
  }

  private logout(): Promise<PluginSettingsView> {
    if (this.logoutFlight !== undefined) return this.logoutFlight
    const task = this.clearAuthorization()
    this.logoutFlight = task
    void task.finally(() => {
      if (this.logoutFlight === task) this.logoutFlight = undefined
    }).catch(() => undefined)
    return task
  }

  private async clearAuthorization(): Promise<PluginSettingsView> {
    const config = this.settings === undefined ? this.config : this.currentConfig()
    if (config.serverUrl !== undefined) {
      const runtimes = await Promise.allSettled([
        this.client?.clearClientAuthorization(),
        this.host?.clearHostAuthorization(),
      ])
      const stores = await Promise.allSettled((['host', 'client'] as const).map(async role => {
        const directory = serverStorageDirectory(this.identityDirectory, config.serverUrl!, role)
        await new ServerCredentialStore(directory).clear()
      }))
      // A failed revocation must not skip the other role or leave its local
      // credential behind. Report failure only after every cleanup settles.
      const failure = [...runtimes, ...stores].find(result => result.status === 'rejected')
      if (failure?.status === 'rejected') throw failure.reason
    }
    return this.settingsView()
  }

  private async settingsView(): Promise<PluginSettingsView> {
    const config = this.settings === undefined ? editableConfig(this.config) : editableConfig(this.currentConfig())
    const associations = await this.associations(config)
    const role = config.role === 'client' ? 'client' : 'host'
    const association = associations[role]
    return {
      config,
      deviceName: hostname(),
      writable: this.settings !== undefined,
      applies: 'restart',
      associations,
      acpAvailability: Object.fromEntries((config.acp?.backends ?? []).map(item => [item.id, backendCommandAvailable(item.id, item.command ?? '')])),
      ...(association === undefined ? {} : { association }),
    }
  }

  private async associations(config: Config): Promise<PluginSettingsView['associations']> {
    if (config.serverUrl === undefined) return {}
    const [host, client] = await Promise.all([
      this.association(config.serverUrl, 'host'),
      this.association(config.serverUrl, 'client'),
    ])
    return {
      ...(host === undefined ? {} : { host }),
      ...(client === undefined ? {} : { client }),
    }
  }

  private async association(serverUrl: string, role: 'host' | 'client'): Promise<PluginAssociation | undefined> {
    const identities = new IdentityStore({
      directory: serverStorageDirectory(this.identityDirectory, serverUrl, role),
    })
    const identity = await identities.loadOrCreate(hostname())
    const credentials = await new ServerCredentialStore(identities.directory).load(serverUrl, identity.deviceId)
    if (credentials === undefined) return undefined
    return {
      method: credentials.authorizationMethod,
      ...(credentials.account === undefined ? {} : { account: credentials.account }),
    }
  }

  private hostOnlyStatus(): Record<string, unknown> {
    return {
      mode: 'local',
      available: false,
      deviceName: hostname(),
      hostAuthorizationAvailable: this.host !== undefined,
      ...(this.lanConfigError === undefined ? {} : { error: this.lanConfigError }),
      ...(this.host === undefined ? {} : { host: this.host.hostStatus() }),
    }
  }
}

function backendCommandAvailable(backend: string, command: string): boolean {
  const candidates = backend === 'codex' ? codexBinaryCandidates(command)
    : backend === 'cursor' || backend === 'antigravity' || backend === 'opencode' ? cursorBinaryCandidates(command) : [command]
  return candidates.some(commandAvailable)
}

function commandAvailable(command: string): boolean {
  try { execFileSync(process.platform === 'win32' ? 'where' : 'which', [command], { stdio: 'ignore' }); return true } catch { return false }
}

function editableConfig(config: ResolvedConfig): Config {
  return {
    enabled: config.enabled,
    lan: config.lan,
    deviceName: config.deviceName,
    role: config.role,
    terminal: config.terminal,
    remoteTools: config.remoteTools,
    hostControl: config.hostControl ?? { enabled: true },
    loopback: config.loopback,
    forceRelay: config.forceRelay,
    logLevel: config.logLevel,
    reconnect: config.reconnect.enabled
      ? {
          initialDelayMs: config.reconnect.initialDelayMs,
          maxDelayMs: config.reconnect.maxDelayMs,
          jitter: config.reconnect.jitter,
        }
      : false,
    codex: {
      enabled: config.codex.enabled,
      binary: config.codex.binary,
    },
    cursor: {
      enabled: config.cursor.enabled,
      binary: config.cursor.binary,
    },
    ...(config.acp === undefined ? {} : { acp: { enabled: config.acp.enabled, backends: config.acp.backends } }),
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function record(value: unknown): Record<string, unknown> {
  if (!isRecord(value)) throw new ClientModeError('INVALID_MESSAGE', 'The control request payload is invalid.')
  return value
}

function ok(value: unknown): ControlResult<unknown> { return { ok: true, value } }

function fail(error: unknown): ControlResult<unknown> {
  const source = error instanceof Error ? error : undefined
  const remoteCode = source !== undefined && 'code' in source && typeof source.code === 'string'
    ? source.code
    : source instanceof ClientModeError ? source.code : undefined
  return {
    ok: false,
    error: {
      code: 'internal',
      message: source?.message ?? 'The plugin control operation failed.',
      details: remoteCode === undefined ? {} : { remoteCode },
    },
  }
}
