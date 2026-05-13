/**
 * domain/components-lib/mutations —— "写" 路径的契约（P1）。
 *
 * 覆盖：
 *   - createComponent 合法 markdown:落 storage,返回 entry
 *   - createComponent 未注册 fence:不落 storage,返回 ValidateResult
 *   - updateComponent 改 name 不触发 validate
 *   - updateComponent 改 markdown 触发 validate
 *   - updateComponent id 不存在 → not-found
 *   - removeComponent 直通 storage
 */

import { beforeEach, describe, expect, it } from 'vitest'
import {
  createComponent,
  updateComponent,
  removeComponent,
} from '../../src/domain/components-lib/mutations'
import { listUserComponents } from '../../src/infra/storage/userComponents'

describe('createComponent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('合法 markdown 创建成功,返回 entry', () => {
    const res = createComponent({
      name: '测试',
      markdownSnippet: '::: tip\n内容\n:::\n',
    })
    expect(res.ok).toBe(true)
    if (res.ok) {
      expect(res.entry.name).toBe('测试')
      expect(res.entry.source).toBe('user')
      expect(res.entry.id).toMatch(/^uc_/)
    }
    expect(listUserComponents()).toHaveLength(1)
  })

  it('未注册 fence 不落 storage,返回 validation 失败', () => {
    const res = createComponent({
      name: '坏组件',
      markdownSnippet: '::: my-unknown-thing\n内容\n:::\n',
    })
    expect(res.ok).toBe(false)
    if (!res.ok && res.reason === 'validation') {
      expect(res.result.unknownFences).toEqual(['my-unknown-thing'])
    } else {
      throw new Error(`期望 reason=validation, 实际 ${JSON.stringify(res)}`)
    }
    // 关键:storage 没动
    expect(listUserComponents()).toHaveLength(0)
  })

  it('未注册 variant 也被拦下', () => {
    const res = createComponent({
      name: '坏 variant',
      markdownSnippet: '::: tip variant=ghost\n内容\n:::\n',
    })
    expect(res.ok).toBe(false)
    if (!res.ok && res.reason === 'validation') {
      expect(res.result.unknownVariants).toEqual([
        { container: 'tip', variantKind: 'admonition', variantId: 'ghost' },
      ])
    } else {
      throw new Error('期望 validation 失败')
    }
    expect(listUserComponents()).toHaveLength(0)
  })

  it('codeBlock fence 上的非法 variant 也拦下', () => {
    const res = createComponent({
      name: '坏 codeBlock',
      markdownSnippet: '```typescript variant=fancy\nconst x = 1\n```\n',
    })
    expect(res.ok).toBe(false)
    expect(listUserComponents()).toHaveLength(0)
  })
})

describe('updateComponent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('改 name / description 不跑 validate（即便 storage 里已有"野" markdown 也允许改名）', () => {
    const created = createComponent({
      name: 'A',
      markdownSnippet: '::: tip\n内容\n:::\n',
    })
    if (!created.ok) throw new Error('setup failed')
    const res = updateComponent(created.entry.id, { name: 'B', description: 'desc' })
    expect(res.ok).toBe(true)
    if (res.ok) {
      expect(res.entry.name).toBe('B')
      expect(res.entry.description).toBe('desc')
    }
  })

  it('改 markdown 触发 validate,非法时不落 storage', () => {
    const created = createComponent({
      name: 'A',
      markdownSnippet: '::: tip\n内容\n:::\n',
    })
    if (!created.ok) throw new Error('setup failed')
    const res = updateComponent(created.entry.id, {
      markdownSnippet: '::: my-unknown\nbad\n:::\n',
    })
    expect(res.ok).toBe(false)
    if (!res.ok && res.reason === 'validation') {
      expect(res.result.unknownFences).toEqual(['my-unknown'])
    }
    // storage 里 markdown 没改
    const list = listUserComponents()
    expect(list[0].markdownSnippet).toBe('::: tip\n内容\n:::\n')
  })

  it('改 markdown 合法则成功落库', () => {
    const created = createComponent({
      name: 'A',
      markdownSnippet: '::: tip\n内容\n:::\n',
    })
    if (!created.ok) throw new Error('setup failed')
    const res = updateComponent(created.entry.id, {
      markdownSnippet: '::: warning\n新内容\n:::\n',
    })
    expect(res.ok).toBe(true)
    if (res.ok) {
      expect(res.entry.markdownSnippet).toBe('::: warning\n新内容\n:::\n')
    }
  })

  it('id 不存在返回 not-found,不抛', () => {
    const res = updateComponent('uc_does_not_exist', { name: 'X' })
    expect(res.ok).toBe(false)
    if (!res.ok) expect(res.reason).toBe('not-found')
  })
})

describe('removeComponent', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('删除后列表为空', () => {
    const r = createComponent({ name: 'X', markdownSnippet: '::: tip\n内容\n:::\n' })
    if (!r.ok) throw new Error('setup failed')
    removeComponent(r.entry.id)
    expect(listUserComponents()).toHaveLength(0)
  })

  it('不存在的 id 是 no-op,不抛', () => {
    expect(() => removeComponent('uc_does_not_exist')).not.toThrow()
  })
})
