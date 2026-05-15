#!/usr/bin/env tsx
/**
 * open-in-browser —— annotated md + persona → 写 HTML 到 tmp → 用默认浏览器打开。
 *
 * 用途：作者粘贴到公众号前先在浏览器里肉眼检查渲染（确认折叠 / 留白 / 颜色 / 字号）。
 * 与 `npm run cli -- render` 的差异：默认输出到 tmpdir，自动打开，不让作者操心路径。
 *
 * 用法：
 *   tsx open-in-browser.ts --input <md> --persona <id> [--keep] [--gallery <id1,id2,...>]
 *
 * --keep 保留文件不删（默认不删但路径在 tmpdir，由系统清理）
 * --gallery 多 persona 模式（等同于 render-gallery 流程，自动打开）
 *
 * 退出码：
 *   0 浏览器拉起成功
 *   1 IO / 参数错
 *   2 unknown persona
 *   4 render 失败
 *   6 浏览器命令调用失败
 */

import './_node-shim'
import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { render, listPersonas, getPersona } from '../../../src/public'

interface CliArgs {
  input: string
  persona?: string
  gallery?: string[]
  keep: boolean
}

function parseArgs(argv: string[]): CliArgs {
  const flags: Record<string, string> = {}
  let keep = false
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i]
    if (k === '--keep') keep = true
    else if (k.startsWith('--')) {
      const v = argv[++i]
      if (v === undefined || v.startsWith('--')) fail(1, `flag ${k} expects a value`)
      flags[k.slice(2)] = v
    } else {
      fail(1, `expected flag, got "${k}"`)
    }
  }
  if (!flags.input) fail(1, '--input <md> required')
  if (!flags.persona && !flags.gallery) {
    fail(1, '--persona <id> or --gallery <id1,id2,...> required')
  }
  if (flags.persona && flags.gallery) {
    fail(1, '--persona and --gallery are mutually exclusive')
  }
  return {
    input: flags.input,
    persona: flags.persona,
    gallery: flags.gallery?.split(',').map((s) => s.trim()).filter(Boolean),
    keep,
  }
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[open-in-browser] ${msg}\n`)
  process.exit(code)
}

function openInBrowser(filePath: string): boolean {
  const platform = process.platform
  try {
    if (platform === 'darwin') {
      return spawnSync('open', [filePath], { stdio: 'ignore' }).status === 0
    }
    if (platform === 'win32') {
      return spawnSync('cmd', ['/c', 'start', '""', filePath], { stdio: 'ignore' }).status === 0
    }
    if (platform === 'linux') {
      return spawnSync('xdg-open', [filePath], { stdio: 'ignore' }).status === 0
    }
  } catch {}
  return false
}

function renderSingle(md: string, personaId: string): string {
  const known = listPersonas().map((p) => p.id)
  if (!known.includes(personaId)) {
    process.stderr.write(
      `[open-in-browser] unknown persona "${personaId}". Known: ${known.join(', ')}\n`,
    )
    process.exit(2)
  }
  try {
    const out = render({ md, persona: personaId })
    const spec = getPersona(personaId)
    // 在外层包一个浏览器友好的壳：背景、最大宽度居中——避免微信窄宽样式拉满屏
    return wrapForPreview(out.html, `${spec.name} · ${personaId}`, spec.description)
  } catch (e) {
    process.stdout.write(
      JSON.stringify(
        { ok: false, error: 'render_failure', message: (e as Error).message },
        null,
        2,
      ) + '\n',
    )
    process.exit(4)
  }
}

function wrapForPreview(innerHtml: string, title: string, description: string): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>
    html, body { margin: 0; padding: 0; background: #f5f5f7; }
    body { font-family: system-ui, -apple-system, "Segoe UI", "PingFang SC", sans-serif; }
    .preview-toolbar {
      position: sticky; top: 0; z-index: 10; padding: 10px 16px;
      background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(6px);
      border-bottom: 1px solid #e5e5ea; font-size: 12px; color: #555;
    }
    .preview-toolbar strong { color: #1a1a1a; }
    .preview-frame {
      max-width: 480px; /* 公众号正文实际渲染宽度大约 375-480 */
      margin: 16px auto;
      background: #fff;
      padding: 20px;
      border: 1px solid #e5e5ea; border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
  </style>
</head>
<body>
  <div class="preview-toolbar">
    <strong>${title}</strong> · ${description}
    <span style="float:right;color:#888;">预览框宽度模拟公众号正文 480px</span>
  </div>
  <div class="preview-frame">${innerHtml}</div>
</body>
</html>`
}

