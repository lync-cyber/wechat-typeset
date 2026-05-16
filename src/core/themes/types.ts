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

/**
 * 参数化 SVG 资产工厂的形状变体。控制 SVG 图形语言（sharp / soft / serif / playful），
 * 不控制颜色——颜色随 tokens 自动流动。
 * PersonaSpec 与 Theme 双端消费；_shared/svgAssets.ts re-export 此类型。
 */
export type SvgVariant = 'geometric' | 'soft' | 'serif' | 'playful'

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
    /**
     * `<pre>` 代码块底色（buildTheme.baseElements.pre 兜底消费）。
     * 不声明则用 Atom One Dark 家族常量（'#2a2d32'），即"浅底主题里默认给一个深色代码块"。
     * 暗底主题（brutalist / late-night-vinyl）想自定义代码块底色，可在 palette 里声明本字段
     * 而不必整段 __reset elements.pre。
     */
    preBg?: string
    /** `<pre>` 代码块文字色（同 preBg）。不声明则用 '#d8d8d4'。 */
    preText?: string
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
   * 四级小标题。教程主题常用于 "Step 1. 初始化项目" 这类可操作步骤题头，
   * 介于 h3 章节小节与 p 正文之间，和 steps 容器搭配使用。
   */
  h4: CSSObject
  /**
   * 五 / 六级标题。markdown-it 解析 `##### / ######` 为 `<h5>/<h6>`；
   * 主题不显式覆写时由 baseElements 给一个比 h4 更弱的兜底。
   */
  h5: CSSObject
  h6: CSSObject
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
  /** 表头单元格。 */
  th: CSSObject
  /** 数据单元格。 */
  td: CSSObject
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
 * **字段顺序仅为人工分组，不承载渲染语义**——renderer 按 styleKey 字符串查表分派
 * （vocabulary.ts `STYLE_KEY_TO_CONTAINER_NAME`），跟此处声明顺序无关。下面空行 + 注释
 * 把字段分块（base / signature / data-brief / editorial）只为方便人眼检索。
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
  /** 公众号语音占位卡（粘贴后由微信识别为 mpvoice）。fence 名 voice-card。 */
  voiceCard: CSSObject
  /** 公众号视频占位卡（粘贴后由微信识别为 mpvideo）。fence 名 video-card。 */
  videoCard: CSSObject
  /** 强警示横幅：文章级"置顶通告"，比 tip/warning 视觉强度更高。 */
  announcement: CSSObject
  /** 多行作者简介卡：头像 + 名字 + 身份 + bio。与 author 单行署名块正交。 */
  authorBio: CSSObject
  /** 图注块：图 + 居中小字灰说明。 */
  imageCaption: CSSObject
  /** 时间线：左侧年份 + 右侧事件的时序列表。 */
  timeline: CSSObject
  /**
   * 四态 callout 联表外框（callout-group）。承担"上/下/左/右 hairline"，
   * 子项 (tip/warning/info/danger) 在内串联。设计稿 multi-callout 母本。
   */
  calloutGroup: CSSObject
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
  /**
   * 署名条 byline。N 栏分隔（AUTHOR / EDITOR / SET 多栏 newspaper 形态），data-brief 家族签名。
   * 与 author（单作者名 + role 签名块）正交。
   */
  byline: CSSObject
  /**
   * 装饰性副刊头（editorial-header）。跨栏大字标题 + chip 红章 + PP 页码 + subtitle + titleDot 红点。
   * data-brief 家族签名；与 cover（图卡封面）正交——cover 管"封面图 + 期号戳"，
   * editorial-header 管"红章 + 大字标题 + 副标题"。
   */
  editorialHeader: CSSObject
  /** 目录三栏 grid（序号 · 标题 · 页码） */
  toc: CSSObject
  /** KPI 仪表盘外壳（三指标 + sparkline + 源标注） */
  kpiDashboard: CSSObject
  /** 条形图外壳（横向 div 柱） */
  barChart: CSSObject
  /** 读者问答（Q/A 头像方块） */
  qaBlock: CSSObject
  /**
   * 参考文献 / 脚注块。承载两种骨架：
   *   - `variants.footnotes='lined'`（默认）   一条一行 + hanging indent
   *   - `variants.footnotes='inline-flow'`    同段流式排列 + max-height/overflow 滚动
   * 主题 voice 在此槽位写"两种骨架共用的"色 / 字号 / 边框；layout 属性
   * （padding-left / text-indent / max-height）由 variant inline 注入。
   */
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

