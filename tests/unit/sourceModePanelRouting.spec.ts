/**
 * SourceModePanel · sample 点击路由（步骤 6.2）。
 *
 * 测试 findSlotContainingSubstring 纯函数——SourceModePanel 在 PatchInspector emit
 * 'click-sample' 后用它定位违规字符串在哪个 css slot；找到即切 tab + 调
 * CodeMirrorPane.jumpToSubstring。Vue 侧路由（nextTick + jumpToSubstring 调用）的集成
 * 路径靠手测覆盖；本 spec 守住 helper 自己的契约。
 *
 * 守护：
 *   - wrapperCSS 命中 → 返回 'wrapperCSS'
 *   - titleCSS 命中 → 返回 'titleCSS'
 *   - bodyCSS 命中 → 返回 'bodyCSS'
 *   - 多 slot 同时含 needle → 取首个（顺序 wrapper → title → body）
 *   - 任一 slot 都不含 → null
 *   - needle 为空 → null（防 indexOf('') 永远命中 0）
 *   - 空字符串 slot 跳过
 */

import { describe, expect, it } from 'vitest'
import { findSlotContainingSubstring } from '../../src/ui/components/component-studio/userVariantSave'
import type { DraftCssPatch } from '../../src/ui/components/component-studio/useComponentDraft'

function patch(p: Partial<DraftCssPatch>): DraftCssPatch {
  return { wrapperCSS: '', titleCSS: '', bodyCSS: '', ...p }
}

describe('findSlotContainingSubstring', () => {
  it('wrapperCSS 命中', () => {
    const p = patch({ wrapperCSS: 'position: absolute; top: 0' })
    expect(findSlotContainingSubstring(p, 'position: absolute')).toBe('wrapperCSS')
  })

  it('titleCSS 命中', () => {
    const p = patch({ titleCSS: "font-family: 'Source Han Serif'" })
    expect(findSlotContainingSubstring(p, "font-family: 'Source Han Serif'")).toBe('titleCSS')
  })

  it('bodyCSS 命中', () => {
    const p = patch({ bodyCSS: 'float: left' })
    expect(findSlotContainingSubstring(p, 'float: left')).toBe('bodyCSS')
  })

  it('多 slot 同时含 needle → 取 wrapper（首位）', () => {
    const p = patch({
      wrapperCSS: 'font-family: serif',
      titleCSS: 'font-family: serif',
      bodyCSS: 'font-family: serif',
    })
    expect(findSlotContainingSubstring(p, 'font-family: serif')).toBe('wrapperCSS')
  })

  it('任一 slot 都不含 needle → null', () => {
    const p = patch({ wrapperCSS: 'color: red', titleCSS: 'margin: 10px', bodyCSS: 'padding: 5px' })
    expect(findSlotContainingSubstring(p, 'position: absolute')).toBeNull()
  })

  it('空 needle → null（防 indexOf("") 永远返回 0 的边界）', () => {
    const p = patch({ wrapperCSS: 'color: red' })
    expect(findSlotContainingSubstring(p, '')).toBeNull()
  })

  it('全空 patch + 非空 needle → null', () => {
    expect(findSlotContainingSubstring(patch({}), 'anything')).toBeNull()
  })
})
