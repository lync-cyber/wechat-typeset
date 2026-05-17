/**
 * tests/fixtures/all-containers.md 端到端渲染校验
 *
 * 目的：确保全量 fixture 在默认主题下
 *   - pipeline 不抛异常
 *   - 各 variantKind 的 variant class 全部出现（admonition / quote / compare /
 *     steps / divider / sectionTitle / note / footnotes；codeBlock 独立检查）
 *   - 所有无 variant 的基础容器 class 也都出现（base + pack:editorial + pack:data-viz）
 *
 * 具体清单从 vocabulary + VARIANT_IDS 派生，新增容器/variant 时不需要手改这里。
 *
 * fixture 位置：tests/fixtures/all-containers.md（不在 src/samples-md/，确保
 * 不会被打包进 SAMPLE_BY_THEME 误入用户态预览）。
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

const { render } = await import('../src/core/pipeline')
import { defaultTheme } from '../src/core/themes/default'
import { VARIANT_IDS } from '../src/core/themes/types'

const HERE = fileURLToPath(new URL('.', import.meta.url))
const SAMPLE = resolve(HERE, 'fixtures/all-containers.md')

const md = readFileSync(SAMPLE, 'utf8')
const { html, wordCount } = render({ md, theme: defaultTheme })

type Result = { label: string; ok: boolean; detail?: string }
const results: Result[] = []

function check(label: string, predicate: () => boolean, detail = ''): void {
  results.push({ label, ok: predicate(), detail })
}

// 1. 容器 variant class 枚举（codeBlock 走独立命名，下面单独检查）
for (const [kind, ids] of Object.entries(VARIANT_IDS)) {
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

// 1b. codeBlock 5 variant —— fixture Part 5 写了 5 个显式 variant fence。
//   - bare 不带外层 wrapper，但必须出现 <pre><code class="... hljs">
//   - 其余 4 个（header-bar / line-numbers / terminal-frame / inline-card）必须
//     出现各自的 wx-code-block--{id} class
check('codeBlock:bare-has-pre-code', () => /<pre[^>]*>\s*<code[^>]*hljs/.test(html), '<pre><code class="...hljs">')
for (const id of VARIANT_IDS.codeBlock) {
  if (id === 'bare') continue
  const cls = `wx-code-block--${id}`
  check(`codeBlock:${id}`, () => html.includes(cls), cls)
}

// 2. 无 variant 容器 class 出现（base + pack:editorial + pack:data-viz 全量）
const plainContainers = [
  // base
  'container-intro',
  'container-cover',
  'container-author',
  'container-author-bio',
  'container-announcement',
  'container-highlight',
  'container-image-caption',
  'container-timeline',
  'container-footer-cta',
  'container-recommend',
  'container-qrcode',
  'container-voice-card',
  'container-video-card',
  'container-note',
  'container-abstract',
  'container-key-number',
  'container-free',
  // pack:editorial
  'container-masthead',
  'container-section-tag',
  'container-byline',
  'container-editorial-header',
  'container-toc',
  'container-qa-block',
  'container-callout-group',
  'container-cta-bar',
  'container-colophon',
  // qrcode follow-card variant：刊物订阅卡（左 QR + 右 kicker/title/desc）
  'container-qrcode container-qrcode--follow-card',
  // pack:data-viz
  'container-kpi-dashboard',
  'container-bar-chart',
]
for (const c of plainContainers) {
  check(`plain:${c}`, () => html.includes(c), c)
}

// 3. 视频 iframe（video-card qqvid 版本）应被保留
check('video-card-iframe', () => html.includes('<iframe'), 'v.qq.com iframe')

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