/**
 * 容器内层元素样式槽位（inner-element inline styles）。
 *
 * 区别于 `ThemeContainers`（每个容器一个 wrapper-level CSSObject,生成 `.markdown-body
 * .container-xxx` CSS 规则）：本接口承载的是容器**内部子元素**的 inline style 槽位,
 * renderer 在拼装 `<section style="...">` 字符串时直接 inline 注入,不进 themeCSS 生成器。
 *
 * 为什么不进 ThemeContainers / vocabulary：
 *   vocabulary 是"markdown fence 容器"的权威词汇表; 内层子元素既不是 markdown 容器,
 *   也不需要全局 CSS 选择器规则（公众号粘贴后 .container-key-number__value 这类长
 *   class 选择器很容易被剥）。inline style 是更稳的承载方式。
 *
 * 设计纪律（不要无限制扩展）：
 *   仅当某容器内层子元素的样式真正需要被主题作者覆盖（如 key-number 的数字字号、
 *   abstract 的 kicker 字距）才在此扩字段。"主题 voice 没有差异化诉求"的内层样式
 *   继续硬编码在 renderer 即可——避免本接口膨胀成所有 inline style 的转运站。
 *
 * 现存条目：
 *   - abstractKicker     文首 tl;dr 块的小标题色 / 字距 / 大写转换
 *   - keyNumberValue     大数字本体（数字字号 / 颜色 / 字距）
 *   - keyNumberKicker    大数字上方 kicker（小标题）
 *   - seeAlsoTitle       延伸阅读列表的标题
 *   - editorNoteKicker   编辑部注容器的 kicker 行（默认 primary 小字 + letter-spacing；
 *                        swiss-grid 用全幅黑底白字 header bar 形态——负 margin 撑到 wrapper 边缘）
 */
export interface ThemeInnerStyles {
  abstractKicker: CSSObject
  keyNumberValue: CSSObject
  keyNumberKicker: CSSObject
  seeAlsoTitle: CSSObject
  /**
   * 编辑部注（editor-note）容器顶部 kicker（如 "编 者 按"）的样式。
   *
   * 为什么开此槽位：数据简报家族默认走 `color: primary`（主色文字 + 浅底）。
   * 想重塑 kicker 形态的主题作者无需改 renderer：
   *   - swiss-grid: 全幅黑底白字 header bar（display:block + 负 margin 撑到 wrapper 边缘）
   *   - brutalist: editor-note bg 涂满 primary 后,kicker 走 textInverse 反色避免色/底同色
   * 与 abstractKicker / keyNumberKicker 同构。
   */
  editorNoteKicker: CSSObject
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
   * editor-note kicker 行最左侧的装饰图标（典型 8×8 实色方块）。
   *
   * 渲染契约：editor-note renderer 检测到此 asset 存在时，在 kicker 文字前 prepend
   *   `<span style="display:inline-block;vertical-align:middle;margin-right:6px;">${svg}</span>`
   * 主题不提供则不渲染图标，kicker 仅含文本。
   *
   * 设计动机：swiss-grid 设计稿的 editor-note 黑底白字 header bar 以红色 ▮ 字符开头,
   * 跨主题做 SVG 装饰更可控（字符 ▮ 在 iOS / Android 渲染粗细不一）。
   * 走 motifs AST 而非硬编码 SVG, 让色随 token 流动。
   */
  editorNoteKickerIcon?: SVGString
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
  /** GFM 删除线（`~~text~~` → `<s>`）。给主题作者一个调色 / 调位置的入口。 */
  del: CSSObject
  /** 插入（markdown-it-ins `++text++` → `<ins>`）。 */
  ins: CSSObject
}

