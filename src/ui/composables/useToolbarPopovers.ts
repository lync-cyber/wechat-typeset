/**
 * Toolbar 两个 popover（主题选择 / 更多操作）的开关 + 外部关闭联动。
 *
 * 抽出动机：Toolbar.vue 原本把 themeOpen / overflowOpen 两个 ref、互斥逻辑、
 * outside-click、Esc 监听、watch 释放、onBeforeUnmount 兜底散落 30 行。本
 * composable 把这些聚合到一处——Toolbar 模板里只需 `popovers.theme`、
 * `popovers.overflow`、`popovers.toggleTheme()` 即可。
 *
 * 行为契约：
 *   - 同时只有一个 popover 打开（toggleX 自动关另一个）
 *   - 任一打开时挂全局 mousedown + keydown，关闭时立即解绑——窗口频繁切换不会
 *     残留监听
 *   - data-popover-root 是父节点标记；外部点击不在标记内即视为"想关闭"
 */

import { onBeforeUnmount, ref, watch } from 'vue'

export function useToolbarPopovers() {
  const theme = ref(false)
  const overflow = ref(false)
  const outlink = ref(false)
  const draft = ref(false)

  function toggleTheme() {
    theme.value = !theme.value
    overflow.value = false
    outlink.value = false
    draft.value = false
  }

  function toggleOverflow() {
    overflow.value = !overflow.value
    theme.value = false
    outlink.value = false
    draft.value = false
  }

  function toggleOutlink() {
    outlink.value = !outlink.value
    theme.value = false
    overflow.value = false
    draft.value = false
  }

  function toggleDraft() {
    draft.value = !draft.value
    theme.value = false
    overflow.value = false
    outlink.value = false
  }

  function closeAll() {
    theme.value = false
    overflow.value = false
    outlink.value = false
    draft.value = false
  }

  function onOutside(ev: MouseEvent) {
    const target = ev.target as HTMLElement | null
    if (!target) return
    if (!target.closest('[data-popover-root]')) closeAll()
  }

  function onEsc(ev: KeyboardEvent) {
    if (ev.key === 'Escape') closeAll()
  }

  watch([theme, overflow, outlink, draft], ([t, o, l, d]) => {
    if (t || o || l || d) {
      window.addEventListener('mousedown', onOutside)
      window.addEventListener('keydown', onEsc)
    } else {
      window.removeEventListener('mousedown', onOutside)
      window.removeEventListener('keydown', onEsc)
    }
  })

  onBeforeUnmount(() => {
    window.removeEventListener('mousedown', onOutside)
    window.removeEventListener('keydown', onEsc)
  })

  return {
    theme, overflow, outlink, draft,
    toggleTheme, toggleOverflow, toggleOutlink, toggleDraft, closeAll,
  }
}
