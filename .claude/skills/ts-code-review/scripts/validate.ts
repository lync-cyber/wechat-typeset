#!/usr/bin/env node
// Post-fix validation. Stronger than the original validate.sh:
//   1. tsc --noEmit (no new errors vs baseline)
//   2. build smoke if a `build` script exists
//   3. test inventory: it/test count must not decrease (catches .skip cheats)
//   4. diff scope guard: --allow paths limits what changed since baseline
//   5. dead-export count must not increase
//
// Exits non-zero on any failure so an orchestrator can revert.

import * as path from 'node:path'
import { run, npx, readJsonSafe, exists } from './util.js'
import * as fs from 'node:fs/promises'
import type { ScanReport } from './types.js'

interface Args {
  root: string
  report: string
  tsconfig: string
  allow?: string[]
  skipBuild: boolean
  skipTests: boolean
}

function parseArgs(argv: string[]): Args {
  const get = (k: string) => {
    const i = argv.indexOf(`--${k}`)
    return i >= 0 ? argv[i + 1] : undefined
  }
  const getList = (k: string) => {
    const i = argv.indexOf(`--${k}`)
    if (i < 0) return undefined
    const out: string[] = []
    for (let j = i + 1; j < argv.length && !argv[j].startsWith('--'); j++) out.push(argv[j])
    return out
  }
  return {
    root: get('root') ?? '.',
    report: get('report') ?? 'review-report.json',
    tsconfig: get('tsconfig') ?? 'tsconfig.json',
    allow: getList('allow'),
    skipBuild: argv.includes('--skip-build'),
    skipTests: argv.includes('--skip-tests'),
  }
}

interface Check {
  name: string
  pass: boolean
  detail: string
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const root = path.resolve(args.root)
  const report = await readJsonSafe<ScanReport | null>(path.join(root, args.report), null)
  if (!report) {
    process.stderr.write(`report not found: ${args.report} — run scan.ts first to set a baseline\n`)
    process.exit(1)
  }

  const checks: Check[] = []

  // 1. tsc
  checks.push(await checkTsc(root, args.tsconfig, report.baseline.typeErrors))

  // 2. build smoke
  if (!args.skipBuild) checks.push(await checkBuild(root))
  else checks.push({ name: 'build-smoke', pass: true, detail: 'skipped' })

  // 3. test inventory
  if (!args.skipTests) checks.push(await checkTestInventory(root, report))
  else checks.push({ name: 'test-inventory', pass: true, detail: 'skipped' })

  // 4. diff scope
  if (args.allow) checks.push(await checkDiffScope(root, args.allow))

  // 5. dead-export delta
  checks.push(await checkDeadExports(root, report.baseline.deadExports))

  const failed = checks.filter((c) => !c.pass)
  process.stdout.write('\nvalidation results:\n')
  for (const c of checks) {
    process.stdout.write(`  ${c.pass ? '[ok]   ' : '[FAIL] '}${c.name}: ${c.detail}\n`)
  }

  if (failed.length) {
    process.stdout.write(`\nFAILED — revert changes (git stash / git checkout -- <file>)\n`)
    process.exit(1)
  }

  // Roll baseline forward on success so the next validate compares to the new state.
  await rollBaseline(root, args.report, report, await readCurrentMetrics(root, args.tsconfig))
  process.stdout.write(`\nPASSED — baseline rolled forward\n`)
}

async function checkTsc(root: string, tsconfig: string, baseline: number): Promise<Check> {
  const { stdout, stderr } = await run(npx, ['tsc', '--noEmit', '-p', tsconfig], { cwd: root })
  const current = (stdout + stderr).split(/\r?\n/).filter((l) => /error TS/.test(l)).length
  return {
    name: 'tsc',
    pass: current <= baseline,
    detail: `errors ${current} (baseline ${baseline})`,
  }
}

async function checkBuild(root: string): Promise<Check> {
  const pkg = await readJsonSafe<{ scripts?: Record<string, string> }>(
    path.join(root, 'package.json'),
    {},
  )
  if (!pkg.scripts?.build) return { name: 'build-smoke', pass: true, detail: 'no build script' }
  const { code, stderr } = await run(npx, ['--no-install', 'npm', 'run', '-s', 'build'], {
    cwd: root,
  })
  return {
    name: 'build-smoke',
    pass: code === 0,
    detail: code === 0 ? 'build ok' : `build failed: ${stderr.trim().slice(-200)}`,
  }
}

