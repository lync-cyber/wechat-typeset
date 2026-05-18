/**
 * motif-fit 单元测试
 *
 * 锁定两件事：
 *   1. measureTextWidth 对各字符类的相对宽度排序与上界估计稳定（防止系数被无意改回）
 *   2. fitTemplateToText 在真实 issueStamp / stepBadge 场景下的扩张行为符合预期
 *      —— 防止历史上 "周刊" 被裁、stepBadge 多扩 +1px 的两类问题再回潮
 */

import { describe, expect, it } from 'vitest'
import { measureTextWidth, fitTemplateToText } from '../../src/core/themes/_shared/spec/motif-fit'
import type { MotifTemplate } from '../../src/core/themes/_shared/spec'

// ============================================================
// measureTextWidth · 字符类系数与字距规则
// ============================================================

describe('measureTextWidth', () => {
  it('CJK 字按 1.0em 估算', () => {
    expect(measureTextWidth('周', 14, 0)).toBe(14)
    expect(measureTextWidth('周刊', 14, 0)).toBe(28)
  })

  it('拉丁大写按 0.7em 估算（含 #@% 0.65em）', () => {
    expect(measureTextWidth('A', 14, 0)).toBeCloseTo(0.7 * 14, 5)
    expect(measureTextWidth('ISSUE', 14, 0)).toBeCloseTo(5 * 0.7 * 14, 5)
    expect(measureTextWidth('#', 14, 0)).toBeCloseTo(0.65 * 14, 5)
  })

  it('数字按 0.62em 估算', () => {
    expect(measureTextWidth('0', 14, 0)).toBeCloseTo(0.62 * 14, 5)
    expect(measureTextWidth('023', 14, 0)).toBeCloseTo(3 * 0.62 * 14, 5)
  })

  it('其余半角（空格 / - / ·）按 0.4em 估算', () => {
    expect(measureTextWidth(' ', 14, 0)).toBeCloseTo(0.4 * 14, 5)
    expect(measureTextWidth('-', 14, 0)).toBeCloseTo(0.4 * 14, 5)
    expect(measureTextWidth('·', 14, 0)).toBeCloseTo(0.4 * 14, 5)
  })

  it('letterSpacing 对全部字符累加（× chars，与浏览器对齐）', () => {
    // 5 字符，字距 2px → 累计 10px
    const w0 = measureTextWidth('AAAAA', 14, 0)
    const w2 = measureTextWidth('AAAAA', 14, 2)
    expect(w2 - w0).toBe(10)
  })

  it('industry-observer 真值不再被低估 → ≥ 实测裁切阈值', () => {
    // 历史回归案例：旧启发式估出 247.8px，导致 viewBox 260 误判为"够宽"，
    // 实际加粗渲染约 280px，"刊"字被 SVG 边界裁掉。
    // 新估算应明显高于旧值，足以保证 fit 触发或 viewBox 兜底生效。
    const w = measureTextWidth('ISSUE #023 · 2025-04-20 · 周刊', 14, 1.5)
    expect(w).toBeGreaterThan(265)
  })
})

// ============================================================
// fitTemplateToText · viewBox 自动扩张
// ============================================================

function makeTemplate(overrides: Partial<MotifTemplate> = {}): MotifTemplate {
  return {
    viewBox: [0, 0, 100, 24] as const,
    width: 100,
    height: 24,
    placeholders: ['N'],
    primitives: [
      { type: 'text', x: 10, y: 16, content: '{N}', fontSize: 14 },
    ],
    ...overrides,
  } as MotifTemplate
}

describe('fitTemplateToText · textAnchor 处理', () => {
  it('textAnchor=middle：基于中心点算右沿，不再误扩 stepBadge', () => {
    // stepBadge(1) 形态：x=12 textAnchor=middle，viewBox 24×24，包圆圈 r=11
    const tpl: MotifTemplate = {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      placeholders: ['N'],
      primitives: [
        { type: 'circle', cx: 12, cy: 12, r: 11, fill: '#000' },
        {
          type: 'text',
          x: 12,
          y: 17,
          content: '{N}',
          fontSize: 15,
          fontWeight: 700,
          textAnchor: 'middle',
          fill: '#fff',
        },
      ],
    }
    const fitted = fitTemplateToText(tpl, { N: 1 })
    expect(fitted.viewBox[2]).toBe(24) // 不扩张
    expect(fitted.width).toBe(24)
  })

  it('textAnchor=middle + 长内容：仍会扩张', () => {
    const tpl: MotifTemplate = {
      viewBox: [0, 0, 24, 24],
      width: 24,
      height: 24,
      placeholders: ['N'],
      primitives: [
        {
          type: 'text',
          x: 12,
          y: 17,
          content: '{N}',
          fontSize: 15,
          fontWeight: 700,
          textAnchor: 'middle',
          fill: '#fff',
        },
      ],
    }
    // 10 占两位数字：右沿 12 + (2 * 0.62 * 15)/2 = 21.3，加 8 margin = 29.3 > 24
    const fitted = fitTemplateToText(tpl, { N: 10 })
    expect(fitted.viewBox[2]).toBeGreaterThan(24)
  })

  it('textAnchor=end：右沿就是 x', () => {
    const tpl = makeTemplate({
      primitives: [
        {
          type: 'text',
          x: 90,
          y: 16,
          content: 'tail',
          fontSize: 14,
          textAnchor: 'end',
        },
      ],
    })
    // anchor=end → right = x = 90，+8 margin = 98 ≤ 100，不扩
    const fitted = fitTemplateToText(tpl, {})
    expect(fitted.viewBox[2]).toBe(100)
  })

  it('textAnchor=start（默认）：右沿 = x + 文本宽', () => {
    const tpl = makeTemplate({
      viewBox: [0, 0, 60, 24],
      width: 60,
      primitives: [
        { type: 'text', x: 10, y: 16, content: 'HELLOWORLD', fontSize: 14 },
      ],
    })
    // 10 大写 × 0.7 × 14 = 98，x=10 → right = 108，需扩
    const fitted = fitTemplateToText(tpl, {})
    expect(fitted.viewBox[2]).toBeGreaterThan(60)
  })
})

