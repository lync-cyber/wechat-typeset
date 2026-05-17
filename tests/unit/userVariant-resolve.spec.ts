/**
 * 用户态变体注入 pipeline 的契约（步骤 3）。
 *
 * 分两层：
 *   1) applyUserVariant 纯函数（无 pipeline 依赖，跑 node 也可——本文件在 jsdom 是
 *      为了第二层 end-to-end；纯函数测放在前面方便定位失败原因）。
 *   2) end-to-end：构造 RenderInput { userVariants: [...] } 跑 pipelineRender，
 *      验证 attrs.variant=uv_xxx 命中后基底 wrapperCSS 被叠加上 patch / tokens。
 *
 * 重点守护：
 *   - 命中 + kind 匹配 → applyUserVariant 生效
 *   - kind 不匹配 / 仓未注入 / id 未命中 / level='custom' → 静默 fall-through，
 *     退化到原 4 级链；不抛错，不报警，对未声明用户变体的渲染零行为差异
 *   - SPI 暗号 titleCSS='' 在 patch 路径上被保留（防止 svgSlot 自绘 title +
 *     默认 title 行重叠的视觉灾难）
 */

import { describe, it, expect } from 'vitest'
import { applyUserVariant } from '../../src/core/pipeline/containers/_shared/userVariantApply'
import { render as pipelineRender } from '../../src/core/pipeline'
import { defaultTheme } from '../../src/core/themes/default'
import type {
  UserVariantPatch,
  UserVariantTokens,
  UserVariantCustom,
} from '../../src/core/variants/userVariant'
import type { VariantRenderResult } from '../../src/core/variants/_core'

// ─────────────────────────────────────────────────────────────
// 1) applyUserVariant 纯函数
// ─────────────────────────────────────────────────────────────

const BASE: VariantRenderResult = {
  wrapperCSS: 'background-color:#eef7f0;padding:14px 18px;border-radius:12px',
  titleCSS: 'font-size:14px;font-weight:700;color:#1a8450',
  bodyCSS: undefined,
}

function tokensUv(tokens: Record<string, string>): UserVariantTokens {
  return {
    id: 'uv_test_tokens',
    name: 't',
    level: 'tokens',
    createdAt: 0,
    updatedAt: 0,
    base: { kind: 'admonition', variantId: 'accent-bar' },
    tokens,
  }
}

function patchUv(cssPatch: UserVariantPatch['cssPatch']): UserVariantPatch {
  return {
    id: 'uv_test_patch',
    name: 'p',
    level: 'patch',
    createdAt: 0,
    updatedAt: 0,
    base: { kind: 'admonition', variantId: 'accent-bar' },
    cssPatch,
  }
}

describe('applyUserVariant · tokens 档', () => {
  it('空 tokens → CSS 全部不动', () => {
    const out = applyUserVariant(tokensUv({}), BASE)
    expect(out).toEqual(BASE)
  })

  it('注入到 wrapperCSS 末尾，带 --uv- 命名空间前缀', () => {
    const out = applyUserVariant(tokensUv({ accent: '#ff5a00', size: '22px' }), BASE)
    expect(out.wrapperCSS).toBe(`${BASE.wrapperCSS};--uv-accent:#ff5a00;--uv-size:22px`)
    expect(out.titleCSS).toBe(BASE.titleCSS)
    expect(out.bodyCSS).toBeUndefined()
  })

  it('wrapperCSS 为空时直接以 --uv-name:value 起头（无前导分号）', () => {
    const out = applyUserVariant(tokensUv({ a: '1' }), { ...BASE, wrapperCSS: '' })
    expect(out.wrapperCSS).toBe('--uv-a:1')
  })
})

describe('applyUserVariant · patch 档', () => {
  it('三槽各自追加，分号分隔', () => {
    const out = applyUserVariant(
      patchUv({
        wrapperCSS: 'padding:99px',
        titleCSS: 'font-weight:800',
        bodyCSS: 'line-height:2',
      }),
      { ...BASE, bodyCSS: 'color:#333' },
    )
    expect(out.wrapperCSS).toBe(`${BASE.wrapperCSS};padding:99px`)
    expect(out.titleCSS).toBe(`${BASE.titleCSS};font-weight:800`)
    expect(out.bodyCSS).toBe('color:#333;line-height:2')
  })

  it('未指定的槽位保留 base 原值（含 undefined）', () => {
    const out = applyUserVariant(patchUv({ wrapperCSS: 'a:1' }), BASE)
    expect(out.titleCSS).toBe(BASE.titleCSS) // 没传 titleCSS patch → 原样
    expect(out.bodyCSS).toBeUndefined() // base 是 undefined，patch 没动 → 仍 undefined
  })

  it('base 槽位 undefined + patch 有值 → 用 patch 作为新 base', () => {
    const out = applyUserVariant(
      patchUv({ bodyCSS: 'padding:8px' }),
      { ...BASE, bodyCSS: undefined },
    )
    expect(out.bodyCSS).toBe('padding:8px')
  })

  it('SPI 暗号：base.titleCSS === "" 不允许 patch 覆盖（保留 "" 暗号）', () => {
    const out = applyUserVariant(
      patchUv({ titleCSS: 'font-size:99px' }),
      { ...BASE, titleCSS: '' },
    )
    expect(out.titleCSS).toBe('')
  })

  it('patch.titleCSS 为空字符串视作未指定（不当作 suppress 暗号）', () => {
    // 暗号契约只属于 variant 作者，user patch 用空串没语义；当作 no-op
    const out = applyUserVariant(patchUv({ titleCSS: '' }), BASE)
    expect(out.titleCSS).toBe(BASE.titleCSS)
  })
})

