/**
 * UserVariantCustom 渲染器——独立 L3 通路，不复用 makeVariantContainer。
 * custom.base === null，没有基底 render 可叠加，硬塞进 svgSlot/wrapperCSS 三段骨架
 * 会限制用户的"自由 HTML"语义。
 *
 * 安全模型：单一可信输入（用户编辑自己的变体），仅做正则替换。XSS 防御依赖
 * lintTemplateHTML 在保存期拦截事件属性 / javascript: / 禁用标签。
 */

import { escAttr } from './_shared/escape'
import type { ParsedInfo } from './types'
import type { UserVariantCustom } from '../../variants/userVariant'

export interface SplitTemplate {
  open: string
  close: string
}

const BODY_PLACEHOLDER = /\{\{\s*body\s*\}\}/

/**
 * `{{body}}` 必须恰好 1 个（lintTemplateHTML 已硬闸）。运行期兜底：缺失 → open 全段
 * + 空 close；多于 1 个 → 第一处切分，其余原样保留。不抛错，保持 markdown-it 渲染
 * 链不被单条坏数据打断。
 */
export function splitTemplateOnBody(template: string): SplitTemplate {
  const idx = template.search(BODY_PLACEHOLDER)
  if (idx < 0) return { open: template, close: '' }
  const match = template.match(BODY_PLACEHOLDER)
  if (!match) return { open: template, close: '' }
  return {
    open: template.slice(0, idx),
    close: template.slice(idx + match[0].length),
  }
}

function fillPlaceholders(
  segment: string,
  uv: UserVariantCustom,
  info: ParsedInfo,
): string {
  let out = segment
  out = out.replace(/\{\{\s*title\s*\}\}/g, escAttr(info.title))
  out = out.replace(/\{\{\s*attr\.([a-zA-Z_][\w-]*)\s*\}\}/g, (_, key: string) => {
    const v = info.attrs[key]
    return v === undefined ? '' : escAttr(v)
  })
  out = out.replace(/\{\{\s*wrapperCSS\s*\}\}/g, escAttr(uv.css.wrapperCSS ?? ''))
  out = out.replace(/\{\{\s*titleCSS\s*\}\}/g, escAttr(uv.css.titleCSS ?? ''))
  out = out.replace(/\{\{\s*bodyCSS\s*\}\}/g, escAttr(uv.css.bodyCSS ?? ''))
  // svgSlot 是 HTML 片段（如 `<svg>`），不能 escape；lintTemplateHTML 校验过来源
  out = out.replace(/\{\{\s*svgSlot\s*\}\}/g, uv.css.svgSlot ?? '')
  return out
}

export function renderUserCustomOpen(uv: UserVariantCustom, info: ParsedInfo): string {
  const { open } = splitTemplateOnBody(uv.template)
  return fillPlaceholders(open, uv, info)
}

export function renderUserCustomClose(uv: UserVariantCustom, info: ParsedInfo): string {
  const { close } = splitTemplateOnBody(uv.template)
  return fillPlaceholders(close, uv, info)
}

/** `uc-` 前缀与内置 fence 名互斥，保证用户变体不会覆盖内置渲染器。 */
export function customFenceName(uvId: string): string {
  return `uc-${uvId}`
}
