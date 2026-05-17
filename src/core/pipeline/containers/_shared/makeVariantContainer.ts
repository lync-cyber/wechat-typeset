/**
 * makeVariantContainer —— variant 容器渲染器工厂。
 *
 * 收口 6 个容器（admonitions × 4 / note / pros / cons / steps / divider）共同的
 *"resolve variant → 套外壳"样板：
 *
 *   1. 决定 variantId：attrs.variant > theme.variants[slot] > fallbackId
 *      （divider 多一层 'line'→'rule' 这类 alias，通过 resolveAlias 注入）
 *   2. 调 table[id].render(ctx, args?) 拿 { wrapperCSS, titleCSS?, bodyCSS?, svgSlot? }
 *   3. open 输出：
 *        <section class="container-{name} container-{name}--{id}" style="{wrapperCSS}">
 *        {svgSlot?}                                         // 兄弟节点位置
 *        {title section?}                                   // 见下条
 *        {body wrapper open?}                               // bodyCSS truthy 才包
 *   4. close 输出：</section>（如有 body wrapper）+ </section>
 *
 * 标题渲染逻辑（统一谓词）：
 *
 *   willEmitTitle =
 *      (ctx.info.trim() OR title.defaultText)    // 文本不为空
 *      AND  result.titleCSS !== ''               // variant 未通过空串暗号请求 suppress
 *
 *   这同时表达两类既有行为：
 *     - admonition / note / pros / cons：defaultText 存在 → 总有文本 → 仅看 titleCSS===''
 *     - steps：defaultText 缺省 → 仅 info 非空才有文本 → 同样还要看 titleCSS===''
 *
 *   titleCSS === '' 是 variant SPI 的暗号契约（terminal / ledger-cell / news-row 等 8 处使用）：
 *     "我自己在 svgSlot 里画了标题，请 renderer 跳过默认 title 行。" 不可省略。
 *
 * 不收口的容器（按设计审查留手写）：
 *   - quote-card：always-body + byline-on-close，形态独特
 *   - compareContainer：wrapper-only，简到工厂套用反而冗余
 *   - section-title：svgSlot 嵌入 label 内部，与"svgSlot 作为兄弟节点"形态不同
 *   - highlight：无 variant 系
 *   - intro / cover / author：根本不接 variant SPI
 */

import type { ContainerRenderer, ContainerRenderContext } from '../types'
import type { ThemeAssets, ThemeVariants } from '../../../themes/types'
import type { VariantMeta, VariantRenderResult } from '../../../variants/_core'
import { escText } from './escape'
import { checkVariantCompat } from './themeCompatGuard'

// ─────────────────────────────────────────────────────────────
// 工厂入参契约
// ─────────────────────────────────────────────────────────────

export interface VariantContainerTitleOptions {
  /**
   * info 为空时的兜底文本（如 admonition 的 '小贴士'）。省略 = 无 fallback，info 为空就不渲染标题。
   * 支持函数形式以读 ctx.kickers / ctx.tokens 等（如 recommend 走 ctx.kickers.recommend）。
   */
  defaultText?: string | ((ctx: ContainerRenderContext) => string)
  /** result.titleCSS undefined 时使用的兜底 CSS。**空串保留 SPI 暗号语义**——不要传空串。 */
  defaultCSS: string | ((ctx: ContainerRenderContext) => string)
  /** 从 ctx.assets 取 icon HTML，前置在标题文本之前（HTML 不转义）。 */
  iconKey?: keyof ThemeAssets
}

export interface VariantContainerBodyOptions {
  /** 目前仅支持 optional（bodyCSS truthy 才包 body section）。always 模式留给 quote-card 这类，保持手写。 */
  mode: 'optional'
}

/** table 条目最小契约。variant 注册表里实际类型更宽，工厂读 render + meta（用于 themeCompat 校验）。 */
type VariantTableEntry<Args> = {
  meta?: VariantMeta
  render?: Args extends void
    ? (ctx: ContainerRenderContext) => VariantRenderResult
    : (ctx: ContainerRenderContext, args: Args) => VariantRenderResult
}

export interface VariantContainerOptions<Args = void> {
  /** markdown fence 名 / className 主名（如 'tip' / 'note' / 'pros' / 'steps' / 'divider'）。 */
  name: string
  /** theme.variants 的字段名（如 'admonition' / 'note' / 'compare'）。 */
  themeSlot: keyof ThemeVariants
  /** variant 注册表（如 ADMONITION_VARIANTS）。 */
  table: Record<string, VariantTableEntry<Args>>
  /** 表未命中、theme 未声明时的兜底 id。 */
  fallbackId: string
  /**
   * attrs.variant 别名归一化（如 divider 的 'line'→'rule'）。
   * 入参为 attrs.variant.toLowerCase().trim()；返回 undefined = 继续按原值查表。
   */
  resolveAlias?: (raw: string) => string | undefined
  /**
   * 渲染参数注入（admonition 的 {kind}、compare-column 的 {slot}）。
   * 省略 = 无参 render。Args 类型由调用方推导。
   */
  args?: (ctx: ContainerRenderContext) => Args
  /** 标题行配置。省略 = 不渲染标题（divider 用此分支）。 */
  title?: VariantContainerTitleOptions
  /** Body wrapper 配置。省略 = 不渲染 body section（compare/steps/divider 用此分支）。 */
  body?: VariantContainerBodyOptions
}

