import type { Detector, Issue } from '../types.js'
import { npx, run, readJsonSafe, relPath } from '../util.js'
import * as os from 'node:os'
import * as path from 'node:path'

// jscpd defaults scan ALL formats (md/json/html/css/...). For a TS code-review
// skill we want JS/TS only. Default thresholds are also too low for any
// real codebase — bumped here to surface only meaningful duplication.

interface JscpdReport {
  duplicates?: Array<{
    firstFile: { name: string; start: number; end: number }
    secondFile: { name: string; start: number; end: number }
    lines: number
    tokens: number
    fragment?: string
  }>
}

export const jscpdDetector: Detector = {
  name: 'jscpd',
  kinds: ['duplicate-block'],
  enabledFor: (ctx) => ctx.stack.hasJscpd,
  async detect(ctx) {
    const out = path.join(os.tmpdir(), `jscpd-${process.pid}`)
    await run(
      npx,
      [
        'jscpd',
        '.',
        '--format',
        'typescript,tsx,javascript,jsx',
        '--min-tokens',
        '80',
        '--min-lines',
        '10',
        '--reporters',
        'json',
        '--output',
        out,
        '--silent',
        '--ignore',
        '**/node_modules/**,**/dist/**,**/build/**,**/.next/**,**/.claude/**,**/.git/**,**/coverage/**,**/*.test.ts,**/*.spec.ts,**/*.d.ts,**/test-output/**,**/__fixtures__/**,**/__generated__/**',
      ],
      { cwd: ctx.root },
    )
    const report = await readJsonSafe<JscpdReport>(path.join(out, 'jscpd-report.json'), {})
    const issues: Issue[] = []
    // One Issue per pair (anchored at firstFile). The partner location lives
    // in meta.partner so downstream can show both sides without inflating
    // the issue count.
    for (const d of report.duplicates ?? []) {
      const firstRel = relPath(ctx.root, path.resolve(ctx.root, d.firstFile.name))
      const secondRel = relPath(ctx.root, path.resolve(ctx.root, d.secondFile.name))
      issues.push({
        file: firstRel,
        line: d.firstFile.start,
        endLine: d.firstFile.end,
        kind: 'duplicate-block',
        severity: 'warn',
        evidence: `${d.lines} lines / ${d.tokens} tokens duplicated with ${secondRel}:${d.secondFile.start}`,
        detector: 'jscpd',
        confidence: 0.7,
        meta: {
          partnerFile: secondRel,
          partnerStart: d.secondFile.start,
          partnerEnd: d.secondFile.end,
          lines: d.lines,
          tokens: d.tokens,
          fragment: (d.fragment ?? '').slice(0, 200),
        },
      })
    }
    return issues
  },
}
