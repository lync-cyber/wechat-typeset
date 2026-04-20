/**
 * Theme 设计系统类型定义
 *
 * 每个主题 = 设计令牌 + 元素样式 + 容器样式 + SVG 装饰资产 + 模板 + 骨架变体。
 * 主题严禁在任何层级声明 font-family——微信客户端会用系统字体覆盖，
 * themeCSS 生成器遇到 font-family 会直接 throw ThemeAuthoringError。
 *
 * ThemeVariants：每类容器可选多个"视觉骨架"，主题在 variants 里声明 id；
 * 渲染器按 id 查表分派到 variants/{kind}/{id}.ts。variant 模块只允许返回
 * { wrapperCSS, titleCSS, bodyCSS, svgSlot } 四段产物，杜绝"CSS 片段超市"。
 * 主题不声明 variants 时，buildTheme 填入 DEFAULT_VARIANTS。
 */

export type CSSObject = Record<string, string | number>
export type SVGString = string

/** 语义化状态色：提示容器与后续可能的徽章使用 */
export interface StatusPair {
  accent: string
  soft: string
}

export interface ThemeTokens {
  colors: {
    primary: string
    secondary: string
    accent: string
    bg: string
    bgSoft: string
    bgMuted: string
    text: string
    textMuted: string
    textInverse: string
    border: string
    code: string
    /** 语义色：tip / warning / info / danger，容器外框与标题色从此取 */
    status: {
      tip: StatusPair
      warning: StatusPair
      info: StatusPair
      danger: StatusPair
    }
  }
  typography: {
    baseSize: number
    lineHeight: number
    h1Size: number
    h2Size: number
    h3Size: number
    letterSpacing: number
    // 注意：禁止 fontFamily 字段；themeCSS 生成器会在 CSS 层扫描并拒绝 font-family
  }
  spacing: {
    paragraph: number
    section: number
    listItem: number
    containerPadding: number
  }
  radius: {
    sm: number
    md: number
    lg: number
  }
}

export interface ThemeElements {
  h1: CSSObject
  h2: CSSObject
  h3: CSSObject
  /**
   * 四级小标题。教程主题常用于 "Step 1. 初始化项目" 这类可操作步骤题头。
   * 介于 h3 章节小节与 p 正文之间，和 steps 容器搭配使用。
   */
  h4: CSSObject
  p: CSSObject
  blockquote: CSSObject
  ul: CSSObject
  ol: CSSObject
  li: CSSObject
  code: CSSObject
  /**
   * 键盘按键帽样式。微信约束下不能用 box-shadow 模拟立体，
   * 通过 `border 1px + border-bottom 2px` 的不对称边框表达键帽感。
   */
  kbd: CSSObject
  pre: CSSObject
  img: CSSObject
  a: CSSObject
  hr: CSSObject
  table: CSSObject
  strong: CSSObject
  em: CSSObject
}

export interface ThemeContainers {
  intro: CSSObject
  author: CSSObject
  cover: CSSObject
  tip: CSSObject
  warning: CSSObject
  info: CSSObject
  danger: CSSObject
  quoteCard: CSSObject
  highlight: CSSObject
  compare: CSSObject
  steps: CSSObject
  sectionTitle: CSSObject
  footerCTA: CSSObject
  recommend: CSSObject
  qrcode: CSSObject
}

