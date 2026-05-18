/**
 * diagnose.ts 的 quick-fix 契约测试
 *
 * 锁定 fix 字段在每类可机械修复诊断上的行为：title 文案、edits 范围与替换文本。
 * editor-extensions.ts 的 linter 翻译层会照搬这些 edits 给 CodeMirror，所以这层
 * 跑通即等同于"作者点 quick-fix 按钮拿到正确的文档编辑"。
 */

import { describe, it, expect } from 'vitest'
import { diagnose } from '../../src/core/pipeline/diagnose'

function applyEdits(
  source: string,
  edits: ReadonlyArray<{ from: number; to: number; insert: string }>,
): string {
  // 倒序应用，保持 from/to 偏移稳定（diagnose 给出的偏移是相对原 source 的）
  const sorted = [...edits].sort((a, b) => b.from - a.from)
  let out = source
  for (const e of sorted) {
    out = out.slice(0, e.from) + e.insert + out.slice(e.to)
  }
  return out
}

describe('diagnose · fix · fence-length-wrong', () => {
  it('compare 用 ::: 时给 quick-fix 改为 ::::', () => {
    const src = '::: compare\n:::\n'
    const ds = diagnose(src)
    const fenceErr = ds.find((d) => d.code === 'fence-length-wrong')
    expect(fenceErr?.fix).toBeDefined()
    expect(fenceErr!.fix!.title).toContain('::::')
    const fixed = applyEdits(src, fenceErr!.fix!.edits)
    expect(fixed.startsWith(':::: compare')).toBe(true)
  })
})

describe('diagnose · fix · yaml-style-attr', () => {
  it('open 行 `key: v` 给 quick-fix 改为 `key=`', () => {
    const src = '::: cover issue: 023\n:::\n'
    const ds = diagnose(src)
    const yamlErr = ds.find((d) => d.code === 'yaml-style-attr')
    expect(yamlErr?.fix).toBeDefined()
    const fixed = applyEdits(src, yamlErr!.fix!.edits)
    expect(fixed).toContain('issue= 023')
    expect(fixed).not.toContain('issue: 023')
  })
})

describe('diagnose · fix · unclosed-fence', () => {
  it('未闭合容器给 quick-fix 在文末追加 fence', () => {
    const src = '::: tip 小贴士\n内容\n'
    const ds = diagnose(src)
    const unclosed = ds.find((d) => d.code === 'unclosed-fence')
    expect(unclosed?.fix).toBeDefined()
    expect(unclosed!.fix!.title).toContain(':::')
    const fixed = applyEdits(src, unclosed!.fix!.edits)
    expect(fixed.endsWith(':::\n')).toBe(true)
    expect(diagnose(fixed)).toEqual([])
  })

  it('源文末没有换行时，fix 自动补一个换行避免与原文末行粘连', () => {
    const src = '::: tip 小贴士\n内容'
    const ds = diagnose(src)
    const unclosed = ds.find((d) => d.code === 'unclosed-fence')
    expect(unclosed?.fix).toBeDefined()
    const fixed = applyEdits(src, unclosed!.fix!.edits)
    expect(fixed).toBe('::: tip 小贴士\n内容\n:::\n')
  })

  it(':::: compare 未闭合时，fix 用 4 个冒号闭合', () => {
    const src = ':::: compare\n::: pros\n- a\n:::\n'
    const ds = diagnose(src)
    const unclosed = ds.find((d) => d.code === 'unclosed-fence')
    expect(unclosed?.fix).toBeDefined()
    expect(unclosed!.fix!.title).toContain('::::')
    const fixed = applyEdits(src, unclosed!.fix!.edits)
    expect(diagnose(fixed)).toEqual([])
  })
})

describe('diagnose · fix · zh-typo', () => {
  it('zh-halfwidth-punct 给 quick-fix 含 replacement', () => {
    const src = '这是一段中文,后面.\n'
    const ds = diagnose(src).filter((d) => d.code === 'zh-halfwidth-punct')
    expect(ds.length).toBeGreaterThan(0)
    for (const d of ds) {
      expect(d.fix).toBeDefined()
      expect(d.fix!.edits).toHaveLength(1)
    }
    const fixed = applyEdits(src, ds.flatMap((d) => d.fix!.edits))
    expect(fixed).toBe('这是一段中文，后面。\n')
  })

  it('zh-straight-quote 给 quick-fix 替换为弯引号', () => {
    const src = '他说："这很重要"。\n'.replace(/[“”]/g, '"')
    const ds = diagnose(src).filter((d) => d.code === 'zh-straight-quote')
    expect(ds.length).toBeGreaterThan(0)
    const fixed = applyEdits(src, ds[0].fix!.edits)
    expect(fixed).toContain('“')
    expect(fixed).toContain('”')
  })
})

describe('diagnose · fix · 未声明 quick-fix 的诊断不附带 fix', () => {
  it('unknown-container 不附 fix（拼错名字没法机械确定意图）', () => {
    const ds = diagnose('::: notexist\n:::\n')
    const err = ds.find((d) => d.code === 'unknown-container')
    expect(err?.fix).toBeUndefined()
  })

  it('list-too-deep 不附 fix（扁平化是渲染期 wxPatch 的事，源码不动）', () => {
    const src = '- a\n  - b\n    - c\n      - d\n'
    const ds = diagnose(src)
    const warn = ds.find((d) => d.code === 'list-too-deep')
    expect(warn?.fix).toBeUndefined()
  })
})