// ============================================================
// Variants：骨架变体
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
  // 苏黎世下划线：实色徽章 + 1px 黑竖分隔 + 1px 黑底线（swiss-grid 专属）
  // 设计稿 multi-callout 母本，四态独立 ::: 块连续罗列即成一栏，无需 :::: callout-group
  | 'news-underline'
  // 编集附注 単字：参 / 編 / 注 / 禁 单字 CJK 标签 + 米卡纸底 + 主色左条
  // （editorial-mook 专属；POPEYE / BRUTUS 系编集所附注的母语形态）
  | 'mook-tag'

export type QuoteVariantId =
  // 大号装饰引号 + 居中（当前默认行为）
  | 'classic'
  // 首字下沉：第一字放大 2.5x，杂志排风
  | 'magazine-dropcap'
  // 双侧细竖线：左右各一根 1px 长线夹住段落
  | 'column-rule'
  // 四角括号框：四个角各一个 L 形 SVG 装饰
  | 'frame-brackets'
  // 旋转贴纸：反色卡片 + transform:rotate(-1deg) + 大字号粗体 sans 左对齐
  // （punk-zine / brutalist 撕贴纸语义；与 classic 形成"克制 vs 张力"对立轴）
  | 'tilted-sticker'

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
  // 大色块印章：消费 theme.assets.sealMark；右对齐"全文收束"签名印
  // （设计稿 02 swiss-grid signoff: 20×20 红方块右对齐）
  | 'seal-mark'

export type SectionTitleVariantId =
  // 底部 2px 主色线（当前默认）
  | 'bordered'
  // 左上角装饰 SVG（当前 assets.sectionCorner 对应）
  | 'cornered'

/**
 * Note 第五态独立 variant 类。命名空间与 admonition 故意分离：
 *   - admonition 4 态共享一个池，骨架强调"四色差异"
 *   - note 单独一个池，骨架强调"中性补注、低调、不抢色"（textMuted + 可选 noteIcon）
 * 让 note 池可独立演进（增 LaTeX-旁注、CJK 书签式批注等"非情绪"骨架）。
 */
export type NoteVariantId =
  // 极简：顶端 1px 短分隔线 + textMuted 标题（当前 signature.ts 兜底，移植为默认）
  | 'minimal-callout'
  // 边框 + 角标：单色 1px 全边框 + 左上角小图标，更"卡片感"
  | 'box-callout'
  // 左 2px 实线 + 缩进：经典"标记此处有补充"批注式
  | 'side-bar'

export type CodeBlockVariantId =
  // 裸 <pre><code>（默认）
  | 'bare'
  // 顶部语言标签带：语言名大写 + 可选 copy 图标；Stripe Docs / MDN 家族 signature
  | 'header-bar'

export type FootnotesVariantId =
  // 一条一行 + hanging indent（默认，等价于旧 ::: footnotes）
  | 'lined'
  // 同段流式排列 + max-height/overflow 滚动（等价于旧 ::: refs，长引用列表用）
  | 'inline-flow'

/** 主题骨架选择。每个字段选一个 id，渲染器据此分派到 variants/{kind}/{id}.ts。 */
export interface ThemeVariants {
  admonition: AdmonitionVariantId
  quote: QuoteVariantId
  compare: CompareVariantId
  steps: StepsVariantId
  divider: DividerVariantId
  sectionTitle: SectionTitleVariantId
  codeBlock: CodeBlockVariantId
  /** note 第五态独立变体类，与 admonition 4 态解耦。 */
  note: NoteVariantId
  /** 脚注 / 参考文献骨架（lined / inline-flow）。 */
  footnotes: FootnotesVariantId
}

