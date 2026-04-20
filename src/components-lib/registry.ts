/**
 * 组件库注册表
 *
 * 汇总所有内置预设，供 ComponentPalette.vue 消费。
 * 数据源：src/variants/ 下各 VariantDef 的 snippets 字段（单一真相）。
 * 用户自创组件通过 storage/userComponents.ts 独立管理，
 * UI 展示时在"我的组件"分类里叠加呈现。
 */

import type { ComponentEntry, ComponentKind } from './types'
import type { VariantKind } from '../themes/types'
import { BUILTIN_COMPONENTS as VARIANT_ENTRIES } from '../variants/registry'

export const BUILTIN_COMPONENTS: ComponentEntry[] = VARIANT_ENTRIES.map((e) => ({
  id: e.id,
  name: e.name,
  description: e.description,
  kind: e.kind,
  variantId: e.variantId,
  themeCompat: e.themeCompat ? [...e.themeCompat] : undefined,
  markdownSnippet: e.markdownSnippet,
  thumbnailSvg: e.thumbnailSvg,
}))

/** UI 分类：展示在抽屉 tab 上。顺序即抽屉 tab 顺序。 */
export const COMPONENT_TABS: ReadonlyArray<{
  kind: ComponentKind | 'user'
  label: string
}> = [
  { kind: 'admonition', label: '提示' },
  { kind: 'quote', label: '引用' },
  { kind: 'compare', label: '对比' },
  { kind: 'steps', label: '步骤' },
  { kind: 'divider', label: '分隔' },
  { kind: 'sectionTitle', label: '章节' },
  { kind: 'none', label: '其它' },
  { kind: 'user', label: '我的组件' },
]

export function filterByKind(
  entries: ReadonlyArray<ComponentEntry>,
  kind: ComponentKind,
): ComponentEntry[] {
  return entries.filter((e) => e.kind === kind)
}

/** 在 BUILTIN_COMPONENTS 内按 variant id 查找第一条预设（用于"替换为..."流程）。 */
export function findPresetByVariant(
  kind: VariantKind,
  variantId: string,
): ComponentEntry | undefined {
  return BUILTIN_COMPONENTS.find(
    (e) => e.kind === kind && e.variantId === variantId,
  )
}
