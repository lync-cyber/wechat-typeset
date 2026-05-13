<script setup lang="ts">
/**
 * Studio 内部的简化版 markdown CodeMirror 编辑器。
 *
 * 与 src/ui/components/Editor.vue 不共享 composable 的原因:
 *   - Editor.vue 负责文章主编辑器, 携带图片粘贴上传 / 拖拽 / 移动键盘视口校正 / 容器
 *     autocomplete + linter / 滚动节流 emit。这些都是文章场景需求。
 *   - Studio 编辑的是 snippet 片段, 文本通常 ≤ 20 行;以上功能除"容器 autocomplete + lint"
 *     之外都用不到, 强行抽 composable 会把可选项膨胀到 5-6 个 flag。
 *   - 校验由 validate.ts + Studio inline error 承担, lint 重叠功能可省。
 *
 * 故本组件直接持有最小 CodeMirror 配置(70 行), 双向 v-model 同步 props.modelValue。
 */
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, lineNumbers } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const host = ref<HTMLDivElement | null>(null)
let view: EditorView | null = null

onMounted(() => {
  if (!host.value) return
  const state = EditorState.create({
    doc: props.modelValue,
    extensions: [
      lineNumbers(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
      markdown(),
      oneDark,
      EditorView.lineWrapping,
      EditorView.updateListener.of((upd) => {
        if (upd.docChanged) {
          emit('update:modelValue', upd.state.doc.toString())
        }
      }),
      EditorView.theme({
        '&': { height: '100%', fontSize: '13px' },
        '.cm-scroller': { overflow: 'auto' },
      }),
    ],
  })
  view = new EditorView({ state, parent: host.value })
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
  <div class="md-input" ref="host" />
</template>

<style scoped>
.md-input {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--editor-bg);
  box-shadow: var(--shadow-inset);
  border-radius: var(--radius-2);
  border: 1px solid var(--border);
}
.md-input :deep(.cm-editor) {
  height: 100%;
}
</style>
