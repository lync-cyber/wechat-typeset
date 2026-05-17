/**
 * 统一 Variant 注册表契约（VariantDef 目标形状）
 *
 * 一个 variant = 一个目录下的单文件，default-export 一个 `VariantDef`：
 *   - meta：id / kind / 中文短名 / 描述 / themeCompat
 *   - thumbnail：75×75 inline SVG 工厂（接 ThumbArgs）
 *   - snippets：该 variant 对外产出的"预设"条目（同一 variant 可有多条：
 *     不同 kind / 不同文案 / 不同 thumbArgs），组件库 UI 聚合时摊平
 *   - render：容器渲染逻辑（kind='none' 的自由组件 render 可省略）
 *
 * codeBlock variant 的 render 签名异质（theme, args）；保留独立 CodeBlockDef
 *   类型避免在 VariantDef 里塞断言/any。参见 codeBlock/_shared 的设计注释。
 */

import type { ContainerRenderContext } from '../pipeline/containers/types'
import type { Theme, VariantKind } from '../themes/types'
import type { ThumbArgs } from './_thumb'

// ─────────────────────────────────────────────────────────────
// 通用产物：render 四段契约（承接旧 VariantRenderResult）
// ─────────────────────────────────────────────────────────────

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
  /**
   * 抑制 renderer 默认注入的 icon（来自 title.iconKey）。
   * 用于"标题本体是实色徽章/胶囊，icon 与底色同色不可见反而占位"的场景——典型如
   * admonition.pill-tag：accent 底胶囊上的同色 icon 不可见，却把文字向右挤偏。
   * undefined / false = 沿用默认（注入 ctx.assets[iconKey]）；true = 不渲染 icon。
   */
  suppressIcon?: boolean
  /**
   * quote-card 容器在 body 关闭后、byline 前注入的 HTML 片段。仅 quote.ts 消费,
   * 其余容器忽略。给"开/闭引号成对"的 variant 一个挂载点——典型如 classic 在 svgSlot
   * 输出 `「`、在 closeSlot 输出对称的 `」`，闭合成对。undefined = 不注入。
   */
  closeSlot?: string
  /**
   * quote-card byline 行 inline style。仅 quote.ts 消费,其余容器忽略。
   * undefined = 走默认（居中 textMuted 13px）;非空 = 变体自定义。
   * 给印刷体 pull-quote / editorial 风格变体一个手柄,让 byline 字号/字距/对齐能跟主视一致。
   */
  bylineCSS?: string
  /**
   * quote-card byline 前缀字符。仅 quote.ts 消费。
   * undefined = 走默认 "— "（U+2014 + 空格）。常见替换:"—— "(中文双破折号) / ""(无前缀)。
   */
  bylinePrefix?: string
}

export type AdmonitionKind = 'tip' | 'warning' | 'info' | 'danger'

export interface AdmonitionRenderArgs {
  kind: AdmonitionKind
}

export interface CompareRenderArgs {
  slot: 'wrapper' | 'pros' | 'cons'
  title?: string
}

export interface CodeBlockRenderArgs {
  /** 已识别的语言 id（'javascript' / 'python' / ''），空串 = 无法识别或未指定 */
  language: string
  /** hljs 产出的 <code> 内层 HTML（已 escape，已 span 着色） */
  codeInnerHtml: string
}

export type VariantRender<Args = void> = Args extends void
  ? (ctx: ContainerRenderContext) => VariantRenderResult
  : (ctx: ContainerRenderContext, args: Args) => VariantRenderResult

export type CodeBlockRender = (theme: Theme, args: CodeBlockRenderArgs) => string

// ─────────────────────────────────────────────────────────────
// VariantMeta / VariantSnippet / VariantDef
// ─────────────────────────────────────────────────────────────

/** 预设条目（派生 BUILTIN_COMPONENTS 的原子）。 */
export interface VariantSnippet {
  /** 全局稳定 id（如 'ad-tip-accent-bar'） */
  presetId: string
  /** UI 展示短名 */
  name: string
  /** 一句话描述（≤30 字） */
  description: string
  /** admonition kind；非 admonition 忽略 */
  admonitionKind?: AdmonitionKind
  /**
   * 缩略图调色覆盖。不同 kind / 不同主题想要的缩略图配色通常不同，
   * 走这里避免每个 snippet 重复写完整 thumbnail 函数。
   */
  thumbArgs?: ThumbArgs
  /** 可直接插入编辑器的 markdown fence（自带末尾 \n） */
  markdown: string
  /**
   * 预设级主题推荐（覆盖 meta.themeCompat）。部分 snippet 只推荐某主题
   * （如 terminal info 专推 tech-geek），细分粒度到条目。
   */
  themeCompat?: readonly string[]
}

