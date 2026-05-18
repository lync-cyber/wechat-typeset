/**
 * tokenSchema 端到端契约（步骤 4）
 *
 * 守护：
 *   1. tokenSchemaLookup 能查到 giant-mark 的 schema；查不到的返回 undefined
 *   2. tokenSchema 字段命名稳定（'quote-color' / 'quote-size' / 'byline-color' / 'byline-size'）
 *   3. tokenSchema.default 与 variant render() 里 `var(--uv-<key>, <default>)` 的 fallback 段一致
 *      （这是命名契约：用户清空覆盖时 UI 占位符与实际渲染 fallback 必须对得上）
 *   4. 真实 pipeline 注入 UserVariantTokens → giant-mark 的 titleCSS 含 --uv-quote-color 值
 *
 * 4 通过 userVariant-resolve.spec.ts 已部分覆盖；本 spec 重点是 giant-mark 自身的 schema 完整性，
 * 防止后续 tokenize 其它 variant 时把字段名/默认值改错而无人发现。
 */

import { describe, it, expect } from 'vitest'
import { getVariantTokenSchema } from '../../src/core/variants/tokenSchemaLookup'
import giantMark, {
  tokenSchema as giantMarkSchema,
} from '../../src/core/variants/pull-quote/giant-mark'
import accentBar, {
  tokenSchema as accentBarSchema,
} from '../../src/core/variants/admonition/accent-bar'
import classicQuote, {
  tokenSchema as classicQuoteSchema,
} from '../../src/core/variants/quote/classic'
import waveDivider, {
  tokenSchema as waveSchema,
} from '../../src/core/variants/divider/wave'
import { render as pipelineRender } from '../../src/core/pipeline'
import { themeRegistry } from '../../src/core/themes'

const defaultTheme = themeRegistry.default
import type { UserVariantTokens } from '../../src/core/variants/userVariant'

describe('tokenSchemaLookup', () => {
  it('giant-mark 命中', () => {
    const s = getVariantTokenSchema('pullQuote', 'giant-mark')
    expect(s).toBeDefined()
    expect(s).toBe(giantMarkSchema)
  })

  it('未 tokenize 的 variant（如 centered-rule）返回 undefined', () => {
    expect(getVariantTokenSchema('pullQuote', 'centered-rule')).toBeUndefined()
  })

  it('kind/variantId 不存在：undefined', () => {
    expect(getVariantTokenSchema('pullQuote', 'no-such-variant')).toBeUndefined()
    expect(getVariantTokenSchema('none', 'giant-mark')).toBeUndefined()
  })
})

describe('giant-mark · tokenSchema 字段稳定性', () => {
  it('暴露 4 个 token：quote-color / quote-size / byline-color / byline-size', () => {
    expect(Object.keys(giantMarkSchema).sort()).toEqual(
      ['byline-color', 'byline-size', 'quote-color', 'quote-size'],
    )
  })

  it('VariantDef.tokenSchema 与命名 export 是同一引用（avoid 漂移）', () => {
    expect(giantMark.tokenSchema).toBe(giantMarkSchema)
  })

  it('color 字段的 default 是占位 inherit，size 字段的 default 是 CSS 长度', () => {
    expect(giantMarkSchema['quote-color'].type).toBe('color')
    expect(giantMarkSchema['quote-color'].default).toBe('inherit')
    expect(giantMarkSchema['quote-size'].type).toBe('size')
    expect(giantMarkSchema['quote-size'].default).toBe('19px')
    expect(giantMarkSchema['byline-size'].default).toBe('13px')
  })
})

describe('giant-mark · render fallback 与 tokenSchema 对齐', () => {
  // 这一条防"改了 schema.default 却忘了改 render() var() 的 fallback"
  it('render 输出含 var(--uv-quote-size, 19px) 与 var(--uv-byline-size, 13px)', () => {
    // info 必须非空（'引文文本'）pull-quote 才会渲染 title 段；否则 var(--uv-quote-*) 不出现
    const md = '::: pull-quote variant=giant-mark 引文文本\n副文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme })
    // juice 规范化空白用 regex 容差
    expect(out.html).toMatch(/var\(\s*--uv-quote-size\s*,\s*19px\s*\)/)
    expect(out.html).toMatch(/var\(\s*--uv-byline-size\s*,\s*13px\s*\)/)
  })
})

