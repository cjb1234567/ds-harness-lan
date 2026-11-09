import { hostname } from 'node:os'
import { isIP } from 'node:net'
import type { Volatile, VolatileSnapshot } from '@deepseek-ai/cordis'
import s from '@deepseek-ai/schemastery'
import { z } from 'zod'

export const DEFAULT_REMOTE_SERVER_URL = 'https://dsh.r2049.cn'

export interface Config {
  enabled?: boolean
  role?: 'host' | 'client' | 'both'
  serverUrl?: string
  deviceName?: string
  terminal?: { enabled?: boolean }
  remoteTools?: { enabled?: boolean }
  hostControl?: { enabled?: boolean }
  loopback?: { ports?: number[] }
  lan?: {
    enabled?: boolean
    bindAddress?: string
    port?: number
    accessToken?: string
    connectTimeoutMs?: number
    handshakeTimeoutMs?: number
    heartbeatIntervalMs?: number
    maxConnections?: number
    hosts?: Array<{ id: string; name: string; host: string; port: number; accessToken?: string }>
  }
  forceRelay?: boolean
  /**
   * When a known peer device presents a NEW identity key after re-authorizing with the
   * same account membership (e.g. the peer reinstalled the Harness), rotate the pinned
   * key instead of rejecting the connection. The new key is validated against the
   * account directory before this policy applies. Default: false (pin strictly).
   */
  rotatePinnedPeerKey?: boolean
  logLevel?: 'debug' | 'info' | 'warn' | 'error'
  reconnect?: boolean | {
    initialDelayMs?: number
    maxDelayMs?: number
    jitter?: number
  }
  /** Optional Codex domain carried by the existing authenticated Remote Plugin. */
  codex?: {
    enabled?: boolean
    binary?: string
  }
  /** Optional Cursor ACP domain carried by the existing authenticated Remote Plugin. */
  cursor?: {
    enabled?: boolean
    binary?: string
  }
  acp?: { enabled?: boolean; backends?: Array<{ id:string; enabled?: boolean; command?: string; args?: string[]; cwd?: string }>; backend?: string; command?: string; args?: string[]; cwd?: string }
}

export interface ResolvedCodexConfig {
  enabled: boolean
  binary: string
}

export interface ResolvedCursorConfig {
  enabled: boolean
  binary: string
}

export interface ResolvedAcpBackendConfig {
  id: string
  enabled: boolean
  command: string
  args: string[]
  cwd?: string
}

export interface ResolvedAcpConfig {
  enabled: boolean
  backends: ResolvedAcpBackendConfig[]
}

export interface ResolvedLanConfig {
  enabled: boolean
  bindAddress: string
  port: number
  accessToken: string
  connectTimeoutMs: number
  handshakeTimeoutMs: number
  heartbeatIntervalMs: number
  maxConnections: number
  hosts: Array<{ id: string; name: string; host: string; port: number; accessToken?: string }>
}

export interface ResolvedConfig {
  enabled: boolean
  role: 'host' | 'client' | 'both'
  serverUrl?: string
  deviceName: string
  forceRelay: boolean
  rotatePinnedPeerKey: boolean
  logLevel: 'debug' | 'info' | 'warn' | 'error'
  reconnect: {
    enabled: boolean
    initialDelayMs: number
    maxDelayMs: number
    jitter: number
  }
  terminal: { enabled: boolean }
  remoteTools?: { enabled: boolean }
  hostControl?: { enabled: boolean }
  loopback: { ports: number[] }
  lan: ResolvedLanConfig
  codex: ResolvedCodexConfig
  cursor: ResolvedCursorConfig
  acp?: ResolvedAcpConfig
}

/** The entry's volatile Cordis config: one stable reference for the whole section. */
export type EntryConfig = Volatile<Config>

/** Config accepted by {@link resolveConfig}: the composition seed or a live snapshot. */
export type ConfigInput = Config | VolatileSnapshot<Config>

/**
 * Schemastery schema for the plugin entry. On DSH 0.1.7-rc.1 and newer the
 * whole section is `.volatile()` (DSH-0.1.7-RC1-04): the Loader hands `apply`
 * a single live reference whose `.get()` always returns the latest committed
 * value, and the settings service persists edits in the active profile's
 * `cordis.patch.yml` under this entry id. On older hosts the helper above keeps
 * the plain schema required by the namespace-registration API.
 */
