/**
 * placeholderFence —— 新建模式默认脚手架契约。
 *
 * 与 SourceModePanel 共享，避免两处占位字符串漂移；
 * kind='none' 必须返回空串（由 MarkdownInput 的 CM placeholder 兜底引导）。
 */

import { describe, expect, it } from 'vitest'
import {
  PLACEHOLDER_FENCE_BY_KIND,
  defaultSnippetFor,
  nextSnippetOnSelectionChange,
} from '../../src/ui/components/component-studio/placeholderFence'

describe('defaultSnippetFor', () => {
  it('kind=none 返回空串', () => {
    expect(defaultSnippetFor('none', '')).toBe('')
    expect(defaultSnippetFor('none', 'whatever')).toBe('')
  })

  it('admonition 注入 tip fence 并带 variantId', () => {
    const md = defaultSnippetFor('admonition', 'classic')
    expect(md).toContain('::: tip')
    expect(md).toContain('variant=classic')
    expect(md.endsWith('\n')).toBe(true)
  })

  it('compare 注入嵌套 pros/cons fence', () => {
    const md = defaultSnippetFor('compare', 'data-card')
    expect(md).toContain('::: compare variant=data-card')
    expect(md).toContain('::: pros')
    expect(md).toContain('::: cons')
  })

  it('未覆盖的 kind 返回空串（不抛）', () => {
    // codeBlock 等暂未在 PLACEHOLDER_FENCE_BY_KIND 注册
    expect(defaultSnippetFor('codeBlock', 'x')).toBe('')
  })

  it('表对每种已注册 kind 返回带换行收尾的字符串', () => {
    for (const [kind, builder] of Object.entries(PLACEHOLDER_FENCE_BY_KIND)) {
      const md = builder!('demo')
      expect(md, `kind=${kind}`).toContain('demo')
      expect(md.endsWith('\n'), `kind=${kind} 应以换行收尾`).toBe(true)
    }
  })
})

describe('nextSnippetOnSelectionChange', () => {
  it('编辑器空时，按当前 (kind, variantId) 全量注入并记忆为 lastInjected', () => {
    const r = nextSnippetOnSelectionChange({
      kind: 'admonition',
      variantId: 'classic',
      prevKind: 'none',
      prevVariantId: '',
      current: '',
      lastInjected: '',
    })
    expect(r.nextSnippet).toContain('variant=classic')
    expect(r.rewriteLastInjected).toBe(true)
  })

  it('markdown 仍是上次注入的脚手架时，切 variant 应全量重写到新 id', () => {
    const lastInjected = defaultSnippetFor('admonition', 'classic')
    const r = nextSnippetOnSelectionChange({
      kind: 'admonition',
      variantId: 'callout',
      prevKind: 'admonition',
      prevVariantId: 'classic',
      current: lastInjected,
      lastInjected,
    })
    expect(r.nextSnippet).toContain('variant=callout')
    expect(r.nextSnippet).not.toContain('variant=classic')
    expect(r.rewriteLastInjected).toBe(true)
  })

  it('作者已写过 markdown 且只切 variant 时，仅就地替换 variant= 字段，不丢正文', () => {
    const edited = '::: tip 我的标题 variant=classic\n我自己写的正文段落\n:::\n'
    const r = nextSnippetOnSelectionChange({
      kind: 'admonition',
      variantId: 'callout',
      prevKind: 'admonition',
      prevVariantId: 'classic',
      current: edited,
      lastInjected: defaultSnippetFor('admonition', 'classic'),
    })
    expect(r.nextSnippet).toBe(
      '::: tip 我的标题 variant=callout\n我自己写的正文段落\n:::\n',
    )
    expect(r.rewriteLastInjected).toBe(false)
  })

  it('作者已写过 markdown 且切 kind 时，原样保留让作者自己处理', () => {
    const edited = '::: tip 自定义标题 variant=classic\n手写正文\n:::\n'
    const r = nextSnippetOnSelectionChange({
      kind: 'quote',
      variantId: 'left-bar',
      prevKind: 'admonition',
      prevVariantId: 'classic',
      current: edited,
      // 当前 markdown 已与 lastInjected 漂移 → 视为作者编辑过
      lastInjected: defaultSnippetFor('admonition', 'classic'),
    })
    expect(r.nextSnippet).toBe(edited)
    expect(r.rewriteLastInjected).toBe(false)
  })

  it('prevVariantId 为空（首次选择）时不触发就地改写，避免误伤', () => {
    const edited = '已写好的自由 markdown\n'
    const r = nextSnippetOnSelectionChange({
      kind: 'admonition',
      variantId: 'classic',
      prevKind: 'admonition',
      prevVariantId: '',
      current: edited,
      lastInjected: '',
    })
    // 编辑器非空且与 lastInjected 漂移 → 视为已编辑，分支 3：保留原文
    expect(r.nextSnippet).toBe(edited)
    expect(r.rewriteLastInjected).toBe(false)
  })
})
