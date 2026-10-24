/** 文件文章的图片写入与渲染前解析；编辑器和磁盘始终保留相对路径。 */
import MarkdownIt from 'markdown-it'
import markdownItContainer from 'markdown-it-container'
import type Token from 'markdown-it/lib/token.mjs'
import { parseFrontmatter } from '../../core/pipeline/frontmatter'
import { parseInfo } from '../../core/pipeline/containers/types'
import { compressImageToWebp, isImageFile, type ImageUploadOptions } from '../clipboard/imageIntake'
import { uniqueArticleName } from './library'

type IterableDirectory = FileSystemDirectoryHandle & { values(): AsyncIterableIterator<FileSystemHandle> }
interface ImageCacheEntry { lastModified: number; size: number; data: string }
interface ImageReference { from: number; to: number; path: string; alt: string; title: string; attribute?: boolean }
interface ImageScan { scanSource?: string; images?: ImageReference[] }

const imageCache = new WeakMap<FileSystemDirectoryHandle, Map<string, ImageCacheEntry>>()
const imageWrites = new WeakMap<FileSystemDirectoryHandle, Promise<unknown>>()
const mimeByExtension: Record<string, string> = {
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp',
  gif: 'image/gif', avif: 'image/avif', bmp: 'image/bmp', svg: 'image/svg+xml',
}

// 包装现有 image rule 记录源码范围；链接、转义、引用式图片仍由 markdown-it 判断。
// 用公开的规则启停 API 取得原规则，避免依赖私有属性或打包后会变化的函数名。
const imageParser = new MarkdownIt({ html: false })
for (const name of ['gallery', 'image-caption', 'image-item', 'author-bio']) {
  // 插件附带旧版 markdown-it 类型，运行接口与本仓核心管线相同。
  imageParser.use(markdownItContainer as unknown as Parameters<typeof imageParser.use>[0], name, {
    validate: (params: string) => params.trim().split(/\s+/)[0] === name,
  })
}
const inlineRules = imageParser.inline.ruler.getRules('')
imageParser.inline.ruler.disable('image')
const otherInlineRules = new Set(imageParser.inline.ruler.getRules(''))
const imageRule = inlineRules.find((rule) => !otherInlineRules.has(rule))!
imageParser.inline.ruler.at('image', (state, silent) => {
  const from = state.pos
  const matched = imageRule(state, silent)
  const env = state.env as ImageScan
  if (matched && !silent && state.src === env.scanSource) {
    const token = state.tokens[state.tokens.length - 1]
    env.images?.push({
      from, to: state.pos, path: token.attrGet('src') ?? '',
      alt: token.content, title: token.attrGet('title') ?? '',
    })
  }
  return matched
})
imageParser.inline.ruler.enable('image')