export interface ThemeAssets {
  h2Prefix?: SVGString
  h3Prefix?: SVGString
  dividerFlower?: SVGString
  dividerWave?: SVGString
  dividerDots?: SVGString
  quoteMark?: SVGString
  listBullet?: SVGString
  sectionCorner?: SVGString
  stepBadge?: (n: number) => SVGString
  tipIcon?: SVGString
  warningIcon?: SVGString
  infoIcon?: SVGString
  dangerIcon?: SVGString
  /**
   * Note（中性补充说明）图标。五态模型的第五档，区别于 info（"此处有延伸知识"）。
   * 教程主题里最常见，其他主题可选。
   */
  noteIcon?: SVGString
  /**
   * 代码块右上角"可复制"装饰图标。公众号不能真复制，但该图标是"这段代码是给你抄的"的文化信号。
   * 由 codeBlock variant = 'header-bar' 消费；variant 为 'bare' 时忽略。
   */
  copyIcon?: SVGString
  /**
   * 外链箭头，用于 <a> 元素末尾装饰（MDN / Stripe Docs 的 universal 外链标识）。
   * 当前未被任何渲染器自动注入，作为主题可选资产暴露供未来 inline 扩展消费。
   */
  externalLinkIcon?: SVGString
  /**
   * bash 代码块前缀 `$` 字符 SVG，提示"这行是 shell 命令"。
   * 当前未被 highlight hook 自动注入，作为主题可选资产暴露供未来扩展消费。
   */
  terminalPrompt?: SVGString
  /**
   * 卷尾钤印。当主题提供时，footerCTA renderer 会在容器底部右下角自动注入一枚 24×24
   * 装饰印章，作为"全文收束"视觉签名。规范上只在"稀缺色"语义强的主题里使用
   * （如 literary-humanism 的藏经朱）——其他主题留空即可，renderer 不做默认兜底。
   */
  sealMark?: SVGString
  /**
   * 期号印章（newsletter 期刊戳）。当主题提供 + markdown 容器上声明了 issue/date/kind
   * 任一 attr 时，cover / author / footerCTA renderer 会在各自配置的位置注入该 SVG。
   * 设计意图：industry-observer 家族（周刊 / newsletter）的"ISSUE #023 · 2025-04-20 · 周刊"
   * 戳记，跨三个容器保持视觉一致；非 newsletter 主题不提供即可。
   *
   * 参数：issue（期号，如 "023"）、date（日期字符串）、kind（刊物类型，如 "周刊"）。
   * 任一参数可为空串，由主题自行决定占位。
   */
  issueStamp?: (issue: string, date: string, kind: string) => SVGString
}

export interface ThemeTemplates {
  cover?: string
  authorBar?: string
  footerCTA?: string
  recommend?: string
  compare?: string
  steps?: string
  tip?: string
}

export interface ThemeInline {
  highlight: CSSObject
  wavy: CSSObject
  emphasis: CSSObject
}

// ============================================================
// Variants：骨架变体（v2 新增）
// ============================================================
//
// 每一类容器提供 N 种"视觉骨架"。主题在 Theme.variants 里声明要用哪一个，
// renderer 按 id 分派到 variants/{kind}/{id}.ts 模块。
//
// 选择原则（和公众号硬约束强绑定）：
//   - 禁 position / float / @media / @keyframes / :hover / -webkit- / flex gap
//   - 需要"悬浮 / 缺口 / 折角"这类视觉，改用 SVG data-URI 背景或
//     inline SVG 节点 + 负 margin 实现，而非 position:absolute
//   - 每个 variant 的拼接 CSS 字符串 ≤ 400 字符（juice 后粘贴稳定性）

export type AdmonitionVariantId =
  // 左侧 3px 色条 + 浅底（默认，当前渲染器等效行为）
  | 'accent-bar'
  // 顶部胶囊标签 + 外框下沉（标题悬于边缘上沿）
  | 'pill-tag'
  // 票根缺口：左右两端圆切齿，SVG data-URI 背景实现
  | 'ticket-notch'
  // 卡片阴影悬浮：单层阴影 + 圆角 + 无边框
  | 'card-shadow'
  // 极简下划线：仅标题下方一道色条，整体无底色
  | 'minimal-underline'
  // 终端窗口：顶部三色圆点条 + 单色字号小的正文
  | 'terminal'

export type QuoteVariantId =
  // 大号装饰引号 + 居中（当前默认行为）
  | 'classic'
  // 首字下沉：第一字放大 2.5x，杂志排风
  | 'magazine-dropcap'
  // 双侧细竖线：左右各一根 1px 长线夹住段落
  | 'column-rule'
  // 四角括号框：四个角各一个 L 形 SVG 装饰
  | 'frame-brackets'

export type CompareVariantId =
  // 两栏卡片（当前默认行为，display:table-cell）
  | 'column-card'
  // 上下堆叠：两行 full-width 卡片，小屏友好
  | 'stacked-row'
  // 账本双色列：一列绿底一列红底，ledger 风
  | 'ledger'

export type StepsVariantId =
  // 编号圆圈徽章（当前默认行为）
  | 'number-circle'
  // 飘带链式：每步横向色条连续
  | 'ribbon-chain'
  // 时间轴点：左侧单列点阵 + 正文
  | 'timeline-dot'

export type DividerVariantId =
  | 'wave'
  | 'dots'
  | 'flower'
  | 'rule'
  | 'glyph' // 单字符装饰（§ / ❦ / ◆）

export type SectionTitleVariantId =
  // 底部 2px 主色线（当前默认）
  | 'bordered'
  // 左上角装饰 SVG（当前 assets.sectionCorner 对应）
  | 'cornered'

export type CodeBlockVariantId =
  // 裸 <pre><code>（默认，与 v1 行为等价）
  | 'bare'
  // 顶部语言标签带：语言名大写 + 可选 copy 图标；Stripe Docs / MDN 家族 signature
  | 'header-bar'

