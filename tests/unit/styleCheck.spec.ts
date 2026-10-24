import { describe, expect, it } from 'vitest'
import { checkStyle } from '../../src/domain/publish/styleCheck'
import { DEFAULT_WRITING_STYLE, type WritingStyleRules } from '../../src/domain/publish/writingStyles'

function style(rules: Partial<WritingStyleRules> = {}) {
  const result = structuredClone(DEFAULT_WRITING_STYLE)
  result.rules = { ...result.rules, minWords: 0, maxWords: 20000, minImages: 0, maxImages: 30, ...rules }
  return result
}

describe('套话', () => {
  it('提示真实正文命中并定位到含 frontmatter 的源文件行号', () => {
    const issues = checkStyle('---\ntitle: 不难发现\n---\n# 标题\n\n这件事不难发现。', style())
    expect(issues.filter((item) => item.id.startsWith('style-phrase'))).toEqual([
      expect.objectContaining({ line: 6, status: 'warn', message: expect.stringContaining('不难发现') }),
    ])
  })

  it('词表按字面匹配，不执行正则；代码和引用链接 URL 不参与', () => {
    const source = '```md\na+b 与不难发现\n```\n\n`不难发现`，[原文](https://example.com/不难发现)。\n\n应检查 a+b。'
    const issues = checkStyle(source, style({ phrases: ['a+b', '(a+)+$', '不难发现'] }))
    expect(issues.filter((item) => item.id.startsWith('style-phrase'))).toHaveLength(1)
    expect(issues.find((item) => item.id.startsWith('style-phrase'))?.line).toBe(7)
  })
})

describe('同句句式', () => {
  it('一次“不是……而是……”也显示 info，超过容忍度显示 warn', () => {
    const one = checkStyle('不是 A，而是 B。', style())
    expect(one.find((item) => item.id === 'style-pattern-0')).toMatchObject({ line: 1, status: 'info' })
    const twice = checkStyle('不是 A，而是 B。\n\n不是 C，而是 D。', style())
    expect(twice.find((item) => item.id === 'style-pattern-0')).toMatchObject({ line: 1, status: 'warn' })
  })

  it('不跨句或段落连接，省略号之外的正则符号视为普通文字', () => {
    const issues = checkStyle('不是 A。下一句而是 B。\n\n不是 C\n\n而是 D。\n\nA+B，因此 C(D)。', style({ patterns: ['不是……而是……', 'A+B……C(D)'], patternTolerance: 0 }))
    const patterns = issues.filter((item) => item.id.startsWith('style-pattern'))
    expect(patterns).toHaveLength(1)
    expect(patterns[0]).toMatchObject({ line: 7, message: expect.stringContaining('A+B') })
  })

  it('软换行仍为同句，CRLF 和表情不影响命中行号', () => {
    const source = '---\r\ntitle: 标题\r\n---\r\n😀前半句，\r\n不是 A，\r\n而是 B。'
    expect(checkStyle(source, style()).find((item) => item.id === 'style-pattern-0')).toMatchObject({ line: 5 })
  })

  it('多行行内代码与图片 alt 不使后面的命中行号提前', () => {
    const source = '前文 `跨\n行代码` 不难发现。\n![跨\n行 alt](images/a.webp)\n![](images/b.webp)'
    const issues = checkStyle(source, style())
    expect(issues.find((item) => item.id.startsWith('style-phrase'))?.line).toBe(2)
    expect(issues.filter((item) => item.id.startsWith('style-caption')).map((item) => item.line)).toEqual([3, 5])
  })
})

describe('长句', () => {
  it('80 字不提示，81 字提示，逗号不切断句子', () => {
    expect(checkStyle('字'.repeat(80) + '。', style()).filter((item) => item.id.startsWith('style-long'))).toHaveLength(0)
    const issues = checkStyle('字'.repeat(40) + '，' + '字'.repeat(41) + '。', style())
    expect(issues.find((item) => item.id.startsWith('style-long'))).toMatchObject({ line: 1, message: expect.stringContaining('81 字') })
  })

  it('软换行仍为同一句，按句首定位；代码不算正文长句', () => {
    const source = '# 标题\n\n' + '字'.repeat(45) + '\n' + '字'.repeat(40) + '。\n\n```\n' + '字'.repeat(200) + '\n```'
    const issues = checkStyle(source, style()).filter((item) => item.id.startsWith('style-long'))
    expect(issues).toHaveLength(1)
    expect(issues[0].line).toBe(3)
  })
})

describe('单句段节奏', () => {
  it('连续三段提示一次，并指向第一段', () => {
    const issues = checkStyle('# 标题\n\n第一句。\n\n第二句。\n\n第三句。', style())
    expect(issues.find((item) => item.id.startsWith('style-paragraph'))).toMatchObject({ line: 3, status: 'info', message: expect.stringContaining('连续 3 段') })
  })

  it('多句段、列表、标题和代码会中断连续计数', () => {
    const cases = ['有两句。确实如此。', '- 列表项', '## 小标题', '```\n代码\n```']
    for (const divider of cases) {
      const issues = checkStyle(`第一句。\n\n第二句。\n\n${divider}\n\n第三句。`, style())
      expect(issues.filter((item) => item.id.startsWith('style-paragraph'))).toHaveLength(0)
    }
  })
})

