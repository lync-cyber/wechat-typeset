/**
 * tokenSchema 查找 helper —— 给 (kind, variantId) 返回 variant 的 tokenSchema。
 *
 * UI 侧（TokensPanel.vue）需要在选定 base variant 后查出"它暴露了哪些 token 字段"。
 * 这里集中查询：默认走 ALL_VARIANT_DEFS 扁平表，命中即返回；未暴露 tokenSchema
 * 的 variant 返回 undefined（UI 据此决定不渲染 token 面板）。
 *
 * 与 registry.ts 解耦：本模块只读 ALL_VARIANT_DEFS，不参与运行时容器渲染分派。
 * 维护成本接近零——新 variant 暴露 tokenSchema 后自动可被查询，无需登记。
 */

import { ALL_VARIANT_DEFS } from './registry'
import type { TokenSchema } from './_core'
import type { VariantKind } from '../themes/types'

export function getVariantTokenSchema(
  kind: VariantKind | 'none',
  variantId: string,
): TokenSchema | undefined {
  if (kind === 'none' || !variantId) return undefined
  for (const d of ALL_VARIANT_DEFS) {
    if (d.meta.kind === kind && d.meta.id === variantId) {
      return d.tokenSchema
    }
  }
  return undefined
}
