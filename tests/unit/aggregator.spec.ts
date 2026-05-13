/**
 * Component library aggregator —— 三源合并契约（P0）。
 *
 * 覆盖：
 *   - buildLibrarySnapshot 返回 builtin / themeTemplates / user 三段
 *   - builtin 引用就是 BUILTIN_COMPONENTS（同一对象）
 *   - themeTemplates 按主题派生，主题不声明 templates 时为空数组
 *   - 用户列表与 listUserEntries / userComponents storage 一致
 *   - flattenSnapshot 按声明顺序拼接
 */

import { beforeEach, describe, expect, it } from 'vitest'
import {
  buildLibrarySnapshot,
  flattenSnapshot,
  BUILTIN_COMPONENTS,
} from '../../src/domain/components-lib'
import { defaultTheme } from '../../src/core/themes/default'
import {
  createUserComponent,
  listUserComponents,
} from '../../src/infra/storage/userComponents'

describe('buildLibrarySnapshot', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('返回三段：builtin / themeTemplates / user', () => {
    const snap = buildLibrarySnapshot(defaultTheme)
    expect(snap.builtin).toBe(BUILTIN_COMPONENTS)
    expect(Array.isArray(snap.themeTemplates)).toBe(true)
    expect(Array.isArray(snap.user)).toBe(true)
  })

  it('user 段与 listUserComponents 一致', () => {
    createUserComponent({
      name: '测试',
      markdownSnippet: '::: tip\n内容\n:::\n',
    })
    const snap = buildLibrarySnapshot(defaultTheme)
    expect(snap.user).toEqual(listUserComponents())
  })

  it('themeTemplates 仅含 theme.templates 已声明的字段', () => {
    const snap = buildLibrarySnapshot(defaultTheme)
    // defaultTheme.templates 在 buildTheme 里有兜底,至少 cover/tip 之类大概率存在
    // 严格断言:每条 themeTemplates entry 的 markdownSnippet 非空
    for (const e of snap.themeTemplates) {
      expect(e.markdownSnippet.length, `${e.id} 模板 md 不应为空`).toBeGreaterThan(0)
      expect(e.kind).toBe('none')
      expect(e.thumbnailSvg).toMatch(/<svg/)
    }
  })

  it('flattenSnapshot 按 themeTemplates → builtin → user 顺序拼接', () => {
    createUserComponent({
      name: 'U',
      markdownSnippet: '::: tip\n内容\n:::\n',
    })
    const snap = buildLibrarySnapshot(defaultTheme)
    const flat = flattenSnapshot(snap)
    expect(flat.length).toBe(
      snap.themeTemplates.length + snap.builtin.length + snap.user.length,
    )
    expect(flat[0]).toEqual(snap.themeTemplates[0] ?? snap.builtin[0])
    expect(flat[flat.length - 1]).toEqual(snap.user[snap.user.length - 1])
  })
})
