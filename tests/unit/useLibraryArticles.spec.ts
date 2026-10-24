// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h, nextTick, ref } from 'vue'
import { useLibraryArticles } from '../../src/ui/composables/useLibraryArticles'
import type { ArticleEntry, Library } from '../../src/infra/fs/library'

const fs = vi.hoisted(() => ({
  isLibrarySupported: vi.fn(),
  pickLibrary: vi.fn(),
  restoreLibrary: vi.fn(),
  listArticles: vi.fn(),
  readArticle: vi.fn(),
  writeArticle: vi.fn(),
  createArticle: vi.fn(),
}))
vi.mock('../../src/infra/fs/library', () => fs)

const permission = vi.fn()
const library: Library = {
  id: 'library-a',
  dir: { name: '文章库', requestPermission: permission } as unknown as FileSystemDirectoryHandle,
}
function article(name: string): ArticleEntry {
  return {
    name,
    title: name,
    date: '2026-10-24',
    lastModified: 100,
    dir: { name } as FileSystemDirectoryHandle,
    file: { name: `${name}/article.md` } as FileSystemFileHandle,
  }
}
const first = article('2026-10-24-first')
const second = article('2026-10-24-second')
const disk = new Map<FileSystemFileHandle, { text: string; lastModified: number }>()
const bufferKey = (entry = first, libraryId = library.id) => `wechat-typeset:file-buffer:${libraryId}:${entry.name}`
const buffer = (entry = first) => JSON.parse(localStorage.getItem(bufferKey(entry)) ?? 'null')

function mountLibrary() {
  const md = ref('浏览器草稿')
  const baseThemeId = ref('default')
  const beforeOpen = vi.fn(() => true)
  let api!: ReturnType<typeof useLibraryArticles>
  const app = createApp(defineComponent({
    setup() {
      api = useLibraryArticles({ md, baseThemeId, beforeOpen })
      return () => h('div')
    },
  }))
  app.mount(document.createElement('div'))
  return { md, baseThemeId, beforeOpen, api, unmount: () => app.unmount() }
}
let mounted: ReturnType<typeof mountLibrary> | undefined

async function settle() {
  await vi.advanceTimersByTimeAsync(0)
  await nextTick()
}
async function openFirst() {
  mounted = mountLibrary()
  await mounted.api.connect()
  await mounted.api.open(first)
  return mounted
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.resetAllMocks()
  localStorage.clear()
  disk.clear()
  disk.set(first.file, { text: '# 第一篇\n磁盘正文', lastModified: 100 })
  disk.set(second.file, { text: '# 第二篇\n磁盘正文', lastModified: 200 })
  fs.isLibrarySupported.mockReturnValue(true)
  fs.restoreLibrary.mockResolvedValue(library)
  fs.pickLibrary.mockResolvedValue(library)
  fs.listArticles.mockResolvedValue([first, second])
  permission.mockResolvedValue('granted')
  fs.readArticle.mockImplementation(async (file: FileSystemFileHandle) => ({ ...disk.get(file)! }))
  fs.writeArticle.mockImplementation(async (file: FileSystemFileHandle, text: string) => {
    const lastModified = disk.get(file)!.lastModified + 1
    disk.set(file, { text, lastModified })
    return lastModified
  })
})
afterEach(() => {
  vi.restoreAllMocks()
  mounted?.unmount()
  mounted = undefined
  localStorage.clear()
  vi.useRealTimers()
})

