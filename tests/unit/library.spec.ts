// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { parseFrontmatter } from '../../src/core/pipeline/frontmatter'
import {
  articleSlug, createArticle, isLibrarySupported, listArticles, pickLibrary,
  readArticle, restoreLibrary, uniqueArticleName, writeArticle,
} from '../../src/infra/fs/library'

function mockFile(name: string, initialText = '', initialTime = 1) {
  const state = { text: initialText, lastModified: initialTime }
  let pending = initialText
  const writable = {
    write: vi.fn(async (text: string) => { pending = text }),
    close: vi.fn(async () => { state.text = pending; state.lastModified += 1 }),
    abort: vi.fn(async () => {}),
  }
  const handle = {
    kind: 'file', name,
    getFile: vi.fn(async () => ({ text: async () => state.text, lastModified: state.lastModified })),
    createWritable: vi.fn(async () => writable),
  } as unknown as FileSystemFileHandle
  return { handle, state, writable }
}

function mockDirectory(name: string, children: FileSystemHandle[] = []) {
  const entries = new Map(children.map((entry) => [entry.name, entry]))
  const requestPermission = vi.fn(async () => 'granted')
  const handle = {
    kind: 'directory', name, requestPermission,
    isSameEntry: async (other: FileSystemHandle) => handle === other,
    async *values() { yield* entries.values() },
    async getDirectoryHandle(child: string, options?: FileSystemGetDirectoryOptions) {
      const found = entries.get(child)
      if (found?.kind === 'file') throw new DOMException('是文件', 'TypeMismatchError')
      if (found) return found
      if (!options?.create) throw new DOMException('不存在', 'NotFoundError')
      const created = mockDirectory(child).handle
      entries.set(child, created)
      return created
    },
    async getFileHandle(child: string, options?: FileSystemGetFileOptions) {
      const found = entries.get(child)
      if (found?.kind === 'directory') throw new DOMException('是目录', 'TypeMismatchError')
      if (found) return found
      if (!options?.create) throw new DOMException('不存在', 'NotFoundError')
      const created = mockFile(child).handle
      entries.set(child, created)
      return created
    },
  } as unknown as FileSystemDirectoryHandle
  return { handle, entries, requestPermission }
}

/** 只模拟本模块使用的 IDB 请求/事务；不增加测试依赖。 */
function mockIndexedDb(failure?: DOMException) {
  const records = new Map<string, unknown>()
  const close = vi.fn()
  const db = {
    close,
    transaction() {
      const transaction: Record<string, unknown> = {}
      let scheduled = false
      transaction.objectStore = () => ({
        getAll() {
          const request: Record<string, unknown> = { result: [...records.values()], error: failure }
          queueMicrotask(() => (request[failure ? 'onerror' : 'onsuccess'] as (() => void))())
          return request
        },
        put(record: { id: string }) {
          records.set(record.id, record)
          if (!scheduled) {
            scheduled = true
            queueMicrotask(() => (transaction.oncomplete as (() => void))())
          }
        },
      })
      return transaction
    },
  }
  vi.stubGlobal('indexedDB', {
    open() {
      const request: Record<string, unknown> = { result: db }
      queueMicrotask(() => (request.onsuccess as (() => void))())
      return request
    },
  })
  return { records, close }
}

