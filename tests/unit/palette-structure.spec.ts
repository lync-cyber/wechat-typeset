import { describe, expect, it } from 'vitest'
import { applyPalette } from '../../src/core/color/applyPalette'
import { themeList, themeRegistry } from '../../src/core/themes'

const seed = { primary: '#123456', secondary: '#234567', accent: '#345678' }

describe('自定义配色保留主题结构', () => {
  for (const base of themeList) {
    it(`${base.id} 的组件骨架、模板、装饰与能力保持不变`, () => {
      const next = applyPalette({ base, seed })
      expect(next.variants).toEqual(base.variants)
      expect(next.templates).toEqual(base.templates)
      expect(next.decorations).toEqual(base.decorations)
      expect(next.capabilities).toEqual(base.capabilities)
      expect(next.baseTheme).toBe(base.baseTheme)
      expect(next.kickers).toEqual(base.kickers)
      expect(next.author).toBe(base.author)
      expect(next.preview).toBe(base.preview)
    })
  }

  it('内层样式的自定义布局保留，引用主题主色的颜色随配色变化', () => {
    const base = themeRegistry.default
    const slot = Object.keys(base.innerStyles)[0] as keyof typeof base.innerStyles
    const customized = {
      ...base,
      innerStyles: {
        ...base.innerStyles,
        [slot]: { ...base.innerStyles[slot], 'letter-spacing': '3px', color: base.tokens.colors.primary },
      },
    }
    const next = applyPalette({ base: customized, seed })
    expect(next.innerStyles[slot]['letter-spacing']).toBe('3px')
    expect(next.innerStyles[slot].color).toBe(seed.primary)
    expect(customized.innerStyles[slot].color).toBe(base.tokens.colors.primary)
  })
})
