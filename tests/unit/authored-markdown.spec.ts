import { readFileSync } from 'node:fs'
import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import { themeList } from '../../src/core/themes'
import { diagnose } from '../../src/core/pipeline/diagnose'
import { createMarkdown } from '../../src/core/pipeline/markdown'
import { render } from '../../src/core/pipeline'
import { SAMPLE_BY_THEME } from '../../src/domain/samples'
import { getThemeTemplateEntries } from '../../src/domain/components-lib/sources/theme-template-source'
import { BUILTIN_COMPONENTS } from '../../src/domain/components-lib/sources/builtin-source'

describe('内置写作内容遵守当前容器契约', () => {
  for (const theme of themeList) {
    const sample = readFileSync(`src/samples-md/sample-${theme.id}.md`, 'utf8').replace(/\r\n/g, '\n')

    it(`${theme.id} 的打包样稿与源文件一致`, () => {
      expect(SAMPLE_BY_THEME[theme.id]).toBe(sample)
    })

    const entries = [
      { id: 'sample', markdownSnippet: sample },
      ...getThemeTemplateEntries(theme),
    ]
    for (const entry of entries) {
      it(`${theme.id}/${entry.id} 无契约错误且所有容器均被解析`, () => {
        const source = entry.markdownSnippet
        expect(diagnose(source).filter((d) => d.severity === 'error' || d.code === 'unknown-variant')).toEqual([])
        const markdown = createMarkdown({ theme })
        const tokens = markdown.parse(source, {})
        // 未注册 fence 会退化成 inline 文本；只检查正文 token，代码示例不算泄漏。
        const leaked = tokens.filter((t) => t.type === 'inline' && /^ {0,3}:{3,}(?:\s|$)/m.test(t.content))
        expect(leaked.map((t) => t.content)).toEqual([])
        const { html } = render({ md: source, theme })
        const document = new DOMParser().parseFromString(html, 'text/html')
        // 原生 [^id]: 定义会被移到全局脚注；不可再套一个空的装饰容器。
        for (const footnotes of document.querySelectorAll('.container-footnotes')) {
          expect(footnotes.textContent?.trim()).not.toBe('')
        }
        expect(html).not.toBe('')
      })
    }
  }
})

describe('内置组件和写作指南不再输出失效语法', () => {
  for (const entry of BUILTIN_COMPONENTS) {
    it(`组件 ${entry.id}`, () => {
      expect(diagnose(entry.markdownSnippet).filter((d) => d.severity === 'error' || d.code === 'unknown-variant')).toEqual([])
    })
  }

  for (const path of [
    'docs/contract/base.md',
    'docs/contract/packs/editorial.md',
    'docs/contract/packs/data-viz.md',
    'skills/wechat-typeset-annotate-markdown/references/annotation-recipes.md',
  ]) {
    it(`${path} 的可复制示例`, () => {
      const blocks = new MarkdownIt().parse(readFileSync(path, 'utf8'), {})
        .filter((t) => t.type === 'fence' && /^:{3,}\s+[a-z]/m.test(t.content))
      expect(blocks.length).toBeGreaterThan(0)
      for (const block of blocks) {
        expect(diagnose(block.content).filter((d) => d.severity === 'error' || d.code === 'unknown-variant'), block.content).toEqual([])
      }
    })
  }
})
