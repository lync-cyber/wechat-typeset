/**
 * sample-full.md 端到端渲染校验
 *
 * 目的：确保 docs/samples/sample-full.md 在默认主题下
 *   - pipeline 不抛异常
 *   - 23 个 variant 的 class 全部出现
 *   - 9 个无 variant 的容器 class 也都出现
 *
 * 运行：npx tsx tests/verify-sample-full.ts
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'

// wxPatch 里用了浏览器 DOMParser；Node 下缺，先用 jsdom 塞上再导入 pipeline
const dom = new JSDOM('', { url: 'http://localhost/' })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).DOMParser = dom.window.DOMParser
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).XMLSerializer = dom.window.XMLSerializer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).document = dom.window.document
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).Node = dom.window.Node

const { render } = await import('../src/pipeline')
import { defaultTheme } from '../src/themes/default'
import { VARIANT_IDS } from '../src/themes/types'

const HERE = fileURLToPath(new URL('.', import.meta.url))
const SAMPLE = resolve(HERE, '../docs/samples/sample-full.md')

const md = readFileSync(SAMPLE, 'utf8')
const { html, wordCount } = render({ md, theme: defaultTheme })

type Result = { label: string; ok: boolean; detail?: string }
const results: Result[] = []

function check(label: string, predicate: () => boolean, detail = ''): void {
  results.push({ label, ok: predicate(), detail })
}

// 1. 23 个容器 variant class 枚举（codeBlock 走独立命名，下面单独检查）
for (const [kind, ids] of Object.entries(VARIANT_IDS)) {
  // codeBlock 不是 `:::` 容器，产物不带 container- 前缀；sample 渲染下只会出现主题选中的
  // 那一个 variant（默认主题 codeBlock=bare → 产物是裸 <pre><code>）。单独在下面断言。
  if (kind === 'codeBlock') continue
  for (const id of ids as readonly string[]) {
    // admonition 的 kind 对应多个容器名（tip/warning/info/danger），任何一个出现即算过
    if (kind === 'admonition') {
      const classes = ['tip', 'warning', 'info', 'danger'].map(
        (k) => `container-${k}--${id}`,
      )
      check(
        `admonition:${id}`,
        () => classes.some((c) => html.includes(c)),
        classes.join(' | '),
      )
      continue
    }
    const containerName =
      kind === 'sectionTitle' ? 'section-title' : kind === 'quote' ? 'quote-card' : kind
    const cls = `container-${containerName}--${id}`
    check(`${kind}:${id}`, () => html.includes(cls), cls)
  }
}

// 1b. codeBlock 单独检查：默认主题 variant=bare，产物应含 <pre><code class="... hljs">，
// 且不应残留 wx-code-block wrapper（wrapper 是 header-bar 专属）。
check('codeBlock:bare(default theme)', () => /<pre[^>]*>\s*<code[^>]*hljs/.test(html), '<pre><code class="...hljs">')
check('codeBlock:no-wrapper-on-bare', () => !html.includes('wx-code-block'), '不含 wx-code-block')

// 2. 无 variant 容器 class 出现
const plainContainers = [
  'container-intro',
  'container-cover',
  'container-author',
  'container-highlight',
  'container-footer-cta',
  'container-recommend',
  'container-qrcode',
  'container-mpvoice',
  'container-mpvideo',
]
for (const c of plainContainers) {
  check(`plain:${c}`, () => html.includes(c), c)
}

// 3. 视频 iframe（qqvid 版本）应被保留
check('mpvideo-iframe', () => html.includes('<iframe'), 'v.qq.com iframe')

// 4. 基本健康：有字数
check('word-count>0', () => wordCount > 0, `words=${wordCount}`)

// ---- 报告 ----
const pass = results.filter((r) => r.ok).length
const fail = results.filter((r) => !r.ok)
console.log(`\n[verify] ${pass}/${results.length} passed, html=${html.length}ch, words=${wordCount}`)
if (fail.length > 0) {
  console.error('\n失败项：')
  for (const f of fail) console.error(`  ✗ ${f.label}  (期望出现: ${f.detail})`)
  process.exit(1)
}
console.log('[verify] all green')
