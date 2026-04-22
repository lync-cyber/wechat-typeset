/**
 * diagnose.ts 契约测试
 *
 * 这些断言锁住"作者在编辑器里会看到哪些提示"——规则变动必须同步改此处，
 * 否则 CodeMirror lintSource 的行为就会无声漂移。
 */

import { describe, it, expect } from 'vitest'
import { diagnose } from '../src/pipeline/diagnose'

describe('diagnose · 合法输入', () => {
  it('空文本不产出诊断', () => {
    expect(diagnose('')).toEqual([])
  })

  it('纯正文、无 fence 的 Markdown 不产出诊断', () => {
    const md = '# 标题\n\n一段正文，有 **加粗** 与 ==高亮==。\n- 列表 1\n- 列表 2\n'
    expect(diagnose(md)).toEqual([])
  })

  it('合法 tip 容器不产出诊断', () => {
    const md = '::: tip 小贴士\n内容\n:::\n'
    expect(diagnose(md)).toEqual([])
  })

  it('合法 compare + pros/cons 嵌套不产出诊断', () => {
    const md = ':::: compare\n::: pros 优点\n- a\n:::\n::: cons 缺点\n- b\n:::\n::::\n'
    expect(diagnose(md)).toEqual([])
  })

  it('合法 variant= 覆盖不产出诊断', () => {
    expect(diagnose('::: tip variant=pill-tag 重要\n内容\n:::\n')).toEqual([])
  })
})

describe('diagnose · 未知容器名 (unknown-container)', () => {
  it('拼错的名字报 error，且给相近建议', () => {
    const ds = diagnose('::: note2\n内容\n:::\n')
    expect(ds).toHaveLength(1)
    expect(ds[0].code).toBe('unknown-container')
    expect(ds[0].severity).toBe('error')
    expect(ds[0].message).toContain('note')
  })

  it('完全无关的名字报 error 但不强行给建议', () => {
    const ds = diagnose('::: xyzabc\n:::\n')
    expect(ds[0].code).toBe('unknown-container')
    expect(ds[0].severity).toBe('error')
  })
})

describe('diagnose · fence 长度 (fence-length-wrong)', () => {
  it('compare 写成 ::: 报 fence-length-wrong', () => {
    const ds = diagnose('::: compare\n::: pros\n:::\n::: cons\n:::\n:::\n')
    const lenErr = ds.find((d) => d.code === 'fence-length-wrong')
    expect(lenErr).toBeTruthy()
    expect(lenErr?.message).toContain('4 个冒号')
  })

  it('pros 写成 :::: 报 fence-length-wrong', () => {
    const ds = diagnose(':::: compare\n:::: pros\n::::\n::::\n')
    const lenErr = ds.find((d) => d.code === 'fence-length-wrong' && d.from > 0)
    expect(lenErr).toBeTruthy()
  })
})

describe('diagnose · nested-misplaced', () => {
  it('pros 孤立在 compare 外报错', () => {
    const ds = diagnose('::: pros 优点\n- a\n:::\n')
    expect(ds.some((d) => d.code === 'nested-misplaced')).toBe(true)
  })

  it('cons 孤立在 compare 外报错', () => {
    const ds = diagnose('::: cons 缺点\n:::\n')
    expect(ds.some((d) => d.code === 'nested-misplaced')).toBe(true)
  })
})

describe('diagnose · unknown-variant', () => {
  it('tip variant=未知值 报 warning', () => {
    const ds = diagnose('::: tip variant=no-such-thing\n:::\n')
    const hit = ds.find((d) => d.code === 'unknown-variant')
    expect(hit).toBeTruthy()
    expect(hit?.severity).toBe('warning')
    expect(hit?.message).toContain('accent-bar')
  })

  it('highlight (无 variantKind) 加 variant= 报 info', () => {
    const ds = diagnose('::: highlight variant=foo\n:::\n')
    const hit = ds.find((d) => d.code === 'unknown-variant')
    expect(hit?.severity).toBe('info')
  })

  it('合法 variant 值（带引号）不报', () => {
    expect(diagnose('::: divider variant="wave"\n:::\n')).toEqual([])
  })
})

