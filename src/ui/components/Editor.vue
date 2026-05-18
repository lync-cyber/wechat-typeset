<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { Compartment, EditorState, type Extension } from '@codemirror/state'
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { createContainerAutocomplete, createContainerLinter } from '../editor-extensions'
import { containerAwareExtensions } from '../editor-container-aware'
import { applyZhFixHighlight, zhFixHighlightExtension } from '../editor-extensions-zhfix'
import { foldGutter, foldKeymap } from '@codemirror/language'
import { sanitizePastedHtml, shouldSanitize } from '../../infra/clipboard/pasteSanitize'
import { uploadImages, isImageFile } from '../../infra/clipboard/imageIntake'
import { uiThemeMode } from '../../app/uiTheme'

/**
 * 编辑器 chrome 主题：以 CSS 变量驱动，自动跟随 [data-theme="dark"] 切换。
 * 不在此处写死颜色，颜色定义在 tokens.css 的 --editor-* 段。CodeMirror 会把这段
 * 转成 <style> 注入 ShadowDOM 之外的 head——CSS 变量随 :root / [data-theme]
 * 级联，无需 reconfigure。
 */
const editorChromeTheme = EditorView.theme({
  '&': {
    backgroundColor: 'var(--editor-bg)',
    color: 'var(--editor-text)',
    height: '100%',
    fontSize: '14px',
  },
  '.cm-scroller': { overflow: 'auto' },
  '.cm-content': { caretColor: 'var(--accent)' },
  '&.cm-focused .cm-cursor': { borderLeftColor: 'var(--accent)' },
  '.cm-gutters': {
    backgroundColor: 'var(--editor-surface)',
    color: 'var(--editor-linenum)',
    border: 'none',
  },
  '.cm-activeLine': { backgroundColor: 'var(--editor-active)' },
  '.cm-activeLineGutter': { backgroundColor: 'transparent' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
    backgroundColor: 'var(--editor-selection)',
  },
})

/**
 * 语法染色 compartment —— UI 亮色时返回空，使用浏览器默认（黑字纸底）；
 * UI 暗色时挂 oneDark 提供整套 CodeMirror 暗色 + Markdown 语法高亮。
 * 两侧 chrome 还是同一个 editorChromeTheme 兜底，互相不打架（oneDark
 * 给的颜色优先级更高，会覆盖 var()——这正是我们想要的）。
 */
const syntaxCompartment = new Compartment()
function syntaxExtensionFor(mode: 'light' | 'dark'): Extension {
  return mode === 'dark' ? oneDark : []
}

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

/**
 * F3 一键修复中文排版后，把命中范围短时间高亮 5s。
 * actions.handleFixZhTypo 流程：先用 fixZhTypoWithRanges 拿 fixed + ranges，
 * 写 md.value = fixed（触发 modelValue 回流并更新 doc），随后调本方法。
 * doc 更新与高亮分两次 dispatch；ranges 已是 fixed 文本中的最终位置。
 */
function highlightZhFix(ranges: readonly { from: number; to: number }[]): void {
  if (!view) return
  applyZhFixHighlight(view, ranges)
}

defineExpose({
  insertAtCursor,
  getSelectedText,
  getScroller,
  scrollToRatio,
  focus,
  highlightZhFix,
})

/** 在指定选区插入一段文本，并把光标落在插入末尾。 */
function replaceSelection(targetView: EditorView, insert: string): void {
  const { from, to } = targetView.state.selection.main
  targetView.dispatch({
    changes: { from, to, insert },
    selection: { anchor: from + insert.length },
  })
}

/**
 * 从 DataTransfer.files / DataTransfer.items 里筛出图片文件。
 * paste 的截图通常只在 items，drop 的本地图片在 files —— 合并去重。
 */
function collectImageFiles(data: DataTransfer | null): File[] {
  if (!data) return []
  const out: File[] = []
  const seen = new Set<File>()
  for (const file of Array.from(data.files ?? [])) {
    if (isImageFile(file) && !seen.has(file)) {
      out.push(file)
      seen.add(file)
    }
  }
  for (const item of Array.from(data.items ?? [])) {
    if (item.kind !== 'file') continue
    const file = item.getAsFile()
    if (file && isImageFile(file) && !seen.has(file)) {
      out.push(file)
      seen.add(file)
    }
  }
  return out
}

/**
 * 拦截粘贴：优先级
 *   1. 剪贴板含图片 → 异步上传并插入 `![](...)`（占位提示 → 上传完替换）
 *   2. 剪贴板含 text/html 且非平凡 → turndown 降级为 markdown
 *   3. 纯文本 / 空白 / 已经是 markdown → 让 CodeMirror 默认处理
 * 返回 true 表示已消费事件、CM 不再走默认流程。
 */
