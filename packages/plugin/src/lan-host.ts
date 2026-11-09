import { createHash, timingSafeEqual } from 'node:crypto'
import { createServer, type IncomingMessage, type Server } from 'node:http'
import { isIP } from 'node:net'
import { platform } from 'node:os'
import { WebSocket, WebSocketServer } from 'ws'
import { NoiseIkSession, createNoisePrologue, fromBase64Url, toBase64Url } from '@dsh-remote/crypto'
import { SecureMessageCodec, decodeMessage, encodeMessage, type RemoteMessage } from '@dsh-remote/protocol'
import { SerialSend, waitForRelayCapacity } from '@dsh-remote/webrtc'
import type { ResolvedLanConfig } from './config.js'
import type { IdentityStore } from './identity-store.js'
import type { ConnectionController } from './connection-controller.js'
import type { SafeLogger } from './logging.js'
import type { AuthenticatedPeerChannel } from './types.js'
import { uuidV7 } from './ids.js'
import { LAN_MAX_FRAME_BYTES, type LanHostFacts } from './lan-transport.js'

interface Session {
  socket: WebSocket
  connectionId: string
  queue: Promise<void>
  queuedBytes: number
  closed: boolean
  noise?: NoiseIkSession
  channel?: HostNoiseChannel
  peerDeviceId?: string
  peerIdentityKey?: string
  timer: ReturnType<typeof setTimeout>
  heartbeat?: ReturnType<typeof setInterval>
  lastReceived: number
  cleanup?: Promise<void>
}
export interface LanHostStatus { listening: boolean; address?: string; port?: number; connections: number; lastActiveAt?: number; error?: string }

