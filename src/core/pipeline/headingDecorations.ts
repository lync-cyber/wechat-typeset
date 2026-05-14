/**
 * 标题前缀装饰：theme.decorations.headingPrefix 的统一实现
 *
 * 抽出动机：markdown.ts 原本把约 200 行的 autoNumber / pattern 投影代码与
 * createMarkdown 主流程混在一起，导致主入口超 440 行难以浏览。本文件聚合所有
 * "heading 前缀" 相关的辅助：CSS 构造、计数器、数字格式化、占位替换、Token
 * 注入。导出唯一公开入口 applyHeadingPrefixDecorations(md, theme)。
 *
 * 设计纪律：本文件是"声明式 → 渲染"的唯一投影。新增任何标题前缀类视觉签名都应
 * 通过 PersonaSpec.decorations.headingPrefix 声明，不应在本文件之外添加 if 分支。
 * 如果一个主题想要无法用此结构表达的视觉，先评估能否扩展 HeadingPrefixDecoration
 * 的字段（如新增 underline / fontFamily 这类选项），保证共享层只动一处。
 */

import type MarkdownIt from 'markdown-it'
import { toRoman } from '../themes/_shared/svgLib'
import type { HeadingPrefixDecoration, Theme, ThemeTokens } from '../themes/types'

/**
 * inline 子 token 的最小结构（避免引入 markdown-it 的内部类型）。
 * markdown-it 的 Token 类的实例满足此接口。
 */
type InlineChild = { type: string; content: string; constructor: unknown }

/** PaletteColorKey → 实际 hex（运行时查 theme.tokens.colors） */
function resolveColor(key: HeadingPrefixDecoration['style']['color'], colors: ThemeTokens['colors']): string {
  return colors[key]
}

function decorationCss(style: HeadingPrefixDecoration['style'], colors: ThemeTokens['colors']): string {
  const color = resolveColor(style.color, colors)
  // display='block' → kicker 自成一行,marginBottom 提供与下方标题文字的垂直间距；
  // display='inline'(默认) → 与现状一致,marginRight 控制横向间距。
  const isBlock = style.display === 'block'
  const parts: string[] = [`display:${isBlock ? 'block' : 'inline-block'}`, `color:${color}`]
  if (style.fontFamily === 'monospace') parts.push('font-family:Menlo,Monaco,monospace')
  if (style.fontWeight) parts.push(`font-weight:${style.fontWeight}`)
  if (style.fontSize) parts.push(`font-size:${style.fontSize}px`)
  if (style.letterSpacing) parts.push(`letter-spacing:${style.letterSpacing}px`)
  if (isBlock) {
    parts.push(`margin-bottom:${style.marginBottom ?? 6}px`)
  } else {
    parts.push(`margin-right:${style.marginRight ?? 8}px`)
  }
  if (style.underline) {
    parts.push(`border-bottom:1px solid ${color}`)
    parts.push(`padding-bottom:${style.underlinePad ?? 2}px`)
  }
  // 色块徽章：声明 backgroundColor 即把编号撑成方块（典型例 swiss-grid 的 H2 「01」红章）。
  // paddingX/paddingY 仅在 backgroundColor 声明时生效，缺省 0；underline + 色块同时声明
  // 时不互斥，但视觉上很少同时用。
  if (style.backgroundColor) {
    const bg = resolveColor(style.backgroundColor, colors)
    parts.push(`background-color:${bg}`)
    const px = style.paddingX ?? 0
    const py = style.paddingY ?? 0
    if (px || py) parts.push(`padding:${py}px ${px}px`)
  }
  return parts.join(';')
}

/** autoNumber 计数器：一次 render 内累加，按 level 分桶；h3InH2 在每个新 h2 处归零。 */
interface HeadingCounters {
  h2: number
  h3: number
  h3InH2: number
}

type AutoNumberKind = NonNullable<HeadingPrefixDecoration['autoNumber']>

/**
 * Unicode 圆圈数字 1–20。>20 退化为 `(N)` 字符串，避免主题作者意外触发缺字 tofu。
 * 来源：U+2776–U+277F（黑圈反白 1–10）+ U+24EB–U+24F4（黑圈反白 11–20）。
 *
 * 为什么不用 U+2460–U+2473（白圈黑字 ①②③）：mook / POPEYE 设计稿用的是实心圆背景版本
 * （❶❷❸），与"米卡纸底 + 朱橙 accent"的视觉签名一致；白圈版在暖底上对比不足。
 */
const CIRCLED_NUMERALS: readonly string[] = [
  '❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '❿',
  '⓫', '⓬', '⓭', '⓮', '⓯', '⓰', '⓱', '⓲', '⓳', '⓴',
]

/** 中文小写数字 1–20。>20 退化为阿拉伯数字。用于 suffix `{cn}` 占位符。 */
const CHINESE_NUMERALS: readonly string[] = [
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
]

function formatAutoNumber(
  kind: AutoNumberKind,
  counters: HeadingCounters,
  level: 2 | 3,
): string {
  // 复合编号 `${h2}.${h3InH2}` —— 设计上只对 level 3 有意义；level 2 调用时
  // h3InH2 还停留在上一段（或 0），输出会怪——主题作者请把复合格式留给 level 3。
  if (kind === 'arabic-section') {
    return `${counters.h2}.${counters.h3InH2}`
  }
  if (kind === 'arabic-section-padded') {
    return `${String(counters.h2).padStart(2, '0')}.${counters.h3InH2}`
  }
  const n = level === 2 ? counters.h2 : counters.h3
  if (kind === 'roman') return toRoman(n)
  if (kind === 'arabic-padded') return String(n).padStart(2, '0')
  if (kind === 'circled') return CIRCLED_NUMERALS[n - 1] ?? `(${n})`
  return String(n)
}

