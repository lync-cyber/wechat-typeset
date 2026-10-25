// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render } from '../../src/core/pipeline'
import { themeRegistry } from '../../src/core/themes'
import type { Theme } from '../../src/core/themes/types'
import { applyPalette } from '../../src/core/color/applyPalette'

describe('渲染缓存按主题实例隔离', () => {
  it('短哈希相同的不同正文不会返回上一份 HTML', () => {
    const theme = themeRegistry.default
    // 旧 djb2 key 对这两个正文均为 yj04h6。
    const first = render({ md: '# Aa', theme })
    const second = render({ md: '# B@', theme })
    expect(first.html).toContain('Aa')
    expect(second.html).toContain('B@')
    expect(second).not.toBe(first)
    expect(render({ md: '# Aa', theme })).toBe(first)
  })

  it('同 id 的新主题更新容器骨架，正文改变也不复用旧解析器', () => {
    const base = themeRegistry.default
    const first: Theme = { ...base, variants: { ...base.variants, note: 'box-callout' } }
    const second: Theme = { ...base, variants: { ...base.variants, note: 'side-bar' } }
    const md = '::: note\n正文\n:::'
    const initial = render({ md, theme: first })
    expect(initial.html).toContain('container-note--box-callout')
    expect(render({ md, theme: first })).toBe(initial)
    expect(render({ md, theme: second }).html).toContain('container-note--side-bar')
    expect(render({ md: md + '\n新增正文', theme: second }).html).toContain('container-note--side-bar')
    expect(render({ md, theme: first })).toBe(initial)
  })

  it('连续应用配色时，同名自定义主题会立即显示新颜色', () => {
    const base = themeRegistry.default
    const first = applyPalette({ base, seed: { primary: '#123456', secondary: '#234567', accent: '#345678' } })
    const second = applyPalette({ base, seed: { primary: '#654321', secondary: '#765432', accent: '#876543' } })
    const md = '## 标题\n\n::: note\n正文\n:::'
    expect(first.id).toBe(second.id)
    const initial = render({ md, theme: first }).html
    const updated = render({ md, theme: second }).html
    expect(updated).not.toBe(initial)
    expect(updated).toContain('#654321')
  })
})
