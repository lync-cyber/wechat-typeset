/**
 * tools/preview-variant 冒烟：
 *   - loadVariant 能从 src/core/variants/<kind>/<id>.ts 拿到 default-exported VariantDef
 *   - buildDocument 在最小 CliArgs 下产出 inline-style HTML 含容器骨架 + 主题 tag
 *   - --inject-reload 控制 EventSource <script> 注入门（只 watch 模式需要）
 */
import { describe, expect, it } from 'vitest'
import {
  buildDocument,
  buildIndex,
  loadVariant,
  type CliArgs,
  type ListEntry,
} from '../../tools/preview-variant'

function args(over: Partial<CliArgs> = {}): CliArgs {
  return {
    kind: 'admonition',
    id: 'accent-bar',
    themes: ['default'],
    snippetIndex: 'all',
    outPath: '.preview/_test.html',
    open: false,
    watch: false,
    port: 5174,
    injectReload: false,
    rawThemeFlags: [],
    list: false,
    ...over,
  }
}

describe('tools/preview-variant', () => {
  it('loadVariant 取到 admonition.accent-bar default export', async () => {
    const def = await loadVariant('admonition', 'accent-bar')
    expect(def.meta.id).toBe('accent-bar')
    expect(def.meta.kind).toBe('admonition')
    expect(def.snippets.length).toBeGreaterThan(0)
  })

  it('buildDocument 含 stage 容器 + 选中主题 tag + variant--accent-bar wrapper', async () => {
    const def = await loadVariant('admonition', 'accent-bar')
    const html = buildDocument(def, args({ themes: ['default'], snippetIndex: 0 }))
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('class="stage"')
    expect(html).toContain('class="tag">default')
    expect(html).toMatch(/container-[a-z]+--accent-bar/)
  })

  it('--inject-reload 控制 EventSource 脚本的注入', async () => {
    const def = await loadVariant('admonition', 'accent-bar')
    const without = buildDocument(def, args({ injectReload: false }))
    const withInject = buildDocument(def, args({ injectReload: true }))
    expect(without).not.toContain('EventSource')
    expect(withInject).toContain("new EventSource('/__events')")
  })

  it('codeBlock variant 走通（snippets shape 与 VariantDef 等价）', async () => {
    const def = await loadVariant('codeBlock', 'bare')
    expect(def.meta.kind).toBe('codeBlock')
    const html = buildDocument(def, args({ kind: 'codeBlock', id: 'bare', snippetIndex: 0 }))
    expect(html).toContain('<pre')
    expect(html).toContain('class="tag">default')
  })

  it('buildIndex 按 kind 分组 + 每条卡片含缩略图与 href', async () => {
    const accentBar = await loadVariant('admonition', 'accent-bar')
    const bare = await loadVariant('codeBlock', 'bare')
    const entries: ListEntry[] = [
      { kind: 'admonition', def: accentBar, href: './admonition-accent-bar.html' },
      { kind: 'codeBlock', def: bare, href: './codeBlock-bare.html' },
    ]
    const html = buildIndex(entries, args({ list: true }), 100)
    expect(html).toContain('<!DOCTYPE html>')
    expect((html.match(/class="card"/g) ?? []).length).toBe(2)
    expect((html.match(/section class="kind"/g) ?? []).length).toBe(2)
    expect(html).toContain('href="./admonition-accent-bar.html"')
    expect(html).toContain('href="./codeBlock-bare.html"')
    expect(html).toContain('<svg ')
    expect(html).toContain('2 variants · 2 kinds')
  })
})
