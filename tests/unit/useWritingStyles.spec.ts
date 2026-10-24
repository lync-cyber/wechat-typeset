// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent, h, nextTick, ref, shallowRef } from 'vue'
import { useWritingStyles } from '../../src/ui/composables/useWritingStyles'
import { defaultWritingStyles, type WritingStylesDocument } from '../../src/domain/publish/writingStyles'
import { parseFrontmatter } from '../../src/core/pipeline/frontmatter'

const BROWSER_KEY = 'wechat-typeset:writing-styles'
const FILE_NAME = '.writing-styles.json'
const unmounts: (() => void)[] = []

function configNamed(name: string): WritingStylesDocument {
  const config = defaultWritingStyles()
  config.styles[0].name = name
  return config
}

function mockFile(initialText: string, initialTime = 1) {
  const state = { text: initialText, lastModified: initialTime }
  let pending = initialText
  const writable = {
    write: vi.fn(async (value: string) => { pending = value }),
    close: vi.fn(async () => { state.text = pending; state.lastModified += 1 }),
    abort: vi.fn(async () => {}),
  }
  const handle = {
    kind: 'file', name: FILE_NAME,
    getFile: vi.fn(async () => ({ text: async () => state.text, lastModified: state.lastModified })),
    createWritable: vi.fn(async () => writable),
  } as unknown as FileSystemFileHandle
  return { handle, state, writable }
}

function mockDirectory(name: string, file: FileSystemFileHandle | null = null) {
  const state = { file }
  const handle = {
    kind: 'directory', name,
    getFileHandle: vi.fn(async (filename: string, options?: FileSystemGetFileOptions) => {
      expect(filename).toBe(FILE_NAME)
      if (!state.file && options?.create) state.file = mockFile('').handle
      if (!state.file) throw new DOMException('不存在', 'NotFoundError')
      return state.file
    }),
  } as unknown as FileSystemDirectoryHandle
  return { handle, state }
}

function mountStyles(initialDirectory: FileSystemDirectoryHandle | null = null, initialMd = '正文。') {
  const directory = shallowRef(initialDirectory)
  const md = ref(initialMd)
  let api!: ReturnType<typeof useWritingStyles>
  const app = createApp(defineComponent({
    setup() { api = useWritingStyles({ directory, md }); return () => h('div') },
  }))
  app.mount(document.createElement('div'))
  unmounts.push(() => app.unmount())
  return { api, directory, md }
}

async function settle() {
  // 文件读取包含 getFileHandle / getFile / text 三段 Promise，等待一次事件循环结算。
  await new Promise<void>((resolve) => setTimeout(resolve, 0))
  await nextTick()
}

beforeEach(() => { localStorage.clear() })
afterEach(() => {
  unmounts.splice(0).forEach((unmount) => unmount())
  vi.restoreAllMocks()
})

