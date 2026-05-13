/**
 * 只读分享链接 · 纯函数层
 *
 * 编码：`{ v: 1, md, themeId }` → JSON → UTF-8 → base64url → `#share=<payload>`
 *
 * 为什么不 gzip：
 *   - 典型中文文章 10KB 原文，base64url 膨胀到 ~14KB，Chrome/Safari 均能承载
 *   - gzip 依赖 `CompressionStream` 需 async + HTTPS，jsdom 不一定具备
 *   - 纯 JSON 编码便于 URL 出问题时肉眼诊断
 *   如后续发现长文链接超出微信 / 短信 URL 限制，再加 `z=gz` 分支即可
 *
 * 编码对字节级稳定，不依赖平台字节序；base64url 替换 `+/=` → `-_` 避免 URL 转义
 */

const SHARE_PREFIX = 'share='
const CURRENT_VERSION = 1

export interface SharePayload {
  v: 1
  md: string
  themeId: string
}

export function encodeShare(p: SharePayload): string {
  const json = JSON.stringify({ v: CURRENT_VERSION, md: p.md, themeId: p.themeId })
  return toBase64Url(utf8ToBytes(json))
}

export function decodeShare(encoded: string): SharePayload | null {
  if (!encoded) return null
  try {
    const bytes = fromBase64Url(encoded)
    const json = bytesToUtf8(bytes)
    const parsed: unknown = JSON.parse(json)
    if (!isRecord(parsed)) return null
    if (parsed.v !== CURRENT_VERSION) return null
    if (typeof parsed.md !== 'string' || typeof parsed.themeId !== 'string') return null
    return { v: CURRENT_VERSION, md: parsed.md, themeId: parsed.themeId }
  } catch {
    return null
  }
}

export interface BuildShareUrlOptions {
  origin?: string
  pathname?: string
}

export function buildShareUrl(p: SharePayload, opts: BuildShareUrlOptions = {}): string {
  const origin = opts.origin ?? (typeof location !== 'undefined' ? location.origin : '')
  const pathname = opts.pathname ?? (typeof location !== 'undefined' ? location.pathname : '/')
  return `${origin}${pathname}#${SHARE_PREFIX}${encodeShare(p)}`
}

/**
 * 从 `location.hash` 提取 payload。接受带或不带前导 `#` 的输入。
 * 返回 null 表示 hash 非分享链接（不当错处理，照常启动）。
 */
export function parseShareHash(hash: string): SharePayload | null {
  if (!hash) return null
  const stripped = hash.startsWith('#') ? hash.slice(1) : hash
  if (!stripped.startsWith(SHARE_PREFIX)) return null
  return decodeShare(stripped.slice(SHARE_PREFIX.length))
}

function utf8ToBytes(s: string): Uint8Array {
  return new TextEncoder().encode(s)
}

function bytesToUtf8(b: Uint8Array): string {
  return new TextDecoder().decode(b)
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
  const b64 = typeof btoa === 'function' ? btoa(binary) : Buffer.from(binary, 'binary').toString('base64')
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(s: string): Uint8Array {
  const pad = (4 - (s.length % 4)) % 4
  const fix = s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad)
  const binary = typeof atob === 'function' ? atob(fix) : Buffer.from(fix, 'base64').toString('binary')
  const out = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i)
  return out
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}
