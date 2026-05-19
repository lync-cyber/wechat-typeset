/**
 * Command 类型从 CommandPalette.vue 抽出到独立 .ts，避免 *.vue catch-all shim
 * 屏蔽具名导出（TS2614）。CommandPalette / commands / HelpPanel 三方共享。
 */

export interface Command {
  id: string
  title: string
  group: string
  shortcut?: string
  keywords?: string
  run: () => void
}