describe('useWritingStyles · 读取与选择', () => {
  it('未关联文章库使用浏览器配置，本文选择写入 frontmatter', async () => {
    const config = configNamed('浏览器风格')
    config.styles.push({ ...structuredClone(config.styles[0]), id: 'short', name: '短评' })
    localStorage.setItem(BROWSER_KEY, JSON.stringify(config))
    const { api, md } = mountStyles()
    await settle()
    expect(api.activeStyle.value?.name).toBe('浏览器风格')
    expect(api.select('short')).toBe(true)
    expect(parseFrontmatter(md.value).publication.writingStyle).toBe('short')
    expect(api.activeStyle.value?.name).toBe('短评')
    expect(api.config.value.defaultId).toBe(config.defaultId)
  })

  it('本文绑定不存在的风格时提示选择，不偷偷替换为默认风格', async () => {
    const { api } = mountStyles(null, '---\nwritingStyle: missing\n---\n正文。')
    await settle()
    expect(api.selectedId.value).toBe('missing')
    expect(api.activeStyle.value).toBeNull()
    expect(api.error.value).toContain('不存在')
  })

  it('磁盘优先；缺失文件才回退浏览器，读取不会自动创建配置文件', async () => {
    localStorage.setItem(BROWSER_KEY, JSON.stringify(configNamed('浏览器')))
    const disk = mockFile(JSON.stringify(configNamed('磁盘')))
    const a = mockDirectory('A', disk.handle)
    const b = mockDirectory('B')
    const { api, directory } = mountStyles(a.handle)
    await settle()
    expect(api.activeStyle.value?.name).toBe('磁盘')
    directory.value = b.handle
    await settle()
    expect(api.activeStyle.value?.name).toBe('浏览器')
    expect(b.state.file).toBeNull()
  })

  it('慢速旧目录读取不会覆盖切换后的目录配置', async () => {
    const a = mockDirectory('A', mockFile(JSON.stringify(configNamed('A'))).handle)
    const b = mockDirectory('B', mockFile(JSON.stringify(configNamed('B'))).handle)
    let release!: (handle: FileSystemFileHandle) => void
    vi.spyOn(a.handle, 'getFileHandle').mockReturnValueOnce(new Promise((resolve) => { release = resolve }))
    const { api, directory } = mountStyles(a.handle)
    expect(api.activeStyle.value).toBeNull()
    expect(api.canEdit.value).toBe(false)
    directory.value = b.handle
    expect(api.activeStyle.value).toBeNull()
    await settle()
    expect(api.activeStyle.value?.name).toBe('B')
    expect(api.canEdit.value).toBe(true)
    release(a.state.file!)
    await settle()
    expect(api.activeStyle.value?.name).toBe('B')
    expect(api.error.value).toBe('')
  })

  it('损坏的磁盘 JSON 报错并禁止覆盖；修复后重载才允许保存', async () => {
    const file = mockFile('{broken')
    const { api } = mountStyles(mockDirectory('A', file.handle).handle)
    await settle()
    expect(api.error.value).toContain('格式错误')
    expect(api.activeStyle.value).toBeNull()
    expect(api.canEdit.value).toBe(false)
    expect(api.select(api.config.value.defaultId)).toBe(false)
    expect(await api.save(configNamed('新配置'))).toBe(false)
    expect(file.handle.createWritable).not.toHaveBeenCalled()
    expect(file.state.text).toBe('{broken')
    file.state.text = JSON.stringify(configNamed('修复的配置'))
    file.state.lastModified++
    await api.reload()
    expect(api.activeStyle.value?.name).toBe('修复的配置')
    expect(api.canEdit.value).toBe(true)
    expect(await api.save(configNamed('正常保存'))).toBe(true)
  })

  it('权限失败时不使用默认或浏览器规则检查，重新载入成功才恢复编辑', async () => {
    localStorage.setItem(BROWSER_KEY, JSON.stringify(configNamed('浏览器兜底')))
    const file = mockFile(JSON.stringify(configNamed('磁盘配置')))
    const root = mockDirectory('A', file.handle)
    vi.spyOn(root.handle, 'getFileHandle').mockRejectedValueOnce(new DOMException('请授权', 'NotAllowedError'))
    const { api } = mountStyles(root.handle)
    await settle()
    expect(api.error.value).toContain('请授权')
    expect(api.activeStyle.value).toBeNull()
    expect(api.canEdit.value).toBe(false)
    expect(await api.save(configNamed('不能覆盖'))).toBe(false)
    expect(file.handle.createWritable).not.toHaveBeenCalled()
    await api.reload()
    expect(api.activeStyle.value?.name).toBe('磁盘配置')
    expect(api.canEdit.value).toBe(true)
    expect(api.error.value).toBe('')
  })
})