describe('文件文章权限和崩溃备份', () => {
  it('启动只恢复句柄，点击连接后才请求读写权限', async () => {
    mounted = mountLibrary()
    await settle()
    expect(mounted.api.library.value?.id).toBe('library-a')
    expect(permission).not.toHaveBeenCalled()
    expect(fs.listArticles).not.toHaveBeenCalled()
    await mounted.api.connect()
    expect(permission).toHaveBeenCalledWith({ mode: 'readwrite' })
    expect(fs.listArticles).toHaveBeenCalledWith(library.dir)
  })

  it('停止输入两秒才备份，备份不会写入磁盘', async () => {
    const { md, api } = await openFirst()
    md.value = '第一轮修改'
    await vi.advanceTimersByTimeAsync(1500)
    md.value = '第二轮修改'
    await vi.advanceTimersByTimeAsync(1999)
    expect(buffer()).toBeNull()
    await vi.advanceTimersByTimeAsync(1)
    expect(buffer()).toEqual({ text: '第二轮修改', lastModified: 100 })
    expect(fs.writeArticle).not.toHaveBeenCalled()
    expect(api.savingLabel.value).toBe('未保存')
  })

  it('显式保存成功清除对应缓冲并更新保存状态', async () => {
    const { md, api } = await openFirst()
    md.value = '已经修改'
    await vi.advanceTimersByTimeAsync(2000)
    await api.save()
    expect(fs.writeArticle).toHaveBeenCalledWith(first.file, '已经修改')
    expect(buffer()).toBeNull()
    expect(api.dirty.value).toBe(false)
    expect(api.savingLabel.value).toBe('已保存到文件')
  })

  it('写盘期间继续输入时，只清除已写盘内容并保留后续修改的缓冲', async () => {
    const { md, api } = await openFirst()
    let finishWrite!: (version: number) => void
    fs.writeArticle.mockImplementationOnce((file: FileSystemFileHandle, text: string) => {
      disk.set(file, { text, lastModified: 101 })
      return new Promise<number>((resolve) => { finishWrite = resolve })
    })
    md.value = '提交时的正文'
    const saving = api.save()
    await settle()
    expect(fs.writeArticle).toHaveBeenCalledWith(first.file, '提交时的正文')
    md.value = '保存过程中继续写的正文'
    finishWrite(101)
    await saving
    expect(api.dirty.value).toBe(true)
    expect(buffer()).toEqual({ text: '保存过程中继续写的正文', lastModified: 101 })
    expect(disk.get(first.file)?.text).toBe('提交时的正文')
  })

  it('切换文章先备份旧文，之后的输入只更新新文章的缓冲', async () => {
    const { md, api } = await openFirst()
    md.value = '第一篇未保存'
    await api.open(second)
    expect(buffer(first)).toEqual({ text: '第一篇未保存', lastModified: 100 })
    expect(md.value).toBe('# 第二篇\n磁盘正文')
    md.value = '第二篇未保存'
    await vi.advanceTimersByTimeAsync(2000)
    expect(buffer(first)?.text).toBe('第一篇未保存')
    expect(buffer(second)).toEqual({ text: '第二篇未保存', lastModified: 200 })
    await api.open(first)
    expect(md.value).toBe('第一篇未保存')
    expect(buffer(second)?.text).toBe('第二篇未保存')
  })

  it('重新打开文章恢复同一磁盘版本上的崩溃缓冲', async () => {
    localStorage.setItem(bufferKey(), JSON.stringify({ text: '崩溃前未保存的正文', lastModified: 100 }))
    const { md, api } = await openFirst()
    expect(md.value).toBe('崩溃前未保存的正文')
    expect(api.dirty.value).toBe(true)
    expect(api.conflict.value).toBeNull()
    expect(buffer()?.text).toBe('崩溃前未保存的正文')
    expect(fs.writeArticle).not.toHaveBeenCalled()
  })

  it('恢复备份时即使写入被拒绝，原有备份也不能先被删除', async () => {
    const original = JSON.stringify({ text: '崩溃前唯一的未保存正文', lastModified: 100 })
    localStorage.setItem(bufferKey(), original)
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('写入被拒绝', 'QuotaExceededError')
    })
    const { md, api } = await openFirst()
    expect(md.value).toBe('崩溃前唯一的未保存正文')
    expect(localStorage.getItem(bufferKey())).toBe(original)
    expect(api.dirty.value).toBe(true)
    expect(api.error.value).toContain('备份失败')
  })

  it('另一文章库的同名文章缓冲不能覆盖当前文章', async () => {
    localStorage.setItem(bufferKey(first, 'library-b'), JSON.stringify({ text: '另一个库的正文', lastModified: 100 }))
    const { md, api } = await openFirst()
    expect(md.value).toBe('# 第一篇\n磁盘正文')
    expect(api.dirty.value).toBe(false)
    expect(localStorage.getItem(bufferKey(first, 'library-b'))).not.toBeNull()
  })

  it('备份空间不足时不能离开尚未写盘的文章', async () => {
    const { md, api } = await openFirst()
    md.value = '只在内存里的正文'
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('存储空间不足', 'QuotaExceededError')
    })
    expect(api.leave()).toBe(false)
    expect(api.activeArticle.value).toBe(first)
    expect(md.value).toBe('只在内存里的正文')
    expect(api.error.value).toContain('备份失败')
  })

  it('旧文备份失败时不能切换到另一篇文章', async () => {
    const { md, api } = await openFirst()
    md.value = '第一篇仍未保存'
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('存储空间不足', 'QuotaExceededError')
    })
    await api.open(second)
    expect(api.activeArticle.value).toBe(first)
    expect(md.value).toBe('第一篇仍未保存')
    expect(api.error.value).toContain('备份失败')
  })
})

