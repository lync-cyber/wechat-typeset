/**
 * usePersonaDraft 契约
 *
 * 锁：
 *   - 初始化时 draft 等于 base persona（深拷贝，互不引用）
 *   - dirty 在 base 改动后翻 true
 *   - reset() 把 draft 拉回 base
 *   - setBase() 整体替换 draft
 *   - previewTheme 是 specToTheme(draft) 的活快照
 *   - exportJson / importJson 往返一致
 *   - validation 监控 draft 中的非法值
 */

import { describe, it, expect } from 'vitest'
import { usePersonaDraft } from '../../src/ui/components/persona-studio/usePersonaDraft'
import { getPersona } from '../../src/public'

describe('usePersonaDraft · 初始化', () => {
  it('draft 内容等于 base persona 但不共享引用', () => {
    const mgr = usePersonaDraft('default')
    const base = getPersona('default')
    expect(mgr.draft.id).toBe(base.id)
    expect(mgr.draft.palette).toEqual(base.palette)
    expect(mgr.draft.palette).not.toBe(base.palette)
  })

  it('dirty 初始为 false', () => {
    const mgr = usePersonaDraft('tech-geek')
    expect(mgr.dirty.value).toBe(false)
  })
})

describe('usePersonaDraft · dirty / reset', () => {
  it('修改 palette 后 dirty=true', () => {
    const mgr = usePersonaDraft('default')
    mgr.draft.palette.primary = '#ff0000'
    expect(mgr.dirty.value).toBe(true)
  })

  it('reset 把 draft 拉回 base', () => {
    const mgr = usePersonaDraft('default')
    mgr.draft.palette.primary = '#ff0000'
    mgr.reset()
    expect(mgr.dirty.value).toBe(false)
    expect(mgr.draft.palette.primary).toBe(getPersona('default').palette.primary)
  })
})

describe('usePersonaDraft · setBase', () => {
  it('切换到另一 base → draft 整体替换', () => {
    const mgr = usePersonaDraft('default')
    mgr.setBase('tech-geek')
    expect(mgr.draft.id).toBe('tech-geek')
    expect(mgr.draft.palette).toEqual(getPersona('tech-geek').palette)
    expect(mgr.dirty.value).toBe(false)
  })

  it('未知 id → 忽略，不动 draft', () => {
    const mgr = usePersonaDraft('default')
    const before = mgr.draft.id
    mgr.setBase('not-a-persona')
    expect(mgr.draft.id).toBe(before)
  })
})

describe('usePersonaDraft · previewTheme', () => {
  it('palette 改动反映到 previewTheme.tokens', () => {
    const mgr = usePersonaDraft('default')
    mgr.draft.palette.primary = '#abcdef'
    expect(mgr.previewTheme.value.tokens.colors.primary).toBe('#abcdef')
  })
})

describe('usePersonaDraft · 校验', () => {
  it('合法 base → validation.ok=true', () => {
    const mgr = usePersonaDraft('default')
    expect(mgr.validation.value.ok).toBe(true)
  })

  it('palette 写入非 hex → validation.errors 不为空', () => {
    const mgr = usePersonaDraft('default')
    mgr.draft.palette.primary = 'not-a-color'
    expect(mgr.validation.value.ok).toBe(false)
  })
})

describe('usePersonaDraft · exportJson / importJson', () => {
  it('export → import 后 draft 等价', () => {
    const mgr = usePersonaDraft('tech-geek')
    mgr.draft.palette.primary = '#123456'
    const json = mgr.exportJson()
    mgr.reset()
    expect(mgr.draft.palette.primary).not.toBe('#123456')
    const ok = mgr.importJson(json)
    expect(ok).toBe(true)
    expect(mgr.draft.palette.primary).toBe('#123456')
  })

  it('非法 JSON → 返回 false 且不改 draft', () => {
    const mgr = usePersonaDraft('default')
    const before = mgr.draft.palette.primary
    const ok = mgr.importJson('not json')
    expect(ok).toBe(false)
    expect(mgr.draft.palette.primary).toBe(before)
  })
})

describe('usePersonaDraft · baseOptions', () => {
  it('暴露所有公开 persona', () => {
    const mgr = usePersonaDraft('default')
    expect(mgr.baseOptions.length).toBeGreaterThanOrEqual(9)
    expect(mgr.baseOptions.some((o) => o.id === 'tech-geek')).toBe(true)
  })
})
