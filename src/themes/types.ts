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

/**
 * 主题容器样式集。每个字段对应 src/containers/vocabulary.ts 里 `styleKey` 非 null 的容器。
 *
 * 约束：字段集必须与 STYLED_CONTAINERS 的 styleKey 集合一致；新增容器时两边同步。
 * 有运行时对齐检查（buildTheme + containers/api）；漏加字段会在 baseContainers()
 * 层抛 TS 编译错。
 *
 * 不含 `free` / `pros` / `cons` —— 它们在 vocabulary 里 styleKey=null：
 *   - free：刻意不施加主题样式（escape hatch）
 *   - pros / cons：样式由外层 compare 的 CSS 派生（compare 两栏专属收敛规则）
 */
export interface ThemeContainers {
  intro: CSSObject
  author: CSSObject
  cover: CSSObject
  tip: CSSObject
  warning: CSSObject
  info: CSSObject
  danger: CSSObject
  /** 第五态补注（note）。中性色、低对比；未设置也不影响 renderer，走 token 兜底。 */
  note: CSSObject
  quoteCard: CSSObject
  highlight: CSSObject
  compare: CSSObject
  steps: CSSObject
  sectionTitle: CSSObject
  footerCTA: CSSObject
  recommend: CSSObject
  qrcode: CSSObject
  /** 公众号语音占位卡 */
  mpvoice: CSSObject
  /** 公众号视频占位卡 */
  mpvideo: CSSObject
  /** 文首 tl;dr 摘要块（signature 容器） */
  abstract: CSSObject
  /** 大数字 + 说明（signature 容器） */
  keyNumber: CSSObject
  /** 相关阅读（signature 容器） */
  seeAlso: CSSObject
  // ── data-brief 家族（数据简报）签名容器 ──────────────────
  /** 刊头（刊名 + 期号·日期，下划线分隔） */
  masthead: CSSObject
  /** 小栏目标签（黑底白字胶囊） */
  sectionTag: CSSObject
  /** 目录三栏 grid（序号 · 标题 · 页码） */
  toc: CSSObject
  /** KPI 仪表盘外壳（三指标 + sparkline + 源标注） */
  kpiDashboard: CSSObject
  /** 条形图外壳（横向 div 柱） */
  barChart: CSSObject
  /** 读者问答（Q/A 头像方块） */
  qaBlock: CSSObject
  /** 脚注块（上分割线 + 编号引用） */
  footnotes: CSSObject
  /** CTA 三栏（赞同/收藏/转发，data-brief 签名） */
  ctaBar: CSSObject
  /** 二维码订阅卡（SUBSCRIBE 标签 + QR + 标题/说明，data-brief 签名） */
  qrFollow: CSSObject
  /** 编辑部注 callout：主色左条 + kicker 小标题 + 正文（data-brief / industry-observer 等深度刊家族） */
  editorNote: CSSObject
  /** 方法论小字注释：浅底紧凑 + 粗体标签头 + 10px 小字（调研 / 数据栏目使用） */
  methodology: CSSObject
  /** 刊物收束栏：上分割线 + 双栏 monospace 元数据（"下期 / 卷·期"） */
  colophon: CSSObject
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
  // 左 2px 虚线（"附注"铅笔感，tech-geek // NOTE）
  | 'dashed-border'
  // 左 4px 双线（"交叉引用"manpage/RFC，tech-geek // REF）
  | 'double-border'
  // 上下各一根 1px 实线（"勘误贴条"，tech-geek // PITFALL）
  | 'top-bottom-rule'
  // manpage 日志输出块：顶底分隔线 + 深底状态标签条（tech-geek 专属）
  | 'manpage-log'
  // LaTeX 旁注定理框：1px 细边框 + 小型大写起始标题（academic-frontier 专属）
  | 'sidenote-latex'
  // 书页批注：无框无底、墨色一色、【按/疑/注/辨】CJK 符号区分类型（literary-humanism 专属）
  | 'marginalia'
  // 账本单元格：深色表头条 + 硬边框，Bloomberg Terminal 数据感（business-finance 专属）
  | 'ledger-cell'
  // 有机气泡：大圆角 + 单侧柔软阴影，手绘信笺气质（life-aesthetic 专属）
  | 'bubble-organic'
  // 杂志拉引框：上下细线 + 浮空小字标签（people-story 专属）
  | 'magazine-pull'
  // 报告条款：顶 3px 底 1px + § 方角标签，研究报告条款感（industry-observer 专属）
  | 'report-section'
  // 数据简报单行：左 3px 色条 + 实色徽章 + 紧凑单行正文（data-brief 专属）
  | 'news-row'

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
  // 数据卡：顶 3px 主色/danger 色条 + bgSoft 底 + 大号 monospace 数字（data-brief 专属）
  | 'data-card'

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
    'dashed-border',
    'double-border',
    'top-bottom-rule',
    'manpage-log',
    'sidenote-latex',
    'marginalia',
    'ledger-cell',
    'bubble-organic',
    'magazine-pull',
    'report-section',
    'news-row',
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
    'data-card',
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
 * 保留给"无法用声明式 decorations 表达"的真正特例（目前唯一例子：introDropcap，
 * 需要扫前导标点 / 跳数字 / 拆首字符的复杂规则）。
 *
 * **新增 boolean flag 的门槛**（重要约束 / 反例参考）：
 *   - 历史上把 `h2RomanNumerals` / `h2DataBriefKicker` 写进这里是错的——它们
 *     是可声明的"标题前缀装饰"，已迁到 `PersonaSpec.decorations.headingPrefix`。
 *   - 加新 flag 前先问：能否用 `decorations.*` 这类声明数据表达？能则走声明式，
 *     避免共享类型 / schema / 管线代码随主题数量爆炸。
 *
 * 不声明 behavior 或字段为 false/undefined 时，pipeline 保持原行为。
 */
export interface ThemeBehavior {
  /** intro 首段首字下沉：渲染器把首个实字拆成 `<span class="intro-dropcap">X</span>` */
  introDropcap?: boolean
}

// ============================================================
// Decorations：声明式渲染层装饰规则
//
// 主题对"渲染层视觉签名"的需求绝大多数是**模式化**的（按 regex 切前缀、按出现
// 顺序编号、给标题加色块……），共享层只需实现一次"如何根据声明执行"，主题在 spec
// 里写一份纯数据声明即可——避免在 ThemeBehavior / schema / markdown.ts 三处各
// 加一段 if 分支的爆炸式增长。
//
// 字段命名约束：所有颜色用 token 名（`primary` / `accent` 等），不写 hex；换
// palette 时自动跟随主题色。font-family 只允许 `monospace` —— 与项目"主题不
// 声明字体"的统一纪律一致（正文交给系统字体；monospace 是数据 / 代码场景的例外）。
// ============================================================

/** 装饰里允许引用的色 token 键（必须是 ThemeTokens.colors 的合法 key） */
export type PaletteColorKey =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'text'
  | 'textMuted'

export interface HeadingPrefixDecoration {
  /** 适用的标题级别。h1 由作者写文章标题，不接入装饰；通常用 h2/h3。 */
  level: 2 | 3
  /**
   * 文本前缀正则（与 autoNumber 二选一）。捕获组 1 是要被装饰的前缀文本；
   * 整个匹配（含尾随空白）从原 inline 文本里被剥掉。
   * 例：`'^(\\d{1,2}|[附终前补])(\\s+|$)'` 匹配 "01 标题" / "附 标题"。
   */
  pattern?: string
  /**
   * 自动按出现顺序生成编号（与 pattern 二选一）。计数器 per-render 重置、按 level
   * 分桶。`roman` → I/II/III…；`arabic` → 1/2/3…；`arabic-padded` → 01/02/03…。
   */
  autoNumber?: 'roman' | 'arabic' | 'arabic-padded'
  /** 装饰样式（声明式 token 引用）。 */
  style: {
    color: PaletteColorKey
    /** 只允许 monospace（正文字体由系统决定）；缺省时继承标题字体 */
    fontFamily?: 'monospace'
    fontWeight?: 400 | 500 | 600 | 700
    /** 字号 px；缺省时继承标题字号 */
    fontSize?: number
    /** 字距 px；缺省 0 */
    letterSpacing?: number
    /** 与后续标题文字的间距 px；缺省 8 */
    marginRight?: number
    /** 是否在装饰前缀下方画一道短下划线（颜色取自 color 字段） */
    underline?: boolean
    /** underline=true 时下划线相对基线的下沉距离 px；缺省 2 */
    underlinePad?: number
  }
}

export interface Decorations {
  /**
   * 标题前缀装饰。同一 level 可有多条，按声明顺序依次应用——通常一个主题给定
   * level 只声明一条；多条的语义是"同时叠加"（autoNumber + pattern 可同时存在，
   * 但通常没必要）。
   */
  headingPrefix?: readonly HeadingPrefixDecoration[]
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
   * 渲染器级行为开关。绝大多数主题不需要；保留给"无法用声明式 decorations 表达"
   * 的真正特例（目前唯一例子：people-story 的 introDropcap）。
   */
  behavior?: ThemeBehavior
  /**
   * 声明式装饰规则。优先于 behavior：能用 decorations 表达的视觉签名（标题前缀
   * 编号 / kicker / 章节标记……）一律走这里，避免把"主题专属逻辑"散到 ThemeBehavior
   * 和 markdown.ts 里。
   */
  decorations?: Decorations
}

export class ThemeAuthoringError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ThemeAuthoringError'
  }
}