/**
 * 主题骨架选择。每个字段选一个 id，渲染器据此分派到 variants/{kind}/{id}.ts。
 *
 * 初版覆盖：6 + 4 + 3 + 3 + 5 + 2 = 23 种 variant，远超"至少 5×4=20 组合"基线。
 */
export interface ThemeVariants {
  admonition: AdmonitionVariantId
  quote: QuoteVariantId
  compare: CompareVariantId
  steps: StepsVariantId
  divider: DividerVariantId
  sectionTitle: SectionTitleVariantId
  codeBlock: CodeBlockVariantId
}

/**
 * 主题不声明时的回退。对齐 v1 各渲染器的当前视觉，保证现有 5 套主题零改动兼容。
 * buildTheme 会在 opts.variants 未提供时注入此常量。
 */
export const DEFAULT_VARIANTS: ThemeVariants = {
  admonition: 'accent-bar',
  quote: 'classic',
  compare: 'column-card',
  steps: 'number-circle',
  divider: 'rule',
  sectionTitle: 'bordered',
  codeBlock: 'bare',
}

/**
 * 所有可选 VariantId 的常量清单（供 variant-sanity 测试枚举使用，
 * 任何新增 id 必须同步补齐，否则测试会漏掉新 variant）。
 */
export const VARIANT_IDS = {
  admonition: [
    'accent-bar',
    'pill-tag',
    'ticket-notch',
    'card-shadow',
    'minimal-underline',
    'terminal',
  ] as const satisfies readonly AdmonitionVariantId[],
  quote: [
    'classic',
    'magazine-dropcap',
    'column-rule',
    'frame-brackets',
  ] as const satisfies readonly QuoteVariantId[],
  compare: [
    'column-card',
    'stacked-row',
    'ledger',
  ] as const satisfies readonly CompareVariantId[],
  steps: [
    'number-circle',
    'ribbon-chain',
    'timeline-dot',
  ] as const satisfies readonly StepsVariantId[],
  divider: [
    'wave',
    'dots',
    'flower',
    'rule',
    'glyph',
  ] as const satisfies readonly DividerVariantId[],
  sectionTitle: [
    'bordered',
    'cornered',
  ] as const satisfies readonly SectionTitleVariantId[],
  codeBlock: [
    'bare',
    'header-bar',
  ] as const satisfies readonly CodeBlockVariantId[],
}

export type VariantKind = keyof ThemeVariants

/**
 * 主题行为开关。**不是样式，不是 token，是 renderer 级别的结构改动**——
 * 某些主题（如 people-story 杂志特稿）需要的视觉签名必须由渲染管线参与生成：
 *   - introDropcap：intro 首段首字拆成 `<span class="intro-dropcap">X</span>`，
 *     使 CSS 能独立放大首字而不走 ::first-letter / float（公众号都不稳）。
 *   - h2RomanNumerals：h2 标题前自动注入罗马数字前缀（I / II / III ...），
 *     取代 theme.assets.h2Prefix 的 SVG 装饰；计数器 per-render 重置。
 *
 * 不声明 behavior 或字段为 false/undefined 时，pipeline 保持原行为。
 * 新增行为开关需遵守：**只在主题明确需要 renderer 参与时使用**；能用 token / CSS /
 * assets 解决的需求不引入 behavior 开关。
 */
export interface ThemeBehavior {
  /** intro 首段首字下沉：渲染器把首个实字拆成 `<span class="intro-dropcap">X</span>` */
  introDropcap?: boolean
  /** h2 自动编号：渲染器按 h2 顺序注入罗马数字前缀 span，取代 h2Prefix SVG 装饰位 */
  h2RomanNumerals?: boolean
}

export interface Theme {
  id: string
  name: string
  description: string
  author: string
  preview: string

  tokens: ThemeTokens
  elements: ThemeElements
  containers: ThemeContainers
  assets: ThemeAssets
  templates: ThemeTemplates
  inline: ThemeInline
  /**
   * v2 骨架选择。主题不声明时由 buildTheme 填入 DEFAULT_VARIANTS。
   * 渲染器在 ContainerRenderContext.variants 里读取。
   */
  variants: ThemeVariants
  /**
   * 渲染器级行为开关。绝大多数主题不需要；只有需要 renderer 参与生成视觉签名
   * 的主题（如 people-story 的 dropcap / 罗马数字）才声明。
   */
  behavior?: ThemeBehavior
}

export class ThemeAuthoringError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ThemeAuthoringError'
  }
}
