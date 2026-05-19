#!/usr/bin/env tsx
/**
 * variant 单点预览 CLI
 *
 * 跳过 vite dev server / App.vue，直接调 pipeline render 把指定 variant 的 snippets
 * 渲染成离线 HTML 写到 `.preview/`。复用 variant.snippets.markdown —— 改完文件想看效果
 * 不需要再编 fixture / 点 UI。
 *
 * 用法：
 *   pnpm preview:variant admonition.accent-bar                 一次性 dump
 *   pnpm preview:variant admonition.accent-bar --watch         watch + SSE 自动刷新
 *   pnpm preview:variant codeBlock.terminal-frame --all-themes
 *   pnpm preview:variant pull-quote.classic --snippet 0 --open
 *
 * watch 模式：长驻进程起 http server（默认 :5174），监听 src/core/variants /themes /pipeline
 * 任一文件变更 → spawn 子进程重渲染 → SSE 广播 reload。模块缓存通过子进程隔离绕开
 * ESM 没有 invalidation API 的问题；约 2s/次，比切 UI 找位置仍快得多。
 */

import './shim-jsdom'
import { createRequire } from 'node:module'
import { existsSync, mkdirSync, writeFileSync, watch as fsWatch, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, basename, extname } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { spawn, type ChildProcess } from 'node:child_process'
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { render } from '../src/public'
import { ORDERED_SPECS } from '../src/core/themes/registry'
import type { VariantDef, CodeBlockDef } from '../src/core/variants/_core'

type AnyDef = VariantDef<any> | CodeBlockDef

export interface CliArgs {
  kind: string
  id: string
  themes: string[]
  snippetIndex: number | 'all'
  outPath: string
  open: boolean
  watch: boolean
  port: number
  injectReload: boolean
  /** 仅 watch 模式记忆原始 themeOpt/allThemes，方便 spawn 子进程时回传 */
  rawThemeFlags: string[]
  /** 列表模式：枚举 src/core/variants/* 全部 variants，写 single 页 + index 网格 */
  list: boolean
}

const DEFAULT_PORT = 5174

function fail(msg: string): never {
  process.stderr.write(`[preview-variant] ${msg}\n`)
  process.exit(1)
}

function parseArgs(argv: string[]): CliArgs {
  let target: string | undefined
  let themeOpt: string | undefined
  let allThemes = false
  let snippetOpt = 'all'
  let outOpt: string | undefined
  let openOpt: boolean | undefined
  let watch = false
  let port = DEFAULT_PORT
  let injectReload = false
  let list = false

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === 'list' || a === '--list') { list = true; continue }
    if (!a.startsWith('--')) {
      if (!target) target = a
      else fail(`unexpected positional arg "${a}"`)
      continue
    }
    if (a === '--all-themes') { allThemes = true; continue }
    if (a === '--open') { openOpt = true; continue }
    if (a === '--no-open') { openOpt = false; continue }
    if (a === '--watch') { watch = true; continue }
    if (a === '--inject-reload') { injectReload = true; continue }
    const next = argv[i + 1]
    if (next === undefined || next.startsWith('--')) fail(`${a} expects a value`)
    if (a === '--theme') themeOpt = next
    else if (a === '--snippet') snippetOpt = next
    else if (a === '--out') outOpt = next
    else if (a === '--port') port = Number.parseInt(next, 10)
    else fail(`unknown flag ${a}`)
    i++
  }

  let kind = ''
  let id = ''
  if (list) {
    if (target) fail(`--list does not take positional arg (got "${target}")`)
    if (watch) fail('--list and --watch are mutually exclusive')
  } else {
    if (!target) {
      fail(
        'usage: preview-variant <kind>.<id> [--theme <id> | --all-themes] [--snippet <i|all>] [--out <path>] [--watch [--port <n>]] [--open]\n' +
        '       preview-variant list [--theme <id> | --all-themes] [--snippet <i|all>] [--no-open]\n' +
        '注：list 与 --list 等价；list 模式默认自动开浏览器，--no-open 抑制。',
      )
    }
    const sep = target.includes('.') ? '.' : target.includes('/') ? '/' : null
    if (!sep) fail(`target must be "<kind>.<id>" or "<kind>/<id>", got "${target}"`)
    ;[kind, id] = target.split(sep)
    if (!kind || !id) fail(`bad target "${target}"`)
  }

  const themes: string[] = allThemes
    ? ORDERED_SPECS.map((s) => s.id)
    : [themeOpt ?? 'default']
  for (const t of themes) {
    if (!ORDERED_SPECS.some((s) => s.id === t)) {
      fail(`unknown theme "${t}". Known: ${ORDERED_SPECS.map((s) => s.id).join(', ')}`)
    }
  }

  // list 模式优先速度：默认 --snippet 0（每个 variant 只渲一条），可被显式覆盖
  const effectiveSnippetOpt = list && snippetOpt === 'all' ? '0' : snippetOpt
  const snippetIndex: number | 'all' =
    effectiveSnippetOpt === 'all' ? 'all' : Number.parseInt(effectiveSnippetOpt, 10)
  if (snippetIndex !== 'all' && !Number.isInteger(snippetIndex)) {
    fail(`--snippet expects an integer or "all", got "${snippetOpt}"`)
  }

  const rawThemeFlags = allThemes
    ? ['--all-themes']
    : themeOpt
      ? ['--theme', themeOpt]
      : []

  const outPath = list
    ? resolve(process.cwd(), outOpt ?? '.preview/_index.html')
    : resolve(
        process.cwd(),
        outOpt ??
          `.preview/${kind}-${id}${allThemes ? '.all-themes' : themeOpt ? `.${themeOpt}` : ''}.html`,
      )
  // list 模式默认开浏览器：145 个 variant 不在浏览器看毫无意义。显式 --no-open 抑制（CI/管道场景）。
  const open = openOpt ?? list
  return { kind, id, themes, snippetIndex, outPath, open, watch, port, injectReload, rawThemeFlags, list }
}

