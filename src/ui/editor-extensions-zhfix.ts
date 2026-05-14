/**
 * 一键修复中文排版后的 diff 装饰 —— 给"刚被修改过"的片段加一段短时间的背景高亮，
 * 让作者立刻看到改了哪里（5s 后自动淡出，不打扰）。
 *
 * 与 src/ui/editor-extensions.ts 分文件的原因：那里是 autocomplete + linter，长期挂载、
 * 跟容器词汇耦合；这里是 effect-driven、跟"一键修复"这一动作绑定，职责完全独立。
 *
 * 用法：
 *   - Editor.vue 把 `zhFixHighlightExtension` 塞进 EditorState extensions
 *   - actions.ts 拿到 fixZhTypoWithRanges 结果后，调 `applyZhFixHighlight(view, ranges)`
 *     即可，timer 自动消化在本文件内
 */

import { StateEffect, StateField } from '@codemirror/state'
import { Decoration, type DecorationSet, EditorView } from '@codemirror/view'

const HIGHLIGHT_DURATION_MS = 5000

/** 触发：传入 ranges 时设置高亮；传入 null 时清空 */
const setRangesEffect = StateEffect.define<readonly { from: number; to: number }[] | null>()

const fixMark = Decoration.mark({ class: 'cm-zhfix-mark' })

const zhFixField = StateField.define<DecorationSet>({
  create() {
    return Decoration.none
  },
  update(value, tr) {
    // 文档变更时让装饰跟着 map 过去（避免位置错位）
    value = value.map(tr.changes)
    for (const e of tr.effects) {
      if (!e.is(setRangesEffect)) continue
      if (e.value === null) {
        value = Decoration.none
      } else if (e.value.length === 0) {
        value = Decoration.none
      } else {
        const decos = e.value.map((r) => fixMark.range(r.from, r.to))
        value = Decoration.set(decos, true)
      }
    }
    return value
  },
  provide: (f) => EditorView.decorations.from(f),
})

const zhFixTheme = EditorView.theme({
  '.cm-zhfix-mark': {
    // 与 ProseMirror suggestion-mark 风格类似——温和黄背景，过渡淡出
    backgroundColor: 'var(--zhfix-bg, rgba(248, 196, 84, 0.32))',
    borderRadius: '2px',
    transition: 'background-color 400ms ease-out',
  },
})

export const zhFixHighlightExtension = [zhFixField, zhFixTheme]

/**
 * 给指定 view 应用一组 fix 装饰，并在 5s 后自动清掉。
 * 反复调用：上一组未到期会被新的一组覆盖，timer 重新起算（用户连点两次"修复"是合理路径）。
 */
const timers = new WeakMap<EditorView, number>()

export function applyZhFixHighlight(
  view: EditorView,
  ranges: readonly { from: number; to: number }[],
): void {
  if (ranges.length === 0) return
  view.dispatch({ effects: setRangesEffect.of(ranges) })
  const prev = timers.get(view)
  if (prev !== undefined) window.clearTimeout(prev)
  const handle = window.setTimeout(() => {
    timers.delete(view)
    try {
      view.dispatch({ effects: setRangesEffect.of(null) })
    } catch {
      // view 已销毁
    }
  }, HIGHLIGHT_DURATION_MS)
  timers.set(view, handle)
}
