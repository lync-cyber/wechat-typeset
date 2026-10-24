/**
 * 图片入站契约测试
 *
 * 只断言"provider 接口约定 + 文件筛选 + 串行顺序 + 错误降级"这四件事。
 * 编码测试模拟 canvas 返回值，验证质量阶梯、MIME 与失败语义；真实图像由手动验收核对。
 */

import { afterEach, describe, it, expect, vi } from 'vitest'
import {
  uploadImages,
  isImageFile,
  setImageProvider,
  getImageProvider,
  base64Provider,
  compressImageToWebp,
  type ImageProvider,
  DEFAULT_TARGET_BYTES,
  DEFAULT_TOTAL_BUDGET_BYTES,
} from '../../src/infra/clipboard/imageIntake'

function makeFile(name: string, type: string, size = 100): File {
  const blob = new Blob(['x'.repeat(size)], { type })
  // jsdom 的 File 构造器存在；size 由内容长度决定
  return new File([blob], name, { type })
}

describe('isImageFile', () => {
  it('image/* 返回 true', () => {
    expect(isImageFile(makeFile('a.png', 'image/png'))).toBe(true)
    expect(isImageFile(makeFile('a.webp', 'image/webp'))).toBe(true)
    expect(isImageFile(makeFile('a.svg', 'image/svg+xml'))).toBe(true)
  })

  it('非图片返回 false', () => {
    expect(isImageFile(makeFile('a.txt', 'text/plain'))).toBe(false)
    expect(isImageFile(makeFile('a.pdf', 'application/pdf'))).toBe(false)
    expect(isImageFile(makeFile('noext', ''))).toBe(false)
  })
})

describe('uploadImages · provider 接口', () => {
  const ok: ImageProvider = {
    name: 'mock-ok',
    async upload(file) {
      return `https://cdn.example.com/${encodeURIComponent(file.name)}`
    },
  }

  it('每个图片产出一行 ![alt](src)，alt 取文件名（去扩展名）', async () => {
    const md = await uploadImages(
      [makeFile('photo one.png', 'image/png'), makeFile('b.jpg', 'image/jpeg')],
      ok,
    )
    expect(md).toContain('![photo one](https://cdn.example.com/photo%20one.png)')
    expect(md).toContain('![b](https://cdn.example.com/b.jpg)')
    // 两图之间用空行分隔
    expect(md.split('\n\n').length).toBe(2)
  })

  it('非图片文件被过滤，不走 provider', async () => {
    let calls = 0
    const counting: ImageProvider = {
      name: 'count',
      async upload(f) {
        calls++
        return `x:${f.name}`
      },
    }
    await uploadImages(
      [makeFile('a.png', 'image/png'), makeFile('b.txt', 'text/plain')],
      counting,
    )
    expect(calls).toBe(1)
  })

  it('串行保序：后一项上传晚于前一项也保持原顺序', async () => {
    const timeline: string[] = []
    const slow: ImageProvider = {
      name: 'slow',
      async upload(f) {
        // 第一项更慢，若并发会被第二项赶超——断言最终结果仍按输入顺序
        const delay = f.name === 'a.png' ? 20 : 5
        await new Promise((r) => setTimeout(r, delay))
        timeline.push(f.name)
        return `x:${f.name}`
      },
    }
    const md = await uploadImages(
      [makeFile('a.png', 'image/png'), makeFile('b.png', 'image/png')],
      slow,
    )
    expect(timeline).toEqual(['a.png', 'b.png'])
    expect(md.indexOf('a.png')).toBeLessThan(md.indexOf('b.png'))
  })

  it('单项失败不阻断剩余项，失败项写为 HTML 注释', async () => {
    const flaky: ImageProvider = {
      name: 'flaky',
      async upload(f) {
        if (f.name === 'bad.png') throw new Error('upload 500')
        return `x:${f.name}`
      },
    }
    const md = await uploadImages(
      [
        makeFile('good1.png', 'image/png'),
        makeFile('bad.png', 'image/png'),
        makeFile('good2.png', 'image/png'),
      ],
      flaky,
    )
    expect(md).toContain('![good1](x:good1.png)')
    expect(md).toContain('![good2](x:good2.png)')
    expect(md).toMatch(/<!-- image upload failed: bad\.png/)
  })

  it('opts.alt 覆盖默认文件名', async () => {
    const md = await uploadImages([makeFile('weird name.png', 'image/png')], ok, {
      alt: '配图',
    })
    expect(md).toContain('![配图]')
  })

  it('空数组返回空串', async () => {
    expect(await uploadImages([], ok)).toBe('')
  })
})