/**
 * 主题不声明时的回退。保证现有主题零改动兼容。
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
  note: 'minimal-callout',
  footnotes: 'lined',
}

// ============================================================
// Kickers：容器内默认 kicker 文案的主题级覆盖
//
// 主题在 PersonaSpec.kickers 声明母语 kicker；管线兜底 DEFAULT_KICKERS。
// renderer 读 ctx.kickers.<key>（info 仍优先——作者随时可单稿覆盖）。
//
// 设计纪律：本接口只承载"renderer 里会注入到 HTML 的可见文案字面值"。
// 纯装饰图标 / SVG / CSS 不进本接口（属于 motifs / variants / containers 领地）。
// ============================================================

export interface ThemeKickers {
  /** ::: toc 容器无 info 时的 kicker 兜底（renderer 默认 "目录 · CONTENTS"） */
  toc: string
  /** ::: qa-block 容器无 info 时的 kicker 兜底（renderer 默认 "读者问答 · Q&A"） */
  qaBlock: string
  /** ::: editor-note 容器无 info 时的 kicker 兜底（renderer 默认 "编 者 按"） */
  editorNote: string
  /** ::: methodology 容器无 info 时的 label 兜底（renderer 默认 "方法论"） */
  methodology: string
  /** ::: qr-follow attrs.kicker 兜底（renderer 默认 "SUBSCRIBE"） */
  qrFollowKicker: string
  /** ::: qr-follow 容器无 info 时的 title 兜底（renderer 默认 "订阅本刊"） */
  qrFollowTitle: string
  /** ::: recommend 容器无 info 时的 title 兜底（renderer 默认 "推荐阅读"） */
  recommend: string
  /** ::: footer-cta 容器无 info 时的 title 兜底（renderer 默认 "关注我"） */
  footerCTATitle: string
  /** ::: colophon 左栏 kicker（renderer 默认 "下 期"） */
  colophonNextLabel: string
  /** ::: colophon 右栏 kicker（renderer 默认 "卷 · 期"） */
  colophonIssueLabel: string
  /** ::: masthead 容器无 info 时的 name 兜底（renderer 默认 "简报"） */
  mastheadName: string
}

/**
 * 主题不声明 kickers 时的兜底文案。
 * buildTheme 会在 opts.kickers 未提供时注入此常量；Partial 覆盖深合并。
 */
export const DEFAULT_KICKERS: ThemeKickers = {
  toc: '目录 · CONTENTS',
  qaBlock: '读者问答 · Q&A',
  editorNote: '编 者 按',
  methodology: '方法论',
  qrFollowKicker: 'SUBSCRIBE',
  qrFollowTitle: '订阅本刊',
  recommend: '推荐阅读',
  footerCTATitle: '关注我',
  colophonNextLabel: '下 期',
  colophonIssueLabel: '卷 · 期',
  mastheadName: '简报',
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
    'news-underline',
    'mook-tag',
  ] as const satisfies readonly AdmonitionVariantId[],
  quote: [
    'classic',
    'magazine-dropcap',
    'column-rule',
    'frame-brackets',
    'tilted-sticker',
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
    'seal-mark',
  ] as const satisfies readonly DividerVariantId[],
  sectionTitle: [
    'bordered',
    'cornered',
  ] as const satisfies readonly SectionTitleVariantId[],
  codeBlock: [
    'bare',
    'header-bar',
  ] as const satisfies readonly CodeBlockVariantId[],
  note: [
    'minimal-callout',
    'box-callout',
    'side-bar',
  ] as const satisfies readonly NoteVariantId[],
  footnotes: [
    'lined',
    'inline-flow',
  ] as const satisfies readonly FootnotesVariantId[],
}

export type VariantKind = keyof ThemeVariants

// Decorations: 声明式渲染层装饰规则。新增主题专属视觉签名必须通过 decorations
// 表达——共享层只实现"按声明执行"。颜色字段只接受 token 名（primary/accent），
// 不写 hex（换 palette 时自动跟随）。font-family 仅允许 monospace。

