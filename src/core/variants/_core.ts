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
