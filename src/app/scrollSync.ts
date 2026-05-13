/**
 * Editor ↔ Preview 滚动联动
 *
 * 一侧滚动时按比例驱动另一侧，~180ms 锁防止两侧 onScroll 互相反弹（"乒乓"）：
 * 来源标记 lastSyncSource 在锁窗口内拒绝反向同步，让人手停下后 anchor 站稳。
 *
 * 单独成文件是 R6 把 App.vue 拆装为组合根的一部分——App.vue 只关心两侧 ref 怎么传入，
 * 不再持有滚动控制状态。返回的两个回调原样挂到 Editor / Preview 的 `@scroll` 上。
 */
import type { Ref } from 'vue'

interface ScrollableRef {
  scrollToRatio: (ratio: number) => void
}

export interface UseScrollSyncOptions {
  editorRef: Ref<{ scrollToRatio?: (ratio: number) => void } | null>
  previewRef: Ref<ScrollableRef | null>
  /** 反向同步抑制窗口（ms）。默认 180——略大于 60fps 单帧（16.7ms × 10）。 */
  lockMs?: number
}

export function useScrollSync(opts: UseScrollSyncOptions) {
  const lockMs = opts.lockMs ?? 180
  let lastSyncTime = 0
  let lastSyncSource: 'editor' | 'preview' | null = null

  function onEditorScroll(ratio: number) {
    if (lastSyncSource === 'preview' && Date.now() - lastSyncTime < lockMs) return
    lastSyncSource = 'editor'
    lastSyncTime = Date.now()
    opts.previewRef.value?.scrollToRatio(ratio)
  }

  function onPreviewScroll(ratio: number) {
    if (lastSyncSource === 'editor' && Date.now() - lastSyncTime < lockMs) return
    lastSyncSource = 'preview'
    lastSyncTime = Date.now()
    opts.editorRef.value?.scrollToRatio?.(ratio)
  }

  return { onEditorScroll, onPreviewScroll }
}
