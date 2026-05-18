/**
 * PersonaSpec：主题的 JSON-serializable ground truth。
 *
 * 设计意图（与 docs/design/personas/*.md 一致）：
 *   - 一份 spec → 三条投影路径（specToTheme / specToGallery / specToJsonSchema）
 *   - LLM 生成的内容就是这份 spec（而非 Theme 对象 / 手写 SVG 字符串）
 *   - gallery、运行时 Theme、校验器共享同一合同
 *
 * 所有字段 JSON-serializable：不接 function、不接 Symbol；motif 用 AST 描述。
 */

import type {
  AdmonitionVariantId,
  CSSObject,
  Decorations,
  SvgVariant,
  ThemeContainers,
  ThemeElements,
  ThemeInline,
  ThemeInnerStyles,
  ThemeKickers,
  ThemeTemplates,
  ThemeVariants,
} from '../../types'
import type { CSSObjectPatch, StylePatch } from '../buildTheme'

// ============================================================
// 色板 / 字号 / 间距 / 圆角
// ============================================================

export interface Palette {
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
  /**
   * `<pre>` 代码块底色（buildTheme 兜底消费）。不声明则用 '#2a2d32'。
   * 暗底主题想自定义代码块底色时声明此字段，避免整段 __reset elements.pre。
   */
  preBg?: string
  /** `<pre>` 代码块文字色。不声明则用 '#d8d8d4'。 */
  preText?: string
  // ── 以下为"语义槽"族（可选）：让主题作者把"高亮黄/图注灰/卡片底"这类
  //    复用色提升为 palette 字面值，让 theme-token-flow lint 不再视之为流失。
  //    它们不像 preBg/preText 那样由 buildTheme 自动转发——值要再次写到对应
  //    containers/inline 项上（保持显式），但出现在 palette 即建立"色板成员"
  //    凭证，使下游 lint 与未来的 applyPalette 都能识别它们是 token 而非裸 hex。
  /**
   * 图注 / 脚注 / 紧凑小字栏的正文色（介于 text 与 textMuted 之间）。
   * 例：swiss-grid 用 '#333333' 给 footnotes / note.research-dense body 一个"比 text 弱、比 textMuted 重"的灰。
   * 不声明 = 该主题没有这一层语义；正文小字直接走 textMuted 或 text。
   */
  textCaption?: string
  /**
   * 高亮（`==xx==` / highlight 容器）底色。
   * 例：default 的 Notion 米黄 '#fff4c8'；swiss-grid 的设计黄 '#ffeb3c'。
   * 不声明 = 主题不使用专属高亮底色（可走 bgSoft 或不渲染高亮底）。
   */
  highlightBg?: string
  /**
   * inline `<code>` 的底色（区别于 `code` 文字色）。
   * 例：life-aesthetic 暖米卡纸主题的 '#f3e4cc'。
   * 不声明 = 走 bgMuted 或不上底色。
   */
  codeBg?: string
  /**
   * quote-card 容器底色（pull-quote 与正文分层）。
   * 例：life-aesthetic 比 bg 更暖的 '#fffaf1'，让 quote-card 在卡纸底上微微"抬"出来。
   * 不声明 = 走 bgSoft 或保持透明。
   */
  quoteCardBg?: string
  /**
   * note 容器的边线 / 分隔线色（常用 dashed）。
   * 例：default '#c8ccd4'，比通用 border 略冷一档。
   * 不声明 = 走通用 border。
   */
  noteBorder?: string
  /**
   * note · side-bar variant 左侧标线**线型**。不声明 = 'solid'。
   *
   * 6 个共用 side-bar 的主题靠此字段差异化（同骨架不同笔触）：
   *   - solid（默认）: 中性补注
   *   - dashed: 工程/手记式
   *   - double: 公文/学术显眼
   *   - dotted: 慢调散文/夜间柔光
   */
  noteBorderStyle?: 'solid' | 'dashed' | 'double' | 'dotted'
  /**
   * note · side-bar variant 左侧标线**线宽**（px）。不声明 = 2。
   * 与 noteBorderStyle 协同：double 风格自动 ≥ 3px 才能看到双线。
   */
  noteBorderWidth?: number
}

export type StatusKey = 'tip' | 'info' | 'warning' | 'danger'

