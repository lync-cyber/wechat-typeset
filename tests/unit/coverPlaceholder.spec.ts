/**
 * makeCoverPlaceholder · 封面占位 SVG 构造器契约
 *
 * 锁：
 *   - viewBox 永远 [0, 0, 1200, 630]（og:image 1.91:1）
 *   - palette 各色都进 primitives（bg / primary / text / textMuted / border / 色卡）
 *   - title / tagline / kicker 注入到 text primitives
 *   - signaturePrimitives 原样附加在末尾
 *   - 每个 persona 用 makeCoverPlaceholder 默认参数，shapeToSvg 后 viewBox 合规
 */

import { describe, it, expect } from 'vitest'
import { makeCoverPlaceholder, shapeToSvg } from '../../src/core/themes/_shared/spec'
import type { Palette, MotifPrimitive } from '../../src/core/themes/_shared/spec'
import { listPersonas, getPersona } from '../../src/public'

const palette: Palette = {
  primary: '#aa0000',
  secondary: '#888',
  accent: '#0000ff',
  bg: '#ffffff',
  bgSoft: '#f5f5f5',
  bgMuted: '#eeeeee',
  text: '#111111',
  textMuted: '#666666',
  textInverse: '#ffffff',
  border: '#cccccc',
  code: '#aa0000',
}

describe('makeCoverPlaceholder · 形状', () => {
  it('viewBox 始终 [0,0,1200,630]', () => {
    const s = makeCoverPlaceholder({ palette, title: 'X' })
    expect(s.viewBox).toEqual([0, 0, 1200, 630])
    expect(s.width).toBe(1200)
    expect(s.height).toBe(630)
  })

  it('palette 各色至少出现一次（背景 / primary / text / textMuted）', () => {
    const s = makeCoverPlaceholder({ palette, title: 'X', tagline: 'Y' })
    const svg = shapeToSvg(s)
    expect(svg).toContain('#ffffff') // bg
    expect(svg).toContain('#aa0000') // primary
    expect(svg).toContain('#111111') // text
    expect(svg).toContain('#666666') // textMuted
  })

  it('title / tagline / kicker 进入 text primitives', () => {
    const s = makeCoverPlaceholder({
      palette,
      title: '极客夜行',
      tagline: 'VT220 琥珀',
      kicker: 'THEME · TG',
    })
    const svg = shapeToSvg(s)
    expect(svg).toContain('>极客夜行<')
    expect(svg).toContain('>VT220 琥珀<')
    expect(svg).toContain('>THEME · TG<')
  })

  it('signaturePrimitives 原样附加（位置 / 计数 / 标签）', () => {
    const accent: MotifPrimitive = {
      type: 'circle',
      cx: 950,
      cy: 200,
      r: 80,
      fill: '#aa0000',
    }
    const s = makeCoverPlaceholder({ palette, title: 'X', signaturePrimitives: [accent] })
    // 最后一个 primitive 应是签名圆
    const last = s.primitives[s.primitives.length - 1]
    expect(last).toEqual(accent)
  })

  it('未传 tagline → 不画 tagline text primitive（避免空 text）', () => {
    const s = makeCoverPlaceholder({ palette, title: 'X' })
    const textNodes = s.primitives.filter((p) => p.type === 'text')
    // 主标题 + wordmark + （未传 kicker / tagline 时）
    expect(textNodes.length).toBe(2)
  })
})

describe('makeCoverPlaceholder · 每个 persona 默认款合规', () => {
  it('listPersonas 内所有 persona 都能合成 viewBox=1200x630 的 SVG', () => {
    for (const p of listPersonas()) {
      const spec = getPersona(p.id)
      const shape = makeCoverPlaceholder({
        palette: spec.palette,
        title: spec.name,
        tagline: spec.description,
      })
      expect(shape.viewBox).toEqual([0, 0, 1200, 630])
      const svg = shapeToSvg(shape)
      expect(svg).toContain('viewBox="0 0 1200 630"')
      // 必含 persona 名
      expect(svg).toContain(`>${spec.name}<`)
    }
  })
})
