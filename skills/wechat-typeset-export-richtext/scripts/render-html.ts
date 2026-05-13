#!/usr/bin/env tsx
/**
 * render-html —— annotated md + persona → 微信富文本 HTML。
 *
 * 与仓库根 scripts/wechat-typeset-cli.ts render 子命令的差异：
 *   - --meta 模式仅打印元数据（wordCount / readingTime / patchLog 摘要 / html_length）
 *   - --no-svg-white-bg 关闭 wxPatch 的 svgWhiteBg 步骤（默认开启）
 *   - 输出始终经过 wxPatch（运行时改写不可关闭，只能配 svgWhiteBg；详见
 *     ../_shared/references/hard-rules.md 与 references/wxpatch-behavior.md）
 *
 * 用法：
 *   tsx render-html.ts --input <md> --persona <id> [--output <html>] [--meta] [--no-svg-white-bg]
 *
 * 退出码：
 *   0 成功
 *   1 IO / 参数错
 *   2 unknown persona
 *   3 SpecValidationError
 *   4 render 抛异常（容器语法错等）
 */

import './_node-shim'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, listPersonas, SpecValidationError } from '../../../src/public'

interface CliArgs {
  input: string
  persona: string
  output?: string
  meta: boolean
  svgWhiteBg: boolean
}

function parseArgs(argv: string[]): CliArgs {
  const flags: Record<string, string> = {}
  let meta = false
  let svgWhiteBg = true
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i]
    if (k === '--meta') meta = true
    else if (k === '--no-svg-white-bg') svgWhiteBg = false
    else if (k.startsWith('--')) {
      const v = argv[++i]
      if (v === undefined || v.startsWith('--')) fail(1, `flag ${k} expects a value`)
      flags[k.slice(2)] = v
    } else {
      fail(1, `expected flag, got "${k}"`)
    }
  }
  if (!flags.input) fail(1, '--input <md> required')
  if (!flags.persona) fail(1, '--persona <id> required')
  return {
    input: flags.input,
    persona: flags.persona,
    output: flags.output,
    meta,
    svgWhiteBg,
  }
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[render-html] ${msg}\n`)
  process.exit(code)
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

  const known = new Set(listPersonas().map((p) => p.id))
  if (!known.has(args.persona)) {
    process.stderr.write(
      `[render-html] unknown persona "${args.persona}". Known: ${[...known].join(', ')}\n`,
    )
    process.exit(2)
  }

  try {
    const out = render({
      md,
      persona: args.persona,
      wxPatch: { svgWhiteBg: args.svgWhiteBg },
    })

    const patchSummary = Object.fromEntries(
      Object.entries(out.patchLog ?? {}).map(([k, v]) => [
        k,
        Array.isArray(v) ? v.length : (v as { count?: number } | undefined)?.count ?? 0,
      ]),
    )

    const meta = {
      ok: true,
      persona: args.persona,
      word_count: out.wordCount,
      reading_time_min: out.readingTime,
      html_length: out.html.length,
      svg_white_bg: args.svgWhiteBg,
      patch_summary: patchSummary,
    }

    if (args.meta) {
      process.stdout.write(JSON.stringify(meta, null, 2) + '\n')
      return
    }
    if (args.output) {
      writeFileSync(resolve(process.cwd(), args.output), out.html, 'utf8')
      process.stderr.write(`[render-html] wrote ${args.output} (${out.html.length} bytes)\n`)
      process.stdout.write(JSON.stringify(meta, null, 2) + '\n')
    } else {
      process.stdout.write(out.html)
    }
  } catch (e) {
    if (e instanceof SpecValidationError) {
      process.stdout.write(
        JSON.stringify({ ok: false, error: 'spec_validation', errors: e.result.errors }, null, 2) +
          '\n',
      )
      process.exit(3)
    }
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

main()
