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

/**
 * 组件库渐进披露：二级分组结构。把原本 14 个独立 tab 收纳为 5 个语义组，
 * 减少作者首次扫描的 tab 数量；组内若 sub 多于一个，UI 渲染为水平 sub-tab。
 *
 * 设计原则：
 *   - 高频版式优先：提示与引用 / 结构 排在前
 *   - 同语义聚合：admonition + note + quote = "说话"类；steps + compare + section +
 *     divider = "骨架"类；recommend + qrcode + footerCTA + footnotes = "互动"类
 *   - 'template' 不属 kind 体系，单独占 first group；'user' / 'uv' / 'none' 都进"我的"
 */
export type GroupId = 'template' | 'callout' | 'structure' | 'interaction' | 'mine'

export interface ComponentSub {
  /** 子分类 key：ComponentKind / 'template' / 'user' / 'uv'，与 ComponentPalette activeSub 对齐 */
  key: ComponentKind | 'template' | 'user' | 'uv'
  /** 子分类显示名（sub-tab 文字） */
  label: string
}

export interface ComponentGroup {
  id: GroupId
  label: string
  /** 子分类列表；单条 = 不渲染 sub-tab，整组退化为单层 */
  subs: ReadonlyArray<ComponentSub>
}

export const COMPONENT_GROUPS: ReadonlyArray<ComponentGroup> = [
  {
    id: 'template',
    label: '主题模板',
    subs: [{ key: 'template', label: '当前主题' }],
  },
  {
    id: 'callout',
    label: '提示与引用',
    subs: [
      { key: 'admonition', label: '提示' },
      { key: 'note', label: '补注' },
      { key: 'quote', label: '引用' },
    ],
  },
  {
    id: 'structure',
    label: '结构',
    subs: [
      { key: 'compare', label: '对比' },
      { key: 'steps', label: '步骤' },
      { key: 'sectionTitle', label: '章节' },
      { key: 'divider', label: '分隔' },
    ],
  },
  {
    id: 'interaction',
    label: '互动',
    subs: [
      { key: 'recommend', label: '推荐' },
      { key: 'qrcode', label: '二维码' },
      { key: 'footerCTA', label: '文末 CTA' },
      { key: 'footnotes', label: '脚注' },
    ],
  },
  {
    id: 'mine',
    label: '我的',
    subs: [
      { key: 'user', label: '我的组件' },
      { key: 'uv', label: '我的样式' },
      { key: 'none', label: '其它' },
    ],
  },
]

/** 在 BUILTIN_COMPONENTS 内按 variant id 查找第一条预设（用于"替换为..."流程）。 */
export function findPresetByVariant(
  kind: VariantKind,
  variantId: string,
): ComponentEntry | undefined {
  return BUILTIN_COMPONENTS.find(
    (e) => e.kind === kind && e.variantId === variantId,
  )
}