const entryConfigSchema = s.object({
  enabled: s.boolean(),
  role: s.union(['host', 'client', 'both'] as const),
  serverUrl: s.string(),
  deviceName: s.string(),
  terminal: s.object({ enabled: s.boolean() }),
  remoteTools: s.object({ enabled: s.boolean() }),
  hostControl: s.object({ enabled: s.boolean() }),
  loopback: s.object({ ports: s.array(s.number()) }),
  lan: s.object({
    enabled: s.boolean(),
    bindAddress: s.string(),
    port: s.number(),
    accessToken: s.string(),
    connectTimeoutMs: s.number(),
    handshakeTimeoutMs: s.number(),
    heartbeatIntervalMs: s.number(),
    maxConnections: s.number(),
    hosts: s.array(s.object({
      id: s.string(), name: s.string(), host: s.string(), port: s.number(), accessToken: s.string(),
    })),
  }),
  forceRelay: s.boolean(),
  rotatePinnedPeerKey: s.boolean(),
  logLevel: s.union(['debug', 'info', 'warn', 'error'] as const),
  reconnect: s.union([
    s.boolean(),
    s.object({
      initialDelayMs: s.number(),
      maxDelayMs: s.number(),
      jitter: s.number(),
    }),
  ]),
  codex: s.object({
    enabled: s.boolean(),
    binary: s.string(),
  }),
  cursor: s.object({
    enabled: s.boolean(),
    binary: s.string(),
  }),
  acp: s.object({ enabled: s.boolean(), backends: s.array(s.object({ id:s.string(), enabled:s.boolean(), command:s.string(), args:s.array(s.string()), cwd:s.string() })) }),
})

/**
 * Mark the entry as live-editable when the host Schemastery supports the
 * 0.1.7 volatile schema mode. Older DSH releases ship an earlier Schemastery
 * where the method does not exist; their settings registry expects the plain
 * schema and must still be able to import the plugin without throwing.
 */
export function withVolatileSchema<T>(schema: T): T {
  const volatile = (schema as { volatile?: unknown }).volatile
  return typeof volatile === 'function'
    ? (volatile as (this: T) => T).call(schema)
    : schema
}

export const Config: s<Config> = withVolatileSchema(entryConfigSchema) as unknown as s<Config>

const reconnectSchema = z.union([
  z.boolean(),
  z.object({
    initialDelayMs: z.number().int().min(100).max(60_000).optional(),
    maxDelayMs: z.number().int().min(1_000).max(300_000).optional(),
    jitter: z.number().min(0).max(1).optional(),
  }).strict(),
])

const lanIpSchema = z.string().refine(value => isIP(value) !== 0, 'must be an IPv4 or IPv6 address')
const lanPortSchema = z.number().int().min(1).max(65535)
const lanTokenSchema = z.string().refine(value => value.trim().length >= 16, 'accessToken must contain at least 16 non-padding characters')
const lanSchema = z.object({
  enabled: z.boolean().optional(),
  bindAddress: lanIpSchema.optional(),
  port: lanPortSchema.optional(),
  accessToken: z.string().optional(),
  connectTimeoutMs: z.number().int().positive().optional(),
  handshakeTimeoutMs: z.number().int().positive().optional(),
  heartbeatIntervalMs: z.number().int().positive().optional(),
  maxConnections: z.number().int().positive().optional(),
  hosts: z.array(z.object({
    id: z.string().trim().min(1),
    name: z.string().trim().min(1),
    host: lanIpSchema,
    port: lanPortSchema,
    accessToken: lanTokenSchema.optional(),
  }).strict()).superRefine((hosts, ctx) => {
    const ids = new Set<string>()
    hosts.forEach((host, index) => {
      if (ids.has(host.id)) {
        ctx.addIssue({ code: 'custom', path: [index, 'id'], message: 'LAN host ids must be unique' })
      }
      ids.add(host.id)
    })
  }).optional(),
}).strict().superRefine((lan, ctx) => {
  if (lan.enabled && !lanTokenSchema.safeParse(lan.accessToken).success) {
    ctx.addIssue({ code: 'custom', path: ['accessToken'], message: 'lan.accessToken must contain at least 16 non-padding characters when LAN is enabled' })
  }
})