export async function loadVariant(kind: string, id: string): Promise<AnyDef> {
  const path = resolve(process.cwd(), 'src/core/variants', kind, `${id}.ts`)
  if (!existsSync(path)) fail(`variant file not found: ${path}`)
  const mod = (await import(pathToFileURL(path).href)) as { default: AnyDef }
  if (!mod.default?.meta) fail(`${path} has no default-exported VariantDef`)
  if (mod.default.meta.id !== id) {
    fail(`variant id mismatch: file is "${id}" but meta.id is "${mod.default.meta.id}"`)
  }
  return mod.default
}

function pickSnippets(
  def: AnyDef,
  idx: number | 'all',
): readonly { presetId: string; name: string; description: string; markdown: string }[] {
  if (idx === 'all') return def.snippets
  const s = def.snippets[idx]
  if (!s) fail(`snippet index ${idx} out of range (have ${def.snippets.length})`)
  return [s]
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )
}

function renderSnippetBlock(
  themeId: string,
  snippet: { presetId: string; name: string; markdown: string },
): string {
  const { html } = render({ md: snippet.markdown, persona: themeId })
  return [
    `<div class="block">`,
    `  <div class="block-head">`,
    `    <span class="tag">${escapeHtml(themeId)}</span>`,
    `    <span class="snippet">${escapeHtml(snippet.name)} <code>${escapeHtml(snippet.presetId)}</code></span>`,
    `  </div>`,
    `  <details class="md"><summary>markdown</summary><pre>${escapeHtml(snippet.markdown)}</pre></details>`,
    `  <div class="stage">${html}</div>`,
    `</div>`,
  ].join('\n')
}

const RELOAD_SCRIPT = `
<script>
(() => {
  let es;
  const connect = () => {
    es = new EventSource('/__events');
    es.onmessage = (ev) => { if (ev.data === 'reload') location.reload(); };
    es.onerror = () => { es.close(); setTimeout(connect, 800); };
  };
  connect();
})();
</script>`

export function buildDocument(def: AnyDef, args: CliArgs): string {
  const snippets = pickSnippets(def, args.snippetIndex)
  const blocks: string[] = []
  for (const themeId of args.themes) {
    for (const s of snippets) blocks.push(renderSnippetBlock(themeId, s))
  }
  const title = `${def.meta.kind}.${def.meta.id} · ${def.meta.name}`
  return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)} · preview</title>