/**
 * suffix 占位符替换：`{n}` → autoNumber 输出本身，`{cn}` → 中文数字。
 * 占位符未匹配时原样保留；未来扩占位符（如 `{N}` 大写罗马）只需在此追加分支。
 */
function substituteSuffix(suffix: string, formattedN: string, rawIndex: number): string {
  return suffix
    .replace(/\{cn\}/g, CHINESE_NUMERALS[rawIndex - 1] ?? String(rawIndex))
    .replace(/\{n\}/g, formattedN)
}

export function applyHeadingPrefixDecorations(md: MarkdownIt, theme: Theme): void {
  const decos = theme.decorations?.headingPrefix
  if (!decos || decos.length === 0) return

  // 按 level 分组，便于扫描时 O(1) 取出适用规则
  const decosByLevel = new Map<2 | 3, HeadingPrefixDecoration[]>()
  for (const d of decos) {
    const list = decosByLevel.get(d.level) ?? []
    list.push(d)
    decosByLevel.set(d.level, list)
  }

  const colors = theme.tokens.colors

  md.core.ruler.push('wx_heading_prefix_decorations', (state) => {
    const tokens = state.tokens
    // per-render 计数器：h2/h3 各自一份 level-local 计数；h3InH2 是"当前 h2 段内
    // 的 h3 序号"，遇到新 h2 时归零——用于复合编号 `${h2}.${h3InH2}`。
    // 不论 decoration 是否声明 autoNumber，计数器都按 heading 出现顺序自然递增；
    // 没声明 autoNumber 的 level 不会读到这些数，所以多算也不耗费什么。
    const counters: HeadingCounters = { h2: 0, h3: 0, h3InH2: 0 }

    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i]
      if (tok.type !== 'heading_open') continue
      const level: 2 | 3 | null = tok.tag === 'h2' ? 2 : tok.tag === 'h3' ? 3 : null
      if (level === null) continue

      if (level === 2) {
        counters.h2++
        counters.h3InH2 = 0
      } else {
        counters.h3++
        counters.h3InH2++
      }

      const applicable = decosByLevel.get(level)
      if (!applicable || applicable.length === 0) continue
      const inlineTok = tokens[i + 1]
      if (!inlineTok || inlineTok.type !== 'inline' || !inlineTok.children) continue

      // 按声明顺序依次应用每条 decoration；同 level 多条时累加注入（罕见但允许）
      // children 类型：markdown-it 的 Token[]；上面已断言非 null
      const children = inlineTok.children as InlineChild[]
      for (const d of applicable) {
        applyOneHeadingDecoration(d, children, counters, level, colors)
      }
    }
  })
}

/**
 * 对一条 decoration 把变换写回 inline children 数组。
 * 两种模式互斥：autoNumber 直接前置；pattern 仅在 children[0] 是 text 且匹配时切。
 */
function applyOneHeadingDecoration(
  d: HeadingPrefixDecoration,
  children: InlineChild[],
  counters: HeadingCounters,
  level: 2 | 3,
  colors: ThemeTokens['colors'],
): void {
  const css = decorationCss(d.style, colors)

  // 反射出 Token 类（markdown-it 所有 token 实例共享同一构造器）。
  // children 空时 markdown-it 不会产出 heading inline——防御性跳过。
  if (children.length === 0) return
  type TokenCtor = new (type: string, tag: string, nesting: number) => InlineChild
  const Token = children[0].constructor as TokenCtor

  if (d.autoNumber) {
    // autoNumber 不消费文本，直接在最前面插一个 html_inline
    const text = formatAutoNumber(d.autoNumber, counters, level)
    // suffix 取本级 raw 计数（h2 用 h2 计数,h3 用 h3 计数）做 {cn} 等占位替换。
    // 这里 rawIndex 与 formatAutoNumber 内部读的 n 同源（除复合编号外）；
    // 复合编号场景下 suffix `{cn}` 退化为本级 raw 计数,语义清晰。
    const rawIndex = level === 2 ? counters.h2 : counters.h3
    const suffix = d.style.suffix ? substituteSuffix(d.style.suffix, text, rawIndex) : ''
    const span = new Token('html_inline', '', 0)
    span.content = `<span class="heading-prefix heading-prefix--autonumber" style="${css}">${text}${suffix}</span>`
    children.splice(0, 0, span)
    return
  }

  if (d.pattern) {
    const first = children[0]
    if (first.type !== 'text' || !first.content) return
    let re: RegExp
    try {
      re = new RegExp(d.pattern)
    } catch {
      // pattern 非法时静默跳过——校验由 validateSpec 兜底
      return
    }
    const m = re.exec(first.content)
    if (!m || !m[1]) return
    const captured = m[1]
    const consumed = m[0].length
    const rest = first.content.slice(consumed)
    const span = new Token('html_inline', '', 0)
    span.content = `<span class="heading-prefix heading-prefix--pattern" style="${css}">${captured}</span>`
    if (rest) {
      first.content = rest
      children.splice(0, 0, span)
    } else {
      children.splice(0, 1, span)
    }
  }
}
