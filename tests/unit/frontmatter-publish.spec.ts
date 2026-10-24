// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { parseFrontmatter, updateArticleTheme, updatePublication } from '../../src/core/pipeline/frontmatter'
import { render } from '../../src/core/pipeline'
import { themeRegistry } from '../../src/core/themes'

describe('发布信息 frontmatter', () => {
  it('写作风格按文章保存，不进入渲染配置', () => {
    const source = updatePublication('---\ntheme: default\ntitle: 原标题\n---\n# 正文\n', { writingStyle: 'deep-research' })
    const parsed = parseFrontmatter(source)
    expect(parsed.publication).toEqual({ title: '原标题', writingStyle: 'deep-research' })
    expect(parsed.config).toEqual({ theme: 'default' })
    expect(parsed.body).toBe('# 正文\n')
    expect(parsed.issues).toEqual([])
  })
  it('解析六个发布字段，并与渲染配置分开', () => {
    const source = `---
title: 标题
digest: 摘要
author: 作者
cover: images/cover.webp
source: https://example.com/article
date: 2026-10-24
theme: swiss-grid
variants:
  admonition: terminal
---
# 正文
`
    const parsed = parseFrontmatter(source)
    expect(parsed.publication).toEqual({
      title: '标题', digest: '摘要', author: '作者', cover: 'images/cover.webp',
      source: 'https://example.com/article', date: '2026-10-24',
    })
    expect(parsed.config).toEqual({ theme: 'swiss-grid', variants: { admonition: 'terminal' } })
    expect(parsed.issues).toEqual([])
    const rendered = render({ md: source, theme: themeRegistry.default })
    expect(rendered.pageConfig).toEqual(parsed.config)
    expect(rendered.html).not.toContain('https://example.com/article')
    expect(rendered.html).not.toContain('摘要')
    expect(rendered.frontmatterIssues).toEqual([])
  })

  it('没有 frontmatter 时发布信息为空', () => {
    expect(parseFrontmatter('# 标题').publication).toEqual({})
  })

  it('空标量和显式空字符串均可清空发布信息', () => {
    const parsed = parseFrontmatter('---\ntitle:\ndigest: ""\nauthor: \'\'\n---\n正文')
    expect(parsed.publication).toEqual({ title: '', digest: '', author: '' })
    expect(parsed.issues).toEqual([])
  })

  it('解析 JSON 双引号转义和 YAML 单引号转义', () => {
    const parsed = parseFrontmatter('---\ntitle: "标题：\\\"引用\\\""\ndigest: "第一行\\n第二行\\t备注"\nauthor: \'O\'\'Brien\'\n---\n正文')
    expect(parsed.publication).toEqual({ title: '标题："引用"', digest: '第一行\n第二行\t备注', author: "O'Brien" })
  })

  it('发布信息对象报类型错误，未知字段仍给出警告', () => {
    const parsed = parseFrontmatter('---\ntitle:\n  nested: 不合法\nother: 保留\n---\n正文')
    expect(parsed.publication).toEqual({})
    expect(parsed.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ path: 'title', severity: 'error' }),
      expect.objectContaining({ path: 'other', severity: 'warning' }),
    ]))
  })

  it('仅识别文件开头的 frontmatter，保留正文前导空行', () => {
    expect(parseFrontmatter('前言\n---\ntitle: 示例\n---\n正文').publication).toEqual({})
    expect(parseFrontmatter('---\ntitle: 示例\n---\n\n\n正文\n').body).toBe('\n\n正文\n')
    expect(parseFrontmatter('---\n---\n正文').body).toBe('正文')
  })
})

describe('updatePublication', () => {
  it('无 frontmatter 时新增发布字段，特殊字符可往返', () => {
    const body = '# 正文\n\n正文不能被改写。\n'
    const patch = { title: '带 "引号"：标题 # 一', digest: '首段\n第二段\\路径', author: "O'Brien" }
    const updated = updatePublication(body, patch)
    expect(parseFrontmatter(updated).publication).toEqual(patch)
    expect(parseFrontmatter(updated).body).toBe(body)
  })

  it('保留 theme、variants、未知字段、注释及正文换行', () => {
    const source = '---\r\n# 标题说明\r\ntitle: 旧标题\r\ntheme: swiss-grid\r\nvariants:\r\n  admonition: terminal\r\nextra:\r\n  owner: 作者\r\n---\r\n\r\n正文\r\n'
    const updated = updatePublication(source, { title: '新标题', digest: '新摘要' })
    expect(updated).toBe(source.replace('title: 旧标题\r\n', 'title: "新标题"\r\n').replace('---\r\n\r\n正文', 'digest: "新摘要"\r\n---\r\n\r\n正文'))
    expect(parseFrontmatter(updated).config).toEqual(parseFrontmatter(source).config)
    expect(parseFrontmatter(updated).body).toBe('\r\n正文\r\n')
  })

  it('未提供补丁则完整保留原文，空字符串则显式清空', () => {
    const source = '---\ntitle: 标题\ndigest: 摘要\n---\n正文'
    expect(updatePublication(source, {})).toBe(source)
    expect(updatePublication(source, { digest: undefined })).toBe(source)
    expect(parseFrontmatter(updatePublication(source, { digest: '' })).publication).toEqual({ title: '标题', digest: '' })
  })

  it('替换重复或错误嵌套字段时不遗留旧值', () => {
    const source = '---\ntitle:\n  nested: 旧值\ntheme: default\ntitle: 另一旧值\nunknown: 保留\n---\n正文'
    const updated = updatePublication(source, { title: '新值' })
    expect(updated.match(/^title:/gm)).toHaveLength(1)
    expect(updated).not.toContain('旧值')
    expect(updated).toContain('unknown: 保留\n')
    expect(parseFrontmatter(updated).publication.title).toBe('新值')
  })

  it('支持空 frontmatter、文件末尾的闭合符和 UTF-8 BOM', () => {
    expect(updatePublication('---\n---', { title: '标题' })).toBe('---\ntitle: "标题"\n---')
    const updated = updatePublication('\uFEFF# 正文\r\n', { title: '标题' })
    expect(updated.startsWith('\uFEFF---\r\n')).toBe(true)
    expect(parseFrontmatter(updated).publication.title).toBe('标题')
    expect(parseFrontmatter(updated).body).toBe('# 正文\r\n')
  })

  it('切换文章主题只更新 theme，保留发布信息与 variants', () => {
    const source = '---\ntitle: 标题\ntheme: default\nvariants:\n  admonition: terminal\n---\n正文\n'
    const updated = updateArticleTheme(source, 'swiss-grid')
    expect(updated).toBe(source.replace('theme: default', 'theme: "swiss-grid"'))
    expect(parseFrontmatter(updated).config).toEqual({ theme: 'swiss-grid', variants: { admonition: 'terminal' } })
    expect(parseFrontmatter(updated).publication).toEqual({ title: '标题' })
  })
})