describe('外部编辑和冲突', () => {
  it.each([false, true])('获得焦点刷新外部新建的文章（当前已打开文章：%s）', async (hasActiveArticle) => {
    mounted = mountLibrary()
    await mounted.api.connect()
    if (hasActiveArticle) await mounted.api.open(first)
    const priorText = mounted.md.value
    const added = article('2026-10-24-agent-created')
    fs.listArticles.mockResolvedValue([first, second, added])
    window.dispatchEvent(new Event('focus'))
    await settle()
    expect(mounted.api.articles.value.map((entry) => entry.name)).toContain(added.name)
    expect(mounted.md.value).toBe(priorText)
    expect(fs.writeArticle).not.toHaveBeenCalled()
  })

  it('重新获得焦点时，未修改的文章自动载入外部版本', async () => {
    const { md, api } = await openFirst()
    disk.set(first.file, { text: '外部编辑器保存的正文', lastModified: 300 })
    window.dispatchEvent(new Event('focus'))
    await settle()
    expect(md.value).toBe('外部编辑器保存的正文')
    expect(api.dirty.value).toBe(false)
    expect(api.conflict.value).toBeNull()
    expect(fs.writeArticle).not.toHaveBeenCalled()
  })

  it('两边都修改时保留本地内容，选择磁盘版本后才替换并清缓冲', async () => {
    const { md, api } = await openFirst()
    md.value = '本地未保存的正文'
    await vi.advanceTimersByTimeAsync(2000)
    disk.set(first.file, { text: '外部版本', lastModified: 300 })
    window.dispatchEvent(new Event('focus'))
    await settle()
    expect(md.value).toBe('本地未保存的正文')
    expect(api.conflict.value).toEqual({ lastModified: 300 })
    expect(fs.writeArticle).not.toHaveBeenCalled()
    await api.loadDiskVersion()
    expect(md.value).toBe('外部版本')
    expect(api.conflict.value).toBeNull()
    expect(buffer()).toBeNull()
  })

  it('写盘前也检测外部改动，得到覆盖选择后才写入', async () => {
    const { md, api } = await openFirst()
    md.value = '本地正文'
    disk.set(first.file, { text: '外部版本', lastModified: 300 })
    await api.save()
    expect(api.conflict.value).toEqual({ lastModified: 300 })
    expect(fs.writeArticle).not.toHaveBeenCalled()
    await api.overwrite()
    expect(disk.get(first.file)?.text).toBe('本地正文')
    expect(api.conflict.value).toBeNull()
    expect(api.dirty.value).toBe(false)
  })

  it('冲突对话期间磁盘再次改动，覆盖选择不能跳过新的版本检查', async () => {
    const { md, api } = await openFirst()
    md.value = '本地正文'
    disk.set(first.file, { text: '外部版本一', lastModified: 300 })
    await api.save()
    disk.set(first.file, { text: '外部版本二', lastModified: 400 })
    await api.overwrite()
    expect(fs.writeArticle).not.toHaveBeenCalled()
    expect(api.conflict.value).toEqual({ lastModified: 400 })
    expect(md.value).toBe('本地正文')
  })

  it('磁盘与崩溃备份都变化时，恢复备份并提示冲突', async () => {
    localStorage.setItem(bufferKey(), JSON.stringify({ text: '旧会话未保存正文', lastModified: 50 }))
    const { md, api } = await openFirst()
    expect(md.value).toBe('旧会话未保存正文')
    expect(api.conflict.value).toEqual({ lastModified: 100 })
    expect(fs.writeArticle).not.toHaveBeenCalled()
  })

  it('写盘失败不清除缓冲，也不会显示已保存', async () => {
    const { md, api } = await openFirst()
    md.value = '不能丢失的正文'
    await vi.advanceTimersByTimeAsync(2000)
    fs.writeArticle.mockRejectedValueOnce(new DOMException('没有写入权限', 'NotAllowedError'))
    await api.save()
    expect(buffer()).toEqual({ text: '不能丢失的正文', lastModified: 100 })
    expect(api.dirty.value).toBe(true)
    expect(api.error.value).toContain('没有写入权限')
  })
})
