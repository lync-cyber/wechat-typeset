/**
 * 组件库注册表
 *
 * 汇总所有内置预设，供 ComponentPalette.vue 消费。
 * 数据源：src/domain/components-lib/sources/builtin-source.ts（P0 后从 core/variants 派生）。
 * 用户自创组件通过 storage/userComponents.ts 独立管理，
 * UI 展示时在"我的组件"分类里叠加呈现。
 *
 * P0 后本文件只剩"对外 facade"职责——派生在 sources/ 下，
 * 这里仅做 tab 元数据 / 查找函数。BUILTIN_COMPONENTS 直接 re-export 同一引用，
 * 避免冗余 deep-clone（builtin-source 出来的 BuiltinEntry 本就是 ComponentEntry 的子集）。
 */

import type { ComponentEntry, ComponentKind } from './types'
import type { VariantKind } from '../../core/themes/types'
import { BUILTIN_COMPONENTS as BUILTIN_SOURCE } from './sources/builtin-source'

export const BUILTIN_COMPONENTS: ReadonlyArray<ComponentEntry> = BUILTIN_SOURCE

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
  { kind: 'note', label: '补注' },
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
