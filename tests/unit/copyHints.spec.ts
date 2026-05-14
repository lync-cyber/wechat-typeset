/**
 * copyHints · 复制前自检统计契约
 *
 * countInlineImages 是 handleCopy toast 文案的输入；这里锁住"什么算内联图"
 * 与"什么不算"的边界。
 */

import { describe, it, expect } from 'vitest'
import { countInlineImages } from '../../src/infra/clipboard/copyHints'

describe('countInlineImages', () => {
  it('空 / 无 img 返回 0', () => {
    expect(countInlineImages('')).toBe(0)
    expect(countInlineImages('<p>纯文字</p>')).toBe(0)
  })

  it('http(s) src 的 img 不计入', () => {
    const html = '<img src="https://cdn.example.com/a.png"><img src="//x/y.jpg">'
    expect(countInlineImages(html)).toBe(0)
  })

  it('data:image/* 计入；webp / png / jpeg 同等', () => {
    const html =
      '<img src="data:image/png;base64,AAA">' +
      '<img src="data:image/webp;base64,BBB">' +
      '<img src="data:image/jpeg;base64,CCC">'
    expect(countInlineImages(html)).toBe(3)
  })

  it('单引号 / 属性顺序 / 大小写均能识别', () => {
    const html =
      "<img alt='x' src='data:image/png;base64,AAA'>" +
      '<IMG SRC="data:image/webp;base64,BBB" CLASS="y">' +
      '<img\n  src="data:image/png;base64,CCC"\n  alt="z"/>'
    expect(countInlineImages(html)).toBe(3)
  })

  it('非 image 的 data: URI 不计入（虽然实操少见）', () => {
    const html = '<img src="data:application/octet-stream;base64,AAA">'
    expect(countInlineImages(html)).toBe(0)
  })

  it('混合：仅图片中的 data:image 被计入', () => {
    const html =
      '<p>开头</p>' +
      '<img src="https://x/y.png">' +
      '<img src="data:image/png;base64,AAA">' +
      '<a href="data:text/plain,x">link</a>' +
      '<img src="data:image/webp;base64,BBB">'
    expect(countInlineImages(html)).toBe(2)
  })
})