<style>
  body { margin: 0; background: #ececec; color: #1c1f24; font: 14px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; padding: 24px; }
  h1 { font-size: 18px; margin: 0 0 4px; }
  .meta { color: #777; font-size: 12px; margin-bottom: 24px; }
  .grid { display: flex; flex-wrap: wrap; gap: 24px; }
  .block { width: 375px; background: #fff; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); overflow: hidden; }
  .block-head { padding: 8px 12px; background: #f7f7f5; border-bottom: 1px solid #eee; display: flex; gap: 8px; align-items: center; font-size: 12px; }
  .tag { background: #1c1f24; color: #fff; padding: 2px 6px; border-radius: 3px; font-family: ui-monospace,SFMono-Regular,Menlo,monospace; }
  .snippet { color: #444; }
  .snippet code { background: #f0eee9; padding: 0 4px; border-radius: 2px; font-size: 11px; }
  details.md { padding: 6px 12px; border-bottom: 1px solid #f3f3f3; font-size: 12px; color: #666; }
  details.md pre { margin: 6px 0 0; padding: 8px; background: #faf8f4; border-radius: 3px; overflow: auto; white-space: pre-wrap; }
  .stage { padding: 16px; }
  .stage > section { max-width: 343px; }
</style>
</head>
<body>
<h1>${escapeHtml(title)}</h1>
<div class="meta">
  ${escapeHtml(def.meta.description)}
  ${'experimental' in def.meta && def.meta.experimental ? ' · <strong>experimental</strong>' : ''}
  · snippets: ${snippets.length}/${def.snippets.length}
  · themes: ${args.themes.length}
</div>
<div class="grid">
${blocks.join('\n')}
</div>
${args.injectReload ? RELOAD_SCRIPT : ''}
</body>
</html>
`
}

function openInBrowser(target: string): void {
  const platform = process.platform
  if (platform === 'win32')
    spawn('cmd', ['/c', 'start', '', target], { detached: true, stdio: 'ignore' }).unref()
  else if (platform === 'darwin')
    spawn('open', [target], { detached: true, stdio: 'ignore' }).unref()
  else spawn('xdg-open', [target], { detached: true, stdio: 'ignore' }).unref()
}

export interface ListEntry {
  kind: string
  def: AnyDef
  href: string
}

function listSinglePath(kind: string, id: string, args: CliArgs): string {
  const themeSuffix = args.themes.length === 1 && args.themes[0] !== 'default'
    ? `.${args.themes[0]}`
    : ''
  return resolve(process.cwd(), `.preview/${kind}-${id}${themeSuffix}.html`)
}

async function runListMode(args: CliArgs): Promise<void> {
  const variantsRoot = resolve(process.cwd(), 'src/core/variants')
  const kinds = readdirSync(variantsRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    .map((d) => d.name)
    .sort()

  const previewDir = resolve(args.outPath, '..')
  if (!existsSync(previewDir)) mkdirSync(previewDir, { recursive: true })

  const entries: ListEntry[] = []
  const t0 = Date.now()
  for (const kind of kinds) {
    const allPath = resolve(variantsRoot, kind, '_all.ts')
    if (!existsSync(allPath)) continue
    const mod = (await import(pathToFileURL(allPath).href)) as { default: AnyDef[] }
    for (const def of mod.default) {
      const id = def.meta.id
      const singlePath = listSinglePath(kind, id, args)
      const singleArgs: CliArgs = { ...args, kind, id, outPath: singlePath, list: false }
      const html = buildDocument(def, singleArgs)
      writeFileSync(singlePath, html, 'utf8')
      entries.push({ kind, def, href: `./${basename(singlePath)}` })
    }
  }
  const elapsed = Date.now() - t0

  const indexHtml = buildIndex(entries, args, elapsed)
  writeFileSync(args.outPath, indexHtml, 'utf8')
  process.stdout.write(
    `[preview-variant] list: ${entries.length} variants across ${kinds.length} kinds in ${elapsed}ms\n` +
      `[preview-variant] wrote ${args.outPath} (${(indexHtml.length / 1024).toFixed(1)} KB)\n`,
  )
}

export function buildIndex(entries: readonly ListEntry[], args: CliArgs, elapsedMs: number): string {
  const byKind = new Map<string, ListEntry[]>()
  for (const e of entries) {
    const arr = byKind.get(e.kind) ?? []
    arr.push(e)
    byKind.set(e.kind, arr)
  }
  const sections = [...byKind.entries()]
    .map(([kind, items]) => {
      const cards = items
        .map((e) => {
          const exp = e.def.meta.experimental
            ? `<span class="exp">experimental</span>`
            : ''
          const thumb = e.def.thumbnail ? e.def.thumbnail() : ''
          return [
            `<a class="card" href="${e.href}">`,
            `  <div class="thumb">${thumb}</div>`,
            `  <div class="name">${escapeHtml(e.def.meta.name)}${exp}</div>`,
            `  <code class="id">${escapeHtml(e.def.meta.id)}</code>`,
            `  <div class="desc">${escapeHtml(e.def.meta.description)}</div>`,
            `</a>`,
          ].join('\n')
        })
        .join('\n')
      return `<section class="kind">
  <h2>${escapeHtml(kind)} <small>${items.length}</small></h2>
  <div class="grid">${cards}</div>
</section>`
    })
    .join('\n')
  const themeLabel =
    args.themes.length === 1 ? args.themes[0] : `${args.themes.length} themes`
  return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>variant index · preview</title>
<style>
  body { margin: 0; background: #ececec; color: #1c1f24; font: 14px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; padding: 24px; }
  h1 { font-size: 18px; margin: 0 0 4px; }
  .meta { color: #777; font-size: 12px; margin-bottom: 24px; }
  section.kind { margin: 32px 0; }
  section.kind > h2 { font-size: 14px; margin: 0 0 12px; color: #444; text-transform: uppercase; letter-spacing: 1px; }
  section.kind > h2 > small { color: #aaa; font-size: 12px; font-weight: 400; margin-left: 6px; letter-spacing: 0; text-transform: none; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; }
  .card { display: block; background: #fff; border-radius: 6px; padding: 12px; text-decoration: none; color: inherit; box-shadow: 0 1px 3px rgba(0,0,0,0.06); transition: transform .12s, box-shadow .12s; }
  .card:hover { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.10); }
  .thumb { width: 75px; height: 75px; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; }
  .thumb svg { display: block; }
  .name { font-size: 13px; font-weight: 600; margin-bottom: 2px; display: flex; align-items: center; gap: 6px; }
  .id { font-size: 11px; color: #888; background: #f7f5f0; padding: 0 4px; border-radius: 2px; font-family: ui-monospace,SFMono-Regular,Menlo,monospace; display: inline-block; margin-bottom: 6px; }
  .desc { font-size: 11px; color: #666; line-height: 1.4; }
  .exp { background: #7c3aed; color: #fff; font-size: 9px; padding: 1px 4px; border-radius: 2px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; }
</style>
</head>
<body>
<h1>variant index</h1>
<div class="meta">
  ${entries.length} variants · ${byKind.size} kinds · theme: ${escapeHtml(themeLabel)} · built ${elapsedMs}ms
</div>
${sections}
</body>
</html>
`
}

async function renderOnce(args: CliArgs): Promise<void> {
  const def = await loadVariant(args.kind, args.id)
  const html = buildDocument(def, args)
  const outDir = resolve(args.outPath, '..')
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
  writeFileSync(args.outPath, html, 'utf8')
  process.stdout.write(
    `[preview-variant] wrote ${args.outPath} (${(html.length / 1024).toFixed(1)} KB)\n`,
  )
}

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
}

async function runWatchServer(args: CliArgs): Promise<void> {
  const previewDir = resolve(args.outPath, '..')
  const outFile = basename(args.outPath)
  const sseClients = new Set<ServerResponse>()

  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = req.url ?? '/'
    if (url === '/__events') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      })
      res.write('retry: 1000\n\n')
      sseClients.add(res)
      req.on('close', () => sseClients.delete(res))
      return
    }
    const path = url === '/' ? `/${outFile}` : url.split('?')[0]
    const filePath = resolve(previewDir, '.' + path)
    if (!filePath.startsWith(previewDir)) {
      res.writeHead(403).end('forbidden')
      return
    }
    try {
      const body = readFileSync(filePath)
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] ?? 'application/octet-stream' })
      res.end(body)
    } catch {
      res.writeHead(404).end('not found')
    }
  })

  await new Promise<void>((r) => server.listen(args.port, '127.0.0.1', r))

  const broadcast = (msg: string): void => {
    for (const c of sseClients) c.write(`data: ${msg}\n\n`)
  }

  const variantFile = resolve(process.cwd(), 'src/core/variants', args.kind, `${args.id}.ts`)
  const watchTargets = [
    resolve(process.cwd(), 'src/core/variants', args.kind),
    resolve(process.cwd(), 'src/core/variants/_core.ts'),
    resolve(process.cwd(), 'src/core/variants/_thumb.ts'),
    resolve(process.cwd(), 'src/core/themes'),
    resolve(process.cwd(), 'src/core/pipeline'),
  ]
  if (!existsSync(variantFile)) fail(`variant file not found: ${variantFile}`)

  // tsx 子进程路径：node_modules/tsx/dist/cli.mjs
  const requireFn = createRequire(import.meta.url)
  let tsxCli: string
  try {
    tsxCli = requireFn.resolve('tsx/dist/cli.mjs')
  } catch {
    try { tsxCli = requireFn.resolve('tsx/cli') } catch { fail('tsx not installed') }
  }

  let inflight: ChildProcess | null = null
  let pending = false
  const runChild = (): void => {
    if (inflight) { pending = true; return }
    const childArgs: string[] = [
      tsxCli,
      resolve(process.cwd(), 'tools/preview-variant.ts'),
      `${args.kind}.${args.id}`,
      ...args.rawThemeFlags,
      '--snippet', String(args.snippetIndex),
      '--out', args.outPath,
      '--inject-reload',
    ]
    inflight = spawn(process.execPath, childArgs, { stdio: ['ignore', 'inherit', 'inherit'] })
    inflight.on('exit', (code) => {
      inflight = null
      if (code === 0) broadcast('reload')
      else process.stderr.write(`[preview-variant] child exited code=${code}\n`)
      if (pending) { pending = false; runChild() }
    })
  }

  let debounceT: NodeJS.Timeout | null = null
  const scheduleRender = (path: string): void => {
    if (extname(path) !== '.ts') return
    if (debounceT) clearTimeout(debounceT)
    debounceT = setTimeout(() => {
      debounceT = null
      process.stdout.write(`[preview-variant] change: ${path}\n`)
      runChild()
    }, 150)
  }

  for (const target of watchTargets) {
    if (!existsSync(target)) continue
    const isDir = statSync(target).isDirectory()
    try {
      const w = fsWatch(target, { recursive: isDir, persistent: true }, (_e, filename) => {
        if (filename) scheduleRender(filename.toString())
      })
      w.on('error', (e) => process.stderr.write(`[preview-variant] watch err on ${target}: ${e.message}\n`))
    } catch (e) {
      process.stderr.write(`[preview-variant] watch failed on ${target}: ${(e as Error).message}\n`)
    }
  }

  const url = `http://127.0.0.1:${args.port}/`
  process.stdout.write(
    `[preview-variant] watching ${args.kind}.${args.id}, serving ${url}\n` +
      `[preview-variant] kill with Ctrl+C\n`,
  )
  if (args.open) openInBrowser(url)
  runChild()

  const shutdown = (): void => {
    for (const c of sseClients) try { c.end() } catch { /* noop */ }
    server.close(() => process.exit(0))
  }
  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  if (args.list) {
    await runListMode(args)
    if (args.open) openInBrowser(args.outPath)
  } else if (args.watch) {
    await runWatchServer(args)
  } else {
    await renderOnce(args)
    if (args.open) openInBrowser(args.outPath)
  }
}

// 仅作为 CLI 直接执行时启动 main——spec 文件 import 时跳过，避免 process.exit 污染。
const argv1 = process.argv[1]
if (argv1 && resolve(argv1) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    process.stderr.write(`[preview-variant] ${(e as Error).message}\n`)
    if ((e as Error).stack) process.stderr.write((e as Error).stack + '\n')
    process.exit(1)
  })
}
