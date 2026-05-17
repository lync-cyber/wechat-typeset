<script setup lang="ts">
/**
 * CodeMirrorPane —— SourceModePanel 用的通用 CM6 编辑器单元（步骤 5.1）。
 *
 * 与 MarkdownInput.vue 区别：MarkdownInput 只 hardcode markdown 语法；本组件支持
 * lang prop 在 'css' / 'html' 之间动态切换，且能注入 extraExtensions（如
 * createUserVariantCSSLinter() 产出的红波浪 linter）。
 *
 * Compartment 用法：lang 与 extraExtensions 都包在 Compartment 里；prop 变化时调
 * `view.dispatch({ effects: compartment.reconfigure(newExt) })` 局部替换，无需重建
 * EditorView。这是 CM6 推荐的"运行时切语法"方式。
 *
 * 双向同步纪律：
 *   - updateListener 监听 docChanged → emit 'update:value'
 *   - props.value watcher 在外部值变时 dispatch changes
 *   - 用 `syncing` 临时 flag 避免回环：emit 时把 syncing=true，
 *     watcher 在 syncing 时跳过 dispatch（emit 引发父组件改 value 又触发 watcher，
 *     若不防护会循环 dispatch + 触发更多 update 事件）
 */
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { Compartment, EditorSelection, EditorState, type Extension } from '@codemirror/state'
import { EditorView, keymap, lineNumbers } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { css as langCss } from '@codemirror/lang-css'
import { html as langHtml } from '@codemirror/lang-html'
import { oneDark } from '@codemirror/theme-one-dark'

export type CodeMirrorLang = 'css' | 'html'

const props = defineProps<{
  value: string
  lang: CodeMirrorLang
  extraExtensions?: Extension[]
}>()

const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>()

const host = ref<HTMLDivElement | null>(null)
let view: EditorView | null = null
const langCompartment = new Compartment()
const extraCompartment = new Compartment()
let syncing = false

function buildLang(lang: CodeMirrorLang): Extension {
  return lang === 'css' ? langCss() : langHtml()
}

onMounted(() => {
  if (!host.value) return
  const state = EditorState.create({
    doc: props.value,
    extensions: [
      lineNumbers(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
      langCompartment.of(buildLang(props.lang)),
      extraCompartment.of(props.extraExtensions ?? []),
      oneDark,
      EditorView.lineWrapping,
      EditorView.updateListener.of((upd) => {
        if (upd.docChanged) {
          syncing = true
          emit('update:value', upd.state.doc.toString())
          // micro-task 后清 flag：emit 是同步的，父组件 reactive 写 props 后 watcher 排到
          // 当前 tick 末尾；用 queueMicrotask 让 flag 在 watcher 执行后再放下
          queueMicrotask(() => { syncing = false })
        }
      }),
      EditorView.theme({
        '&': { height: '100%', fontSize: '12px' },
        '.cm-scroller': { overflow: 'auto' },
        '.cm-content': { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
      }),
    ],
  })
  view = new EditorView({ state, parent: host.value })
})

watch(
  () => props.value,
  (val) => {
    if (!view) return
    if (syncing) return
    const current = view.state.doc.toString()
    if (val !== current) {
      view.dispatch({ changes: { from: 0, to: current.length, insert: val } })
    }
  },
)

watch(
  () => props.lang,
  (lang) => {
    if (!view) return
    view.dispatch({ effects: langCompartment.reconfigure(buildLang(lang)) })
  },
)

watch(
  () => props.extraExtensions,
  (exts) => {
    if (!view) return
    view.dispatch({ effects: extraCompartment.reconfigure(exts ?? []) })
  },
)

onBeforeUnmount(() => {
  view?.destroy()
  view = null
})

/**
 * 在 doc 里 substring 查找并把光标移到匹配处 + scrollIntoView。
 *
 * 用途：PatchInspector 点 sample → SourceModePanel 找到含 sample.before 的 slot →
 * 切到对应 tab → 调本方法把 CM 光标定位到违规位置，让用户立即看到该改哪里。
 *
 * 多处匹配取首处（与 useUserVariantLint.locateDecl 同语义，简单可预测）；零匹配返回
 * false 让父组件决定 fallback（当前直接静默忽略——查不到通常意味着 sample 来自外层
 * variant 渲染产物而非用户 patch，跳到任意位置反而误导）。
 */
function jumpToSubstring(needle: string): boolean {
  if (!view || !needle) return false
  const doc = view.state.doc.toString()
  const idx = doc.indexOf(needle)
  if (idx < 0) return false
  view.dispatch({
    selection: EditorSelection.cursor(idx),
    effects: EditorView.scrollIntoView(idx, { y: 'center' }),
  })
  view.focus()
  return true
}

defineExpose({ jumpToSubstring })
</script>

<template>
  <div class="cm-pane" ref="host" />
</template>

<style scoped>
.cm-pane {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--editor-bg);
  border-radius: var(--radius-2);
  border: 1px solid var(--border);
}
.cm-pane :deep(.cm-editor) {
  height: 100%;
}
</style>