describe('fitTemplateToText · 阈值与外框同步', () => {
  it('扩张幅度 < 2px 时不扩（避免 cosmetic 漂移）', () => {
    // 故意构造一个估算后超出 0.5px 的场景：维持 origW，不触发扩张
    const tpl: MotifTemplate = {
      viewBox: [0, 0, 25, 24],
      width: 25,
      height: 24,
      placeholders: [],
      primitives: [
        // 0.5px 溢出：right ≈ 17.3，+SAFE_MARGIN(8) = 25.3 - 25 = 0.3 < 2
        { type: 'text', x: 10, y: 16, content: '7', fontSize: 14 },
      ],
    }
    const fitted = fitTemplateToText(tpl, {})
    expect(fitted.viewBox[2]).toBe(25)
  })

  it('扩张时外框 rect 同步加宽（容差 4px 内的边框元素）', () => {
    const tpl: MotifTemplate = {
      viewBox: [0, 0, 50, 24],
      width: 50,
      height: 24,
      placeholders: ['T'],
      primitives: [
        // 外框：右沿 = 0.5 + 49 = 49.5（距 origW 50 仅 0.5px，属于边框元素）
        { type: 'rect', x: 0.5, y: 0.5, w: 49, h: 23, stroke: '#000', strokeWidth: 1 },
        // 内部装饰 rect：右沿 30，距 origW 50 远超 4px → 不扩
        { type: 'rect', x: 5, y: 5, w: 25, h: 14, fill: '#eee' },
        { type: 'text', x: 10, y: 16, content: '{T}', fontSize: 14 },
      ],
    }
    const fitted = fitTemplateToText(tpl, { T: 'OVERFLOW_CONTENT' })
    expect(fitted.viewBox[2]).toBeGreaterThan(50)
    const outer = fitted.primitives[0]
    const inner = fitted.primitives[1]
    if (outer.type !== 'rect' || inner.type !== 'rect') throw new Error('rect 类型保持')
    // 外框宽 = 49 + deltaW；内部装饰 rect 宽不变
    expect(outer.w).toBeGreaterThan(49)
    expect(inner.w).toBe(25)
  })

  it('width 字段缺省时不写回 width（保持 undefined）', () => {
    const tpl: MotifTemplate = {
      viewBox: [0, 0, 30, 20],
      placeholders: ['T'],
      primitives: [
        { type: 'text', x: 10, y: 14, content: '{T}', fontSize: 14 },
      ],
    }
    const fitted = fitTemplateToText(tpl, { T: 'LONG_LATIN_CONTENT_OVERFLOW' })
    expect(fitted.viewBox[2]).toBeGreaterThan(30)
    expect(fitted.width).toBeUndefined()
  })
})

describe('fitTemplateToText · 真实主题场景', () => {
  // industry-observer 实际 issueStamp 模板（与 persona.data.ts 同步）
  const industryObserverIssueStamp: MotifTemplate = {
    viewBox: [0, 0, 320, 24],
    width: 320,
    height: 24,
    placeholders: ['issue', 'date', 'kind'],
    primitives: [
      { type: 'rect', x: 0.5, y: 0.5, w: 319, h: 23, stroke: '#b86f2a', strokeWidth: 1 },
      { type: 'rect', x: 3, y: 3, w: 314, h: 18, stroke: '#b86f2a', strokeWidth: 1, opacity: 0.55 },
      {
        type: 'text',
        x: 160,
        y: 16,
        content: 'ISSUE #{issue} · {date} · {kind}',
        fontSize: 14,
        fontWeight: 600,
        fill: '#b86f2a',
        textAnchor: 'middle',
        letterSpacing: 1.0,
      },
    ],
  }

  it('industry-observer 真值不再溢出 viewBox（"周刊" 不被裁）', () => {
    const fitted = fitTemplateToText(industryObserverIssueStamp, {
      issue: '023',
      date: '2025-04-20',
      kind: '周刊',
    })
    expect(fitted.viewBox[2]).toBe(320) // 不需要扩张
    expect(fitted.width).toBe(320)
  })

  it('industry-observer 占位符 placeholder 也不触发扩张', () => {
    const fitted = fitTemplateToText(industryObserverIssueStamp, {
      issue: '47',
      date: '2026-04',
      kind: 'WEEKLY',
    })
    expect(fitted.viewBox[2]).toBe(320)
  })

  it('industry-observer 极端长 kind 时仍能正确扩张（防御性兜底）', () => {
    const fitted = fitTemplateToText(industryObserverIssueStamp, {
      issue: '023',
      date: '2025-04-20',
      kind: '年度特别专题报告', // 8 字 CJK
    })
    // 8 字 × 14 = 112px，相比 2 字 "周刊" 多 84px，超过 320 buffer
    expect(fitted.viewBox[2]).toBeGreaterThan(320)
    const outer = fitted.primitives[0]
    if (outer.type !== 'rect') throw new Error('rect 类型保持')
    expect(outer.w).toBeGreaterThan(319) // 外框同步扩张
  })
})
