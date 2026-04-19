#!/usr/bin/env node
/**
 * 回归基准生成器
 *
 * 对每个内置主题渲染其 sample，落到 /tmp/wx-md-baseline/<themeId>.html
 * 仅在重构期间使用：基线一次，重构后 diff。
 */

import { writeFileSync, mkdirSync, statSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import { createHash } from 'node:crypto'

const dom = new JSDOM('', { url: 'http://localhost/' })
globalThis.DOMParser = dom.window.DOMParser
globalThis.XMLSerializer = dom.window.XMLSerializer
globalThis.document = dom.window.document
globalThis.Node = dom.window.Node
globalThis.Element = dom.window.Element
globalThis.HTMLElement = dom.window.HTMLElement

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = process.env.WX_MD_BASELINE_DIR || resolve(HERE, '.baseline')
mkdirSync(OUT, { recursive: true })

const { render } = await import('../src/pipeline/index.ts')
const { themeRegistry } = await import('../src/themes/index.ts')
const { getSample } = await import('../src/samples/index.ts')

const ids = Object.keys(themeRegistry)
for (const id of ids) {
  const md = getSample(id)
  const { html, wordCount } = render({ md, theme: themeRegistry[id] })
  const file = resolve(OUT, `${id}.html`)
  writeFileSync(file, html)
  const hash = createHash('sha256').update(html).digest('hex').slice(0, 16)
  console.log(`${id.padEnd(20)} len=${String(html.length).padStart(6)}  words=${wordCount.toString().padStart(4)}  sha256=${hash}`)
}

// 另外报告一次 dist 入口 hash
try {
  const indexHtml = resolve(HERE, '..', 'dist', 'index.html')
  const mtime = statSync(indexHtml).mtimeMs
  console.log(`\ndist/index.html mtime=${mtime}`)
} catch { /* no dist yet */ }
