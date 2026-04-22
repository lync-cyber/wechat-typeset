/**
 * 富文本粘贴清洗契约
 *
 * 锁住"站外粘贴进来的 HTML 会被如何降级"——站外来源千差万别，只断言**骨架结构**
 * 而非 turndown 的逐字节输出，避免 turndown 小版本升级误伤。
 */

import { describe, it, expect } from 'vitest'
import { sanitizePastedHtml, shouldSanitize } from '../../src/clipboard/pasteSanitize'

describe('sanitizePastedHtml · 基本降级', () => {
  it('空字符串返回空', () => {
    expect(sanitizePastedHtml('')).toBe('')
    expect(sanitizePastedHtml('   \n  ')).toBe('')
  })

  it('段落降级为 markdown 段落（丢掉 class / style 噪声）', () => {
    const html = '<p class="foo" style="color: red">hello <strong>world</strong></p>'
    const md = sanitizePastedHtml(html)
    expect(md).toContain('hello **world**')
    expect(md).not.toContain('class=')
    expect(md).not.toContain('style=')
  })

  it('标题被识别为 atx 风格', () => {
    const html = '<h1>A</h1><h2>B</h2><h3>C</h3>'
    const md = sanitizePastedHtml(html)
    expect(md).toMatch(/^# A/m)
    expect(md).toMatch(/^## B/m)
    expect(md).toMatch(/^### C/m)
  })

  it('无序列表用 - 标记', () => {
    const html = '<ul><li>a</li><li>b</li></ul>'
    const md = sanitizePastedHtml(html)
    expect(md).toMatch(/^-\s+a$/m)
    expect(md).toMatch(/^-\s+b$/m)
  })

  it('有序列表保留编号', () => {
    const html = '<ol><li>one</li><li>two</li></ol>'
    const md = sanitizePastedHtml(html)
    expect(md).toMatch(/^1\.\s+one/m)
    expect(md).toMatch(/^2\.\s+two/m)
  })

  it('链接与图片保留 markdown 语法', () => {
    const html = '<p><a href="https://example.com">site</a></p>'
    const md = sanitizePastedHtml(html)
    expect(md).toContain('[site](https://example.com)')
  })

  it('强调使用 ** 与 *（避免 _ 在中文里误触）', () => {
    const html = '<p><em>i</em><strong>b</strong></p>'
    const md = sanitizePastedHtml(html)
    expect(md).toContain('*i*')
    expect(md).toContain('**b**')
  })

  it('代码块走 fenced ``` 风格', () => {
    const html = '<pre><code>print("hi")</code></pre>'
    const md = sanitizePastedHtml(html)
    expect(md).toMatch(/```/)
    expect(md).toContain('print("hi")')
  })
})

describe('sanitizePastedHtml · Office / Word 噪声', () => {
  it('Word CF_HTML 的 StartFragment/EndFragment 间内容被截取', () => {
    const html = `
      <html><head><style>p{}</style></head><body>
      <!--StartFragment--><p>real text</p><!--EndFragment-->
      </body></html>
    `
    const md = sanitizePastedHtml(html)
    expect(md).toContain('real text')
    // 外壳的 head/body/style 不应泄漏
    expect(md).not.toContain('<style>')
    expect(md).not.toContain('<body>')
  })

  it('<style>/<script>/<meta>/<link> 节点被完整移除', () => {
    const html =
      '<meta charset="utf-8"><link rel="stylesheet" href="x.css">' +
      '<style>.foo{color:red}</style><p>kept</p><script>alert(1)</script>'
    const md = sanitizePastedHtml(html)
    expect(md).toContain('kept')
    expect(md).not.toContain('color:red')
    expect(md).not.toContain('alert')
    expect(md).not.toContain('x.css')
  })

  it('Word 的 <o:p> / <w:*> XML 命名空间标签不出现在输出里', () => {
    const html = '<p>real<o:p></o:p> text<w:data>w-xml</w:data></p>'
    const md = sanitizePastedHtml(html)
    expect(md).toContain('real')
    expect(md).toContain('text')
    expect(md).not.toContain('w-xml')
    expect(md).not.toContain('o:p')
  })
})

describe('sanitizePastedHtml · 多余换行收紧', () => {
  it('连续空行压缩到 ≤ 2 个 \\n', () => {
    const html = '<p>a</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>b</p>'
    const md = sanitizePastedHtml(html)
    expect(md).not.toMatch(/\n{3,}/)
    expect(md).toContain('a')
    expect(md).toContain('b')
  })
})

describe('shouldSanitize', () => {
  function mkData(map: Record<string, string>): DataTransfer {
    // 最小构造：只实现 types / getData
    return {
      types: Object.keys(map),
      getData: (t: string) => map[t] ?? '',
    } as unknown as DataTransfer
  }

  it('null / 无 text/html 返回 false', () => {
    expect(shouldSanitize(null)).toBe(false)
    expect(shouldSanitize(mkData({ 'text/plain': 'x' }))).toBe(false)
  })

  it('CodeMirror 之间的"平凡 <p>text</p>"粘贴不走降级', () => {
    expect(
      shouldSanitize(
        mkData({ 'text/html': '<p>plain text copy</p>', 'text/plain': 'plain text copy' }),
      ),
    ).toBe(false)
    // meta 前缀也算平凡
    expect(
      shouldSanitize(
        mkData({ 'text/html': '<meta charset="utf-8"><p>plain</p>', 'text/plain': 'plain' }),
      ),
    ).toBe(false)
  })

  it('Word / 多段 HTML 粘贴走降级', () => {
    expect(
      shouldSanitize(
        mkData({
          'text/html': '<h1>Title</h1><p>para</p><ul><li>a</li></ul>',
          'text/plain': 'Title\npara\na',
        }),
      ),
    ).toBe(true)
  })
})
