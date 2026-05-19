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
 * 组件库面板的两级 IA：7 个一级组 → 每组若干 sub-tab，**每个 sub-tab 严格对齐
 * 单一 ComponentKind 或单一 variantId**，避免不同容器/变体在同一栅格里杂糅。
 *
 * - 一级组（GroupId）：主题模板 / 提示与强调 / 结构 / 数据与对话 / 互动 / 页饰 / 我的
 * - 二级 sub：每个声明显式 `source` 判别联合，告诉 UI 如何取条目：
 *     - `{ type: 'kind', kind, variantIds? }`  按 ComponentKind 取 builtin 桶；
 *                                              variantIds 可进一步收窄到单一 variant
 *                                              （让 kind='none' 的 6 个 free snippet
 *                                              在"页饰"组里各占一 sub）
 *     - `{ type: 'theme-template' }`            从 theme.templates 派生
 *     - `{ type: 'user' }`                      用户自创组件（localStorage 仓）
 *     - `{ type: 'uv' }`                        用户态变体（独立面板，sub 仅占位）
 */
export type GroupId =
  | 'template'
  | 'callout'
  | 'structure'
  | 'data-dialog'
  | 'interaction'
  | 'frame'
  | 'mine'

export type SubSource =
  | {
      type: 'kind'
      kind: ComponentKind
      /** 在 kind 桶上再做 variantId 过滤；缺省 = 该 kind 全部条目 */
      variantIds?: readonly string[]
    }
  | { type: 'theme-template' }
  | { type: 'user' }
  | { type: 'uv' }

export interface ComponentSub {
  /** 全局唯一 key，对齐 ComponentPalette activeSub 状态 */
  key: string
  /** sub-tab 显示名（中文短） */
  label: string
  /** 数据源——UI 按本字段派发取条目 */
  source: SubSource
}

export interface ComponentGroup {
  id: GroupId
  label: string
  /** 子分类列表；单条 = 不渲染 sub-tab 行，整组退化为单层 */
  subs: ReadonlyArray<ComponentSub>
}

export const COMPONENT_GROUPS: ReadonlyArray<ComponentGroup> = [
  {
    id: 'template',
    label: '主题模板',
    subs: [
      { key: 'tpl-current', label: '当前主题精选', source: { type: 'theme-template' } },
    ],
  },
  {
    id: 'callout',
    label: '提示与强调',
    subs: [
      { key: 'k-admonition', label: '提示', source: { type: 'kind', kind: 'admonition' } },
      { key: 'k-note', label: '补注', source: { type: 'kind', kind: 'note' } },
      { key: 'k-quote', label: '引用', source: { type: 'kind', kind: 'quote' } },
      { key: 'k-pullQuote', label: '引文', source: { type: 'kind', kind: 'pullQuote' } },
      { key: 'k-announcement', label: '公告', source: { type: 'kind', kind: 'announcement' } },
      { key: 'k-highlight', label: '高亮', source: { type: 'kind', kind: 'highlight' } },
    ],
  },
  {
    id: 'structure',
    label: '结构',
    subs: [
      { key: 'k-sectionTitle', label: '章节', source: { type: 'kind', kind: 'sectionTitle' } },
      { key: 'k-divider', label: '分隔', source: { type: 'kind', kind: 'divider' } },
      { key: 'k-steps', label: '步骤', source: { type: 'kind', kind: 'steps' } },
      { key: 'k-compare', label: '对比', source: { type: 'kind', kind: 'compare' } },
      { key: 'k-codeBlock', label: '代码', source: { type: 'kind', kind: 'codeBlock' } },
    ],
  },
  {
    id: 'data-dialog',
    label: '数据与对话',
    subs: [
      { key: 'k-tableCard', label: '表格', source: { type: 'kind', kind: 'tableCard' } },
      { key: 'k-gallery', label: '图集', source: { type: 'kind', kind: 'gallery' } },
      { key: 'k-dialogue', label: '对话', source: { type: 'kind', kind: 'dialogue' } },
      { key: 'k-qaBlock', label: '问答', source: { type: 'kind', kind: 'qaBlock' } },
    ],
  },
  {
    id: 'interaction',
    label: '互动',
    subs: [
      { key: 'k-recommend', label: '推荐', source: { type: 'kind', kind: 'recommend' } },
      { key: 'k-qrcode', label: '二维码', source: { type: 'kind', kind: 'qrcode' } },
      { key: 'k-footerCTA', label: '文末 CTA', source: { type: 'kind', kind: 'footerCTA' } },
      { key: 'k-footnotes', label: '脚注', source: { type: 'kind', kind: 'footnotes' } },
    ],
  },
  {
    id: 'frame',
    label: '页饰',
    // free snippet（kind='none'）按 variantId 拆为独立 sub——每个 sub 只承载一种
    // "页内饰件"，避免开场 / 作者 / 封面 / 音频 / 视频 / 重点高亮 6 个不相关条目挤在一栏。
    subs: [
      { key: 'f-intro', label: '开场', source: { type: 'kind', kind: 'none', variantIds: ['intro'] } },
      { key: 'f-author', label: '作者', source: { type: 'kind', kind: 'none', variantIds: ['author'] } },
      { key: 'f-cover', label: '封面', source: { type: 'kind', kind: 'none', variantIds: ['cover'] } },
      { key: 'f-voice', label: '音频卡', source: { type: 'kind', kind: 'none', variantIds: ['voice-card'] } },
      { key: 'f-video', label: '视频卡', source: { type: 'kind', kind: 'none', variantIds: ['video-card'] } },
      { key: 'f-highlight', label: '重点高亮', source: { type: 'kind', kind: 'none', variantIds: ['highlight'] } },
    ],
  },
  {
    id: 'mine',
    label: '我的',
    subs: [
      { key: 'm-user', label: '我的组件', source: { type: 'user' } },
      { key: 'm-uv', label: '我的样式', source: { type: 'uv' } },
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
