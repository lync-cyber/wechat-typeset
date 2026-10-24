import { describe, expect, it } from 'vitest'
import { EditorState, Text } from '@codemirror/state'
import { foldEffect, foldedRanges } from '@codemirror/language'
import { frontmatterFolding, frontmatterRange } from '../../src/ui/editor-frontmatter'

describe('发布信息折叠', () => {
  it('只收起文首完整 frontmatter，保留正文行号和原始内容', () => {
    const doc = '---\ntitle: 标题\ndigest: 摘要\n---\n# 正文\n内容'
    const state = EditorState.create({ doc, extensions: frontmatterFolding })
    const range = frontmatterRange(state.doc)!
    const folded = state.update({ effects: foldEffect.of(range) }).state
    expect(folded.doc.toString()).toBe(doc)
    expect(folded.doc.line(5).text).toBe('# 正文')
    expect(foldedRanges(folded).size).toBe(1)
    expect(doc.slice(range.from, range.to)).toBe('---\ntitle: 标题\ndigest: 摘要\n---')
  })

  it('定位到发布信息时自动展开；正文编辑不改变字段', () => {
    const state = EditorState.create({ doc: '---\ntitle: 标题\n---\n正文', extensions: frontmatterFolding })
    const folded = state.update({ effects: foldEffect.of(frontmatterRange(state.doc)!) }).state
    const edited = folded.update({ changes: { from: folded.doc.length, insert: '继续写作' } }).state
    expect(foldedRanges(edited).size).toBe(1)
    const selected = edited.update({ selection: { anchor: 8 } }).state
    expect(foldedRanges(selected).size).toBe(0)
    expect(selected.doc.toString()).toBe('---\ntitle: 标题\n---\n正文继续写作')
  })

  it('不折叠未闭合字段或正文中的分隔线', () => {
    expect(frontmatterRange(Text.of(['---', 'title: 未闭合']))).toBeNull()
    expect(frontmatterRange(Text.of(['# 正文', '---', '内容', '---']))).toBeNull()
    expect(frontmatterRange(Text.of(['\uFEFF---', 'title: 标题', '---']))).toEqual({ from: 0, to: 18 })
  })

  it('与解析器保持列首分隔符规则，不把缩进正文隐藏为发布信息', () => {
    expect(frontmatterRange(Text.of(['  ---', '普通正文', '  ---']))).toBeNull()
    expect(frontmatterRange(Text.of(['---', 'title: 标题', '  ---']))).toBeNull()
    expect(frontmatterRange(Text.of(['--- \t', 'title: 标题', '---\t']))).not.toBeNull()
  })
})