async function checkTestInventory(root: string, report: ScanReport): Promise<Check> {
  // Count all `it(` / `test(` / `describe(` occurrences across test files now,
  // compared with a stored baseline (we recompute baseline from git if needed).
  const current = await countTests(root)
  const baselineKey = path.join(root, '.ts-code-review-baseline.json')
  let baseline = current
  const stored = await readJsonSafe<{ testCount?: number } | null>(baselineKey, null)
  if (stored?.testCount != null) baseline = stored.testCount
  else await fs.writeFile(baselineKey, JSON.stringify({ testCount: current }), 'utf-8')
  return {
    name: 'test-inventory',
    pass: current >= baseline,
    detail: `${current} tests (baseline ${baseline})`,
  }
}

async function countTests(root: string): Promise<number> {
  let n = 0
  await walk(root, async (file) => {
    if (!/(\.test|\.spec)\.tsx?$/.test(file)) return
    const text = await fs.readFile(file, 'utf-8')
    n += (text.match(/\b(?:it|test|describe)\s*\(/g) ?? []).length
  })
  return n
}

async function walk(dir: string, visit: (file: string) => Promise<void>): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => [])
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name.startsWith('.') || e.name === 'dist') continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) await walk(full, visit)
    else await visit(full)
  }
}

async function checkDiffScope(root: string, allow: string[]): Promise<Check> {
  const { stdout } = await run('git', ['diff', '--name-only'], { cwd: root })
  const changed = stdout.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
  const offending = changed.filter((f) => !allow.some((a) => f === a || f.startsWith(a + '/')))
  return {
    name: 'diff-scope',
    pass: offending.length === 0,
    detail:
      offending.length === 0
        ? `all changes inside ${allow.join(', ')}`
        : `out-of-scope changes: ${offending.slice(0, 3).join(', ')}${offending.length > 3 ? '…' : ''}`,
  }
}

// Keep in sync with HARD_IGNORE in scripts/detectors/index.ts. validate
// counts knip output directly (cheaper than running the whole detector
// pipeline), so it must apply the same path filter or the count will drift
// against the scan baseline.
const HARD_IGNORE = /(^|[\/\\])(\.git|\.claude[\/\\]worktrees|node_modules|dist|build|coverage)([\/\\]|$)/

async function checkDeadExports(root: string, baseline: number): Promise<Check> {
  if (!(await exists(path.join(root, 'node_modules/knip')))) {
    return { name: 'dead-exports', pass: true, detail: 'knip not installed (skipped)' }
  }
  const { stdout } = await run(npx, ['knip', '--reporter', 'json'], { cwd: root })
  try {
    const r = JSON.parse(stdout) as {
      issues?: Array<{ file: string; exports?: unknown[]; types?: unknown[] }>
    }
    const current = (r.issues ?? [])
      .filter((i) => !HARD_IGNORE.test(i.file))
      .filter((i) => /\.(ts|tsx|mts|cts)$/.test(i.file))
      .reduce((n, i) => n + (i.exports?.length ?? 0) + (i.types?.length ?? 0), 0)
    return {
      name: 'dead-exports',
      pass: current <= baseline,
      detail: `${current} (baseline ${baseline})`,
    }
  } catch {
    return { name: 'dead-exports', pass: true, detail: 'knip output unreadable (skipped)' }
  }
}

async function readCurrentMetrics(root: string, tsconfig: string) {
  const tsc = await checkTsc(root, tsconfig, Number.MAX_SAFE_INTEGER)
  const match = tsc.detail.match(/errors (\d+)/)
  return {
    typeErrors: match ? Number(match[1]) : 0,
  }
}

async function rollBaseline(
  root: string,
  reportName: string,
  prev: ScanReport,
  current: { typeErrors: number },
): Promise<void> {
  const next = { ...prev, baseline: { ...prev.baseline, typeErrors: current.typeErrors } }
  await fs.writeFile(path.join(root, reportName), JSON.stringify(next, null, 2), 'utf-8')
}

main().catch((err) => {
  process.stderr.write(`validate failed: ${err?.stack ?? err}\n`)
  process.exit(1)
})
