#!/usr/bin/env node
// Render review-report.json + priority-report.json into a human-readable
// markdown brief. The LLM can also read this directly and produce a summary.

import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import { readJsonSafe } from './util.js'
import type { Issue, ScanReport } from './types.js'

interface PriorityOut {
  files: Array<{ file: string; score: number; tier: string; issues: string[] }>
  summary: { total: number; high: number; medium: number; low: number }
}

interface Args {
  root: string
  report: string
  priority: string
  out: string
  topN: number
}

function parseArgs(argv: string[]): Args {
  const get = (k: string) => {
    const i = argv.indexOf(`--${k}`)
    return i >= 0 ? argv[i + 1] : undefined
  }
  return {
    root: get('root') ?? '.',
    report: get('report') ?? 'review-report.json',
    priority: get('priority') ?? 'priority-report.json',
    out: get('out') ?? 'review-report.md',
    topN: Number(get('top') ?? '15'),
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const root = path.resolve(args.root)
  const report = await readJsonSafe<ScanReport | null>(path.join(root, args.report), null)
  if (!report) {
    process.stderr.write('review-report.json missing\n')
    process.exit(1)
  }
  const priority = await readJsonSafe<PriorityOut | null>(path.join(root, args.priority), null)

  const md = render(report, priority, args.topN)
  await fs.writeFile(path.join(root, args.out), md, 'utf-8')
  process.stdout.write(`wrote ${args.out} (${md.length} chars)\n`)
}

function render(report: ScanReport, priority: PriorityOut | null, topN: number): string {
  const lines: string[] = []
  const byFile = new Map<string, Issue[]>()
  for (const i of report.issues) {
    if (!byFile.has(i.file)) byFile.set(i.file, [])
    byFile.get(i.file)!.push(i)
  }
  const byKind = new Map<string, number>()
  for (const i of report.issues) byKind.set(i.kind, (byKind.get(i.kind) ?? 0) + 1)

  lines.push(`# Code Review Report`)
  lines.push('')
  lines.push(`- Generated: ${report.generatedAt}`)
  lines.push(`- Mode: \`${report.mode}\``)
  if (report.diffRange) {
    lines.push(`- Diff: \`${report.diffRange.base}...HEAD\`, ${report.diffRange.changedFiles.length} files`)
  }
  lines.push(`- Stack: ${stackLine(report.stack)}`)
  lines.push(`- Files with findings: ${byFile.size}`)
  lines.push(`- Total findings: ${report.issues.length}`)
  lines.push('')

  lines.push(`## Findings by kind`)
  lines.push('')
  lines.push('| Kind | Count |')
  lines.push('|---|---:|')
  for (const [k, n] of [...byKind.entries()].sort((a, b) => b[1] - a[1])) {
    lines.push(`| \`${k}\` | ${n} |`)
  }
  lines.push('')

  if (priority?.files.length) {
    lines.push(`## Priority files (top ${topN})`)
    lines.push('')
    lines.push('| Tier | Score | File | Issues |')
    lines.push('|---|---:|---|---|')
    for (const p of priority.files.slice(0, topN)) {
      lines.push(`| ${p.tier} | ${p.score} | \`${p.file}\` | ${p.issues.slice(0, 4).join(', ')} |`)
    }
    lines.push('')
  }

  // Findings grouped by file, sorted by priority tier when available
  const tierByFile = new Map(priority?.files.map((p) => [p.file, p.tier]) ?? [])
  const filesSorted = [...byFile.entries()].sort((a, b) => {
    const ta = (tierByFile.get(a[0]) ?? 'z') as string
    const tb = (tierByFile.get(b[0]) ?? 'z') as string
    return ta.localeCompare(tb) || b[1].length - a[1].length
  })

  lines.push(`## Findings by file`)
  lines.push('')
  for (const [file, issues] of filesSorted.slice(0, topN)) {
    const tier = tierByFile.get(file)
    lines.push(`### \`${file}\`${tier ? `  (${tier})` : ''}`)
    for (const i of issues.sort((a, b) => (a.line ?? 0) - (b.line ?? 0))) {
      const loc = i.line ? `L${i.line}` : '-'
      const sev = i.severity === 'error' ? '!!' : i.severity === 'warn' ? '!' : ''
      lines.push(`- ${loc} ${sev} **${i.kind}** (${i.detector}, conf ${i.confidence}) — ${i.evidence}${i.suggestion ? `  _→ ${i.suggestion}_` : ''}`)
    }
    lines.push('')
  }

  if (byFile.size > topN) {
    lines.push(`_…and ${byFile.size - topN} more files with findings; see \`review-report.json\` for full list._`)
  }

  return lines.join('\n')
}

function stackLine(s: ScanReport['stack']): string {
  const flags = [
    s.hasReact && 'react',
    s.hasVue && 'vue',
    s.hasNest && 'nest',
    s.hasNext && 'next',
    s.hasVite && 'vite',
    s.hasMonorepo && 'monorepo',
    s.hasESLint && 'eslint',
  ]
    .filter(Boolean)
    .join(', ')
  return `${s.packageManager} | ${flags || 'plain-ts'} | tests: ${s.testRunner}`
}

main().catch((err) => {
  process.stderr.write(`report failed: ${err?.stack ?? err}\n`)
  process.exit(1)
})
