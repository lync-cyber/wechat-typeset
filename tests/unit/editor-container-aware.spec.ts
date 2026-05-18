/**
 * editor-container-aware.ts 单测
 *
 * 锁定共享的容器栈解析行为：scanContainerFrames + hasMatchingCloseAfter。
 * 视觉分层装饰、折叠、自动闭合都依赖它，单点跑通即可保证三件套行为一致。
 *
 * Decoration / inputHandler 本身依赖 EditorView 实例，需要 DOM 环境；
 * 这里只测纯函数解析，避免 jsdom 依赖。
 */

import { describe, it, expect } from 'vitest'
import { Text } from '@codemirror/state'
import { __testing__ } from '../../src/ui/editor-container-aware'

const { scanContainerFrames, hasMatchingCloseAfter } = __testing__

function txt(s: string) {
  return Text.of(s.split('\n'))
}

describe('scanContainerFrames · 单层容器', () => {
  it('一对 ::: tip + ::: 形成深度 1 的 frame', () => {
    const frames = scanContainerFrames(txt('::: tip 标题\n内容\n:::\n'))
    expect(frames).toEqual([
      { name: 'tip', colons: 3, openLine: 1, closeLine: 3, depth: 1 },
    ])
  })

  it('未闭合容器 closeLine = -1', () => {
    const frames = scanContainerFrames(txt('::: tip\n内容\n'))
    expect(frames[0].closeLine).toBe(-1)
  })
})

describe('scanContainerFrames · 嵌套', () => {
  it(':::: compare + ::: pros + ::: cons 按嵌套深度标 depth', () => {
    const src = ':::: compare\n::: pros\n- a\n:::\n::: cons\n- b\n:::\n::::\n'
    const frames = scanContainerFrames(txt(src))
    expect(frames).toHaveLength(3)
    const byName = Object.fromEntries(frames.map((f) => [f.name, f]))
    expect(byName.compare.depth).toBe(1)
    expect(byName.compare.openLine).toBe(1)
    expect(byName.compare.closeLine).toBe(8)
    expect(byName.pros.depth).toBe(2)
    expect(byName.cons.depth).toBe(2)
  })

  it('内层 ::: 不被错误地匹配为外层 :::: 的闭合', () => {
    const frames = scanContainerFrames(
      txt(':::: compare\n::: pros\n:::\n::::\n'),
    )
    const compare = frames.find((f) => f.name === 'compare')!
    expect(compare.closeLine).toBe(4)
  })
})

describe('scanContainerFrames · 多个顶层容器', () => {
  it('依次出现的两个顶层容器都标 depth 1', () => {
    const src = '::: tip\n:::\n::: warning\n:::\n'
    const frames = scanContainerFrames(txt(src))
    expect(frames).toHaveLength(2)
    expect(frames[0].depth).toBe(1)
    expect(frames[1].depth).toBe(1)
  })
})

describe('hasMatchingCloseAfter', () => {
  it('找到匹配 close 返回 true', () => {
    const doc = txt('::: tip\n内容\n:::\n')
    expect(hasMatchingCloseAfter(doc, 1, 3)).toBe(true)
  })

  it('未闭合时返回 false', () => {
    const doc = txt('::: tip\n内容\n')
    expect(hasMatchingCloseAfter(doc, 1, 3)).toBe(false)
  })

  it(':::: compare 跳过内层 ::: 配对，找到外层 ::::', () => {
    const doc = txt(':::: compare\n::: pros\n:::\n::::\n')
    expect(hasMatchingCloseAfter(doc, 1, 4)).toBe(true)
  })

  it('内层 ::: pros 在外层 :::: compare 内有自己的 ::: 匹配', () => {
    const doc = txt(':::: compare\n::: pros\n- a\n:::\n::::\n')
    expect(hasMatchingCloseAfter(doc, 2, 3)).toBe(true)
  })

  it('open 行后只有不匹配的 close 时返回 false', () => {
    const doc = txt('::: tip\n内容\n::::\n')
    expect(hasMatchingCloseAfter(doc, 1, 3)).toBe(false)
  })
})
