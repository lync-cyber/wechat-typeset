#!/usr/bin/env node
// Score every file mentioned in review-report.json by impact × risk.
// Cross-platform replacement for priority.sh.
//
// Scoring components are normalised to [0,1] and re-normalised when any
// component is unavailable (e.g. no coverage data), so absent inputs don't
// silently pull scores toward zero.

import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { run, readJsonSafe, writeJson } from './util.js'
import type { Issue, ScanReport } from './types.js'

interface FileScore {
  file: string
  score: number
  impact: number
  risk: number
  churn: number
  coverage: number | null
  issues: string[]
  tier: 'high' | 'medium' | 'low'
}

interface PriorityOut {
  generatedAt: string
  summary: { total: number; high: number; medium: number; low: number }
  files: FileScore[]
}

interface Args {
  root: string
  report: string
  out: string
  coverage?: string
  churnWindow: string
}

function parseArgs(argv: string[]): Args {
  const get = (k: string): string | undefined => {
    const i = argv.indexOf(`--${k}`)
    return i >= 0 ? argv[i + 1] : undefined
  }
  return {
    root: get('root') ?? '.',
    report: get('report') ?? 'review-report.json',
    out: get('out') ?? 'priority-report.json',
    coverage: get('coverage'),
    churnWindow: get('window') ?? '90.days',
  }
}

async function readChurn(root: string, window: string): Promise<Map<string, number>> {
  const { stdout } = await run('git', ['log', `--since=${window.replace('.', ' ')} ago`, '--format=format:', '--name-only'], { cwd: root })
  const counts = new Map<string, number>()
  for (const raw of stdout.split(/\r?\n/)) {
    const f = raw.trim()
    if (!f || !/\.(ts|tsx)$/.test(f)) continue
    counts.set(f, (counts.get(f) ?? 0) + 1)
  }
  return counts
}

interface CoverageRecord {
  s?: Record<string, number>
}

async function readCoverage(p?: string): Promise<Map<string, number> | null> {
  if (!p) return null
  const data = await readJsonSafe<Record<string, CoverageRecord>>(p, {})
  const out = new Map<string, number>()
  for (const [file, rec] of Object.entries(data)) {
    if (!rec?.s) continue
    const hits = Object.values(rec.s).filter((n) => n > 0).length
    const total = Object.keys(rec.s).length
    if (total > 0) out.set(file, (hits / total) * 100)
  }
  return out
}

function indexByFile<T extends { file: string }>(issues: T[]): Map<string, T[]> {
  const m = new Map<string, T[]>()
  for (const i of issues) {
    if (!m.has(i.file)) m.set(i.file, [])
    m.get(i.file)!.push(i)
  }
  return m
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const root = path.resolve(args.root)

  const report = await readJsonSafe<ScanReport | null>(path.join(root, args.report), null)
  if (!report) {
    process.stderr.write(`report not found: ${args.report} — run scan.ts first\n`)
    process.exit(1)
  }

  const churn = await readChurn(root, args.churnWindow)
  const coverage = await readCoverage(args.coverage ? path.resolve(root, args.coverage) : undefined)

  const issuesByFile = indexByFile(report.issues)
  const deadFiles = new Set(report.issues.filter((i) => i.kind === 'dead-file').map((i) => i.file))

  const maxChurn = Math.max(1, ...churn.values())

  const scores: FileScore[] = []
  for (const [file, issues] of issuesByFile) {
    if (deadFiles.has(file)) continue // already destined for deletion
    if (!/\.(ts|tsx)$/.test(file)) continue

    const churnCount = churn.get(file) ?? 0
    const cov = coverage?.get(file) ?? null

    // Severity-weighted issue density acts as the floor: a file with real
    // problems gets a non-zero score even when churn/coverage data is thin.
    const findingScore = scoreFindings(issues)

    const components: Array<{ key: string; value: number; weight: number; available: boolean }> = [
      { key: 'findings', value: findingScore, weight: 0.35, available: true },
      { key: 'churn', value: churnCount / maxChurn, weight: 0.25, available: true },
      { key: 'circular', value: scoreCircular(issues), weight: 0.15, available: true },
      { key: 'uncovered', value: cov === null ? 0 : (100 - cov) / 100, weight: 0.15, available: cov !== null },
      { key: 'type-complexity', value: scoreComplexity(issues), weight: 0.10, available: true },
    ]
    const impact = weightedMean(components)

    const riskComponents: Array<{ value: number; weight: number; available: boolean }> = [
      { value: cov === null ? 0 : 1 - cov / 100, weight: 0.4, available: cov !== null },
      { value: scoreExposure(issues), weight: 0.3, available: true },
      { value: churnCount / maxChurn, weight: 0.3, available: true },
    ]
    const risk = weightedMean(riskComponents)

    // Additive blend, not multiplicative — prevents collapse to 0 when one
    // axis is weak. Weight impact higher because risk often relies on
    // optional coverage data.
    const score = Number((0.7 * impact + 0.3 * risk).toFixed(4))

    scores.push({
      file,
      score,
      impact: Number(impact.toFixed(3)),
      risk: Number(risk.toFixed(3)),
      churn: churnCount,
      coverage: cov,
      issues: summariseIssues(issues),
      tier: score > 0.15 ? 'high' : score > 0.05 ? 'medium' : 'low',
    })
  }

  scores.sort((a, b) => b.score - a.score)

  const out: PriorityOut = {
    generatedAt: new Date().toISOString(),
    summary: {
      total: scores.length,
      high: scores.filter((s) => s.tier === 'high').length,
      medium: scores.filter((s) => s.tier === 'medium').length,
      low: scores.filter((s) => s.tier === 'low').length,
    },
    files: scores,
  }

  await writeJson(path.join(root, args.out), out)

  process.stdout.write(`scored ${scores.length} files\n`)
  process.stdout.write(`  high: ${out.summary.high}, medium: ${out.summary.medium}, low: ${out.summary.low}\n`)
  process.stdout.write(`top 5:\n`)
  for (const s of scores.slice(0, 5)) {
    process.stdout.write(`  [${s.tier.padEnd(6)}] ${s.file}  score=${s.score}  ${s.issues.slice(0, 3).join(', ')}\n`)
  }
}

