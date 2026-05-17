/**
 * userVariants 仓 + transfer 契约。
 *
 * tests/setup.ts 的 InMemoryStorage shim 让 localStorage 在 node 环境也可用，
 * 因此本 spec 跑 node 即可（无需 jsdom），与 _kv.spec / drafts.spec 同列。
 *
 * 覆盖：
 *   - CRUD 基本路径（create/list/get/update/delete）三档 level 各打一遍
 *   - id / createdAt / updatedAt 由仓接管
 *   - readList 守卫：脏数据 / 非数组 / 缺字段 全部过滤
 *   - listUserVariants 按 updatedAt 降序
 *   - update 修不可变字段（id/level/base）被忽略，updatedAt 自动刷
 *   - delete 命中返回 true，未命中返回 false
 *   - quota 满时 writeList 返回 false，console.warn
 *   - transfer round-trip：导出再导入回空仓 → 数据等价
 *   - import 跳过 id 冲突；裸数组（无 version 包装）也能吃下
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createUserVariant,
  deleteUserVariant,
  getUserVariant,
  listUserVariants,
  readList,
  updateUserVariant,
  writeList,
} from '../../src/infra/storage/userVariants.repo'
import {
  exportUserVariantsJSON,
  importUserVariantsJSON,
} from '../../src/infra/storage/userVariants.transfer'
import type { UserVariant } from '../../src/core/variants/userVariant'

const originalSetItem = localStorage.setItem.bind(localStorage)

beforeEach(() => {
  localStorage.clear()
  vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
  Object.defineProperty(localStorage, 'setItem', {
    value: originalSetItem,
    configurable: true,
  })
})

function simulateQuotaExceeded(): void {
  Object.defineProperty(localStorage, 'setItem', {
    value: () => {
      const err = new Error('QuotaExceededError') as Error & { name: string }
      err.name = 'QuotaExceededError'
      throw err
    },
    configurable: true,
  })
}

describe('createUserVariant · 三档 level', () => {
  it('tokens 档：补 id / createdAt / updatedAt，落盘后可 get', () => {
    const v = createUserVariant({
      level: 'tokens',
      name: '橙调 accent-bar',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { accent: '#ff5a00' },
    })
    expect(v.id).toMatch(/^uv_/)
    expect(v.createdAt).toBe(v.updatedAt)
    expect(v.createdAt).toBeGreaterThan(0)
    expect(getUserVariant(v.id)).toEqual(v)
  })

  it('patch 档：cssPatch 落盘', () => {
    const v = createUserVariant({
      level: 'patch',
      name: '加重 pull-quote',
      base: { kind: 'pullQuote', variantId: 'giant-mark' },
      cssPatch: { titleCSS: 'font-weight:800;letter-spacing:1px' },
    })
    const got = getUserVariant(v.id)
    expect(got?.level).toBe('patch')
    if (got?.level === 'patch') {
      expect(got.cssPatch.titleCSS).toBe('font-weight:800;letter-spacing:1px')
    }
  })

  it('custom 档：base=null，template+css 落盘', () => {
    const v = createUserVariant({
      level: 'custom',
      name: '裸壳',
      base: null,
      template: '<section class="x"><h3>{{title}}</h3><div>{{body}}</div></section>',
      css: { wrapperCSS: 'padding:14px' },
    })
    expect(getUserVariant(v.id)).toEqual(v)
  })
})

describe('listUserVariants · 排序', () => {
  it('按 updatedAt 降序——最近改的在前', async () => {
    const a = createUserVariant({
      level: 'tokens',
      name: 'A',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: {},
    })
    await new Promise((r) => setTimeout(r, 2))
    createUserVariant({
      level: 'tokens',
      name: 'B',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: {},
    })
    expect(listUserVariants().map((v) => v.name)).toEqual(['B', 'A'])
    // 更新 a 让它升到顶部
    await new Promise((r) => setTimeout(r, 2))
    updateUserVariant(a.id, { name: 'A2' })
    expect(listUserVariants().map((v) => v.name)).toEqual(['A2', 'B'])
  })
})

describe('updateUserVariant · 字段白名单 + updatedAt 自动刷', () => {
  it('刷 name / description；updatedAt 增大', async () => {
    const v = createUserVariant({
      level: 'tokens',
      name: '原名',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { c: '#000' },
    })
    await new Promise((r) => setTimeout(r, 2))
    const next = updateUserVariant(v.id, { name: '新名', description: '说明' })
    expect(next?.name).toBe('新名')
    expect(next?.description).toBe('说明')
    expect(next?.updatedAt).toBeGreaterThan(v.updatedAt)
    expect(next?.createdAt).toBe(v.createdAt)
    expect(next?.id).toBe(v.id)
  })

  it('改 tokens（tokens 档） / cssPatch（patch 档） / template+css（custom 档）', () => {
    const t = createUserVariant({
      level: 'tokens',
      name: 't',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { a: '1' },
    })
    const t2 = updateUserVariant(t.id, { tokens: { a: '2', b: '3' } })
    expect(t2?.level === 'tokens' && t2.tokens).toEqual({ a: '2', b: '3' })

    const p = createUserVariant({
      level: 'patch',
      name: 'p',
      base: { kind: 'quote', variantId: 'classic' },
      cssPatch: { wrapperCSS: 'a:1' },
    })
    const p2 = updateUserVariant(p.id, { cssPatch: { titleCSS: 'b:2' } })
    expect(p2?.level === 'patch' && p2.cssPatch).toEqual({ titleCSS: 'b:2' })

    const c = createUserVariant({
      level: 'custom',
      name: 'c',
      base: null,
      template: '<x>{{body}}</x>',
      css: { wrapperCSS: 'p:1' },
    })
    const c2 = updateUserVariant(c.id, {
      template: '<y>{{body}}</y>',
      css: { wrapperCSS: 'p:2', bodyCSS: 'q:3' },
    })
    expect(c2?.level === 'custom' && c2.template).toBe('<y>{{body}}</y>')
    expect(c2?.level === 'custom' && c2.css.wrapperCSS).toBe('p:2')
    expect(c2?.level === 'custom' && c2.css.bodyCSS).toBe('q:3')
  })

  it('跨档的 patch 字段被静默忽略（对 tokens 记录传 cssPatch 不生效）', () => {
    const v = createUserVariant({
      level: 'tokens',
      name: 't',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { a: '1' },
    })
    // 强转突破 TS 检查模拟运行时脏输入
    const next = updateUserVariant(v.id, {
      cssPatch: { wrapperCSS: 'x:1' },
    } as unknown as Parameters<typeof updateUserVariant>[1])
    expect(next?.level).toBe('tokens')
    expect((next as unknown as Record<string, unknown>).cssPatch).toBeUndefined()
  })

  it('id 未命中返回 undefined，不写盘', () => {
    expect(updateUserVariant('uv_nonexistent', { name: 'x' })).toBeUndefined()
    expect(readList()).toEqual([])
  })
})

describe('deleteUserVariant · 命中语义', () => {
  it('命中返回 true，列表少一条', () => {
    const v = createUserVariant({
      level: 'tokens',
      name: 'x',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: {},
    })
    expect(deleteUserVariant(v.id)).toBe(true)
    expect(getUserVariant(v.id)).toBeUndefined()
  })

  it('未命中返回 false', () => {
    expect(deleteUserVariant('uv_nope')).toBe(false)
  })
})

describe('readList · 脏数据过滤', () => {
  it('整体非数组 → []', () => {
    localStorage.setItem('wechat-typeset:user-variants', '{"not":"array"}')
    expect(readList()).toEqual([])
  })

  it('parse 失败 → []', () => {
    localStorage.setItem('wechat-typeset:user-variants', '{{{')
    expect(readList()).toEqual([])
  })

  it('单条缺必备字段被丢弃，其余保留', () => {
    const good = {
      id: 'uv_good',
      name: 'g',
      level: 'tokens',
      createdAt: 1,
      updatedAt: 1,
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: {},
    }
    const dirty = [
      good,
      { id: 'uv_no_level', name: 'x', createdAt: 1, updatedAt: 1 }, // 缺 level
      { id: 'uv_bad_level', name: 'x', level: 'magic', createdAt: 1, updatedAt: 1, base: null }, // level 非法
      { id: 'uv_tokens_no_base', name: 'x', level: 'tokens', createdAt: 1, updatedAt: 1, base: null, tokens: {} }, // tokens 档 base 必须有
      { id: 'uv_custom_no_template', name: 'x', level: 'custom', createdAt: 1, updatedAt: 1, base: null, css: { wrapperCSS: '' } }, // custom 缺 template
      'not even an object',
      null,
    ]
    localStorage.setItem('wechat-typeset:user-variants', JSON.stringify(dirty))
    const got = readList()
    expect(got).toHaveLength(1)
    expect(got[0].id).toBe('uv_good')
  })
})

describe('writeList · quota 失败', () => {
  it('writeList 在 quota 满时返回 false，触发 warn', () => {
    simulateQuotaExceeded()
    const ok = writeList([
      {
        id: 'uv_q',
        name: 'q',
        level: 'tokens',
        createdAt: 1,
        updatedAt: 1,
        base: { kind: 'admonition', variantId: 'accent-bar' },
        tokens: {},
      } as UserVariant,
    ])
    expect(ok).toBe(false)
    expect(console.warn).toHaveBeenCalled()
  })
})

describe('transfer · round-trip', () => {
  it('export → import 回空仓，数据等价', () => {
    const a = createUserVariant({
      level: 'tokens',
      name: 'a',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: { c: '#f00' },
    })
    const b = createUserVariant({
      level: 'custom',
      name: 'b',
      base: null,
      template: '<x>{{body}}</x>',
      css: { wrapperCSS: 'p:1', titleCSS: '' },
    })
    const json = exportUserVariantsJSON()
    // 清空再导入
    localStorage.clear()
    expect(readList()).toEqual([])
    const added = importUserVariantsJSON(json)
    expect(added).toBe(2)
    const after = readList().sort((x, y) => x.name.localeCompare(y.name))
    expect(after).toEqual([a, b].sort((x, y) => x.name.localeCompare(y.name)))
  })

  it('import 跳过 id 冲突（不覆盖现有）', () => {
    const a = createUserVariant({
      level: 'tokens',
      name: '原版',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: {},
    })
    const fakeJson = JSON.stringify({
      version: 1,
      userVariants: [{ ...a, name: '冲突覆盖' }],
    })
    expect(importUserVariantsJSON(fakeJson)).toBe(0)
    expect(getUserVariant(a.id)?.name).toBe('原版')
  })

  it('import 接受裸数组（无 version 包装）', () => {
    const bare = JSON.stringify([
      {
        id: 'uv_bare',
        name: 'bare',
        level: 'tokens',
        createdAt: 1,
        updatedAt: 1,
        base: { kind: 'admonition', variantId: 'accent-bar' },
        tokens: {},
      },
    ])
    expect(importUserVariantsJSON(bare)).toBe(1)
    expect(getUserVariant('uv_bare')?.name).toBe('bare')
  })

  it('import 解析失败 / 非数组 → 0，不污染现有', () => {
    createUserVariant({
      level: 'tokens',
      name: 'kept',
      base: { kind: 'admonition', variantId: 'accent-bar' },
      tokens: {},
    })
    expect(importUserVariantsJSON('garbage{')).toBe(0)
    expect(importUserVariantsJSON('{"version":1,"userVariants":"oops"}')).toBe(0)
    expect(listUserVariants()).toHaveLength(1)
  })

  it('import 过滤脏条目，合法部分仍入库', () => {
    const payload = JSON.stringify({
      version: 1,
      userVariants: [
        {
          id: 'uv_ok',
          name: 'ok',
          level: 'tokens',
          createdAt: 1,
          updatedAt: 1,
          base: { kind: 'admonition', variantId: 'accent-bar' },
          tokens: {},
        },
        { id: 'uv_bad', name: 'bad', level: 'tokens' }, // 缺一堆字段
      ],
    })
    expect(importUserVariantsJSON(payload)).toBe(1)
    expect(getUserVariant('uv_ok')).toBeDefined()
    expect(getUserVariant('uv_bad')).toBeUndefined()
  })
})
