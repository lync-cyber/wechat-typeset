/**
 * 导出动作集合：HTML / Markdown / 长图。
 *
 * 三个导出在流程上共享同一个前置：flush 防抖、取当前 render 产物、按草稿标题产文件名。
 * 副作用入口（pingTransient / persistentError）由调用方注入，避免与具体 UI 反馈耦合。
 */

import type { Ref } from 'vue'
import type { RenderOutput } from '../pipeline'
import type { Theme } from '../themes/types'
import { exportHtml, exportImage, exportMd } from '../clipboard/exportFile'

export interface ExportActionsDeps {
  md: Ref<string>
  rendered: Ref<RenderOutput>
  flush: () => void
  activeTheme: Ref<Theme>
  /** 取预览 iframe 的 body，失败返回 null（长图渲染源） */
  getPreviewBody: () => HTMLElement | null
  /** 文件名前缀（不含扩展名），由上层按草稿标题派生 */
  fileStem: () => string
  pingTransient: (msg: string, ms?: number) => void
  setPersistentError: (msg: string | null) => void
}

export function useExportActions(deps: ExportActionsDeps) {
  function doExportHtml() {
    deps.flush()
    const colors = deps.activeTheme.value.tokens.colors
    exportHtml(`${deps.fileStem()}.html`, deps.rendered.value.html, {
      background: colors.bg,
      color: colors.text,
    })
    deps.pingTransient('已导出 HTML')
  }

  function doExportMd() {
    exportMd(`${deps.fileStem()}.md`, deps.md.value)
    deps.pingTransient('已导出 Markdown')
  }

  async function doExportImage() {
    deps.pingTransient('长图渲染中…', 4000)
    const body = deps.getPreviewBody()
    if (!body) {
      deps.setPersistentError('长图导出失败：未找到预览节点')
      return
    }
    const result = await exportImage(body, `${deps.fileStem()}.png`, {
      background: deps.activeTheme.value.tokens.colors.bg,
    })
    if (result.ok) deps.pingTransient('已导出长图')
    else deps.setPersistentError(`长图导出失败：${result.error ?? '未知错误'}`)
  }

  return { doExportHtml, doExportMd, doExportImage }
}
