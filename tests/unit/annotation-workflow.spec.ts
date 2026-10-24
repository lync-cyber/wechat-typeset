// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { annotateCommand } from '../../packages/cli/src/commands/annotate'
import { annotateApplyCommand } from '../../packages/cli/src/commands/annotate-apply'
import { lintCommand } from '../../packages/cli/src/commands/lint'
import { renderCommand } from '../../packages/cli/src/commands/render'
import { annotateMarkdown } from '../../packages/cli/src/heuristics/annotate'
import { listPersonas } from '../../src/public'

const narrative = [
  '# 雨后的路', '',
  '他在路口停了下来，注意到树叶上还有昨夜留下的雨水。那条看起来危险的小路已经重新修好，他顺便去探望住在河边的朋友。朋友讲起往事，两个人一直聊到天色渐暗。', '',
  '## 出发', '昨天的人数比上周增长了 20%，我们仍然沿着老路向前走。', '',
  '## 相遇', '> 千万不要忘记那些一起走过的路，这是他留给朋友的一句普通叮嘱。', '',
  '## 回家', '风停了，路灯亮了。',
].join('\n')

describe('conservative annotation workflow', () => {
  it('leaves narrative, standard headings, quotations and incidental numbers alone in every theme', () => {
    for (const persona of listPersonas()) {
      expect(annotateMarkdown(narrative, persona.id).patches, persona.id).toEqual([])
    }
  })

  it.each([
    '', '# 短文\n\n今天晴。', '只有一段，没有标题。',
    '注意力被窗外的雨声吸引了，他顺便回忆起危险的旅途。',
    '“注意：不要忘记回来。”他说。',
    '他说：“危险：前面不能通行。”',
    '`注意：` 是示例标签。',
    '> 注意：这句话出自旅行日记。\n> 后来我们终于到家了。',
    '# 标题\n\n## 第一节\n\n本文介绍一个概念，但这是章节正文。',
    '1. 打开了窗户。\n2. 选择了小路。\n3. 保存了照片。',
    '1. 春天\n2. 夏天\n3. 秋天',
  ])('accepts empty suggestions for ordinary Markdown: %s', (md) => {
    expect(annotateMarkdown(md, 'default').patches).toEqual([])
  })

  it.each([
    ['本文介绍备份与恢复的基本操作。', 'intro'],
    ['导读：先看准备工作，再完成配置。', 'intro'],
    ['摘要：本次实验比较了两种方法。', 'abstract'],
    ['小贴士：可先复制一份草稿。', 'tip'],
    ['💡 **提示**：可先复制一份草稿。', 'tip'],
    ['⚠️ 注意：删除之前先备份。', 'warning'],
    ['危险：切勿触碰裸露电线。', 'danger'],
  ])('proposes an optional %s wrapper only from the explicit signal', (text, container) => {
    const patches = annotateMarkdown(`# 标题\n\n${text}`, 'default').patches
    expect(patches).toHaveLength(1)
    expect(patches[0]).toMatchObject({ line: 3, endLine: 3, container })
    expect(patches[0].reason).toContain('可选用')
  })

  it('does not propose duplicate wrappers for a labeled opening paragraph', () => {
    const patches = annotateMarkdown('# 标题\n\n注意：' + '执行前请先完成数据备份。'.repeat(8), 'default').patches
    expect(patches.map((patch) => patch.container)).toEqual(['warning'])
  })

  it.each([
    '::: tip\n注意：已有容器。\n\n1. 打开应用\n2. 选择设置\n3. 保存更改\n:::',
    ':::: compare\n::: pros\n提示：已有嵌套容器。\n:::\n::::',
    '::: custom-future\n\n危险：这是一个自定义组件。\n\n:::',
    '::: warning\n\n提示：尚未关闭的容器也不进入。',
    '```md\n注意：代码块。\n```',
    '~~~~md\n提示：代码块。\n~~~\n注意：长围栏还没有结束。\n~~~~',
    '    危险：缩进代码。',
    '<div>\n提示：HTML 内容。\n</div>',
    '> 引文\n\n> 1. 打开应用\n> 2. 选择设置\n> 3. 保存更改',
  ])('protects existing markup and code: %s', (md) => {
    expect(annotateMarkdown(md, 'default').patches).toEqual([])
  })

  it('keeps frontmatter out of annotation and preserves original CRLF source line numbers', () => {
    const md = ['---', 'title: 示例', 'digest: 注意：这是发布摘要。', '---', '# 正文', '', '提示：保存备份。'].join('\r\n')
    expect(annotateMarkdown(md, 'default').patches).toEqual([
      expect.objectContaining({ line: 7, endLine: 7, container: 'tip' }),
    ])
  })

  it.each([
    '1. 打开应用\n   继续阅读说明。\n2. 选择设置\n3. 保存更改',
    '1) 打开应用\n2) 选择设置\n3) 保存更改',
  ])('wraps a complete actionable list, including continuation lines: %s', (md) => {
    expect(annotateMarkdown(md, 'default').patches).toEqual([
      expect.objectContaining({ line: 1, endLine: md.split('\n').length, kind: 'convert_list', container: 'steps' }),
    ])
  })

  it.each([
    '1. 打开应用\n   - 选择账号\n2. 选择设置\n3. 保存更改',
    '1. 打开应用\n\n   提示：这是列表项中的第二段。\n\n2. 选择设置\n3. 保存更改',
    '1. 打开应用\n\n2. 选择设置\n\n3. 保存更改',
    '1. 打开应用\n   ```text\n   注意：代码\n   ```\n2. 选择设置\n3. 保存更改',
  ])('leaves complex list ownership intact: %s', (md) => {
    expect(annotateMarkdown(md, 'default').patches).toEqual([])
  })

  it('annotate → apply → lint → render preserves source text and is stable on a second annotation', async () => {
    const md = [
      '# 操作指南', '', '本文介绍配置步骤。', '',
      '1. 打开应用', '   先确认当前账号。', '2. 选择设置', '3. 保存更改', '',
      '提示：可先备份原配置。', '', '注意：保存后再关闭。',
    ].join('\n')
    const annotation = await annotateCommand.run({ md, persona: 'default' })
    expect(annotation.patches.map((patch) => patch.container)).toEqual(['intro', 'steps', 'tip', 'warning'])
    expect(annotation.capabilitySnapshot.personaId).toBe('default')
    expect(annotation.vocabularySubset.length).toBeGreaterThan(0)
    expect(annotation.blockCount).toBeGreaterThan(0)
    const applied = await annotateApplyCommand.run({ md, patches: annotation.patches })
    expect(applied.applied).toBe(4)
    expect(applied.skipped).toEqual([])
    expect(applied.md.split('\n').filter((line) => !/^:::/u.test(line)).join('\n')).toBe(md)
    expect(annotateMarkdown(applied.md, 'default').patches).toEqual([])
    expect((await lintCommand.run({ md: applied.md, persona: 'default' })).ok).toBe(true)
    const rendered = await renderCommand.run({ md: applied.md, persona: 'default' })
    expect(rendered.html).toContain('保存更改')
    expect(rendered.html).toContain('先确认当前账号')
  })

  it('plain Markdown succeeds through actual lint and full rendering without annotation', async () => {
    const md = `${narrative}\n\n- 一个普通条目\n- 另一个条目\n\n**强调**与[链接](https://example.com)。\n\n\`\`\`text\n代码示例\n\`\`\``
    const lint = await lintCommand.run({ md, persona: 'default' })
    expect(lint.ok).toBe(true)
    expect(lint.issues).toEqual([])
    const rendered = await renderCommand.run({ md, persona: 'default' })
    expect(rendered.html).toContain('markdown-body')
    expect(rendered.html).toContain('风停了，路灯亮了。')
    expect(rendered.html).toContain('一个普通条目')
    expect(rendered.html).toContain('代码示例')
    expect(rendered.wordCount).toBeGreaterThan(0)
    expect(rendered.html).not.toContain(':::')
  })
})
