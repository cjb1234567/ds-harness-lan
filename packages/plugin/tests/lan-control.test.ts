import { describe, expect, it, vi } from 'vitest'
import { PluginControlRuntime, type PluginSettingsBinding } from '../src/control-runtime.js'
import { resolveConfig, type Config, type ResolvedConfig } from '../src/config.js'
import type { ClientModeRuntime, HostAuthorizationControl, HostConnectionHandle } from '../src/client-runtime.js'
import type { ControlResult } from '../src/control-result.js'

function deferred() {
  let resolve!: () => void
  const promise = new Promise<void>(done => { resolve = done })
  return { promise, resolve }
}
function host() {
  return { hostStatus: vi.fn(() => ({ online: true })), close: vi.fn(async () => undefined) } as unknown as HostAuthorizationControl & { close: ReturnType<typeof vi.fn> }
}
function setup(switcher: (config: ResolvedConfig) => Promise<{ host: HostAuthorizationControl; client: ClientModeRuntime | undefined }>, initial: Config = {}) {
  let value: Config = { deviceName: 'LAN host', lan: { accessToken: 'existing-secret' }, ...initial }
  const settings: PluginSettingsBinding = {
    get: () => structuredClone(value),
    replace: vi.fn(async section => { value = structuredClone(section) }),
  }
  const oldHost = host()
  const oldClient = { handleControl: vi.fn(async () => ({ ok: true, value: 'old' })), close: vi.fn(async () => undefined) }
  const runtime = new PluginControlRuntime(resolveConfig(value, {}), '/unused-lan-control', settings, oldClient as unknown as ClientModeRuntime, oldHost, switcher)
  let handler!: (endpoint: string, payload: unknown, signal: AbortSignal) => Promise<ControlResult<unknown>>
  runtime.register({ rpc: { handle: (_channel, next) => { handler = next; return async () => undefined } } } satisfies HostConnectionHandle)
  return { settings, oldHost, oldClient, call: (endpoint: string, payload: unknown = {}) => handler(endpoint, payload, new AbortController().signal) }
}

