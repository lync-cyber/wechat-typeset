/**
 * 导出动作集合：HTML / Markdown / 长图。
 *
 * 三个导出在流程上共享同一个前置：flush 防抖、取当前 render 产物、按草稿标题产文件名。
 * 副作用入口（pingTransient / persistentError）由调用方注入，避免与具体 UI 反馈耦合。
 */

import { ref, type Ref } from 'vue'
import type { RenderOutput } from '../../core/pipeline'
import type { Theme } from '../../core/themes/types'
import { exportHtml, exportImage, exportMd } from '../../infra/exporters/exportFile'

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
  /**
   * 三个导出入口共享互斥锁：
   *   - 长图导出（doExportImage）持续 100~1000ms，期间快速连点会启动多个 html2canvas
   *     实例并发渲染，引发显存膨胀 + 多次浏览器下载弹窗
   *   - HTML / MD 同步导出本身瞬时完成，但与长图并发也会触发多次下载
   *   - 任一入口在跑时其他入口被静默忽略；UI 上靠 transient 文案"长图渲染中…"提示
   */
  const isExporting = ref(false)

  function doExportHtml() {
    if (isExporting.value) return
    isExporting.value = true
    try {
      deps.flush()
      const colors = deps.activeTheme.value.tokens.colors
      exportHtml(`${deps.fileStem()}.html`, deps.rendered.value.html, {
        background: colors.bg,
        color: colors.text,
      })
      deps.pingTransient('已导出 HTML')
    } finally {
      isExporting.value = false
    }
  }

  function doExportMd() {
    if (isExporting.value) return
    isExporting.value = true
    try {
      exportMd(`${deps.fileStem()}.md`, deps.md.value)
      deps.pingTransient('已导出 Markdown')
    } finally {
      isExporting.value = false
    }
  }

  async function doExportImage() {
    if (isExporting.value) return
    isExporting.value = true
    try {
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
    } finally {
      isExporting.value = false
    }
  }

  return { doExportHtml, doExportMd, doExportImage, isExporting }
}