const configSchema = z.object({
  enabled: z.boolean().optional(),
  role: z.enum(['host', 'client', 'both']).optional(),
  serverUrl: z.string().url().optional(),
  deviceName: z.string().trim().min(1).max(80).optional(),
  terminal: z.object({ enabled: z.boolean().optional() }).strict().optional(),
  remoteTools: z.object({ enabled: z.boolean().optional() }).strict().optional(),
  hostControl: z.object({ enabled: z.boolean().optional() }).strict().optional(),
  loopback: z.object({ ports: z.array(z.number().int().min(1024).max(65535)).max(16).optional() }).strict().optional(),
  lan: lanSchema.optional(),
  forceRelay: z.boolean().optional(),
  rotatePinnedPeerKey: z.boolean().optional(),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']).optional(),
  reconnect: reconnectSchema.optional(),
  codex: z.object({
    enabled: z.boolean().optional(),
    binary: z.string().trim().min(1).max(4096).optional(),
  }).strict().optional(),
  cursor: z.object({
    enabled: z.boolean().optional(),
    binary: z.string().trim().min(1).max(4096).optional(),
  }).strict().optional(),
  acp: z.object({ enabled:z.boolean().optional(), backends:z.array(z.object({ id:z.string().trim().regex(/^[a-z0-9][a-z0-9._-]{0,31}$/i), enabled:z.boolean().optional(), command:z.string().trim().min(1).max(4096).optional(), args:z.array(z.string().max(4096)).max(32).optional(), cwd:z.string().max(4096).optional() }).strict()).max(12).optional(), backend:z.string().trim().regex(/^[a-z0-9][a-z0-9._-]{0,31}$/i).optional(), command:z.string().trim().min(1).max(4096).optional(), args:z.array(z.string().max(4096)).max(32).optional(), cwd:z.string().max(4096).optional() }).strict().optional(),
}).strict()

