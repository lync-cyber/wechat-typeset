/**
 * 移动端工具栏"标题行"自动收起 —— 向下滚动时把 40px 标题行滑出视口让位给写作区，
 * 向上滚动或回到顶部时立即恢复。
 *
 * 触发源：本 composable 不直接监听 DOM，而是由 App.vue 在 editor/preview 的 scroll
 * ratio 变更时调用 `observe(ratio, side)`——和 scrollSync 复用同一组事件，避免重复
 * 挂监听到 cm-scroller / iframe.contentDocument。
 *
 * 判定策略：
 *   - 仅在 (max-width: 767px) 断点内启用（桌面端不收起，CSS 与 ref 双重保险）
 *   - 单次 delta 阈值 0.01（噪声过滤）；ratio<0.02 视为接近顶部 → 总是显示
 *   - 没用滚动绝对像素值是为了适配 editor / preview 高度不同（同一比例已归一化）
 */
import { onBeforeUnmount, ref } from 'vue'
import { MOBILE_MEDIA_QUERY } from '../../app/layoutMode'

const DELTA_THRESHOLD = 0.01
const TOP_REVEAL_THRESHOLD = 0.02

export function useToolbarCollapse() {
  const collapsed = ref(false)
  const isMobile = ref(false)
  const lastRatio: Record<'editor' | 'preview', number> = { editor: 0, preview: 0 }

  let mq: MediaQueryList | null = null
  function syncMobile() {
    isMobile.value = mq?.matches ?? false
    if (!isMobile.value) collapsed.value = false
  }

  if (typeof window !== 'undefined') {
    mq = window.matchMedia(MOBILE_MEDIA_QUERY)
    syncMobile()
    mq.addEventListener('change', syncMobile)
  }

  onBeforeUnmount(() => {
    mq?.removeEventListener('change', syncMobile)
  })

  function observe(ratio: number, side: 'editor' | 'preview') {
    if (!isMobile.value) return
    const prev = lastRatio[side]
    const delta = ratio - prev
    lastRatio[side] = ratio
    // 接近顶部 → 立即显示标题行（用户大概是要切草稿或换主题）
    if (ratio < TOP_REVEAL_THRESHOLD) {
      collapsed.value = false
      return
    }
    if (Math.abs(delta) < DELTA_THRESHOLD) return
    collapsed.value = delta > 0
  }

  return { collapsed, observe }
}