export interface StatusPair {
  accent: string
  soft: string
}

export type StatusPalette = Record<StatusKey, StatusPair>

export interface Typography {
  baseSize: number
  lineHeight: number
  h1Size: number
  h2Size: number
  h3Size: number
  letterSpacing: number
  /** 四级标题字号。默认 `baseSize + 1`（spec-to-theme 补值）。 */
  h4Size?: number
  /** 五级标题字号。默认 `baseSize`。 */
  h5Size?: number
  /** 六级标题字号。默认 `baseSize`。 */
  h6Size?: number
  /** 等宽字字号（inline `<code>` / `<table>`）。默认 14。 */
  monoSize?: number
  /** 图注 / `<kbd>` / 小注字号。默认 12。 */
  captionSize?: number
}

export interface Spacing {
  paragraph: number
  section: number
  listItem: number
  containerPadding: number
}

export interface RadiusScale {
  sm: number
  md: number
  lg: number
}

// ============================================================
// Motif AST
// ============================================================

/** SVG 仅允许的字体家族（公众号粘贴稳定性）。 */
export type MotifFontFamily = 'serif' | 'sans-serif' | 'monospace'

/**
 * motif 颜色字段接受的形式：
 *   - 裸 hex / CSS 颜色字符串：`'#5B6470'` / `'rgba(0,0,0,0.4)'`（与历史主题完全兼容）
 *   - **token 引用**：`'token:primary'` / `'token:textInverse'` 等——spec → Theme 投影时
 *     由 render-motif.resolveColor 替换为 tokens.colors[key] 的实际 hex。让"换 palette
 *     时 motif 颜色自动跟随"成为可能；推荐新主题统一用 token 引用而非裸 hex。
 *
 * 受 TypeScript 类型表达力所限，本类型仍标注为 `string`（无法精确表达"hex OR 'token:<known key>'"
 * 而不破坏 JSON-serializable 假设）。约束在 render-motif 运行时校验：未知 token key 抛 Error。
 *
 * 不支持嵌套路径（如 `'token:status.tip.accent'`）—— status 色按惯例不进 motif fill。
 */
export type MotifColor = string

export type MotifPrimitive =
  | {
      type: 'rect'
      x: number
      y: number
      w: number
      h: number
      fill?: string
      stroke?: string
      strokeWidth?: number
      rx?: number
      ry?: number
      opacity?: number
    }
  | {
      type: 'circle'
      cx: number
      cy: number
      r: number
      fill?: string
      stroke?: string
      strokeWidth?: number
      opacity?: number
    }
  | {
      type: 'path'
      d: string
      fill?: string
      stroke?: string
      strokeWidth?: number
      strokeLinecap?: 'butt' | 'round' | 'square'
      strokeLinejoin?: 'miter' | 'round' | 'bevel'
      strokeDasharray?: string
      opacity?: number
    }
  | {
      type: 'text'
      x: number
      y: number
      content: string
      fontSize: number
      fontFamily?: MotifFontFamily
      fontWeight?: number | 'bold' | 'normal'
      fill?: string
      textAnchor?: 'start' | 'middle' | 'end'
      dominantBaseline?: 'auto' | 'middle' | 'central' | 'hanging' | 'alphabetic'
      letterSpacing?: number
      opacity?: number
    }
  | {
      type: 'line'
      x1: number
      y1: number
      x2: number
      y2: number
      stroke: string
      strokeWidth: number
      strokeLinecap?: 'butt' | 'round' | 'square'
      strokeDasharray?: string
      opacity?: number
    }
  | {
      type: 'ellipse'
      cx: number
      cy: number
      rx: number
      ry: number
      fill?: string
      stroke?: string
      strokeWidth?: number
      opacity?: number
    }
  | {
      type: 'group'
      /**
       * `transform="..."` 字符串。SVG 标准语法：
       *   `translate(X Y)` / `rotate(A)` / `scale(S)` / 复合 `translate(X Y) rotate(A)`
       * 保留原始字符串而非结构化分解，因为 SVG transform 的组合语义比结构化字段更精确。
       */
      transform: string
      children: MotifPrimitive[]
      opacity?: number
    }

export type ViewBox = readonly [number, number, number, number]

