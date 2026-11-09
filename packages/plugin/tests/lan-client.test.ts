import { afterEach, describe, expect, it, vi } from 'vitest'
import { generateKeyPair } from '@dsh-remote/crypto'
import { ClientModeRuntime } from '../src/client-runtime.js'
import { ClientConnection } from '../src/client-connection.js'
import { resolveConfig } from '../src/config.js'
import { discoverLanDevices } from '../src/lan-discovery.js'
import type { IdentityStore } from '../src/identity-store.js'
import type { ClientServerApi } from '../src/server-api.js'
import type { SafeLogger } from '../src/logging.js'

const { probe } = vi.hoisted(() => ({ probe: vi.fn() }))
vi.mock('../src/lan-transport.js', async importOriginal => ({
  ...await importOriginal<typeof import('../src/lan-transport.js')>(), fetchLanHost: probe,
}))
afterEach(() => vi.resetAllMocks())
const logger = { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() } as unknown as SafeLogger
const keys = generateKeyPair()
const identity = { schemaVersion: 1 as const, deviceId: 'client-real', name: 'Client', fingerprint: 'key', ...keys }
function config() {
  return resolveConfig({ lan: { enabled: true, accessToken: 'local-secret-1234567890', hosts: [
    { id: 'selection-one', name: 'Configured one', host: '127.0.0.1', port: 49121 },
    { id: 'selection-two', name: 'Configured two', host: '127.0.0.1', port: 49122, accessToken: 'override-secret-1234567890' },
  ] } }, {})
}
const facts = { deviceId: 'host-real', name: 'Actual Host', platform: 'linux', identityPublicKey: keys.publicKey }

describe('LAN Client authorization boundary', () => {
  it('keeps configured hosts and selection keys when individual probes fail, without leaking responses', async () => {
    const cfg = config()
    const probeHost = vi.fn().mockResolvedValueOnce(facts)
      .mockRejectedValueOnce(Object.assign(new Error('response with local-secret-1234567890'), { code: 'AUTH_INVALID' }))
    const devices = await discoverLanDevices(cfg.lan, undefined, probeHost)
    expect(devices).toMatchObject([
      { deviceId: 'selection-one', name: 'Configured one', hostDeviceId: 'host-real', online: true },
      { deviceId: 'selection-two', online: false, error: 'AUTH_INVALID' },
    ])
    expect(probeHost.mock.calls.map(call => call[0].accessToken)).toEqual(['local-secret-1234567890', 'override-secret-1234567890'])
    expect(JSON.stringify(devices)).not.toContain('local-secret-1234567890')
    // enabled controls the local listener, not outbound Client discovery.
    probeHost.mockResolvedValue(facts)
    const disabled = await discoverLanDevices({ ...cfg.lan, enabled: false }, undefined, probeHost)
    expect(disabled.every(host => host.online)).toBe(true)
    expect(probeHost).toHaveBeenCalledTimes(4)
  })

  it('propagates cancellation rather than reporting an aborted probe as an offline Host', async () => {
    const abort = new AbortController()
    const probeHost = vi.fn(async () => { abort.abort(); throw new Error('cancelled') })
    await expect(discoverLanDevices(config().lan, abort.signal, probeHost)).rejects.toThrow()
    expect(probeHost).toHaveBeenCalledTimes(1)
  })

  it('uses local identity only for startup/control/discovery and refuses every account entry without Server calls', async () => {
    const calls: string[] = []
    const server = new Proxy({}, { get: (_target, key) => { calls.push(String(key)); throw new Error('Unexpected Server use') } }) as ClientServerApi
    const identities = { loadOrCreate: vi.fn(async () => identity) } as unknown as IdentityStore
    const cfg = config()
    cfg.lan.enabled = false
    const runtime = new ClientModeRuntime(cfg, identities, server,
      { invoke: vi.fn(async () => undefined) }, logger)
    await runtime.start()
    try {
      expect(runtime.status()).toMatchObject({ available: true, identityReady: true, clientAuthorized: true,
        hostAuthorizationAvailable: true, preferredTransports: ['lan'], lan: { enabled: false, configuredHosts: 2 } })
      const signal = new AbortController().signal
      for (const endpoint of ['client.account.providers', 'client.account.login', 'client.account.qr.start',
        'client.account.qr.poll', 'host.account.login', 'host.registration-code.submit']) {
        expect(await runtime.handleControl(endpoint, {}, signal)).toMatchObject({ ok: false,
          error: { details: { remoteCode: 'LAN_ACCOUNT_UNAVAILABLE' } } })
      }
      expect(await runtime.handleControl('client.authorization.status', {}, signal)).toMatchObject({ ok: true, value: { hasCredentials: true } })
      probe.mockResolvedValue(facts)
      expect(await runtime.devices()).toHaveLength(2)
      await expect(runtime.setMode('remote', 'unconfigured')).rejects.toMatchObject({ code: 'LAN_HOST_NOT_CONFIGURED' })
      await expect(runtime.authorizeClientWithAccount('account', 'password')).rejects.toMatchObject({ code: 'LAN_ACCOUNT_UNAVAILABLE' })
      await expect(runtime.clearClientAuthorization()).rejects.toMatchObject({ code: 'LAN_ACCOUNT_UNAVAILABLE' })
    } finally { await runtime.close() }
    expect(calls).toEqual([])
  })

  it('rejects a changed real Host identity before starting the carrier or replacing its local pin', async () => {
    probe.mockResolvedValue(facts)
    const trustPeer = vi.fn()
    const identities = { trustedPeer: vi.fn(() => ({ deviceId: 'host-real', publicKey: 'different' })), trustPeer } as unknown as IdentityStore
    const cfg = config()
    cfg.lan.enabled = false
    const connection = new ClientConnection({ config: cfg, identities, requireIdentity: () => identity,
      server: {} as ClientServerApi, connectionProgress: undefined, connectionProgressRun: 0,
      rtcFactoryProvider: vi.fn(), logger })
    await expect(connection.connect('selection-one')).rejects.toMatchObject({ code: 'PEER_IDENTITY_MISMATCH' })
    expect(identities.trustedPeer).toHaveBeenCalledWith('host-real')
    expect(trustPeer).not.toHaveBeenCalled()
  })
})
