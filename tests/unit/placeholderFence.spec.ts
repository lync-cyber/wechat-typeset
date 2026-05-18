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
