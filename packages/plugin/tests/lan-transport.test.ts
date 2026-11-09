import { mkdtemp, rm } from 'node:fs/promises'
import { request } from 'node:http'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import WebSocket from 'ws'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { RemoteClientCore } from '@dsh-remote/client-core'
import { createRpcResponse } from '@dsh-remote/protocol'
import { generateKeyPair } from '@dsh-remote/crypto'
import { LanTransport, fetchLanHost } from '../src/lan-transport.js'
import { LanHostListener } from '../src/lan-host.js'
import { ClientSecureTransport } from '../src/client-secure-transport.js'
import { ConnectionController } from '../src/connection-controller.js'
import { IdentityStore, type HostIdentity } from '../src/identity-store.js'
import { SafeLogger } from '../src/logging.js'
import { resolveConfig } from '../src/config.js'
import type { RpcRouter } from '../src/rpc-router.js'

const cleanups: Array<() => Promise<unknown>> = []
afterEach(async () => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  for (const cleanup of cleanups.splice(0).reverse()) await cleanup()
})
async function setup(bindAddress = '127.0.0.1') {
  const dir = await mkdtemp(join(tmpdir(), 'dsh-lan-test-'))
  cleanups.push(() => rm(dir, { recursive: true, force: true }))
  const hostStore = new IdentityStore({ directory: join(dir, 'host') })
  const clientStore = new IdentityStore({ directory: join(dir, 'client') })
  const host = await hostStore.loadOrCreate('host')
  const identity = await clientStore.loadOrCreate('client')
  const closed = vi.fn(async () => undefined)
  const controller = new ConnectionController(hostStore, () => ({
    handle: vi.fn(async message => createRpcResponse(message.id, { first: true })), closePeerStreams: closed,
  }) as unknown as RpcRouter)
  const lan = { ...resolveConfig({ lan: { accessToken: 'secret-test-token' } }).lan, port: 0, bindAddress, enabled: true,
    heartbeatIntervalMs: 100, handshakeTimeoutMs: 1000, maxConnections: 2 }
  const listener = new LanHostListener(lan, hostStore, controller, new SafeLogger({ debug() {}, info() {}, warn() {}, error() {} }))
  await listener.start()
  cleanups.push(() => listener.close())
  const address = { host: bindAddress === '::1' ? '::1' : '127.0.0.1', port: listener.status().port!, accessToken: lan.accessToken }
  const connect = (id: HostIdentity = identity, accessToken = address.accessToken, hostKey = host.publicKey) => {
    const transport = new LanTransport({ ...address, accessToken, localDeviceId: id.deviceId, targetDeviceId: host.deviceId,
      identityPublicKey: id.publicKey, connectTimeoutMs: 1000, handshakeTimeoutMs: 1000, heartbeatIntervalMs: 100 })
    const client = new RemoteClientCore(new ClientSecureTransport(transport, id, { deviceId: host.deviceId, publicKey: hostKey,
      name: 'host', platform: 'test', trustedAt: 0, fingerprint: host.fingerprint }), 1500)
    cleanups.push(() => client.close())
    return { client, transport }
  }
  return { listener, controller, closed, address, connect, hostStore, identity, host }
}
describe('direct LAN authenticated socket carrier', () => {
  it('registers Noise before the first RPC, pins identity, and cleans replacement/host close', async () => {
    const s = await setup()
    expect((await fetchLanHost(s.address, 1000)).identityPublicKey).toBe(s.host.publicKey)
    const first = s.connect()
    await first.client.connect()
    await expect(first.client.rpc('harness.api.call', {})).resolves.toEqual({ first: true })
    expect(first.transport.getStats().mode).toBe('LAN')
    expect(s.hostStore.isTrusted(s.identity.deviceId, s.identity.publicKey)).toBe(true)
    const next = s.connect()
    await next.client.connect()
    await expect(next.client.rpc('harness.api.call', {})).resolves.toEqual({ first: true })
    await vi.waitFor(() => expect(first.transport.getStats().connected).toBe(false))
    expect(s.controller.connectionCount()).toBe(1)
    await s.listener.close()
    expect(s.controller.connectionCount()).toBe(0)
    expect(s.listener.status().connections).toBe(0)
    expect(s.closed).toHaveBeenCalledTimes(2)
  })
  it('rejects bad HTTP/upgrade tokens and changed client or host Noise keys without RPC', async () => {
    const s = await setup()
    await expect(fetchLanHost({ ...s.address, accessToken: 'bad' }, 1000)).rejects.toMatchObject({ code: 'AUTH_INVALID' })
    const badToken = s.connect(s.identity, 'bad')
    await expect(badToken.client.connect()).rejects.toMatchObject({ code: 'AUTH_INVALID' })
    expect(s.hostStore.listTrustedPeers()).toHaveLength(0)
    const good = s.connect()
    await good.client.connect()
    await good.client.close()
    await vi.waitFor(() => expect(s.controller.connectionCount()).toBe(0))
    const changed = s.connect({ ...s.identity, ...generateKeyPair() })
    // Carrier connect resolves on hello.ack: a changed known key must fail before it.
    await expect(changed.transport.connect()).rejects.toMatchObject({ code: 'PEER_IDENTITY_MISMATCH' })
    expect(s.hostStore.trustedPeer(s.identity.deviceId)?.publicKey).toBe(s.identity.publicKey)
    // Same hello static key but wrong Noise private key must also fail closed.
    const invalidNoise = s.connect({ ...s.identity, privateKey: generateKeyPair().privateKey })
    await expect(invalidNoise.client.connect()).rejects.toBeInstanceOf(Error)
    const wrongHost = s.connect(s.identity, s.address.accessToken, generateKeyPair().publicKey)
    await expect(wrongHost.client.connect()).rejects.toBeInstanceOf(Error)
    expect(s.controller.connectionCount()).toBe(0)
  })
  it('rejects browser Origins and mismatched HTTP/upgrade authorities before disclosure or hello', async () => {
    const s = await setup()
    const cases = [
      { origin: 'http://evil.example' },
      { origin: '' },
      { origin: `http://${s.address.host}:${s.address.port}` },
      { host: `evil.example:${s.address.port}` },
      { host: `localhost:${s.address.port}` },
      { host: `127.0.0.2:${s.address.port}` },
      { host: `127.0.0.1:${s.address.port + 1}` },
    ]
    for (const headers of cases) {
      const response = await new Promise<{ status: number; body: string }>((resolve, reject) => {
        const req = request({ hostname: s.address.host, port: s.address.port, path: '/lan/v1/host',
          headers: { authorization: `Bearer ${s.address.accessToken}`, ...headers } }, res => {
          let body = ''
          res.on('data', chunk => { body += chunk })
          res.on('end', () => resolve({ status: res.statusCode!, body }))
        })
        req.on('error', reject)
        req.end()
      })
      expect(response, JSON.stringify(headers)).toEqual({ status: 403, body: '' })
      const status = await new Promise<number>((resolve, reject) => {
        const socket = new WebSocket(`ws://${s.address.host}:${s.address.port}/lan/v1/connect`, {
          headers: { authorization: `Bearer ${s.address.accessToken}`, ...headers },
        })
        socket.on('error', reject)
        socket.once('open', () => { socket.terminate(); reject(new Error('Unexpected upgrade')) })
        socket.once('unexpected-response', (_req, res) => { res.resume(); resolve(res.statusCode!) })
      })
      expect(status, JSON.stringify(headers)).toBe(403)
    }
    expect(s.hostStore.listTrustedPeers()).toHaveLength(0)
    expect(s.controller.connectionCount()).toBe(0)
  })
  it('matches wildcard destinations and IPv4-mapped/IPv6 bracket authorities without DNS aliases', async () => {
    for (const bindAddress of ['0.0.0.0', '::', '::1']) {
      const s = await setup(bindAddress)
      await expect(fetchLanHost(s.address, 1000)).resolves.toMatchObject({ deviceId: s.host.deviceId })
      if (bindAddress === '::') {
        const status = await new Promise<number>((resolve, reject) => {
          const req = request({ hostname: '127.0.0.1', port: s.address.port, path: '/lan/v1/host',
            headers: { authorization: `Bearer ${s.address.accessToken}`, host: `[::ffff:127.0.0.1]:${s.address.port}` } }, res => {
            res.resume()
            res.on('end', () => resolve(res.statusCode!))
          })
          req.on('error', reject)
          req.end()
        })
        expect(status).toBe(200)
      }
      const good = s.connect()
      await good.client.connect()
      await good.client.close()
      await s.listener.close()
    }
  })
  it('does not persist an unproved hello or failed Noise, then permits the genuine identity to pair', async () => {
    const s = await setup()
    const attacker = { ...s.identity, ...generateKeyPair() }
    const transport = new LanTransport({ ...s.address, localDeviceId: attacker.deviceId, targetDeviceId: s.host.deviceId,
      identityPublicKey: attacker.publicKey, connectTimeoutMs: 1000, handshakeTimeoutMs: 1000, heartbeatIntervalMs: 100 })
    cleanups.push(() => transport.close())
    await transport.connect()
    expect(s.hostStore.trustedPeer(attacker.deviceId)).toBeUndefined()
    const closed = new Promise<void>(resolve => transport.onClose(() => resolve()))
    await transport.sendHandshake(1, new Uint8Array(96))
    await closed
    const reloaded = new IdentityStore({ directory: s.hostStore.directory })
    await reloaded.loadOrCreate('host')
    expect(reloaded.listTrustedPeers()).toHaveLength(0)
    expect(s.controller.connectionCount()).toBe(0)
    const good = s.connect()
    await good.client.connect()
    await expect(good.client.rpc('harness.api.call', {})).resolves.toEqual({ first: true })
    expect(s.hostStore.trustedPeer(s.identity.deviceId)?.publicKey).toBe(s.identity.publicKey)
  })
  it('serializes concurrent successful Noise proofs for conflicting keys of one unpinned id', async () => {
    const s = await setup()
    const otherIdentity = { ...s.identity, ...generateKeyPair() }
    const first = s.connect()
    const second = s.connect(otherIdentity)
    const results = await Promise.allSettled([first.client.connect(), second.client.connect()])
    expect(results.filter(result => result.status === 'fulfilled')).toHaveLength(1)
    expect(results.filter(result => result.status === 'rejected')).toHaveLength(1)
    const winner = results[0]!.status === 'fulfilled' ? s.identity : otherIdentity
    expect(s.hostStore.trustedPeer(s.identity.deviceId)?.publicKey).toBe(winner.publicKey)
    expect(s.controller.connectionCount()).toBe(1)
  })
  it('validates all discovery facts, including bounded strings and optional version types', async () => {
    const facts = { deviceId: 'host', name: 'host', platform: 'test', identityPublicKey: generateKeyPair().publicKey,
      clientVersion: '0.5.23-lan.1', harnessVersion: '0.2.1-rc.1' }
    const invalid = [
      { ...facts, deviceId: '' }, { ...facts, deviceId: 'x'.repeat(129) },
      { ...facts, name: 'x'.repeat(81) }, { ...facts, platform: 'x'.repeat(41) },
      { ...facts, identityPublicKey: 'invalid' }, { ...facts, unexpected: true },
      { ...facts, clientVersion: 123 }, { ...facts, harnessVersion: {} },
      { ...facts, harnessVersion: 'x'.repeat(129) },
    ]
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    for (const value of invalid) {
      fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(value)))
      await expect(fetchLanHost({ host: '127.0.0.1', port: 1 }, 1000), JSON.stringify(value)).rejects.toMatchObject({ code: 'INVALID_MESSAGE' })
    }
    fetchMock.mockResolvedValueOnce(new Response('{bad json'))
    await expect(fetchLanHost({ host: '127.0.0.1', port: 1 }, 1000)).rejects.toMatchObject({ code: 'INVALID_MESSAGE' })
    fetchMock.mockResolvedValueOnce(new Response(' '.repeat(16_385)))
    await expect(fetchLanHost({ host: '127.0.0.1', port: 1 }, 1000)).rejects.toMatchObject({ code: 'FRAME_TOO_LARGE' })
    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(facts)))
    await expect(fetchLanHost({ host: '127.0.0.1', port: 1 }, 1000)).resolves.toEqual(facts)
  })
  it('bounds pending connections and expires unauthenticated Noise sessions', async () => {
    const s = await setup()
    const sockets: WebSocket[] = []
    cleanups.push(async () => { for (const socket of sockets) socket.terminate() })
    const open = () => new Promise<WebSocket>((resolve, reject) => {
      const socket = new WebSocket(`ws://${s.address.host}:${s.address.port}/lan/v1/connect`, { headers: { authorization: `Bearer ${s.address.accessToken}` } })
      sockets.push(socket)
      socket.on('error', reject)
      socket.once('open', () => resolve(socket))
    })
    await open()
    await open()
    await expect(open()).rejects.toBeInstanceOf(Error)
    await vi.waitFor(() => expect(sockets.slice(0, 2).every(socket => socket.readyState === WebSocket.CLOSED)).toBe(true), { timeout: 2500 })
    expect(s.controller.connectionCount()).toBe(0)
    const good = s.connect()
    await good.client.connect()
    await good.client.close()
    await vi.waitFor(() => expect(s.closed).toHaveBeenCalledOnce())
    expect(s.controller.connectionCount()).toBe(0)
  })
})