describe('giant-mark · token 覆盖端到端', () => {
  it('注入 quote-color=#ff0000 → wrapper 出现 --uv-quote-color:#ff0000', () => {
    const uv: UserVariantTokens = {
      id: 'uv_giantmark_color',
      name: '红字 giant-mark',
      level: 'tokens',
      createdAt: 0,
      updatedAt: 0,
      base: { kind: 'pullQuote', variantId: 'giant-mark' },
      tokens: { 'quote-color': '#ff0000' },
    }
    const md = '::: pull-quote variant=uv_giantmark_color 金句\n副文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    expect(out.html).toMatch(/--uv-quote-color:\s*#ff0000/)
    // title 仍引用 var()——cascade 在浏览器侧完成覆盖
    expect(out.html).toMatch(/var\(\s*--uv-quote-color/)
  })

  it('多 token 同时覆盖：quote-color + quote-size + byline-size', () => {
    const uv: UserVariantTokens = {
      id: 'uv_giantmark_multi',
      name: '多 token',
      level: 'tokens',
      createdAt: 0,
      updatedAt: 0,
      base: { kind: 'pullQuote', variantId: 'giant-mark' },
      tokens: {
        'quote-color': '#0066cc',
        'quote-size': '24px',
        'byline-size': '11px',
      },
    }
    const md = '::: pull-quote variant=uv_giantmark_multi 金句\n副文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    expect(out.html).toMatch(/--uv-quote-color:\s*#0066cc/)
    expect(out.html).toMatch(/--uv-quote-size:\s*24px/)
    expect(out.html).toMatch(/--uv-byline-size:\s*11px/)
  })
})

// ─────────────────────────────────────────────────────────────
// 扩展 tokenize 的 3 支变体：accent-bar / classic / wave
// 每支验证 (a) schema 字段名稳定 (b) VariantDef ref 一致 (c) E2E 覆盖生效
// ─────────────────────────────────────────────────────────────

describe('admonition · accent-bar tokenSchema', () => {
  it('暴露 accent-color + soft-bg', () => {
    expect(Object.keys(accentBarSchema).sort()).toEqual(['accent-color', 'soft-bg'])
    expect(accentBar.tokenSchema).toBe(accentBarSchema)
    expect(accentBarSchema['accent-color'].type).toBe('color')
    expect(accentBarSchema['soft-bg'].type).toBe('color')
  })

  it('注入 accent-color → wrapper 出现 --uv-accent-color 且 title 引用 var()', () => {
    const uv: UserVariantTokens = {
      id: 'uv_ab_color',
      name: '橙色 tip',
      level: 'tokens',
      createdAt: 0,
      updatedAt: 0,
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'accent-color': '#ff5a00' },
    }
    const md = '::: tip 提示 variant=uv_ab_color\n正文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    expect(out.html).toMatch(/--uv-accent-color:\s*#ff5a00/)
    expect(out.html).toMatch(/var\(\s*--uv-accent-color/)
  })

  it('soft-bg 覆盖也作用于 danger 形态（不限于 tip）', () => {
    const uv: UserVariantTokens = {
      id: 'uv_ab_dangerbg',
      name: 'danger 浅底替换',
      level: 'tokens',
      createdAt: 0,
      updatedAt: 0,
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'soft-bg': '#fff8f0' },
    }
    const md = '::: danger 警告 variant=uv_ab_dangerbg\n正文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    expect(out.html).toMatch(/--uv-soft-bg:\s*#fff8f0/)
  })
})

describe('quote · classic tokenSchema', () => {
  it('暴露 quote-bg + quote-size', () => {
    expect(Object.keys(classicQuoteSchema).sort()).toEqual(['quote-bg', 'quote-size'])
    expect(classicQuote.tokenSchema).toBe(classicQuoteSchema)
    expect(classicQuoteSchema['quote-size'].default).toBe('17px')
  })

  it('quote-size 覆盖 → bodyCSS 含 var(--uv-quote-size, 17px)', () => {
    // 不注入 UV 的纯渲染：验证 fallback 段命中
    const md = '::: quote-card 作者\n金句\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme })
    expect(out.html).toMatch(/var\(\s*--uv-quote-size\s*,\s*17px\s*\)/)
  })

  it('注入 UV：quote-bg 出现在 wrapper 的 inline css', () => {
    const uv: UserVariantTokens = {
      id: 'uv_classic_bg',
      name: '米色金句',
      level: 'tokens',
      createdAt: 0,
      updatedAt: 0,
      base: { kind: 'quote', variantId: 'classic' },
      tokens: { 'quote-bg': '#fdf6e3', 'quote-size': '18px' },
    }
    const md = '::: quote-card variant=uv_classic_bg 作者\n金句\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    expect(out.html).toMatch(/--uv-quote-bg:\s*#fdf6e3/)
    expect(out.html).toMatch(/--uv-quote-size:\s*18px/)
  })
})

describe('divider · wave tokenSchema', () => {
  it('暴露 gap-y', () => {
    expect(Object.keys(waveSchema)).toEqual(['gap-y'])
    expect(waveDivider.tokenSchema).toBe(waveSchema)
    expect(waveSchema['gap-y'].default).toBe('24px')
  })

  it('fallback：未注入 UV 时 wrapperCSS 含 var(--uv-gap-y, 24px)', () => {
    const md = '::: divider variant=wave\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme })
    expect(out.html).toMatch(/var\(\s*--uv-gap-y\s*,\s*24px\s*\)/)
  })

  it('注入 gap-y=40px → wrapper 含 --uv-gap-y:40px', () => {
    const uv: UserVariantTokens = {
      id: 'uv_wave_gap',
      name: '宽松换场',
      level: 'tokens',
      createdAt: 0,
      updatedAt: 0,
      base: { kind: 'divider', variantId: 'wave' },
      tokens: { 'gap-y': '40px' },
    }
    const md = '::: divider variant=uv_wave_gap\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    expect(out.html).toMatch(/--uv-gap-y:\s*40px/)
  })
})