/**
 * SVG `<svg>` 标签的 inline style 语义子集。
 *
 * 为什么这么窄：prefix-type 图标（h2Prefix、tipIcon 等）需要 `display:inline-block`
 * + `vertical-align` + `margin-right` 才能贴在标题/段落里不顶格。全部内置主题实测
 * 用到的样式就这 4 个属性；数值 `margin-*` 单位默认 px。
 *
 * 块级装饰（divider、quoteMark）通常不需要此字段。
 */
export interface SvgInlineStyle {
  display?: 'inline-block' | 'block' | 'inline'
  verticalAlign?: 'baseline' | 'middle' | 'top' | 'bottom'
  /** px，整数 */
  marginRight?: number
  /** px，整数 */
  marginLeft?: number
}

/** 单个 motif：viewBox + primitives，无占位符。 */
export interface MotifShape {
  viewBox: ViewBox
  /**
   * 显式像素宽度，嵌入到 `<svg width="...">`。
   * 省略则不输出 width 属性（浏览器按 viewBox 比例推断）。
   */
  width?: number
  /** 显式像素高度，嵌入到 `<svg height="...">`。省略则不输出。 */
  height?: number
  /**
   * `<svg style="...">` 内联样式。仅用 SvgInlineStyle 列出的语义字段，
   * 避免让 spec 变成可夹带任意 CSS 的后门。
   */
  inlineStyle?: SvgInlineStyle
  primitives: MotifPrimitive[]
}

/**
 * 带占位符的模板 motif（stepBadge `{N}`、issueStamp `{issue}` `{date}` `{kind}`）。
 * primitives 里 text 的 content 或任意 string 字段出现 `{name}` 会被运行时替换。
 */
export interface MotifTemplate {
  viewBox: ViewBox
  /** 同 MotifShape.width */
  width?: number
  /** 同 MotifShape.height */
  height?: number
  /** 同 MotifShape.inlineStyle */
  inlineStyle?: SvgInlineStyle
  primitives: MotifPrimitive[]
  /** 声明该模板消费的占位符名列表；validateSpec 会校验 primitives 里只用这些占位符。 */
  placeholders: readonly string[]
}

/**
 * 一套 motif 集合，对齐 ThemeAssets 的 key 集。
 * 所有字段可选：主题可以故意"不导出某个 motif"（如 default 不导出 quoteMark）。
 */
export interface MotifSpec {
  h2Prefix?: MotifShape
  h3Prefix?: MotifShape
  dividerFlower?: MotifShape
  dividerWave?: MotifShape
  dividerDots?: MotifShape
  quoteMark?: MotifShape
  listBullet?: MotifShape
  sectionCorner?: MotifShape
  tipIcon?: MotifShape
  warningIcon?: MotifShape
  infoIcon?: MotifShape
  dangerIcon?: MotifShape
  noteIcon?: MotifShape
  copyIcon?: MotifShape
  externalLinkIcon?: MotifShape
  terminalPrompt?: MotifShape
  sealMark?: MotifShape
  /** 模板：`{N}` 占位 step 序号 */
  stepBadge?: MotifTemplate
  /** 模板：`{issue}` `{date}` `{kind}` 占位 */
  issueStamp?: MotifTemplate
  /**
   * 1200×630 封面占位 SVG（og:image / 公众号图文封面尺寸）。
   *
   * 不参与 ThemeAssets 投影——它是给外部消费方的静态资产（CDN 拉取后做光栅或
   * 作为 fallback 封面）。scripts/build-cover-placeholders.ts 读取并写到
   * dist/api/covers/<personaId>.svg；capabilities.json 派生 coverUriPattern。
   *
   * viewBox 必须 [0, 0, 1200, 630]（与 og:image 1.91:1 一致）。
   */
  coverPlaceholder?: MotifShape
}

// ============================================================
// 签名容器清单（LLM 组合判定用）
// ============================================================

/**
 * 项目已登记的"签名容器"。每个主题在 PersonaSpec.signatureContainers 里列出
 * 该主题必须具备（渲染层有对应实现）的容器 id。
 *
 * 设计纪律：本数组**派生自** vocabulary.STYLED_CONTAINERS（SSoT）——由
 * `scripts/codegen-sig-containers.ts` 写入 `./signature-containers.generated.ts`。
 * 改 vocabulary 后须 `pnpm codegen:sigcontainers` 重新生成；CI build 步骤以
 * `--check` 模式守护两者同步，不同则失败。
 *
 * 新增 styled 容器流程：
 *   1. vocabulary.ts 追加 ContainerSpec（styleKey 非 null）
 *   2. 跑 `pnpm codegen:sigcontainers` 重新派生本清单
 *   3. buildTheme.baseContainers + ThemeContainers 类型字段一致
 */
