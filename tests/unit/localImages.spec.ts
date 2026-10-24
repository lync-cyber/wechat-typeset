// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import MarkdownIt from 'markdown-it'
import { createMarkdown } from '../../src/core/pipeline/markdown'
import { compressImageToWebp } from '../../src/infra/clipboard/imageIntake'
import { listArticleImages, resolveLocalImages, writeLocalImage } from '../../src/infra/fs/images'

vi.mock('../../src/infra/clipboard/imageIntake', async (importOriginal) => ({
  ...await importOriginal<typeof import('../../src/infra/clipboard/imageIntake')>(),
  compressImageToWebp: vi.fn(async () => 'data:image/webp;base64,UklGRg=='),
}))

function mockFile(name: string, text = 'image', lastModified = 1, type = 'image/webp') {
  const state = { file: new File([text], name, { type, lastModified }) }
  let pending: Blob | null = null
  const writable = {
    write: vi.fn(async (blob: Blob) => { pending = blob }),
    close: vi.fn(async () => {
      if (pending) state.file = new File([pending], name, { type: pending.type, lastModified: state.file.lastModified + 1 })
    }),
    abort: vi.fn(async () => {}),
  }
  const handle = {
    kind: 'file', name,
    getFile: vi.fn(async () => state.file),
    createWritable: vi.fn(async () => writable),
  } as unknown as FileSystemFileHandle
  return { handle, state, writable }
}

function mockDirectory(name: string, children: FileSystemHandle[] = []) {
  const entries = new Map(children.map((entry) => [entry.name, entry]))
  const handle = {
    kind: 'directory', name,
    async *values() { yield* entries.values() },
    async getDirectoryHandle(child: string, options?: FileSystemGetDirectoryOptions) {
      const existing = entries.get(child)
      if (existing?.kind === 'file') throw new DOMException('是文件', 'TypeMismatchError')
      if (existing) return existing
      if (!options?.create) throw new DOMException('不存在', 'NotFoundError')
      const created = mockDirectory(child).handle
      entries.set(child, created)
      return created
    },
    async getFileHandle(child: string, options?: FileSystemGetFileOptions) {
      const existing = entries.get(child)
      if (existing?.kind === 'directory') throw new DOMException('是目录', 'TypeMismatchError')
      if (existing) return existing
      if (!options?.create) throw new DOMException('不存在', 'NotFoundError')
      const created = mockFile(child).handle
      entries.set(child, created)
      return created
    },
  } as unknown as FileSystemDirectoryHandle
  return { handle, entries }
}

function articleWith(...images: FileSystemHandle[]) {
  return mockDirectory('article', [mockDirectory('images', images).handle]).handle
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.mocked(compressImageToWebp).mockReset().mockResolvedValue('data:image/webp;base64,UklGRg==')
})

