/**
 * 桌面分隔条：viewport 追踪 + editor max 宽度计算 + 越界回收
 *
 * 抽出动机：App.vue 原本在 setup 顶部塞 4 个常量 + viewportW ref + resize 监听
 * + editorMaxWidth computed + 越界 watch ~15 行；与组合根装配混在一起。本文件
 * 把这段聚合到一处，App.vue 调用一次拿回 { editorMaxWidth }。
 *
 * 常量与 PaneSplitter.vue / 全局 CSS 的 `var(--preview-w)`、`var(--sp-7)` 必须
 * 同步——预览栏 375px 是 WeChat 保真宽度，分隔条 6px，留 8px 防贴边。
 */
import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

const PREVIEW_PANE_W = 407 // var(--preview-w) 375 + var(--sp-7) 32
const SPLITTER_W = 6
const EDGE_PAD = 8

/** 编辑栏最小宽度——PaneSplitter 用作下限；导出给模板与本地 max 计算共享。 */
export const EDITOR_MIN_W = 320

export interface PaneSizingDeps {
  /** 编辑栏显式像素宽度；超出 max 时被本 composable 自动回收 */
  editorWidth: Ref<number | null>
}

export function usePaneSizing(deps: PaneSizingDeps) {
  const viewportW = ref(window.innerWidth)

  function trackViewport() {
    viewportW.value = window.innerWidth
  }

  onMounted(() => window.addEventListener('resize', trackViewport))
  onBeforeUnmount(() => window.removeEventListener('resize', trackViewport))

  const editorMaxWidth = computed(() =>
    Math.max(EDITOR_MIN_W, viewportW.value - PREVIEW_PANE_W - SPLITTER_W - EDGE_PAD),
  )

  // 视口缩小到当前 editorWidth 装不下 → 自动回收到 max；否则预览栏会被挤出窗口
  watch([viewportW, editorMaxWidth], () => {
    if (deps.editorWidth.value !== null && deps.editorWidth.value > editorMaxWidth.value) {
      deps.editorWidth.value = editorMaxWidth.value
    }
  })

  return { editorMaxWidth, viewportW }
}
