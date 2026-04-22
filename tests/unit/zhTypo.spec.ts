/**
 * 中文排版四规则 · 检测 + 修正契约
 *
 * 断言点：
 *   1. 规则命中 / 不命中的边界条件
 *   2. 保护区（代码、URL、链接、HTML 标签）绝对不改
 *   3. fix 与 scan 结果一致（同一份 Hit 是真源）
 *   4. 多条命中同时应用不互相破坏
 */

import { describe, it, expect } from 'vitest'
import { scanZhTypo, fixZhTypo } from '../../src/pipeline/zhTypo'

describe('scanZhTypo · 规则 1 中英空格', () => {
  it('CJK 后紧邻 ASCII 字母命中', () => {
    const hits = scanZhTypo('你好world')
    expect(hits).toHaveLength(1)
    expect(hits[0].code).toBe('zh-ascii-spacing')
    expect(hits[0].replacement).toBe('好 w')
  })

  it('ASCII 数字后紧邻 CJK 也命中', () => {
    const hits = scanZhTypo('3D电影')
    expect(hits.some((h) => h.code === 'zh-ascii-spacing')).toBe(true)
  })

  it('中英之间已有空格不命中', () => {
    const hits = scanZhTypo('你好 world')
    expect(hits.filter((h) => h.code === 'zh-ascii-spacing')).toHaveLength(0)
  })

  it('连续 ASCII 不命中（不是中英混排）', () => {
    const hits = scanZhTypo('hello world')
    expect(hits).toHaveLength(0)
  })
})

describe('scanZhTypo · 规则 2 全半角标点', () => {
  it('CJK 后的 , . ! ? : ; 均命中', () => {
    const src = '这是,一段.文字!好?是:的;'
    const hits = scanZhTypo(src).filter((h) => h.code === 'zh-halfwidth-punct')
    expect(hits.length).toBe(6)
  })

  it('数字后的半角标点不命中（1,234 / 3.14）', () => {
    const hits = scanZhTypo('1,234.56 是数字')
    expect(hits.filter((h) => h.code === 'zh-halfwidth-punct')).toHaveLength(0)
  })

  it('英文后的半角标点不命中', () => {
    const hits = scanZhTypo('hello, world.')
    expect(hits.filter((h) => h.code === 'zh-halfwidth-punct')).toHaveLength(0)
  })
})

describe('scanZhTypo · 规则 3 直引号', () => {
  it('含 CJK 内容的双引号命中', () => {
    const hits = scanZhTypo('他说 "你好" 我答')
    expect(hits.filter((h) => h.code === 'zh-straight-quote')).toHaveLength(1)
  })

  it('全英文双引号不命中（避免打扰英文段落）', () => {
    const hits = scanZhTypo('He said "hello" loudly')
    expect(hits.filter((h) => h.code === 'zh-straight-quote')).toHaveLength(0)
  })

  it('单引号完全不处理（歧义过大）', () => {
    const hits = scanZhTypo("他说 '你好' 我答")
    expect(hits.filter((h) => h.code === 'zh-straight-quote')).toHaveLength(0)
  })
})

describe('scanZhTypo · 规则 4 省略号 / 破折号', () => {
  it('CJK 旁的三个英文点命中', () => {
    const hits = scanZhTypo('然后...就没有然后了')
    const hit = hits.find((h) => h.code === 'zh-dash-ellipsis')!
    expect(hit.replacement).toBe('\u2026\u2026')
  })

  it('四个以上点也命中（修正为 ……）', () => {
    const hits = scanZhTypo('好吧....真无语')
    const hit = hits.find((h) => h.code === 'zh-dash-ellipsis')!
    expect(hit.replacement).toBe('\u2026\u2026')
  })

  it('英文正文里的 ... 不命中', () => {
    const hits = scanZhTypo('hello...world')
    expect(hits.filter((h) => h.code === 'zh-dash-ellipsis')).toHaveLength(0)
  })

  it('CJK 旁的 -- 命中改为 ——', () => {
    const hits = scanZhTypo('正文--副标题')
    const hit = hits.find((h) => h.code === 'zh-dash-ellipsis')!
    expect(hit.replacement).toBe('\u2014\u2014')
  })

  it('全英文 -- 不命中', () => {
    const hits = scanZhTypo('opt--verbose 参数')
    const pureDash = hits.filter((h) => h.code === 'zh-dash-ellipsis' && h.original === '--')
    // 只在 opt--verbose 里的那个不应命中（两边都是 ASCII）
    expect(pureDash).toHaveLength(0)
  })
})

