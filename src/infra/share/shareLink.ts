/**
 * 只读分享链接 · 纯函数层
 *
 * 编码：`{ v: 1, md, themeId, strippedImages? }` → JSON → UTF-8 → base64url → `#share=<payload>`
 *
 * 为什么不 gzip：
 *   - 典型中文文章 10KB 原文，base64url 膨胀到 ~14KB，Chrome/Safari 均能承载
 *   - gzip 依赖 `CompressionStream` 需 async + HTTPS，jsdom 不一定具备
 *   - 纯 JSON 编码便于 URL 出问题时肉眼诊断
 *   如后续发现长文链接超出微信 / 短信 URL 限制，再加 `z=gz` 分支即可
 *
 * 编码对字节级稳定，不依赖平台字节序；base64url 替换 `+/=` → `-_` 避免 URL 转义
 *
 * 内联图剥离（stripInlineImagesForShare）：
 *   markdown 里 `![](data:image/...;base64,...)` 单张就能让 URL 突破 200 KB，
 *   Safari 直接截断。分享前需把 data URI 换成占位符 `#wechat-typeset-stripped-image`，
 *   并在 payload 里带 strippedImages 计数；接收侧据此提示"N 张图未随链接传递"。
 *   编码注释 `<!-- ... -->`、html `<img src="data:...">` 不处理——分享链接的来源
 *   是 markdown 草稿，那两种形态不会出现在 .md 里。
 */

const SHARE_PREFIX = 'share='
const CURRENT_VERSION = 1
/** 分享链接里 `data:` 图被剥离后填入的占位符（仍是合法 markdown URL） */
export const STRIPPED_IMAGE_PLACEHOLDER = '#wechat-typeset-stripped-image'

export interface SharePayload {
  v: 1
  md: string
  themeId: string
  /** 编码时被剥离的内联图数量；接收侧据此提示读者。可选——历史链接无此字段 */
  strippedImages?: number
}

export function encodeShare(p: SharePayload): string {
  const payload: Record<string, unknown> = {
    v: CURRENT_VERSION,
    md: p.md,
    themeId: p.themeId,
  }
  if (typeof p.strippedImages === 'number' && p.strippedImages > 0) {
    payload.strippedImages = p.strippedImages
  }
  return toBase64Url(utf8ToBytes(JSON.stringify(payload)))
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
    const stripped = typeof parsed.strippedImages === 'number' && parsed.strippedImages > 0
      ? parsed.strippedImages
      : undefined
    return {
      v: CURRENT_VERSION,
      md: parsed.md,
      themeId: parsed.themeId,
      ...(stripped !== undefined ? { strippedImages: stripped } : {}),
    }
  } catch {
    return null
  }
}

export interface StripInlineImagesResult {
  md: string
  count: number
}

/**
 * 在 markdown 里把 `![alt](data:...)` 形式的图片源替换为占位符；返回新文本与剥离张数。
 *
 * 规则：
 *   - 仅识别 `data:` 协议；`https://...` / `http://...` / 站内相对路径全部保留
 *   - 跳过 ``` fenced code block 内部，因为那是作者展示的示例文本，不应被改写
 *   - 占位符 `#wechat-typeset-stripped-image` 仍是合法 markdown URL（只是浏览器
 *     里渲染为空），接收方据 payload.strippedImages 计数提示
 *
 * 该函数不修改 alt 文本，便于读者大致看出原稿"这里有张图"。
 */
export function stripInlineImagesForShare(md: string): StripInlineImagesResult {
  if (!md) return { md: '', count: 0 }
  let count = 0
  const segments = splitByFences(md)
  const rewritten = segments
    .map((seg) => {
      if (seg.code) return seg.text
      return seg.text.replace(/!\[([^\]]*)\]\(data:[^)\s]+\)/g, (_, alt: string) => {
        count++
        return `![${alt}](${STRIPPED_IMAGE_PLACEHOLDER})`
      })
    })
    .join('')
  return { md: rewritten, count }
}

/**
 * 按 ``` 围栏切片 markdown，标记每段是否在代码块内。
 * 保留每段末尾的换行符以便 join 还原原文（不丢字节）。
 */
function splitByFences(md: string): Array<{ text: string; code: boolean }> {
  const lines = md.split('\n')
  const out: Array<{ text: string; code: boolean }> = []
  let buf: string[] = []
  let inCode = false
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const isFence = /^\s*```/.test(line)
    if (isFence) {
      // fence 行属于哪段：和"进入后"的状态算同一段——这样作者写的代码块完整保留
      buf.push(line)
      // flush 当前段
      out.push({ text: buf.join('\n') + (i < lines.length - 1 ? '\n' : ''), code: inCode })
      buf = []
      inCode = !inCode
      continue
    }
    buf.push(line)
  }
  if (buf.length > 0) out.push({ text: buf.join('\n'), code: inCode })
  return out
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