describe('diagnose · unclosed-fence', () => {
  it('只有开没有关报 error', () => {
    const ds = diagnose('::: tip 标题\n内容没有闭合\n')
    expect(ds.some((d) => d.code === 'unclosed-fence')).toBe(true)
  })

  it('嵌套未闭合也要报', () => {
    const ds = diagnose(':::: compare\n::: pros\n- a\n::::\n')
    expect(ds.some((d) => d.code === 'unclosed-fence' && d.to)).toBe(true)
  })
})

describe('diagnose · yaml-style-attr', () => {
  it('open 行写 `key: v` 形式报 warning', () => {
    const ds = diagnose('::: key-number value: 42\n:::\n')
    const hit = ds.find((d) => d.code === 'yaml-style-attr')
    expect(hit).toBeTruthy()
    expect(hit?.severity).toBe('warning')
  })

  it('标题里含冒号但已有 = 不报 yaml 警告', () => {
    const ds = diagnose('::: tip 标题: 今日 variant=pill-tag\n:::\n')
    const hit = ds.find((d) => d.code === 'yaml-style-attr')
    expect(hit).toBeFalsy()
  })
})

describe('diagnose · 中文排版规则（zhTypo 桥接）', () => {
  it('中英混排缺空格报 info', () => {
    const ds = diagnose('正文world 一段')
    const hit = ds.find((d) => d.code === 'zh-ascii-spacing')
    expect(hit).toBeTruthy()
    expect(hit?.severity).toBe('info')
  })

  it('CJK 后的半角标点报 info', () => {
    const ds = diagnose('是这样,那样.')
    expect(ds.some((d) => d.code === 'zh-halfwidth-punct')).toBe(true)
  })

  it('含 CJK 的直引号报 info', () => {
    const ds = diagnose('他说 "你好"')
    expect(ds.some((d) => d.code === 'zh-straight-quote')).toBe(true)
  })

  it('CJK 旁的 ... 报 info', () => {
    const ds = diagnose('然后...就走了')
    expect(ds.some((d) => d.code === 'zh-dash-ellipsis')).toBe(true)
  })

  it('代码块内的半角噪声不报（保护区）', () => {
    const ds = diagnose('```ts\nconst x = "你好,world"\n```')
    expect(ds.filter((d) => d.code.startsWith('zh-'))).toHaveLength(0)
  })
})

describe('diagnose · list-too-deep', () => {
  it('两级嵌套不报（边界 —— 不应过度打扰作者）', () => {
    const md = '- L1\n  - L2\n'
    const ds = diagnose(md)
    expect(ds.some((d) => d.code === 'list-too-deep')).toBe(false)
  })

  it('三级嵌套（4 空格缩进）报 warning', () => {
    const md = '- L1\n  - L2\n    - L3\n'
    const ds = diagnose(md)
    const hit = ds.find((d) => d.code === 'list-too-deep')
    expect(hit).toBeTruthy()
    expect(hit?.severity).toBe('warning')
    expect(hit?.message).toContain('扁平化')
  })

  it('tab 缩进也能识别（1 tab ≈ 4 spaces）', () => {
    const md = '- L1\n\t- L2 inline tab\n'
    const ds = diagnose(md)
    expect(ds.some((d) => d.code === 'list-too-deep')).toBe(true)
  })

  it('有序列表同样触发', () => {
    const md = '1. L1\n   1. L2\n      1. L3\n'
    const ds = diagnose(md)
    expect(ds.some((d) => d.code === 'list-too-deep')).toBe(true)
  })

  it('offset 覆盖列表标记本身（方便编辑器高亮）', () => {
    const md = '- L1\n  - L2\n    - L3\n'
    const ds = diagnose(md)
    const hit = ds.find((d) => d.code === 'list-too-deep')!
    expect(md.slice(hit.from, hit.to)).toBe('-')
  })
})

describe('diagnose · offset 正确性', () => {
  it('from/to 覆盖名字本身，方便编辑器高亮', () => {
    const md = 'prefix\n\n::: badname\n:::\n'
    const ds = diagnose(md)
    const d = ds.find((x) => x.code === 'unknown-container')!
    expect(md.slice(d.from, d.to)).toBe('badname')
  })

  it('多个诊断按 from 升序返回', () => {
    const ds = diagnose('::: foo\n:::\n::: bar\n:::\n')
    for (let i = 1; i < ds.length; i++) {
      expect(ds[i].from).toBeGreaterThanOrEqual(ds[i - 1].from)
    }
  })
})
