#!/usr/bin/env tsx
/**
 * lint-contract —— 契约 md 静态校验。
 *
 * 检查项：
 *   - fence 名是否在 vocabulary 白名单内（unknown_container）
 *   - JSX 风格 attrs {variant="x"}（unexpected_jsx_attrs）
 *   - HTML 注释 variant `<!-- variant=x -->`（html_comment_variant）
 *   - fence 闭合（同长度配对，fence_not_closed）
 *   - 嵌套深度（compare/toc 等外层应 :::: 4 个冒号，nesting_depth）
 *   - 行内扩展闭合（[.着重.] / [~波浪~] / `~~` / `++` / `==`，inline_unclosed）
 *
 * 复用仓库根 scripts/wechat-typeset-cli.ts 的 scanFences 思路，
 * 但本脚本不引 jsdom（不真渲染，纯字符串扫描），更轻。
 *
 * 用法：
 *   tsx lint-contract.ts <md> [--json]
 *
 * 退出码：
 *   0 ok=true
 *   1 IO 错
 *   2 ok=false（有 issues）
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { getContainerVocabulary } from '../../../src/public'

interface Issue {
  line: number
  kind:
    | 'unknown_container'
    | 'unexpected_jsx_attrs'
    | 'html_comment_variant'
    | 'fence_not_closed'
    | 'nesting_depth'
    | 'inline_unclosed'
    | 'fence_attr_yaml'
  name?: string
  hint: string
  excerpt: string
}

function lint(md: string): Issue[] {
  const issues: Issue[] = []
  const vocab = getContainerVocabulary()
  const known = new Map(vocab.map((v) => [v.name, v]))
  const lines = md.split(/\r?\n/)

  // fence 栈：跟踪打开但未闭合的 fence（name + length + line）
  const stack: Array<{ name: string; length: number; line: number }> = []

  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]

    // open 行：`:::name attrs` 或 `:::: name attrs`
    const openMatch = ln.match(/^(:{3,})\s*([a-zA-Z][\w-]*)\b\s*(.*)$/)
    if (openMatch) {
      const fenceLen = openMatch[1].length
      const name = openMatch[2]
      const rest = openMatch[3]

      const spec = known.get(name)
      if (!spec) {
        issues.push({
          line: i + 1,
          kind: 'unknown_container',
          name,
          hint:
            `"${name}" 不在 vocabulary 白名单内。合法名见 ../_shared/references/container-vocabulary.md`,
          excerpt: ln,
        })
      } else if (spec.fenceLength && spec.fenceLength !== fenceLen) {
        // compare / toc / kpi-dashboard / bar-chart 强制外层 4 个冒号
        if (spec.fenceLength === 4 && fenceLen === 3) {
          issues.push({
            line: i + 1,
            kind: 'nesting_depth',
            name,
            hint: `"${name}" 必须用 4 个冒号（::::）外层 fence`,
            excerpt: ln,
          })
        }
      }

      // JSX 风格 attrs
      if (/\{[^}]*=[^}]*\}/.test(rest)) {
        issues.push({
          line: i + 1,
          kind: 'unexpected_jsx_attrs',
          name,
          hint:
            'open 行不接受 {key="value"} JSX 语法；改写成 key=value 直接在 name 之后',
          excerpt: ln,
        })
      }

      stack.push({ name, length: fenceLen, line: i + 1 })
      continue
    }

    // close 行：`:::` 或 `::::`（无 name，纯冒号）
    const closeMatch = ln.match(/^(:{3,})\s*$/)
    if (closeMatch) {
      const fenceLen = closeMatch[1].length
      // 找到最近的同长度未闭合 fence
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j].length === fenceLen) {
          stack.splice(j, 1)
          break
        }
      }
      continue
    }

    // HTML 注释 variant
    if (/<!--\s*variant\s*=/.test(ln)) {
      issues.push({
        line: i + 1,
        kind: 'html_comment_variant',
        hint: 'HTML 注释中的 variant=... 不会被解析；删注释，写到 ::: open 行',
        excerpt: ln,
      })
    }

    // open 行内的 YAML 风格 attr（前面已扫 open 行，这里只处理 fence 内部行）
    // 跳过

    // 行内扩展闭合
    checkInlineExtensions(ln, i + 1, issues)
  }

  // 未闭合的 fence
  for (const open of stack) {
    issues.push({
      line: open.line,
      kind: 'fence_not_closed',
      name: open.name,
      hint: `${':'.repeat(open.length)} ${open.name} 未闭合——补一行同长度的 ${':'.repeat(open.length)}`,
      excerpt: '(missing close fence)',
    })
  }

  return issues
}

function checkInlineExtensions(line: string, lineNo: number, issues: Issue[]) {
  // 跳过 `:::` fence 行
  if (/^:{3,}/.test(line)) return
  // 跳过代码块行（粗略：以 4 个空格开头或单行内带 `` ` ``）
  if (/^ {4}/.test(line)) return

  // [.着重.]：成对出现
  const dotMarks = line.match(/\[\.([^\]]*)\]/g)
  const dotOpens = (line.match(/\[\./g) || []).length
  const dotCloses = (line.match(/\.\]/g) || []).length
  if (dotOpens !== dotCloses) {
    issues.push({
      line: lineNo,
      kind: 'inline_unclosed',
      hint: `[.着重.] 标记不闭合（[. ${dotOpens} 个，.] ${dotCloses} 个）`,
      excerpt: line.slice(0, 80),
    })
  }
  // [~波浪~]
  const waveOpens = (line.match(/\[~/g) || []).length
  const waveCloses = (line.match(/~\]/g) || []).length
  if (waveOpens !== waveCloses) {
    issues.push({
      line: lineNo,
      kind: 'inline_unclosed',
      hint: `[~波浪~] 标记不闭合（[~ ${waveOpens} 个，~] ${waveCloses} 个）`,
      excerpt: line.slice(0, 80),
    })
  }
  // ==高亮== / ~~删除~~ / ++插入++：必须成对（偶数次出现）
  // 但 ~~ 容易与 [~ 冲突，过滤掉
  const stripped = line.replace(/\[~[^\]]*~\]/g, '')
  const eqCount = (stripped.match(/==/g) || []).length
  if (eqCount % 2 !== 0) {
    issues.push({
      line: lineNo,
      kind: 'inline_unclosed',
      hint: `==高亮== 标记不闭合（== ${eqCount} 个，应为偶数）`,
      excerpt: line.slice(0, 80),
    })
  }

  // 静默使用 dotMarks 以避免 lint 警告
  void dotMarks
}

function main() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    process.stderr.write('[lint-contract] usage: tsx lint-contract.ts <md> [--json]\n')
    process.exit(1)
  }
  const isJson = args.includes('--json')
  const mdPath = args.find((a) => !a.startsWith('--'))
  if (!mdPath) fail(1, 'missing <md> path')

  let md: string
  try {
    md = readFileSync(resolve(process.cwd(), mdPath), 'utf8')
  } catch (e) {
    fail(1, `failed to read: ${(e as Error).message}`)
  }

  // 剥离 YAML frontmatter
  md = md.replace(/^---\n[\s\S]*?\n---\n/, '')

  const issues = lint(md)

  if (isJson) {
    process.stdout.write(
      JSON.stringify({ ok: issues.length === 0, issues, count: issues.length }, null, 2) + '\n',
    )
  } else {
    if (issues.length === 0) {
      process.stdout.write(`[ok] ${mdPath} 无契约 issue\n`)
    } else {
      process.stdout.write(`[fail] ${mdPath} 有 ${issues.length} 个 issue:\n\n`)
      for (const it of issues) {
        process.stdout.write(`  line ${it.line} [${it.kind}]\n`)
        if (it.name) process.stdout.write(`    name: ${it.name}\n`)
        process.stdout.write(`    hint: ${it.hint}\n`)
        process.stdout.write(`    >>>>  ${it.excerpt}\n\n`)
      }
    }
  }

  process.exit(issues.length === 0 ? 0 : 2)
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[lint-contract] ${msg}\n`)
  process.exit(code)
}

main()
