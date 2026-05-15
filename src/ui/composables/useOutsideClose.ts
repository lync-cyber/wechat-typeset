/**
 * useOutsideClose —— 点击元素外部 / 按 Esc 触发关闭。服务于"无 mask、需要监听
 * 全局 mousedown"的弹层场景（如 Toolbar popover）；CommandPalette / HelpPanel
 * 走 Vue 原生 `@click.self` 在 mask 上即可，不必用本 composable。
 *
 * 设计：
 *   - 监听 `mousedown` 而非 `click`：点击后立即关闭，避免后续 onClick 闯入新状态
 *   - 通过 `active` ref 控制挂载——弹层关时直接撤监听，省掉每次点击的元素链路检查
 *   - 元素可以是 ref<HTMLElement> 或 ref<HTMLElement[]>（多锚点弹层）
 *
 * SSR：直接读 window/document，被 SSR 引用会报错；UI 原语本只在客户端跑。
 *
 * 使用：
 *   const popoverRef = ref<HTMLElement | null>(null)
 *   useOutsideClose(popoverRef, () => { open.value = false }, { active: open })
 */

import { onBeforeUnmount, watch, type Ref } from 'vue'

export interface UseOutsideCloseOptions {
  /**
   * 弹层是否激活。仅当 .value === true 时挂载 mousedown / keydown 监听；
   * 关闭后自动 detach，避免 idle 期消耗。
   *
   * 不传则始终激活（适合"弹层组件挂载即活"的简化场景）。
   */
  active?: Ref<boolean>
  /** 是否监听 Esc 关闭。默认 true。 */
  escape?: boolean
}

type OutsideAnchor =
  | Ref<HTMLElement | null>
  | Ref<HTMLElement[]>
  | (() => HTMLElement | HTMLElement[] | null)

export function useOutsideClose(
  anchor: OutsideAnchor,
  onClose: () => void,
  options: UseOutsideCloseOptions = {},
): void {
  const { active, escape = true } = options

  function resolveAnchors(): HTMLElement[] {
    const raw = typeof anchor === 'function' ? anchor() : anchor.value
    if (!raw) return []
    return Array.isArray(raw) ? raw.filter(Boolean) : [raw]
  }

  function onMouseDown(ev: MouseEvent) {
    const anchors = resolveAnchors()
    if (anchors.length === 0) return
    const target = ev.target as Node | null
    if (!target) return
    for (const el of anchors) {
      if (el.contains(target)) return
    }
    onClose()
  }

  function onKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Escape') {
      onClose()
    }
  }

  function attach() {
    window.addEventListener('mousedown', onMouseDown, true)
    if (escape) window.addEventListener('keydown', onKeyDown)
  }

  function detach() {
    window.removeEventListener('mousedown', onMouseDown, true)
    if (escape) window.removeEventListener('keydown', onKeyDown)
  }

  if (active) {
    watch(
      active,
      (v) => {
        if (v) attach()
        else detach()
      },
      { immediate: true },
    )
  } else {
    attach()
  }

  onBeforeUnmount(detach)
}