/** 装饰里允许引用的色 token 键（必须是 ThemeTokens.colors 的合法 key） */
export type PaletteColorKey =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'text'
  | 'textMuted'
  /**
   * 反白文字色（典型: 红底/黑底色块徽章上的白字）。
   * 加入动机: swiss-grid H2 红章徽章需要 color='textInverse' + backgroundColor='primary',
   * 否则只能 hardcode '#ffffff' 失去 token 流动。其它"色块徽章"主题也会受益。
   */
  | 'textInverse'

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
   * 分桶。
   *   - `roman`                → I/II/III…
   *   - `arabic`               → 1/2/3…
   *   - `arabic-padded`        → 01/02/03…
   *   - `arabic-section`       → `${h2}.${h3InH2}`（只对 level 3 有意义；每遇到
   *                              新的 h2 时 h3InH2 重置回 1）
   *   - `arabic-section-padded` → `01.1` / `01.2` …（h2 段号零填充两位）
   *   - `circled`              → ❶/❷/❸…⓴（Unicode 圆圈数字 1–20；>20 退化为
   *                              `(N)` 字符回退）。mook / 杂志感的章节签名常用此种。
   * 复合编号在 level 2 上等价于 arabic（h3InH2 退化为 0），不建议在 level 2 使用。
   */
  autoNumber?:
    | 'roman'
    | 'arabic'
    | 'arabic-padded'
    | 'arabic-section'
    | 'arabic-section-padded'
    | 'circled'
  /** 装饰样式（声明式 token 引用）。 */
  style: {
    color: PaletteColorKey
    /**
     * 装饰前缀的底色（token 引用）；声明则把编号渲染成"色块徽章"——
     * 典型例：swiss-grid 主题的 H2 「01」红方块前缀。
     * 缺省 = 不设底色（保持纯文字编号）。需与 paddingX / paddingY 搭配使用以撑开方块。
     */
    backgroundColor?: PaletteColorKey
    /**
     * 装饰前缀的左右内边距 px（仅 backgroundColor 声明时生效）；缺省 0。
     * 与 paddingY 一起拼成 `padding:${paddingY}px ${paddingX}px`，让色块徽章撑开数字。
     */
    paddingX?: number
    /**
     * 装饰前缀的上下内边距 px（仅 backgroundColor 声明时生效）；缺省 0。
     * 与 paddingX 配合形成方块徽章；典型值 paddingX=8, paddingY=2 复刻 Swiss-Grid「01」红章。
     */
    paddingY?: number
    /** 只允许 monospace（正文字体由系统决定）；缺省时继承标题字体 */
    fontFamily?: 'monospace'
    fontWeight?: 400 | 500 | 600 | 700
    /** 字号 px；缺省时继承标题字号 */
    fontSize?: number
    /** 字距 px；缺省 0 */
    letterSpacing?: number
    /** 与后续标题文字的间距 px；缺省 8（仅 display='inline' 生效） */
    marginRight?: number
    /** 是否在装饰前缀下方画一道短下划线（颜色取自 color 字段） */
    underline?: boolean
    /** underline=true 时下划线相对基线的下沉距离 px；缺省 2 */
    underlinePad?: number
    /**
     * 装饰 span 的显示模式：
     *   - `'inline'`（默认）→ `display:inline-block`，编号与标题文字同一行
     *   - `'block'`         → `display:block`，编号自成一行变成"kicker"，标题文字换行落到
     *                          下一行（mook / POPEYE / BRUTUS 系刊物风：`❶ 第一章` 上行
     *                          + 章节标题在下行）
     * 默认 'inline'，保持现有主题（data-brief / people-story）渲染一致。
     */
    display?: 'inline' | 'block'
    /**
     * `display='block'` 时编号 span 与下方标题文字的间距 px；缺省 6。
     * `display='inline'` 时忽略本字段（横向间距走 marginRight）。
     */
    marginBottom?: number
    /**
     * 装饰文字后缀（仅 autoNumber 生效；pattern 模式忽略）。
     * 支持两种占位符替换：
     *   - `{n}`  → autoNumber 输出值原样（如 'circled' 时是 "❶"、'arabic' 时是 "1"）
     *   - `{cn}` → 中文小写数字 一/二/三…二十（>20 退化为阿拉伯数字字符串）
     * 典型用法：`'  第{cn}章'` 与 `autoNumber:'circled'` 搭配,产出"❶  第一章"kicker。
     * 缺省 = 不追加后缀。
     */
    suffix?: string
  }
}

