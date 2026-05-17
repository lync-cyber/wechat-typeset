/**
 * userVariantSave · dispatchUserVariant 4 路矩阵（步骤 5.5 + 4.3 集成）。
 *
 * 守护：
 *   case 1 同级同 base + 有内容 → updateUserVariant，markdown 不变，linkAction='noop'
 *   case 2 orig 在 + 无内容 → deleteUserVariant + markdown 回退基底 + linkAction='clear'
 *   case 3 无 orig + 有内容 → createUserVariant + markdown 改写 + linkAction='set'
 *   case 4 无 orig 无内容 → 全 no-op
 *   跨级（tokens → patch）→ 视为 case 3 重建（删旧 + 建新）
 *   跨 base 同样路径
 *
 * 覆盖 tokens 与 patch 两档；rewriteVariantInMarkdown 走 happy path 与边界（baseId 空）。
 */

import { beforeEach, describe, expect, it } from 'vitest'
import {
  CUSTOM_FENCE_PLACEHOLDER,
  dispatchUserVariant,
  rewriteCustomFenceInMarkdown,
  rewriteVariantInMarkdown,
} from '../../src/ui/components/component-studio/userVariantSave'
import type { DraftFields } from '../../src/ui/components/component-studio/useComponentDraft'
import {
  createUserVariant,
  getUserVariant,
  listUserVariants,
} from '../../src/infra/storage/userVariants.repo'

beforeEach(() => {
  localStorage.clear()
})

function makeDraft(patch: Partial<DraftFields> = {}): DraftFields {
  return {
    name: 'fixture',
    description: '',
    kind: 'admonition',
    variantId: 'accent-bar',
    markdownSnippet: '::: tip variant=accent-bar\n正文\n:::\n',
    thumbnailSvg: '<svg/>',
    userVariantTokens: {},
    userVariantMode: null,
    userVariantCssPatch: { wrapperCSS: '', titleCSS: '', bodyCSS: '' },
    userVariantCustom: { template: '', wrapperCSS: '', titleCSS: '', bodyCSS: '', svgSlot: '' },
    ...patch,
  }
}

describe('rewriteVariantInMarkdown', () => {
  it('正常替换：variant=base → variant=new', () => {
    expect(
      rewriteVariantInMarkdown('::: tip variant=accent-bar\nx\n:::', 'accent-bar', 'uv_x'),
    ).toBe('::: tip variant=uv_x\nx\n:::')
  })

  it('多次出现全替换', () => {
    expect(
      rewriteVariantInMarkdown(
        '::: tip variant=a\nx\n:::\n::: tip variant=a\ny\n:::',
        'a',
        'uv_a',
      ),
    ).toBe('::: tip variant=uv_a\nx\n:::\n::: tip variant=uv_a\ny\n:::')
  })

  it('空 baseId / 空 newId / 空 md 一律原样返回', () => {
    expect(rewriteVariantInMarkdown('x', '', 'y')).toBe('x')
    expect(rewriteVariantInMarkdown('x', 'a', '')).toBe('x')
    expect(rewriteVariantInMarkdown('', 'a', 'b')).toBe('')
  })

  it('baseId 含 regex 特殊字符 → escape 后正确匹配', () => {
    expect(
      rewriteVariantInMarkdown('variant=a.b+c', 'a.b+c', 'uv_x'),
    ).toBe('variant=uv_x')
  })
})

