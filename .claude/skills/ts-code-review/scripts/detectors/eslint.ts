import type { Detector, Issue, Severity } from '../types.js'
import { npx, run, relPath } from '../util.js'
import * as path from 'node:path'

interface EslintFileReport {
  filePath: string
  messages: Array<{
    ruleId: string | null
    severity: 1 | 2
    message: string
    line: number
    column: number
    endLine?: number
  }>
}

export const eslintDetector: Detector = {
  name: 'eslint',
  kinds: ['eslint-warning', 'eslint-error'],
  enabledFor: (ctx) => ctx.stack.hasESLint,
  async detect(ctx) {
    // Passing 500+ file paths on Windows blows past CMD's 8191-char limit.
    // Let ESLint use its own config-driven file discovery (`.`), then
    // post-filter to ctx.files. eslint.config.js may narrow scope further
    // via `ignores` / `files` — that is the user's choice and we honour it.
    const { stdout } = await run(
      npx,
      ['eslint', '.', '--format', 'json', '--no-error-on-unmatched-pattern'],
      { cwd: ctx.root },
    )
    let data: EslintFileReport[] = []
    try {
      data = JSON.parse(stdout)
    } catch {
      return []
    }

    const inScope = new Set(ctx.files)
    const issues: Issue[] = []
    for (const f of data) {
      if (!f.messages.length) continue
      const file = relPath(ctx.root, path.resolve(ctx.root, f.filePath))
      // In diff / single-file modes, drop files outside scope. In full mode
      // ctx.files spans the project, so everything passes through.
      if (ctx.mode !== 'full' && !inScope.has(file)) continue
      for (const m of f.messages) {
        const sev: Severity = m.severity === 2 ? 'error' : 'warn'
        issues.push({
          file,
          line: m.line,
          endLine: m.endLine,
          column: m.column,
          kind: m.severity === 2 ? 'eslint-error' : 'eslint-warning',
          severity: sev,
          evidence: `${m.ruleId ?? 'unknown'}: ${m.message}`,
          detector: 'eslint',
          confidence: 1,
          meta: { ruleId: m.ruleId },
        })
      }
    }
    return issues
  },
}