export function resolveConfig(input: ConfigInput = {}, env: NodeJS.ProcessEnv = process.env): ResolvedConfig {
  const parsed = configSchema.parse(input)
  const configuredCursorBackend = parsed.acp?.backends?.find(item => item.id === 'cursor')
  const legacyCursorEnabled = parsed.acp?.backend === 'cursor' ? parsed.acp.enabled : undefined
  const cursorEnabled = configuredCursorBackend?.enabled
    ?? parsed.cursor?.enabled
    ?? legacyCursorEnabled
    ?? false
  const codexBackend = parsed.acp?.backends?.find(item => item.id === 'codex')
  const codexEnabled = codexBackend?.enabled ?? parsed.codex?.enabled ?? true
  const acpEnabled = parsed.acp?.enabled ?? true
  const reconnect = typeof parsed.reconnect === 'object' ? parsed.reconnect : {}
  const configuredServerUrl = parsed.serverUrl ?? env.DSH_REMOTE_SERVER
  const serverUrl = configuredServerUrl === undefined ? undefined : normalizeServerUrl(configuredServerUrl)
  const initialDelayMs = reconnect.initialDelayMs ?? 1_000
  const maxDelayMs = reconnect.maxDelayMs ?? 30_000
  if (maxDelayMs < initialDelayMs) {
    throw new TypeError('reconnect.maxDelayMs must be greater than or equal to reconnect.initialDelayMs')
  }
  return {
    enabled: parsed.enabled ?? true,
    role: parsed.role ?? 'host',
    ...(serverUrl === undefined ? {} : { serverUrl }),
    deviceName: parsed.deviceName ?? env.DSH_REMOTE_DEVICE_NAME ?? hostname(),
    hostControl: { enabled: parsed.hostControl?.enabled ?? true },
    terminal: { enabled: parsed.terminal?.enabled ?? (env.DSH_REMOTE_TERMINAL_ENABLED === undefined || env.DSH_REMOTE_TERMINAL_ENABLED === 'true') },
    remoteTools: { enabled: parsed.remoteTools?.enabled ?? true },
    loopback: { ports: [...new Set(parsed.loopback?.ports ?? [])] },
    lan: {
      enabled: parsed.lan?.enabled ?? false,
      bindAddress: parsed.lan?.bindAddress ?? '0.0.0.0',
      port: parsed.lan?.port ?? 59090,
      accessToken: parsed.lan?.accessToken ?? '',
      connectTimeoutMs: parsed.lan?.connectTimeoutMs ?? 10_000,
      handshakeTimeoutMs: parsed.lan?.handshakeTimeoutMs ?? 10_000,
      heartbeatIntervalMs: parsed.lan?.heartbeatIntervalMs ?? 25_000,
      maxConnections: parsed.lan?.maxConnections ?? 32,
      hosts: parsed.lan?.hosts ?? [],
    },
    forceRelay: parsed.forceRelay ?? false,
    rotatePinnedPeerKey: parsed.rotatePinnedPeerKey ?? false,
    logLevel: parsed.logLevel ?? 'info',
    reconnect: {
      enabled: parsed.reconnect !== false,
      initialDelayMs,
      maxDelayMs,
      jitter: reconnect.jitter ?? 0.2,
    },
    codex: {
      enabled: acpEnabled && codexEnabled,
      binary: codexBackend?.command ?? parsed.codex?.binary ?? 'codex',
    },
    cursor: {
      enabled: cursorEnabled,
      binary: configuredCursorBackend?.command ?? parsed.cursor?.binary ?? env.DSH_REMOTE_CURSOR_BINARY ?? env.DSH_REMOTE_ACP_BINARY ?? 'agent',
    },
    acp: {
      enabled: acpEnabled,
      backends: [...new Set(['codex', 'cursor', 'antigravity', 'pi', 'claude', 'opencode', ...(parsed.acp?.backends?.filter(item => item.id !== 'kimi').map(item => item.id) ?? [])])].map(id => {
        const configured = parsed.acp?.backends?.find(item => item.id === id)
        const legacy = parsed.acp?.backend === id ? parsed.acp : undefined
        const defaults: Record<string, string> = { codex: 'codex', cursor: 'agent', antigravity: 'agy', pi: 'pi-acp', claude: 'claude-agent-acp', opencode: 'opencode' }
        const cursorCommand = id === 'codex' ? parsed.codex?.binary : id === 'cursor'
          ? parsed.cursor?.binary ?? env.DSH_REMOTE_CURSOR_BINARY ?? env.DSH_REMOTE_ACP_BINARY
          : undefined
        const cwd = configured?.cwd ?? legacy?.cwd
        return {
          id,
          enabled: configured?.enabled ?? legacy?.enabled
            ?? (id === 'codex' ? codexEnabled : id === 'cursor' ? cursorEnabled : id === 'pi' ? true : id === 'claude' ? true : id === 'opencode' ? true : parsed.acp !== undefined),
          command: configured?.command ?? legacy?.command ?? cursorCommand ?? defaults[id] ?? id,
          args: id === 'codex' ? ['app-server'] : configured?.args ?? legacy?.args
            ?? (id === 'pi' || id === 'claude' ? [] : id === 'antigravity' ? ['--input-format', 'stream-json', '--output-format', 'stream-json'] : ['acp']),
          ...(cwd === undefined ? {} : { cwd }),
        }
      }),
    },
  }
}

/** Validate untrusted LAN configuration and apply the same defaults as the entry config. */
export function parseLanConfig(input: unknown): ResolvedLanConfig {
  const parsed = lanSchema.parse(input)
  return resolveConfig({ lan: parsed }, {}).lan
}

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]'])

/** IPv4 hosts that are only reachable on loopback, a LAN, link-local, or CGNAT/VPN networks. */
function isPrivateNetworkHostname(hostname: string): boolean {
  if (LOCAL_HOSTS.has(hostname)) return true
  const match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(hostname)
  if (match === null) return false
  const octets = match.slice(1).map(Number)
  if (octets.some(value => value > 255)) return false
  const [a, b] = octets
  return (
    a === 10 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 169 && b === 254) ||
    (a === 100 && b >= 64 && b <= 127)
  )
}

export function normalizeServerUrl(value: string): string {
  const url = new URL(value)
  const privateHttp = url.protocol === 'http:' && isPrivateNetworkHostname(url.hostname)
  if (url.protocol !== 'https:' && !privateHttp) {
    throw new TypeError('serverUrl must use HTTPS (HTTP is allowed only for localhost or private-network addresses)')
  }
  if (url.username !== '' || url.password !== '') {
    throw new TypeError('serverUrl must not contain credentials')
  }
  if (url.search !== '' || url.hash !== '') {
    throw new TypeError('serverUrl must not contain query parameters or fragments')
  }
  if (url.pathname !== '' && url.pathname !== '/') {
    throw new TypeError('serverUrl must be an origin without a path')
  }
  return url.origin
}
