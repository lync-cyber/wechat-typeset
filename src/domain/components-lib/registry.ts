/**
 * 组件库注册表（对外 facade）。
 *
 * 派生在 sources/builtin-source.ts（从 core/variants 取 snippets）；本文件只做
 * tab 元数据 + 查找函数。BUILTIN_COMPONENTS 直接 re-export 同一引用，避免冗余
 * deep-clone（builtin-source 出来的 BuiltinEntry 本就是 ComponentEntry 的子集）。
 * 用户自创组件由 storage/userComponents.ts 管理，UI 在"我的组件"分类叠加展示。
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
  { kind: 'footnotes', label: '脚注' },
  { kind: 'recommend', label: '推荐' },
  { kind: 'qrcode', label: '二维码' },
  { kind: 'footerCTA', label: '文末 CTA' },
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
