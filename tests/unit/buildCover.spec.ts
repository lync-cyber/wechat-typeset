/**
 * 运行时封面 builder 契约 —— 三种 size preset 都输出正确 viewBox / 必含 primitives /
 * 调用 shapeToSvg 后是合法 SVG 串。
 */

import { describe, expect, it } from 'vitest'
import {
  buildRuntimeCover,
  COVER_SIZES,
  type CoverSizeId,
} from '../../src/core/pipeline/cover/buildCover'
import { shapeToSvg } from '../../src/core/themes/_shared/spec'
import type { Palette } from '../../src/core/themes/_shared/spec/types'

const fakePalette: Palette = {
  primary: '#a83420',
  secondary: '#6a6655',
  accent: '#46573f',
  bg: '#fcfaf7',
  bgSoft: '#f5f1ea',
  bgMuted: '#ece6dc',
  text: '#1f1a14',
  textMuted: '#695c4c',
  textInverse: '#ffffff',
  border: '#d9d2c4',
  code: '#2a2419',
}

const SIZE_IDS: CoverSizeId[] = ['wechat-horizontal', 'wechat-square', 'og-image']

describe('buildRuntimeCover · viewBox', () => {
  it.each(SIZE_IDS)('%s 的 viewBox 与 COVER_SIZES 一致', (id) => {
    const shape = buildRuntimeCover(
      { palette: fakePalette, title: 'T', tagline: 'tag', kicker: 'K' },
      id,
    )
    const meta = COVER_SIZES[id]
    expect(shape.viewBox).toEqual([0, 0, meta.width, meta.height])
    expect(shape.width).toBe(meta.width)
    expect(shape.height).toBe(meta.height)
  })
})

describe('buildRuntimeCover · primitives', () => {
  it.each(SIZE_IDS)('%s 必含 bg rect + 主标题 text', (id) => {
    const shape = buildRuntimeCover(
      { palette: fakePalette, title: '今天写点什么', tagline: '正文摘要', kicker: 'WT' },
      id,
    )
    const hasBg = shape.primitives.some(
      (p) => p.type === 'rect' && p.x === 0 && p.y === 0 && p.fill === fakePalette.bg,
    )
    const hasTitle = shape.primitives.some(
      (p) => p.type === 'text' && p.content === '今天写点什么',
    )
    expect(hasBg).toBe(true)
    expect(hasTitle).toBe(true)
  })

  it('tagline 缺省时不渲染副标题节点', () => {
    const shape = buildRuntimeCover(
      { palette: fakePalette, title: 'T' },
      'wechat-horizontal',
    )
    // 没有 fontSize=18 + textMuted fill 的 text（副标题排印特征）
    const hasTagline = shape.primitives.some(
      (p) => p.type === 'text' && p.fill === fakePalette.textMuted && p.fontSize === 18,
    )
    expect(hasTagline).toBe(false)
  })

  it('底部 swatch 行总是 6 色（与 makeCoverPlaceholder 同 visual signature）', () => {
    const shape = buildRuntimeCover(
      { palette: fakePalette, title: 'T' },
      'wechat-square',
    )
    const smallSwatches = shape.primitives.filter(
      (p) => p.type === 'rect' && p.w === 14 && p.h === 14,
    )
    expect(smallSwatches).toHaveLength(6)
  })

  it('右下 wordmark 永远是 wechat-typeset', () => {
    for (const id of SIZE_IDS) {
      const shape = buildRuntimeCover(
        { palette: fakePalette, title: 'T' },
        id,
      )
      const mark = shape.primitives.find(
        (p) => p.type === 'text' && p.content === 'wechat-typeset',
      )
      expect(mark, `${id} 缺 wordmark`).toBeDefined()
    }
  })
})

describe('buildRuntimeCover → shapeToSvg', () => {
  it.each(SIZE_IDS)('%s 产出合法 <svg> 且含 viewBox + width', (id) => {
    const shape = buildRuntimeCover(
      { palette: fakePalette, title: 'T', tagline: 'g', kicker: 'K' },
      id,
    )
    const meta = COVER_SIZES[id]
    const svg = shapeToSvg(shape)
    expect(svg.startsWith('<svg')).toBe(true)
    expect(svg.includes(`viewBox="0 0 ${meta.width} ${meta.height}"`)).toBe(true)
    expect(svg.includes(`width="${meta.width}"`)).toBe(true)
    expect(svg.endsWith('</svg>')).toBe(true)
  })
})