/**
 * 首段首字下沉装饰：渲染器扫 `::: intro` 块的首段首字符,拆成
 * `<span class="intro-dropcap">X</span>` + 余文。
 *
 * 为什么"扫前导标点 / 跳数字 / 拆首字符"逻辑无法纯声明：
 *   - 前导标点跳过规则（中英标点 / 开引号 / 各式括号）是 unicode 类目级别的判定
 *   - 阿拉伯数字不下沉是排版约定（数字下沉视觉很丑）
 *   - 首字符拆出后需要"前缀部分 + dropcap span + 余文"三段重组,触及 markdown-it
 *     的 Token 类内部细节
 * 这些逻辑被收口在 `markdown.ts:applyIntroDropcap` 的统一实现里, 主题作者只声明
 * "我要 dropcap, 用什么色 / 什么字号"。
 */
export interface IntroDropcapDecoration {
  /** dropcap 颜色（token 引用） */
  color: PaletteColorKey
  /** dropcap 字号 px；缺省 48 */
  fontSize?: number
  /** dropcap 字重；缺省 700 */
  fontWeight?: 400 | 500 | 600 | 700
  /** dropcap 与余文之间的右间距 px；缺省 8 */
  marginRight?: number
  /** dropcap 上内边距 px（与基线对齐微调）；缺省 4 */
  paddingTop?: number
}

export interface Decorations {
  /**
   * 标题前缀装饰。同一 level 可有多条，按声明顺序依次应用——通常一个主题给定
   * level 只声明一条；多条的语义是"同时叠加"（autoNumber + pattern 可同时存在，
   * 但通常没必要）。
   */
  headingPrefix?: readonly HeadingPrefixDecoration[]
  /** intro 首段首字下沉。声明则启用,样式参数由本结构提供。 */
  introDropcap?: IntroDropcapDecoration
}

/**
 * 运行时主题对象。**字段顺序仅作分组阅读用，不承载任何渲染语义**——
 * pipeline 按命名查表（renderer 读 theme.tokens / theme.elements.h2 / theme.containers.intro
 * 等），不依赖此处声明顺序。下方空行只为把"基础信息 / token / 样式 / 资产 / 模板 / 变体 /
 * kicker / 元数据"分组方便人眼阅读，不要把它误读成"渲染层级"。
 */
export interface Theme {
  id: string
  name: string
  description: string
  author: string
  preview: string

  tokens: ThemeTokens
  elements: ThemeElements
  containers: ThemeContainers
  /**
   * 容器内层元素样式槽位。renderer 通过 ContainerRenderContext.innerStyles 消费,
   * 不进 themeCSS 生成器（inline-style only, 公众号粘贴稳定）。详见 `ThemeInnerStyles` 注释。
   */
  innerStyles: ThemeInnerStyles
  assets: ThemeAssets
  templates: ThemeTemplates
  inline: ThemeInline
  /**
   * 骨架选择。主题不声明时由 buildTheme 填入 DEFAULT_VARIANTS。
   * 渲染器在 ContainerRenderContext.variants 里读取。
   */
  variants: ThemeVariants
  /**
   * 主题级 kicker 文案覆盖。主题不声明时由 buildTheme 填入 DEFAULT_KICKERS。
   * 渲染器在 ContainerRenderContext.kickers 里读取——优先级低于作者侧 info。
   */
  kickers: ThemeKickers
  /**
   * 参数化 SVG 资产工厂的形状变体。仅在 applyPalette（用户自定义配色）路径消费——
   * 此时 motifs AST 已固化在原主题上，重新生成 assets 时按此字段挑工厂。spec-first
   * 主路径（specToTheme）不消费该字段，因为 assets 直接由 motifs 渲染。
   *
   * 缺省时 applyPalette 回退到 `'geometric'`。
   */
  svgVariant?: SvgVariant
  /**
   * 声明式装饰规则。所有"主题专属视觉签名"（标题前缀编号 / kicker / 章节标记 /
   * intro 首字下沉……）一律走这里, 共享层只实现一次"按声明执行"。
   */
  decorations?: Decorations
  /**
   * 主题能力自描述。结构与 PersonaSpec.capabilities 同源，由 specToTheme 透传。
   * 仅供 API 查询与 LLM 推荐使用，pipeline 渲染不读此字段。
   */
  capabilities?: {
    containers?: readonly string[]
    variantOverrides?: Partial<ThemeVariants>
    excluded?: readonly string[]
  }
}

export class ThemeAuthoringError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ThemeAuthoringError'
  }
}
