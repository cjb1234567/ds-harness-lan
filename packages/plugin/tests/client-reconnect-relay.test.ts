import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, expect, it, vi } from 'vitest'
import { RemoteClientCore } from '@dsh-remote/client-core'
import { BaseTransport } from '@dsh-remote/webrtc'
import { ClientModeRuntime } from '../src/client-runtime.js'
import { resolveConfig } from '../src/config.js'
import { IdentityStore } from '../src/identity-store.js'
import type { ClientServerApi } from '../src/server-api.js'
import type { SafeLogger } from '../src/logging.js'
import type { ConnectedRemote } from '../src/client-runtime-contract.js'

let directory: string | undefined
let runtime: ClientModeRuntime | undefined
afterEach(async () => {
  await runtime?.close()
  runtime = undefined
  vi.useRealTimers()
  vi.restoreAllMocks()
  if (directory !== undefined) await rm(directory, { recursive: true, force: true })
  directory = undefined
})

class Carrier extends BaseTransport {
  connected = true
  async connect() {}
  async close() { this.connected = false }
  async send() {}
  getStats() { return { connected: this.connected, mode: 'LAN' as const } }
  drop(error?: Error) { this.connected = false; this.emitClose(error) }
}

it('stops LAN recovery on identity-pin failure without replaying work', async () => {
  directory = await mkdtemp(join(tmpdir(), 'dsh-lan-reconnect-'))
  const identities = new IdentityStore({ directory })
  const local = vi.fn(async () => undefined)
  const gateway = {
    invoke: local,
    dispatchRpc: async () => ({ ok: true }),
    wireStream: { open: async () => (async function* () {})(), failure: () => ({ code: 'internal', message: '', details: {} }) },
  }
  runtime = new ClientModeRuntime(resolveConfig({ lan: {
    enabled: false,
    accessToken: 'local-access-token-123456',
    hosts: [{ id: 'host', name: 'Host', host: '127.0.0.1', port: 59090 }],
  }, reconnect: { initialDelayMs: 100, maxDelayMs: 1000, jitter: 0 } }), identities,
  {} as ClientServerApi, gateway, { info: vi.fn(), warn: vi.fn(), debug: vi.fn(), error: vi.fn() } as unknown as SafeLogger)
  await runtime.start()
  const remoteCarriers: Carrier[] = []
  const connection = (runtime as unknown as { connection: { connect: (id: string, signal?: AbortSignal) => Promise<ConnectedRemote> } }).connection
  const connect = vi.spyOn(connection, 'connect').mockImplementation(async id => {
    if (remoteCarriers.length > 0) throw Object.assign(new Error('Host identity changed'), { code: 'PEER_IDENTITY_MISMATCH' })
    const carrier = new Carrier()
    remoteCarriers.push(carrier)
    const client = new RemoteClientCore(carrier)
    await client.connect()
    return {
      client,
      transport: { connectionDetails: async () => ({ preferredTransports: ['lan'], negotiatedCapabilities: [], webRtcEnabled: false }) },
      target: { deviceId: id, name: 'Host', platform: 'linux', publicKey: 'pinned-key', fingerprint: 'PINNED', trustedAt: 1 },
      features: { commandList: false, fileViewer: false, terminal: false, remoteGateway: true, codex: false,
        cursor: false, antigravity: false, opencode: false, pluginRoute: false },
      progressRunId: 1,
    }
  })
  try {
    await runtime.setMode('remote', 'host')
    vi.useFakeTimers()
    remoteCarriers[0]!.drop()
    await vi.advanceTimersByTimeAsync(5000)
    expect(runtime.status()).toMatchObject({ mode: 'remote', connected: false, recoveryGeneration: 0 })
    expect(connect).toHaveBeenCalledTimes(2)
    expect(remoteCarriers).toHaveLength(1)
    expect(local).not.toHaveBeenCalled()
  } finally {
    await runtime.close()
    runtime = undefined
    vi.useRealTimers()
  }
})
