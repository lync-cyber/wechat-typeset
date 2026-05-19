// Bundle-risk detector for frontend projects: whole-package imports that
// blow up bundle size when subpath imports would suffice.

import type { Detector, Issue } from '../types.js'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

const WHOLE_IMPORT_BAD: Array<{ pkg: string; reason: string }> = [
  { pkg: 'lodash', reason: 'use lodash/<fn> or lodash-es to allow tree-shaking' },
  { pkg: 'moment', reason: 'use date-fns / dayjs / luxon — moment is unmaintained and heavy' },
  { pkg: 'rxjs', reason: 'import { x } from "rxjs" is fine; import * is not' },
  { pkg: '@material-ui/core', reason: 'use named or subpath imports' },
  { pkg: '@mui/material', reason: 'use named or subpath imports' },
]

export const bundleDetector: Detector = {
  name: 'bundle',
  kinds: ['bundle-whole-import'],
  enabledFor: (ctx) => ctx.stack.hasReact || ctx.stack.hasVue || ctx.stack.hasVite || ctx.stack.hasNext,
  async detect(ctx) {
    const issues: Issue[] = []
    for (const f of ctx.files) {
      const text = await safeRead(path.join(ctx.root, f))
      if (!text) continue
      text.split(/\r?\n/).forEach((line, i) => {
        // import * as X from 'pkg' / import _ from 'lodash'
        for (const r of WHOLE_IMPORT_BAD) {
          const reStar = new RegExp(`import\\s+\\*\\s+as\\s+\\w+\\s+from\\s+['"]${r.pkg}['"]`)
          const reDefault = new RegExp(`import\\s+\\w+\\s+from\\s+['"]${r.pkg}['"]`)
          if (reStar.test(line) || reDefault.test(line)) {
            issues.push({
              file: f,
              line: i + 1,
              kind: 'bundle-whole-import',
              severity: 'warn',
              evidence: line.trim().slice(0, 140),
              detector: 'bundle',
              confidence: 0.9,
              suggestion: r.reason,
              meta: { pkg: r.pkg },
            })
          }
        }
      })
    }
    return issues
  },
}

async function safeRead(p: string): Promise<string | null> {
  try {
    return await fs.readFile(p, 'utf-8')
  } catch {
    return null
  }
}