afterEach(() => {
  Reflect.deleteProperty(window, 'showDirectoryPicker')
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('articleSlug / uniqueArticleName', () => {
  it('保留中文，把 Windows 不允许的字符与空白规范成连字符', () => {
    expect(articleSlug('  你好 Vue 3 / "测试": <稿件>?  ')).toBe('你好-vue-3-测试-稿件')
    expect(articleSlug('ＡＢＣ')).toBe('abc')
    expect(articleSlug('...')).toBe('untitled')
    expect(articleSlug('CON')).toBe('article-con')
    expect(articleSlug('lpt9')).toBe('article-lpt9')
    expect(articleSlug('稿'.repeat(100))).toHaveLength(80)
  })

  it('已有文件或目录名称同样占位，大小写不影响重名判定', () => {
    expect(uniqueArticleName('2026-10-24-article', [])).toBe('2026-10-24-article')
    expect(uniqueArticleName('2026-10-24-article', [
      '2026-10-24-ARTICLE', '2026-10-24-article-2', '2026-10-24-article-4',
    ])).toBe('2026-10-24-article-3')
  })
})

describe('文件读取与写入', () => {
  it('返回同一次 getFile 快照的正文和最后修改时间', async () => {
    const file = mockFile('article.md', '# 正文', 123)
    await expect(readArticle(file.handle)).resolves.toEqual({ text: '# 正文', lastModified: 123 })
  })

  it('写入并关闭后才读取最新修改时间', async () => {
    const file = mockFile('article.md', '旧正文', 123)
    await expect(writeArticle(file.handle, '新正文')).resolves.toBe(124)
    expect(file.state.text).toBe('新正文')
    expect(file.writable.write).toHaveBeenCalledWith('新正文')
    expect(file.writable.close).toHaveBeenCalledOnce()
    expect(file.writable.abort).not.toHaveBeenCalled()
  })

  it('写入失败中止流并保留错误，不误报保存成功', async () => {
    const file = mockFile('article.md', '旧正文')
    const error = new DOMException('没有空间', 'QuotaExceededError')
    file.writable.write.mockRejectedValueOnce(error)
    await expect(writeArticle(file.handle, '新正文')).rejects.toBe(error)
    expect(file.writable.abort).toHaveBeenCalledOnce()
    expect(file.writable.close).not.toHaveBeenCalled()
    expect(file.state.text).toBe('旧正文')
  })

  it('关闭提交失败仍将错误传给调用方', async () => {
    const file = mockFile('article.md')
    const error = new DOMException('文件被占用', 'NoModificationAllowedError')
    file.writable.close.mockRejectedValueOnce(error)
    await expect(writeArticle(file.handle, '正文')).rejects.toBe(error)
    expect(file.writable.abort).toHaveBeenCalledOnce()
  })
})

describe('listArticles', () => {
  it('只列一层 article.md，跳过归档、隐藏目录、普通文件和非文章目录', async () => {
    const a = mockDirectory('a', [mockFile('article.md', '---\ntitle: 文章 A\ndate: 2026-10-20\n---\n正文', 10).handle])
    const b = mockDirectory('b', [mockFile('article.md', '# 没有发布字段', 20).handle])
    const root = mockDirectory('文章库', [
      a.handle, b.handle, mockFile('article.md').handle,
      mockDirectory('_archive', [mockFile('article.md').handle]).handle,
      mockDirectory('.private', [mockFile('article.md').handle]).handle,
      mockDirectory('parent', [mockDirectory('nested', [mockFile('article.md').handle]).handle]).handle,
      mockDirectory('wrong-kind', [mockDirectory('article.md').handle]).handle,
    ])
    const listed = await listArticles(root.handle)
    expect(listed.map(({ name, title, date, lastModified }) => ({ name, title, date, lastModified }))).toEqual([
      { name: 'b', title: 'b', date: '', lastModified: 20 },
      { name: 'a', title: '文章 A', date: '2026-10-20', lastModified: 10 },
    ])
    expect(listed[1].dir).toBe(a.handle)
    expect(listed[1].file).toBe(a.entries.get('article.md'))
  })

  it('权限错误不会被吞掉或显示成空文章库', async () => {
    const denied = mockDirectory('denied')
    const error = new DOMException('权限已撤销', 'NotAllowedError')
    vi.spyOn(denied.handle, 'getFileHandle').mockRejectedValueOnce(error)
    await expect(listArticles(mockDirectory('root', [denied.handle]).handle)).rejects.toBe(error)
  })
})

describe('createArticle', () => {
  it('建立日期目录和 frontmatter，文件与目录重名均递增后缀', async () => {
    const root = mockDirectory('root', [
      mockFile('2026-10-24-你好-vue').handle,
      mockDirectory('2026-10-24-你好-vue-2').handle,
    ])
    const created = await createArticle(root.handle, '你好 Vue', new Date(2026, 9, 24, 12))
    expect(created.name).toBe('2026-10-24-你好-vue-3')
    expect(created.date).toBe('2026-10-24')
    expect(root.entries.get(created.name)).toBe(created.dir)
    const saved = await readArticle(created.file)
    expect(parseFrontmatter(saved.text).publication).toEqual({ title: '你好 Vue', date: '2026-10-24' })
    expect(parseFrontmatter(saved.text).body).toBe('# 你好 Vue\n')
    expect(created.lastModified).toBe(saved.lastModified)
  })

  it('标题引号、冒号和换行不会破坏 frontmatter 或注入新字段', async () => {
    const title = '他说："你好"\n新一行'
    const created = await createArticle(mockDirectory('root').handle, title, new Date(2026, 9, 24))
    const parsed = parseFrontmatter((await readArticle(created.file)).text)
    expect(parsed.publication.title).toBe('他说："你好" 新一行')
    expect(parsed.issues).toEqual([])
  })

  it('写盘失败拒绝创建结果', async () => {
    const root = mockDirectory('root')
    const error = new DOMException('拒绝', 'NotAllowedError')
    vi.spyOn(root.handle, 'getDirectoryHandle').mockRejectedValueOnce(error)
    await expect(createArticle(root.handle, '文章')).rejects.toBe(error)
  })
})

describe('目录句柄恢复', () => {
  it('没有 picker 时隐藏文件夹能力；没有 IndexedDB 时没有可恢复记录', async () => {
    vi.stubGlobal('indexedDB', undefined)
    expect(isLibrarySupported()).toBe(false)
    await expect(restoreLibrary()).resolves.toBeNull()
  })

  it('重新选择同一目录复用 ID，切库不混淆记录，恢复时不申请权限', async () => {
    const db = mockIndexedDb()
    const first = mockDirectory('文章库')
    const second = mockDirectory('另一个库')
    const picker = vi.fn().mockResolvedValueOnce(first.handle).mockResolvedValueOnce(second.handle).mockResolvedValueOnce(first.handle)
    Object.defineProperty(window, 'showDirectoryPicker', { configurable: true, value: picker })
    expect(isLibrarySupported()).toBe(true)
    const libraryA = await pickLibrary()
    const libraryB = await pickLibrary()
    const pickedAgain = await pickLibrary()
    expect(picker).toHaveBeenCalledWith({ mode: 'readwrite' })
    expect(libraryA.id).not.toBe(libraryB.id)
    expect(pickedAgain.id).toBe(libraryA.id)
    await expect(restoreLibrary()).resolves.toEqual(libraryA)
    expect(first.requestPermission).not.toHaveBeenCalled()
    expect(second.requestPermission).not.toHaveBeenCalled()
    expect(db.close).toHaveBeenCalledTimes(4)
  })

  it('读取失败会上报并关闭数据库', async () => {
    const error = new DOMException('无法读取', 'UnknownError')
    const db = mockIndexedDb(error)
    await expect(restoreLibrary()).rejects.toBe(error)
    expect(db.close).toHaveBeenCalledOnce()
  })

  it('用户取消 picker 时不产生文章库记录', async () => {
    const db = mockIndexedDb()
    const error = new DOMException('取消', 'AbortError')
    Object.defineProperty(window, 'showDirectoryPicker', { configurable: true, value: vi.fn().mockRejectedValue(error) })
    await expect(pickLibrary()).rejects.toBe(error)
    expect(db.records.size).toBe(0)
  })
})
