/**
 * clipboard/mpInsertHints.ts 契约
 *
 * 锁：
 *   - data-wx-mp-kind="voice|video" 节点前注入对应 `<!-- mpvoice/mpvideo ... -->`
 *   - 无 mp 节点 → 原样返回，count = 0
 *   - 幂等：emitted 标记位防重复注入
 *   - stripForbiddenAttrs 不剥 data-wx-mp-* —— 否则锚点丢失整条链路就废
 */

import { describe, it, expect } from 'vitest'
import { insertMpHints, MP_HINT_TEMPLATES } from '../../src/infra/clipboard/mpInsertHints'
import { stripForbiddenAttrs } from '../../src/core/pipeline/platforms/wechat'

describe('insertMpHints · voice', () => {
  it('完整 fileid + name → 注入注释串', () => {
    const html =
      `<section class="container-voice-card" data-wx-mp-kind="voice" data-wx-mp-fileid="MzA1Mg" data-wx-mp-name="开场白">x</section>`
    const r = insertMpHints(html)
    expect(r.count).toBe(1)
    expect(r.html).toContain('<!--')
    expect(r.html).toContain('mpvoice')
    expect(r.html).toContain('voice_encode_fileid="MzA1Mg"')
    expect(r.html).toContain('name="开场白"')
  })

  it('无 fileid 时省略该字段，仍然注释占位', () => {
    const html = `<section data-wx-mp-kind="voice" data-wx-mp-name="x">y</section>`
    const r = insertMpHints(html)
    expect(r.count).toBe(1)
    expect(r.html).toContain('mpvoice')
    expect(r.html).not.toContain('voice_encode_fileid')
  })
})

describe('insertMpHints · video', () => {
  it('qqvid 走 vid 字段', () => {
    const html =
      `<section data-wx-mp-kind="video" data-wx-mp-vid="x123" data-wx-mp-name="片头">y</section>`
    const r = insertMpHints(html)
    expect(r.count).toBe(1)
    expect(r.html).toContain('mpvideo')
    expect(r.html).toContain('vid="x123"')
  })
})

describe('insertMpHints · 幂等', () => {
  it('已有 emitted 标记不重复注入', () => {
    const html =
      `<section data-wx-mp-kind="voice" data-wx-mp-hint="emitted" data-wx-mp-fileid="x">y</section>`
    const r = insertMpHints(html)
    expect(r.count).toBe(0)
    expect(r.html).toBe(html)
  })

  it('二次调用 → count = 0（第一次已打 emitted）', () => {
    const html = `<section data-wx-mp-kind="voice" data-wx-mp-fileid="x">y</section>`
    const once = insertMpHints(html)
    expect(once.count).toBe(1)
    const twice = insertMpHints(once.html)
    expect(twice.count).toBe(0)
  })
})

describe('insertMpHints · 无 mp 节点', () => {
  it('普通 HTML 原样返回', () => {
    const html = `<p>hello</p>`
    const r = insertMpHints(html)
    expect(r.count).toBe(0)
    expect(r.html).toBe(html)
  })

  it('空字符串 → 原样', () => {
    expect(insertMpHints('')).toEqual({ html: '', count: 0 })
  })
})

describe('MP_HINT_TEMPLATES', () => {
  it('voice 模板字段顺序：name, fileid', () => {
    const body = MP_HINT_TEMPLATES.voice('FID', '名字')
    expect(body).toContain('mpvoice')
    expect(body.indexOf('name=')).toBeLessThan(body.indexOf('voice_encode_fileid='))
  })

  it('video 模板优先 vid', () => {
    const body = MP_HINT_TEMPLATES.video('VID', null, '标题')
    expect(body).toContain('vid="VID"')
    expect(body).toContain('name="标题"')
  })
})

describe('stripForbiddenAttrs 不剥 data-wx-mp-*', () => {
  // mp 锚点链路：renderer 写 data-wx-mp-* → wxPatch.stripForbiddenAttrs 过 → mpInsertHints 读
  // 中间任何一步剥掉 data-* 都会让注释注入失效；守住这条不变量。
  it('data-wx-mp-kind 与同伴属性原样保留', () => {
    const html =
      `<section data-wx-mp-kind="voice" data-wx-mp-fileid="FID" data-wx-mp-name="x" id="foo">y</section>`
    const out = stripForbiddenAttrs(html)
    expect(out).toContain('data-wx-mp-kind="voice"')
    expect(out).toContain('data-wx-mp-fileid="FID"')
    expect(out).toContain('data-wx-mp-name="x"')
    // 同行验证 id 仍然按规则被剥
    expect(out).not.toContain('id="foo"')
  })
})
