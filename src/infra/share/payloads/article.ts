/**
 * Article 分享 payload —— 把整篇 markdown + 主题 id 编入 URL hash。
 *
 * 线路格式（R10 前后一致，破坏将触发 v 字段升级）：
 *   `#share={base64url(JSON({ v: 1, md, themeId }))}`
 *
 * 为什么不 gzip：
 *   - 典型中文文章 10KB 原文，base64url 膨胀到 ~14KB，Chrome/Safari 均能承载
 *   - gzip 依赖 `CompressionStream` 需 async + HTTPS，jsdom 不一定具备
 *   - 纯 JSON 编码便于 URL 出问题时肉眼诊断
 *   如后续发现长文链接超出微信 / 短信 URL 限制，再加 `z=gz` 分支即可
 *
 * 命名：导出 `articleCodec` 作为 dispatcher 入口；同时导出 4 个 article-only
 * 函数（encode/decode/buildUrl/parseHash），让旧 import 路径在 shareLink.ts
 * 顶层 re-export 后仍可用。
 */

import {
  buildUrl,
  decodePayload,
  encodePayload,
  parseHash,
  type BuildShareUrlOptions,
  type ShareCodec,
} from '../codec'
import { isRecord } from '../_utils'

const ARTICLE_VERSION = 1
const ARTICLE_PREFIX = 'share='

/** 分享链接里 `data:` 图被剥离后填入的占位符（仍是合法 markdown URL） */
export const STRIPPED_IMAGE_PLACEHOLDER = '#wechat-typeset-stripped-image'

export interface SharePayloadArticle {
  v: 1
  md: string
  themeId: string
  /** 编码时被剥离的内联图数量；接收侧据此提示读者。可选——历史链接无此字段 */
  strippedImages?: number
}

/**
 * shape 校验。
 *
 * 缺字段 / 类型错 / 版本不匹配一律返回 null。
 * 没有 `kind` 字段是有意的——article 是 R10 之前的唯一 payload，未来若强制 kind
 * 会破坏旧链接；新增 payload 一律带 kind，articleCodec 靠 prefix 唯一识别。
 */
export const articleCodec: ShareCodec<SharePayloadArticle> = {
  prefix: ARTICLE_PREFIX,
  validate(raw: unknown): SharePayloadArticle | null {
    if (!isRecord(raw)) return null
    if (raw.v !== ARTICLE_VERSION) return null
    if (typeof raw.md !== 'string') return null
    if (typeof raw.themeId !== 'string') return null
    const stripped =
      typeof raw.strippedImages === 'number' && raw.strippedImages > 0
        ? raw.strippedImages
        : undefined
    return {
      v: ARTICLE_VERSION,
      md: raw.md,
      themeId: raw.themeId,
      ...(stripped !== undefined ? { strippedImages: stripped } : {}),
    }
  },
}

// ============================================================
// 兼容旧 API 的 4 个 article-only 函数
// ============================================================

export function encodeArticleShare(p: SharePayloadArticle): string {
  // 显式重建对象避免外部传 extra 字段污染 JSON——线路只允许契约字段
  const payload: Record<string, unknown> = { v: p.v, md: p.md, themeId: p.themeId }
  if (typeof p.strippedImages === 'number' && p.strippedImages > 0) {
    payload.strippedImages = p.strippedImages
  }
  return encodePayload(payload)
}

export function decodeArticleShare(encoded: string): SharePayloadArticle | null {
  return decodePayload(articleCodec, encoded)
}

export function buildArticleShareUrl(
  p: SharePayloadArticle,
  opts: BuildShareUrlOptions = {},
): string {
  return buildUrl(articleCodec, p, opts)
}

export function parseArticleShareHash(hash: string): SharePayloadArticle | null {
  return parseHash(articleCodec, hash)
}

// ============================================================
// 内联图剥离：分享前必跑（一张 100 KB 截图就能把 hash 撑过 Safari 截断阈值）
// ============================================================

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