describe('图片图注', () => {
  it('alt 不代替图注，支持引用式图片并定位到图片行', () => {
    const issues = checkStyle('# 图\n\n![有 alt][a]\n\n[a]: images/a.webp', style())
    expect(issues.find((item) => item.id.startsWith('style-caption'))).toMatchObject({ line: 3, message: expect.stringContaining('images/a.webp') })
  })

  it('识别相邻图注、image-caption 和 gallery 的 image-item 图注', () => {
    const source = '![](images/a.webp)\n\n*图 1 · 示意图*\n\n::: image-caption src="images/b.webp" 图 2 · 工作流\n:::\n\n:::: gallery\n::: image-item src="images/c.webp" 图 3 · 局部\n:::\n::::'
    expect(checkStyle(source, style()).filter((item) => item.id.startsWith('style-caption'))).toHaveLength(0)
  })

  it('无标题但有正文说明的图注容器有效，空图注容器仍提示', () => {
    const source = '::: image-caption src="images/a.webp"\n一张工作流示意图。\n:::\n\n::: image-caption src="images/b.webp"\n:::'
    const issues = checkStyle(source, style()).filter((item) => item.id.startsWith('style-caption'))
    expect(issues).toHaveLength(1)
    expect(issues[0].message).toContain('images/b.webp')
  })

  it('表格中的图片也参与图注和配图计数', () => {
    const issues = checkStyle('| 示意图 |\n| --- |\n| ![](images/table.webp) |', style())
    expect(issues.find((item) => item.id.startsWith('style-caption'))).toMatchObject({ line: 3, message: expect.stringContaining('table.webp') })
  })

  it('图片下一行的斜体说明是可见图注，无需另起空行', () => {
    expect(checkStyle('![](images/a.webp)\n*一次完整的工作流程*', style()).filter((item) => item.id.startsWith('style-caption'))).toHaveLength(0)
  })

  it('嵌套图注只作用于对应图片，不借用父图或子图的说明', () => {
    const source = ':::: image-caption src="images/outer.webp"\n::: image-caption src="images/inner.webp"\n内图的说明。\n:::\n::::\n\n:::: image-caption 外图说明\n::: image-caption\n![](images/uncaptioned.webp)\n:::\n::::'
    const issues = checkStyle(source, style()).filter((item) => item.id.startsWith('style-caption'))
    expect(issues.map((item) => item.line)).toEqual([1, 9])
    expect(issues[0].message).toContain('outer.webp')
    expect(issues[1].message).toContain('uncaptioned.webp')
  })
})

describe('可配置检查范围', () => {
  it('按当前风格的字数和图片范围检查，排除末尾参考资料', () => {
    const source = '正文内容。\n\n![](images/a.webp)\n\n*图 1 · 示例*\n\n## 参考资料\n\n' + '不难发现'.repeat(20) + '\n\n![](images/reference.webp)'
    const issues = checkStyle(source, style({ minWords: 10, maxWords: 30, minImages: 2, maxImages: 3 }))
    expect(issues.find((item) => item.id === 'style-word-count')?.status).toBe('warn')
    expect(issues.find((item) => item.id === 'style-image-count')?.message).toContain('有 1 张')
    expect(issues.filter((item) => item.id.startsWith('style-phrase'))).toHaveLength(0)
  })

  it('空正文不重复产生检查噪音', () => {
    expect(checkStyle('---\ntitle: 标题\n---\n')).toEqual([])
  })

  it('引用或容器里的参考标题不截断后续正文', () => {
    for (const heading of ['> ## 参考资料\n> 引用内容。', '::: note\n## 参考资料\n容器内容。\n:::']) {
      const source = `${heading}\n\n正文不难发现。`
      expect(checkStyle(source, style()).find((item) => item.id.startsWith('style-phrase'))).toBeDefined()
    }
  })

  it('参考资料排除范围止于下一个同级章节，保留后文与引用式图片定义', () => {
    const source = '![][a]\n\n## **参考资料**\n不难发现。\n\n### 参考资料\n不难发现。\n\n### 来源二\n不难发现。\n\n[a]: images/a.webp\n\n## 后记\n正文不难发现。'
    const issues = checkStyle(source, style())
    expect(issues.find((item) => item.id.startsWith('style-phrase'))).toMatchObject({ line: 15, message: expect.stringContaining('出现 1 次') })
    expect(issues.find((item) => item.id.startsWith('style-caption'))).toMatchObject({ line: 1, message: expect.stringContaining('images/a.webp') })
  })
})
