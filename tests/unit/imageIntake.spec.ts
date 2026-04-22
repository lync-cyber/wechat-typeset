/**
 * 图片入站契约测试
 *
 * 只断言"provider 接口约定 + 文件筛选 + 串行顺序 + 错误降级"这四件事。
 * 真 webp 编码依赖 jsdom 里不可用的 canvas / URL.createObjectURL，
 * 因此所有涉及 DOM 绘图的 case 走 mockProvider 绕过。
 */

import { describe, it, expect } from 'vitest'
import { uploadImages, isImageFile, type ImageProvider } from '../src/clipboard/imageIntake'

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
