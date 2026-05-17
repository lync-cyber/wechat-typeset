/**
 * L2 页面局部配置 · frontmatter `variants:` / `theme:`
 *
 * 守住 4 级优先级链：
 *   L1 attrs.variant > L2 frontmatter.variants > L3 theme.variants > L4 DEFAULT_VARIANTS/fallbackId
 */

import { describe, it, expect } from 'vitest'
import { render as pipelineRender } from '../../src/core/pipeline'
import { parseFrontmatter } from '../../src/core/pipeline/frontmatter'
import { themeRegistry } from '../../src/core/themes'
const defaultTheme = themeRegistry.default
import { render as publicRender } from '../../src/public'

function pipelineRun(md: string) {
  return pipelineRender({ md, theme: defaultTheme })
}

describe('parseFrontmatter', () => {
  it('无 frontmatter：返回原文 + 空 config', () => {
    const r = parseFrontmatter('# hello')
    expect(r.config).toEqual({})
    expect(r.body).toBe('# hello')
    expect(r.issues).toHaveLength(0)
  })

  it('识别 theme + variants 嵌套', () => {
    const md = `---\ntheme: swiss-grid\nvariants:\n  admonition: terminal\n  quote: tilted-sticker\n---\n# body`
    const r = parseFrontmatter(md)
    expect(r.config.theme).toBe('swiss-grid')
    expect(r.config.variants).toEqual({ admonition: 'terminal', quote: 'tilted-sticker' })
    expect(r.body.trim()).toBe('# body')
  })

  it('非法 variant id 报 warning 且不写入 config', () => {
    const md = `---\nvariants:\n  admonition: not-a-real-id\n---\nbody`
    const r = parseFrontmatter(md)
    expect(r.config.variants).toBeUndefined()
    expect(r.issues.some((i) => i.path === 'variants.admonition' && i.severity === 'warning')).toBe(true)
  })

  it('未知 slot 报 warning', () => {
    const md = `---\nvariants:\n  notASlot: terminal\n---\nbody`
    const r = parseFrontmatter(md)
    expect(r.issues.some((i) => i.path === 'variants.notASlot')).toBe(true)
  })

  it('未识别的顶层字段报 warning', () => {
    const md = `---\nrandom: 1\n---\nbody`
    const r = parseFrontmatter(md)
    expect(r.issues.some((i) => i.path === 'random')).toBe(true)
  })
})

describe('L2 优先级链：pipeline render', () => {
  it('L2 frontmatter.variants 生效（admonition: terminal）', () => {
    const md = `---\nvariants:\n  admonition: terminal\n---\n::: tip 小贴士\n正文\n:::\n`
    const out = pipelineRun(md)
    expect(out.html).toMatch(/container-tip--terminal/)
    expect(out.pageConfig.variants?.admonition).toBe('terminal')
  })

  it('L1 attrs.variant 覆盖 L2', () => {
    const md = `---\nvariants:\n  admonition: terminal\n---\n::: tip variant=pill-tag 小贴士\n正文\n:::\n`
    const out = pipelineRun(md)
    expect(out.html).toMatch(/container-tip--pill-tag/)
  })

  it('L2 缺该 slot 时回退到 L3 主题默认（quote: classic）', () => {
    const md = `---\nvariants:\n  admonition: terminal\n---\n::: quote-card\nsome quote\n:::\n`
    const out = pipelineRun(md)
    expect(out.html).toMatch(/container-quote-card--classic/)
  })

  it('L2 非法 id 静默忽略，回退 L3', () => {
    const md = `---\nvariants:\n  admonition: not-real\n---\n::: tip\nx\n:::\n`
    const out = pipelineRun(md)
    expect(out.html).toMatch(/container-tip--accent-bar/)
  })

  it('frontmatter 被剥离：body 内容仍渲染', () => {
    const md = `---\nvariants:\n  admonition: terminal\n---\n# 标题\n正文段落\n`
    const out = pipelineRun(md)
    expect(out.html).toMatch(/<h1[\s>]/)
    expect(out.html).toContain('正文段落')
    expect(out.html).not.toContain('admonition: terminal')
  })

  it('frontmatterIssues 透出', () => {
    const md = `---\nvariants:\n  admonition: nope\n---\n# x`
    const out = pipelineRun(md)
    expect(out.frontmatterIssues.length).toBeGreaterThan(0)
  })
})

describe('L2 主题切换：public render', () => {
  it('frontmatter.theme=swiss-grid 覆盖入参 persona=default', () => {
    const md = `---\ntheme: swiss-grid\n---\n::: tip\nx\n:::\n`
    const out = publicRender({ md, persona: 'default' })
    // swiss-grid 的 admonition 是 news-underline；default 是 accent-bar
    expect(out.html).toMatch(/container-tip--news-underline/)
  })

  it('frontmatter.theme 未知 id：静默回退到 input', () => {
    const md = `---\ntheme: not-a-theme\n---\n::: tip\nx\n:::\n`
    const out = publicRender({ md, persona: 'default' })
    expect(out.html).toMatch(/container-tip--accent-bar/)
  })
})
