/**
 * 弹出预览的定位算法 —— ComponentGrid hover popover 用。
 *
 * 抽出独立纯函数的理由：定位牵涉视口边界 / 左右翻转 / 垂直 clamp，逻辑足以独立验证。
 * 让 Vue 组件只负责"什么时候触发 + 渲染什么"，定位策略落入纯函数能被单测覆盖。
 *
 * 策略：
 *   - 优先弹到 cell 左侧（ComponentPalette 是右抽屉，左侧通常是编辑器区有空间）
 *   - 左侧放不下 → 翻转到右侧
 *   - 垂直方向以 cell 中心对齐 popover 中心，越界则向视口内 clamp
 */

export interface Rect {
  left: number
  top: number
  right: number
  bottom: number
  width: number
  height: number
}

export interface Viewport {
  width: number
  height: number
}

export interface Size {
  width: number
  height: number
}

export interface Placement {
  left: number
  top: number
  /** 实际落点在 cell 的哪一侧——可用于 CSS 加箭头 / 阴影方向，目前仅作调试观测 */
  side: 'left' | 'right'
}

export function computePopoverPlacement(
  cell: Rect,
  viewport: Viewport,
  popover: Size,
  margin = 12,
): Placement {
  const leftCandidate = cell.left - popover.width - margin
  const fitsLeft = leftCandidate >= margin
  const left = fitsLeft ? leftCandidate : cell.right + margin
  const side: 'left' | 'right' = fitsLeft ? 'left' : 'right'

  const verticalCenter = cell.top + cell.height / 2 - popover.height / 2
  const maxTop = viewport.height - popover.height - margin
  const top = Math.max(margin, Math.min(verticalCenter, maxTop))

  return { left, top, side }
}
