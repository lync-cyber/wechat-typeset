/**
 * 分享 codec 共享原语 —— 各 payload 类型共用的 JSON ↔ base64url + URL 包装。
 *
 * 单独成文件的理由：
 *   shareLink.ts 顶层既要 import 各 payloads/* 的 codec，又要被它们反向引用
 *   原语，会形成循环依赖；把"无 codec 形状知识"的纯工具抽到 codec.ts，
 *   payloads/* 只依赖此处，shareLink.ts 在它们之上做派发与 re-export。
 */

// ============================================================
// 分享 codec 契约
// ============================================================

/**
 * 一个 codec 描述某种 payload 形态：
 *   - prefix    URL hash 段前缀（如 'share=' / 'share-component='）
 *   - validate  把 unknown（JSON.parse 结果）窄化为 P；非法返回 null
 *
 * codec 之间互不依赖；新增 payload 类型不会触动既有 codec。
 */
export interface ShareCodec<P> {
  readonly prefix: string
  readonly validate: (raw: unknown) => P | null
}

// ============================================================
// 共享原语：JSON ↔ base64url
// ============================================================

export function utf8ToBytes(s: string): Uint8Array {
  return new TextEncoder().encode(s)
}

export function bytesToUtf8(b: Uint8Array): string {
  return new TextDecoder().decode(b)
}

export function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  const b64 = typeof btoa === 'function'
    ? btoa(binary)
    : Buffer.from(binary, 'binary').toString('base64')
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function fromBase64Url(s: string): Uint8Array {
  const pad = (4 - (s.length % 4)) % 4
  const fix = s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad)
  const binary = typeof atob === 'function'
    ? atob(fix)
    : Buffer.from(fix, 'base64').toString('binary')
  const out = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i)
  return out
}

/**
 * payload → JSON → UTF-8 → base64url。
 * payload 由各 codec 模块构造；本函数不做形状校验，调用方对自己的形状负责。
 */
export function encodePayload(payload: unknown): string {
  return toBase64Url(utf8ToBytes(JSON.stringify(payload)))
}

/**
 * base64url → UTF-8 → JSON → 经 codec.validate 形状校验。
 * 解码失败 / 校验失败一律返回 null（不抛异常），分享链接坏掉不应阻塞应用启动。
 */
export function decodePayload<P>(codec: ShareCodec<P>, encoded: string): P | null {
  if (!encoded) return null
  try {
    const json = bytesToUtf8(fromBase64Url(encoded))
    const raw: unknown = JSON.parse(json)
    return codec.validate(raw)
  } catch {
    return null
  }
}

// ============================================================
// URL 构造与 hash 解析（按 codec.prefix 派发）
// ============================================================

export interface BuildShareUrlOptions {
  origin?: string
  pathname?: string
}

function resolveOrigin(opts: BuildShareUrlOptions): string {
  return opts.origin ?? (typeof location !== 'undefined' ? location.origin : '')
}

function resolvePathname(opts: BuildShareUrlOptions): string {
  return opts.pathname ?? (typeof location !== 'undefined' ? location.pathname : '/')
}

/**
 * payload → `${origin}${pathname}#${prefix}${base64url}`。
 *
 * 调用方传入对应的 codec（articleCodec / componentCodec …）。
 * 前缀是 codec 私有的"线路约定"，调用方不需要知道字面值。
 */
export function buildUrl<P>(
  codec: ShareCodec<P>,
  payload: P,
  opts: BuildShareUrlOptions = {},
): string {
  return `${resolveOrigin(opts)}${resolvePathname(opts)}#${codec.prefix}${encodePayload(payload)}`
}

/**
 * 按 codec.prefix 提取并解码 hash 中的对应 payload。其它 prefix 一律返回 null。
 *
 * 不"猜测 kind"——调用方明确告知 codec，避免 article 与 component 之间的
 * "看似匹配实则误解" 风险（两者都是 base64url，只看 prefix 才能正确分流）。
 */
export function parseHash<P>(codec: ShareCodec<P>, hash: string): P | null {
  if (!hash) return null
  const stripped = hash.startsWith('#') ? hash.slice(1) : hash
  if (!stripped.startsWith(codec.prefix)) return null
  return decodePayload(codec, stripped.slice(codec.prefix.length))
}