export interface VariantMeta {
  /** 全局唯一 id（如 'accent-bar' / 'terminal' / 'column-card'） */
  id: string
  /** 所属分类（决定 renderer 分派与 UI tab） */
  kind: VariantKind | 'none'
  /** UI 展示短名（中文，给组件库 UI） */
  name: string
  /** ≤30 字说明 */
  description: string
  /** 推荐主题 id 列表；空/缺省等价于全兼容 */
  themeCompat?: readonly string[]
  /**
   * 实验性变体：当前无任何主题以默认骨架使用、也无 themeCompat 关联。
   * 出现在 VARIANT_IDS 主表里是为了"骨架已就绪、等首个采用方"；
   * `getRecommendedVariantsFor` 会把它们排到列表末尾且不算"推荐"。
   *
   * conformance: 每个 VARIANT_IDS 成员必须满足 "≥1 主题采用" OR "experimental === true"。
   * 移除流程：让某主题把它升级为默认骨架，或加入该主题的 themeCompat → 删 experimental 标。
   */
  experimental?: boolean
}

/**
 * 用户态变体 token 字段元数据。
 *
 * 一个 variant 想暴露给用户调的字段（颜色 / 字号 / 边距等），声明一条 TokenField；
 * UI（TokensPanel）按 type 渲染对应控件，用户填写后写回 UserVariantTokens.tokens。
 * variant render() 在 CSS 字符串里用 `var(--uv-<key>, <fallback>)` 占位，由
 * applyUserVariant 在 wrapperCSS 末尾注入 `--uv-<key>: <value>`。
 *
 * 与 VariantMeta 解耦：tokenSchema 是 variant 文件 default-export 之外的命名导出
 * （`export const tokenSchema`），让"未 token 化的 variant"零侵入，渐进迁移。
 *
 * 取值口径：
 *   - color：合法 CSS 颜色字符串（#rrggbb / rgba(...) / 命名色）
 *   - size：长度值（"16px" / "1.2em" / "12px 18px"），简单透传
 *   - text：任意字符串（罕用，先留口）
 *
 * 不在此处校验：lintInlineCSS 在保存期统一兜（步骤 1 已就绪）。
 */
export type TokenFieldType = 'color' | 'size' | 'text'

export interface TokenField {
  /** 字段类型，决定 UI 控件 */
  type: TokenFieldType
  /** UI 展示短标签（中文） */
  label: string
  /** 默认值——variant render() 里 `var(--uv-<key>, <default>)` 的 fallback 段必须用同一值 */
  default: string
  /** 可选：≤30 字辅助说明 */
  hint?: string
}

/**
 * 一个 variant 的 token schema：key → TokenField。
 * key 是 CSS 自定义属性名片段（kebab-case 友好，不要包含 `--` 前缀，由 injectTokens 补）。
 * 例：'quote-color' → 渲染到 DOM 为 `--uv-quote-color`。
 */
export type TokenSchema = Readonly<Record<string, TokenField>>

/**
 * 标准容器 variant（kind ∈ admonition/quote/compare/steps/divider/sectionTitle/none）。
 * kind='none' 表示自由组件（intro/author/cover 等），render 可省略。
 */
export interface VariantDef<Args = void> {
  meta: VariantMeta
  /** 75×75 缩略图工厂。接 ThumbArgs 返回 inline SVG 字符串。 */
  thumbnail: (args?: ThumbArgs) => string
  /** 该 variant 在组件库里曝光的预设条目（≥1 条）。 */
  snippets: ReadonlyArray<VariantSnippet>
  /** 容器渲染函数；kind='none' 的自由组件可省略。 */
  render?: VariantRender<Args>
  /**
   * 可选：暴露给用户调的命名 token。命名导出（`export const tokenSchema`）+ default
   * export 上挂同一引用，让外部既能 `import { tokenSchema } from '<id>.ts'` 拿单文件
   * schema，也能从 VariantDef 实例上读到。无 schema 的 variant 不参与 L1 tokens 面板。
   */
  tokenSchema?: TokenSchema
}

/**
 * codeBlock 独立类型：render 签名为 (theme, args)，与容器栈无关。
 * 为什么不统一进 VariantDef<CodeBlockRenderArgs>：render 第一个参数不是 ctx，
 * 强行统一会引入断言。见旧 registry.ts 设计注释。
 */
export interface CodeBlockDef {
  meta: VariantMeta & { kind: 'codeBlock' }
  thumbnail?: (args?: ThumbArgs) => string
  snippets: ReadonlyArray<VariantSnippet>
  render: CodeBlockRender
  /** 与 VariantDef.tokenSchema 同语义；codeBlock 当前未启用，留口让形态对齐。 */
  tokenSchema?: TokenSchema
}

// ─────────────────────────────────────────────────────────────
// 工具：variant 作者 helper
// ─────────────────────────────────────────────────────────────

/** 过滤空值后用 `;` 拼接。 */
export function joinCss(entries: ReadonlyArray<string | false | null | undefined>): string {
  return entries.filter(Boolean).join(';')
}

/** wrapperCSS 400 字符硬上限；超限在开发阶段直接 throw。 */
export function assertVariantCSSLength(path: string, css: string): void {
  if (css.length > 400) {
    throw new Error(
      `[variant] ${path} 的 wrapperCSS 长度 ${css.length} > 400（软约束）。` +
        '拆分样式或将装饰移到 svgSlot。',
    )
  }
}
