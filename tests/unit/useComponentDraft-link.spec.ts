/**
 * useComponentDraft · edit 模式的 UV 回环（步骤 4.3）。
 *
 * 守护点：
 *   - edit 模式打开挂着 linkedUserVariantId 的 user 组件 → tokens 自动回填
 *   - UV 已删（id 失效） → tokens 为空但 originalLinkedUvId 仍透出（让 onSave 决定清 link）
 *   - UV.level !== 'tokens' → tokens 为空（patch/custom 档不走这条路径）
 *   - UV.base 与组件 kind/variantId 不匹配 → tokens 为空（防脏数据误用）
 *   - new / derive 永不回填 tokens，永不透出 originalLinkedUvId
 */

import { beforeEach, describe, expect, it } from 'vitest'
import { useComponentDraft } from '../../src/ui/components/component-studio/useComponentDraft'
import { createUserVariant, deleteUserVariant } from '../../src/infra/storage/userVariants.repo'
import type { UserComponent } from '../../src/domain/components-lib'

beforeEach(() => {
  localStorage.clear()
})

function makeUserComponent(patch: Partial<UserComponent> = {}): UserComponent {
  return {
    source: 'user',
    id: 'uc_test_1',
    name: 'fixture',
    description: '',
    kind: 'admonition',
    variantId: 'accent-bar',
    markdownSnippet: '::: admonition kind=tip variant=accent-bar\nhi\n:::\n',
    thumbnailSvg: '<svg/>',
    createdAt: 0,
    ...patch,
  }
}

describe('useComponentDraft · edit 回环', () => {
  it('linkedUserVariantId 命中合法 UV → tokens 回填到 draft.userVariantTokens', () => {
    const uv = createUserVariant({
      level: 'tokens',
      name: 'link-1',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'accent-color': '#ff5a00', 'soft-bg': '#ffe' },
    })
    const entry = makeUserComponent({ linkedUserVariantId: uv.id })

    const { draft, originalLinkedUvId } = useComponentDraft('edit', entry)
    expect(originalLinkedUvId).toBe(uv.id)
    expect(draft.userVariantTokens).toEqual({ 'accent-color': '#ff5a00', 'soft-bg': '#ffe' })
  })

  it('linkedUserVariantId 指向已删 UV → tokens 空，originalLinkedUvId 仍透出', () => {
    const uv = createUserVariant({
      level: 'tokens',
      name: 'doomed',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'accent-color': '#000' },
    })
    deleteUserVariant(uv.id)
    const entry = makeUserComponent({ linkedUserVariantId: uv.id })

    const { draft, originalLinkedUvId } = useComponentDraft('edit', entry)
    expect(originalLinkedUvId).toBe(uv.id)
    expect(draft.userVariantTokens).toEqual({})
  })

  it('UV.base 与组件 kind/variantId 不匹配 → tokens 不回填（防脏数据）', () => {
    const uv = createUserVariant({
      level: 'tokens',
      name: 'mismatch',
      base: { kind: 'quote', variantId: 'classic' },
      tokens: { 'quote-color': '#abc' },
    })
    const entry = makeUserComponent({ linkedUserVariantId: uv.id })

    const { draft, originalLinkedUvId } = useComponentDraft('edit', entry)
    expect(originalLinkedUvId).toBe(uv.id)
    expect(draft.userVariantTokens).toEqual({})
  })

  it('UV.level === patch → cssPatch 回填 + mode=patch（步骤 5）', () => {
    const uv = createUserVariant({
      level: 'patch',
      name: 'patch-uv',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      cssPatch: { wrapperCSS: 'border:2px dashed red', titleCSS: 'color:#abc' },
    })
    const entry = makeUserComponent({ linkedUserVariantId: uv.id })

    const { draft, originalLinkedUvId } = useComponentDraft('edit', entry)
    expect(originalLinkedUvId).toBe(uv.id)
    expect(draft.userVariantTokens).toEqual({})
    expect(draft.userVariantMode).toBe('patch')
    expect(draft.userVariantCssPatch.wrapperCSS).toBe('border:2px dashed red')
    expect(draft.userVariantCssPatch.titleCSS).toBe('color:#abc')
    expect(draft.userVariantCssPatch.bodyCSS).toBe('')
  })

  it('UV.level === tokens → mode=tokens（步骤 5）', () => {
    const uv = createUserVariant({
      level: 'tokens',
      name: 'token-uv',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'accent-color': '#000' },
    })
    const entry = makeUserComponent({ linkedUserVariantId: uv.id })
    const { draft } = useComponentDraft('edit', entry)
    expect(draft.userVariantMode).toBe('tokens')
    expect(draft.userVariantTokens).toEqual({ 'accent-color': '#000' })
  })

  it('无 linkedUserVariantId → originalLinkedUvId 为 null', () => {
    const entry = makeUserComponent()
    const { originalLinkedUvId, draft } = useComponentDraft('edit', entry)
    expect(originalLinkedUvId).toBeNull()
    expect(draft.userVariantTokens).toEqual({})
  })

  it('derive 模式：即使 source 挂着 link，也不复制 tokens / originalLinkedUvId', () => {
    const uv = createUserVariant({
      level: 'tokens',
      name: 'src-link',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'accent-color': '#123' },
    })
    const entry = makeUserComponent({ linkedUserVariantId: uv.id })
    const { draft, originalLinkedUvId } = useComponentDraft('derive', entry)
    expect(originalLinkedUvId).toBeNull()
    expect(draft.userVariantTokens).toEqual({})
  })

  it('new 模式：originalLinkedUvId 为 null，tokens 空', () => {
    const { draft, originalLinkedUvId } = useComponentDraft('new', null)
    expect(originalLinkedUvId).toBeNull()
    expect(draft.userVariantTokens).toEqual({})
  })
})
