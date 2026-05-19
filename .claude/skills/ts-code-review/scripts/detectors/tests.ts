// Test-quality detector: focus on the failure modes LLM review almost always
// misses — silently disabled tests, focused tests left in, empty assertions.

import type { Detector, Issue, IssueKind } from '../types.js'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

const PATTERNS: Array<{ re: RegExp; kind: IssueKind; severity: 'warn' | 'error'; msg: string }> = [
  { re: /\b(it|test|describe)\.only\s*\(/, kind: 'test-only', severity: 'error', msg: '.only left in test file' },
  { re: /\bf(it|describe)\s*\(/, kind: 'test-only', severity: 'error', msg: 'fit/fdescribe left in test file' },
  { re: /\b(x?it|x?describe|test)\.skip\s*\(/, kind: 'test-skip', severity: 'warn', msg: '.skip on a test' },
  { re: /\bxit\s*\(/, kind: 'test-skip', severity: 'warn', msg: 'xit on a test' },
  { re: /\bexpect\s*\(\s*\)\s*\.\s*\w+\s*\(\s*\)/, kind: 'test-empty', severity: 'warn', msg: 'empty expect() call' },
  { re: /\bassert\s*\(\s*true\s*\)/, kind: 'test-empty', severity: 'warn', msg: 'assert(true) — useless assertion' },
]

export const testQualityDetector: Detector = {
  name: 'tests',
  kinds: ['test-skip', 'test-only', 'test-empty'],
  enabledFor: (ctx) => ctx.stack.testRunner !== 'unknown' || true,
  async detect(ctx) {
    const issues: Issue[] = []
    const testFiles = ctx.files.filter((f) => /(\.test|\.spec)\.tsx?$/.test(f))
    for (const f of testFiles) {
      const text = await safeRead(path.join(ctx.root, f))
      if (!text) continue
      text.split(/\r?\n/).forEach((line, i) => {
        for (const p of PATTERNS) {
          if (p.re.test(line)) {
            issues.push({
              file: f,
              line: i + 1,
              kind: p.kind,
              severity: p.severity,
              evidence: `${p.msg}: ${line.trim().slice(0, 120)}`,
              detector: 'tests',
              confidence: 1,
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
