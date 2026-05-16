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

const KEYS = ['theme', 'overflow', 'outlink', 'draft'] as const
type Key = (typeof KEYS)[number]

export function useToolbarPopovers() {
  const refs: Record<Key, ReturnType<typeof ref<boolean>>> = {
    theme: ref(false),
    overflow: ref(false),
    outlink: ref(false),
    draft: ref(false),
  }

  // 互斥开关：翻转 target，其余强制关闭——保证同时只有一个 popover 在屏。
  function toggle(target: Key) {
    for (const k of KEYS) refs[k].value = k === target ? !refs[k].value : false
  }

  function closeAll() {
    for (const k of KEYS) refs[k].value = false
  }

  function onOutside(ev: MouseEvent) {
    const target = ev.target as HTMLElement | null
    if (!target) return
    if (!target.closest('[data-popover-root]')) closeAll()
  }

  function onEsc(ev: KeyboardEvent) {
    if (ev.key === 'Escape') closeAll()
  }

  watch(
    [refs.theme, refs.overflow, refs.outlink, refs.draft],
    ([t, o, l, d]) => {
      if (t || o || l || d) {
        window.addEventListener('mousedown', onOutside)
        window.addEventListener('keydown', onEsc)
      } else {
        window.removeEventListener('mousedown', onOutside)
        window.removeEventListener('keydown', onEsc)
      }
    },
  )

  onBeforeUnmount(() => {
    window.removeEventListener('mousedown', onOutside)
    window.removeEventListener('keydown', onEsc)
  })

  return {
    theme: refs.theme,
    overflow: refs.overflow,
    outlink: refs.outlink,
    draft: refs.draft,
    toggleTheme: () => toggle('theme'),
    toggleOverflow: () => toggle('overflow'),
    toggleOutlink: () => toggle('outlink'),
    toggleDraft: () => toggle('draft'),
    closeAll,
  }
}
