import type { Translate } from './client-locale.js'
import { en, localeNamespace, zh } from './client-locale.js'
import { createRemoteSessionHeaderAction } from './client/header.js'
import { unwrapControlResult } from './client/control-result.js'
import { pendingWorkspaceSelectionKey, storedWorkspaceSelection, workspacesReady } from './client/navigation.js'
import { messageOf } from './client/presentation.js'
import { createRemotePluginOptions } from './client/settings.js'
import { installStyle, installTerminalAvailabilityNotice } from './client/shell.js'
import type {
  ClientReact,
  ControlResult,
  FileViewerClientServiceLike,
  RemoteDevice,
  RemoteStatus,
  RemoteWorkspaceSelection,
  SessionsClientServiceLike,
  UiWorkspaceClientServiceLike,
  WorkspacesClientServiceLike,
} from './client/types.js'
import { createRemoteWorkspaceAction } from './client/workspaces.js'
import { CONTROL_RPC_PREFIX, STATUS_STREAM_PATH } from './control-route.js'
import { createPluginRouteCatalogGuard, createPluginRouteFetch } from './plugin-route-client.js'
import {
  createRemoteFileContentProvider,
  REMOTE_FILE_SAVE_AS_MAX_BYTES,
  remoteFileSaveAsMaxBytes,
  shouldAllowRemoteFileSaveAs,
  shouldUseRemoteFileViewer,
} from './remote-file-content-provider.js'
import type { StatusFeed } from './status-stream.js'
import { createStatusFeed } from './status-stream.js'
import { subscribeRemoteRecovery } from './client-recovery.js'

declare global {
  interface Window {
    __ModuleLoader__: {
      load(input: { id: string; factory: (require: (id: string) => unknown) => unknown }): void
    }
    __DS_HARNESS_REMOTE_CLIENT_ACTIVE__?: boolean
  }
}

declare const DSH_REMOTE_CLIENT_MODULE_ID: string | undefined

const clientModuleId = typeof DSH_REMOTE_CLIENT_MODULE_ID === 'string'
  ? DSH_REMOTE_CLIENT_MODULE_ID
  : 'ds-harness-lan'
const controlRouteBackoffStepsMs = [1_000, 2_000, 5_000, 10_000, 30_000] as const

class ControlRouteUnavailableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ControlRouteUnavailableError'
  }
}

// Install before ModuleLoader activation and React rendering: other plugins may
// fetch their roster as soon as their own apply() runs.
const originalPluginFetch = window.fetch
let readyPluginSessions: (sessions: SessionsClientServiceLike) => void
const pluginSessions = new Promise<SessionsClientServiceLike>(resolve => { readyPluginSessions = resolve })
const pluginRouteFetch = typeof originalPluginFetch === 'function' && typeof document !== 'undefined'
  ? createPluginRouteFetch(originalPluginFetch.bind(window), document.baseURI, {
    beforeResponse: createPluginRouteCatalogGuard(() => pluginSessions),
  })
  : undefined
if (pluginRouteFetch !== undefined) window.fetch = pluginRouteFetch

function controlRouteUnavailableStatus(): RemoteStatus {
  return {
    mode: 'local',
    available: false,
    controlUnavailable: true,
    connected: false,
    transport: 'Disconnected',
    remoteFeatures: { commandList: false, fileViewer: false, terminal: false, codex: false, pluginRoute: false, cursor: false, antigravity: false, pi: false, opencode: false },
    hostAuthorizationAvailable: false,
  }
}