// ─────────────────────────────────────────────────────────────
// 工厂主体
// ─────────────────────────────────────────────────────────────

export function makeVariantContainer<Args = void>(
  opts: VariantContainerOptions<Args>,
): ContainerRenderer {
  const { name, themeSlot, table, fallbackId, resolveAlias, args, title, body } = opts

  /**
   * open / close 共用。render 是纯函数，两次调用产物一致。
   * 不在 open 时把 result 缓存到 ctx：open 与 close 之间可能嵌套子容器，
   * per-open 缓存挂在共享 ctx 上会被嵌套覆盖，重新调用 render（O(1)）更稳。
   *
   * 4 级优先级：L1 attrs.variant > L2 pageVariants[slot] > L3 theme.variants[slot] > L4 fallbackId。
   * 非法 L1 回退到 L2/L3/L4，非法 L2 回退到 L3/L4；每层按 table.keys 做合法性确认。
   */
  function resolveVariant(ctx: ContainerRenderContext): {
    id: string
    result: VariantRenderResult
  } {
    const pageId = (ctx.pageVariants?.[themeSlot] as string | undefined)
    const themeId = (ctx.variants[themeSlot] as string | undefined)
    const pageValid = pageId && pageId in table ? pageId : undefined
    const themeValid = themeId && themeId in table ? themeId : undefined

    let id = fallbackId
    let isAuthorOverride = false
    const rawOverride = ctx.attrs.variant
    if (rawOverride) {
      const normalized = rawOverride.toLowerCase().trim()
      const aliased = resolveAlias?.(normalized)
      const candidate = aliased ?? rawOverride
      if (candidate in table) {
        id = candidate
        isAuthorOverride = true
      } else {
        id = pageValid ?? themeValid ?? fallbackId
      }
    } else {
      id = pageValid ?? themeValid ?? fallbackId
    }

    let entry = table[id] ?? table[fallbackId]
    // 仅对作者级 override 做 themeCompat 校验：
    // 主题作者声明的默认 variant（spec.variants）+ fallbackId 都是被信任的合理选择。
    if (isAuthorOverride && entry) {
      const compat = checkVariantCompat(ctx.themeId, entry.meta)
      if (!compat.ok) {
        id = themeValid ?? fallbackId
        entry = table[id] ?? table[fallbackId]
      }
    }

    // entry.render 在调用方语境下必定存在（kind='none' 的 variant 不会进 variant 容器）；
    // 类型上 render 是 optional 是为了让 _all.ts 聚合器能同时容纳 kind='none' 的 free 组件。
    const result = (entry.render as (
      ctx: ContainerRenderContext,
      args?: Args,
    ) => VariantRenderResult)(ctx, args?.(ctx))
    return { id, result }
  }

  return {
    open: (ctx) => {
      const { id, result } = resolveVariant(ctx)

      // 标题文本：info 优先，否则用 fallback（支持函数形式读 ctx）。
      // 无 fallback 且 info 为空 → 空串（后续判定不渲染）。
      const resolveDefaultText = (): string => {
        if (!title?.defaultText) return ''
        return typeof title.defaultText === 'function'
          ? title.defaultText(ctx)
          : title.defaultText
      }
      const titleText = title ? ctx.info.trim() || resolveDefaultText() : ''
      const willEmitTitle = !!title && titleText !== '' && result.titleCSS !== ''

      const parts: string[] = []
      parts.push(
        `<section class="container-${name} container-${name}--${id}" style="${result.wrapperCSS}">`,
      )
      if (result.svgSlot) parts.push(result.svgSlot)

      if (willEmitTitle && title) {
        const titleCss =
          result.titleCSS ??
          (typeof title.defaultCSS === 'function' ? title.defaultCSS(ctx) : title.defaultCSS)
        const icon = title.iconKey
          ? ((ctx.assets[title.iconKey] as string | undefined) ?? '')
          : ''
        parts.push(
          `<section class="container-${name}__title" style="${titleCss}">${icon}${escText(titleText)}</section>`,
        )
      }

      if (body && body.mode === 'optional' && result.bodyCSS) {
        parts.push(`<section class="container-${name}__body" style="${result.bodyCSS}">`)
      }

      return parts.join('\n') + '\n'
    },

    close: (ctx) => {
      if (!body) return '</section>\n'
      const { result } = resolveVariant(ctx)
      return (result.bodyCSS ? '</section>\n' : '') + '</section>\n'
    },
  }
}
