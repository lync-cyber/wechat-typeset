/**
 * motif 文本溢出 viewBox 自适应扩展。
 *
 * 独立于 render-motif.ts 与 spec-to-theme.ts：前者负责 AST→SVG 字符串渲染，后者负责
 * spec→Theme 对象翻译，本模块只做"占位符替换后文本测量 + viewBox 宽度修复"这一件事。
 * 仅扩宽度，不扩高度——issueStamp / stepBadge 都是横排单行，高度固定。
 * 唯一外部依赖：types.ts 的类型（零运行时依赖）。
 */

import type { MotifPrimitive, MotifTemplate } from './types'

/** 安全边距（px）：避免字形右侧 bearing 贴边 */
const SAFE_MARGIN = 4

function substitutePlaceholders(s: string, values: Readonly<Record<string, string | number>>): string {
  return s.replace(/\{(\w+)\}/g, (_, name) => {
    const v = values[name]
    return v === undefined ? `{${name}}` : String(v)
  })
}

/**
 * 估算 SVG text 元素的渲染宽度（px）。
 * 启发式：CJK / 全角 1.0em、字母 / `#` / `@` / `%` 0.55em、数字 0.58em、其余半角 0.35em。
 * `#` 等特殊半角符号在 font-weight 600 下渲染宽度接近字母，故归入字母档。
 * 字距：letterSpacing * (字符数 - 1)。
 * 上界估算，目的是检测"几乎肯定会溢出"的情况，不追求像素精确。
 */
export function measureTextWidth(
  content: string,
  fontSize: number,
  letterSpacing: number = 0,
): number {
  let charWidth = 0
  for (const ch of content) {
    const cp = ch.codePointAt(0) ?? 0
    if (
      (cp >= 0x4e00 && cp <= 0x9fff) ||  // CJK 统一表意
      (cp >= 0x3000 && cp <= 0x30ff) ||  // CJK 符号 / 假名
      (cp >= 0xff00 && cp <= 0xffef)     // 全角 ASCII / 半角片假名
    ) {
      charWidth += 1.0 * fontSize
    } else if (cp >= 0x30 && cp <= 0x39) {
      charWidth += 0.58 * fontSize
    } else if (
      (cp >= 0x41 && cp <= 0x5a) ||
      (cp >= 0x61 && cp <= 0x7a) ||
      cp === 0x23 ||  // #
      cp === 0x40 ||  // @
      cp === 0x25     // %
    ) {
      charWidth += 0.55 * fontSize
    } else {
      charWidth += 0.35 * fontSize
    }
  }
  const chars = [...content].length
  const spacing = chars > 1 ? letterSpacing * (chars - 1) : 0
  return charWidth + spacing
}

function textRightEdge(
  primitive: MotifPrimitive,
  values: Readonly<Record<string, string | number>>,
): number | null {
  if (primitive.type !== 'text') return null
  const content = substitutePlaceholders(primitive.content, values)
  const w = measureTextWidth(content, primitive.fontSize, primitive.letterSpacing ?? 0)
  return primitive.x + w
}

function collectMaxTextRight(
  primitives: readonly MotifPrimitive[],
  values: Readonly<Record<string, string | number>>,
): number {
  let max = 0
  for (const p of primitives) {
    if (p.type === 'text') {
      const right = textRightEdge(p, values)
      if (right !== null && right > max) max = right
    }
  }
  return max
}

function expandRect(
  p: MotifPrimitive,
  origW: number,
  deltaW: number,
): MotifPrimitive {
  if (p.type !== 'rect') return p
  const rightEdge = p.x + p.w
  // 容差 4px：外框（0.5+259=259.5）和内框（3+254=257）都在 4px 内，均同步扩。
  // 内部装饰 rect 若右沿距 viewBox 边超过 4px，则视为非边框元素、不扩。
  if (Math.abs(rightEdge - origW) <= 4) {
    return { ...p, w: p.w + deltaW }
  }
  return p
}

/**
 * 占位符替换后估算 MotifTemplate 中所有 text primitive 的右沿，若超出 viewBox 宽度
 * + 安全边距，返回扩了 viewBox[2] / width 的克隆模板（外框 rect 同步扩 w）；
 * 否则原样返回，避免不必要的克隆。
 */
export function fitTemplateToText(
  template: MotifTemplate,
  values: Readonly<Record<string, string | number>>,
): MotifTemplate {
  const origW = template.viewBox[2]
  const maxRight = collectMaxTextRight(template.primitives, values)
  const needed = maxRight + SAFE_MARGIN

  if (needed <= origW) return template

  const deltaW = Math.ceil(needed - origW)
  const newW = origW + deltaW

  return {
    ...template,
    viewBox: [template.viewBox[0], template.viewBox[1], newW, template.viewBox[3]],
    width: template.width !== undefined ? template.width + deltaW : undefined,
    primitives: template.primitives.map((p) => expandRect(p, origW, deltaW)),
  }
}
