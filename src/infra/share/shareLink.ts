/**
 * 只读分享链接 · payload dispatcher
 *
 * R10 之前所有分享逻辑（article 唯一形态）写在本文件里。R10 拆分：
 *   - codec.ts             ShareCodec 契约 + base64url / JSON 原语 + URL 包装
 *   - payloads/article.ts  article 形态：`#share={...}`（含 stripInlineImagesForShare）
 *   - payloads/component.ts component 形态：`#share-component={...}`
 *   - shareLink.ts         本文件——dispatcher + 向后兼容 re-export 集中点
 *
 * 新增 payload 类型流程：
 *   1. 在 payloads/ 下加 `<kind>.ts`，定义 `<kind>Codec: ShareCodec<P>`
 *   2. 在 KNOWN_CODECS 注册（让 parseAnyShareHash 能识别）
 *   3. 暴露具名的 build/parse helper（必要时由本文件 re-export）
 *
 * 向后兼容：
 *   原 4 个对外 export（encodeShare / decodeShare / buildShareUrl /
 *   parseShareHash）+ `SharePayload` 类型都是 article codec 的别名；R10 前的
 *   import 一字不改。新增 stripInlineImagesForShare / STRIPPED_IMAGE_PLACEHOLDER
 *   也从 article 模块 re-export，调用点（useClipboardCopy）不动。
 */

import { parseHash, type ShareCodec } from './codec'
import {
  articleCodec,
  encodeArticleShare,
  decodeArticleShare,
  buildArticleShareUrl,
  parseArticleShareHash,
  stripInlineImagesForShare,
  STRIPPED_IMAGE_PLACEHOLDER,
  type SharePayloadArticle,
  type StripInlineImagesResult,
} from './payloads/article'
import { componentCodec, type SharePayloadComponent } from './payloads/component'

// ============================================================
// 全局 dispatcher：跨 codec 自动派发
// ============================================================

const KNOWN_CODECS: ReadonlyArray<ShareCodec<unknown>> = [articleCodec, componentCodec]

/** dispatcher 返回的判别联合：调用方按 `'kind'` / 形状窄化处理。 */
export type AnySharePayload = SharePayloadArticle | SharePayloadComponent

/**
 * 不预知前缀类型时的兜底：按所有已注册 codec 顺序尝试。
 *
 * 用途：bootstrap 时统一识别"任意 share"（article 走草稿载入路径、
 * component 走"导入到我的组件"路径……）。
 *
 * 不应用于：明确只接受 article 的旧调用方——它们继续用 `parseShareHash`（=article）
 * 才能在类型层获得 SharePayloadArticle 而非联合，省一个 narrow 步骤。
 */
export function parseAnyShareHash(hash: string): AnySharePayload | null {
  if (!hash) return null
  for (const codec of KNOWN_CODECS) {
    const decoded = parseHash(codec, hash)
    if (decoded) return decoded as AnySharePayload
  }
  return null
}

// ============================================================
// 向后兼容：article 别名（R10 前的 4 个对外 export + SharePayload 类型）
// ============================================================

/** @deprecated 新代码用 `SharePayloadArticle`；本别名保留是为了 R10 前的 import 不破坏。 */
export type SharePayload = SharePayloadArticle

export {
  encodeArticleShare as encodeShare,
  decodeArticleShare as decodeShare,
  buildArticleShareUrl as buildShareUrl,
  parseArticleShareHash as parseShareHash,
  stripInlineImagesForShare,
  STRIPPED_IMAGE_PLACEHOLDER,
}
export type { StripInlineImagesResult }

// ============================================================
// 公开 codec 注册表（新代码可直接 import 后调用 buildUrl / parseHash）
// ============================================================

export { articleCodec, componentCodec }
export type { SharePayloadArticle, SharePayloadComponent }

// 共享原语 + 契约：让新代码无需深路径 import './codec'
export type { ShareCodec, BuildShareUrlOptions } from './codec'
export {
  buildUrl,
  parseHash,
  encodePayload,
  decodePayload,
} from './codec'
