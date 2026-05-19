#!/usr/bin/env tsx
/**
 * variant 源码 CSS 子集 lint runner（编译期前置守卫）。
 *
 *   pnpm tsx tools/lint-variant-css.ts                       扫全集
 *   pnpm tsx tools/lint-variant-css.ts --files <a.ts>,<b.ts> 指定文件
 *   pnpm tsx tools/lint-variant-css.ts --check               CI 模式：有任何 warning/error 即 exit 1
 *
 * 默认扫 `src/core/variants/` 下所有 .ts；跳过 _all.ts / _thumb.ts / userVariant*.ts 等聚合/工具文件。
 *
 * 检查规则见 [src/core/design-ir/lint-css.ts]（5 条 R1-R5）。
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { lintVariantCss, offsetToLine, type CssLintIssue } from '../src/core/design-ir/lint-css'

const __dirname_ = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname_, '..')

const SKIP_PATTERNS = [/_all\.ts$/, /_thumb\.ts$/, /^userVariant/, /tokenSchemaLookup\.ts$/, /usage\.ts$/, /registry\.ts$/, /_core\.ts$/]

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name)
    const st = statSync(abs)
    if (st.isDirectory()) walk(abs, out)
    else if (st.isFile() && abs.endsWith('.ts')) {
      const base = name
      if (SKIP_PATTERNS.some((p) => p.test(base))) continue
      out.push(abs)
    }
  }
  return out
}

interface CliArgs {
  check: boolean
  strict: boolean
  files: string[]
}

function parseArgs(argv: string[]): CliArgs {
  const out: CliArgs = { check: false, strict: false, files: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--check') out.check = true
    else if (a === '--strict') out.strict = true
    else if (a === '--files') {
      const next = argv[++i]
      if (next) out.files = next.split(',').map((s) => s.trim()).filter(Boolean)
    } else if (a === '--help' || a === '-h') {
      process.stdout.write(
        [
          'lint-variant-css —— variant CSS 子集前置守卫',
          '',
          'Options:',
          '  --check               error 即 exit 1（CI 推荐；warning 仅打印）',
          '  --strict              warning 或 error 都 exit 1',
          '  --files <a,b,...>     仅扫指定 ts（绝对或相对路径）',
          '',
          '默认（无参数）：打印报告但 exit 0，让本地调用观察整体健康度。',
          '',
        ].join('\n'),
      )
      process.exit(0)
    }
  }
  return out
}

interface FileReport {
  file: string
  issues: CssLintIssue[]
}

function main(): void {
  const args = parseArgs(process.argv.slice(2))
  const variantsRoot = resolve(repoRoot, 'src/core/variants')
  const files = args.files.length
    ? args.files.map((f) => (f.startsWith('/') || /^[a-zA-Z]:/.test(f) ? f : resolve(repoRoot, f)))
    : walk(variantsRoot)

  const reports: FileReport[] = []
  for (const f of files) {
    const src = readFileSync(f, 'utf8')
    const issues = lintVariantCss(src, { source: f })
    if (issues.length) reports.push({ file: f, issues })
  }

  let totalError = 0
  let totalWarning = 0
  for (const r of reports) {
    process.stdout.write(`\n── ${relative(repoRoot, r.file)}\n`)
    for (const i of r.issues) {
      const line = offsetToLine(readFileSync(r.file, 'utf8'), i.offset)
      process.stdout.write(
        `  [${i.severity}] L${line} ${i.rule} :: ${i.match}\n    ${i.hint}\n`,
      )
      if (i.severity === 'error') totalError++
      else if (i.severity === 'warning') totalWarning++
    }
  }
  process.stdout.write(
    `\n[lint-variant-css] 扫 ${files.length} 文件，error=${totalError} warning=${totalWarning}\n`,
  )
  if (args.strict && (totalError > 0 || totalWarning > 0)) process.exit(1)
  if (args.check && totalError > 0) process.exit(1)
}

main()
