<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { createContainerAutocomplete, createContainerLinter } from './editor-extensions'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'scroll', ratio: number): void
}>()

const host = ref<HTMLDivElement | null>(null)
let view: EditorView | null = null

/** 在当前光标处插入一段文本（替换选区）；父组件通过 ref 调用 */
function insertAtCursor(text: string): void {
  if (!view) return
  const { from, to } = view.state.selection.main
  const needsLeadingNewline = from > 0 && view.state.doc.sliceString(Math.max(0, from - 1), from) !== '\n'
  const insert = (needsLeadingNewline ? '\n' : '') + text + (text.endsWith('\n') ? '' : '\n')
  view.dispatch({
    changes: { from, to, insert },
    selection: { anchor: from + insert.length },
  })
  view.focus()
}

/** 读取当前选区文本；无选区返回空串 */
function getSelectedText(): string {
  if (!view) return ''
  const { from, to } = view.state.selection.main
  if (from === to) return ''
  return view.state.doc.sliceString(from, to)
}

/** 获取 CodeMirror 的滚动容器（.cm-scroller）供外部做滚动联动 */
function getScroller(): HTMLElement | null {
  return view?.scrollDOM ?? null
}

/** 按比例滚动（0..1）。被父组件用于滚动联动；自身 scroll 事件不会再回 emit，由锁解决 */
function scrollToRatio(ratio: number): void {
  const el = getScroller()
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  if (max <= 0) return
  el.scrollTop = Math.max(0, Math.min(max, ratio * max))
}

/** 把光标所在位置滚动到可见区域（CM 自带的 best-effort） */
function focus(): void {
  view?.focus()
}

defineExpose({
  insertAtCursor,
  getSelectedText,
  getScroller,
  scrollToRatio,
  focus,
})

let lastEmit = 0
function onScroll(ev: Event) {
  const el = ev.target as HTMLElement | null
  if (!el) return
  const max = el.scrollHeight - el.clientHeight
  if (max <= 0) return
  // Throttle: emit at most ~60fps
  const now = Date.now()
  if (now - lastEmit < 16) return
  lastEmit = now
  emit('scroll', el.scrollTop / max)
}

function createView(doc: string) {
  if (!host.value) return
  const state = EditorState.create({
    doc,
    extensions: [
      lineNumbers(),
      highlightActiveLine(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
      markdown(),
      oneDark,
      createContainerAutocomplete(),
      createContainerLinter(),
      EditorView.lineWrapping,
      EditorView.updateListener.of((upd) => {
        if (upd.docChanged) {
          emit('update:modelValue', upd.state.doc.toString())
        }
      }),
      EditorView.domEventHandlers({ scroll: onScroll }),
      EditorView.theme({
        '&': { height: '100%', fontSize: '14px' },
        '.cm-scroller': { overflow: 'auto' },
      }),
    ],
  })
  view = new EditorView({ state, parent: host.value })
}

onMounted(() => {
  createView(props.modelValue)
})

watch(
  () => props.modelValue,
  (val) => {
    if (!view) return
    const current = view.state.doc.toString()
    if (val !== current) {
      view.dispatch({ changes: { from: 0, to: current.length, insert: val } })
    }
  },
)

onBeforeUnmount(() => {
  view?.destroy()
  view = null
})
</script>

<template>
  <div class="editor-host" ref="host" />
</template>

<style scoped>
.editor-host {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--editor-bg);
  box-shadow: var(--shadow-inset);
}
.editor-host :deep(.cm-editor) {
  height: 100%;
}
</style>
