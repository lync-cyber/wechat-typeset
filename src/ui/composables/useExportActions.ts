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
import { exportCoverImage } from '../../infra/exporters/exportCover'
import { buildRuntimeCover, COVER_SIZES, type CoverSizeId } from '../../core/pipeline/cover/buildCover'
import { shapeToSvg } from '../../core/themes/_shared/spec'
import type { Palette } from '../../core/themes/_shared/spec/types'

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

  /**
   * W2 公众号封面导出 —— 用当前主题 palette + 草稿首行作为 hero 文案，按 size preset
   * 生成 SVG 并光栅化为 PNG。失败时走 persistentError（与长图导出一致的错误传染路径）。
   *
   * 文案来源（按优先级）：
   *   1. md 首个 `# ` heading → 主标题
   *   2. activeTheme.name → 主标题（兜底）
   *   3. activeTheme.description → 副标题
   *   4. activeTheme.id 大写 → kicker
   */
  async function doExportCover(size: CoverSizeId): Promise<void> {
    if (isExporting.value) return
    isExporting.value = true
    try {
      const meta = COVER_SIZES[size]
      deps.pingTransient(`正在生成${meta.label}…`, 2500)
      const theme = deps.activeTheme.value
      const palette = themeColorsToPalette(theme)
      const titleFromMd = extractTitleFromMd(deps.md.value)
      const shape = buildRuntimeCover(
        {
          palette,
          title: titleFromMd || theme.name,
          tagline: theme.description,
          kicker: theme.id.toUpperCase().replace(/-/g, ' '),
        },
        size,
      )
      // theme.tokens 透传给 shapeToSvg：buildRuntimeCover 产出的 shape 可能含 'token:<key>'
      // 引用（与 spec.motifs 同源解析），不传 tokens 会让字面值原样写入 SVG attr。
      const svg = shapeToSvg(shape, theme.tokens)
      const filename = `${deps.fileStem()}-cover-${size}.png`
      const result = await exportCoverImage(svg, filename, {
        width: meta.width,
        height: meta.height,
        scale: 2,
        background: palette.bg,
      })
      if (result.ok) deps.pingTransient(`已导出${meta.label}`)
      else deps.setPersistentError(`封面导出失败：${result.error ?? '未知错误'}`)
    } finally {
      isExporting.value = false
    }
  }

  return { doExportHtml, doExportMd, doExportImage, doExportCover, isExporting }
}

/** 从 markdown 抽第一行 `# 标题`；找不到返回空串 */
function extractTitleFromMd(md: string): string {
  const lines = md.split('\n')
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    const m = /^#+\s+(.+)$/.exec(line)
    if (m) return m[1].trim().slice(0, 40)
    // 第一段非空行如果不是 heading，也视为可用标题（取前 40 字）
    return line.slice(0, 40)
  }
  return ''
}

/** Theme.tokens.colors → spec.Palette（字段一一对应，仅做形状投影） */
function themeColorsToPalette(theme: Theme): Palette {
  const c = theme.tokens.colors
  return {
    primary: c.primary,
    secondary: c.secondary,
    accent: c.accent,
    bg: c.bg,
    bgSoft: c.bgSoft,
    bgMuted: c.bgMuted,
    text: c.text,
    textMuted: c.textMuted,
    textInverse: c.textInverse,
    border: c.border,
    code: c.code,
  }
}
