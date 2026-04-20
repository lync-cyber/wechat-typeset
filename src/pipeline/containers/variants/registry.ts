/**
 * Variant 注册表（v2 P1 同质化修复核心）
 *
 * 契约：每个 variant 模块只返回受约束的 { wrapperCSS, titleCSS, bodyCSS, svgSlot }
 * 四段产物——避免"CSS 片段超市"，避免把骨架做成字符串拼接泳池。
 *
 *   - wrapperCSS  (必填)：外框 inline style 声明串（以 ";" 分隔）。长度 ≤ 400 字符。
 *   - titleCSS    (可选)：标题行 inline style；不填则沿用默认 bold + 主色。
 *   - bodyCSS     (可选)：正文区 inline style；多半不填。terminal / ticket 等需要
 *                         特定字号/内边距时写。
 *   - svgSlot     (可选)：放在 wrapper 首位的装饰节点（纯 SVG / inline-block 胶囊条）。
 *                         该字段走 HTML 逃生口，允许 variant 叠装饰但不可出现 flex/position。
 *
 * 选择原则：
 *   - 禁 position / float / @media / @keyframes / :hover / -webkit- / flex gap
 *   - 悬浮/缺口/折角等"传统靠 position 实现"的骨架改用 SVG data-URI 背景
 *     （CSS url() 用 utf8 + 单引号规避，或 base64；主题的 SVG 内部 url() 另走 no-quotes 规则）
 *   - 外框 margin/padding/border/border-radius/background-color 全允许
 *   - box-shadow 单层允许
 */

import type {
  AdmonitionVariantId,
  CodeBlockVariantId,
  CompareVariantId,
  DividerVariantId,
  QuoteVariantId,
  SectionTitleVariantId,
  StepsVariantId,
  Theme,
  VariantKind,
} from '../../../themes/types'
import type { ContainerRenderContext } from '../types'

export interface VariantRenderResult {
  wrapperCSS: string
  /**
   * 标题行 inline style。
   *   - undefined  → renderer 用默认 title 样式（bold + accent 色）
   *   - 非空字符串 → renderer 用此样式渲染 title section
   *   - 空字符串   → renderer **跳过** 默认 title 行，标题文字由 svgSlot 自行承担
   *                  （仅在 variant 需要特殊 title 结构，如 terminal 的"圆点条 + 文字"时使用）
   */
  titleCSS?: string
  bodyCSS?: string
  svgSlot?: string
}

export type AdmonitionKind = 'tip' | 'warning' | 'info' | 'danger'

export interface AdmonitionRenderArgs {
  kind: AdmonitionKind
}

export interface CompareRenderArgs {
  slot: 'wrapper' | 'pros' | 'cons'
  title?: string
}

export type VariantRender<Args = void> = Args extends void
  ? (ctx: ContainerRenderContext) => VariantRenderResult
  : (ctx: ContainerRenderContext, args: Args) => VariantRenderResult

export interface VariantModule<Id extends string, Args = void> {
  id: Id
  kind: VariantKind
  /**
   * 与哪些主题天然契合（用于组件库 UI 给"推荐"徽章）；空数组等价于全兼容。
   * 兼容性是推荐而非强制——用户想把 terminal 骨架接到文学主题上也合法。
   */
  themeCompat?: string[]
  render: VariantRender<Args>
}

/** AdmonitionVariant 接收 kind 以便选色 / 选图标。 */
export type AdmonitionVariant = VariantModule<AdmonitionVariantId, AdmonitionRenderArgs>
/** Quote 返回 wrapper/title/body；close 行为由 container renderer 自己处理。 */
export type QuoteVariant = VariantModule<QuoteVariantId>
/** Compare 用 slot 区分外壳 / pros 列 / cons 列。 */
export type CompareVariant = VariantModule<CompareVariantId, CompareRenderArgs>
export type StepsVariant = VariantModule<StepsVariantId>
/** Divider 的 svgSlot 承担全部可视；wrapperCSS 仅管对齐和间距。 */
export type DividerVariant = VariantModule<DividerVariantId>
export type SectionTitleVariant = VariantModule<SectionTitleVariantId>

/**
 * CodeBlockVariant 与其他 variant 签名完全不同：
 *   - 入参是 highlight hook 产物（语言 id + 已 syntax-highlighted 的内层 HTML），不是 ctx
 *   - 出参是完整的 <pre>...</pre> 级 HTML 字符串（可选外层 wrapper），不走 wrapperCSS/titleCSS 四段
 *
 * 因为它消费的位置（md.options.highlight）和容器渲染器不同，强行套 VariantModule 会让签名
 * 充满 any/断言，得不偿失。独立成一条类型，更诚实。
 */
export interface CodeBlockRenderArgs {
  /** 已识别的语言 id（'javascript' / 'python' / ''），空串 = 无法识别或未指定 */
  language: string
  /** hljs 产出的 <code> 内层 HTML（已 escape，已 span 着色）；需要自行包一层 <pre><code>…</code></pre> */
  codeInnerHtml: string
}

export interface CodeBlockVariant {
  id: CodeBlockVariantId
  kind: 'codeBlock'
  /**
   * 直接接收 theme 而非 ContainerRenderContext —— codeBlock 走 highlight hook 路径，
   * 不经容器栈；也不需要 variants/containers/inline 只取 tokens/assets 即可。
   */
  render: (theme: Theme, args: CodeBlockRenderArgs) => string
}

export function defineCodeBlock(id: CodeBlockVariantId, render: CodeBlockVariant['render']): CodeBlockVariant {
  return { id, kind: 'codeBlock', render }
}

// 定义辅助：省掉每个 variant 文件里 `id: '...'` + `kind: '...'` 的样板。
// 运行时产物 {id, kind, render} 与手写完全一致。

export function defineAdmonition(
  id: AdmonitionVariantId,
  render: AdmonitionVariant['render'],
): AdmonitionVariant {
  return { id, kind: 'admonition', render }
}

export function defineQuote(id: QuoteVariantId, render: QuoteVariant['render']): QuoteVariant {
  return { id, kind: 'quote', render }
}

export function defineCompare(
  id: CompareVariantId,
  render: CompareVariant['render'],
): CompareVariant {
  return { id, kind: 'compare', render }
}

export function defineSteps(id: StepsVariantId, render: StepsVariant['render']): StepsVariant {
  return { id, kind: 'steps', render }
}

export function defineDivider(
  id: DividerVariantId,
  render: DividerVariant['render'],
): DividerVariant {
  return { id, kind: 'divider', render }
}

export function defineSectionTitle(
  id: SectionTitleVariantId,
  render: SectionTitleVariant['render'],
): SectionTitleVariant {
  return { id, kind: 'sectionTitle', render }
}

/** 工具：把 CSSObject 样式串中的空值剔除并用 `;` 拼接。 */
export function joinCss(entries: ReadonlyArray<string | false | null | undefined>): string {
  return entries.filter(Boolean).join(';')
}

/** 400 字符上限硬检查，variant 写超出即 throw——让问题在开发阶段暴露。 */
export function assertVariantCSSLength(path: string, css: string): void {
  if (css.length > 400) {
    throw new Error(
      `[variant] ${path} 的 wrapperCSS 长度 ${css.length} > 400（软约束）。` +
        '拆分样式或将装饰移到 svgSlot。',
    )
  }
}