/** LAN authorization is possession of the local shared token plus a pinned Noise identity, not account membership. */
export class LanHostListener {
  private server?: Server
  private wss?: WebSocketServer
  private starting?: Promise<void>
  private generation = 0
  private readonly sessions = new Set<Session>()
  private pinQueue: Promise<void> = Promise.resolve()
  private lastActiveAt?: number
  private error?: string
  constructor(
    private readonly config: ResolvedLanConfig,
    private readonly identities: IdentityStore,
    private readonly connections: ConnectionController,
    private readonly logger: SafeLogger,
    private readonly versions: { harnessVersion?: string; clientVersion?: string } = {},
  ) {}
  start(): Promise<void> {
    if (this.starting) return this.starting
    if (this.server || !this.config.enabled) return Promise.resolve()
    const generation = ++this.generation
    const operation = this.listen(generation)
    this.starting = operation
    void operation.finally(() => { if (this.starting === operation) this.starting = undefined }).catch(() => undefined)
    return operation
  }
  private async listen(generation: number): Promise<void> {
    if (!this.config.accessToken) { this.error = 'LAN_TOKEN_REQUIRED'; throw new Error(this.error) }
    const tokenDigest = digest(`Bearer ${this.config.accessToken}`)
    const authorized = (header: string | undefined) => timingSafeEqual(tokenDigest, digest(header ?? ''))
    const facts = (): LanHostFacts => {
      const identity = this.identities.current()
      return { deviceId: identity.deviceId, name: identity.name, platform: platform(), identityPublicKey: identity.publicKey, ...this.versions }
    }
    const server = createServer((request, response) => {
      response.setHeader('cache-control', 'no-store')
      if (!authorized(request.headers.authorization)) { response.writeHead(401).end(); return }
      if (!validRequestAuthority(request)) { response.writeHead(403).end(); return }
      if (request.method !== 'GET' || request.url !== '/lan/v1/host') { response.writeHead(404).end(); return }
      response.setHeader('content-type', 'application/json')
      response.end(JSON.stringify(facts()))
      this.lastActiveAt = Date.now()
    })
    server.headersTimeout = this.config.connectTimeoutMs
    server.requestTimeout = this.config.connectTimeoutMs
    server.keepAliveTimeout = 1000
    const wss = new WebSocketServer({ noServer: true, maxPayload: LAN_MAX_FRAME_BYTES, perMessageDeflate: false })
    this.server = server
    this.wss = wss
    server.on('upgrade', (request, socket, head) => {
      if (!authorized(request.headers.authorization)) { socket.end('HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n'); return }
      if (!validRequestAuthority(request)) { socket.end('HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n'); return }
      if (generation !== this.generation || request.url !== '/lan/v1/connect' || request.method !== 'GET') {
        socket.end('HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\n'); return
      }
      if (this.sessions.size >= this.config.maxConnections) { socket.end('HTTP/1.1 503 Service Unavailable\r\nConnection: close\r\n\r\n'); return }
      wss.handleUpgrade(request, socket, head, ws => this.acceptSocket(ws, generation))
    })
    server.on('error', () => { this.error = 'LAN_LISTEN_FAILED'; this.logger.warn('LAN listener failed', { code: this.error }) })
    try {
      await new Promise<void>((resolve, reject) => {
        const failed = () => { server.off('listening', ready); reject(new Error('LAN_LISTEN_FAILED')) }
        const ready = () => { server.off('error', failed); resolve() }
        server.once('error', failed)
        server.once('listening', ready)
        server.listen(this.config.port, this.config.bindAddress)
      })
      this.error = undefined
    } catch (error) {
      if (this.server === server) { this.server = undefined; this.wss = undefined }
      wss.close()
      throw error
    }
  }
  status(): LanHostStatus {
    const address = this.server?.address()
    return { listening: this.server?.listening ?? false,
      ...(address && typeof address !== 'string' ? { address: address.address, port: address.port } : {}),
      connections: [...this.sessions].filter(s => !s.closed && s.channel).length,
      ...(this.lastActiveAt === undefined ? {} : { lastActiveAt: this.lastActiveAt }), ...(this.error ? { error: this.error } : {}) }
  }
  async close(): Promise<void> {
    ++this.generation
    await this.starting?.catch(() => undefined)
    const server = this.server
    const wss = this.wss
    this.server = undefined
    this.wss = undefined
    await Promise.all([...this.sessions].map(s => this.drop(s, 'HOST_CLOSED')))
    wss?.close()
    if (server?.listening) {
      const closed = new Promise<void>(resolve => server.close(() => resolve()))
      server.closeAllConnections()
      await closed
    }
  }
  private acceptSocket(socket: WebSocket, generation: number): void {
    if (generation !== this.generation || this.sessions.size >= this.config.maxConnections) { socket.terminate(); return }
    const session: Session = { socket, connectionId: uuidV7(), queue: Promise.resolve(), queuedBytes: 0, closed: false,
      timer: setTimeout(() => { void this.drop(session, 'HANDSHAKE_TIMEOUT') }, this.config.handshakeTimeoutMs), lastReceived: Date.now() }
    this.sessions.add(session)
    session.heartbeat = setInterval(() => {
      if (Date.now() - session.lastReceived > this.config.heartbeatIntervalMs * 3) void this.drop(session, 'HEARTBEAT_TIMEOUT')
      else if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: 'ping' }))
    }, this.config.heartbeatIntervalMs)
    socket.on('message', (data, binary) => {
      const raw = Array.isArray(data) ? Buffer.concat(data) : Buffer.from(data as ArrayBuffer)
      if (session.closed) return
      session.queuedBytes += raw.byteLength
      if (session.queuedBytes > LAN_MAX_FRAME_BYTES * 2) { void this.drop(session, 'FRAME_TOO_LARGE'); return }
      session.lastReceived = Date.now()
      this.lastActiveAt = Date.now()
      session.queue = session.queue.then(async () => {
        if (session.closed || generation !== this.generation) return
        if (binary) {
          if (!session.channel) throw new Error('SECURE_CHANNEL_FAILED')
          session.channel.receive(new Uint8Array(raw as Buffer))
          return
        }
        if (raw.byteLength > 16_384) throw new Error('FRAME_TOO_LARGE')
        const frame = JSON.parse(raw.toString())
        if (frame.type === 'ping') { socket.send(JSON.stringify({ type: 'pong' })); return }
        if (frame.type === 'pong') return
        if (frame.type === 'hello' && !session.noise) {
          const identity = this.identities.current()
          if (typeof frame.deviceId !== 'string' || !frame.deviceId || frame.deviceId.length > 128
            || frame.deviceId === identity.deviceId || frame.targetDeviceId !== identity.deviceId
            || typeof frame.identityPublicKey !== 'string' || fromBase64Url(frame.identityPublicKey).byteLength !== 32) throw new Error('INVALID_MESSAGE')
          // Reject changed known identities early, but never pin an unproved hello.
          const trusted = this.identities.trustedPeer(frame.deviceId)
          if (trusted && trusted.publicKey !== frame.identityPublicKey) throw new Error('PEER_IDENTITY_MISMATCH')
          session.peerDeviceId = frame.deviceId
          session.peerIdentityKey = frame.identityPublicKey
          session.noise = new NoiseIkSession({ role: 'responder', localPrivateKey: identity.privateKey, localPublicKey: identity.publicKey,
            remotePublicKey: frame.identityPublicKey, prologue: createNoisePrologue(session.connectionId, identity.deviceId, frame.deviceId) })
          socket.send(JSON.stringify({ type: 'hello.ack', connectionId: session.connectionId, deviceId: identity.deviceId, targetDeviceId: frame.deviceId }))
        } else if (frame.type === 'handshake' && session.noise && !session.channel && frame.step === 1 && typeof frame.data === 'string') {
          session.noise.readHandshake(fromBase64Url(frame.data))
          const reply = session.noise.writeHandshake()
          if (!session.noise.complete) throw new Error('SECURE_CHANNEL_FAILED')
          // Serialize the post-proof check + durable pin: two concurrent valid
          // handshakes for one device id must not overwrite each other's key.
          const pin = this.pinQueue.then(async () => {
            if (session.closed || generation !== this.generation) return
            const deviceId = session.peerDeviceId!
            const publicKey = session.peerIdentityKey!
            const trusted = this.identities.trustedPeer(deviceId)
            if (trusted && trusted.publicKey !== publicKey) throw new Error('PEER_IDENTITY_MISMATCH')
            if (!trusted) await this.identities.trustPeer({ deviceId, publicKey, name: deviceId.slice(0, 80), platform: 'lan' })
          })
          this.pinQueue = pin.catch(() => undefined)
          await pin
          if (session.closed || generation !== this.generation) return
          const channel = new HostNoiseChannel(session.connectionId, session.peerDeviceId!, session.peerIdentityKey!, session.noise,
            async ciphertext => {
              await waitForRelayCapacity(socket)
              if (session.closed || generation !== this.generation || socket.readyState !== WebSocket.OPEN) throw new Error('TRANSPORT_CLOSED')
              await new Promise<void>((resolve, reject) => socket.send(ciphertext, error => error ? reject(error) : resolve()))
            }, code => { void this.drop(session, code) })
          session.channel = channel
          await this.connections.accept(channel)
          if (session.closed || generation !== this.generation) { await this.connections.closeConnection(session.connectionId, 'TRANSPORT_CLOSED'); return }
          clearTimeout(session.timer)
          socket.send(JSON.stringify({ type: 'handshake', step: 2, data: toBase64Url(reply) }))
        } else throw new Error('INVALID_MESSAGE')
      }).catch(error => {
        const code = error instanceof Error && /^[A-Z_]{1,64}$/.test(error.message) ? error.message : 'SECURE_CHANNEL_FAILED'
        void this.drop(session, code)
      }).finally(() => { session.queuedBytes -= raw.byteLength })
    })
    socket.on('error', () => { void this.drop(session, 'CONNECTION_FAILED') })
    socket.on('close', () => { void this.drop(session, 'TRANSPORT_CLOSED') })
  }
  private drop(session: Session, code = 'TRANSPORT_CLOSED'): Promise<void> {
    if (session.cleanup) return session.cleanup
    session.closed = true
    clearTimeout(session.timer)
    clearInterval(session.heartbeat)
    session.socket.close(4000, code)
    // Bound socket lifetime even when a peer does not complete the close exchange.
    session.socket.terminate()
    session.cleanup = (async () => {
      // The accept operation may still be queued in ConnectionController. Let it
      // commit, then close that exact id; an old session cannot close its successor.
      await session.queue
      try { await this.connections.closeConnection(session.connectionId, code) }
      finally {
        await session.channel?.close(code)
        session.noise?.destroy()
        this.sessions.delete(session)
      }
    })().catch(() => { this.error = 'LAN_CLEANUP_FAILED'; this.logger.warn('LAN connection cleanup failed', { code: 'LAN_CLEANUP_FAILED' }) })
    return session.cleanup
  }
}

