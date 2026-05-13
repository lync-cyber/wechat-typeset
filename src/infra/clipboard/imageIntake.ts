/**
 * 图片入站 —— 粘贴 / 拖拽 / 上传 → 可插拔 provider → markdown `![](src)`
 *
 * 为什么可插拔：
 *   默认做 base64 内联，零配置、写完直接可复制到公众号（公众号会把 data URI 转为
 *   素材库图片）。但团队常需要走七牛 / 阿里 OSS / 自建服务 / 公众号素材库 —— 这里
 *   约定一个最小接口，未来每个后端只需实现 `ImageProvider.upload` 一个方法，
 *   不碰 Editor.vue / pasteSanitize 等上层。
 *
 * 为什么带 WebP 压缩：
 *   Word 粘贴 / 截图常是 PNG，一张截图 2–3 MB；base64 会让 markdown 膨胀十倍。
 *   公众号允许最大 10 MB 单图，但 `data:image/webp;base64,...` 的 markdown 放进
 *   CodeMirror 就能直接把编辑器卡住。默认把 > 32 KB 的图转 webp / quality 0.85，
 *   实测截图能压到原体积 15-25%。
 *
 * 不做的事：
 *   - 不实现七牛 / OSS provider —— 那是团队侧 secret 与鉴权的问题，留接口即可。
 *   - 不做图库管理 UI —— 本期只管"粘进来就能用"。
 */

export interface ImageUploadOptions {
  /**
   * 目标 WebP 质量（0-1）。默认 0.85 —— 视觉上与 PNG 几乎无异，体积压到原 15-25%。
   */
  quality?: number
  /**
   * 文件体积阈值（字节）：≤ 此值直接 base64 原图、跳过解码压缩；
   * > 此值才过 canvas 转 webp。默认 32 KB —— SVG / tiny icon 不折腾。
   */
  compressThreshold?: number
  /**
   * 显式 alt 文本（用于 markdown `![alt](src)`）。未提供时使用原文件名。
   */
  alt?: string
}

export interface ImageProvider {
  /** 展示名，用于调试 / 未来 provider 选择 UI */
  readonly name: string
  /**
   * 把 File 变成最终可嵌 markdown 的图片 src。
   * 实现侧可以返回 `data:...` / `https://...` / `wxsrc://...` 任意 URI。
   *
   * 约定：**任何错误都以 reject 抛出**，调用方据此决定降级（例如插入提示段落）。
   */
  upload(file: File, opts?: ImageUploadOptions): Promise<string>
}

/**
 * 内置默认 provider：base64 内联 + WebP 压缩。
 *
 * 浏览器原生 path：
 *   File → ObjectURL → <img> → <canvas>.drawImage → canvas.toDataURL('image/webp', q)
 *
 * 降级 path（canvas 不支持 webp、或 toDataURL 抛错）：
 *   File → FileReader.readAsDataURL → 原始 mime 的 base64
 */
export const base64Provider: ImageProvider = {
  name: 'base64',
  async upload(file, opts = {}): Promise<string> {
    const threshold = opts.compressThreshold ?? 32 * 1024
    if (file.size <= threshold) {
      return readAsDataUrl(file)
    }
    try {
      const webp = await compressToWebp(file, opts.quality ?? 0.85)
      // 压缩后的体积若大于原图（SVG 转 webp 有时会变大），回退
      if (webp.length < file.size * 1.5) return webp
    } catch {
      // 继续走原图 base64
    }
    return readAsDataUrl(file)
  },
}

function readAsDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error ?? new Error('FileReader failed'))
    reader.readAsDataURL(file)
  })
}

/**
 * 解码图像 → canvas → WebP data URL。
 *
 * 浏览器里 `canvas.toDataURL('image/webp', q)` 在所有 Chromium/Firefox/Safari 15+
 * 里都可用；不支持时返回 `data:image/png;base64,...` ——本函数视为 "webp 不可用"
 * 并 reject，由上层回退到原图 base64。
 */
async function compressToWebp(file: File, quality: number): Promise<string> {
  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('canvas 2d context unavailable')
    ctx.drawImage(img, 0, 0)
    const dataUrl = canvas.toDataURL('image/webp', quality)
    if (!dataUrl.startsWith('data:image/webp')) {
      throw new Error('webp encoding unsupported')
    }
    return dataUrl
  } finally {
    URL.revokeObjectURL(url)
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('image decode failed'))
    img.src = src
  })
}

/**
 * 基于 `content-type` 判断 File 是不是图片；拖拽 / 粘贴时筛用。
 */
export function isImageFile(file: File): boolean {
  return /^image\//i.test(file.type)
}

/**
 * 把 File 数组走 provider 上传，产出一串可直接插入编辑器的 markdown `![alt](src)`。
 *
 * 逐个串行上传：保留文件顺序；单个失败不阻断余下项，只在结果里留一行注释。
 * 返回一个多行字符串，行间用 `\n\n` 分隔（markdown 段落间距）。
 */
export async function uploadImages(
  files: readonly File[],
  provider: ImageProvider = base64Provider,
  opts?: ImageUploadOptions,
): Promise<string> {
  const lines: string[] = []
  for (const file of files) {
    if (!isImageFile(file)) continue
    const alt = opts?.alt ?? stripExt(file.name) ?? 'image'
    try {
      const src = await provider.upload(file, opts)
      lines.push(`![${alt}](${src})`)
    } catch (err) {
      lines.push(`<!-- image upload failed: ${file.name} (${String(err)}) -->`)
    }
  }
  return lines.join('\n\n')
}

function stripExt(name: string): string | null {
  if (!name) return null
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(0, dot) : name
}
