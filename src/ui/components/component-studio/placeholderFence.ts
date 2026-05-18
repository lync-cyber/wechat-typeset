/**
 * 按 kind 给出最小可运行 fence 片段，供两处复用：
 *   - Studio 新建模式：初次选 kind 时自动注入到 markdown 编辑区作脚手架
 *   - SourceModePanel：UV patch 隔离预览的占位 markdown
 *
 * 留在 Studio 内部，不外泄到 domain：placeholder 是"教学性脚手架"，与领域模型解耦。
 */

import type { VariantKind as VK } from '../../../core/themes/types'
import type { ComponentKind } from '../../../domain/components-lib'

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
