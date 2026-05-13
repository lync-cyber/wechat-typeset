/**
 * validateSnippet —— 组件 markdown 校验契约。
 *
 * 覆盖:
 *   - 合法 markdown 返回 ok=true 且空 issues 数组
 *   - 未注册 fence 列在 unknownFences 且 issues 含行号
 *   - 未注册 variant 列在 unknownVariants 且 issues 含 variantKind + 行号
 *   - 嵌套(代码块内的 ::: 不当容器解析)
 *   - codeBlock fence 上的 variant= 也被校验
 *   - 同一未知 fence / variant 在 unknown* 数组里去重(issues 仍每行一条)
 */

import { describe, expect, it } from 'vitest'
import { validateSnippet } from '../../src/domain/components-lib/validate'

describe('validateSnippet · 合法路径', () => {
  it('合法的 tip 容器返回 ok=true', () => {
    const md = '::: tip 小贴士\n这是正文。\n:::\n'
    const r = validateSnippet(md)
    expect(r.ok).toBe(true)
    expect(r.issues).toEqual([])
  })

  it('合法 fence 上的合法 variant=覆盖通过', () => {
    const md = '::: tip variant=terminal\n内容\n:::\n'
    const r = validateSnippet(md)
    expect(r.ok).toBe(true)
  })

  it('合法 compare 嵌套 pros/cons 通过', () => {
    const md =
      ':::: compare\n' +
      '::: pros 优点\n- A\n:::\n' +
      '::: cons 缺点\n- B\n:::\n' +
      '::::\n'
    const r = validateSnippet(md)
    expect(r.ok).toBe(true)
  })

  it('合法 codeBlock fence 含 variant= 通过', () => {
    const md = '```typescript variant=header-bar\nconst x = 1\n```\n'
    const r = validateSnippet(md)
    expect(r.ok).toBe(true)
  })

  it('普通 codeBlock fence 不含 variant 通过', () => {
    const md = '```javascript\nconst x = 1\n```\n'
    const r = validateSnippet(md)
    expect(r.ok).toBe(true)
  })
})

describe('validateSnippet · 未注册 fence', () => {
  it('未知容器名进 unknownFences 和 issues', () => {
    const md = '::: episode-card\n标题\n:::\n'
    const r = validateSnippet(md)
    expect(r.ok).toBe(false)
    expect(r.unknownFences).toEqual(['episode-card'])
    expect(r.issues).toHaveLength(1)
    expect(r.issues[0]).toMatchObject({
      kind: 'unknown-fence',
      name: 'episode-card',
      line: 1,
    })
  })

  it('多个未知 fence 在 unknownFences 中各算一项,issues 含行号', () => {
    // 注意:'bar' 是 vocabulary 里的有效容器(bar-chart 子容器),需用真未知名
    const md = [
      '::: my-foo',
      ':::',
      '',
      ':::: my-baz',
      '::::',
      '',
      '::: my-foo',
      ':::',
    ].join('\n')
    const r = validateSnippet(md)
    expect(r.ok).toBe(false)
    // unknownFences 去重:my-foo 出现两次合一
    expect(r.unknownFences.sort()).toEqual(['my-baz', 'my-foo'])
    // issues 不去重,每行一条
    const lines = r.issues.map((i) => i.line)
    expect(lines).toEqual([1, 4, 7])
  })
})

describe('validateSnippet · 未注册 variant', () => {
  it('admonition fence 上的非法 variant 进 unknownVariants', () => {
    const md = '::: tip variant=mystyle\n内容\n:::\n'
    const r = validateSnippet(md)
    expect(r.ok).toBe(false)
    expect(r.unknownVariants).toEqual([
      { container: 'tip', variantKind: 'admonition', variantId: 'mystyle' },
    ])
    expect(r.issues).toHaveLength(1)
    expect(r.issues[0]).toMatchObject({
      kind: 'unknown-variant',
      container: 'tip',
      variantKind: 'admonition',
      variantId: 'mystyle',
      line: 1,
    })
  })

  it('compare 外层 4 冒号的 variant 也被校验', () => {
    const md = ':::: compare variant=nonexistent\n::::\n'
    const r = validateSnippet(md)
    expect(r.ok).toBe(false)
    expect(r.unknownVariants[0]).toMatchObject({
      container: 'compare',
      variantKind: 'compare',
      variantId: 'nonexistent',
    })
  })

  it('codeBlock fence 上的非法 variant 进 unknownVariants(container=code)', () => {
    const md = '```typescript variant=fancy\nconst x = 1\n```\n'
    const r = validateSnippet(md)
    expect(r.ok).toBe(false)
    expect(r.unknownVariants).toEqual([
      { container: 'code', variantKind: 'codeBlock', variantId: 'fancy' },
    ])
  })

  it('同一未知 variant 多次出现:unknownVariants 去重,issues 不去重', () => {
    const md = [
      '::: tip variant=ghost',
      ':::',
      '',
      '::: tip variant=ghost',
      ':::',
    ].join('\n')
    const r = validateSnippet(md)
    expect(r.unknownVariants).toHaveLength(1)
    expect(r.issues).toHaveLength(2)
  })
})

describe('validateSnippet · 嵌套与状态', () => {
  it('代码块内出现的 ::: foo 不当容器解析', () => {
    const md = ['```', '::: foo', '内容', ':::', '```', ''].join('\n')
    const r = validateSnippet(md)
    expect(r.ok).toBe(true)
    expect(r.unknownFences).toEqual([])
  })

  it('代码块外的容器和代码块内的字符串混合,只校验外层', () => {
    const md = [
      '::: tip',
      '```',
      '::: unknown',
      '```',
      ':::',
    ].join('\n')
    const r = validateSnippet(md)
    // 代码块内的 ::: unknown 是 markdown 文本,不算未注册 fence
    expect(r.ok).toBe(true)
  })

  it('行首非冒号的疑似 fence 文本不当容器(行内 ::: 不命中)', () => {
    const md = '段落里随便提到 ::: foo 不应被解析为 fence\n'
    const r = validateSnippet(md)
    expect(r.ok).toBe(true)
  })
})

describe('validateSnippet · 边界与空输入', () => {
  it('空字符串返回 ok=true', () => {
    const r = validateSnippet('')
    expect(r.ok).toBe(true)
    expect(r.issues).toEqual([])
  })

  it('只有纯文本返回 ok=true', () => {
    const r = validateSnippet('这只是一段中文,没有任何 fence。\n')
    expect(r.ok).toBe(true)
  })

  it('已知容器但 variantKind=null 时,attrs.variant 不报错(没有 variant 可选)', () => {
    // highlight 容器没有 variantKind:它不接 variant=,即便用户写了也不应报错
    // (validate.ts 的契约是 "未在 VARIANT_IDS 内的 id 报错";没有对应 kind 时跳过)
    const md = '::: highlight variant=anything\n内容\n:::\n'
    const r = validateSnippet(md)
    expect(r.ok).toBe(true)
  })
})
