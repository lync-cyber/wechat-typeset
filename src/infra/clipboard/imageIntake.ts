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
 * 体积守门（≤ 200 KB / 张 · 总量 4 MB）：
 *   仅 quality 0.85 一次过仍然可能让一张高分屏截图停在 ~600 KB（webp 不省万能图）。
 *   `targetBytes` 触发"按 quality 阶梯重编码"：0.85 → 0.7 → 0.55 → 0.4，取首个达标
 *   或所有尝试中最小者。
 *   `uploadImages.totalBudgetBytes` 累计字符串长度（base64 长度 ≈ 编码体积），
 *   超过即停余下项并写 `<!-- image budget exceeded -->` 注释——避免一篇文章默默
 *   膨胀到 markdown 编辑器卡死。两道闸门解耦：单图压、总量截。
 *
 * 不做的事：
 *   - 不实现七牛 / OSS provider —— 那是团队侧 secret 与鉴权的问题，留接口即可。
 *   - 不做图库管理 UI —— 本期只管"粘进来就能用"。
 */

export interface ImageUploadOptions {
  /**
   * 起始 WebP 质量（0-1）。默认 0.85 —— 视觉上与 PNG 几乎无异，体积压到原 15-25%。
   * 若 targetBytes 触发重编码，将以此为阶梯起点逐步降。
   */
  quality?: number
  /**
   * 文件体积阈值（字节）：≤ 此值直接 base64 原图、跳过解码压缩；
   * > 此值才过 canvas 转 webp。默认 32 KB —— SVG / tiny icon 不折腾。
   */
  compressThreshold?: number
  /**
   * 单图目标编码后字节数（data URI 字符串长度上限）。默认 200_000（≈ 200 KB）——
   * 超过则按 quality 阶梯重编码，取首个达标或所有尝试中最小者。
   * 设为 0 关闭该闸门，行为退回"一次过 quality"。
   */
  targetBytes?: number
  /**
   * 显式 alt 文本（用于 markdown `![alt](src)`）。未提供时使用原文件名。
   */
  alt?: string
}

/** 单图目标编码后字节数默认值（≈ 200 KB） */
export const DEFAULT_TARGET_BYTES = 200_000
/** uploadImages 默认总量预算（≈ 4 MB；超过即停余下项写注释） */
export const DEFAULT_TOTAL_BUDGET_BYTES = 4_000_000

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
 * 内置默认 provider：base64 内联 + WebP 压缩 + 目标体积阶梯。
 *
 * 浏览器原生 path：
 *   File → ObjectURL → <img> → <canvas>.drawImage → canvas.toDataURL('image/webp', q)
 *
 * 目标体积闸门：
 *   首次以 opts.quality（默认 0.85）编码；若 > targetBytes 则按阶梯
 *   [-0.15, -0.30, -0.45] 复编，取首个达标或所有尝试中最小者。
 *   targetBytes <= 0 关闭闸门，行为退回单次 quality。
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
    const baseQuality = opts.quality ?? 0.85
    const target = opts.targetBytes ?? DEFAULT_TARGET_BYTES
    try {
      const candidate = await encodeWithTargetBudget(file, baseQuality, target)
      // 压缩后的体积若大于原图（SVG 转 webp 有时会变大），回退
      if (candidate.length < file.size * 1.5) return candidate
    } catch {
      // 继续走原图 base64
    }
    return readAsDataUrl(file)
  },
}

/**
 * 用 quality 阶梯逼近 targetBytes：返回首个 ≤ target 的编码，或所有尝试中最小者。
 * targetBytes <= 0 视为不约束，单次 baseQuality 出图。
 */
