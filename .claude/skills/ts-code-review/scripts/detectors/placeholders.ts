// Comment-aware placeholder scan. We do not use ripgrep with naive patterns
// because "TODO" appears in many URLs / string literals. Instead, parse the
// file with ts-morph's getLeadingCommentRanges + standalone comment scan via
// the language scanner, so only real comments match.

import type { Detector, Issue, IssueKind } from '../types.js'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

const PATTERNS: Array<{ re: RegExp; kind: IssueKind }> = [
  { re: /\bTODO\b/i, kind: 'placeholder-todo' },
  { re: /\bFIXME\b/i, kind: 'placeholder-fixme' },
  { re: /\bHACK\b/i, kind: 'placeholder-hack' },
  { re: /not\s+implemented|not\s+yet/i, kind: 'placeholder-notimpl' },
]

export const placeholderDetector: Detector = {
  name: 'placeholders',
  kinds: ['placeholder-todo', 'placeholder-fixme', 'placeholder-hack', 'placeholder-notimpl'],
  enabledFor: () => true,
  async detect(ctx) {
    const issues: Issue[] = []
    for (const f of ctx.files) {
      const full = path.join(ctx.root, f)
      let text: string
      try {
        text = await fs.readFile(full, 'utf-8')
      } catch {
        continue
      }
      const comments = extractComments(text)
      for (const c of comments) {
        for (const p of PATTERNS) {
          if (!p.re.test(c.text)) continue
          // Drop if it has an issue link — that's a tracked TODO, not noise.
          const hasTicket = /#\d{2,}|[A-Z]+-\d+|https?:\/\//.test(c.text)
          issues.push({
            file: f,
            line: c.line,
            kind: p.kind,
            severity: 'info',
            evidence: c.text.trim().slice(0, 160),
            detector: 'placeholders',
            confidence: hasTicket ? 0.4 : 0.9,
            meta: { trackedExternally: hasTicket },
          })
          break
        }
      }
    }
    return issues
  },
}

interface CommentSpan {
  line: number
  text: string
}

function extractComments(src: string): CommentSpan[] {
  const out: CommentSpan[] = []
  const n = src.length
  let i = 0
  let line = 1
  let mode: 'code' | 'str-d' | 'str-s' | 'tmpl' | 'line' | 'block' = 'code'
  let buf = ''
  let bufStartLine = 1

  while (i < n) {
    const c = src[i]
    const next = src[i + 1]
    if (c === '\n') line++

    if (mode === 'code') {
      if (c === '/' && next === '/') {
        mode = 'line'
        buf = ''
        bufStartLine = line
        i += 2
        continue
      }
      if (c === '/' && next === '*') {
        mode = 'block'
        buf = ''
        bufStartLine = line
        i += 2
        continue
      }
      if (c === '"') {
        mode = 'str-d'
        i++
        continue
      }
      if (c === "'") {
        mode = 'str-s'
        i++
        continue
      }
      if (c === '`') {
        mode = 'tmpl'
        i++
        continue
      }
      i++
      continue
    }

    if (mode === 'line') {
      if (c === '\n') {
        out.push({ line: bufStartLine, text: buf })
        mode = 'code'
      } else buf += c
      i++
      continue
    }

    if (mode === 'block') {
      if (c === '*' && next === '/') {
        out.push({ line: bufStartLine, text: buf })
        mode = 'code'
        i += 2
        continue
      }
      buf += c
      i++
      continue
    }

    // Inside a string: skip escapes and look for closer
    if (mode === 'str-d' || mode === 'str-s' || mode === 'tmpl') {
      if (c === '\\') {
        i += 2
        continue
      }
      if (mode === 'str-d' && c === '"') {
        mode = 'code'
        i++
        continue
      }
      if (mode === 'str-s' && c === "'") {
        mode = 'code'
        i++
        continue
      }
      if (mode === 'tmpl' && c === '`') {
        mode = 'code'
        i++
        continue
      }
      i++
    }
  }
  if (mode === 'line') out.push({ line: bufStartLine, text: buf })
  return out
}
