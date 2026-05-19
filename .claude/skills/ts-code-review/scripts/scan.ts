#!/usr/bin/env node
// Main entry. Cross-platform; no bash / jq required.
//
// Usage:
//   npx ts-node scan.ts --mode full
//   npx ts-node scan.ts --mode branch-diff --base origin/main
//   npx ts-node scan.ts --mode pr --pr 123
//   npx ts-node scan.ts --mode single-file --files src/a.ts src/b.ts
//
// Optional:
//   --project tsconfig.json
//   --out review-report.json
//   --detectors knip,madge,ast      (whitelist)

import * as path from 'node:path'
import { buildContext } from './context.js'
import { runDetectors } from './detectors/index.js'
import { writeJson } from './util.js'
import type { ScanMode, ScanReport } from './types.js'

interface Args {
  mode: ScanMode
  project: string
  out: string
  root: string
  base?: string
  pr?: string
  files?: string[]
  detectors?: string[]
}

function parseArgs(argv: string[]): Args {
  const get = (k: string): string | undefined => {
    const i = argv.indexOf(`--${k}`)
    return i >= 0 ? argv[i + 1] : undefined
  }
  const getList = (k: string): string[] | undefined => {
    const i = argv.indexOf(`--${k}`)
    if (i < 0) return undefined
    const out: string[] = []
    for (let j = i + 1; j < argv.length && !argv[j].startsWith('--'); j++) out.push(argv[j])
    return out
  }

  const mode = (get('mode') as ScanMode) ?? 'full'
  return {
    mode,
    project: get('project') ?? 'tsconfig.json',
    out: get('out') ?? 'review-report.json',
    root: get('root') ?? '.',
    base: get('base'),
    pr: get('pr'),
    files: getList('files'),
    detectors: get('detectors')?.split(','),
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const start = Date.now()

  process.stdout.write(`scan.ts: mode=${args.mode}, project=${args.project}\n`)

  const ctx = await buildContext({
    root: path.resolve(args.root),
    tsconfig: args.project,
    mode: args.mode,
    base: args.base,
    pr: args.pr,
    files: args.files,
  })

  process.stdout.write(
    `  stack: ${describeStack(ctx.stack)} | files in scope: ${ctx.files.length}\n`,
  )
  if (ctx.diffRange) {
    process.stdout.write(`  diff: ${ctx.diffRange.base} -> HEAD, ${ctx.diffRange.changedFiles.length} files\n`)
  }
  if (ctx.conventions) {
    process.stdout.write(`  conventions loaded (${ctx.conventions.length} chars)\n`)
  }

  const issues = await runDetectors(ctx, args.detectors)
  const baseline = computeBaseline(issues)
  const report: ScanReport = {
    generatedAt: new Date().toISOString(),
    mode: args.mode,
    stack: ctx.stack,
    conventions: ctx.conventions,
    issues,
    baseline,
    diffRange: ctx.diffRange,
  }

  const outPath = path.resolve(args.root, args.out)
  await writeJson(outPath, report)

  printSummary(report, Date.now() - start)
  process.stdout.write(`\nreport: ${outPath}\nnext: npx ts-node priority.ts && npx ts-node report.ts\n`)
}

function describeStack(s: ScanReport['stack']): string {
  const flags = [
    s.hasReact && 'react',
    s.hasVue && 'vue',
    s.hasNest && 'nest',
    s.hasNext && 'next',
    s.hasVite && 'vite',
    s.hasMonorepo && 'monorepo',
  ].filter(Boolean)
  return flags.length ? flags.join(',') : 'plain-ts'
}

function computeBaseline(issues: ScanReport['issues']): ScanReport['baseline'] {
  return {
    typeErrors: issues.filter((i) => i.kind === 'type-error').length,
    deadExports: issues.filter((i) => i.kind === 'dead-export').length,
    circularDeps: new Set(
      issues
        .filter((i) => i.kind === 'circular-dep')
        .map((i) => JSON.stringify((i.meta as { cycle?: string[] })?.cycle ?? [])),
    ).size,
    testCount: issues.filter((i) => i.kind === 'test-only' || i.kind === 'test-skip').length,
  }
}

function printSummary(r: ScanReport, ms: number) {
  const byKind = new Map<string, number>()
  for (const i of r.issues) byKind.set(i.kind, (byKind.get(i.kind) ?? 0) + 1)
  const lines = [...byKind.entries()].sort((a, b) => b[1] - a[1])
  process.stdout.write(`\nfindings (${r.issues.length} total in ${ms}ms):\n`)
  for (const [k, n] of lines) process.stdout.write(`  ${n.toString().padStart(5)}  ${k}\n`)
}

main().catch((err) => {
  process.stderr.write(`scan failed: ${err?.stack ?? err}\n`)
  process.exit(1)
})
