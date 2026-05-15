import { lintMarkdown, type LintReport } from '../heuristics/lint'
import type { Command } from '../types'

interface LintInput {
  md: string
  persona?: string
}

export const lintCommand: Command<LintInput, LintReport> = {
  name: 'lint',
  description:
    'Contract-lint markdown (fence vocabulary, fence nesting, inline-extension closure, frontmatter, theme-namespace mismatch). Returns { ok, issues[], count, errorCount, warningCount, effectivePersona, personaSource }.',
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
            kind: { type: 'string' },
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
  run(input) {
    return lintMarkdown(input.md, input.persona)
  },
}
