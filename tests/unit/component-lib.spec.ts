/**
 * 组件库 registry 基础契约
 *
 * 覆盖：
 *   - 每个 variant 都有 ≥1 条预设
 *   - 所有 markdownSnippet 能被 pipeline 渲染出对应容器 class
 *   - 缩略图是有效 SVG 字符串（viewBox 0 0 75 75）
 *   - 预设 id 唯一
 *   - localStorage CRUD 正常
 */

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { BUILTIN_COMPONENTS, findPresetByVariant } from '../../src/domain/components-lib'
import { VARIANT_IDS } from '../../src/core/themes/types'
import { render } from '../../src/core/pipeline'
import { themeRegistry } from '../../src/core/themes'
const defaultTheme = themeRegistry.default
import { __setCompatSilentForTest } from '../../src/core/pipeline/containers/_shared/themeCompatGuard'
import {
  listUserComponents,
  createUserComponent,
  deleteUserComponent,
  importUserComponentsJSON,
  exportUserComponentsJSON,
} from '../../src/infra/storage/userComponents'

describe('BUILTIN_COMPONENTS', () => {
  // BUILTIN_COMPONENTS 覆盖全 variant，markdownSnippet 渲染会穿越 themeCompat
  // fallback；静音 warn 避免日志噪声
  beforeAll(() => __setCompatSilentForTest(true))
  afterAll(() => __setCompatSilentForTest(false))

  it('每个 variant 都有至少一条预设覆盖', () => {
    // 所有 VARIANT_IDS 内的 id 都必须在 BUILTIN_COMPONENTS 里有 ≥1 条 snippet，
    // 作者能从面板单独插入（codeBlock 通过 fence info 的 variant= 覆盖）。
    for (const [kind, ids] of Object.entries(VARIANT_IDS)) {
      for (const id of ids) {
        const found = findPresetByVariant(kind as keyof typeof VARIANT_IDS, id)
        expect(found, `${kind}:${id} 缺预设`).toBeTruthy()
      }
    }
  })

  it('id 全局唯一', () => {
    const ids = BUILTIN_COMPONENTS.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('缩略图是 75×75 SVG', () => {
    for (const c of BUILTIN_COMPONENTS) {
      expect(c.thumbnailSvg).toMatch(/<svg[^>]*viewBox="0 0 75 75"/)
      expect(c.thumbnailSvg).not.toMatch(/\sid=/)
    }
  })

  it('markdownSnippet 能被 pipeline 正确渲染', () => {
    for (const c of BUILTIN_COMPONENTS) {
      const { html } = render({ md: c.markdownSnippet, theme: defaultTheme })
      // 自由组件 video-card-qq：直接 iframe 不走 container
      if (c.id === 'free-video-card-qq') {
        expect(html).toMatch(/<iframe/)
        continue
      }
      // codeBlock snippets（P0 引入）：渲染产出 <pre><code>；header-bar 额外有 wx-code-block wrapper
      if (c.kind === 'codeBlock') {
        expect(html, `${c.id} 缺 <pre><code>`).toMatch(/<pre[^>]*>[\s\S]*<code[^>]*>/)
        if (c.variantId === 'header-bar') {
          expect(html, `${c.id} 缺 header-bar wrapper`).toMatch(/wx-code-block--header-bar/)
        }
        continue
      }
      // 其余容器：产出 container-XXX class
      expect(html, `${c.id} 渲染缺容器`).toMatch(/class="container-/)
    }
  })
})

describe('userComponents 存储', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('create / list / delete', () => {
    expect(listUserComponents()).toHaveLength(0)
    const uc = createUserComponent({
      name: '测试组件',
      markdownSnippet: '::: tip\n内容\n:::\n',
    })
    expect(listUserComponents()).toHaveLength(1)
    expect(listUserComponents()[0].id).toBe(uc.id)
    deleteUserComponent(uc.id)
    expect(listUserComponents()).toHaveLength(0)
  })

  it('import/export 往返', () => {
    createUserComponent({
      name: 'A',
      markdownSnippet: '::: tip\nA\n:::\n',
    })
    const json = exportUserComponentsJSON()
    localStorage.clear()
    const n = importUserComponentsJSON(json)
    expect(n).toBe(1)
    expect(listUserComponents()).toHaveLength(1)
  })

  it('非法 JSON 不抛异常', () => {
    expect(importUserComponentsJSON('{not-json}')).toBe(0)
    expect(importUserComponentsJSON('null')).toBe(0)
    expect(importUserComponentsJSON('[{"broken":true}]')).toBe(0)
  })
})