function handlePaste(ev: ClipboardEvent, targetView: EditorView): boolean {
  const data = ev.clipboardData
  const images = collectImageFiles(data)
  if (images.length > 0) {
    ev.preventDefault()
    insertImagesAsync(targetView, images)
    return true
  }
  if (!shouldSanitize(data)) return false
  const html = data!.getData('text/html')
  const md = sanitizePastedHtml(html)
  if (!md) return false
  ev.preventDefault()
  replaceSelection(targetView, md)
  return true
}

/**
 * 拦截拖拽：DataTransfer.files 里的图片走 provider 上传；非图片拖拽交还默认。
 */
function handleDrop(ev: DragEvent, targetView: EditorView): boolean {
  const images = collectImageFiles(ev.dataTransfer)
  if (images.length === 0) return false
  ev.preventDefault()
  insertImagesAsync(targetView, images)
  return true
}

/**
 * 先占位插入"上传中"提示，再异步换成最终 markdown。上传串行、保持顺序。
 * 失败项会被 uploadImages 写成 `<!-- image upload failed -->` 注释，方便作者排查。
 */
function insertImagesAsync(targetView: EditorView, files: readonly File[]): void {
  const placeholder = `<!-- 图片上传中… (${files.length}) -->`
  const { from } = targetView.state.selection.main
  replaceSelection(targetView, placeholder)
  void uploadImages(files).then((md) => {
    // view.destroy() 后 state 会抛；用 try 做 best-effort，销毁场景静默
    try {
      const current = targetView.state.doc.toString()
      const idx = current.indexOf(placeholder, Math.max(0, from - 1))
      if (idx < 0) return // 作者已经自己删掉占位
      targetView.dispatch({
        changes: { from: idx, to: idx + placeholder.length, insert: md },
      })
    } catch {
      // editor 已销毁，放弃
    }
  })
}

/**
 * 移动端虚拟键盘上浮时把光标滚到可视区中部。
 *
 * 现象：iOS Safari / Android Chrome 上 CodeMirror focus 后键盘弹起会遮挡底部大半屏；
 * CM 自带的 scrollIntoView 基于 window.innerHeight，键盘弹起时它以为"视口还是全屏"，
 * 光标就停在键盘后面看不见。
 *
 * 解决：监听 window.visualViewport.resize —— 键盘弹起时 visualViewport.height 会缩水，
 * 触发一次 scrollIntoView(head, { y: 'center' })，让 CM 按"减去键盘后的实际视区"重新定位。
 *
 * 保护：
 *   - 仅 viewport width ≤ 767 时启用（桌面键盘弹起不关注）
 *   - visualViewport 不支持（旧 Safari / 某些 Android）时降级为 no-op
 *   - 高度变化 < 100px 不触发（浏览器工具栏隐藏也会缩水，阈值避开）
 */
const MOBILE_BREAKPOINT = 767
const KEYBOARD_HEIGHT_THRESHOLD = 100

function onVisualViewportResize() {
  if (!view) return
  if (window.innerWidth > MOBILE_BREAKPOINT) return
  const vv = window.visualViewport
  if (!vv) return
  const keyboardHeight = window.innerHeight - vv.height
  if (keyboardHeight < KEYBOARD_HEIGHT_THRESHOLD) return
  const { head } = view.state.selection.main
  view.dispatch({
    effects: EditorView.scrollIntoView(head, { y: 'center' }),
  })
}

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
      foldGutter(),
      highlightActiveLine(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap, ...foldKeymap, indentWithTab]),
      markdown(),
      // 先放 chrome 兜底，再放 syntax compartment——compartment 内的 oneDark
      // 在 dark 时会覆盖 chrome 颜色（顺序后定义优先）；light 时 compartment 为空,
      // chrome 的 CSS 变量配色保持生效。
      editorChromeTheme,
      syntaxCompartment.of(syntaxExtensionFor(uiThemeMode.value)),
      createContainerAutocomplete(),
      createContainerLinter(),
      containerAwareExtensions,
      ...zhFixHighlightExtension,
      EditorView.lineWrapping,
      EditorView.updateListener.of((upd) => {
        if (upd.docChanged) {
          emit('update:modelValue', upd.state.doc.toString())
        }
      }),
      EditorView.domEventHandlers({
        scroll: onScroll,
        paste: (ev, v) => handlePaste(ev, v),
        drop: (ev, v) => handleDrop(ev, v),
      }),
    ],
  })
  view = new EditorView({ state, parent: host.value })
}

onMounted(() => {
  createView(props.modelValue)
  // 移动端键盘遮挡防护；visualViewport 不存在时不 attach 等于 no-op
  window.visualViewport?.addEventListener('resize', onVisualViewportResize)
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

// UI 主题切换时 reconfigure syntax compartment——光标 / 选区 / 撤销栈 保留
watch(uiThemeMode, (mode) => {
  if (!view) return
  view.dispatch({ effects: syntaxCompartment.reconfigure(syntaxExtensionFor(mode)) })
})

onBeforeUnmount(() => {
  window.visualViewport?.removeEventListener('resize', onVisualViewportResize)
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
