#!/usr/bin/env tsx
/**
 * render-gallery —— 同一篇 md × 多个 persona → 并排 HTML 画廊。
 *
 * 用途：作者对同一篇文章想横向比较"哪个主题最合适"，本脚本一次性产出
 * 一个 HTML 文件，每个主题占一列，方便浏览器里左右对比。
 *
 * 注意：gallery HTML 不是给微信粘贴用的（含 <style>、外层 grid 等）。
 * 选定主题后请用 `npm run cli -- render --persona <id>` 单独导出该 persona 的可粘贴 HTML。
 *
 * 用法：
 *   tsx render-gallery.ts --input <md> --personas <id1,id2,id3> [--output <html>]
 *   tsx render-gallery.ts --input <md> --personas all [--output <html>]
 */

import './_node-shim'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, listPersonas, getPersona } from '../../../src/public'

interface CliArgs {
  input: string
  personas: string[]
  output?: string
}

function parseArgs(argv: string[]): CliArgs {
  const flags: Record<string, string> = {}
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i]
    if (!k.startsWith('--')) fail(1, `expected flag, got "${k}"`)
    const v = argv[++i]
    if (v === undefined || v.startsWith('--')) fail(1, `flag ${k} expects a value`)
    flags[k.slice(2)] = v
  }
  if (!flags.input) fail(1, '--input <md> required')
  if (!flags.personas) fail(1, '--personas <id1,id2,...> | all required')

  const known = listPersonas().map((p) => p.id)
  let personas: string[]
  if (flags.personas === 'all') {
    personas = known
  } else {
    personas = flags.personas.split(',').map((s) => s.trim()).filter(Boolean)
    const bad = personas.filter((p) => !known.includes(p))
    if (bad.length > 0) {
      fail(2, `unknown persona(s): ${bad.join(', ')}. Known: ${known.join(', ')}`)
    }
  }
  return { input: flags.input, personas, output: flags.output }
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[render-gallery] ${msg}\n`)
  process.exit(code)
}

function buildGalleryHtml(
  source: string,
  rendered: Array<{ id: string; name: string; description: string; html: string; wordCount: number; readingTime: number }>,
): string {
  const cards = rendered
    .map(
      (r) => `
<article class="card">
  <header class="card-head">
    <h2>${r.name} <code>${r.id}</code></h2>
    <p class="muted">${r.description}</p>
    <p class="meta">字数 ${r.wordCount} · 约 ${r.readingTime} 分钟</p>
  </header>
  <div class="card-body">${r.html}</div>
</article>`,
    )
    .join('\n')

  // 复用 InkFlow / Cursor 阅读体验：左右滚动列表 + 自适应宽度
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Persona Gallery · ${rendered.length} 套主题对比</title>
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, "Segoe UI", "PingFang SC", sans-serif; background: #f5f5f7; color: #1a1a1a; }
    .toolbar { position: sticky; top: 0; z-index: 10; padding: 12px 24px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); border-bottom: 1px solid #e5e5ea; font-size: 13px; color: #555; }
    .toolbar strong { color: #1a1a1a; }
    .gallery { display: flex; gap: 24px; padding: 24px; overflow-x: auto; min-height: calc(100vh - 56px); align-items: flex-start; }
    .card { flex: 0 0 420px; max-width: 420px; background: #fff; border: 1px solid #e5e5ea; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04); }
    .card-head { padding: 16px 20px; border-bottom: 1px solid #f0f0f2; background: #fafafb; }
    .card-head h2 { margin: 0; font-size: 16px; }
    .card-head h2 code { font-size: 12px; color: #888; font-weight: 400; background: #f0f0f2; padding: 2px 6px; border-radius: 4px; margin-left: 6px; }
    .card-head p { margin: 6px 0 0; font-size: 13px; }
    .card-head .muted { color: #555; }
    .card-head .meta { color: #888; font-size: 12px; }
    .card-body { padding: 20px; max-height: calc(100vh - 220px); overflow-y: auto; }
    /* 把每个主题的渲染产物当沙盒处理 —— 不允许它把外部页面的字体覆盖掉 */
    .card-body { font-size: 14px; }
  </style>
</head>
<body>
  <div class="toolbar">
    <strong>Persona Gallery</strong> · 共 ${rendered.length} 套主题，左右滚动对比 ·
    <span style="color:#888;">本页面非可粘贴 HTML，确定主题后请用 <code>npm run cli -- render --persona &lt;id&gt;</code> 单独导出</span>
  </div>
  <div class="gallery">${cards}</div>
</body>
</html>`
}

function main() {
  const args = parseArgs(process.argv)
  let md: string
  try {
    md = readFileSync(resolve(process.cwd(), args.input), 'utf8')
  } catch (e) {
    fail(1, `failed to read input: ${(e as Error).message}`)
  }
  md = md.replace(/^---\n[\s\S]*?\n---\n/, '')

  const rendered = args.personas.map((id) => {
    const spec = getPersona(id)
    const out = render({ md, persona: id })
    return {
      id,
      name: spec.name,
      description: spec.description,
      html: out.html,
      wordCount: out.wordCount,
      readingTime: out.readingTime,
    }
  })

  const galleryHtml = buildGalleryHtml(md, rendered)

  if (args.output) {
    writeFileSync(resolve(process.cwd(), args.output), galleryHtml, 'utf8')
    process.stderr.write(
      `[render-gallery] wrote ${args.output} (${rendered.length} personas, ` +
        `total ${galleryHtml.length} bytes)\n`,
    )
    process.stdout.write(
      JSON.stringify(
        {
          ok: true,
          personas: rendered.map((r) => ({ id: r.id, name: r.name, word_count: r.wordCount })),
          output: args.output,
        },
        null,
        2,
      ) + '\n',
    )
  } else {
    process.stdout.write(galleryHtml)
  }
}

main()
