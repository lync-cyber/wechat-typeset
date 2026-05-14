/**
 * `#share-component=...` hash → 我的组件落地的"接收端"实现。
 *
 * 与 share-article 不同的语用：组件分享是"添加到我的组件库"，不是"作为草稿载入"。
 * 因此本模块走 mutations.createComponent —— 让 validateSnippet 与配额检查同样作用
 * 在外来组件上（线路 validate 只保证形状，不保证内容合规）。
 *
 * 调用方负责"是否要导入"的用户确认（confirm 或自定义对话框）。本模块只负责
 *   parseHash → 落 mutation → 返回结果，方便 bootstrap 用一个函数接到 hash 上。
 *
 * 幂等：导入后调用方清掉 location.hash，避免页面刷新再次触发。
 */

import { parseHash } from '../codec'
import { componentCodec, type SharePayloadComponent } from './component'
import { createComponent } from '../../../domain/components-lib/mutations'

export type ImportComponentResult =
  | { ok: true; entryId: string; name: string }
  | { ok: false; reason: 'parse' | 'validation' | 'cancelled'; message?: string }

/**
 * 解析 hash 并落 mutation。不弹任何对话框——调用方决定 UI。
 *
 * @param hash location.hash 原值（带 `#`）
 * @returns 解析失败 / 校验失败 / 成功落地 三态
 */
export function tryImportComponentFromHash(hash: string): ImportComponentResult {
  const payload = parseHash(componentCodec, hash) as SharePayloadComponent | null
  if (!payload) return { ok: false, reason: 'parse' }
  const snap = payload.component
  const res = createComponent({
    name: snap.name,
    description: snap.description,
    kind: snap.kind as 'admonition' | 'quote' | 'compare' | 'steps' | 'divider' | 'sectionTitle' | 'codeBlock' | 'note' | 'none',
    variantId: snap.variantId,
    markdownSnippet: snap.markdownSnippet,
    thumbnailSvg: snap.thumbnailSvg,
  })
  if (!res.ok) {
    return {
      ok: false,
      reason: res.reason === 'validation' ? 'validation' : 'parse',
      message: res.reason === 'validation' ? '导入的组件未通过校验（可能含未注册容器 / variant）' : '导入失败',
    }
  }
  return { ok: true, entryId: res.entry.id, name: res.entry.name }
}

/**
 * 仅探测 hash 是否是 component 分享，不落 mutation。供 bootstrap 在 confirm 弹窗前
 * 先确认 hash 性质，避免对非 component-share hash 弹无意义对话框。
 */
export function peekComponentShareHash(hash: string): SharePayloadComponent | null {
  return parseHash(componentCodec, hash)
}