// ─────────────────────────────────────────────────────────────
// 2) end-to-end：通过 pipelineRender 跑完整管线
// ─────────────────────────────────────────────────────────────

describe('pipelineRender · userVariants 注入', () => {
  it('pull-quote 命中 uv → wrapperCSS 末尾叠加 patch', () => {
    const uv: UserVariantPatch = {
      id: 'uv_pq_patch_001',
      name: '加重 pull-quote',
      level: 'patch',
      createdAt: 0,
      updatedAt: 0,
      base: { kind: 'pullQuote', variantId: 'giant-mark' },
      cssPatch: { wrapperCSS: 'padding:99px;background-color:#abcdef' },
    }
    const md = '::: pull-quote variant=uv_pq_patch_001\n名言正文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    // class 仍按 uv.id 走（不是基底 id）：让作者一眼看出"这是用户变体"
    expect(out.html).toContain('container-pull-quote--uv_pq_patch_001')
    // patch 内容落到内联 style 里（juice 会把 'a:b' 规范化为 'a: b'，用 regex 容差）
    expect(out.html).toMatch(/padding:\s*99px/)
    expect(out.html).toContain('#abcdef')
  })

  it('admonition (带 args) 命中 uv，args 仍按 kind=tip 派发', () => {
    const uv: UserVariantTokens = {
      id: 'uv_tip_tokens_001',
      name: '橙调 tip',
      level: 'tokens',
      createdAt: 0,
      updatedAt: 0,
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'wxts-accent': '#ff5a00' },
    }
    const md = '::: tip 小贴士 variant=uv_tip_tokens_001\n正文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    expect(out.html).toContain('container-tip--uv_tip_tokens_001')
    // --uv-<key> 命名空间注入到 wrapperCSS 末尾（juice 规范化空白用 regex 容差）
    expect(out.html).toMatch(/--uv-wxts-accent:\s*#ff5a00/)
  })

  it('uv 仓未注入：attrs.variant=uv_xxx 走原 fallback 链（默认 accent-bar）', () => {
    const md = '::: tip variant=uv_nonexistent\n正文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme })
    expect(out.html).toContain('container-tip--accent-bar')
    expect(out.html).not.toContain('uv_nonexistent')
  })

  it('uv id 未命中：fall-through 不抛错', () => {
    const uv: UserVariantPatch = {
      id: 'uv_other',
      name: 'other',
      level: 'patch',
      createdAt: 0,
      updatedAt: 0,
      base: { kind: 'admonition', variantId: 'accent-bar' },
      cssPatch: { wrapperCSS: 'padding:1px' },
    }
    const md = '::: tip variant=uv_not_this_one\n正文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    expect(out.html).toContain('container-tip--accent-bar')
  })

  it('uv kind 不匹配（admonition uv 用在 pullQuote 槽位）→ fall-through 到 fallback', () => {
    const uv: UserVariantPatch = {
      id: 'uv_kind_mismatch',
      name: 'mismatch',
      level: 'patch',
      createdAt: 0,
      updatedAt: 0,
      base: { kind: 'admonition', variantId: 'accent-bar' },
      cssPatch: { wrapperCSS: 'padding:77px' },
    }
    const md = '::: pull-quote variant=uv_kind_mismatch\n名言\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    // 不应叠加，应走 pull-quote 的默认链
    expect(out.html).not.toContain('padding:77px')
    expect(out.html).toContain('container-pull-quote')
    expect(out.html).not.toContain('uv_kind_mismatch')
  })

  it('uv level=custom → fall-through（步骤 7 才接 custom 渲染）', () => {
    const uv: UserVariantCustom = {
      id: 'uv_custom_001',
      name: 'c',
      level: 'custom',
      createdAt: 0,
      updatedAt: 0,
      base: null,
      template: '<section>{{body}}</section>',
      css: { wrapperCSS: 'padding:55px' },
    }
    const md = '::: tip variant=uv_custom_001\n正文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    expect(out.html).not.toContain('padding:55px')
    expect(out.html).toContain('container-tip--accent-bar')
  })

  it('uv 基底 variantId 不存在 → fall-through', () => {
    const uv: UserVariantPatch = {
      id: 'uv_bad_base',
      name: 'bad',
      level: 'patch',
      createdAt: 0,
      updatedAt: 0,
      base: { kind: 'admonition', variantId: 'this-variant-does-not-exist' },
      cssPatch: { wrapperCSS: 'padding:44px' },
    }
    const md = '::: tip variant=uv_bad_base\n正文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    expect(out.html).not.toContain('padding:44px')
    expect(out.html).toContain('container-tip--accent-bar')
  })

  it('未传 userVariants 字段：原管线行为完全不变（attrs.variant 走原逻辑）', () => {
    const md = '::: tip variant=pill-tag\n正文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme })
    expect(out.html).toContain('container-tip--pill-tag')
  })

  it('空 userVariants 数组：env 不注入，等价于未传', () => {
    const md = '::: tip variant=pill-tag\n正文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [] })
    expect(out.html).toContain('container-tip--pill-tag')
  })

  it('uv id 大小写：attrs.variant 经 toLowerCase 后比对（rawOverride 用户写大写也能命中）', () => {
    const uv: UserVariantPatch = {
      id: 'uv_lower_only',
      name: 'l',
      level: 'patch',
      createdAt: 0,
      updatedAt: 0,
      base: { kind: 'admonition', variantId: 'accent-bar' },
      cssPatch: { wrapperCSS: 'padding:33px' },
    }
    // 用户写大写 uv 前缀
    const md = '::: tip variant=UV_lower_only\n正文\n:::\n'
    const out = pipelineRender({ md, theme: defaultTheme, userVariants: [uv] })
    expect(out.html).toMatch(/padding:\s*33px/)
  })
})
