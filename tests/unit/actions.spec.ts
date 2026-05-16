/**
 * createAppActions 七动作契约（R7-D）
 *
 * 覆盖：
 *   handleClear / handleLoadSample / handleFixZhTypo / handleApplyPalette /
 *   handleResetPalette / handleInsertTemplate / handleSaveSelection
 *
 * 重点：每个 handler 与 state.ts 单例 ref 的耦合；undo / transient 回调是否被
 * 正确调用、调用文案是否合理。tests/setup.ts 的全局 afterEach 会复位 state。
 */

import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'
import { createAppActions } from '../../src/app/actions'
import { baseThemeId, customTheme, md } from '../../src/app/state'
import { getSample } from '../../src/domain/samples'

function makeDeps() {
  const showUndo = vi.fn()
  const pingTransient = vi.fn()
  const editorRef = ref<{
    insertAtCursor?: (text: string) => void
    getSelectedText?: () => string
  } | null>(null)
  const paletteRef = ref<{ openSaveDialog?: (text: string) => void } | null>(null)
  const ui = { rightSlot: null as string | null }
  const actions = createAppActions({ showUndo, pingTransient, editorRef, paletteRef, ui })
  return { showUndo, pingTransient, editorRef, paletteRef, ui, ...actions }
}

describe('handleClear', () => {
  it('正文非空 → 置空并挂 undo', () => {
    md.value = '原内容'
    const d = makeDeps()
    d.handleClear()
    expect(md.value).toBe('')
    expect(d.showUndo).toHaveBeenCalledOnce()
    // 触发 undo restore 应恢复原值
    const restore = d.showUndo.mock.calls[0][1] as () => void
    restore()
    expect(md.value).toBe('原内容')
  })

  it('正文为空 → 静默 noop（不挂 undo、不 ping）', () => {
    md.value = ''
    const d = makeDeps()
    d.handleClear()
    expect(d.showUndo).not.toHaveBeenCalled()
    expect(d.pingTransient).not.toHaveBeenCalled()
  })
})

describe('handleLoadSample', () => {
  it('正文与示例已同 → noop', () => {
    md.value = getSample(baseThemeId.value)
    const d = makeDeps()
    d.handleLoadSample()
    expect(d.showUndo).not.toHaveBeenCalled()
    expect(d.pingTransient).not.toHaveBeenCalled()
  })

  it('正文非空且不同 → 写示例 + 挂 undo（带"原正文可撤销"文案）', () => {
    md.value = '用户写的草稿'
    const d = makeDeps()
    d.handleLoadSample()
    expect(md.value).toBe(getSample(baseThemeId.value))
    expect(d.showUndo).toHaveBeenCalledOnce()
    expect((d.showUndo.mock.calls[0][0] as string)).toContain('载入示例')
  })

  it('正文为空 → 只 pingTransient 不挂 undo（无可恢复内容）', () => {
    md.value = ''
    const d = makeDeps()
    d.handleLoadSample()
    expect(d.pingTransient).toHaveBeenCalledWith('已载入示例')
    expect(d.showUndo).not.toHaveBeenCalled()
  })
})

describe('handleFixZhTypo', () => {
  it('正文为空 → ping "正文为空"', () => {
    md.value = ''
    const d = makeDeps()
    d.handleFixZhTypo()
    expect(d.pingTransient).toHaveBeenCalledWith('正文为空')
  })

  it('无 typo 命中 → ping "已干净"', () => {
    md.value = 'hello world'
    const d = makeDeps()
    d.handleFixZhTypo()
    expect(d.pingTransient).toHaveBeenCalledWith('中文排版已干净')
  })

  it('有 typo 命中 → 写回 + 挂 undo（数字与中文之间应加空格等）', () => {
    md.value = '今天1天'  // 数字与中文之间应有空格规则
    const d = makeDeps()
    d.handleFixZhTypo()
    expect(md.value).not.toBe('今天1天')
    expect(d.showUndo).toHaveBeenCalledOnce()
  })
})

describe('handleApplyPalette / handleResetPalette', () => {
  it('apply 后 customTheme 写入；id 形如 {base}--custom', () => {
    const d = makeDeps()
    d.handleApplyPalette({ primary: '#ff0000', secondary: '#00ff00', accent: '#0000ff', dark: false })
    expect(customTheme.value).not.toBeNull()
    expect(customTheme.value?.id).toBe('default--custom')
  })

  it('reset 在无 customTheme 时是 noop', () => {
    const d = makeDeps()
    d.handleResetPalette()
    expect(d.pingTransient).not.toHaveBeenCalled()
  })

  it('reset 后 customTheme 清空 + ping 文案', () => {
    const d = makeDeps()
    d.handleApplyPalette({ primary: '#ff0000', secondary: '#00ff00', accent: '#0000ff', dark: false })
    d.handleResetPalette()
    expect(customTheme.value).toBeNull()
    expect(d.pingTransient).toHaveBeenCalledWith('已还原主题配色')
  })
})

describe('handleInsertTemplate', () => {
  it('editorRef.insertAtCursor 存在 → 走它；不动 md.value', () => {
    const d = makeDeps()
    const insert = vi.fn()
    d.editorRef.value = { insertAtCursor: insert }
    md.value = 'before'
    d.handleInsertTemplate('::: tip\nx\n:::')
    expect(insert).toHaveBeenCalledWith('::: tip\nx\n:::')
    expect(md.value).toBe('before')
    expect(d.pingTransient).toHaveBeenCalledWith('已插入')
  })

  it('editorRef 为空 → 退化为追加到 md 末尾（自动补换行）', () => {
    const d = makeDeps()
    md.value = 'before'
    d.handleInsertTemplate('snippet')
    expect(md.value).toBe('before\n\nsnippet')
  })

  it('editorRef 为空 + md 已以 \\n 结尾 → 不重复补换行', () => {
    const d = makeDeps()
    md.value = 'before\n'
    d.handleInsertTemplate('snippet')
    expect(md.value).toBe('before\n\nsnippet')
  })
})

describe('handleSaveSelection', () => {
  it('无选区 → ping 提示', () => {
    const d = makeDeps()
    d.editorRef.value = { getSelectedText: () => '   ' }
    d.handleSaveSelection()
    expect(d.pingTransient).toHaveBeenCalledWith('先在编辑器中选中一段 markdown')
  })

  it('有选区 → 把 rightSlot 切到 "components"', () => {
    const d = makeDeps()
    d.editorRef.value = { getSelectedText: () => 'hello' }
    d.paletteRef.value = { openSaveDialog: vi.fn() }
    d.handleSaveSelection()
    expect(d.ui.rightSlot).toBe('components')
  })
})
