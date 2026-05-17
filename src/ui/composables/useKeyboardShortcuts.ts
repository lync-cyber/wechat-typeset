/**
 * 全局快捷键：Meta 组合 + `?` 帮助 + Esc 关闭浮层。
 *
 * 设计约束：
 *   - 只装 window.keydown 一个监听器，卸载时清理
 *   - Meta 组合键无论是否在 input/editor 焦点都会触发（编辑器里 ⌘S 保存是普遍预期）
 *   - `?` 只在非 editable 节点触发，避免在输入框里打问号被截获
 *   - Esc 关闭最顶层浮层（命令面板 > 帮助 > 左右抽屉），让一个 Esc 永远能"退出去"
 *
 * handlers 由调用方提供——本 composable 不知道"复制""导出""打开抽屉"的具体实现，
 * 只负责把键盘按键映射到 handler key。
 */

import { onBeforeUnmount, onMounted } from 'vue'

export interface ShortcutHandlers {
  openCommand: () => void
  copy: () => void
  save: () => void
  toggleCustomizer: () => void
  toggleDrafts: () => void
  toggleComponents: () => void
  exportHtml: () => void
  exportMd: () => void
  openHelp: () => void
  /** 关闭 command palette；返回 true 说明已消费该按键 */
  closeCommand: () => boolean
  /** 关闭 help panel；返回 true 说明已消费该按键 */
  closeHelp: () => boolean
  /** 关闭左右抽屉（DraftDrawer / ComponentPalette / ColorCustomizer / PublishChecklist /
   * PersonaStudio）；返回 true 说明已消费该按键。优先级最低，让最近开启的浮层先消费。 */
  closeDrawers: () => boolean
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  function onShortcut(e: KeyboardEvent) {
    const meta = e.ctrlKey || e.metaKey
    const target = e.target as HTMLElement | null
    const inEditable = !!target?.closest('input, textarea, [contenteditable="true"], .cm-editor')

    if (meta) {
      const key = e.key.toLowerCase()
      if (key === 'k' && !e.shiftKey) {
        e.preventDefault()
        handlers.openCommand()
        return
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handlers.copy()
        return
      }
      if (key === 's' && !e.shiftKey) {
        e.preventDefault()
        handlers.save()
        return
      }
      if (key === 'c' && e.shiftKey) {
        e.preventDefault()
        handlers.toggleCustomizer()
        return
      }
      if (key === 'd' && e.shiftKey) {
        e.preventDefault()
        handlers.toggleDrafts()
        return
      }
      if (key === 'p' && e.shiftKey) {
        e.preventDefault()
        handlers.toggleComponents()
        return
      }
      if (key === 'h' && e.shiftKey) {
        e.preventDefault()
        handlers.exportHtml()
        return
      }
      if (key === 'm' && e.shiftKey) {
        e.preventDefault()
        handlers.exportMd()
        return
      }
    }
    if (e.key === '?' && !inEditable) {
      e.preventDefault()
      handlers.openHelp()
      return
    }
    if (e.key === 'Escape') {
      // Esc 在 input/cm 内时已被 closeCommand/closeHelp 各自的 v-if 浮层吞掉时
      // 走不到这里；这里只处理"光秃秃的页面 Esc"。
      // 抽屉里的 input（DraftDrawer 重命名 / 搜索）走 closeDrawers 关掉整个抽屉
      // 是合理的预期——同 macOS Finder 侧栏行为一致。
      if (handlers.closeCommand()) return
      if (handlers.closeHelp()) return
      if (handlers.closeDrawers()) return
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onShortcut)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onShortcut)
  })
}
