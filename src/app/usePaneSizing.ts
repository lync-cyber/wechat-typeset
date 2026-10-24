/** 按编辑工作区的实际宽度限制分栏；未传容器时兼容原有整窗布局。 */
import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

// 与 App 写作预览栏保持一致：375px 正文 + 左右各 16px 留白。
const PREVIEW_PANE_W = 407
const SPLITTER_W = 6
const EDGE_PAD = 8

export const EDITOR_MIN_W = 320

export interface PaneSizingDeps {
  editorWidth: Ref<number | null>
  /** 仅包含 Editor、PaneSplitter、Preview，不包含文章库和右侧工具。 */
  container?: Ref<HTMLElement | null>
}

export function usePaneSizing(deps: PaneSizingDeps) {
  const viewportW = ref(window.innerWidth)
  const containerW = ref<number | null>(null)
  let observer: ResizeObserver | null = null
  let stopWatchingContainer: (() => void) | undefined

  function measureContainer(container: HTMLElement) {
    const width = container.getBoundingClientRect().width
    // 临时隐藏时不要把作者的分栏宽度压成最小值。
    if (width > 0) containerW.value = width
  }

  function trackViewport() {
    viewportW.value = window.innerWidth
    if (deps.container?.value) measureContainer(deps.container.value)
  }

  onMounted(() => {
    window.addEventListener('resize', trackViewport)
    if (!deps.container) return

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver((entries) => {
        const entry = entries.find((item) => item.target === deps.container?.value)
        if (entry && entry.contentRect.width > 0) containerW.value = entry.contentRect.width
      })
    }
    stopWatchingContainer = watch(deps.container, (container) => {
      observer?.disconnect()
      containerW.value = null
      if (!container) return
      measureContainer(container)
      observer?.observe(container)
    }, { immediate: true, flush: 'post' })
  })

  const editorMaxWidth = computed(() =>
    Math.max(EDITOR_MIN_W, (containerW.value ?? viewportW.value) - PREVIEW_PANE_W - SPLITTER_W - EDGE_PAD),
  )

  watch(editorMaxWidth, (maxWidth) => {
    if (deps.editorWidth.value !== null && deps.editorWidth.value > maxWidth) {
      deps.editorWidth.value = maxWidth
    }
  }, { immediate: true })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', trackViewport)
    stopWatchingContainer?.()
    observer?.disconnect()
  })

  return { editorMaxWidth, viewportW }
}
