/**
 * variant 渲染产物 HTML → IRBox + IRSlot[]
 *
 * 设计 IR （baseline）走 [tools/extract-design-ir.ts] 离线生成；本模块负责
 * "实际渲染输出 → 同一形状的 IR"，让 [compareGeometry] 能跨边界比对。
 *
 * 解析口径：
 *   - wrapper = 首个 `class*="container-{kind}--{variant}"` 的 section
 *   - slot[0] = wrapper 的第一个直接子 element（通常是 svgSlot 输出的 div / 或 title section）
 *   - slot[N] = wrapper 后续 element 子节点
 *
 * 不递归到 <p>—— paper-slip 风格的 body slot 内部 <p> 几何由 theme.elements.p 注入，
 * 与 variant 解耦，几何比对不应跨越这条边界。
 */

import { JSDOM } from 'jsdom'
import {
  type DesignTheme,
  type IRBox,
  type IRSlot,
  styleToBox,
} from '../../../../../src/core/design-ir'

export interface ParsedActualIR {
  /** 找到的 wrapper section className（debug 用）。 */
  wrapperClassName: string
  wrapper: IRBox
  slots: IRSlot[]
}

/**
 * 从 render 输出的 html 中找到目标 variant 的 wrapper 切片并解析。
 *
 *   kind: 'tip' / 'note' / 'quote-card' / ...（markdown fence 名）
 *   variantId: 'paper-slip' / 'numbered-rule' / ...
 *
 * 返回 null = 未匹配（一般是 ctx 没 fall 到该 variant）。
 */
export function parseRenderedToIR(
  html: string,
  containerName: string,
  variantId: string,
  designTheme: DesignTheme,
): ParsedActualIR | null {
  const dom = new JSDOM(html)
  const doc = dom.window.document
  // containerName / variantId 都是 kebab-case [a-z0-9-]，无需转义。
  const cls = `container-${containerName}--${variantId}`
  const wrapper = doc.querySelector(`.${cls}`)
  if (!wrapper) return null

  const wrapperBox = styleToBox(wrapper.getAttribute('style') ?? '', designTheme)
  const slots: IRSlot[] = []
  // wrapper 直接子 element（按文档序）
  for (const child of Array.from(wrapper.children)) {
    const styleAttr = child.getAttribute('style') ?? ''
    const slotBox = styleToBox(styleAttr, designTheme)
    const text = (child.textContent ?? '').trim()
    const role = inferActualRole(child as Element, slotBox)
    const slot: IRSlot = { role, box: slotBox, decorations: [] }
    // 叶子文字
    if (child.children.length === 0 && text && text.length <= 20) {
      slot.slotText = text
    }
    const bodyP = child.querySelector('p')
    if (role === 'body' && bodyP) {
      slot.bodyText = (bodyP.textContent ?? '').trim()
    }
    slots.push(slot)
  }

  const wrapperClsRaw = (wrapper as Element).className
  const wrapperClassName = typeof wrapperClsRaw === 'string'
    ? wrapperClsRaw
    : wrapper.getAttribute('class') ?? ''
  return {
    wrapperClassName,
    wrapper: wrapperBox,
    slots,
  }
}

/**
 * actual role 启发式（更直接，因 makeVariantContainer 输出节点稳定）：
 *   class*="__title"     → kicker
 *   class*="__body"      → body
 *   首位 <div> 含 writing-mode → leftCol
 *   首位 <div> width ≤ 60 → leftCol/badge（由几何区分）
 *   其它 → unknown
 */
function inferActualRole(el: Element, box: IRBox): IRSlot['role'] {
  // el.className 在 SVGElement 上是 SVGAnimatedString（不是 string）。getAttribute 兜底。
  const cls = typeof el.className === 'string' ? el.className : el.getAttribute('class') ?? ''
  if (cls.includes('__body')) return 'body'
  if (cls.includes('__title')) return 'kicker'
  if (box.writingMode && box.writingMode.includes('vertical')) return 'leftCol'
  const widthPx = parseLenPx(box.width)
  if (widthPx !== null && widthPx <= 60 && (box.border || box.background)) return 'badge'
  if (widthPx !== null && widthPx <= 80) return 'leftCol'
  if (el.querySelector('p')) return 'body'
  return 'unknown'
}

function parseLenPx(v: string | undefined): number | null {
  if (!v) return null
  const m = v.match(/^(-?\d+(?:\.\d+)?)px$/i)
  return m ? Number.parseFloat(m[1]) : null
}