describe('useWritingStyles · 明确保存与失败保护', () => {
  it('未关联时保存到浏览器；关联缺失文件时明确保存才创建磁盘文件', async () => {
    const { api, directory } = mountStyles()
    await settle()
    expect(await api.save(configNamed('先在浏览器'))).toBe(true)
    expect(JSON.parse(localStorage.getItem(BROWSER_KEY)!).styles[0].name).toBe('先在浏览器')
    const root = mockDirectory('A')
    directory.value = root.handle
    await settle()
    expect(await api.save(configNamed('保存到文件'))).toBe(true)
    const saved = await root.state.file!.getFile()
    expect(JSON.parse(await saved.text()).styles[0].name).toBe('保存到文件')
    expect(JSON.parse(localStorage.getItem(BROWSER_KEY)!).styles[0].name).toBe('先在浏览器')
  })

  it('浏览器存储失败保留此前配置并返回可见错误', async () => {
    const { api } = mountStyles()
    await settle()
    const before = api.config.value
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => { throw new DOMException('满了', 'QuotaExceededError') })
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(await api.save(configNamed('保存失败'))).toBe(false)
    expect(api.config.value).toBe(before)
    expect(api.error.value).toContain('浏览器存储写入失败')
    expect(api.saving.value).toBe(false)
  })

  it('磁盘关闭提交失败不更新配置和保存基线', async () => {
    const file = mockFile(JSON.stringify(configNamed('原配置')))
    const { api } = mountStyles(mockDirectory('A', file.handle).handle)
    await settle()
    file.writable.close.mockRejectedValueOnce(new DOMException('被占用', 'NoModificationAllowedError'))
    expect(await api.save(configNamed('失败配置'))).toBe(false)
    expect(api.activeStyle.value?.name).toBe('原配置')
    expect(api.error.value).toContain('未保存')
    expect(file.writable.abort).toHaveBeenCalledOnce()
    expect(await api.save(configNamed('重试成功'))).toBe(true)
  })

  it('外部修改、创建或删除配置时拒绝覆盖，并要求重新载入', async () => {
    const file = mockFile(JSON.stringify(configNamed('原配置')))
    const root = mockDirectory('A', file.handle)
    const { api } = mountStyles(root.handle)
    await settle()
    file.state.text = JSON.stringify(configNamed('外部修改'))
    file.state.lastModified++
    expect(await api.save(configNamed('浏览器修改'))).toBe(false)
    expect(file.handle.createWritable).not.toHaveBeenCalled()
    expect(api.error.value).toContain('重新载入')
    expect(api.activeStyle.value).toBeNull()
    expect(api.canEdit.value).toBe(false)
    await api.reload()
    expect(api.activeStyle.value?.name).toBe('外部修改')
    expect(api.canEdit.value).toBe(true)
    root.state.file = null
    expect(await api.save(configNamed('文件已删除'))).toBe(false)
    expect(root.state.file).toBeNull()
    await api.reload()
    root.state.file = file.handle
    expect(await api.save(configNamed('文件突然出现'))).toBe(false)
  })

  it('保存等待文件读取时切库，不把旧配置写进新目录或旧目录', async () => {
    const fileA = mockFile(JSON.stringify(configNamed('A')))
    const a = mockDirectory('A', fileA.handle)
    const fileB = mockFile(JSON.stringify(configNamed('B')))
    const b = mockDirectory('B', fileB.handle)
    const { api, directory } = mountStyles(a.handle)
    await settle()
    let release!: (handle: FileSystemFileHandle) => void
    vi.spyOn(a.handle, 'getFileHandle').mockReturnValueOnce(new Promise((resolve) => { release = resolve }))
    const saving = api.save(configNamed('A的待保存内容'))
    directory.value = b.handle
    await settle()
    release(fileA.handle)
    expect(await saving).toBe(false)
    expect(fileA.handle.createWritable).not.toHaveBeenCalled()
    expect(fileB.handle.createWritable).not.toHaveBeenCalled()
    expect(api.activeStyle.value?.name).toBe('B')
  })

  it('domain 校验失败时不写入存储', async () => {
    const { api } = mountStyles()
    await settle()
    const write = vi.spyOn(localStorage, 'setItem')
    const invalid = configNamed('非法范围')
    invalid.styles[0].rules.minWords = 4000
    invalid.styles[0].rules.maxWords = 1000
    expect(await api.save(invalid)).toBe(false)
    expect(write).not.toHaveBeenCalled()
    expect(api.error.value).toContain('下限不能大于上限')
  })
})
