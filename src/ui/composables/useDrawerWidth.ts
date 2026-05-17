/**
 * 右侧抽屉宽度的状态管理 + 本地持久化 + viewport 越界回收。
 *
 * 与 src/app/usePaneSizing.ts 同源思想：
 *   - 用户拖宽的像素值存 localStorage，刷新后恢复
 *   - 视口变窄时若 width > viewport 一半则自动回收，避免抽屉吃掉编辑器/预览栏
 *   - width === null 表示"未设置过"，由调用方走 CSS 默认变量
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { safeRead, safeWrite } from '../../infra/storage/_kv'

export interface DrawerWidthOptions {
  /** localStorage 持久化 key */
  storageKey: string
  /** 抽屉默认像素宽度（drag 起步基准 + CSS 兜底参照） */
  defaultWidth: number
  /** 最小宽度，默认 300 */
  min?: number
  /**
   * viewport 占比上限：抽屉最宽不超过 viewport × ratio。
   * 默认 0.6 = 60%，留下 40% 给编辑器 + 预览栏。
   */
  maxViewportRatio?: number
}

export function useDrawerWidth(opts: DrawerWidthOptions) {
  const min = opts.min ?? 300
  const ratio = opts.maxViewportRatio ?? 0.6

  // 从 localStorage 读初值；"null" 字面量 / 空 / 非法数都回退到 null（CSS 默认）
  const width = ref<number | null>(readInitial())

  function readInitial(): number | null {
    const raw = safeRead(opts.storageKey)
    if (raw === null || raw === '' || raw === 'null') return null
    const n = Number(raw)
    if (!Number.isFinite(n) || n < min) return null
    return n
  }

  const viewportW = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)
  function trackViewport() {
    viewportW.value = window.innerWidth
  }
  onMounted(() => window.addEventListener('resize', trackViewport))
  onBeforeUnmount(() => window.removeEventListener('resize', trackViewport))

  const maxWidth = computed(() => Math.max(min, Math.floor(viewportW.value * ratio)))

  // 持久化：null 写空串，等价于"清掉用户设置"
  watch(width, (v) => {
    safeWrite(opts.storageKey, v === null ? '' : String(v))
  })

  // 视口缩小越界 → 自动回收
  watch([viewportW, width], () => {
    if (width.value !== null && width.value > maxWidth.value) {
      width.value = maxWidth.value
    }
  })

  return {
    width,
    /** 当前允许的最大宽度（视口变化时自动更新） */
    maxWidth,
    /** 抽屉默认像素宽度（drag 起步基准） */
    defaultWidth: opts.defaultWidth,
    /** 抽屉最小像素宽度 */
    minWidth: min,
  }
}
