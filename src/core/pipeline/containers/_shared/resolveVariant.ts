/**
 * variant id 三段解析（attrs.variant > theme.variants[slot] > fallback）。
 *
 * 抽自 quote / compare / headline 三个不走 makeVariantContainer 工厂的容器——
 * 它们各自手写过一遍同样的 3 行逻辑。makeVariantContainer 内部的 resolveVariant
 * 是更复杂的版本（带 alias、调 render 拿 result），不能复用，所以另开一个最小 helper。
 *
 * 不做 alias 归一化：divider 这类需要 alias 的容器都已收口到 makeVariantContainer。
 * 不调 .render：留给调用方自己拼，因为各容器外层 HTML 形态不同。
 */

import type { ContainerRenderContext } from '../types'
import type { ThemeVariants } from '../../../themes/types'

export function resolveVariantId<Id extends string>(
  ctx: ContainerRenderContext,
  slot: keyof ThemeVariants,
  table: Record<string, unknown>,
  fallback: Id,
): Id {
  const override = ctx.attrs.variant
  if (override && override in table) return override as Id
  const themeChoice = ctx.variants[slot] as string | undefined
  if (themeChoice && themeChoice in table) return themeChoice as Id
  return fallback
}