describe('dispatchUserVariant · tokens 档', () => {
  it('case 3 新建：无 orig + tokens 非空 → create + set + rewrite markdown', () => {
    const draft = makeDraft({
      userVariantMode: 'tokens',
      userVariantTokens: { 'accent-color': '#ff5a00' },
    })
    const { markdown, linkAction } = dispatchUserVariant(draft, null)
    expect(linkAction.kind).toBe('set')
    if (linkAction.kind !== 'set') throw new Error('unreachable')
    expect(linkAction.id).toMatch(/^uv_/)
    expect(markdown).toContain(`variant=${linkAction.id}`)
    expect(getUserVariant(linkAction.id)?.level).toBe('tokens')
  })

  it('case 1 update：orig 在 + 同级同 base + tokens 非空 → update + noop', () => {
    const uv = createUserVariant({
      level: 'tokens',
      name: 'old',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'accent-color': '#000' },
    })
    const draft = makeDraft({
      markdownSnippet: `::: tip variant=${uv.id}\nx\n:::\n`,
      userVariantMode: 'tokens',
      userVariantTokens: { 'accent-color': '#ff0000' },
    })
    const { markdown, linkAction } = dispatchUserVariant(draft, uv.id)
    expect(linkAction.kind).toBe('noop')
    expect(markdown).toContain(`variant=${uv.id}`)
    expect(getUserVariant(uv.id)?.level === 'tokens' && getUserVariant(uv.id)).toMatchObject({
      tokens: { 'accent-color': '#ff0000' },
    })
  })

  it('case 2 clear：orig 在 + tokens 清空 → delete + rewrite back + clear link', () => {
    const uv = createUserVariant({
      level: 'tokens',
      name: 'doomed',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'accent-color': '#abc' },
    })
    const draft = makeDraft({
      markdownSnippet: `::: tip variant=${uv.id}\nx\n:::\n`,
      userVariantMode: 'tokens',
      userVariantTokens: {},
    })
    const { markdown, linkAction } = dispatchUserVariant(draft, uv.id)
    expect(linkAction.kind).toBe('clear')
    expect(markdown).toContain('variant=accent-bar')
    expect(markdown).not.toContain(uv.id)
    expect(getUserVariant(uv.id)).toBeUndefined()
  })

  it('case 4 noop：无 orig + tokens 空 → markdown 原样 + noop', () => {
    const draft = makeDraft({
      userVariantMode: 'tokens',
      userVariantTokens: {},
    })
    const { markdown, linkAction } = dispatchUserVariant(draft, null)
    expect(linkAction.kind).toBe('noop')
    expect(markdown).toBe(draft.markdownSnippet)
    expect(listUserVariants()).toHaveLength(0)
  })
})

describe('dispatchUserVariant · patch 档', () => {
  it('case 3 新建：无 orig + cssPatch 有内容 → create patch UV + set + rewrite', () => {
    const draft = makeDraft({
      userVariantMode: 'patch',
      userVariantCssPatch: {
        wrapperCSS: 'border:2px dashed red',
        titleCSS: '',
        bodyCSS: '',
      },
    })
    const { markdown, linkAction } = dispatchUserVariant(draft, null)
    expect(linkAction.kind).toBe('set')
    if (linkAction.kind !== 'set') throw new Error('unreachable')
    const uv = getUserVariant(linkAction.id)
    expect(uv?.level).toBe('patch')
    if (uv?.level === 'patch') {
      expect(uv.cssPatch.wrapperCSS).toBe('border:2px dashed red')
      expect(uv.cssPatch.titleCSS).toBeUndefined()
      expect(uv.cssPatch.bodyCSS).toBeUndefined()
    }
    expect(markdown).toContain(`variant=${linkAction.id}`)
  })

  it('case 1 update：orig patch + 同级同 base + cssPatch 改了 → update + noop', () => {
    const uv = createUserVariant({
      level: 'patch',
      name: 'old',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      cssPatch: { wrapperCSS: 'border:1px solid' },
    })
    const draft = makeDraft({
      markdownSnippet: `::: tip variant=${uv.id}\nx\n:::\n`,
      userVariantMode: 'patch',
      userVariantCssPatch: {
        wrapperCSS: 'border:3px solid',
        titleCSS: 'color:red',
        bodyCSS: '',
      },
    })
    const { linkAction } = dispatchUserVariant(draft, uv.id)
    expect(linkAction.kind).toBe('noop')
    const after = getUserVariant(uv.id)
    if (after?.level === 'patch') {
      expect(after.cssPatch.wrapperCSS).toBe('border:3px solid')
      expect(after.cssPatch.titleCSS).toBe('color:red')
    }
  })

  it('case 2 clear：orig patch + 所有 slot 清空 → delete + rewrite back', () => {
    const uv = createUserVariant({
      level: 'patch',
      name: 'doomed',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      cssPatch: { wrapperCSS: 'background:#000' },
    })
    const draft = makeDraft({
      markdownSnippet: `::: tip variant=${uv.id}\nx\n:::\n`,
      userVariantMode: 'patch',
      userVariantCssPatch: { wrapperCSS: '', titleCSS: '', bodyCSS: '' },
    })
    const { markdown, linkAction } = dispatchUserVariant(draft, uv.id)
    expect(linkAction.kind).toBe('clear')
    expect(markdown).toContain('variant=accent-bar')
    expect(getUserVariant(uv.id)).toBeUndefined()
  })
})

