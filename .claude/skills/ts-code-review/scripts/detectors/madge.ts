import type { Detector, Issue } from '../types.js'
import { npx, run } from '../util.js'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

export const madgeDetector: Detector = {
  name: 'madge',
  kinds: ['circular-dep'],
  enabledFor: (ctx) => ctx.stack.hasMadge,
  async detect(ctx) {
    const includes = await readTsconfigIncludes(ctx.root, ctx.tsconfig)
    const targets = includes.length ? includes : ['src']
    const issues: Issue[] = []

    for (const target of targets) {
      const { stdout } = await run(
        npx,
        [
          'madge',
          '--circular',
          '--json',
          '--extensions',
          'ts,tsx',
          '--ts-config',
          ctx.tsconfig,
          target,
        ],
        { cwd: ctx.root },
      )
      let cycles: string[][] = []
      try {
        cycles = JSON.parse(stdout)
      } catch {
        continue
      }
      for (const cycle of cycles) {
        for (const file of cycle) {
          issues.push({
            file,
            kind: 'circular-dep',
            severity: 'error',
            evidence: `cycle: ${cycle.join(' -> ')} -> ${cycle[0]}`,
            detector: 'madge',
            confidence: 1,
            meta: { cycle, cycleLength: cycle.length },
          })
        }
      }
    }
    return issues
  },
}

async function readTsconfigIncludes(root: string, tsconfig: string): Promise<string[]> {
  try {
    const raw = await fs.readFile(path.join(root, tsconfig), 'utf-8')
    const parsed = JSON.parse(stripJsonComments(raw)) as { include?: string[] }
    return (parsed.include ?? [])
      .map((p) => p.replace(/\/\*\*\/\*\.\{?[a-z,]+\}?$/, '').replace(/\/\*\*$/, ''))
      .filter(Boolean)
  } catch {
    return []
  }
}

function stripJsonComments(s: string): string {
  return s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')
}
