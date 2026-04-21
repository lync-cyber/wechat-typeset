#!/usr/bin/env tsx
/**
 * Headless render / validate CLI —— 供 InkFlow 之类的外部流水线在 Node 下
 * 对 annotated markdown 做 dry-run（不依赖浏览器）。
 *
 * 用法：
 *   npx tsx scripts/wechat-typeset-cli.ts render --input <md> --persona <id> [--output <html>]
 *   npx tsx scripts/wechat-typeset-cli.ts validate --input <md> [--persona <id>]
 *
 * 退出码：
 *   0 成功
 *   1 参数/IO 错误
 *   2 persona id 不存在
 *   3 SpecValidationError
 *   4 render 阶段抛异常（容器语法错 / 未知 fence name / 嵌套不合法等）
 *
 * 为什么需要：微信排版的真实渲染发生在 Vue + 浏览器侧，但能否成功解析
 * 容器 fence 是纯 markdown-it + 注册表的事，完全 node 可跑。CI / 外部
 * agent 都应在 render 前跑一次 validate 防止把错误 fence 发下游。
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { JSDOM } from 'jsdom'

// wxPatch 里用了浏览器 DOMParser；Node 下缺，先用 jsdom 塞上再导入 pipeline。
// 与 tests/verify-sample-full.ts 同一套 stub——避免重复实现。
const dom = new JSDOM('', { url: 'http://localhost/' })
;(globalThis as unknown as { DOMParser: unknown }).DOMParser = dom.window.DOMParser
;(globalThis as unknown as { XMLSerializer: unknown }).XMLSerializer = dom.window.XMLSerializer
;(globalThis as unknown as { document: unknown }).document = dom.window.document
;(globalThis as unknown as { Node: unknown }).Node = dom.window.Node

const { render, listPersonas, SpecValidationError } = await import('../src/public')
const { CONTAINER_REGISTRY } = await import('../src/pipeline/containers')

interface FenceIssue {
  line: number
  kind: 'unknown_container' | 'unexpected_jsx_attrs' | 'html_comment_variant'
  name?: string
  hint: string
}

/**
 * markdown-it-container 对未注册的 fence 名静默当段落，所以"渲染成功"并不
 * 意味着 fence 合法。扫描 `:::[:]* <name>` 头，未知 name 报错；同时捕获
 * InkFlow 历史 bug：{variant="..."} JSX 属性与 <!-- variant=... --> HTML 注释。
 */
function scanFences(md: string): FenceIssue[] {
  const issues: FenceIssue[] = []
  const known = new Set(Object.keys(CONTAINER_REGISTRY))
  const lines = md.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]
    const open = ln.match(/^:{3,}\s*([a-zA-Z][\w-]*)/)
    if (open) {
      const name = open[1]
      if (!known.has(name)) {
        issues.push({
          line: i + 1,
          kind: 'unknown_container',
          name,
          hint: `"${name}" 不是合法容器名；合法清单：${[...known].sort().join(', ')}`,
        })
      }
      if (/\{[^}]*=[^}]*\}/.test(ln)) {
        issues.push({
          line: i + 1,
          kind: 'unexpected_jsx_attrs',
          name,
          hint: 'open 行使用 {key="value"} JSX 语法不被解析；改写成 key=value 直接写在 name 之后',
        })
      }
    }
    if (/<!--\s*variant\s*=/.test(ln)) {
      issues.push({
        line: i + 1,
        kind: 'html_comment_variant',
        hint: 'HTML 注释中的 variant=... 不会被解析；删除注释，在 ::: open 行写 variant=xxx',
      })
    }
  }
  return issues
}

interface CliArgs {
  cmd: 'render' | 'validate'
  input: string
  persona: string
  output?: string
}

function parseArgs(argv: string[]): CliArgs {
  const [cmd, ...rest] = argv.slice(2)
  if (cmd !== 'render' && cmd !== 'validate') {
    fail(1, `unknown command "${cmd ?? ''}"; expected render | validate`)
  }
  const out: Record<string, string> = {}
  for (let i = 0; i < rest.length; i++) {
    const k = rest[i]
    if (!k.startsWith('--')) fail(1, `expected flag, got "${k}"`)
    const v = rest[i + 1]
    if (v === undefined || v.startsWith('--')) fail(1, `flag ${k} expects a value`)
    out[k.slice(2)] = v
    i++
  }
  if (!out.input) fail(1, '--input <path> required')
  return {
    cmd,
    input: out.input,
    persona: out.persona ?? 'default',
    output: out.output,
  }
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[wechat-typeset-cli] ${msg}\n`)
  process.exit(code)
}

function emit(code: number, payload: Record<string, unknown>): never {
  process.stdout.write(JSON.stringify(payload, null, 2) + '\n')
  process.exit(code)
}

async function main() {
  const args = parseArgs(process.argv)
  const inputPath = resolve(process.cwd(), args.input)
  let md: string
  try {
    md = readFileSync(inputPath, 'utf8')
  } catch (e) {
    fail(1, `failed to read ${inputPath}: ${(e as Error).message}`)
  }

  // 剥离 YAML frontmatter；markdown-it 不识别会被当表格渲染。
  md = md.replace(/^---\n[\s\S]*?\n---\n/, '')

  const known = new Set(listPersonas().map((p) => p.id))
  if (!known.has(args.persona)) {
    emit(2, {
      ok: false,
      error: 'unknown_persona',
      persona: args.persona,
      known: [...known],
    })
  }

  const fenceIssues = scanFences(md)
  if (fenceIssues.length > 0) {
    emit(4, {
      ok: false,
      error: 'fence_syntax',
      issues: fenceIssues,
    })
  }

  try {
    const out = render({ md, persona: args.persona })
    if (args.cmd === 'validate') {
      emit(0, {
        ok: true,
        persona: args.persona,
        wordCount: out.wordCount,
        readingTime: out.readingTime,
        htmlLength: out.html.length,
      })
    }
    // render：写 HTML + 返回 meta
    if (args.output) {
      const outPath = resolve(process.cwd(), args.output)
      writeFileSync(outPath, out.html, 'utf8')
    } else {
      process.stdout.write(out.html)
    }
    process.exit(0)
  } catch (e) {
    if (e instanceof SpecValidationError) {
      emit(3, {
        ok: false,
        error: 'spec_validation',
        errors: e.result.errors,
      })
    }
    emit(4, {
      ok: false,
      error: 'render_failure',
      message: (e as Error).message,
      stack: (e as Error).stack,
    })
  }
}

main()
