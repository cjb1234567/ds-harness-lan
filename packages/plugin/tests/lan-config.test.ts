import { describe, expect, it } from 'vitest'
import { resolveConfig, type Config } from '../src/config.js'

const accessToken = 'lan-test-token-1234567890'
const host = { id: 'office', name: 'Office', host: '192.168.1.20', port: 59090 }

describe('LAN config', () => {
  it('keeps LAN opt-in with resolved defaults and preserves legacy business config', () => {
    const config = resolveConfig({}, {})
    expect(config.lan).toEqual({
      enabled: false,
      bindAddress: '0.0.0.0',
      port: 59090,
      accessToken: '',
      connectTimeoutMs: 10_000,
      handshakeTimeoutMs: 10_000,
      heartbeatIntervalMs: 25_000,
      maxConnections: 32,
      hosts: [],
    })
    expect(config).toMatchObject({
      enabled: true, role: 'host', terminal: { enabled: true },
      remoteTools: { enabled: true }, codex: { enabled: true },
    })
    expect(resolveConfig({ lan: { enabled: false } }, {}).lan.accessToken).toBe('')
    expect(resolveConfig({ lan: { enabled: false, accessToken: '' } }, {}).lan.enabled).toBe(false)
  })

  it('resolves explicit LAN settings and literal IPv4/IPv6 hosts without changing tokens', () => {
    const lan = {
      enabled: true,
      bindAddress: '::',
      port: 1,
      accessToken,
      connectTimeoutMs: 2_000,
      handshakeTimeoutMs: 3_000,
      heartbeatIntervalMs: 4_000,
      maxConnections: 2,
      hosts: [host, { id: 'ipv6', name: 'IPv6', host: '::1', port: 65535, accessToken }],
    }
    expect(resolveConfig({ lan }, {}).lan).toEqual(lan)
    expect(resolveConfig({ lan: { enabled: true, accessToken: '1234567890123456' } }, {}).lan.enabled).toBe(true)
    expect(resolveConfig({ serverUrl: 'https://example.com', forceRelay: true, lan }, {}).serverUrl).toBe('https://example.com')
  })

  it('fails closed for missing or weak enabled-LAN tokens without disclosing them', () => {
    for (const token of [undefined, '', 'short-secret', '                ', ' 12345678901234 ']) {
      let error: unknown
      try {
        resolveConfig({ lan: { enabled: true, accessToken: token } }, {})
      } catch (caught) {
        error = caught
      }
      expect.soft(error, `token length ${token?.length ?? 'missing'}`).toBeInstanceOf(Error)
      expect.soft(String(error)).toContain('accessToken')
      if (token?.trim()) expect.soft(String(error)).not.toContain(token)
    }
    const remoteSecret = 'host-secret'
    expect(() => resolveConfig({ lan: { hosts: [{ ...host, accessToken: remoteSecret }] } }, {})).toThrow(/accessToken/)
    try {
      resolveConfig({ lan: { accessToken, hosts: [{ ...host, accessToken: remoteSecret }] } }, {})
    } catch (error) {
      expect(String(error)).not.toContain(accessToken)
      expect(String(error)).not.toContain(remoteSecret)
    }
  })

  it('rejects DNS names, URLs and invalid IP literals for hosts and bind addresses', () => {
    for (const address of ['localhost', 'example.com', 'http://192.168.1.20', '192.168.1.20:59090', '[::1]', '256.1.2.3', '127.1', '', ' 127.0.0.1 ']) {
      expect.soft(() => resolveConfig({ lan: { hosts: [{ ...host, host: address }] } }, {}), `host: ${address}`).toThrow()
      expect.soft(() => resolveConfig({ lan: { bindAddress: address } }, {}), `bindAddress: ${address}`).toThrow()
    }
  })

  it('rejects invalid ports, timing limits and connection limits', () => {
    for (const port of [0, -1, 65536, 1.5, NaN, Infinity]) {
      expect.soft(() => resolveConfig({ lan: { port } }, {}), `listener port: ${port}`).toThrow()
      expect.soft(() => resolveConfig({ lan: { hosts: [{ ...host, port }] } }, {}), `host port: ${port}`).toThrow()
    }
    for (const field of ['connectTimeoutMs', 'handshakeTimeoutMs', 'heartbeatIntervalMs', 'maxConnections'] as const) {
      for (const value of [0, -1, 0.5, NaN, Infinity]) {
        expect.soft(() => resolveConfig({ lan: { [field]: value } }, {}), `${field}: ${value}`).toThrow()
      }
    }
  })

  it('requires unique nonempty host identities and nonempty names', () => {
    const cases: Array<{ name: string; lan: Config['lan'] }> = [
      { name: 'duplicate ids', lan: { hosts: [host, { ...host, host: '::1' }] } },
      { name: 'normalized duplicate ids', lan: { hosts: [host, { ...host, id: ' office ' }] } },
      { name: 'blank id', lan: { hosts: [{ ...host, id: ' ' }] } },
      { name: 'blank name', lan: { hosts: [{ ...host, name: ' ' }] } },
    ]
    for (const scenario of cases) {
      expect.soft(() => resolveConfig({ lan: scenario.lan }, {}), scenario.name).toThrow()
    }
  })
})
