import type { Detector, Issue } from '../types.js'
import { npx, run } from '../util.js'

// knip 6.x JSON shape:
// { issues: [{ file, exports:[{name,line,col}], types:[...],
//              dependencies:[{name}], devDependencies:[...],
//              unlisted:[...], files:[{name}], duplicates:[...] }] }
//
// `files` non-empty means the whole file is unused (dead-file).
// `exports` / `types` items are unused symbol exports.
// `dependencies` / `devDependencies` are unimported package.json deps.

interface KnipExportEntry {
  name: string
  line?: number
  col?: number
}
interface KnipFileEntry {
  name: string
}
interface KnipIssue {
  file: string
  exports?: KnipExportEntry[]
  types?: KnipExportEntry[]
  dependencies?: KnipFileEntry[]
  devDependencies?: KnipFileEntry[]
  files?: KnipFileEntry[]
  unlisted?: KnipFileEntry[]
}
interface KnipReport {
  issues?: KnipIssue[]
}

export const knipDetector: Detector = {
  name: 'knip',
  kinds: ['dead-export', 'dead-file', 'dead-dependency'],
  enabledFor: (ctx) => ctx.stack.hasKnip,
  async detect(ctx) {
    const { stdout } = await run(npx, ['knip', '--reporter', 'json'], { cwd: ctx.root })
    let data: KnipReport = {}
    try {
      data = JSON.parse(stdout)
    } catch {
      return []
    }
    const issues: Issue[] = []

    for (const entry of data.issues ?? []) {
      if (entry.files && entry.files.length > 0) {
        issues.push({
          file: entry.file,
          kind: 'dead-file',
          severity: 'warn',
          evidence: 'file has no reachable consumers',
          detector: 'knip',
          confidence: 0.85,
        })
      }

      for (const e of entry.exports ?? []) {
        issues.push({
          file: entry.file,
          line: e.line,
          column: e.col,
          kind: 'dead-export',
          severity: 'warn',
          evidence: `export "${e.name}" appears unused`,
          detector: 'knip',
          confidence: 0.8,
          meta: { name: e.name, kind: 'value' },
        })
      }

      for (const t of entry.types ?? []) {
        issues.push({
          file: entry.file,
          line: t.line,
          column: t.col,
          kind: 'dead-export',
          severity: 'info',
          evidence: `type export "${t.name}" appears unused`,
          detector: 'knip',
          confidence: 0.75,
          meta: { name: t.name, kind: 'type' },
        })
      }

      for (const d of [...(entry.dependencies ?? []), ...(entry.devDependencies ?? [])]) {
        issues.push({
          file: 'package.json',
          kind: 'dead-dependency',
          severity: 'info',
          evidence: `dependency "${d.name}" declared but never imported`,
          detector: 'knip',
          confidence: 0.9,
          meta: { name: d.name },
        })
      }
    }
    return issues
  },
}
