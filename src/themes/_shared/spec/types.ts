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
  CSSObject,
  ThemeBehavior,
  ThemeContainers,
  ThemeElements,
  ThemeInline,
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
 * + `vertical-align` + `margin-right` 才能贴在标题/段落里不顶格。9 套主题实测用到的
 * 样式就这 4 个属性；数值 `margin-*` 单位默认 px。
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
}

// ============================================================
// 签名容器清单（LLM 组合判定用）
// ============================================================

/**
 * 项目已登记的"签名容器"。每个主题在 PersonaSpec.signatureContainers 里列出
 * 该主题必须具备（渲染层有对应实现）的容器 id。Phase 4 conformance 会校验：
 * 每个 signatureContainer 要么在 baseContainers / variants 里有实现，要么在
 * Phase 5 中补全（free 组件 / admonition variant / template）。
 *
 * 超出此清单的 id 判作 spec 错误；添加新容器需同步扩展这里。
 */
export const SUPPORTED_SIGNATURE_CONTAINERS = [
  'intro',
  'author',
  'cover',
  'tip',
  'warning',
  'info',
  'danger',
  'note',
  'quoteCard',
  'highlight',
  'compare',
  'steps',
  'sectionTitle',
  'footerCTA',
  'recommend',
  'qrcode',
  'mpvoice',
  'mpvideo',
  // Phase 5 候选（plan §Phase 5）
  'abstract',
  'algorithm',
  'keyNumber',
  'seeAlso',
  'seal',
  'prelude',
] as const

export type SignatureContainerId = (typeof SUPPORTED_SIGNATURE_CONTAINERS)[number]

// ============================================================
// PersonaSpec 主类型
// ============================================================

/**
 * 主题"人设"的完整合同。persona.spec.ts 文件导出一份 PersonaSpec，
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
  /** 渲染器行为开关（如 people-story 的 dropcap / 罗马数字） */
  behavior?: ThemeBehavior
  /**
   * 该主题必须具备的签名容器 id 清单；conformance 测试按此核对"声称 vs 实现"。
   * 不声明则默认空数组（只用通用容器）。
   */
  signatureContainers?: readonly SignatureContainerId[]
  /**
   * 模板片段（封面卡 / 作者栏 / CTA / 推荐 / tip / compare / steps）。
   * 仅用于 markdown 层的示例片段，不影响 CSS 生成。
   */
  templates?: Partial<ThemeTemplates>
  /**
   * 元素/容器/内联的样式补丁（深合并；支持 `__reset: true` sentinel）。
   * 这是"主题作者 voice"无法从 palette/typography 派生的 CSS 细节承载点，
   * 与 BuildThemeOptions.elements/containers/inline 一一对应。
   */
  elements?: StylePatch<ThemeElements>
  containers?: StylePatch<ThemeContainers>
  inline?: StylePatch<ThemeInline>
  /** 元数据（LLM 不负责写，作者签名由此落） */
  meta: {
    createdAt: string
    ownerNotes?: string
  }
}

// ============================================================
// 校验结果
// ============================================================

export interface SpecValidationIssue {
  path: string
  message: string
  severity: 'error' | 'warning'
}

export interface SpecValidationResult {
  ok: boolean
  errors: SpecValidationIssue[]
  warnings: SpecValidationIssue[]
}

// Re-export helper types for external consumers
export type { CSSObject, CSSObjectPatch, StylePatch }
