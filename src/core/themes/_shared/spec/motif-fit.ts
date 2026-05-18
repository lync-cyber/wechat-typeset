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
const SAFE_MARGIN = 8

/**
 * 极小扩张抑制阈值（px）：用于过滤"启发式与 viewBox 几乎吻合"的情况。
 * stepBadge 这类内容居中且整体大小由 spec 把控的图形，让小幅 ceil 误差触发 +1px
 * 扩张毫无收益，反而让 conformance 测试与快照漂移。> 2px 才真正反映"文本会被裁"。
 */
const EXPAND_THRESHOLD = 2

function substitutePlaceholders(s: string, values: Readonly<Record<string, string | number>>): string {
  return s.replace(/\{(\w+)\}/g, (_, name) => {
    const v = values[name]
    return v === undefined ? `{${name}}` : String(v)
  })
}

/**
 * 估算 SVG text 元素的渲染宽度（px），偏保守估计（避免裁字）。
 *
 * 启发式（font-weight 500–700 sans-serif 平均值）：
 *   - CJK / 全角：1.0em
 *   - 拉丁大写（含 W/M 较宽的字母）：0.7em
 *   - 拉丁小写 / `#@%`：0.6em / 0.65em
 *   - 数字：0.62em
 *   - 其余半角（`·` `-` `空格`）：0.4em
 * 字距：letterSpacing × 字符数（与浏览器对齐 —— 多数实现尾字也累加字距）。
 *
 * 历史教训：之前用 0.55em (拉丁) / 0.35em (其他) / `× (chars-1)`，对加粗
 * 拉丁大写 + letterSpacing 1.5px 的内容（如 industry-observer 的
 * `ISSUE #023 · 2025-04-20 · 周刊`）低估约 25–30px，导致 "周刊" 被 SVG 边界裁切。
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
      charWidth += 0.62 * fontSize
    } else if (cp >= 0x41 && cp <= 0x5a) {
      // 拉丁大写：S/U/E/W/M 在 bold sans-serif 下经常逼近 0.7em
      charWidth += 0.7 * fontSize
    } else if (cp >= 0x61 && cp <= 0x7a) {
      charWidth += 0.6 * fontSize
    } else if (cp === 0x23 || cp === 0x40 || cp === 0x25) {
      // # @ % 在加粗下渲染宽度与大写字母相近
      charWidth += 0.65 * fontSize
    } else {
      // 其余半角（空格、- · 等）—— 中点 U+00B7 多数字体下贴近 0.4em
      charWidth += 0.4 * fontSize
    }
  }
  const chars = [...content].length
  // 浏览器多数实现对最后一个字形也累加字距（letter-spacing 是 trailing），
  // × chars 略偏保守但与 Blink/WebKit 实际渲染更接近。
  const spacing = chars > 0 ? letterSpacing * chars : 0
  return charWidth + spacing
}

/**
 * 根据 textAnchor 计算文本右沿。
 *   - 'start'（默认）：right = x + width
 *   - 'middle'：right = x + width/2
 *   - 'end'：right = x（文本结束于 x）
 *
 * 修复了之前 textAnchor 被忽略 → 居中文字（stepBadge 的 `1`）被错算成
 * `x + width` 进而触发 +1px 虚假扩张的问题。
 */
function textRightEdge(
  primitive: MotifPrimitive,
  values: Readonly<Record<string, string | number>>,
): number | null {
  if (primitive.type !== 'text') return null
  const content = substitutePlaceholders(primitive.content, values)
  const w = measureTextWidth(content, primitive.fontSize, primitive.letterSpacing ?? 0)
  const anchor = primitive.textAnchor ?? 'start'
  if (anchor === 'middle') return primitive.x + w / 2
  if (anchor === 'end') return primitive.x
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
 *
 * 当 needed - origW < EXPAND_THRESHOLD 时也视为不需要扩张：这种小幅 ceil
 * 误差通常只是启发式估算的副产物，不代表真实裁切风险。
 */
export function fitTemplateToText(
  template: MotifTemplate,
  values: Readonly<Record<string, string | number>>,
): MotifTemplate {
  const origW = template.viewBox[2]
  const maxRight = collectMaxTextRight(template.primitives, values)
  const needed = maxRight + SAFE_MARGIN

  if (needed - origW < EXPAND_THRESHOLD) return template

  const deltaW = Math.ceil(needed - origW)
  const newW = origW + deltaW

  return {
    ...template,
    viewBox: [template.viewBox[0], template.viewBox[1], newW, template.viewBox[3]],
    width: template.width !== undefined ? template.width + deltaW : undefined,
    primitives: template.primitives.map((p) => expandRect(p, origW, deltaW)),
  }
}