function referencedImages(body: string): ImageReference[] {
  const env: ImageScan = {}
  const blocks = imageParser.parse(body, env)
  const lines = body.match(/[^\n]*\n|[^\n]+$/g) ?? []
  const offsets = [0]
  for (const line of lines) offsets.push(offsets[offsets.length - 1] + line.length)
  const images: ImageReference[] = []
  // 只扫描实际行内块与表格行；代码和引用定义没有这些 token，不会误处理示例。
  // 每段分别解析，防止不配对的反引号跨段吞掉真正的图片。
  for (const token of blocks) {
    if (token.map && ['container_image-caption_open', 'container_image-item_open', 'container_author-bio_open'].includes(token.type)) {
      const name = token.type.slice('container_'.length, -'_open'.length)
      const attribute = name === 'author-bio' ? 'avatar' : 'src'
      const path = parseInfo(token.info.trim().slice(name.length).trim()).attrs[attribute]
      if (!path) continue
      // 语义来自 parseInfo；只定位最后一个生效图片属性的值，不重写其它属性或图注。
      const matches = [...token.info.matchAll(/([a-zA-Z_][\w-]*)=("([^"]*)"|'([^']*)'|(\S+))/g)]
        .filter((match) => match[1] === attribute)
      const match = matches[matches.length - 1]
      const infoAt = lines[token.map[0]].indexOf(token.info)
      if (!match || infoAt < 0) continue
      const quoted = match[2].startsWith('"') || match[2].startsWith("'")
      const from = offsets[token.map[0]] + infoAt + match.index + match[0].indexOf('=') + 1 + Number(quoted)
      images.push({ from, to: from + path.length, path, alt: '', title: '', attribute: true })
      continue
    }
    if ((token.type !== 'inline' && token.type !== 'tr_open') || !token.map) continue
    env.scanSource = lines.slice(token.map[0], token.map[1]).join('')
    env.images = []
    const tokens: Token[] = []
    imageParser.inline.parse(env.scanSource, imageParser, env, tokens)
    for (const image of env.images) {
      images.push({ ...image, from: image.from + offsets[token.map[0]], to: image.to + offsets[token.map[0]] })
    }
  }
  return images
}

function missingFile(error: unknown): boolean {
  return error instanceof DOMException && (error.name === 'NotFoundError' || error.name === 'TypeMismatchError')
}

/** null 表示站外图片；空串表示不安全的本地路径。 */
export function normalizeLocalImagePath(source: string): string | null {
  if (!source.startsWith('images/')) return null
  let path: string
  try { path = decodeURIComponent(source.split(/[?#]/, 1)[0]) } catch { return '' }
  const parts = path.split('/')
  if (parts.some((part) => !part || part === '.' || part === '..' || /[\\\u0000-\u001f]/.test(part))) return ''
  return path
}

function fileDataUri(file: File): Promise<string> {
  const mime = mimeByExtension[file.name.split('.').pop()?.toLowerCase() ?? '']
  const blob = !file.type.startsWith('image/') && mime ? new Blob([file], { type: mime }) : file
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error ?? new Error(`无法读取图片 ${file.name}`))
    reader.readAsDataURL(blob)
  })
}

async function resolveImage(path: string, dir: FileSystemDirectoryHandle): Promise<string | null> {
  let cache = imageCache.get(dir)
  if (!cache) { cache = new Map(); imageCache.set(dir, cache) }
  try {
    const parts = path.split('/')
    let parent = dir
    for (const part of parts.slice(0, -1)) parent = await parent.getDirectoryHandle(part)
    const file = await (await parent.getFileHandle(parts[parts.length - 1])).getFile()
    const previous = cache.get(path)
    if (previous?.lastModified === file.lastModified && previous.size === file.size) return previous.data
    const data = await fileDataUri(file)
    cache.set(path, { lastModified: file.lastModified, size: file.size, data })
    return data
  } catch (error) {
    cache.delete(path)
    if (missingFile(error)) return null
    throw error
  }
}

export async function resolveLocalImages(
  md: string,
  dir: FileSystemDirectoryHandle,
): Promise<{ md: string; missing: string[] }> {
  const { body, publication } = parseFrontmatter(md)
  const images = referencedImages(body)
  const sources = new Set(images.map((image) => image.path))
  if (publication.cover) sources.add(publication.cover)
  const resolved = new Map<string, string>()
  const missing = new Set<string>()
  for (const source of sources) {
    const path = normalizeLocalImagePath(source)
    if (path === null) continue
    const data = path ? await resolveImage(path, dir) : null
    if (data) resolved.set(source, data)
    else missing.add(path || source)
  }
  let output = body
  for (const image of images.sort((a, b) => b.from - a.from)) {
    const data = resolved.get(image.path)
    if (!data) continue
    const title = image.title ? ` "${image.title.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"` : ''
    const replacement = image.attribute ? data : `![${image.alt}](${data}${title})`
    output = output.slice(0, image.from) + replacement + output.slice(image.to)
  }
  return { md: md.slice(0, md.length - body.length) + output, missing: [...missing] }
}

/** 列出本篇 images/ 及子目录中的图片文件，不改动磁盘。 */
export async function listArticleImages(dir: FileSystemDirectoryHandle): Promise<string[]> {
  let images: FileSystemDirectoryHandle
  try {
    images = await dir.getDirectoryHandle('images')
  } catch (error) {
    if (missingFile(error)) return []
    throw error
  }
  const paths: string[] = []
  async function collect(directory: FileSystemDirectoryHandle, prefix: string) {
    for await (const entry of (directory as IterableDirectory).values()) {
      const path = `${prefix}/${entry.name}`
      if (entry.kind === 'directory') {
        await collect(entry as FileSystemDirectoryHandle, path)
      } else {
        const extension = entry.name.split('.').pop()?.toLowerCase() ?? ''
        if (mimeByExtension[extension]) paths.push(path)
      }
    }
  }
  await collect(images, 'images')
  return paths.sort((a, b) => a.localeCompare(b))
}

/** 同一文章的图片写入串行执行，时间戳重名时追加 -2，避免并行粘贴互相覆盖。 */
export function writeLocalImage(dir: FileSystemDirectoryHandle, file: File, opts?: ImageUploadOptions): Promise<string> {
  const pending = (imageWrites.get(dir) ?? Promise.resolve()).catch(() => {}).then(async () => {
    if (!isImageFile(file)) throw new Error('请选择图片文件')
    const data = await compressImageToWebp(file, opts)
    const prefix = 'data:image/webp;base64,'
    if (!data.startsWith(prefix)) throw new Error('浏览器未能生成 WebP 图片')
    const bytes = Uint8Array.from(atob(data.slice(prefix.length)), (char) => char.charCodeAt(0))
    const images = await dir.getDirectoryHandle('images', { create: true })
    const names: string[] = []
    for await (const entry of (images as IterableDirectory).values()) {
      if (/\.webp$/i.test(entry.name)) names.push(entry.name.slice(0, -5))
    }
    const name = `${uniqueArticleName(String(Date.now()), names)}.webp`
    const handle = await images.getFileHandle(name, { create: true })
    const writable = await handle.createWritable()
    try {
      await writable.write(new Blob([bytes], { type: 'image/webp' }))
      await writable.close()
    } catch (error) {
      try { await writable.abort() } catch { /* 保留原写入错误。 */ }
      throw error
    }
    return `images/${name}`
  })
  imageWrites.set(dir, pending)
  const release = () => { if (imageWrites.get(dir) === pending) imageWrites.delete(dir) }
  void pending.then(release, release)
  return pending
}
