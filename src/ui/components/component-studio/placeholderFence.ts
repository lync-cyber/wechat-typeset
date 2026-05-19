/**
 * 按 kind 给出最小可运行 fence 片段，供两处复用：
 *   - Studio 新建模式：初次选 kind 时自动注入到 markdown 编辑区作脚手架
 *   - SourceModePanel：UV patch 隔离预览的占位 markdown
 *
 * 留在 Studio 内部，不外泄到 domain：placeholder 是"教学性脚手架"，与领域模型解耦。
 */

import type { VariantKind as VK } from '../../../core/themes/types'
import type { ComponentKind } from '../../../domain/components-lib'
import { rewriteVariantInMarkdown } from './userVariantSave'

export const PLACEHOLDER_FENCE_BY_KIND: Partial<Record<VK, (variantId: string) => string>> = {
  admonition: (vid) => `::: tip 标题占位 variant=${vid}\n这里是正文示例段落。\n:::\n`,
  quote: (vid) => `::: quote-card 作者占位 variant=${vid}\n金句占位\n:::\n`,
  pullQuote: (vid) => `::: pull-quote variant=${vid} 引文占位\n副文占位\n:::\n`,
  compare: (vid) => `::: compare variant=${vid}\n::: pros\nA\n:::\n::: cons\nB\n:::\n:::\n`,
  steps: (vid) => `::: steps variant=${vid} 步骤示例\n第一步\n第二步\n:::\n`,
  divider: (vid) => `::: divider variant=${vid}\n:::\n`,
  sectionTitle: (vid) => `::: section-title variant=${vid}\n章节标题占位\n:::\n`,
  note: (vid) => `::: note variant=${vid}\n备注占位\n:::\n`,
}

/**
 * kind='none' 故意返回空串：自由组件无固定骨架，由 MarkdownInput 的 CM placeholder
 * 提示文案承担引导，避免硬塞示例反过来束缚用户。
 */
export function defaultSnippetFor(kind: ComponentKind, variantId: string): string {
  if (kind === 'none') return ''
  const builder = PLACEHOLDER_FENCE_BY_KIND[kind as VK]
  if (!builder) return ''
  return builder(variantId || '')
}

export interface SnippetTransition {
  /** 编辑器下一刻应当呈现的 markdown 文本 */
  nextSnippet: string
  /** true 时调用方应把 lastInjected 记忆同步为 nextSnippet（仅全量重写场景） */
  rewriteLastInjected: boolean
}

/**
 * 作者在"分类 / 骨架"下拉之间切换时，决定 markdown 编辑区下一刻应当呈现什么。
 *
 * 三条分支按尊重作者输入的优先级排列：
 *   1. markdown 空 / 仍是上次注入的脚手架 → 全量重写为新 (kind, variantId) 的默认骨架
 *   2. 已写过 markdown + 仅 variantId 变（kind 不变） → 就地把 `variant=<旧 id>` 改写成新 id，
 *      让右侧预览跟着切，又不覆盖作者已写的正文
 *   3. 其它（已写过 + 切 kind / 切到 none） → 原样保留，由作者自行决定如何改写 fence 头
 *      （跨 kind 时旧 variantId 与新 kind 的 fence 容器无关，强改会污染语义）
 */
export function nextSnippetOnSelectionChange(args: {
  kind: ComponentKind
  variantId: string
  prevKind: ComponentKind
  prevVariantId: string
  current: string
  lastInjected: string
}): SnippetTransition {
  const { kind, variantId, prevKind, prevVariantId, current, lastInjected } = args
  const userHasEdited = current.trim() !== '' && current !== lastInjected
  if (!userHasEdited) {
    const next = defaultSnippetFor(kind, variantId)
    return { nextSnippet: next, rewriteLastInjected: true }
  }
  if (kind === prevKind && variantId && prevVariantId && variantId !== prevVariantId) {
    const rewritten = rewriteVariantInMarkdown(current, prevVariantId, variantId)
    return { nextSnippet: rewritten, rewriteLastInjected: false }
  }
  return { nextSnippet: current, rewriteLastInjected: false }
}