describe('scanZhTypo · 保护区', () => {
  it('fenced code 内完全不命中', () => {
    const src = '```\n你好world, 三个点...\n```\n'
    expect(scanZhTypo(src)).toHaveLength(0)
  })

  it('inline code 内不命中', () => {
    const src = '说明 `你好world` 如上'
    const hits = scanZhTypo(src)
    // 外部的"说明 `"不算中英空格命中（backtick 是 ASCII punct，不在 A-Za-z0-9 类内）
    expect(hits.filter((h) => h.code === 'zh-ascii-spacing')).toHaveLength(0)
  })

  it('URL 内不命中', () => {
    const src = '见 https://example.com/a,b.c 即可'
    const hits = scanZhTypo(src)
    // URL 里的 "," "." 不该被改
    expect(
      hits.filter((h) => h.code === 'zh-halfwidth-punct' && h.from > src.indexOf('https')),
    ).toHaveLength(0)
  })

  it('markdown 链接的 URL 部分不命中', () => {
    const src = '看 [文档](https://foo.com/a.html) 了解'
    const hits = scanZhTypo(src)
    // URL 里的 . 不该被改
    expect(
      hits.some(
        (h) =>
          h.code === 'zh-halfwidth-punct' &&
          h.from >= src.indexOf('(') &&
          h.from < src.indexOf(')'),
      ),
    ).toBe(false)
  })

  it('HTML 标签内不命中', () => {
    const src = '<a href="https://x.com/a.b">链接</a>'
    const hits = scanZhTypo(src)
    expect(
      hits.filter((h) => h.from >= src.indexOf('<') && h.from < src.indexOf('>') + 1),
    ).toHaveLength(0)
  })

  it('缩进代码块（4 空格）不命中', () => {
    const src = '正文\n\n    你好world,三个点...\n\n'
    const hits = scanZhTypo(src)
    expect(hits).toHaveLength(0)
  })
})

describe('fixZhTypo · 端到端', () => {
  it('空输入原样返回', () => {
    expect(fixZhTypo('')).toBe('')
  })

  it('无命中时原样返回（reference 相等）', () => {
    const src = 'hello world 纯英文\n\n纯中文段落。'
    expect(fixZhTypo(src)).toBe(src)
  })

  it('多条命中一次过：中英空格 + 全角标点 + 省略号', () => {
    const src = '他说world,然后...走了'
    const out = fixZhTypo(src)
    expect(out).toContain('说 world')
    expect(out).toContain('world，然后')
    expect(out).toContain('然后\u2026\u2026')
  })

  it('含 CJK 的直引号变弯引号', () => {
    const out = fixZhTypo('他说 "你好" 我答')
    expect(out).toContain('\u201c你好\u201d')
  })

  it('保护区整段原样保留', () => {
    const src = '前言\n```ts\nconst a = "hi,b...";\n```\n正文world,完'
    const out = fixZhTypo(src)
    expect(out).toContain('const a = "hi,b...";') // 代码块内一字未动
    expect(out).toContain('文 world，完') // 外部被修正
  })

  it('幂等：第二次 fix 不再变化', () => {
    const src = '他说world,然后...走了'
    const once = fixZhTypo(src)
    const twice = fixZhTypo(once)
    expect(twice).toBe(once)
  })
})

describe('scanZhTypo · 排序与偏移', () => {
  it('结果按 from 升序', () => {
    const src = '前world,中...后'
    const hits = scanZhTypo(src)
    for (let i = 1; i < hits.length; i++) {
      expect(hits[i].from).toBeGreaterThanOrEqual(hits[i - 1].from)
    }
  })

  it('original 字段准确切片源文本', () => {
    const src = '说hello'
    const hit = scanZhTypo(src).find((h) => h.code === 'zh-ascii-spacing')!
    expect(src.slice(hit.from, hit.to)).toBe(hit.original)
  })
})
