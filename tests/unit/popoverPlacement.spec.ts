/**
 * popoverPlacement —— ComponentGrid hover popover 的定位算法契约。
 *
 * 守护：
 *   - 左侧空间充足 → 弹左侧
 *   - 左侧不足 → 翻转到右侧
 *   - cell 居视口顶部 / 底部 → 垂直 clamp 不越界
 *   - margin 可配置
 */

import { describe, expect, it } from 'vitest'
import {
  computePopoverPlacement,
  type Rect,
  type Viewport,
  type Size,
} from '../../src/ui/components/popoverPlacement'

function rect(left: number, top: number, w: number, h: number): Rect {
  return { left, top, width: w, height: h, right: left + w, bottom: top + h }
}

const viewport: Viewport = { width: 1280, height: 800 }
const popover: Size = { width: 320, height: 280 }

describe('computePopoverPlacement', () => {
  it('左侧空间充足时弹到 cell 左侧', () => {
    const cell = rect(900, 300, 90, 110)
    const p = computePopoverPlacement(cell, viewport, popover)
    expect(p.side).toBe('left')
    expect(p.left).toBe(900 - 320 - 12)
  })

  it('左侧空间不足时翻转到 cell 右侧', () => {
    const cell = rect(20, 300, 90, 110)
    const p = computePopoverPlacement(cell, viewport, popover)
    expect(p.side).toBe('right')
    expect(p.left).toBe(20 + 90 + 12)
  })

  it('垂直方向以 cell 中心对齐 popover 中心', () => {
    const cell = rect(900, 400, 90, 100)
    const p = computePopoverPlacement(cell, viewport, popover)
    // cell 中心 y = 450，popover 高 280 → top 应当是 450 - 140 = 310
    expect(p.top).toBe(310)
  })

  it('cell 居视口顶部时 top 被 margin clamp', () => {
    const cell = rect(900, 0, 90, 60)
    const p = computePopoverPlacement(cell, viewport, popover)
    expect(p.top).toBe(12)
  })

  it('cell 居视口底部时 top 被向上推不越界', () => {
    const cell = rect(900, 780, 90, 60)
    const p = computePopoverPlacement(cell, viewport, popover)
    // maxTop = 800 - 280 - 12 = 508
    expect(p.top).toBe(508)
  })

  it('自定义 margin 同时影响水平与垂直', () => {
    const cell = rect(900, 0, 90, 60)
    const p = computePopoverPlacement(cell, viewport, popover, 20)
    expect(p.left).toBe(900 - 320 - 20)
    expect(p.top).toBe(20)
  })
})
