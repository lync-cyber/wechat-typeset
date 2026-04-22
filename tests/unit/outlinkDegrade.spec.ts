/**
 * clipboard/outlinkDegrade.ts 契约
 */

import { describe, it, expect } from 'vitest'
import { degradeOutlinks } from '../src/clipboard/outlinkDegrade'

describe('degradeOutlinks · keep', () => {
  it('保留策略不改 HTML，count = 0', () => {
    const html = '<p>Hello <a href="https://example.com">x</a></p>'
    const r = degradeOutlinks(html, 'keep')
    expect(r.html).toBe(html)
    expect(r.count).toBe(0)
  })
})

describe('degradeOutlinks · drop', () => {
  it('<a> 外链变成纯文本', () => {
    const html = '<p>去 <a href="https://example.com">这里</a> 看看</p>'
    const r = degradeOutlinks(html, 'drop')
    expect(r.count).toBe(1)
    expect(r.html).not.toContain('<a')
    expect(r.html).toContain('这里')
  })

  it('多个外链一次性剥掉', () => {
    const html =
      '<p><a href="https://a.com">A</a> 和 <a href="https://b.com">B</a></p>'
    const r = degradeOutlinks(html, 'drop')
    expect(r.count).toBe(2)
    expect(r.html).not.toContain('<a')
  })

  it('保留 mailto / # 锚点', () => {
    const html =
      '<p><a href="mailto:x@y.com">邮</a><a href="#top">顶部</a><a href="https://ex.com">外</a></p>'
    const r = degradeOutlinks(html, 'drop')
    expect(r.count).toBe(1)
    expect(r.html).toContain('href="mailto:x@y.com"')
    expect(r.html).toContain('href="#top"')
    expect(r.html).not.toContain('https://ex.com')
  })

  it('保留 <a> 的子 HTML 内容（如 <strong>）', () => {
    const html = '<p><a href="https://ex.com"><strong>加粗</strong>链接</a></p>'
    const r = degradeOutlinks(html, 'drop')
    expect(r.html).toContain('<strong>加粗</strong>链接')
    expect(r.html).not.toContain('<a')
  })
})

describe('degradeOutlinks · tail-list', () => {
  it('单个外链 → sup 标记 + 尾部参考列表', () => {
    const html = '<p>去 <a href="https://example.com">这里</a> 看看</p>'
    const r = degradeOutlinks(html, 'tail-list')
    expect(r.count).toBe(1)
    expect(r.html).toContain('<sup data-wx-outlink-ref="1">[1]</sup>')
    expect(r.html).toContain('data-wx-outlink-heading')
    expect(r.html).toContain('参考链接')
    expect(r.html).toContain('<ol data-wx-outlink-list="">')
    expect(r.html).toContain('https://example.com')
    // 原 <a> 标签被去掉
    expect(r.html).not.toContain('<a ')
  })

  it('多个外链编号递增', () => {
    const html =
      '<p><a href="https://a.com">A</a> 和 <a href="https://b.com">B</a></p>'
    const r = degradeOutlinks(html, 'tail-list')
    expect(r.count).toBe(2)
    expect(r.html).toContain('[1]')
    expect(r.html).toContain('[2]')
    expect(r.html.indexOf('https://a.com')).toBeLessThan(r.html.indexOf('https://b.com'))
  })

  it('仅内链 → 不追加参考列表', () => {
    const html = '<p><a href="#top">顶部</a></p>'
    const r = degradeOutlinks(html, 'tail-list')
    expect(r.count).toBe(0)
    expect(r.html).not.toContain('data-wx-outlink-list')
  })

  it('保留 <a> 的子 HTML', () => {
    const html = '<p><a href="https://ex.com"><em>斜</em>体</a></p>'
    const r = degradeOutlinks(html, 'tail-list')
    expect(r.html).toContain('<em>斜</em>体')
  })
})

describe('degradeOutlinks · 幂等 / 重复运行', () => {
  it('drop 后再 drop 不变', () => {
    const html = '<p><a href="https://a.com">A</a></p>'
    const once = degradeOutlinks(html, 'drop')
    const twice = degradeOutlinks(once.html, 'drop')
    expect(twice.count).toBe(0)
    expect(twice.html).toBe(once.html)
  })

  it('tail-list 后再 tail-list 不重复追加 heading', () => {
    const html = '<p><a href="https://a.com">A</a></p>'
    const once = degradeOutlinks(html, 'tail-list')
    // 第二遍不会找到新外链（<a> 已去掉），count = 0，html 不变
    const twice = degradeOutlinks(once.html, 'tail-list')
    expect(twice.count).toBe(0)
    // 仍只有一个 heading
    expect((twice.html.match(/data-wx-outlink-heading/g) ?? []).length).toBe(1)
  })
})

describe('degradeOutlinks · 空输入', () => {
  it('空串 → 原样返回', () => {
    const r = degradeOutlinks('', 'drop')
    expect(r).toEqual({ html: '', count: 0 })
  })
})

describe('degradeOutlinks · footer-cta 例外', () => {
  const footerHtml =
    '<section class="container-footer-cta"><a href="https://example.com" data-wx-footer-cta="" style="color:#fff">阅读原篇</a></section>'

  it('drop 策略不剥 footer-cta 的 <a>', () => {
    const r = degradeOutlinks(footerHtml, 'drop')
    expect(r.count).toBe(0)
    expect(r.html).toContain('data-wx-footer-cta')
    expect(r.html).toContain('href="https://example.com"')
  })

  it('tail-list 策略不尾注 footer-cta 的 <a>', () => {
    const r = degradeOutlinks(footerHtml, 'tail-list')
    expect(r.count).toBe(0)
    expect(r.html).not.toContain('data-wx-outlink-list')
    expect(r.html).toContain('href="https://example.com"')
  })

  it('footer-cta 与普通外链混合：只处理普通的，footer-cta 保真', () => {
    const mixed =
      '<p>正文 <a href="https://normal.com">普通</a></p>' + footerHtml
    const r = degradeOutlinks(mixed, 'drop')
    expect(r.count).toBe(1)
    expect(r.html).not.toContain('https://normal.com')
    expect(r.html).toContain('data-wx-footer-cta')
    expect(r.html).toContain('href="https://example.com"')
  })
})
