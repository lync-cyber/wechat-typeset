import type { Detector, Issue } from '../types.js'
import { npx, run, relPath } from '../util.js'
import * as path from 'node:path'

const TSC_LINE = /^(.+?)\((\d+),(\d+)\):\s+error\s+(TS\d+):\s+(.+)$/

export const typecheckDetector: Detector = {
  name: 'typecheck',
  kinds: ['type-error'],
  enabledFor: () => true,
  async detect(ctx) {
    const { stdout, stderr } = await run(
      npx,
      ['tsc', '--noEmit', '-p', ctx.tsconfig, '--pretty', 'false'],
      { cwd: ctx.root },
    )
    const out = stdout + stderr
    const issues: Issue[] = []
    for (const raw of out.split(/\r?\n/)) {
      const m = raw.match(TSC_LINE)
      if (!m) continue
      const file = relPath(ctx.root, path.resolve(ctx.root, m[1]))
      issues.push({
        file,
        line: Number(m[2]),
        column: Number(m[3]),
        kind: 'type-error',
        severity: 'error',
        evidence: `${m[4]}: ${m[5]}`,
        detector: 'typecheck',
        confidence: 1,
        meta: { code: m[4] },
      })
    }
    return issues
  },
}
