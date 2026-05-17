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
import { themeRegistry } from '../../src/core/themes'
const defaultTheme = themeRegistry.default
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

  it('circled：圆圈数字 1–20 + (N) 回退', () => {
    const theme = withHeadingPrefix(
      {
        headingPrefix: [
          {
            level: 2,
            autoNumber: 'circled',
            style: { color: 'accent' },
          },
        ],
      },
      'autonumber-circled',
    )
    // 5 个 h2 应输出 ❶❷❸❹❺
    const md = `## A\n\n## B\n\n## C\n\n## D\n\n## E\n`
    const { html } = render({ md, theme })
    expect(extractAutonumberSpans(html)).toEqual(['❶', '❷', '❸', '❹', '❺'])
  })

  it('circled + display:block + suffix `{cn}`：mook 系两行 kicker 布局', () => {
    const theme = withHeadingPrefix(
      {
        headingPrefix: [
          {
            level: 2,
            autoNumber: 'circled',
            style: {
              color: 'accent',
              display: 'block',
              marginBottom: 6,
              suffix: '  第{cn}章',
              fontSize: 10,
              letterSpacing: 2,
            },
          },
        ],
      },
      'autonumber-circled-block-suffix',
    )
    const md = `## 为什么我们失去了阅读的耐心\n\n## 慢读的三种练习\n\n## 夜晚作为最后的阅读时区\n`
    const { html } = render({ md, theme })

    // 1) 文本：❶ + suffix 替换后的中文章号
    expect(extractAutonumberSpans(html)).toEqual([
      '❶  第一章',
      '❷  第二章',
      '❸  第三章',
    ])

    // 2) 样式：display:block + margin-bottom:6px 而非 margin-right
    const blockSpanRe = /<span class="heading-prefix heading-prefix--autonumber" style="([^"]+)">/g
    const styles: string[] = []
    let m: RegExpExecArray | null
    while ((m = blockSpanRe.exec(html)) !== null) styles.push(m[1])
    expect(styles.length).toBeGreaterThan(0)
    for (const s of styles) {
      expect(s).toMatch(/display:block/)
      expect(s).toMatch(/margin-bottom:6px/)
      expect(s).not.toMatch(/margin-right:/)
    }
  })

  it('circled + suffix `{n}`：用 autoNumber 输出值占位', () => {
    const theme = withHeadingPrefix(
      {
        headingPrefix: [
          {
            level: 2,
            autoNumber: 'circled',
            style: { color: 'primary', suffix: ' chapter {n}' },
          },
        ],
      },
      'autonumber-circled-n-placeholder',
    )
    const md = `## A\n\n## B\n`
    const { html } = render({ md, theme })
    expect(extractAutonumberSpans(html)).toEqual([
      '❶ chapter ❶',
      '❷ chapter ❷',
    ])
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