import {
  SUPPORTED_SIGNATURE_CONTAINERS,
  type SignatureContainerId,
} from './signature-containers.generated'
export { SUPPORTED_SIGNATURE_CONTAINERS, type SignatureContainerId }

/**
 * 主题能力自描述（PersonaSpec.capabilities）。
 *
 * 这是"主题对 API/LLM 查询的显式回答"：我支持哪些容器 / 我推荐哪些 variant / 我排除哪些容器。
 * 未声明任何字段时全部走默认兜底（getThemeCapabilities 把它派生为"base + pack:* + 本主题 theme:* 全集"）。
 *
 * 字段值是 fence 名（kebab，如 'quote-card'），与 vocabulary 的 ContainerSpec.name 一致；
 * variant 名是 VariantDef.meta.id。
 */
export interface ThemeCapabilities {
  /** 本主题启用的容器 fence 名白名单；未声明 = 全集兜底 */
  containers?: readonly string[]
  /**
   * 在 spec.variants 默认骨架之外的额外建议 variant（按 slot 部分指定）。
   * 例：`{ admonition: 'terminal' }` 表示"如果作者本想换 admonition 骨架，推荐 terminal"——
   * getRecommendedVariantsFor 把这些 hint 加在 themeCompat 反向索引的最前面。
   */
  variantOverrides?: Partial<ThemeVariants>
  /** 显式排除：即便兜底集里有也不推荐（如 default 主题排除 tilted-sticker） */
  excluded?: readonly string[]
}

// ============================================================
// PersonaSpec 主类型
// ============================================================

/**
 * 主题"人设"的完整合同。persona.data.ts 文件导出一份 PersonaSpec，
 * 由 specToTheme(spec) 投影为运行时 Theme。
 */