describe('LAN control configuration state machine', () => {
  it('reports short tokens without echoing credentials or persisting invalid settings', async () => {
    const switcher = vi.fn(async () => ({ host: host(), client: undefined }))
    const test = setup(switcher)
    const result = await test.call('lan.settings.set', { enabled: true, accessToken: 'short-secret' })
    expect(result).toMatchObject({ ok: false, error: {
      message: 'Access token must contain at least 16 characters, excluding leading and trailing spaces.',
      details: { remoteCode: 'LAN_TOKEN_TOO_SHORT' },
    } })
    expect(JSON.stringify(result)).not.toContain('short-secret')
    expect(test.settings.replace).not.toHaveBeenCalled()
    expect(switcher).not.toHaveBeenCalled()
  })
  it('serializes partial saves and holds status/get until replacement completes', async () => {
    const entered = deferred(), release = deferred()
    const configs: ResolvedConfig[] = []
    const freshHandle = vi.fn(async () => ({ ok: true, value: 'fresh' }))
    const test = setup(async config => {
      configs.push(config)
      if (configs.length === 1) { entered.resolve(); await release.promise }
      return { host: host(), client: { handleControl: freshHandle } as unknown as ClientModeRuntime }
    })
    const first = test.call('lan.settings.set', { port: 59101 })
    await entered.promise
    const second = test.call('lan.settings.set', { maxConnections: 7 })
    let readFinished = false
    const read = test.call('lan.settings.get').then(value => { readFinished = true; return value })
    const status = test.call('status')
    await Promise.resolve()
    expect(configs).toHaveLength(1)
    expect(readFinished).toBe(false)
    expect(test.oldClient.handleControl).not.toHaveBeenCalled()
    release.resolve()
    await expect(first).resolves.toMatchObject({ ok: true })
    await expect(second).resolves.toMatchObject({ ok: true })
    await expect(read).resolves.toMatchObject({ ok: true, value: { config: { port: 59101, maxConnections: 7 } } })
    await expect(status).resolves.toMatchObject({ ok: true, value: 'fresh' })
    expect(configs[1].lan).toMatchObject({ port: 59101, maxConnections: 7, accessToken: 'existing-secret' })
    expect(test.settings.get().deviceName).toBe('LAN host')
  })

  it('reports persistence failure, restores config, and allows retry without exposing errors', async () => {
    const switcher = vi.fn(async () => ({ host: host(), client: undefined }))
    const test = setup(switcher)
    vi.mocked(test.settings.replace).mockRejectedValueOnce(new Error('private-token-error'))
    const result = await test.call('lan.settings.set', { port: 59102 })
    expect(result).toMatchObject({ ok: false, error: { details: { remoteCode: 'LAN_CONFIG_APPLY_FAILED' } } })
    expect(JSON.stringify(result)).not.toContain('private-token-error')
    expect(switcher).not.toHaveBeenCalled()
    expect(resolveConfig(test.settings.get(), {}).lan.port).toBe(59090)
    await expect(test.call('lan.settings.set', { port: 59102 })).resolves.toMatchObject({ ok: true })
  })

  it('rebuilds previous runtime after failed startup; rollback failure stops stale refs and remains retryable', async () => {
    for (const rollbackFails of [false, true]) {
      const restored = host()
      let attempts = 0
      const switcher = vi.fn(async (_config: ResolvedConfig) => {
        attempts++
        if (attempts === 1 || (attempts === 2 && rollbackFails)) throw new Error('sensitive startup details')
        return { host: restored, client: undefined }
      })
      const test = setup(switcher)
      const result = await test.call('lan.settings.set', { port: 59103 })
      expect(result).toMatchObject({ ok: false, error: { details: { remoteCode: rollbackFails ? 'LAN_CONFIG_ROLLBACK_FAILED' : 'LAN_CONFIG_APPLY_FAILED' } } })
      expect(switcher).toHaveBeenCalledTimes(2)
      expect(switcher.mock.calls[1]?.[0]).toMatchObject({ lan: { port: 59090 } })
      await expect(test.call('status')).resolves.toMatchObject({ ok: true })
      expect(test.oldClient.handleControl).not.toHaveBeenCalled()
      expect(test.oldHost.hostStatus).not.toHaveBeenCalled()
      if (rollbackFails) {
        expect(test.oldClient.close).toHaveBeenCalledOnce()
        expect(test.oldHost.close).toHaveBeenCalledOnce()
      } else expect(restored.hostStatus).toHaveBeenCalledOnce()
      await expect(test.call('lan.settings.set', { port: 59103 })).resolves.toMatchObject({ ok: true })
      await expect(test.call('lan.settings.get')).resolves.not.toHaveProperty('value.error')
    }
  })

  it('keeps outbound hosts with listener disabled, generates initial token, and rejects legacy account routes', async () => {
    const switcher = vi.fn(async (_config: ResolvedConfig) => ({ host: host(), client: undefined }))
    const test = setup(switcher, { serverUrl: 'https://legacy.example.com', lan: { accessToken: '' } })
    const hosts = [{ id: 'office', name: 'Office', host: '192.168.1.2', port: 59090, accessToken: 'peer-secret-long-enough' }]
    await expect(test.call('lan.settings.set', { enabled: false, accessToken: '', hosts })).resolves.toMatchObject({ ok: true })
    const next = switcher.mock.calls[0][0]
    expect(next.serverUrl).toBeUndefined()
    expect(next.lan).toMatchObject({ enabled: false, hosts })
    expect(next.lan.accessToken.length).toBeGreaterThanOrEqual(32)
    expect(test.settings.get().serverUrl).toBeUndefined()
    await test.call('lan.settings.set', { accessToken: '' })
    expect(switcher.mock.calls[1][0].lan.accessToken).toBe(next.lan.accessToken)
    for (const endpoint of ['client.account.providers', 'client.account.login', 'client.account.qr.start', 'client.account.qr.poll', 'host.account.login', 'host.registration-code.submit', 'settings.logout']) {
      await expect(test.call(endpoint)).resolves.toMatchObject({ ok: false, error: { details: { remoteCode: 'METHOD_NOT_ALLOWED' } } })
    }
    expect(test.oldClient.handleControl).not.toHaveBeenCalled()
    const invalid = await test.call('lan.settings.set', { port: -1, accessToken: 'do-not-expose-long-secret' })
    expect(invalid).toMatchObject({ ok: false, error: { details: { remoteCode: 'INVALID_MESSAGE' } } })
    expect(JSON.stringify(invalid)).not.toContain('do-not-expose')
  })
})
