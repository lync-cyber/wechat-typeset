import { render, WtException } from '../../../../src/public'
import { attachHint, VALIDATE_OUTPUT_SCHEMA, type ValidateOutput } from './_shared/validate-hint'
import type { Command } from '../types'

interface ValidateMarkdownInput {
  md: string
  persona?: string
}

export const validateMarkdownCommand: Command<ValidateMarkdownInput, ValidateOutput> = {
  name: 'validate markdown',
  description:
    'Check renderability of markdown by running the full pipeline; catches WtException(CONTRACT_VIOLATION / SPEC_INVALID / RESOURCE_NOT_FOUND). Returns { ok, errors[], warnings[] }. For contract-layer lint (fence vocabulary / nesting / inline closure / theme-namespace) use `lint` instead — it is faster and more granular.',
  inputSchema: {
    type: 'object',
    required: ['md'],
    properties: {
      md: { type: 'string', description: 'Markdown source (may include frontmatter).' },
      persona: {
        type: 'string',
        description: 'Optional persona id; when omitted defaults to "default".',
      },
    },
    additionalProperties: false,
  },
  outputSchema: VALIDATE_OUTPUT_SCHEMA,
  readOnly: true,
  run(input) {
    try {
      render({ md: input.md, persona: input.persona })
      return { ok: true, errors: [], warnings: [] }
    } catch (e) {
      if (e instanceof WtException) {
        return {
          ok: false,
          errors: e.errors.map(attachHint),
          warnings: e.warnings.map(attachHint),
        }
      }
      return {
        ok: false,
        errors: [{ message: (e as Error).message, severity: 'error' }],
        warnings: [],
      }
    }
  },
}
