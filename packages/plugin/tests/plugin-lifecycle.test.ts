import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Context } from '@deepseek-ai/cordis'
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as remotePlugin from '../src/index.js'
import type { Config } from '../src/config.js'
import type { ControlRouteHandler } from '../src/control-route.js'

const directories: string[] = []
const disabledAgentDomains = { codex: { enabled: false }, acp: { enabled: false } }

afterEach(async () => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  await Promise.all(directories.splice(0).map(directory => rm(directory, { recursive: true, force: true })))
})

describe('Cordis plugin lifecycle', () => {
  it('keeps LAN authority local and rejects public Server changes', async () => {
    const dshHome = await mkdtemp(join(tmpdir(), 'dsh-remote-server-switch-'))
    directories.push(dshHome)
    vi.stubEnv('DSH_HOME', dshHome)
    let config: Config = { ...disabledAgentDomains, serverUrl: 'https://old.example.com' }
    let handler!: ControlRouteHandler
    let oldRequestSignal: AbortSignal | null | undefined
    const requests: string[] = []
    vi.stubGlobal('fetch', vi.fn<typeof fetch>(async (input, init) => {
      const url = String(input)
      requests.push(url)
      if (url === 'https://old.example.com/api/v1/auth/oauth/providers') {
        oldRequestSignal = init?.signal
        return new Promise<Response>((_resolve, reject) => {
          oldRequestSignal!.addEventListener('abort', () => reject(oldRequestSignal!.reason), { once: true })
        })
      }
      if (url === 'https://new.example.com/api/v1/auth/oauth/providers') {
        return Response.json({ items: [{ id: 'github', displayName: 'GitHub',
          startUrl: '/api/v1/auth/oauth/github/start', qrStartUrl: '/api/v1/auth/oauth/qr/start?provider=github' }] })
      }
      return Response.json({ error: { code: 'AUTHORIZATION_REQUIRED', message: 'Sign in required' } }, { status: 401 })
    }))
    const ctx = new Context()
    ctx.provide('settings', { register: () => ({
      get: () => config, replace: async (value: Config) => { config = value },
    }) } as never)
    ctx.provide('typertGateway', typertGateway())
    ctx.provide('connection', { rpc: { handle: (_channel: string, value: ControlRouteHandler) => {
      handler = value
      return async () => undefined
    } } } as never)
    const fiber = await ctx.plugin(remotePlugin, config)
    const call = (endpoint: string, payload: unknown = {}) => handler(endpoint, payload, new AbortController().signal)
    try {
      await vi.waitFor(() => { expect(ctx.dshLanClient.status().mode).toBe('local') })
      const host = ctx.dshLan, client = ctx.dshLanClient
      await expect(call('settings.server.set', { serverUrl: 'https://new.example.com/' })).resolves.toMatchObject({ ok: false })
      await expect(call('client.account.providers')).resolves.toMatchObject({ ok: false })
      expect(ctx.dshLan).toBe(host)
      expect(ctx.dshLanClient).toBe(client)
      expect(requests).toEqual([])
      expect(oldRequestSignal).toBeUndefined()
    } finally {
      await fiber.dispose()
      await ctx.fiber.dispose()
    }
  })

  it('registers and removes LAN tools live without replacing the runtime', async () => {
    const dshHome = await mkdtemp(join(tmpdir(), 'dsh-lan-tools-'))
    directories.push(dshHome)
    vi.stubEnv('DSH_HOME', dshHome)
    let config: Config = { ...disabledAgentDomains, remoteTools: { enabled: false } }
    const ctx = new Context()
    const registered = new Map<string, unknown>()
    ctx.provide('tools', { register: (definition: { name: string }) => {
      registered.set(definition.name, definition)
      return () => { registered.delete(definition.name) }
    } } as never)
    ctx.provide('settings', { register: () => ({
      get: () => config, replace: async (value: Config) => { config = value },
    }) } as never)
    ctx.provide('typertGateway', typertGateway())
    let handler!: ControlRouteHandler
    ctx.provide('connection', { rpc: { handle: (_channel: string, value: ControlRouteHandler) => {
      handler = value
      return async () => undefined
    } } } as never)
    const fiber = await ctx.plugin(remotePlugin, config)
    try {
      await vi.waitFor(() => expect(ctx.dshLanClient.status().mode).toBe('local'))
      const client = ctx.dshLanClient
      expect(registered.size).toBe(0)
      for (const enabled of [true, false, true]) {
        await expect(handler('settings.development.set', { remoteToolsEnabled: enabled }, new AbortController().signal))
          .resolves.toMatchObject({ ok: true })
        expect(registered.size).toBe(enabled ? 11 : 0)
        expect([...registered.keys()].every(name => name.startsWith('lan_'))).toBe(true)
        expect(ctx.dshLanClient).toBe(client)
      }
    } finally { await fiber.dispose(); await ctx.fiber.dispose() }
    expect(registered.size).toBe(0)
  })

  it('fails before touching the gateway when upstream Remote already owns it', async () => {
    for (const service of ['dshRemote', 'dshRemoteClient']) {
      const ctx = new Context()
      const upstream = { close: vi.fn() }
      const gateway = { invoke: vi.fn(async () => undefined), dispatchRpc: vi.fn(async () => ({ ok: true })), openWireStream: vi.fn(async () => (async function* () {})()) }
      const invoke = gateway.invoke
      const handle = vi.fn(() => async () => undefined)
      ctx.provide(service, upstream as never)
      ctx.provide('settings', settings({}))
      ctx.provide('typertGateway', gateway)
      ctx.provide('connection', { rpc: { handle } } as never)
      const fiber = await ctx.plugin(remotePlugin, disabledAgentDomains)
      try {
        await vi.waitFor(() => {
          const errors = [...ctx.registry.values()].flatMap(runtime => [...runtime.fibers])
            .map(child => (child as unknown as { _error?: { code?: string } })._error)
          expect(errors.some(error => error?.code === 'LAN_GATEWAY_CONFLICT')).toBe(true)
        })
        expect(ctx.get('dshLan', false)).toBeUndefined()
        expect(ctx.get(service, false)).toBe(upstream)
        expect(gateway.invoke).toBe(invoke)
        expect(upstream.close).not.toHaveBeenCalled()
        expect(handle).not.toHaveBeenCalled()
      } finally { await fiber.dispose(); await ctx.fiber.dispose() }
    }
  })

  it('does not block Harness startup while runtime services are unavailable', async () => {
    const ctx = new Context()
    const fiber = await ctx.plugin(remotePlugin, { ...disabledAgentDomains, deviceName: 'Cordis pending host' })

    expect(fiber.state).toBe(2)
    expect(fiber.inject).toEqual({})
    expect(ctx.get('dshLan')).toBeUndefined()

    await fiber.dispose()
    await ctx.fiber.dispose()
  })

  it('loads against Typert and disposes its runtime', async () => {
    const dshHome = await mkdtemp(join(tmpdir(), 'dsh-remote-cordis-'))
    directories.push(dshHome)
    vi.stubEnv('DSH_HOME', dshHome)

    const ctx = new Context()
    let identityReadyWhenControlRegistered: boolean | undefined
    ctx.provide('settings', settings({ deviceName: 'Cordis test host' }))
    ctx.provide('typertGateway', typertGateway())
    ctx.provide('connection', connection(() => {
      try {
        ctx.dshLan.currentIdentity()
        identityReadyWhenControlRegistered = true
      } catch {
        identityReadyWhenControlRegistered = false
      }
    }))
    const fiber = await ctx.plugin(remotePlugin, { ...disabledAgentDomains, deviceName: 'Cordis test host' })

    await vi.waitFor(() => {
      expect(ctx.dshLan.currentIdentity()).toMatchObject({ name: 'Cordis test host' })
      expect(ctx.dshLan.diagnostics()).toMatchObject({
        loaded: true,
        capabilities: expect.arrayContaining(['harness.remote.v1', 'harness.remote.transfer.v1']),
      })
    })
    expect(identityReadyWhenControlRegistered).toBe(false)

    await fiber.dispose()
    expect(ctx.get('dshLan')).toBeUndefined()
    await ctx.fiber.dispose()
  })

  it('waits for Desktop connection before activating even when Typert is ready', async () => {
    const dshHome = await mkdtemp(join(tmpdir(), 'dsh-remote-late-connection-'))
    directories.push(dshHome)
    vi.stubEnv('DSH_HOME', dshHome)

    const ctx = new Context()
    const handle = vi.fn(() => async () => undefined)
    ctx.provide('settings', settings({ deviceName: 'Cordis delayed connection host' }))
    ctx.provide('typertGateway', typertGateway())
    const fiber = await ctx.plugin(remotePlugin, { ...disabledAgentDomains, deviceName: 'Cordis delayed connection host' })

    expect(ctx.get('dshLan')).toBeUndefined()
    ctx.provide('connection', { rpc: { handle } } as never)
    await vi.waitFor(() => {
      expect(ctx.dshLan.currentIdentity()).toMatchObject({ name: 'Cordis delayed connection host' })
    })
    expect(handle).toHaveBeenCalledWith('/dsh-lan', expect.any(Function), {
      authority: 'loopback',
    })

    await fiber.dispose()
    expect(ctx.get('dshLan')).toBeUndefined()
    await ctx.fiber.dispose()
  })

  it('loads a TUI Host against the v0.1.2 Typert Remote Gateway without a Desktop connection service', async () => {
    const dshHome = await mkdtemp(join(tmpdir(), 'dsh-remote-alpha-cordis-'))
    directories.push(dshHome)
    vi.stubEnv('DSH_HOME', dshHome)
    let requestSignal: AbortSignal | null | undefined
    const fetchMock = vi.fn<typeof fetch>(async (_input, init) => {
      requestSignal = init?.signal
      return new Promise<Response>((_resolve, reject) => {
        requestSignal!.addEventListener('abort', () => reject(requestSignal!.reason), { once: true })
      })
    })
    vi.stubGlobal('fetch', fetchMock)

    const ctx = new Context()
    ctx.provide('commands', { register: vi.fn(() => vi.fn()) })
    ctx.provide('tuiCommandTrees', { register: vi.fn(() => vi.fn()) })
    ctx.provide('tuiScenes', { register: vi.fn(() => vi.fn()), open: vi.fn(() => true) })
    ctx.provide('settings', settings({ deviceName: 'Cordis alpha host' }))
    ctx.provide('typertGateway', {
      invoke: vi.fn(async () => undefined),
      dispatchRpc: vi.fn(async () => ({ ok: true, value: undefined })),
      openWireStream: vi.fn(async () => (async function* () { return })()),
      wireStream: {
        open: vi.fn(async () => (async function* () { return })()),
        failure: vi.fn(() => ({ code: 'internal', message: 'failed', details: {} })),
      },
    } as never)
    const fiber = await ctx.plugin(remotePlugin, { ...disabledAgentDomains, deviceName: 'Cordis alpha host' })

    try {
      await vi.waitFor(() => {
        expect(ctx.dshLan.currentIdentity()).toMatchObject({ name: 'Cordis alpha host' })
        expect(ctx.dshLan.diagnostics()).toMatchObject({ loaded: true, serverConfigured: false })
        expect(fetchMock).not.toHaveBeenCalled()
      })
      expect(ctx.get('dshLanClient')).toBeUndefined()

      await fiber.dispose()
      expect(requestSignal).toBeUndefined()
      expect(ctx.get('dshLan')).toBeUndefined()
    } finally {
      await fiber.dispose()
      await ctx.fiber.dispose()
    }
  })

  it('keeps a carrier-less Desktop unavailable even when legacy ApiProxy is provided', async () => {
    const dshHome = await mkdtemp(join(tmpdir(), 'dsh-remote-late-apiproxy-'))
    directories.push(dshHome)
    vi.stubEnv('DSH_HOME', dshHome)

    const ctx = new Context()
    const handlers: Array<{
      channel: string
      handler: (endpoint: string, payload: unknown, signal: AbortSignal) => Promise<unknown>
      disposed: boolean
    }> = []
    ctx.provide('settings', settings({ deviceName: 'Cordis delayed rc.2 host' }))
    ctx.provide('typertGateway', { invoke: vi.fn() } as never)
    ctx.provide('connection', {
      rpc: {
        handle: vi.fn((channel: string, handler: typeof handlers[number]['handler']) => {
          const entry = { channel, handler, disposed: false }
          handlers.push(entry)
          return async () => { entry.disposed = true }
        }),
      },
    } as never)
    const fiber = await ctx.plugin(remotePlugin, { ...disabledAgentDomains, deviceName: 'Cordis delayed rc.2 host' })

    expect(ctx.get('dshLan')).toBeUndefined()
    expect(handlers).toHaveLength(1)
    expect(handlers[0]?.channel).toBe('/dsh-lan')
    await expect(handlers[0]?.handler('status', {}, new AbortController().signal)).resolves.toMatchObject({
      ok: true,
      value: {
        mode: 'local',
        available: false,
        hostAuthorizationAvailable: false,
      },
    })
    ctx.provide('apiProxy', {} as never)
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(ctx.get('dshLan')).toBeUndefined()
    expect(handlers[0]?.disposed).toBe(false)

    await fiber.dispose()
    expect(ctx.get('dshLan')).toBeUndefined()
    await ctx.fiber.dispose()
  })
})

function settings(value: Record<string, unknown>) {
  return {
    configure: () => () => undefined,
    // These tests exercise Harness registration/disposal, not installed Agent
    // CLIs. Keep optional processes out of the fixture (including the bundled
    // CodeX fallback, which is discoverable even with an isolated PATH).
    describe: () => [{ ns: 'ds-harness-lan', value: {
      ...disabledAgentDomains,
      ...value,
    } }],
    replace: vi.fn(async () => undefined),
  } as never
}

type ControlHandler = (endpoint: string, payload: unknown, signal: AbortSignal) => Promise<unknown>

function connection(onHandle?: () => void) {
  return {
    rpc: {
      handle: vi.fn(() => {
        onHandle?.()
        return async () => undefined
      }),
    },
  } as never
}

function typertGateway() {
  return { invoke: vi.fn(async () => undefined), dispatchRpc: vi.fn(async () => ({ ok: true })), openWireStream: vi.fn(async () => (async function* () {})()) } as never
}
