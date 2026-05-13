/**
 * divider 容器
 *
 * R3 重构：走 makeVariantContainer 工厂。
 * 5 种 variant（wave / dots / flower / rule / glyph）；解析优先级：
 *   attrs.variant（如 `::: divider variant=glyph`）> ctx.variants.divider > 'rule'
 *
 * 兼容 v1 的 'line' 别名（→ 'rule'），通过工厂 resolveAlias 表达。
 * 无标题、无 body wrapper——仅 wrapper + svgSlot（variant 自渲染分隔线视觉）。
 */

import type { ContainerRenderer } from './types'
import { DIVIDER_VARIANTS } from '../../variants/registry'
import { makeVariantContainer } from './_shared/makeVariantContainer'

export const dividerContainer: ContainerRenderer = makeVariantContainer({
  name: 'divider',
  themeSlot: 'divider',
  table: DIVIDER_VARIANTS,
  fallbackId: 'rule',
  resolveAlias: (raw) => (raw === 'line' ? 'rule' : undefined),
  // 无 title / 无 body：divider 的视觉完全由 variant 的 svgSlot 承担
})