describe('uploadImages · 总量闸门', () => {
  const KB = 1024
  function bigSrcProvider(payloadBytes: number): ImageProvider {
    return {
      name: 'big',
      async upload(file) {
        return `data:image/webp;base64,${'A'.repeat(payloadBytes)}#${file.name}`
      },
    }
  }

  it('累计未超预算时按原样返回所有项', async () => {
    const files = [
      makeFile('a.png', 'image/png'),
      makeFile('b.png', 'image/png'),
      makeFile('c.png', 'image/png'),
    ]
    const md = await uploadImages(files, bigSrcProvider(10 * KB), { totalBudgetBytes: 100 * KB })
    expect(md).toContain('a.png')
    expect(md).toContain('b.png')
    expect(md).toContain('c.png')
    expect(md).not.toMatch(/budget exceeded/)
  })

  it('超总量预算后停余下项，写注释带剩余张数', async () => {
    const files = [
      makeFile('a.png', 'image/png'),
      makeFile('b.png', 'image/png'),
      makeFile('c.png', 'image/png'),
      makeFile('d.png', 'image/png'),
    ]
    // 每张 50 KB；预算 80 KB → 第 2 张后即超
    const md = await uploadImages(files, bigSrcProvider(50 * KB), { totalBudgetBytes: 80 * KB })
    expect(md).toContain('a.png')
    expect(md).toContain('b.png')
    expect(md).not.toContain('c.png')
    expect(md).not.toContain('d.png')
    expect(md).toMatch(/image budget exceeded/)
    expect(md).toMatch(/剩余 2 张未上传/)
  })

  it('totalBudgetBytes=0 关闭闸门，不论多大都全上传', async () => {
    const files = [
      makeFile('a.png', 'image/png'),
      makeFile('b.png', 'image/png'),
    ]
    const md = await uploadImages(files, bigSrcProvider(10_000 * KB), { totalBudgetBytes: 0 })
    expect(md).toContain('a.png')
    expect(md).toContain('b.png')
    expect(md).not.toMatch(/budget exceeded/)
  })

  it('默认值常量合理：单图 200KB / 总量 4MB', () => {
    expect(DEFAULT_TARGET_BYTES).toBe(200_000)
    expect(DEFAULT_TOTAL_BUDGET_BYTES).toBe(4_000_000)
  })
})

describe('setImageProvider · 模块级注入点', () => {
  afterEach(() => {
    // 还原为默认，避免污染相邻测试
    setImageProvider(base64Provider)
  })

  it('默认 provider 是 base64Provider', () => {
    expect(getImageProvider()).toBe(base64Provider)
    expect(getImageProvider().name).toBe('base64')
  })

  it('setImageProvider 返回上一个 provider（便于还原）', () => {
    const fork: ImageProvider = { name: 'fork', async upload(f) { return `cdn:${f.name}` } }
    const prev = setImageProvider(fork)
    expect(prev).toBe(base64Provider)
    expect(getImageProvider()).toBe(fork)
    const back = setImageProvider(prev)
    expect(back).toBe(fork)
  })

  it('uploadImages 不传 provider 时走当前单例', async () => {
    const trace: string[] = []
    const fork: ImageProvider = {
      name: 'trace',
      async upload(f) {
        trace.push(f.name)
        return `cdn:${f.name}`
      },
    }
    setImageProvider(fork)
    const md = await uploadImages([makeFile('a.png', 'image/png')])
    expect(trace).toEqual(['a.png'])
    expect(md).toContain('![a](cdn:a.png)')
  })

  it('uploadImages 显式传 provider 时优先于单例', async () => {
    const fork: ImageProvider = { name: 'fork', async upload() { return 'cdn:fork' } }
    const explicit: ImageProvider = { name: 'explicit', async upload() { return 'cdn:explicit' } }
    setImageProvider(fork)
    const md = await uploadImages([makeFile('a.png', 'image/png')], explicit)
    expect(md).toContain('cdn:explicit')
    expect(md).not.toContain('cdn:fork')
  })
})

describe('compressImageToWebp · 文件图片编码', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  function mockCanvas(results: string[]) {
    vi.stubGlobal('URL', { createObjectURL: vi.fn(() => 'blob:test'), revokeObjectURL: vi.fn() })
    vi.stubGlobal('Image', class {
      naturalWidth = 20
      naturalHeight = 10
      onload: (() => void) | null = null
      set src(_value: string) { queueMicrotask(() => this.onload?.()) }
    })
    const encode = vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL')
    for (const result of results) encode.mockReturnValueOnce(result)
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ drawImage: vi.fn() } as unknown as CanvasRenderingContext2D)
    return encode
  }

  it('小图也编码 WebP；本地草稿的原 base64 小图行为保持不变', async () => {
    const encode = mockCanvas(['data:image/webp;base64,d2VicA=='])
    const tiny = makeFile('tiny.png', 'image/png', 4)
    await expect(compressImageToWebp(tiny)).resolves.toBe('data:image/webp;base64,d2VicA==')
    expect(encode).toHaveBeenCalledWith('image/webp', 0.85)
    await expect(base64Provider.upload(tiny)).resolves.toMatch(/^data:image\/png;base64,/)
    expect(encode).toHaveBeenCalledTimes(1)
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test')
  })

  it('超过目标时降低质量，复用已有阶梯', async () => {
    const first = `data:image/webp;base64,${'A'.repeat(100)}`
    const second = 'data:image/webp;base64,AAAA'
    const encode = mockCanvas([first, second])
    await expect(compressImageToWebp(makeFile('a.png', 'image/png'), { quality: 0.85, targetBytes: 40 }))
      .resolves.toBe(second)
    expect(encode.mock.calls.map((args) => args[1])).toEqual([0.85, 0.7])
  })

  it('浏览器回退 PNG 时拒绝，不能以 .webp 扩展名掩盖编码失败', async () => {
    mockCanvas(['data:image/png;base64,cG5n'])
    await expect(compressImageToWebp(makeFile('a.png', 'image/png'))).rejects.toThrow('webp encoding unsupported')
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test')
  })
})
