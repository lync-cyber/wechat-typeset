/**
 * wxPatch/inspect.ts 契约测试
 *
 * 计数必须在"已内联、未 patch"的 HTML 上跑；断言覆盖每条 patch 的目标识别与零命中场景。
 */

import { describe, it, expect } from 'vitest'
import { inspectPatchTargets } from '../src/pipeline/wxPatch/inspect'

describe('inspectPatchTargets · 零命中', () => {
  it('空 HTML 返回空 log', () => {
    const log = inspectPatchTargets('')
    expect(log.total).toBe(0)
    expect(log.entries).toEqual([])
  })

  it('空白 HTML 返回空 log', () => {
    expect(inspectPatchTargets('   \n  ').total).toBe(0)
  })

  it('纯干净正文（无 id / 无 position / 无 font-family / 无列表）不产出条目', () => {
    const html = '<p style="color:red">hello</p>'
    const log = inspectPatchTargets(html)
    expect(log.total).toBe(0)
  })
})

describe('inspectPatchTargets · 列表相关', () => {
  it('未包裹的 <ul>/<ol> 计入 patchListWrap', () => {
    const log = inspectPatchTargets('<ul><li>a</li></ul><ol><li>b</li></ol>')
    const hit = log.entries.find((e) => e.label.includes('列表外包'))
    expect(hit?.count).toBe(2)
  })

  it('已有 data-wx-list-wrap 外层的列表不再计数', () => {
    const log = inspectPatchTargets('<section data-wx-list-wrap=""><ul><li>a</li></ul></section>')
    expect(log.entries.find((e) => e.label.includes('列表外包'))).toBeUndefined()
  })

  it('三级嵌套列表命中扁平化计数', () => {
    const html = '<ul><li><ul><li><ul><li>deep</li></ul></li></ul></li></ul>'
    const log = inspectPatchTargets(html)
    const deep = log.entries.find((e) => e.label.includes('扁平化'))
    expect(deep?.count).toBe(1)
  })
})

describe('inspectPatchTargets · 属性剥离', () => {
  it('普通 id 计入 stripForbiddenAttrs', () => {
    const log = inspectPatchTargets('<p id="x"><span id="y">a</span></p>')
    const hit = log.entries.find((e) => e.label.includes('id'))
    expect(hit?.count).toBe(2)
  })

  it('脚注白名单（fnref / fn / footnote）不计入', () => {
    const log = inspectPatchTargets('<a id="fnref1">1</a><li id="fn1">note</li>')
    expect(log.entries.find((e) => e.label.includes('id 属性'))).toBeUndefined()
  })

  it('position / top / z-index 声明计入定位条目', () => {
    const log = inspectPatchTargets('<div style="position: absolute; top: 0; z-index: 9"></div>')
    const hit = log.entries.find((e) => e.label.includes('position'))
    expect(hit?.count).toBe(3)
  })
})

describe('inspectPatchTargets · 标签剥离', () => {
  it('style/script/meta/link 计入 hardTag', () => {
    const log = inspectPatchTargets(
      '<style>p{}</style><script>1</script><meta charset="utf-8"><link>',
    )
    const hit = log.entries.find((e) => e.label.includes('style/script'))
    expect(hit?.count).toBe(4)
  })

  it('白名单 iframe (v.qq.com) 不计入；其他计入', () => {
    const log = inspectPatchTargets(
      '<iframe src="https://v.qq.com/x/a.html"></iframe>' +
        '<iframe src="https://evil.com/x"></iframe>',
    )
    const hit = log.entries.find((e) => e.label.includes('iframe'))
    expect(hit?.count).toBe(1)
  })
})

describe('inspectPatchTargets · 样式剥离', () => {
  it('inline font-family 逐声明计数', () => {
    const log = inspectPatchTargets(
      '<p style="font-family: serif">a</p><span style="font-family: monospace">b</span>',
    )
    const hit = log.entries.find((e) => e.label.includes('font-family'))
    expect(hit?.count).toBe(2)
  })

  it('display:flex 计入降级；data-wx-keep-flex 例外', () => {
    const log = inspectPatchTargets(
      '<div style="display: flex"></div>' +
        '<div data-wx-keep-flex style="display: flex"></div>',
    )
    const hit = log.entries.find((e) => e.label.includes('display:flex'))
    expect(hit?.count).toBe(1)
  })

  it('SVG 子树的 id 计入 svgId 而非普通 stripId', () => {
    const log = inspectPatchTargets('<svg id="s"><g id="g"/></svg>')
    const svgId = log.entries.find((e) => e.label.includes('SVG'))
    expect(svgId?.count).toBe(2)
    // 不该把 SVG 子树 id 重复计到普通 id 条目
    expect(log.entries.find((e) => e.label.includes('id 属性'))).toBeUndefined()
  })
})

describe('inspectPatchTargets · total 与 entries 一致', () => {
  it('total === entries[i].count 之和', () => {
    const html =
      '<p id="a"><span id="b">x</span></p>' +
      '<ul><li>a</li></ul>' +
      '<div style="position: absolute; font-family: serif; display: flex"></div>'
    const log = inspectPatchTargets(html)
    const sum = log.entries.reduce((s, e) => s + e.count, 0)
    expect(sum).toBe(log.total)
    expect(log.total).toBeGreaterThan(0)
  })
})