describe('resolveLocalImages', () => {
  it('替换正文图片并保留 alt、title、普通链接及发布信息', async () => {
    const md = '---\ntitle: 标题\ncover: images/one.webp\n---\n![说明](images/one.webp "图片标题")\n\n[原图](images/one.webp)'
    const result = await resolveLocalImages(md, articleWith(mockFile('one.webp').handle))
    expect(result.md).toContain('cover: images/one.webp')
    expect(result.md).toContain('![说明](data:image/webp;base64,aW1hZ2U= "图片标题")')
    expect(result.md).toContain('[原图](images/one.webp)')
    expect(result.missing).toEqual([])
    expect(new MarkdownIt().render(result.md)).toContain('<img src="data:image/webp;base64,aW1hZ2U="')
  })

  it('支持完整、折叠、简写引用式图片，保留同名普通链接', async () => {
    const md = '![说明][shot]\n\n![shot][]\n\n![shot]\n\n[查看][shot]\n\n[shot]: images/one.webp "原图"'
    const result = await resolveLocalImages(md, articleWith(mockFile('one.webp').handle))
    expect(result.md.match(/data:image\/webp;base64,/g)).toHaveLength(3)
    expect(result.md).toContain('[查看][shot]')
    expect(result.md).toContain('[shot]: images/one.webp "原图"')
    expect(result.missing).toEqual([])
  })

  it('代码块、行内代码、转义图片语法和站外图片不读取本地文件', async () => {
    const md = [
      '`![](images/inline.webp)`', '', '```md', '![](images/fence.webp)', '```', '',
      '~~~', '![](images/tilde.webp)', '~~~', '', '    ![](images/indent.webp)', '',
      '\\![](images/escaped.webp)', '', '![](https://example.com/image.webp)',
    ].join('\n')
    const dir = mockDirectory('article')
    const getDirectory = vi.spyOn(dir.handle, 'getDirectoryHandle')
    await expect(resolveLocalImages(md, dir.handle)).resolves.toEqual({ md, missing: [] })
    expect(getDirectory).not.toHaveBeenCalled()
  })

  it('容器、引用和列表内图片按实际 Markdown 语法解析', async () => {
    const md = '::: tip\n![容器](images/a.webp)\n:::\n\n> ![引用](images/a.webp)\n\n- ![列表](images/a.webp)'
    const result = await resolveLocalImages(md, articleWith(mockFile('a.webp').handle))
    expect(result.md.match(/data:image\/webp;base64,/g)).toHaveLength(3)
    expect(result.md).toContain('> ![引用]')
    expect(result.md).toContain('- ![列表]')
  })

  it('image-caption 的 src 落到 data URI，保留图注、引号和其它属性', async () => {
    const md = '::: image-caption variant=plain src="images/图 片.webp" alt="正文配图" 图 1 · 注释\n图下正文。\n:::'
    const result = await resolveLocalImages(md, articleWith(mockFile('图 片.webp').handle))
    expect(result.md).toBe(md.replace('src="images/图 片.webp"', 'src="data:image/webp;base64,aW1hZ2U="'))
    expect(result.missing).toEqual([])
    expect(createMarkdown().render(result.md)).toContain('src="data:image/webp;base64,aW1hZ2U="')
    expect(createMarkdown().render(result.md)).toContain('图 1 · 注释')
  })

  it('gallery 中单双引号与不加引号的 image-item src 都正确解析', async () => {
    const md = [
      ':::: gallery 双图 variant=duo',
      "::: image-item alt='左图' src='images/a.webp' 左图注释", ':::',
      '::: image-item src=images/b.webp alt="右图" 右图注释', ':::', '::::',
    ].join('\n')
    const result = await resolveLocalImages(md, articleWith(mockFile('a.webp', 'a').handle, mockFile('b.webp', 'b').handle))
    expect(result.md).toBe(md.replace("src='images/a.webp'", "src='data:image/webp;base64,YQ=='")
      .replace('src=images/b.webp', 'src=data:image/webp;base64,Yg=='))
    expect(createMarkdown().render(result.md).match(/src="data:image\/webp;base64,/g)).toHaveLength(2)
  })

  it('容器缺图加入缺失列表，同一文件与 Markdown 图片去重', async () => {
    const md = '::: image-caption src="images/missing.webp" 图注\n:::\n\n![](images/missing.webp)'
    await expect(resolveLocalImages(md, mockDirectory('article').handle)).resolves.toEqual({
      md, missing: ['images/missing.webp'],
    })
  })

  it('代码内的容器示例、普通文字 src 和无关容器不替换', async () => {
    const md = [
      '```md', '::: image-caption src="images/code.webp"', ':::', '```', '',
      '~~~', '::: image-item src=images/tilde.webp', ':::', '~~~', '',
      '`::: image-caption src="images/inline.webp"`', '',
      '普通文本 src="images/text.webp"', '',
      '::: tip src="images/tip.webp"', '提示正文。', ':::', '',
      ':::: gallery src=images/gallery.webp', '::::',
    ].join('\n')
    const dir = mockDirectory('article')
    const getDirectory = vi.spyOn(dir.handle, 'getDirectoryHandle')
    await expect(resolveLocalImages(md, dir.handle)).resolves.toEqual({ md, missing: [] })
    expect(getDirectory).not.toHaveBeenCalled()
  })

  it('只处理 parseInfo 最后生效的 src，不把 alt 内或 data-src 当成 src', async () => {
    const md = '::: image-caption data-src=images/no.webp alt="src=images/example.webp" src=images/old.webp src="images/a.webp" 图注\n:::'
    const result = await resolveLocalImages(md, articleWith(mockFile('a.webp').handle))
    expect(result.md).toBe(md.replace('src="images/a.webp"', 'src="data:image/webp;base64,aW1hZ2U="'))
    expect(result.missing).toEqual([])
  })

  it('引用块内容器保持源码位置，编码路径与目录穿越沿用同一检查', async () => {
    const md = '> ::: image-caption src="images/a%20b.webp" 图注\r\n> :::\r\n\r\n::: image-caption src=images/../private.webp\r\n:::'
    const result = await resolveLocalImages(md, articleWith(mockFile('a b.webp').handle))
    expect(result.md).toBe(md.replace('src="images/a%20b.webp"', 'src="data:image/webp;base64,aW1hZ2U="'))
    expect(result.missing).toEqual(['images/../private.webp'])
  })

  it('author-bio 的 avatar 正常解析并报告缺失，保留署名与角色', async () => {
    const md = '::: author-bio name="作者" role="个人作者" avatar="images/avatar.webp"\n文末简介。\n:::'
    const result = await resolveLocalImages(md, articleWith(mockFile('avatar.webp').handle))
    expect(result.md).toBe(md.replace('avatar="images/avatar.webp"', 'avatar="data:image/webp;base64,aW1hZ2U="'))
    expect(createMarkdown().render(result.md)).toContain('src="data:image/webp;base64,aW1hZ2U="')
    await expect(resolveLocalImages(md, mockDirectory('article').handle)).resolves.toEqual({
      md, missing: ['images/avatar.webp'],
    })
  })

  it('引用定义的标题不是正文图片，不配对反引号不会跨段遮住图片', async () => {
    const md = '`未闭合\n\n![正文](images/a.webp)\n\n`另一段\n\n[x]: images/a.webp "![示例](images/gone.webp)"'
    const result = await resolveLocalImages(md, articleWith(mockFile('a.webp').handle))
    expect(result.missing).toEqual([])
    expect(result.md).toContain('![正文](data:image/webp;base64,')
    expect(result.md).toContain('"![示例](images/gone.webp)"')
  })

  it('表格中的图片可以解析', async () => {
    const md = '| 图片 |\n| --- |\n| ![](images/a.webp) |'
    const result = await resolveLocalImages(md, articleWith(mockFile('a.webp').handle))
    expect(result.md).toContain('| ![](data:image/webp;base64,')
  })

  it('支持空格、URL 编码、转义括号和 Unicode 文件名', async () => {
    const md = '![a](<images/图 片.png>)\n\n![b](images/图%20片.png)\n\n![c](images/a\\(1\\).webp)'
    const result = await resolveLocalImages(md, articleWith(
      mockFile('图 片.png', 'png', 1, 'image/png').handle,
      mockFile('a(1).webp').handle,
    ))
    expect(result.missing).toEqual([])
    expect(result.md.match(/data:image/g)).toHaveLength(3)
  })

  it('缺失文件保持源码，正文与封面缺失去重列出', async () => {
    const md = '---\ncover: images/cover.webp\n---\n![](images/gone.webp)\n\n![](images/gone.webp)'
    await expect(resolveLocalImages(md, mockDirectory('article').handle)).resolves.toEqual({
      md, missing: ['images/gone.webp', 'images/cover.webp'],
    })
  })

  it('拒绝明文和编码后的目录穿越，不访问目录以外路径', async () => {
    const md = '![](images/../private.webp)\n\n![](images/%2E%2E/private.webp)\n\n![](images/%2Fsecret.webp)'
    const dir = mockDirectory('article')
    const getDirectory = vi.spyOn(dir.handle, 'getDirectoryHandle')
    const result = await resolveLocalImages(md, dir.handle)
    expect(result.md).toBe(md)
    expect(result.missing).toHaveLength(3)
    expect(getDirectory).not.toHaveBeenCalled()
  })

  it('缓存按目录、路径、修改时间和大小隔离；文件删除后不继续使用旧图', async () => {
    const a = mockFile('same.webp', 'a', 1)
    const images = mockDirectory('images', [a.handle])
    const dir = mockDirectory('article', [images.handle]).handle
    const md = '![](images/same.webp)'
    const read = vi.spyOn(FileReader.prototype, 'readAsDataURL')
    const first = await resolveLocalImages(md, dir)
    expect((await resolveLocalImages(md, dir)).md).toBe(first.md)
    expect(read).toHaveBeenCalledTimes(1)
    a.state.file = new File(['b'], 'same.webp', { type: 'image/webp', lastModified: 2 })
    expect((await resolveLocalImages(md, dir)).md).not.toBe(first.md)
    a.state.file = new File(['bb'], 'same.webp', { type: 'image/webp', lastModified: 2 })
    await resolveLocalImages(md, dir)
    expect(read).toHaveBeenCalledTimes(3)
    const other = await resolveLocalImages(md, articleWith(mockFile('same.webp', 'other', 2).handle))
    expect(other.md).toContain('b3RoZXI=')
    images.entries.delete('same.webp')
    await expect(resolveLocalImages(md, dir)).resolves.toEqual({ md, missing: ['images/same.webp'] })
  })

  it('读权限错误上报，不伪装为图片不存在', async () => {
    const dir = mockDirectory('article')
    const error = new DOMException('没有权限', 'NotAllowedError')
    vi.spyOn(dir.handle, 'getDirectoryHandle').mockRejectedValueOnce(error)
    await expect(resolveLocalImages('![](images/a.webp)', dir.handle)).rejects.toBe(error)
  })

  it('保留 CRLF 源码位置与 frontmatter 边界', async () => {
    const md = '---\r\ntitle: 测试\r\n---\r\n# 标题\r\n\r\n![](images/a.webp)\r\n'
    const result = await resolveLocalImages(md, articleWith(mockFile('a.webp').handle))
    expect(result.md).toBe(md.replace('![](images/a.webp)', '![](data:image/webp;base64,aW1hZ2U=)'))
  })
})

describe('listArticleImages', () => {
  it('只列 images 下的图片文件，并处理空文件夹', async () => {
    const dir = articleWith(mockFile('B.JPG').handle, mockFile('a.webp').handle, mockFile('note.txt').handle, mockDirectory('nested').handle)
    expect(await listArticleImages(dir)).toEqual(['images/a.webp', 'images/B.JPG'])
    expect(await listArticleImages(mockDirectory('article').handle)).toEqual([])
  })

  it('递归列出子目录图片，保留相对路径并过滤非图片文件', async () => {
    const nested = mockDirectory('album.png', [
      mockFile('z.webp').handle,
      mockDirectory('deep', [mockFile('图 1.PNG').handle, mockFile('note.txt').handle]).handle,
    ])
    const dir = articleWith(nested.handle, mockFile('a.webp').handle)
    expect(await listArticleImages(dir)).toEqual([
      'images/a.webp', 'images/album.png/deep/图 1.PNG', 'images/album.png/z.webp',
    ])
    const resolved = await resolveLocalImages('![](<images/album.png/deep/图 1.PNG>)', dir)
    expect(resolved.missing).toEqual([])
    expect(resolved.md).toContain('data:image/webp;base64,')
  })

  it('子目录无法读取时上报错误，不把不完整列表当成图片缺失', async () => {
    const nested = mockDirectory('nested')
    const error = new DOMException('没有权限', 'NotAllowedError')
    vi.spyOn(nested.handle as FileSystemDirectoryHandle & { values(): AsyncIterableIterator<FileSystemHandle> }, 'values')
      .mockImplementation(() => { throw error })
    await expect(listArticleImages(articleWith(mockFile('a.webp').handle, nested.handle))).rejects.toBe(error)
  })
})

describe('writeLocalImage', () => {
  it('小图也调用 WebP 压缩，写入真实 WebP Blob；同时间戳不覆盖文件或目录', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(123)
    const existing = mockFile('123.webp', '原图')
    const images = mockDirectory('images', [existing.handle, mockDirectory('123-2.webp').handle])
    const dir = mockDirectory('article', [images.handle]).handle
    const file = new File(['png'], 'tiny.png', { type: 'image/png' })
    const result = await writeLocalImage(dir, file, { quality: 0.7 })
    expect(result).toBe('images/123-3.webp')
    expect(compressImageToWebp).toHaveBeenCalledWith(file, { quality: 0.7 })
    const saved = await (images.entries.get('123-3.webp') as FileSystemFileHandle).getFile()
    expect(saved.type).toBe('image/webp')
    expect(saved.size).toBe(4)
    expect(existing.state.file.size).toBe(new Blob(['原图']).size)
  })

  it('并行粘贴分配不同文件名', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(456)
    const dir = mockDirectory('article').handle
    const file = new File(['png'], 'a.png', { type: 'image/png' })
    expect(await Promise.all([writeLocalImage(dir, file), writeLocalImage(dir, file)])).toEqual([
      'images/456.webp', 'images/456-2.webp',
    ])
  })

  it('编码失败不建 images 目录，队列恢复后可以继续写', async () => {
    const dir = mockDirectory('article')
    const file = new File(['bad'], 'a.png', { type: 'image/png' })
    vi.mocked(compressImageToWebp).mockRejectedValueOnce(new Error('解码失败'))
    await expect(writeLocalImage(dir.handle, file)).rejects.toThrow('解码失败')
    expect(dir.entries.size).toBe(0)
    await expect(writeLocalImage(dir.handle, file)).resolves.toMatch(/^images\/\d+\.webp$/)
  })

  it('不把其他 MIME 数据伪装成 .webp 文件', async () => {
    vi.mocked(compressImageToWebp).mockResolvedValueOnce('data:image/png;base64,cG5n')
    await expect(writeLocalImage(mockDirectory('article').handle, new File(['png'], 'a.png', { type: 'image/png' })))
      .rejects.toThrow('未能生成 WebP')
  })
})
