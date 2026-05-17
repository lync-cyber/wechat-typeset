/**
 * UserVariantCustom 渲染器（步骤 7）—— 完全独立于 makeVariantContainer 的 L3 通路。
 *
 * 为什么独立：custom 档没有"基底 variant"，整个 HTML 骨架由用户写在 template 字符串里。
 * 复用 makeVariantContainer 的 svgSlot / wrapperCSS 三段拼装反而把语义掰歪——
 * 用户要的就是"自由 HTML"，硬塞进固定骨架等于限制用户。
 *
 * 与 markdown-it-container 的耦合：renderer 必须返回 open / close 两段字符串，
 * 中间由 markdown-it 自己渲染 fence 内的 markdown 子内容（生成 `{{body}}` 位置的产物）。
 * 实现：template 必须含恰好一个 `{{body}}` 占位符，把它切成 `before|after`，分别
 * 喂给 open / close。lintTemplateHTML 已在保存期硬闸 bodyCount===1。
 *
 * 占位符（同 lintTemplateHTML 的白名单一致）：
 *   - {{title}}     fence info 的标题文本（escAttr，文本节点也安全）
 *   - {{body}}      markdown 子内容（由 markdown-it 接管）
 *   - {{attr.X}}    fence info 的 key=value 属性
 *   - {{wrapperCSS}}/{{titleCSS}}/{{bodyCSS}}  uv.css.* 槽位（escAttr）
 *   - {{svgSlot}}   uv.css.svgSlot 原样 HTML 注入（lintTemplateHTML 已校验）
 *
 * 安全模型：单一可信输入（用户编辑自己的变体）→ 不做 CSP，仅做正则替换。XSS 抗御依赖
 *   lintTemplateHTML 在保存期拦截（事件属性 / javascript: / 禁用标签）。运行时若发现
 *   未识别占位符——原样输出（不当作攻击面，因为整个 template 来源可信）。
 */

import { escAttr } from './_shared/escape'
import type { ParsedInfo } from './types'
import type { UserVariantCustom } from '../../variants/userVariant'

/**
 * 把模板按 `{{body}}` 切成两段。`{{body}}` 必须恰好出现一次——保存期 lintTemplateHTML
 * 已硬闸，此处兜底：缺失 → 整段为 open + 空 close（视觉退化但不抛错）；多于一次 → 取
 * 第一个切分点，其余 `{{body}}` 静默原样保留（同样不抛错，让运行期一致可预测）。
 */
export interface SplitTemplate {
  open: string
  close: string
}

const BODY_PLACEHOLDER = /\{\{\s*body\s*\}\}/

export function splitTemplateOnBody(template: string): SplitTemplate {
  const idx = template.search(BODY_PLACEHOLDER)
  if (idx < 0) return { open: template, close: '' }
  const match = template.match(BODY_PLACEHOLDER)
  if (!match) return { open: template, close: '' }
  const matchLen = match[0].length
  return {
    open: template.slice(0, idx),
    close: template.slice(idx + matchLen),
  }
}

/**
 * 把单段（open 或 close）里的非 body 占位符替换为实际值。
 *
 * 替换顺序：先 attr/title/CSS 三类"escAttr"安全槽位；再 svgSlot 原样注入。
 * svgSlot 单独最后处理是为了避免它的内容里若巧合含 `{{title}}` 等再被二次替换。
 */
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
  // svgSlot 不 escape——它本来就是 HTML 片段（如 <svg>）；lintTemplateHTML 校验过
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

/**
 * Fence 名约定：`uc-<uv.id>`。
 *   - `uc-` 强制前缀：与内置容器 name（tip / quote-card / pull-quote 等）完全不重，
 *     保证不会"覆盖"内置渲染器
 *   - 用 uv.id 而非自定义 slug：免数据模型扩字段、免重名校验。代价是 markdown 里的
 *     fence 名是 `uc-uv_xxx_yyy` 不友好——但 custom 的预期使用是 Studio 一键插入示例，
 *     很少手写
 */
export function customFenceName(uvId: string): string {
  return `uc-${uvId}`
}
