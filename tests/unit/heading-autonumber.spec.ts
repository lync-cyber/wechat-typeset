/**
 * 标题自动编号（decorations.headingPrefix.autoNumber）渲染契约
 *
 * 覆盖：
 *   - arabic-padded：h2 输出 01 / 02 / 03（与 padStart 一致）
 *   - arabic-section：h3 输出 `${父h2}.${本节内h3序号}`，跨 h2 时归零
 *   - roman：保持向后兼容（people-story 的现有用法）
 *   - 计数器在容器内的 heading 也计入——这是当前的"全局扫 token"行为，
 *     保留显式断言；如未来要排除容器内 heading，本测试会提醒变更。
 */

import { describe, it, expect } from 'vitest'
import { render } from '../../src/core/pipeline'
import { defaultTheme } from '../../src/core/themes/default'
import type { Theme } from '../../src/core/themes/types'

function withHeadingPrefix(
  decorations: Theme['decorations'],
  id = 'autonumber-test',
): Theme {
  // 克隆默认主题但替换 decorations + 换 id 以绕开 mdCache
  const base = JSON.parse(JSON.stringify(defaultTheme)) as Theme
  return { ...base, id, decorations, assets: defaultTheme.assets }
}

function extractAutonumberSpans(html: string): string[] {
  const re = /<span class="heading-prefix heading-prefix--autonumber"[^>]*>([^<]+)<\/span>/g
  const out: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) out.push(m[1])
  return out
}

describe('autoNumber · 标题前缀渲染', () => {
  it('arabic-padded：h2 序号 01 / 02 / 03 …', () => {
    const theme = withHeadingPrefix(
      {
        headingPrefix: [
          {
            level: 2,
            autoNumber: 'arabic-padded',
            style: { color: 'primary', fontWeight: 700 },
          },
        ],
      },
      'autonumber-h2-arabic-padded',
    )
    const md = `## 引言\n\n## 正文\n\n## 收束\n`
    const { html } = render({ md, theme })
    expect(extractAutonumberSpans(html)).toEqual(['01', '02', '03'])
  })

  it('arabic-section：h3 编号联动父 h2，且跨 h2 归零', () => {
    const theme = withHeadingPrefix(
      {
        headingPrefix: [
          {
            level: 2,
            autoNumber: 'arabic-padded',
            style: { color: 'primary' },
          },
          {
            level: 3,
            autoNumber: 'arabic-section',
            style: { color: 'primary' },
          },
        ],
      },
      'autonumber-section',
    )
    // 结构：第 1 节有 2 个子节；第 2 节有 1 个；第 3 节有 3 个
    const md = [
      '## 第一节',
      '### 一节一目',
      '### 一节二目',
      '## 第二节',
      '### 二节一目',
      '## 第三节',
      '### 三节一目',
      '### 三节二目',
      '### 三节三目',
      '',
    ].join('\n')
    const { html } = render({ md, theme })
    expect(extractAutonumberSpans(html)).toEqual([
      '01',
      '1.1',
      '1.2',
      '02',
      '2.1',
      '03',
      '3.1',
      '3.2',
      '3.3',
    ])
  })

  it('roman：向后兼容（level-local 单计数器）', () => {
    const theme = withHeadingPrefix(
      {
        headingPrefix: [
          {
            level: 2,
            autoNumber: 'roman',
            style: { color: 'accent', fontWeight: 700 },
          },
        ],
      },
      'autonumber-roman',
    )
    const md = `## A\n\n## B\n\n## C\n\n## D\n`
    const { html } = render({ md, theme })
    expect(extractAutonumberSpans(html)).toEqual(['I', 'II', 'III', 'IV'])
  })

  it('arabic-section-padded：h2 段号零填充两位', () => {
    const theme = withHeadingPrefix(
      {
        headingPrefix: [
          {
            level: 3,
            autoNumber: 'arabic-section-padded',
            style: { color: 'primary' },
          },
        ],
      },
      'autonumber-section-padded',
    )
    // h2 没声明 decoration 但计数器仍按出现顺序递增，所以这里 h3 的父号是 1/2
    const md = [
      '## 一',
      '### A',
      '### B',
      '## 二',
      '### C',
      '',
    ].join('\n')
    const { html } = render({ md, theme })
    expect(extractAutonumberSpans(html)).toEqual(['01.1', '01.2', '02.1'])
  })
})