describe('dispatchUserVariant · 跨级 / 跨 base 重建', () => {
  it('跨级 tokens → patch：删旧 + 建新 patch UV', () => {
    const orig = createUserVariant({
      level: 'tokens',
      name: 'token-orig',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'accent-color': '#abc' },
    })
    const draft = makeDraft({
      markdownSnippet: `::: tip variant=${orig.id}\nx\n:::\n`,
      userVariantMode: 'patch',
      userVariantCssPatch: { wrapperCSS: 'border:1px solid', titleCSS: '', bodyCSS: '' },
    })
    const { markdown, linkAction } = dispatchUserVariant(draft, orig.id)
    expect(linkAction.kind).toBe('set')
    expect(getUserVariant(orig.id)).toBeUndefined()
    if (linkAction.kind === 'set') {
      expect(getUserVariant(linkAction.id)?.level).toBe('patch')
      // markdown 含新 id（不再含旧 orig id）
      expect(markdown).toContain(`variant=${linkAction.id}`)
      expect(markdown).not.toContain(orig.id)
    }
  })

  it('跨 base：orig 基底 quote/classic，draft 改成 admonition/accent-bar → 删旧建新', () => {
    const orig = createUserVariant({
      level: 'tokens',
      name: 'quote-tokens',
      base: { kind: 'quote', variantId: 'classic' },
      tokens: { 'quote-bg': '#fdf6e3' },
    })
    const draft = makeDraft({
      markdownSnippet: `::: tip variant=${orig.id}\nx\n:::\n`,
      kind: 'admonition',
      variantId: 'accent-bar',
      userVariantMode: 'tokens',
      userVariantTokens: { 'accent-color': '#0f0' },
    })
    const { linkAction } = dispatchUserVariant(draft, orig.id)
    expect(linkAction.kind).toBe('set')
    expect(getUserVariant(orig.id)).toBeUndefined()
  })

  it('跨级 + 用户清空 → delete orig + markdown 回退 + clear', () => {
    const orig = createUserVariant({
      level: 'tokens',
      name: 'token-orig',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'accent-color': '#abc' },
    })
    const draft = makeDraft({
      markdownSnippet: `::: tip variant=${orig.id}\nx\n:::\n`,
      userVariantMode: 'patch',
      userVariantCssPatch: { wrapperCSS: '', titleCSS: '', bodyCSS: '' },
    })
    const { markdown, linkAction } = dispatchUserVariant(draft, orig.id)
    // 跨级 + 无新内容：删旧 UV + markdown 回退到 base，linkAction='clear'
    expect(linkAction.kind).toBe('clear')
    expect(getUserVariant(orig.id)).toBeUndefined()
    expect(markdown).toContain('variant=accent-bar')
    expect(markdown).not.toContain(orig.id)
  })
})

describe('rewriteCustomFenceInMarkdown', () => {
  it('替换 ::: uc-old → ::: uc-new', () => {
    expect(
      rewriteCustomFenceInMarkdown('::: uc-old\nx\n:::', 'uc-old', 'uc-uv_new'),
    ).toBe('::: uc-uv_new\nx\n:::')
  })

  it('支持 4 个冒号 fence（`::::`）', () => {
    expect(
      rewriteCustomFenceInMarkdown(':::: uc-old\nx\n::::', 'uc-old', 'uc-new'),
    ).toBe(':::: uc-new\nx\n::::')
  })

  it('不误伤 inline `uc-old` 出现在文本里', () => {
    expect(
      rewriteCustomFenceInMarkdown('正文 uc-old 引用', 'uc-old', 'uc-new'),
    ).toBe('正文 uc-old 引用')
  })

  it('多次出现全替换', () => {
    expect(
      rewriteCustomFenceInMarkdown(
        '::: uc-x\na\n:::\n::: uc-x\nb\n:::',
        'uc-x',
        'uc-y',
      ),
    ).toBe('::: uc-y\na\n:::\n::: uc-y\nb\n:::')
  })

  it('空 / 等值 → 原样', () => {
    expect(rewriteCustomFenceInMarkdown('x', '', 'y')).toBe('x')
    expect(rewriteCustomFenceInMarkdown('x', 'a', '')).toBe('x')
    expect(rewriteCustomFenceInMarkdown('::: uc-a\nx\n:::', 'uc-a', 'uc-a')).toBe(
      '::: uc-a\nx\n:::',
    )
  })
})

