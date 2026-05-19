// Detector registry. Each detector self-declares applicability via enabledFor.
// scan.ts iterates the registry; path normalisation and diff-mode filtering
// happen here, not inside every detector, so detector authors do not have to
// think about them.

import * as path from 'node:path'
import type { Detector, Issue, ProjectContext } from '../types.js'

import { knipDetector } from './knip.js'
import { madgeDetector } from './madge.js'
import { typecheckDetector } from './typecheck.js'
import { jscpdDetector } from './jscpd.js'
import { eslintDetector } from './eslint.js'
import { astDetector } from './ast.js'
import { placeholderDetector } from './placeholders.js'
import { commentDisciplineDetector } from './comments.js'
import { testQualityDetector } from './tests.js'
import { securityDetector } from './security.js'
import { bundleDetector } from './bundle.js'
import { namingDetector } from './naming.js'

export const ALL_DETECTORS: Detector[] = [
  knipDetector,
  madgeDetector,
  typecheckDetector,
  jscpdDetector,
  eslintDetector,
  astDetector,
  placeholderDetector,
  commentDisciplineDetector,
  testQualityDetector,
  securityDetector,
  bundleDetector,
  namingDetector,
]

export async function runDetectors(
  ctx: ProjectContext,
  selected?: string[],
): Promise<Issue[]> {
  const pool = selected
    ? ALL_DETECTORS.filter((d) => selected.includes(d.name))
    : ALL_DETECTORS
  const enabled = pool.filter((d) => d.enabledFor(ctx))

  const results = await Promise.all(
    enabled.map(async (d) => {
      try {
        const issues = await d.detect(ctx)
        return issues.map((i) => ({ ...i, detector: d.name }))
      } catch (err) {
        return [
          {
            file: '<detector>',
            kind: 'eslint-warning' as const,
            severity: 'info' as const,
            evidence: `${d.name} failed: ${String(err).slice(0, 200)}`,
            detector: d.name,
            confidence: 1,
          },
        ]
      }
    }),
  )

  const normalised = normaliseIssues(ctx, results.flat())

  // Diff-mode: drop issues outside changed ranges. For whole-file issues
  // (no line), keep only if file is in changedFiles.
  if (ctx.diffRange) {
    const changed = new Set(ctx.diffRange.changedFiles)
    return normalised.filter((i) => {
      if (!changed.has(i.file)) return false
      if (i.line == null) return true
      const ranges = ctx.diffRange!.changedLines[i.file] ?? []
      return ranges.some(([s, e]) => i.line! >= s - 3 && i.line! <= e + 3)
    })
  }
  return normalised
}

// Always-ignore paths (worktrees, vendored deps, git internals) plus
// any path outside ctx.root. These can sneak in via tools that scan the
// disk rather than honouring tsconfig.include (jscpd is the worst offender).
const HARD_IGNORE = /(^|[\/\\])(\.git|\.claude[\/\\]worktrees|node_modules|dist|build|coverage)([\/\\]|$)/

function normaliseIssues(ctx: ProjectContext, issues: Issue[]): Issue[] {
  const inScope = new Set(ctx.files)
  const out: Issue[] = []
  for (const i of issues) {
    let f = i.file
    if (f === 'package.json' || f === '<detector>') {
      out.push(i)
      continue
    }
    if (path.isAbsolute(f)) {
      f = path.relative(ctx.root, f)
    }
    f = f.split(path.sep).join('/')
    if (f.startsWith('..') || HARD_IGNORE.test(f)) continue
    // In full mode ctx.files spans the whole project; allow .ts/.tsx files
    // outside that list (e.g. files knip discovered that tsc didn't, edge
    // cases of include patterns). In narrower modes (single-file, branch-diff,
    // pr) restrict strictly to in-scope files so tools that scan the whole
    // project (knip, jscpd, madge) do not flood the report with out-of-scope
    // hits. Diff-mode line filtering still applies further down.
    if (ctx.mode === 'full') {
      if (!inScope.has(f) && !/\.(ts|tsx|mts|cts)$/.test(f)) continue
    } else if (!inScope.has(f)) {
      continue
    }
    out.push({ ...i, file: f })
  }
  return out
}