window.__ModuleLoader__.load({
  id: clientModuleId,
  factory: require => {
    const module = { exports: {} as Record<string, unknown> }
    const React = require('react') as ClientReact
    const RemotePluginOptions = createRemotePluginOptions(React)
    const RemoteWorkspaceAction = createRemoteWorkspaceAction(React)
    const RemoteSessionHeaderAction = createRemoteSessionHeaderAction(React)
    let openHarnessSettings: ((page?: string) => void) | undefined
    function RemoteSettingsLauncher(props: { openSettings?: (page?: string) => void }): unknown {
      openHarnessSettings = props.openSettings
      return null
    }
    const inject = [
      'connection', 'slots', 'locale', 'workspaces', 'sessions',
    ]

    function apply(ctx: {
      connection: { rpc: { call(channel: string, endpoint: string, payload: unknown): Promise<ControlResult> }; reconnect?(): void }
      effect(effect: () => (() => void), label: string): void
      inject(services: string[], callback: (ctx: {
        effect(effect: () => (() => void), label: string): void
        get<T = unknown>(name: string): T | undefined
      }) => void): void
      get<T = unknown>(name: string): T | undefined
      workspaces: WorkspacesClientServiceLike
      sessions: SessionsClientServiceLike
      locale: {
        bind(namespace: string): Translate
        getLocale(): { active: 'zh' | 'en' }
        register(namespace: string, dictionaries: { zh: typeof zh; en: typeof en }): () => void
      }
      slots: {
        inject(name: string, factory: () => unknown): void
        register(options: Record<string, unknown>, component: unknown): unknown
      }
    }): void {
      if (window.__DS_HARNESS_REMOTE_CLIENT_ACTIVE__) return
      window.__DS_HARNESS_REMOTE_CLIENT_ACTIVE__ = true
      readyPluginSessions(ctx.sessions)
      ctx.effect(() => () => { window.__DS_HARNESS_REMOTE_CLIENT_ACTIVE__ = false }, 'ds-harness-lan: client singleton')
      ctx.effect(() => () => {
        if (pluginRouteFetch !== undefined && window.fetch === pluginRouteFetch) window.fetch = originalPluginFetch
      }, 'ds-harness-lan: plugin route fetch')

      const t = ctx.locale.bind(localeNamespace)
      const remoteOpenListeners = new Set<() => void>()
      const openRemote = (): void => { for (const listener of remoteOpenListeners) listener() }
      const subscribeOpen = (listener: () => void): (() => void) => {
        remoteOpenListeners.add(listener)
        return () => { remoteOpenListeners.delete(listener) }
      }
      let controlRouteRetryAfter = 0
      let controlRouteBackoffIndex = 0
      const control = async <T,>(endpoint: string, payload: unknown = {}): Promise<T> => {
        if (endpoint === 'status' && Date.now() < controlRouteRetryAfter) {
          return controlRouteUnavailableStatus() as T
        }
        let result: ControlResult
        try {
          result = await ctx.connection.rpc.call(CONTROL_RPC_PREFIX, endpoint, payload)
          controlRouteRetryAfter = 0
          controlRouteBackoffIndex = 0
        } catch (reason) {
          if (!isMissingControlRoute(reason)) throw reason
          const delayMs = controlRouteBackoffStepsMs[Math.min(controlRouteBackoffIndex, controlRouteBackoffStepsMs.length - 1)]!
          controlRouteBackoffIndex += 1
          controlRouteRetryAfter = Date.now() + delayMs
          if (endpoint === 'status') return controlRouteUnavailableStatus() as T
          throw new ControlRouteUnavailableError(t('remoteControlUnavailable'))
        }
        return unwrapControlResult(result, t('remoteRequestFailed')) as T
      }
      // One pushed status stream feeds every Host-status render in this page.
      // Hosts without the event stream keep answering the unary status control
      // call, which the feed itself polls at the interval this replaced.
      const statusFeed = createStatusFeed<RemoteStatus>({
        url: STATUS_STREAM_PATH.slice(1),
        readStatus: () => control<RemoteStatus>('status'),
        onFallback: reason => {
          console.warn('ds-harness-lan: status event stream unavailable, polling status instead:', reason)
        },
      })
      ctx.effect(() => () => statusFeed.close(), 'ds-harness-lan: status stream')
      ctx.effect(() => {
        const unsubscribe = statusFeed.subscribe(status => {
          document.documentElement.classList.toggle('dshLanBrowserUnavailable', status.mode === 'remote')
        })
        return () => {
          unsubscribe()
          document.documentElement.classList.remove('dshLanBrowserUnavailable')
        }
      }, 'ds-harness-lan: hide local browser entry in remote mode')
      ctx.effect(() => subscribeRemoteRecovery(statusFeed, () => ctx.connection.reconnect?.()), 'ds-harness-lan: carrier recovery')
      ctx.effect(() => {
        let disposed = false
        let unsubscribeWorkspaces: (() => void) | undefined
        let unsubscribeSessions: (() => void) | undefined
        let selection: RemoteWorkspaceSelection | undefined
        let opening = false

        const reconcile = (): void => {
          if (disposed || opening || selection === undefined) return
          const pending = selection
          const workspaceSnapshot = ctx.workspaces.list.getSnapshot()
          if (!workspacesReady(workspaceSnapshot)
            || !workspaceSnapshot.items.some(workspace => workspace.workspaceId === pending.workspaceId)) return
          const sessionSnapshot = ctx.sessions.list.getSnapshot()
          const isVirtualBackend = pending.backend === 'codex' || pending.backend === 'cursor' || pending.backend === 'antigravity' || pending.backend === 'pi' || pending.backend === 'opencode' || pending.backend === 'claude'
          if (isVirtualBackend && pending.sessionId !== undefined
            && sessionSnapshot.phase !== 'ready') return

          opening = true
          unsubscribeWorkspaces?.()
          unsubscribeSessions?.()
          unsubscribeWorkspaces = undefined
          unsubscribeSessions = undefined
          // 0.2 separates Workspace data from UI navigation. Let its single
          // mainReference owner release the previous selection on every open.
          const navigation = ctx.get<UiWorkspaceClientServiceLike>('uiWorkspace')
          const connectWorkspace = (workspaceId: string): Promise<string> => navigation !== undefined
            ? navigation.connectWorkspace(workspaceId)
            : ctx.workspaces.connectWorkspace(workspaceId)
          const open = isVirtualBackend && pending.sessionId !== undefined
            ? sessionSnapshot.ids.includes(pending.sessionId)
              ? Promise.resolve(pending.sessionId)
              : connectWorkspace(pending.workspaceId)
            : connectWorkspace(pending.workspaceId)
          void open.then(async sessionId => {
            if (disposed) return
            // Harness <= 0.1.6 exposed `sessions.open()`. Harness 0.2 moved
            // main-view retention to the UI Workspace service, while the
            // Session controller exposes `retain()` for other consumers.
            if (navigation !== undefined) {
              navigation.openSession(sessionId)
            } else if (typeof ctx.workspaces.openSession === 'function') {
              ctx.workspaces.openSession(sessionId)
            } else if (typeof ctx.sessions.open === 'function') {
              ctx.sessions.open(sessionId)
            } else {
              throw new Error('No supported Session open API is available.')
            }
            window.sessionStorage.removeItem(pendingWorkspaceSelectionKey)
            await control('workspace.selection.consume', pending).catch(() => undefined)
          }).catch(reason => {
            if (!disposed) console.warn('remote workspace selection failed:', reason)
          })
        }

        void control<RemoteStatus>('status').then(status => {
          const pending = status.workspaceSelection ?? storedWorkspaceSelection()
          if (disposed || status.mode !== 'remote' || pending === undefined
            || status.target?.deviceId !== pending.targetDeviceId) return
          selection = pending
          unsubscribeWorkspaces = ctx.workspaces.list.subscribe(reconcile)
          unsubscribeSessions = ctx.sessions.list.subscribe(reconcile)
          reconcile()
        }).catch(() => undefined)

        return () => {
          disposed = true
          unsubscribeWorkspaces?.()
          unsubscribeSessions?.()
        }
      }, 'ds-harness-lan: resume selected workspace')
      ctx.inject(['fileViewer'], fileViewerContext => {
        const viewer = fileViewerContext.get<FileViewerClientServiceLike>('fileViewer')
        if (viewer === undefined) return
        fileViewerContext.effect(() => {
          let unregister: (() => void) | undefined
          let latestSaveAsAllowed = false
          let latestSaveAsMaxBytes = REMOTE_FILE_SAVE_AS_MAX_BYTES
          // The pushed status decides whether the remote content provider stays
          // registered; an unreadable status keeps the last known registration
          // and remote calls still fail closed at the authenticated Host bridge.
          const unsubscribe = statusFeed.subscribe(status => {
            const supported = shouldUseRemoteFileViewer(status)
            latestSaveAsAllowed = shouldAllowRemoteFileSaveAs(status)
            latestSaveAsMaxBytes = remoteFileSaveAsMaxBytes(status)
            if (supported && unregister === undefined) {
              unregister = viewer.registerContentProvider(createRemoteFileContentProvider(
                (endpoint, payload) => control(endpoint, payload),
                { saveAsAllowed: () => latestSaveAsAllowed, saveAsMaxBytes: () => latestSaveAsMaxBytes },
              ))
            } else if (!supported && unregister !== undefined) {
              unregister()
              unregister = undefined
              latestSaveAsAllowed = false
              latestSaveAsMaxBytes = REMOTE_FILE_SAVE_AS_MAX_BYTES
            }
          })
          return () => {
            unsubscribe()
            unregister?.()
          }
        }, 'ds-harness-lan: remote file viewer provider')
      })
      // Add Remote Hosts as an @ mention source through Harness' input-trigger
      // service. The source owns only discovery and target switching; it never
      // serializes a host into the prompt or writes session state.
      const RemoteMentionIcon = (props: { size?: number; color?: string }): unknown => React.createElement('svg', {
        width: props.size ?? 18,
        height: props.size ?? 18,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: props.color ?? 'currentColor',
        strokeWidth: 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': true,
        className: 'dshRemoteComputerIcon',
      }, React.createElement('rect', { x: 3, y: 4, width: 18, height: 13, rx: 2 }),
        React.createElement('path', { d: 'M8 21h8M12 17v4' }))
      ctx.inject(['inputTriggers'], inputContext => {
        const hostCache = new Map<string, RemoteDevice>()
        inputContext.effect(() => {
          const inputTriggers = (inputContext as unknown as { inputTriggers: { registerSource(source: unknown): () => void } }).inputTriggers
          const source = {
            trigger: '@',
            name: '主机',
            order: -20,
            showGroupTitle: true,
            candidates: async (_session: unknown, request: { query: string; signal: AbortSignal }) => {
              const settings = await control<{ config?: { remoteTools?: { enabled?: boolean } } }>('settings.get').catch(() => undefined)
              // A missing/failed settings route is expected on older Hosts. Only
              // an explicit disabled value should suppress the device candidates.
              if (settings?.config?.remoteTools?.enabled === false) return []
              const devices = await control<RemoteDevice[]>('devices').catch(() => [])
              const query = request.query.trim().toLocaleLowerCase()
              return devices
                .filter(device => device.online && (query === '' || `${device.name} ${device.deviceId}`.toLocaleLowerCase().includes(query)))
                .map(device => {
                  hostCache.set(device.name, device)
                  return {
                  name: device.name,
                  label: device.name,
                  description: t('remoteHostMention', { platform: device.platform }),
                  icon: RemoteMentionIcon,
                  value: JSON.stringify({ deviceId: device.deviceId, label: device.name, platform: device.platform }),
                  }
                })
            },
            onPick: (pick: { candidate: { label?: string; name: string } }) => {
              const label = pick.candidate.label ?? pick.candidate.name
              return { text: `@${label} ` }
            },
          }
          const stopHostFileOpen = (event: Event): void => {
            const target = event.target instanceof Element
              ? event.target.closest('button,[role=\"button\"],a') ?? event.target
              : undefined
            if (!(target instanceof Element)) return
            const text = target.textContent?.trim().replace(/^@/, '') ?? ''
            const device = hostCache.get(text)
            if (!device) return
            event.preventDefault()
            event.stopImmediatePropagation()
            let invocation = `@${device.name}`
            let container: Element | null = target
            for (let depth = 0; depth < 20 && container !== null; depth += 1) {
              const candidate = container.textContent?.trim() ?? ''
              if (candidate.includes(device.name) && candidate.length > invocation.length && candidate.length < 4000) invocation = candidate
              container = container.parentElement
            }
            window.dispatchEvent(new CustomEvent('dsh-remote-host-reference', {
              detail: { label: device.name, platform: device.platform, deviceId: device.deviceId, invocation },
            }))
          }
          document.addEventListener('click', stopHostFileOpen, true)
          const unregister = inputTriggers.registerSource(source)
          return () => {
            document.removeEventListener('click', stopHostFileOpen, true)
            unregister()
          }
        }, 'ds-harness-lan: host mention source')
      })
      ctx.effect(() => ctx.locale.register(localeNamespace, { zh, en }), 'ds-harness-lan: dictionaries')
      ctx.effect(() => installStyle(clientModuleId), 'ds-harness-lan: client styles')
      ctx.effect(() => installTerminalAvailabilityNotice(statusFeed, t), 'ds-harness-lan: terminal availability notice')
      ctx.slots.inject('shell.overlay', () => ctx.slots.register({
        name: 'shell.overlay',
        id: 'ds-harness-lan-global-context',
        order: 20,
        locale: localeNamespace,
        inject: () => ({ control, statusFeed }),
      }, RemoteSessionHeaderAction))
      ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
        name: 'sidebar.footer.action',
        id: 'ds-harness-lan-workspace',
        order: -20,
        locale: localeNamespace,
        inject: () => ({
          control,
          statusFeed,
          subscribeOpen,
          openSettings: undefined,
        }),
      }, RemoteWorkspaceAction))
      // rc.1 Plugins-page configuration surfaces. `plugins.item` is reserved
      // for the official settings companion packages (the Plugins page renders
      // its registrants inside the Official group, so a third-party card there
      // reads as an official plugin) — a bundle's configuration belongs in the
      // two config slots below instead.
      // Row-scoped: keyed `<package>#<row id>` from the bundle's own patch
      // (`cordis.patch.yml` row `ds-harness-lan`).
      ctx.slots.inject('plugins.row.config', () => ctx.slots.register({
        name: 'plugins.row.config',
        key: 'ds-harness-lan#ds-harness-lan',
        locale: localeNamespace,
        inject: () => ({ control, statusFeed, onSignIn: openRemote }),
      }, RemotePluginOptions))
      // Bundle-scoped: installed-bundle details resolve configuration by
      // package name.
      ctx.slots.inject('plugins.bundle.config', () => ctx.slots.register({
        name: 'plugins.bundle.config',
        key: 'ds-harness-lan',
        locale: localeNamespace,
        inject: () => ({ control, statusFeed, onSignIn: openRemote }),
      }, RemotePluginOptions))
    }

    function isMissingControlRoute(reason: unknown): boolean {
      return reason instanceof Error
        && reason.message.startsWith(`transport failure for ${CONTROL_RPC_PREFIX}/`)
        && (reason.message.endsWith(': HTTP 404') || reason.message.endsWith(': HTTP 405'))
    }

    module.exports.apply = apply
    module.exports.inject = inject
    return module.exports
  },
})
