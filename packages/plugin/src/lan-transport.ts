import WebSocket from 'ws'
import { z } from 'zod'
import { fromBase64Url, toBase64Url } from '@dsh-remote/crypto'
import type { TransportStats } from '@dsh-remote/protocol'
import { waitForRelayCapacity, type SecureHandshakeTransport } from '@dsh-remote/webrtc'

const lanHostFactsSchema = z.object({
  deviceId: z.string().min(1).max(128),
  name: z.string().min(1).max(80),
  platform: z.string().min(1).max(40),
  identityPublicKey: z.string().regex(/^[A-Za-z0-9_-]{43}$/).refine(value => {
    try { return fromBase64Url(value).byteLength === 32 && toBase64Url(fromBase64Url(value)) === value }
    catch { return false }
  }),
  clientVersion: z.string().min(1).max(128).optional(),
  harnessVersion: z.string().min(1).max(128).optional(),
}).strict()
export type LanHostFacts = z.infer<typeof lanHostFactsSchema>
export interface LanTransportOptions {
  host: string
  port: number
  accessToken?: string
  localDeviceId: string
  targetDeviceId: string
  identityPublicKey: string
  connectTimeoutMs: number
  handshakeTimeoutMs: number
  heartbeatIntervalMs: number
}
export const LAN_MAX_FRAME_BYTES = 1024 * 1024
export function lanUrl(host: string, port: number, path: string, ws = false): string {
  // Addresses, not arbitrary URLs: never let credentials escape to a supplied origin/path.
  if (!host || /[\s/@?#\\]/.test(host) || !Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid LAN address.')
  const address = host.includes(':') && !host.startsWith('[') ? `[${host}]` : host
  return `${ws ? 'ws' : 'http'}://${address}:${port}${path}`
}
export async function fetchLanHost(host: { host: string; port: number; accessToken?: string }, timeoutMs: number, signal?: AbortSignal): Promise<LanHostFacts> {
  const abort = new AbortController()
  const cancel = () => abort.abort(signal?.reason)
  signal?.addEventListener('abort', cancel, { once: true })
  const timer = setTimeout(() => abort.abort(), timeoutMs)
  try {
    signal?.throwIfAborted()
    const response = await fetch(lanUrl(host.host, host.port, '/lan/v1/host'), {
      headers: host.accessToken ? { authorization: `Bearer ${host.accessToken}` } : {}, signal: abort.signal, redirect: 'error',
    })
    if (!response.ok) throw lanError(response.status === 401 ? 'AUTH_INVALID' : 'CONNECTION_FAILED')
    const reader = response.body?.getReader()
    if (!reader) throw lanError('INVALID_MESSAGE')
    let text = ''
    let length = 0
    const decoder = new TextDecoder()
    try {
      for (;;) {
        const chunk = await reader.read()
        if (chunk.done) break
        length += chunk.value.byteLength
        if (length > 16_384) throw lanError('FRAME_TOO_LARGE')
        text += decoder.decode(chunk.value, { stream: true })
      }
      text += decoder.decode()
    } finally { await reader.cancel().catch(() => undefined) }
    let json: unknown
    try { json = JSON.parse(text) } catch { throw lanError('INVALID_MESSAGE') }
    const facts = lanHostFactsSchema.safeParse(json)
    if (!facts.success) throw lanError('INVALID_MESSAGE')
    return facts.data
  } finally { clearTimeout(timer); signal?.removeEventListener('abort', cancel) }
}
export function lanError(code: string): Error & { code: string } {
  return Object.assign(new Error(`LAN connection failed (${code}).`), { code })
}

/** Direct LAN carrier only. Noise is deliberately driven by ClientSecureTransport. */
export class LanTransport implements SecureHandshakeTransport {
  private socket?: WebSocket
  private connectionId?: string
  private connected = false
  private handshakeComplete = false
  private timer?: ReturnType<typeof setTimeout>
  private heartbeat?: ReturnType<typeof setInterval>
  private lastReceived = 0
  private bytesSent = 0
  private bytesReceived = 0
  private pendingReject?: (error: Error) => void
  private readonly messages = new Set<(data: Uint8Array) => void>()
  private readonly handshakes = new Set<(step: number, data: Uint8Array) => void>()
  private readonly closes = new Set<(error?: Error) => void>()
  constructor(private readonly options: LanTransportOptions) {}
  async connect(): Promise<void> {
    if (this.socket) throw lanError('CONNECTION_FAILED')
    const socket = new WebSocket(lanUrl(this.options.host, this.options.port, '/lan/v1/connect', true), {
      headers: this.options.accessToken ? { authorization: `Bearer ${this.options.accessToken}` } : {},
      maxPayload: LAN_MAX_FRAME_BYTES, perMessageDeflate: false, handshakeTimeout: this.options.connectTimeoutMs,
    })
    this.socket = socket
    await new Promise<void>((resolve, reject) => {
      this.pendingReject = reject
      this.timer = setTimeout(() => this.finish(socket, lanError('CONNECTION_TIMEOUT')), this.options.connectTimeoutMs)
      socket.on('open', () => {
        if (this.socket !== socket) return
        socket.send(JSON.stringify({ type: 'hello', deviceId: this.options.localDeviceId, targetDeviceId: this.options.targetDeviceId, identityPublicKey: this.options.identityPublicKey }))
      })
      socket.on('message', (raw, binary) => {
        const data = Array.isArray(raw) ? Buffer.concat(raw) : Buffer.from(raw as ArrayBuffer)
        if (this.socket !== socket) return
        this.lastReceived = Date.now()
        try {
          if (binary) {
            if (!this.connected || !this.connectionId || !this.handshakeComplete) throw lanError('INVALID_MESSAGE')
            this.bytesReceived += data.byteLength
            for (const cb of this.messages) cb(new Uint8Array(data as Buffer))
            return
          }
          if (data.byteLength > 16_384) throw lanError('FRAME_TOO_LARGE')
          const frame = JSON.parse(data.toString())
          if (frame.type === 'hello.ack' && !this.connected && typeof frame.connectionId === 'string' && frame.connectionId
            && frame.deviceId === this.options.targetDeviceId && frame.targetDeviceId === this.options.localDeviceId) {
            this.connectionId = frame.connectionId
            this.connected = true
            clearTimeout(this.timer)
            this.timer = setTimeout(() => this.finish(socket, lanError('HANDSHAKE_TIMEOUT')), this.options.handshakeTimeoutMs)
            this.pendingReject = undefined
            this.heartbeat = setInterval(() => {
              if (Date.now() - this.lastReceived > this.options.heartbeatIntervalMs * 3) this.finish(socket, lanError('HEARTBEAT_TIMEOUT'))
              else if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: 'ping' }))
            }, this.options.heartbeatIntervalMs)
            resolve()
          } else if (frame.type === 'handshake' && this.connected && !this.handshakeComplete && frame.step === 2 && typeof frame.data === 'string') {
            clearTimeout(this.timer)
            this.handshakeComplete = true
            for (const cb of this.handshakes) cb(2, fromBase64Url(frame.data))
          } else if (frame.type === 'ping') socket.send(JSON.stringify({ type: 'pong' }))
          else if (frame.type !== 'pong') throw lanError('INVALID_MESSAGE')
        } catch { this.finish(socket, lanError('SECURE_CHANNEL_FAILED')) }
      })
      socket.on('unexpected-response', (_request, response) => {
        response.resume()
        this.finish(socket, lanError(response.statusCode === 401 ? 'AUTH_INVALID' : 'CONNECTION_FAILED'))
      })
      socket.on('error', () => this.finish(socket, lanError('CONNECTION_FAILED')))
      socket.on('close', (_code, reason) => {
        const code = reason.toString()
        this.finish(socket, lanError(/^[A-Z_]{1,64}$/.test(code) ? code : 'TRANSPORT_CLOSED'))
      })
    })
  }
  connectionInfo() {
    if (!this.connectionId || !this.connected) throw lanError('TRANSPORT_CLOSED')
    return { connectionId: this.connectionId, localDeviceId: this.options.localDeviceId, remoteDeviceId: this.options.targetDeviceId }
  }
  async connectionDetails(): Promise<{ preferredTransports: ['lan']; negotiatedCapabilities: ['transport.lan']; webRtcEnabled: false }> {
    return { preferredTransports: ['lan'], negotiatedCapabilities: ['transport.lan'], webRtcEnabled: false }
  }
  async sendHandshake(step: number, data: Uint8Array): Promise<void> {
    if (step !== 1 || data.byteLength > 8192) throw lanError('INVALID_MESSAGE')
    this.requireSocket().send(JSON.stringify({ type: 'handshake', step, data: toBase64Url(data) }))
  }
  async send(data: Uint8Array): Promise<void> {
    if (data.byteLength > LAN_MAX_FRAME_BYTES) throw lanError('FRAME_TOO_LARGE')
    const socket = this.requireSocket()
    await waitForRelayCapacity(socket)
    if (this.socket !== socket) throw lanError('TRANSPORT_CLOSED')
    await new Promise<void>((resolve, reject) => socket.send(data, error => error ? reject(error) : resolve()))
    this.bytesSent += data.byteLength
  }
  onMessage(cb: (data: Uint8Array) => void) { this.messages.add(cb); return () => { this.messages.delete(cb) } }
  onHandshake(cb: (step: number, data: Uint8Array) => void) { this.handshakes.add(cb); return () => { this.handshakes.delete(cb) } }
  onClose(cb: (error?: Error) => void) { this.closes.add(cb); return () => { this.closes.delete(cb) } }
  async close(): Promise<void> { if (this.socket) this.finish(this.socket) }
  getStats(): TransportStats { return { mode: this.connected ? 'LAN' : 'Disconnected', connected: this.connected, bytesSent: this.bytesSent, bytesReceived: this.bytesReceived } }
  private requireSocket(): WebSocket {
    if (!this.connected || this.socket?.readyState !== WebSocket.OPEN) throw lanError('TRANSPORT_CLOSED')
    return this.socket
  }
  private finish(socket: WebSocket, error?: Error): void {
    if (this.socket !== socket) return
    this.socket = undefined
    this.connected = false
    this.handshakeComplete = false
    this.connectionId = undefined
    clearTimeout(this.timer)
    clearInterval(this.heartbeat)
    this.pendingReject?.(error ?? lanError('TRANSPORT_CLOSED'))
    this.pendingReject = undefined
    socket.terminate()
    for (const cb of this.closes) cb(error)
  }
}
