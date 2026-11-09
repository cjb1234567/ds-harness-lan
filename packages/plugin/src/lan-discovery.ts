import type { ResolvedLanConfig } from './config.js'
import { ClientModeError } from './client-runtime-contract.js'
import type { RemoteDeviceView } from './client-runtime-contract.js'
import { fetchLanHost, type LanHostFacts } from './lan-transport.js'

export type LanHost = ResolvedLanConfig['hosts'][number]
export type LanHostProbe = typeof fetchLanHost

/** Probe only explicitly configured endpoints. Failure never falls back to a public Server. */
export async function discoverLanDevices(
  config: ResolvedLanConfig,
  signal?: AbortSignal,
  probe: LanHostProbe = fetchLanHost,
): Promise<RemoteDeviceView[]> {
  signal?.throwIfAborted()
  const devices: RemoteDeviceView[] = []
  for (const host of config.hosts) {
    signal?.throwIfAborted()
    const device: RemoteDeviceView = {
      deviceId: host.id, name: host.name, platform: 'unknown',
      address: `${host.host}:${host.port}`, online: false,
    }
    try {
      const facts = await probe(lanHostEndpoint(config, host), config.connectTimeoutMs, signal)
      signal?.throwIfAborted()
      devices.push({ ...device, hostDeviceId: facts.deviceId, platform: facts.platform,
        online: true, lastSeenAt: Date.now(),
        ...(facts.clientVersion === undefined ? {} : { clientVersion: facts.clientVersion }),
        ...(facts.harnessVersion === undefined ? {} : { harnessVersion: facts.harnessVersion }),
      })
    } catch (error) {
      signal?.throwIfAborted()
      // Never expose a remote response, URL, or credential in control status.
      const code = error instanceof Error && 'code' in error && typeof error.code === 'string'
        && /^[A-Z_]{1,64}$/.test(error.code) ? error.code : 'LAN_HOST_UNREACHABLE'
      devices.push({ ...device, error: code })
    }
  }
  return devices
}

export function lanHostEndpoint(config: ResolvedLanConfig, host: LanHost): { host: string; port: number; accessToken: string } {
  return { host: host.host, port: host.port, accessToken: host.accessToken ?? config.accessToken }
}

export async function resolveLanHost(config: ResolvedLanConfig, id: string, signal?: AbortSignal): Promise<{ host: LanHost; facts: LanHostFacts }> {
  const host = config.hosts.find(host => host.id === id)
  if (host === undefined) throw new ClientModeError('LAN_HOST_NOT_CONFIGURED', 'The selected LAN Host is not configured locally.')
  const facts = await fetchLanHost(lanHostEndpoint(config, host), config.connectTimeoutMs, signal)
  signal?.throwIfAborted()
  return { host, facts }
}
