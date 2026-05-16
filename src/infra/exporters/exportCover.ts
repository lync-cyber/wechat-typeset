/**
 * 浏览器内 SVG → PNG 栅格化 + 下载（W2 封面导出专用）
 *
 * 与 exportFile.ts 的 exportImage（html2canvas）分开是因为：
 *   - exportImage 截取的是 DOM 节点（含 CSS / 字体 / 已经渲染好的内容）
 *   - 封面 SVG 是一段纯字符串，不需要 html2canvas 这种重型 DOM-walker
 *   - SVG → Image → Canvas → toBlob 是 W3C 标准路径，~30 行就能搞定
 *
 * 步骤：
 *   1. svg string → data URI（utf8 编码避免 base64 + emoji 失真）
 *   2. <img>.src 加载 data URI（async）
 *   3. drawImage 到 OffscreenCanvas / Canvas，宽高 = sizeSpec × scale
 *   4. canvas.toBlob('image/png') → URL.createObjectURL → 下载
 */

import { triggerBlobDownload } from './exportFile'

export interface ExportCoverOptions {
  /** 输出 PNG 宽度 */
  width: number
  /** 输出 PNG 高度 */
  height: number
  /** Retina 倍数，默认 2（@2x 输出，公众号编辑器选图后会保留原分辨率） */
  scale?: number
  /** 兜底背景色（透明区域填充用）；缺省 '#ffffff' */
  background?: string
}

export interface ExportCoverResult {
  ok: boolean
  /** 出错时给的人话描述 */
  error?: string
}

/**
 * 把 SVG 字符串栅格化为 PNG 并触发下载。
 *
 * 失败模式：
 *   - SVG 含跨域引用（外链 image href、外部字体 import）会让 canvas 染 dirty
 *     （toBlob 抛 SecurityError）。本项目封面只用 inline shape + 系统字体，正常情况
 *     不会触发；如果未来 spec 加了外链字体需要先用 fontfacelookup inline 解决。
 *   - canvas.toBlob 在 Safari 极旧版本可能为 null（fallback 已用 error 返回）。
 */
export async function exportCoverImage(
  svg: string,
  filename: string,
  opts: ExportCoverOptions,
): Promise<ExportCoverResult> {
  const { width, height } = opts
  const scale = opts.scale ?? 2
  const background = opts.background ?? '#ffffff'

  // SVG 字符串可能含特殊字符（中文标题）；encodeURIComponent + utf8 data URI 是最稳的
  const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

  try {
    const img = await loadImage(dataUri)
    const canvas = document.createElement('canvas')
    canvas.width = width * scale
    canvas.height = height * scale
    const ctx = canvas.getContext('2d')
    if (!ctx) return { ok: false, error: '获取 Canvas 2D context 失败（浏览器不支持？）' }
    // 先填底色，避免 SVG 透明区导出后是黑色
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // 缩放绘制（drawImage 第 4/5 参数 = 目标宽高）
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    const blob = await canvasToBlob(canvas)
    if (!blob) return { ok: false, error: 'canvas.toBlob 返回 null（浏览器不支持 PNG 编码？）' }
    triggerBlobDownload(filename, blob)
    return { ok: true }
  } catch (err) {
    return { ok: false, error: (err as Error)?.message ?? '封面导出失败' }
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    // 即便 data: 也不算跨域；保险起见显式声明，让 toBlob 不染 dirty
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('SVG 解码失败'))
    img.src = src
  })
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b), 'image/png')
  })
}

