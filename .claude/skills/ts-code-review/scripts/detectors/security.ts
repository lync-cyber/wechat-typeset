// Minimal security signal: high-precision patterns only. We do not try to
// replace semgrep — we surface the obvious red flags that ship most often.
// Each finding is information-only; the LLM (or a human) should triage.

import type { Detector, Issue, IssueKind } from '../types.js'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

const RULES: Array<{ re: RegExp; kind: IssueKind; msg: string }> = [
  { re: /\beval\s*\(/, kind: 'security-eval', msg: 'eval() — arbitrary code execution' },
  { re: /new\s+Function\s*\(/, kind: 'security-eval', msg: 'new Function() — arbitrary code execution' },
  {
    re: /child_process\.(exec|execSync|spawnSync)\s*\([^)]*\$\{|\bexec(?:Sync)?\s*\([^)]*\+/,
    kind: 'security-exec',
    msg: 'exec with string concatenation/interpolation — possible command injection',
  },
  {
    re: /dangerouslySetInnerHTML/,
    kind: 'security-html-inject',
    msg: 'React dangerouslySetInnerHTML — verify input is sanitised',
  },
  {
    re: /v-html\s*=/,
    kind: 'security-html-inject',
    msg: 'Vue v-html — verify input is sanitised',
  },
  {
    re: /\.innerHTML\s*=\s*[^"'\s]/,
    kind: 'security-html-inject',
    msg: '.innerHTML assignment from a variable',
  },
]

export const securityDetector: Detector = {
  name: 'security',
  kinds: ['security-eval', 'security-exec', 'security-html-inject'],
  enabledFor: () => true,
  async detect(ctx) {
    const issues: Issue[] = []
    for (const f of ctx.files) {
      const text = await safeRead(path.join(ctx.root, f))
      if (!text) continue
      text.split(/\r?\n/).forEach((line, i) => {
        if (/^\s*\/\//.test(line)) return // skip comment-only lines
        for (const r of RULES) {
          if (r.re.test(line)) {
            issues.push({
              file: f,
              line: i + 1,
              kind: r.kind,
              severity: 'warn',
              evidence: `${r.msg}: ${line.trim().slice(0, 140)}`,
              detector: 'security',
              confidence: 0.75,
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
