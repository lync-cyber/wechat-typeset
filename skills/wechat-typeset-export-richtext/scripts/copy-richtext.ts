#!/usr/bin/env tsx
/**
 * copy-richtext —— annotated md + persona → 系统剪贴板（富文本 HTML）。
 *
 * 设计：
 *   - 富文本剪贴板需要 HTML 格式（公众号编辑器消费 text/html MIME）
 *   - Node 环境下没有原生剪贴板 API；用平台命令兜底：
 *       * macOS: pbcopy + osascript 包装 HTML 写入 NSPasteboard 的 'public.html'
 *       * Windows: PowerShell Set-Clipboard -AsHtml（Win10+）
 *       * Linux: xclip / wl-copy（按环境探测，缺则报错）
 *   - 失败时落盘到 tmp 文件并提示作者手动 Cmd+A + Cmd+C
 *
 * 用法：
 *   tsx copy-richtext.ts --input <md> --persona <id> [--save-fallback <path>]
 *
 * 退出码：
 *   0 复制成功（或落盘成功）
 *   1 IO / 参数错
 *   2 unknown persona
 *   4 render 失败
 *   5 平台不支持且未指定 --save-fallback
 */

import './_node-shim'
import { execSync, spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { render, listPersonas } from '../../../src/public'

interface CliArgs {
  input: string
  persona: string
  saveFallback?: string
}

function parseArgs(argv: string[]): CliArgs {
  const flags: Record<string, string> = {}
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i]
    if (!k.startsWith('--')) fail(1, `expected flag, got "${k}"`)
    const v = argv[++i]
    if (v === undefined || v.startsWith('--')) fail(1, `flag ${k} expects a value`)
    flags[k.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = v
  }
  if (!flags.input) fail(1, '--input <md> required')
  if (!flags.persona) fail(1, '--persona <id> required')
  return { input: flags.input, persona: flags.persona, saveFallback: flags.saveFallback }
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[copy-richtext] ${msg}\n`)
  process.exit(code)
}

/** macOS：用 osascript 把 HTML 字节写到 NSPasteboard 的 'public.html' type */
function copyOnMac(html: string): boolean {
  // 1) 先尝试 pbcopy 路径：硬编码 hex header 让 pbcopy 写 HTML（Apple 文档方式）
  //    详见 https://www.bdunagan.com/2010/01/03/copy-html-to-the-clipboard-from-the-command-line-on-mac-os-x/
  try {
    const hexHtml = Buffer.from(html, 'utf8').toString('hex').toUpperCase()
    // 格式：{«class HTML», «hex»}  → 写入 NSPasteboard
    const osascript = `set the clipboard to «data HTML${hexHtml}»`
    const r = spawnSync('osascript', ['-e', osascript], { encoding: 'utf8' })
    if (r.status === 0) return true
    process.stderr.write(`[copy-richtext] osascript failed: ${r.stderr}\n`)
    return false
  } catch (e) {
    process.stderr.write(`[copy-richtext] osascript error: ${(e as Error).message}\n`)
    return false
  }
}

/** Windows：PowerShell Set-Clipboard -AsHtml（Win10+） */
function copyOnWin(html: string): boolean {
  try {
    // -AsHtml 在 PowerShell 5+ 才有；先用 Set-Clipboard，不支持就降级 clip.exe
    const ps = `
$html = [Console]::In.ReadToEnd()
try {
  Set-Clipboard -Value $html -AsHtml
  exit 0
} catch {
  $html | clip
  exit 0
}
`
    const r = spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', ps], {
      input: html,
      encoding: 'utf8',
    })
    return r.status === 0
  } catch {
    return false
  }
}

/** Linux：探测 xclip / wl-copy */
function copyOnLinux(html: string): boolean {
  // wl-copy（Wayland）
  if (which('wl-copy')) {
    try {
      const r = spawnSync('wl-copy', ['--type', 'text/html'], { input: html, encoding: 'utf8' })
      if (r.status === 0) return true
    } catch {}
  }
  // xclip（X11）
  if (which('xclip')) {
    try {
      const r = spawnSync('xclip', ['-selection', 'clipboard', '-t', 'text/html'], {
        input: html,
        encoding: 'utf8',
      })
      if (r.status === 0) return true
    } catch {}
  }
  return false
}

function which(cmd: string): boolean {
  try {
    execSync(`command -v ${cmd}`, { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

function copyToClipboard(html: string): { ok: boolean; method: string } {
  const platform = process.platform
  if (platform === 'darwin') return { ok: copyOnMac(html), method: 'osascript' }
  if (platform === 'win32') return { ok: copyOnWin(html), method: 'powershell-set-clipboard' }
  if (platform === 'linux') return { ok: copyOnLinux(html), method: 'xclip|wl-copy' }
  return { ok: false, method: 'unsupported' }
}

function main() {
  const args = parseArgs(process.argv)

  const known = new Set(listPersonas().map((p) => p.id))
  if (!known.has(args.persona)) {
    process.stderr.write(
      `[copy-richtext] unknown persona "${args.persona}". Known: ${[...known].join(', ')}\n`,
    )
    process.exit(2)
  }

  let md: string
  try {
    md = readFileSync(resolve(process.cwd(), args.input), 'utf8')
  } catch (e) {
    fail(1, `failed to read input: ${(e as Error).message}`)
  }
  md = md.replace(/^---\n[\s\S]*?\n---\n/, '')

  let html: string
  try {
    const out = render({ md, persona: args.persona })
    html = out.html
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

  const result = copyToClipboard(html)
  if (result.ok) {
    process.stdout.write(
      JSON.stringify(
        {
          ok: true,
          persona: args.persona,
          method: result.method,
          html_length: html.length,
          hint: '已写入剪贴板。打开公众号编辑器 → 把光标放在正文首段 → ⌘+V / Ctrl+V',
        },
        null,
        2,
      ) + '\n',
    )
    return
  }

  // fallback：落盘
  const fallback =
    args.saveFallback ?? resolve(tmpdir(), `wechat-typeset-${Date.now()}.html`)
  writeFileSync(fallback, html, 'utf8')
  process.stdout.write(
    JSON.stringify(
      {
        ok: true,
        persona: args.persona,
        method: 'file_fallback',
        clipboard_supported: false,
        platform: process.platform,
        fallback_file: fallback,
        hint:
          `当前平台 (${process.platform}) 自动复制失败。HTML 已落盘到上述文件。` +
          `用浏览器打开 → ⌘+A 全选 → ⌘+C 复制 → 粘贴到公众号编辑器。`,
      },
      null,
      2,
    ) + '\n',
  )
  if (!args.saveFallback) {
    process.exit(0) // 已落 tmpdir，视为成功
  }
}

main()
