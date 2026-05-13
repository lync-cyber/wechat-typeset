/**
 * useComponentDraft —— Studio 草稿状态机契约（P4）。
 *
 * 覆盖三种 init.mode + dirty 跟踪 + reset:
 *   - new      空白草稿,initial 全空,任意改字段都 dirty
 *   - edit     基于 user 组件加载,editingId 保留,改字段触发 dirty
 *   - derive   基于 builtin / theme template 克隆,name 加 "副本 ·" 前缀,editingId 为 null
 *   - reset()  把 draft 还原到 initial,dirty 回 false
 *
 * 这层 composable 不调 storage——保存路径由 ComponentStudio.vue 调 mutations。
 * 故本测试不需要 localStorage,只测 reactive 行为。
 */

import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { useComponentDraft } from '../../src/ui/components/component-studio/useComponentDraft'
import type {
  BuiltinEntry,
  UserComponent,
} from '../../src/domain/components-lib/types'

function makeBuiltin(over: Partial<BuiltinEntry> = {}): BuiltinEntry {
  return {
    source: 'builtin',
    id: 'ad-tip-terminal',
    name: '终端 Tip',
    description: '黑底三色圆点',
    kind: 'admonition',
    variantId: 'terminal',
    markdownSnippet: '::: tip variant=terminal\n内容\n:::\n',
    thumbnailSvg: '<svg viewBox="0 0 75 75"></svg>',
    ...over,
  }
}

function makeUser(over: Partial<UserComponent> = {}): UserComponent {
  return {
    source: 'user',
    id: 'uc_abc',
    name: '我的卡',
    description: '',
    kind: 'none',
    markdownSnippet: '::: tip\n我写的\n:::\n',
    thumbnailSvg: '<svg viewBox="0 0 75 75"></svg>',
    createdAt: 1700000000000,
    ...over,
  }
}

describe('useComponentDraft · mode=new', () => {
  it('空白草稿,所有字段缺省', () => {
    const { draft, initial, editingId, dirty } = useComponentDraft('new', null)
    expect(draft.name).toBe('')
    expect(draft.description).toBe('')
    expect(draft.kind).toBe('none')
    expect(draft.variantId).toBe('')
    expect(draft.markdownSnippet).toBe('')
    expect(draft.thumbnailSvg).toBe('')
    expect(initial.name).toBe('')
    expect(editingId).toBe(null)
    expect(dirty.value).toBe(false)
  })

  it('改任一字段触发 dirty', async () => {
    const { draft, dirty } = useComponentDraft('new', null)
    expect(dirty.value).toBe(false)
    draft.name = '新组件'
    await nextTick()
    expect(dirty.value).toBe(true)
  })
})

describe('useComponentDraft · mode=edit', () => {
  it('从 user entry 加载,保留 editingId', () => {
    const user = makeUser({ id: 'uc_xyz', name: '原名', description: '原描述' })
    const { draft, initial, editingId, dirty } = useComponentDraft('edit', user)
    expect(draft.name).toBe('原名')
    expect(draft.description).toBe('原描述')
    expect(draft.markdownSnippet).toBe(user.markdownSnippet)
    expect(initial.name).toBe('原名')
    expect(editingId).toBe('uc_xyz')
    expect(dirty.value).toBe(false)
  })

  it('改字段后 dirty=true,reset 后回 false', async () => {
    const user = makeUser({ name: 'A' })
    const { draft, dirty, reset } = useComponentDraft('edit', user)
    draft.name = 'B'
    await nextTick()
    expect(dirty.value).toBe(true)
    reset()
    await nextTick()
    expect(dirty.value).toBe(false)
    expect(draft.name).toBe('A')
  })
})

describe('useComponentDraft · mode=derive', () => {
  it('从 builtin 克隆,name 加"副本 ·"前缀', () => {
    const builtin = makeBuiltin({ name: '终端 Tip' })
    const { draft, editingId } = useComponentDraft('derive', builtin)
    expect(draft.name).toBe('副本 · 终端 Tip')
    expect(draft.kind).toBe('admonition')
    expect(draft.variantId).toBe('terminal')
    expect(draft.markdownSnippet).toBe(builtin.markdownSnippet)
    // 派生是创建新条目,不持有 source id
    expect(editingId).toBe(null)
  })

  it('从 user 克隆也加前缀,不复用 id', () => {
    const user = makeUser({ name: '原 user' })
    const { draft, editingId } = useComponentDraft('derive', user)
    expect(draft.name).toBe('副本 · 原 user')
    expect(editingId).toBe(null)
  })
})

describe('useComponentDraft · 边界', () => {
  it('mode=new 但传 source: source 被忽略,等同空白', () => {
    const builtin = makeBuiltin()
    const { draft } = useComponentDraft('new', builtin)
    expect(draft.name).toBe('')
    expect(draft.markdownSnippet).toBe('')
  })

  it('mode=edit 但 source 为 null: 退化为空白草稿,editingId=null', () => {
    const { draft, editingId } = useComponentDraft('edit', null)
    expect(draft.name).toBe('')
    expect(editingId).toBe(null)
  })

  it('mode=edit 但 source 不是 user(builtin): editingId 仍为 null(builtin 不能编辑只读)', () => {
    const builtin = makeBuiltin()
    const { draft, editingId } = useComponentDraft('edit', builtin)
    // draft 字段被克隆——这是 ComponentPalette 不会触发的边缘场景,但 composable 应该不抛
    expect(draft.name).toBe(builtin.name)
    expect(editingId).toBe(null)
  })
})
