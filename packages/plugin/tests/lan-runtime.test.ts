import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { generateKeyPair } from '@dsh-remote/crypto'
import { createEvent } from '@dsh-remote/protocol'
import { ClientModeRuntime } from '../src/client-runtime.js'
import { resolveConfig } from '../src/config.js'
import { ConnectionController } from '../src/connection-controller.js'
import { HarnessRemoteBridge } from '../src/harness-remote-bridge.js'
import { IdentityStore } from '../src/identity-store.js'
import { LanHostListener } from '../src/lan-host.js'
import { SafeLogger } from '../src/logging.js'
import { RpcError, RpcRouter } from '../src/rpc-router.js'
import { ClientServerApi } from '../src/server-api.js'
import { ServerCredentialStore } from '../src/server-credentials.js'
import type { TypertGatewayRequest, TypertRpcResult } from '../src/typert-gateway-contract.js'

const cleanups: Array<() => Promise<unknown>> = []
afterEach(async () => {
  for (const cleanup of cleanups.splice(0).reverse()) await cleanup()
})

function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>(done => { resolve = done })
  return { promise, resolve }
}

async function setup() {
  const directory = await mkdtemp(join(tmpdir(), 'dsh-lan-runtime-'))
  cleanups.push(() => rm(directory, { recursive: true, force: true }))
  const hostStore = new IdentityStore({ directory: join(directory, 'host') })
  const clientStore = new IdentityStore({ directory: join(directory, 'client') })
  const host = await hostStore.loadOrCreate('Host')
  const logger = new SafeLogger({ debug() {}, info() {}, warn() {}, error() {} })
  const business = {
    capabilities: vi.fn((): readonly string[] => ['harness.remote.v1']),
    dispatch: vi.fn(async (_endpoint: string, _payload: unknown): Promise<TypertRpcResult> => ({ ok: true, value: 'remote' })),
  }
  const accepted: string[] = []
  const controller = new ConnectionController(hostStore, (context, send) => {
    accepted.push(context.connectionId)
    const bridge = new HarnessRemoteBridge({
      invoke: async () => 'remote',
      dispatch: (endpoint, payload) => business.dispatch(endpoint, payload),
      open: async () => { throw new Error('Streams are not used by this fixture') },
      failure: () => ({ code: 'INTERNAL_ERROR', message: 'Business dispatch failed', details: {} }),
      supportsCarrier: true,
    }, (event, data) => send(createEvent(event, data)))
    return new RpcRouter(128, logger, undefined, bridge, () => business.capabilities())
  }, logger)
  cleanups.push(() => controller.close())
  const lan = { ...resolveConfig({ lan: { accessToken: 'runtime-test-token' } }, {}).lan,
    enabled: true, bindAddress: '127.0.0.1', port: 0, heartbeatIntervalMs: 10_000 }
  const listener = new LanHostListener(lan, hostStore, controller, logger)
  cleanups.push(() => listener.close())
  await listener.start()
  const configuredId = 'configured-navigation-id'
  const config = resolveConfig({
    deviceName: 'Client',
    lan: { ...lan, port: listener.status().port!, hosts: [{
      id: configuredId, name: 'Configured Host', host: '127.0.0.1', port: listener.status().port!,
    }] },
    reconnect: { initialDelayMs: 100, maxDelayMs: 1000, jitter: 0 },
  }, {})
  const localInvoke = vi.fn(async (_request: TypertGatewayRequest) => 'local')
  const gateway = {
    invoke: localInvoke,
    dispatchRpc: async (): Promise<TypertRpcResult> => ({ ok: true, value: 'local' }),
    openWireStream: async () => { throw new Error('Streams are not used by this fixture') },
  }
  const server = new ClientServerApi('https://server.invalid', new ServerCredentialStore(join(directory, 'credentials')),
    async () => { throw new Error('LAN runtime must not contact an account Server') })
  cleanups.push(async () => server.close())
  const runtime = new ClientModeRuntime(config, clientStore, server, gateway, logger)
  cleanups.push(() => runtime.close())
  await runtime.start()
  return { runtime, gateway, localInvoke, host, hostStore, clientStore, business, controller, listener, configuredId, accepted }
}

const query = { namespace: 'session', method: 'list', args: {} }