/** Noise + SecureMessageCodec data plane migrated from ServerNoiseChannel. */
class HostNoiseChannel implements AuthenticatedPeerChannel {
  readonly mode = 'LAN' as const
  readonly security
  readonly peerIdentityKey: string
  private readonly handlers = new Set<(message: RemoteMessage) => void>()
  private readonly incoming = new SecureMessageCodec()
  private readonly outgoing = new SecureMessageCodec()
  private readonly sends = new SerialSend()
  private closed = false
  constructor(connectionId: string, readonly peerDeviceId: string, peerIdentityKey: string, private readonly noise: NoiseIkSession,
    private readonly transmit: (ciphertext: Uint8Array) => Promise<void>, private readonly onClose: (code?: string) => void) {
    this.security = { protocol: 'Noise_IK_25519_ChaChaPoly_SHA256' as const, connectionId, kind: 'local-pairing' as const }
    this.peerIdentityKey = peerIdentityKey
  }
  async send(message: RemoteMessage): Promise<void> {
    const encoded = encodeMessage(message)
    try {
      await this.sends.run(encoded.byteLength, async () => {
        if (this.closed) throw new Error('TRANSPORT_CLOSED')
        for (const part of this.outgoing.encode(encoded)) await this.transmit(this.noise.encrypt(part))
      })
    } catch (error) { await this.close('SECURE_CHANNEL_FAILED'); throw error }
  }
  receive(ciphertext: Uint8Array): void {
    if (this.closed) return
    const plaintext = this.incoming.decode(this.noise.decrypt(ciphertext))
    if (plaintext === undefined) return
    const message = decodeMessage(plaintext)
    for (const cb of this.handlers) cb(message)
  }
  onMessage(cb: (message: RemoteMessage) => void) { this.handlers.add(cb); return () => { this.handlers.delete(cb) } }
  async close(code?: string): Promise<void> {
    if (this.closed) return
    this.closed = true
    this.handlers.clear()
    this.incoming.reset()
    this.outgoing.reset()
    this.noise.destroy()
    this.onClose(code)
  }
}
/** Node-only endpoint: no browser Origin and no DNS/rebinding authority. Compare
 * against the socket's actual destination, including wildcard-bound listeners. */
function validRequestAuthority(request: IncomingMessage): boolean {
  if (request.headers.origin !== undefined) return false
  const host = request.headers.host
  const match = host?.match(/^(?:\[([^\]]+)\]|([^:]+)):(\d{1,5})$/)
  if (!match || Number(match[3]) !== request.socket.localPort) return false
  const address = match[1] ?? match[2]!
  if (!isIP(address) || !request.socket.localAddress) return false
  try { return normalizedIp(address) === normalizedIp(request.socket.localAddress) }
  catch { return false }
}
function normalizedIp(address: string): string {
  if (isIP(address) === 4) return address
  const canonical = new URL(`http://[${address}]/`).hostname.slice(1, -1)
  const mapped = canonical.match(/^::ffff:([0-9a-f]+):([0-9a-f]+)$/)
  if (!mapped) return canonical
  const high = parseInt(mapped[1]!, 16)
  const low = parseInt(mapped[2]!, 16)
  return `${high >>> 8}.${high & 255}.${low >>> 8}.${low & 255}`
}
function digest(token: string): Buffer { return createHash('sha256').update(token).digest() }