function renderGalleryHtml(md: string, ids: string[]): string {
  const known = listPersonas().map((p) => p.id)
  const bad = ids.filter((id) => !known.includes(id))
  if (bad.length > 0) {
    process.stderr.write(
      `[open-in-browser] unknown persona(s): ${bad.join(', ')}. Known: ${known.join(', ')}\n`,
    )
    process.exit(2)
  }
  const cards = ids
    .map((id) => {
      const spec = getPersona(id)
      const out = render({ md, persona: id })
      return `
<article class="card">
  <header class="card-head">
    <h2>${spec.name} <code>${id}</code></h2>
    <p class="muted">${spec.description}</p>
    <p class="meta">字数 ${out.wordCount} · 约 ${out.readingTime} 分钟</p>
  </header>
  <div class="card-body">${out.html}</div>
</article>`
    })
    .join('\n')

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <title>Persona Gallery · ${ids.length} 套对比</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #f5f5f7; color: #1a1a1a; }
    .toolbar { position: sticky; top: 0; z-index: 10; padding: 12px 24px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); border-bottom: 1px solid #e5e5ea; font-size: 13px; }
    .gallery { display: flex; gap: 24px; padding: 24px; overflow-x: auto; min-height: calc(100vh - 56px); align-items: flex-start; }
    .card { flex: 0 0 420px; background: #fff; border: 1px solid #e5e5ea; border-radius: 12px; overflow: hidden; }
    .card-head { padding: 16px 20px; border-bottom: 1px solid #f0f0f2; background: #fafafb; }
    .card-head h2 { margin: 0; font-size: 16px; }
    .card-head h2 code { font-size: 12px; color: #888; font-weight: 400; background: #f0f0f2; padding: 2px 6px; border-radius: 4px; margin-left: 6px; }
    .card-head p { margin: 6px 0 0; font-size: 13px; }
    .card-head .muted { color: #555; }
    .card-head .meta { color: #888; font-size: 12px; }
    .card-body { padding: 20px; max-height: calc(100vh - 220px); overflow-y: auto; font-size: 14px; }
  </style>
</head>
<body>
  <div class="toolbar"><strong>Persona Gallery</strong> · 共 ${ids.length} 套 · 左右滚动对比</div>
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

  let html: string
  let suffix: string
  if (args.gallery) {
    html = renderGalleryHtml(md, args.gallery)
    suffix = `gallery-${args.gallery.length}`
  } else {
    html = renderSingle(md, args.persona!)
    suffix = args.persona!
  }

  const tmp = resolve(tmpdir(), `wechat-typeset-${suffix}-${Date.now()}.html`)
  writeFileSync(tmp, html, 'utf8')

  const ok = openInBrowser(tmp)
  if (!ok) {
    process.stdout.write(
      JSON.stringify(
        {
          ok: false,
          error: 'browser_open_failed',
          platform: process.platform,
          file: tmp,
          hint: '自动打开失败，请手动在浏览器中打开上述文件路径',
        },
        null,
        2,
      ) + '\n',
    )
    process.exit(6)
  }

  process.stdout.write(
    JSON.stringify(
      {
        ok: true,
        mode: args.gallery ? 'gallery' : 'single',
        file: tmp,
        keep: args.keep,
        hint:
          '已用默认浏览器打开预览。该 HTML 是预览版（含外壳/工具栏），不要直接复制 → ' +
          '确认主题后请用 copy-richtext.ts 写剪贴板，或 `npm run cli -- render` 导出纯净 HTML。',
      },
      null,
      2,
    ) + '\n',
  )
}

main()
