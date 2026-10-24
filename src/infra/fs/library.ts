/** 本地文章库：浏览器目录句柄与普通 Markdown 文件，不建立磁盘索引。 */
import { parseFrontmatter, updatePublication } from '../../core/pipeline/frontmatter'

export interface Library {
  id: string
  dir: FileSystemDirectoryHandle
}

export interface ArticleEntry {
  /** 文章目录名，也是同一文章库内的稳定标识。 */
  name: string
  title: string
  date: string
  lastModified: number
  dir: FileSystemDirectoryHandle
  file: FileSystemFileHandle
}

type DirectoryPickerWindow = Window & {
  showDirectoryPicker?: (options: { mode: 'readwrite' }) => Promise<FileSystemDirectoryHandle>
}
type IterableDirectory = FileSystemDirectoryHandle & {
  values(): AsyncIterableIterator<FileSystemHandle>
}
type StoredLibrary = Library | { id: 'active'; libraryId: string }

const DB_NAME = 'wechat-typeset:library'
const STORE_NAME = 'handles'

export function isLibrarySupported(): boolean {
  return typeof window !== 'undefined'
    && typeof (window as DirectoryPickerWindow).showDirectoryPicker === 'function'
    && typeof indexedDB !== 'undefined'
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME, { keyPath: 'id' })
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('无法打开文章库记录'))
  })
}

function requestValue<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('无法读取文章库记录'))
  })
}

/** 必须从用户点击直接调用；picker 自身申请读写权限。 */
export async function pickLibrary(): Promise<Library> {
  const picker = (window as DirectoryPickerWindow).showDirectoryPicker
  if (!picker) throw new Error('当前浏览器不支持文件夹文章库，请使用 Chrome 或 Edge')
  const dir = await picker.call(window, { mode: 'readwrite' })
  const db = await openDatabase()
  try {
    const records = await requestValue<StoredLibrary[]>(
      db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).getAll(),
    )
    let id = ''
    for (const previous of records) {
      if (!('dir' in previous)) continue
      try {
        if (await dir.isSameEntry(previous.dir)) {
          id = previous.id
          break
        }
      } catch {
        // 已删除或不可用的旧句柄不妨碍选择另一个文章库。
      }
    }
    const library: Library = { id: id || crypto.randomUUID(), dir }
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite')
      const store = transaction.objectStore(STORE_NAME)
      transaction.oncomplete = () => resolve()
      transaction.onabort = () => reject(transaction.error ?? new Error('文章库记录未保存'))
      transaction.onerror = () => reject(transaction.error ?? new Error('文章库记录未保存'))
      store.put(library)
      store.put({ id: 'active', libraryId: library.id })
    })
    return library
  } finally {
    db.close()
  }
}

/** 只恢复句柄；调用方须在页面首次点击时 requestPermission({ mode: 'readwrite' })。 */
export async function restoreLibrary(): Promise<Library | null> {
  if (typeof indexedDB === 'undefined') return null
  const db = await openDatabase()
  try {
    const records = await requestValue<StoredLibrary[]>(
      db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).getAll(),
    )
    const active = records.find((record) => record.id === 'active')
    if (!active || !('libraryId' in active)) return null
    const library = records.find((record): record is Library =>
      'dir' in record && record.id === active.libraryId,
    )
    return library ?? null
  } finally {
    db.close()
  }
}

/** 保留中文和字母数字，去除 Windows 禁用字符、首尾点空格及设备保留名。 */
export function articleSlug(title: string): string {
  const slug = Array.from(title.normalize('NFKC').toLowerCase()
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, '-').replace(/^-+|-+$/g, ''))
    .slice(0, 80).join('').replace(/-+$/g, '') || 'untitled'
  return /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(slug) ? `article-${slug}` : slug
}

/** Windows 文件名不区分大小写；文件与目录都占用候选名称。 */
export function uniqueArticleName(base: string, existingNames: Iterable<string>): string {
  const occupied = new Set(Array.from(existingNames, (name) => name.toLowerCase()))
  let candidate = base
  for (let n = 2; occupied.has(candidate.toLowerCase()); n++) candidate = `${base}-${n}`
  return candidate
}

function isAbsentArticle(error: unknown): boolean {
  return error instanceof DOMException && (error.name === 'NotFoundError' || error.name === 'TypeMismatchError')
}

/** 扫描一层目录，每次读取磁盘上的 frontmatter；权限或 I/O 错误交由界面反馈。 */
export async function listArticles(dir: FileSystemDirectoryHandle): Promise<ArticleEntry[]> {
  const articles: ArticleEntry[] = []
  for await (const handle of (dir as IterableDirectory).values()) {
    if (handle.kind !== 'directory' || handle.name === '_archive' || handle.name.startsWith('.')) continue
    const articleDir = handle as FileSystemDirectoryHandle
    try {
      const file = await articleDir.getFileHandle('article.md')
      const { text, lastModified } = await readArticle(file)
      const { publication } = parseFrontmatter(text)
      articles.push({
        name: articleDir.name,
        title: publication.title?.trim() || articleDir.name,
        date: publication.date ?? '',
        lastModified,
        dir: articleDir,
        file,
      })
    } catch (error) {
      if (!isAbsentArticle(error)) throw error
    }
  }
  return articles.sort((a, b) => b.lastModified - a.lastModified || a.name.localeCompare(b.name))
}

export async function readArticle(handle: FileSystemFileHandle): Promise<{ text: string; lastModified: number }> {
  const file = await handle.getFile()
  return { text: await file.text(), lastModified: file.lastModified }
}

export async function writeArticle(handle: FileSystemFileHandle, text: string): Promise<number> {
  const writable = await handle.createWritable()
  try {
    await writable.write(text)
    await writable.close()
  } catch (error) {
    try { await writable.abort() } catch { /* 保留原始写入错误。 */ }
    throw error
  }
  return (await handle.getFile()).lastModified
}

export async function createArticle(
  dir: FileSystemDirectoryHandle,
  title: string,
  now: Date = new Date(),
): Promise<ArticleEntry> {
  const cleanTitle = title.trim().replace(/[\r\n]+/g, ' ') || '未命名文章'
  const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const names: string[] = []
  for await (const entry of (dir as IterableDirectory).values()) names.push(entry.name)
  const name = uniqueArticleName(`${date}-${articleSlug(cleanTitle)}`, names)
  const articleDir = await dir.getDirectoryHandle(name, { create: true })
  const file = await articleDir.getFileHandle('article.md', { create: true })
  const text = updatePublication(`# ${cleanTitle}\n`, { title: cleanTitle, date })
  const lastModified = await writeArticle(file, text)
  return { name, title: cleanTitle, date, lastModified, dir: articleDir, file }
}