export interface PersonaSpec {
  /** id（kebab-case），与文件目录名一致 */
  id: string
  /** 中文主题名 */
  name: string
  /** 一句自然语言定位 —— LLM 识别选型信号 */
  description: string
  /** 受众标签 —— 如 "技术布道" / "人文非虚构" / "内参 newsletter" */
  audience: string
  /** 色板 ground truth（唯一来源） */
  palette: Palette
  /** 语义四色：tip/info/warning/danger */
  status: StatusPalette
  typography: Typography
  spacing: Spacing
  radius: RadiusScale
  /** SVG 装饰 —— JSON AST，由 primitivesToSvg 在 specToTheme / gallery 共用 */
  motifs: MotifSpec
  /** 骨架变体选择（ThemeVariants 同构） */
  variants: ThemeVariants
  /**
   * Renderer 默认 kicker 文案的主题级覆盖（Partial<ThemeKickers>）。
   *
   * 声明的 key 会覆盖 DEFAULT_KICKERS 同名 key，作者侧 markdown 不写 info 即可拿到主题母语 kicker。
   * 作者随时可单稿覆盖：`::: qa-block 这次特别 kicker q="..."` 仍走 info 优先。
   * 详见 `ThemeKickers` 注释（src/core/themes/types.ts）。
   */
  kickers?: Partial<ThemeKickers>
  /**
   * 参数化 SVG 资产工厂的形状变体。spec-first 主路径不消费此字段（assets 由 motifs
   * 直接渲染）；它的唯一作用是给 applyPalette 在用户自定义配色路径上提供 fallback 工厂。
   * 缺省时 applyPalette 回退到 `'geometric'`。
   */
  svgVariant?: SvgVariant
  /**
   * 基线主题（`'light'` 默认 / `'dark'` opt-in）。
   *
   * 切到 `'dark'` 时 buildTheme 用 hairline 边 + 透明底 + 直角作为"卡片型容器"兜底,
   * 暗底主题作者免去把每个软底容器都写一遍 `__reset: true`。仅当 palette.bg 为深色时
   * 才该用 `'dark'`；浅底主题留空即可。详见 ThemeTokens.baseTheme 与 BuildThemeOptions.baseTheme。
   */
  baseTheme?: 'light' | 'dark'
  /**
   * 声明式装饰规则。所有"主题专属视觉签名"（标题前缀编号 / intro 首字下沉……）一律走这里,
   * 共享层一次性实现"按声明执行"——不要在 markdown.ts 加 if 分支。
   */
  decorations?: Decorations
  /**
   * 该主题必须具备的签名容器 id 清单；conformance 测试按此核对"声称 vs 实现"。
   * 不声明则默认空数组（只用通用容器）。
   */
  signatureContainers?: readonly SignatureContainerId[]
  /**
   * 作者侧允许在 markdown 中 per-callout 覆盖的 admonition variant 白名单。
   *
   * 用法：作者写 `::: tip 要点 variant=pill-tag` 时，`pill-tag` 必须在此列表中，否则
   * `theme-admonition-overrides.spec.ts` 报错。本字段不声明 = 不允许任何 override，
   * 想用主题默认 variant 直接 `::: tip 要点` 即可。
   *
   * 设计动机：之前 sample 在 callout 上随手写 `variant=card-shadow`、`variant=ticket-notch`
   * 等 spec 未声明的 id，遮蔽了主题签名 variant；此白名单让 override 必须显式登记，
   * 而非"任意 admonition variant 都能临时拿来用"。其它 slot（quote/compare/...）暂不开放
   * per-callout override 路径。
   */
  admonitionOverrides?: readonly AdmonitionVariantId[]
  /**
   * 主题能力自描述（**可选**，默认 = 全集兜底）。
   *
   * 决定 LLM / 写作集成方在本主题下"该推荐什么容器、什么 variant"——比 signatureContainers
   * 更宽（containers 涵盖未签名但本主题愿意渲染的容器）、比 ThemeContainers 字段更窄
   * （excluded 让主题显式排除某些"理论上能用但本主题不希望出现"的容器）。
   *
   * 字段语义：
   *   - `containers`        声明本主题启用的容器 fence 名白名单（kebab）。未声明 = 兜底
   *                         全集（base + pack:* + 自家 theme:<id>）。
   *   - `variantOverrides`  额外建议 variant 选择（除已在 spec.variants 声明的之外的 hint），
   *                         给"我推荐用这个，但不强制改全局默认"用——getRecommendedVariantsFor
   *                         会读此字段。
   *   - `excluded`          显式排除容器（即便在白名单 / 兜底集里也不曝光给 LLM 推荐）。
   *
   * 仅供 API 查询与推荐使用——pipeline 渲染**不读**本字段（与 isContainerEnabledForTheme
   * 的 namespace 判定平行；想要"渲染期硬阻断"未来由独立 strict-mode 开关承担）。
   */
  capabilities?: ThemeCapabilities
  /**
   * 模板片段（封面卡 / 作者栏 / CTA / 推荐 / tip / compare / steps）。
   * 仅用于 markdown 层的示例片段，不影响 CSS 生成。
   */
  templates?: Partial<ThemeTemplates>
  /**
   * 元素/容器/内联/内层子元素的样式补丁（深合并；支持 `__reset: true` sentinel）。
   * 这是"主题作者 voice"无法从 palette/typography 派生的 CSS 细节承载点，
   * 与 BuildThemeOptions.elements/containers/inline/innerStyles 一一对应。
   *
   * innerStyles 用法：覆盖 signature 容器内层子元素的 inline style（如 key-number
   * 数字字号、abstract kicker 颜色、see-also 标题字距）。详见 `ThemeInnerStyles` 注释。
   */
  elements?: StylePatch<ThemeElements>
  containers?: StylePatch<ThemeContainers>
  innerStyles?: StylePatch<ThemeInnerStyles>
  inline?: StylePatch<ThemeInline>
  /** 元数据（LLM 不负责写，作者签名由此落） */
  meta: {
    createdAt: string
    ownerNotes?: string
  }
}

// ============================================================
// 校验结果（WtError 统一形状；createPersona / validatePersona 共用）
// ============================================================

import type { WtError } from '../../../errors'

export interface SpecValidationResult {
  ok: boolean
  errors: WtError[]
  warnings: WtError[]
}

// Re-export helper types for external consumers
export type { CSSObject, CSSObjectPatch, StylePatch }