async function encodeWithTargetBudget(
  file: File,
  baseQuality: number,
  targetBytes: number,
): Promise<string> {
  const first = await compressToWebp(file, baseQuality)
  if (targetBytes <= 0 || first.length <= targetBytes) return first

  // 阶梯：-0.15 / -0.30 / -0.45。clamp 在 [0.2, 0.95]，再低 webp 失真过重不实用
  const steps = [baseQuality - 0.15, baseQuality - 0.30, baseQuality - 0.45]
    .map((q) => Math.max(0.2, Math.min(0.95, q)))
    .filter((q, i, arr) => arr.indexOf(q) === i)

  let best = first
  for (const q of steps) {
    const next = await compressToWebp(file, q)
    if (next.length <= targetBytes) return next
    if (next.length < best.length) best = next
  }
  return best
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

export interface UploadImagesOptions extends ImageUploadOptions {
  /**
   * 整批次上传总字节预算（按返回的 src 字符串长度累计）。默认 4_000_000（≈ 4 MB）。
   * 超过即停余下项并写 `<!-- image budget exceeded -->` 注释，避免一篇文章
   * 默默膨胀到 CodeMirror 卡顿。设为 0 关闭该闸门。
   */
  totalBudgetBytes?: number
}

// ============================================================
// 模块级 provider 单例（fork 注入点）
// ============================================================

/**
 * 当前注册的 provider。模块级单例，初始值是 base64Provider。
 *
 * fork / 私有部署在启动早期（建议 main.ts 顶部、createApp() 之前）调用
 * `setImageProvider(...)` 把自家上传后端塞进来。主仓所有图片上传调用方都
 * 经由 `uploadImages(...)` 而它会读取这个单例——一处注入，全应用生效。
 */
let currentProvider: ImageProvider = base64Provider

/**
 * 替换当前 provider。返回值为上一个 provider，方便测试或临时切换后还原。
 *
 * 不持久化到 storage：provider 在代码层注入，避免把后端密钥拉进 localStorage；
 * 切换 provider 是部署级决策，不是用户偏好。
 */
export function setImageProvider(p: ImageProvider): ImageProvider {
  const prev = currentProvider
  currentProvider = p
  return prev
}

/** 当前 provider 的只读引用；UI 想显示"当前用什么后端"时读 .name。 */
export function getImageProvider(): ImageProvider {
  return currentProvider
}

/**
 * 把 File 数组走 provider 上传，产出一串可直接插入编辑器的 markdown `![alt](src)`。
 *
 * provider 缺省时使用 `getImageProvider()`（默认 base64Provider，fork 可在启动期
 * 用 setImageProvider 覆盖）。显式传入仍然支持——测试需要 mock provider、或同一
 * 进程内对不同上传源做差异化处理时用。
 *
 * 逐个串行上传：保留文件顺序；单个失败不阻断余下项，只在结果里留一行注释。
 * 返回一个多行字符串，行间用 `\n\n` 分隔（markdown 段落间距）。
 *
 * 总量闸门：累计上传产物字符串长度，超过 totalBudgetBytes 则停止后续上传，
 * 在末尾追加 `<!-- image budget exceeded ... -->` 注释（也是 markdown 不可见）。
 */
export async function uploadImages(
  files: readonly File[],
  provider: ImageProvider = currentProvider,
  opts?: UploadImagesOptions,
): Promise<string> {
  const totalBudget = opts?.totalBudgetBytes ?? DEFAULT_TOTAL_BUDGET_BYTES
  const lines: string[] = []
  let accumulated = 0
  let stoppedAt: number | null = null
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (!isImageFile(file)) continue
    const alt = opts?.alt ?? stripExt(file.name) ?? 'image'
    try {
      const src = await provider.upload(file, opts)
      accumulated += src.length
      lines.push(`![${alt}](${src})`)
      if (totalBudget > 0 && accumulated > totalBudget && i < files.length - 1) {
        stoppedAt = i + 1
        break
      }
    } catch (err) {
      lines.push(`<!-- image upload failed: ${file.name} (${String(err)}) -->`)
    }
  }
  if (stoppedAt !== null) {
    const remaining = files.length - stoppedAt
    lines.push(
      `<!-- image budget exceeded: 累计 ${accumulated} B 超过 ${totalBudget} B；剩余 ${remaining} 张未上传，请减图或切换 OSS provider -->`,
    )
  }
  return lines.join('\n\n')
}

function stripExt(name: string): string | null {
  if (!name) return null
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(0, dot) : name
}
