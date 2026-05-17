/**
 * removeComponent · 级联清理 linkedUserVariantId (步骤 4.4)
 *
 * 守护：
 *   - 删组件 → 其 linkedUserVariantId 若无其它引用，连带删
 *   - 共享 UV（两个组件指同一 UV）→ 删其中一个，UV 保留
 *   - 无 linkedUserVariantId → 删组件不动 UV 仓
 *   - linkedUserVariantId 指向已不存在的 UV → 安静 no-op，不抛
 */

import { beforeEach, describe, expect, it } from 'vitest'
import { removeComponent } from '../../src/domain/components-lib/mutations'
import { createUserComponent } from '../../src/infra/storage/userComponents.repo'
import {
  createUserVariant,
  getUserVariant,
  listUserVariants,
} from '../../src/infra/storage/userVariants.repo'

beforeEach(() => {
  localStorage.clear()
})

function makeUvAndComponent(): { uvId: string; compId: string } {
  const uv = createUserVariant({
    level: 'tokens',
    name: 'fixture',
    base: { kind: 'admonition', variantId: 'accent-bar' },
    tokens: { 'accent-color': '#ff0000' },
  })
  const comp = createUserComponent({
    name: 'fixture component',
    markdownSnippet: '::: tip variant=' + uv.id + '\nx\n:::\n',
    kind: 'admonition',
    variantId: 'accent-bar',
    linkedUserVariantId: uv.id,
  })
  return { uvId: uv.id, compId: comp.id }
}

describe('removeComponent · 级联清理', () => {
  it('唯一引用：删组件连带删 UV', () => {
    const { uvId, compId } = makeUvAndComponent()
    expect(getUserVariant(uvId)).toBeDefined()
    removeComponent(compId)
    expect(getUserVariant(uvId)).toBeUndefined()
  })

  it('共享 UV：删其中一个组件，UV 保留', () => {
    const uv = createUserVariant({
      level: 'tokens',
      name: 'shared',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'accent-color': '#aaa' },
    })
    const compA = createUserComponent({
      name: 'A',
      markdownSnippet: '::: tip variant=' + uv.id + '\n\n:::\n',
      kind: 'admonition',
      variantId: 'accent-bar',
      linkedUserVariantId: uv.id,
    })
    createUserComponent({
      name: 'B',
      markdownSnippet: '::: tip variant=' + uv.id + '\n\n:::\n',
      kind: 'admonition',
      variantId: 'accent-bar',
      linkedUserVariantId: uv.id,
    })
    removeComponent(compA.id)
    expect(getUserVariant(uv.id)).toBeDefined()
  })

  it('无 linkedUserVariantId：删组件不动 UV 仓', () => {
    const uv = createUserVariant({
      level: 'tokens',
      name: 'unrelated',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { 'accent-color': '#000' },
    })
    const comp = createUserComponent({
      name: 'no-link',
      markdownSnippet: '::: tip\n\n:::\n',
      kind: 'admonition',
      variantId: 'accent-bar',
    })
    removeComponent(comp.id)
    expect(getUserVariant(uv.id)).toBeDefined()
    expect(listUserVariants()).toHaveLength(1)
  })

  it('linkedUserVariantId 指向已不存在的 UV：no-op 不抛', () => {
    const comp = createUserComponent({
      name: 'stale-link',
      markdownSnippet: '::: tip\n\n:::\n',
      kind: 'admonition',
      variantId: 'accent-bar',
      linkedUserVariantId: 'uv_nonexistent',
    })
    expect(() => removeComponent(comp.id)).not.toThrow()
  })
})