describe('LAN runtime authenticated selection and recovery', () => {
  it('pins the real Host only after encrypted capability discovery succeeds and routes the configured selection remotely', async () => {
    const s = await setup()
    const discoveryPins: unknown[] = []
    s.business.capabilities.mockImplementationOnce(() => {
      discoveryPins.push(s.clientStore.trustedPeer(s.host.deviceId))
      throw new RpcError('FEATURE_NOT_SUPPORTED', 'Capability discovery rejected')
    })
    await expect(s.runtime.setMode('remote', s.configuredId)).rejects.toMatchObject({ code: 'FEATURE_NOT_SUPPORTED' })
    expect(discoveryPins).toEqual([undefined])
    expect(s.runtime.status()).toMatchObject({ mode: 'local', connected: false })
    const reloaded = new IdentityStore({ directory: s.clientStore.directory })
    await reloaded.loadOrCreate('Client')
    expect(reloaded.listTrustedPeers()).toEqual([])
    expect(s.hostStore.isTrusted(s.clientStore.current().deviceId, s.clientStore.current().publicKey)).toBe(true)

    s.business.capabilities.mockImplementationOnce(() => {
      expect(s.clientStore.trustedPeer(s.host.deviceId)).toBeUndefined()
      expect(s.controller.connectionCount()).toBe(1)
      return ['harness.remote.v1']
    })
    expect(s.configuredId).not.toBe(s.host.deviceId)
    await expect(s.runtime.setMode('remote', s.configuredId)).resolves.toMatchObject({
      mode: 'remote', connected: true, transport: 'LAN', connectedTargetDeviceId: s.configuredId,
      connectedHostDeviceId: s.host.deviceId, target: { deviceId: s.configuredId, name: 'Configured Host' },
      remoteFeatures: { remoteGateway: true },
    })
    await reloaded.loadOrCreate('Client')
    expect(reloaded.trustedPeer(s.host.deviceId)?.publicKey).toBe(s.host.publicKey)
    expect(reloaded.trustedPeer(s.configuredId)).toBeUndefined()
    await expect(s.gateway.invoke(query)).resolves.toBe('remote')
    expect(s.business.dispatch).toHaveBeenCalledWith('session/list', { args: {} })
    expect(s.localInvoke).not.toHaveBeenCalled()
  })

  it('recovers a transient socket loss without replaying a pending mutation and cancels recovery on explicit local selection', async () => {
    const s = await setup()
    await s.runtime.setMode('remote', s.configuredId)
    const entered = deferred<void>()
    const release = deferred<void>()
    cleanups.push(async () => release.resolve())
    s.business.dispatch.mockImplementationOnce(async () => {
      entered.resolve()
      await release.promise
      return { ok: true, value: 'committed-once' }
    })
    const pending = s.gateway.invoke({ namespace: 'session', method: 'prompt', args: { text: 'once' } })
    const rejected = expect(pending).rejects.toMatchObject({ code: 'TRANSPORT_CLOSED' })
    await entered.promise
    await s.controller.closeConnection(s.accepted[0]!, 'TRANSPORT_CLOSED')
    release.resolve()
    await rejected
    await vi.waitFor(() => expect(s.runtime.status()).toMatchObject({ connected: true, mode: 'remote', recoveryGeneration: 1 }))
    expect(s.accepted).toHaveLength(2)
    await expect(s.gateway.invoke(query)).resolves.toBe('remote')
    expect(s.business.dispatch.mock.calls.map(([endpoint]) => endpoint)).toEqual(['session/prompt', 'session/list'])
    expect(s.localInvoke).not.toHaveBeenCalled()

    const recovering = deferred<Promise<Record<string, unknown>>>()
    s.business.capabilities.mockImplementationOnce(() => {
      recovering.resolve(s.runtime.setMode('local'))
      return ['harness.remote.v1']
    })
    await s.controller.closeConnection(s.accepted[1]!, 'TRANSPORT_CLOSED')
    await expect(recovering.promise).resolves.toMatchObject({ mode: 'local', connected: false, recoveryGeneration: 1 })
    await vi.waitFor(() => expect(s.controller.connectionCount()).toBe(0))
    await expect(s.gateway.invoke(query)).resolves.toBe('local')
    expect(s.runtime.status()).toMatchObject({ mode: 'local', connected: false, recoveryGeneration: 1 })
    expect(s.business.dispatch).toHaveBeenCalledTimes(2)
  })

  it('rejects a changed key for the pinned Host identity before accepting another encrypted business connection', async () => {
    const s = await setup()
    await s.runtime.setMode('remote', s.configuredId)
    const originalKey = s.host.publicKey
    await s.runtime.setMode('local')
    await vi.waitFor(() => expect(s.controller.connectionCount()).toBe(0))
    Object.assign(s.host, generateKeyPair())
    await expect(s.runtime.setMode('remote', s.configuredId)).rejects.toMatchObject({ code: 'PEER_IDENTITY_MISMATCH' })
    expect(s.runtime.status()).toMatchObject({ mode: 'local', connected: false })
    expect(s.accepted).toHaveLength(1)
    expect(s.business.capabilities).toHaveBeenCalledOnce()
    expect(s.business.dispatch).not.toHaveBeenCalled()
    const reloaded = new IdentityStore({ directory: s.clientStore.directory })
    await reloaded.loadOrCreate('Client')
    expect(reloaded.trustedPeer(s.host.deviceId)?.publicKey).toBe(originalKey)
    await expect(s.gateway.invoke(query)).resolves.toBe('local')
  })
})
