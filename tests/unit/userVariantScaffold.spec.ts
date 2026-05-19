/**
 * userVariantScaffold —— patch / custom 档默认脚手架契约。
 *
 * 守护：
 *   - patch 脚手架必须通过 lintInlineCSS（作者点保存不被拦）
 *   - custom 脚手架必须通过 lintTemplateHTML（必含 {{body}} 恰好 1 次）
 *   - isXxxDraftEmpty 在全空 / 部分填 / 全填三种状态下判断正确
 */

import { describe, expect, it } from 'vitest'
import {
  defaultPatchScaffold,
  defaultCustomScaffold,
  isPatchDraftEmpty,
  isCustomDraftEmpty,
} from '../../src/ui/components/component-studio/userVariantScaffold'
import { lintInlineCSS, lintTemplateHTML } from '../../src/core/pipeline/lint'

describe('defaultPatchScaffold', () => {
  it('三个 slot 都非空', () => {
    const p = defaultPatchScaffold()
    expect(p.wrapperCSS).not.toBe('')
    expect(p.titleCSS).not.toBe('')
    expect(p.bodyCSS).not.toBe('')
  })

  it('三个 slot 都通过 lintInlineCSS（保存路径不会被拦）', () => {
    const p = defaultPatchScaffold()
    expect(lintInlineCSS(p.wrapperCSS, 'wrapperCSS')).toEqual([])
    expect(lintInlineCSS(p.titleCSS, 'titleCSS')).toEqual([])
    expect(lintInlineCSS(p.bodyCSS, 'bodyCSS')).toEqual([])
  })
})

describe('defaultCustomScaffold', () => {
  it('template 含 {{body}} 恰好 1 次', () => {
    const c = defaultCustomScaffold()
    const matches = c.template.match(/\{\{\s*body\s*\}\}/g)
    expect(matches?.length).toBe(1)
  })

  it('template 通过 lintTemplateHTML 无 error（warning 可有）', () => {
    const c = defaultCustomScaffold()
    const diags = lintTemplateHTML(c.template, 'template')
    const errors = diags.filter((d) => d.severity === 'error')
    expect(errors).toEqual([])
  })

  it('三个 CSS slot 通过 lintInlineCSS', () => {
    const c = defaultCustomScaffold()
    expect(lintInlineCSS(c.wrapperCSS, 'wrapperCSS')).toEqual([])
    expect(lintInlineCSS(c.titleCSS, 'titleCSS')).toEqual([])
    expect(lintInlineCSS(c.bodyCSS, 'bodyCSS')).toEqual([])
  })

  it('template 引用 wrapperCSS / titleCSS / bodyCSS 占位符（保证 CSS 改动能立刻在预览生效）', () => {
    const c = defaultCustomScaffold()
    expect(c.template).toContain('{{wrapperCSS}}')
    expect(c.template).toContain('{{titleCSS}}')
    expect(c.template).toContain('{{bodyCSS}}')
  })
})

describe('isPatchDraftEmpty', () => {
  it('全空时 true', () => {
    expect(isPatchDraftEmpty({ wrapperCSS: '', titleCSS: '', bodyCSS: '' })).toBe(true)
    expect(isPatchDraftEmpty({ wrapperCSS: '  ', titleCSS: '\n', bodyCSS: '\t' })).toBe(true)
  })

  it('任一 slot 非空就 false', () => {
    expect(isPatchDraftEmpty({ wrapperCSS: 'color:red', titleCSS: '', bodyCSS: '' })).toBe(false)
    expect(isPatchDraftEmpty({ wrapperCSS: '', titleCSS: 'color:red', bodyCSS: '' })).toBe(false)
    expect(isPatchDraftEmpty({ wrapperCSS: '', titleCSS: '', bodyCSS: 'color:red' })).toBe(false)
  })
})

describe('isCustomDraftEmpty', () => {
  it('全空时 true', () => {
    expect(
      isCustomDraftEmpty({
        template: '',
        wrapperCSS: '',
        titleCSS: '',
        bodyCSS: '',
        svgSlot: '',
      }),
    ).toBe(true)
  })

  it('任一字段非空就 false', () => {
    const base = { template: '', wrapperCSS: '', titleCSS: '', bodyCSS: '', svgSlot: '' }
    expect(isCustomDraftEmpty({ ...base, template: '<div>{{body}}</div>' })).toBe(false)
    expect(isCustomDraftEmpty({ ...base, svgSlot: '<svg/>' })).toBe(false)
  })
})