function weightedMean(comps: Array<{ value: number; weight: number; available: boolean }>): number {
  const usable = comps.filter((c) => c.available)
  const totalW = usable.reduce((s, c) => s + c.weight, 0)
  if (totalW === 0) return 0
  return usable.reduce((s, c) => s + (c.value * c.weight) / totalW, 0)
}

function scoreCircular(issues: Issue[]): number {
  const depths = issues
    .filter((i) => i.kind === 'circular-dep')
    .map((i) => Number((i.meta as { cycleLength?: number })?.cycleLength ?? 0))
  return Math.min(1, (depths.length ? Math.max(...depths) : 0) / 10)
}

function scoreComplexity(issues: Issue[]): number {
  const m = issues
    .filter((i) => i.kind === 'complex-type')
    .map((i) => Number((i.meta as { complexity?: number })?.complexity ?? 0))
  return Math.min(1, (m.length ? Math.max(...m) : 0) / 20)
}

function scorePlaceholders(issues: Issue[]): number {
  const n = issues.filter((i) => i.kind.startsWith('placeholder-') || i.kind === 'empty-implementation').length
  return Math.min(1, n / 10)
}

// Severity-weighted issue density. 6 error-severity issues OR ~12 warns OR
// ~30 infos saturate this component. Keeps useful files non-zero even with
// no churn data, so the human can still see a ranking.
function scoreFindings(issues: Issue[]): number {
  const weight = (i: Issue): number => (i.severity === 'error' ? 3 : i.severity === 'warn' ? 1.5 : 0.5)
  // Dampen jscpd's structural noise so a single duplicated block does not
  // dominate; the LLM cares about real problems.
  const w = (i: Issue) => (i.kind === 'duplicate-block' ? 0.3 : 1) * weight(i)
  const total = issues.reduce((s, i) => s + w(i), 0)
  return Math.min(1, total / 20)
}

function scoreExposure(issues: Issue[]): number {
  // Dead exports are a proxy for surface size (more exports = more surface = more risk).
  const n = issues.filter((i) => i.kind === 'dead-export').length
  return Math.min(1, n / 10)
}

function summariseIssues(issues: Issue[]): string[] {
  const counts = new Map<string, number>()
  for (const i of issues) counts.set(i.kind, (counts.get(i.kind) ?? 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => `${n}× ${k}`)
}

main().catch((err) => {
  process.stderr.write(`priority failed: ${err?.stack ?? err}\n`)
  process.exit(1)
})