describe('dispatchUserVariant · custom 档', () => {
  function makeCustomDraft(p: Partial<DraftFields> = {}): DraftFields {
    return makeDraft({
      kind: 'none',
      variantId: '',
      markdownSnippet: `::: ${CUSTOM_FENCE_PLACEHOLDER} 标题\n正文\n:::\n`,
      userVariantMode: 'custom',
      userVariantCustom: {
        template: '<section>{{body}}</section>',
        wrapperCSS: 'background:#fff',
        titleCSS: '',
        bodyCSS: '',
        svgSlot: '',
      },
      ...p,
    })
  }

  it('case 3 新建：无 orig + 有 template + wrapperCSS → create custom + rewrite uc-NEW', () => {
    const draft = makeCustomDraft()
    const { markdown, linkAction } = dispatchUserVariant(draft, null)
    expect(linkAction.kind).toBe('set')
    if (linkAction.kind !== 'set') throw new Error('unreachable')
    expect(linkAction.id).toMatch(/^uv_/)
    expect(markdown).toContain(`uc-${linkAction.id}`)
    expect(markdown).not.toContain(CUSTOM_FENCE_PLACEHOLDER)
    const uv = getUserVariant(linkAction.id)
    expect(uv?.level).toBe('custom')
    if (uv?.level === 'custom') {
      expect(uv.template).toBe('<section>{{body}}</section>')
      expect(uv.css.wrapperCSS).toBe('background:#fff')
    }
  })

  it('case 1 update：orig custom + 同档 + template 改了 → update + noop', () => {
    const uv = createUserVariant({
      level: 'custom',
      name: 'orig',
      base: null,
      template: '<section>old</section>',
      css: { wrapperCSS: 'background:red' },
    })
    const draft = makeCustomDraft({
      markdownSnippet: `::: uc-${uv.id} t\nx\n:::\n`,
      userVariantCustom: {
        template: '<section>new {{body}}</section>',
        wrapperCSS: 'background:blue',
        titleCSS: '',
        bodyCSS: '',
        svgSlot: '',
      },
    })
    const { linkAction } = dispatchUserVariant(draft, uv.id)
    expect(linkAction.kind).toBe('noop')
    const after = getUserVariant(uv.id)
    if (after?.level === 'custom') {
      expect(after.template).toBe('<section>new {{body}}</section>')
      expect(after.css.wrapperCSS).toBe('background:blue')
    }
  })

  it('case 2 clear：orig custom + 用户清空 template → delete + clear', () => {
    const uv = createUserVariant({
      level: 'custom',
      name: 'doomed',
      base: null,
      template: '<section>{{body}}</section>',
      css: { wrapperCSS: 'background:#000' },
    })
    const draft = makeCustomDraft({
      markdownSnippet: `::: uc-${uv.id}\nx\n:::\n`,
      userVariantCustom: {
        template: '',
        wrapperCSS: '',
        titleCSS: '',
        bodyCSS: '',
        svgSlot: '',
      },
    })
    const { linkAction } = dispatchUserVariant(draft, uv.id)
    expect(linkAction.kind).toBe('clear')
    expect(getUserVariant(uv.id)).toBeUndefined()
  })

  it('跨级 patch → custom：删旧 patch + 建新 custom；markdown 不重写（无可机械重写的 token）', () => {
    const orig = createUserVariant({
      level: 'patch',
      name: 'patch-orig',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      cssPatch: { wrapperCSS: 'border:1px' },
    })
    const draft = makeCustomDraft({
      // 起点 markdown 含旧 variant=<orig.id>；新 custom 用 uc-NEW 起步
      markdownSnippet: `::: tip variant=${orig.id}\nx\n:::\n::: ${CUSTOM_FENCE_PLACEHOLDER}\ny\n:::\n`,
    })
    const { markdown, linkAction } = dispatchUserVariant(draft, orig.id)
    expect(linkAction.kind).toBe('set')
    expect(getUserVariant(orig.id)).toBeUndefined()
    if (linkAction.kind === 'set') {
      // 新 custom fence 被改写为新 uv.id
      expect(markdown).toContain(`uc-${linkAction.id}`)
    }
  })

  it('跨级 custom → tokens：删旧 custom + 建新 tokens；旧 fence 名遗留（用户须手动清理）', () => {
    const orig = createUserVariant({
      level: 'custom',
      name: 'cust-orig',
      base: null,
      template: '<section>{{body}}</section>',
      css: { wrapperCSS: 'background:#abc' },
    })
    const draft = makeDraft({
      markdownSnippet: `::: uc-${orig.id}\nx\n:::\n::: tip variant=accent-bar\ny\n:::\n`,
      userVariantMode: 'tokens',
      userVariantTokens: { 'accent-color': '#000' },
    })
    const { linkAction } = dispatchUserVariant(draft, orig.id)
    expect(linkAction.kind).toBe('set')
    expect(getUserVariant(orig.id)).toBeUndefined()
    if (linkAction.kind === 'set') {
      expect(getUserVariant(linkAction.id)?.level).toBe('tokens')
    }
  })
})
