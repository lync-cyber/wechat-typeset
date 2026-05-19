import { lintMarkdown, type LintReport } from '../heuristics/lint'
import type { Command } from '../types'

interface LintInput {
  md: string
  persona?: string
}

export const lintCommand: Command<LintInput, LintReport> = {
  name: 'markdown lint',
  description:
    'Contract-lint markdown (fence vocabulary, fence nesting, inline-extension closure, frontmatter, theme-namespace mismatch). Returns { ok, issues[], count, errorCount, warningCount, effectivePersona, personaSource }. When `kind` is `unknown_container`, `nesting_depth`, `unexpected_jsx_attrs`, `fence_not_closed`, or `wrong_theme_namespace`, `name` carries the offending fence name. Canonical name; `lint` is kept as a deprecated alias.',
  inputSchema: {
    type: 'object',
    required: ['md'],
    properties: {
      md: { type: 'string' },
      persona: {
        type: 'string',
        description: 'Optional persona id; enables theme-namespace warnings.',
      },
    },
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    required: ['ok', 'issues', 'count', 'errorCount', 'warningCount', 'personaSource'],
    properties: {
      ok: { type: 'boolean' },
      issues: {
        type: 'array',
        items: {
          type: 'object',
          required: ['line', 'kind', 'severity', 'hint', 'excerpt'],
          properties: {
            line: { type: 'integer' },
            kind: {
              enum: [
                'unknown_container',
                'unexpected_jsx_attrs',
                'html_comment_variant',
                'fence_not_closed',
                'nesting_depth',
                'inline_unclosed',
                'wrong_theme_namespace',
                'frontmatter_invalid',
              ],
            },
            severity: { enum: ['error', 'warning'] },
            name: { type: 'string' },
            hint: { type: 'string' },
            excerpt: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
      count: { type: 'integer' },
      errorCount: { type: 'integer' },
      warningCount: { type: 'integer' },
      effectivePersona: { type: 'string' },
      personaSource: { enum: ['frontmatter', 'flag', 'none'] },
    },
    additionalProperties: false,
  },
  readOnly: true,
  run(input) {
    return lintMarkdown(input.md, input.persona)
  },
}
