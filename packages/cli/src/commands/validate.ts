import type { PersonaSpec } from '../../../../src/public'
import { validateSpecCommand } from './validate-spec'
import { validateMarkdownCommand } from './validate-markdown'
import { VALIDATE_OUTPUT_SCHEMA, type ValidateOutput } from './_shared/validate-hint'
import type { Command } from '../types'

interface ValidateInput {
  spec?: PersonaSpec
  md?: string
  persona?: string
}

export type { ValidateError, ValidateOutput } from './_shared/validate-hint'

export const validateCommand: Command<ValidateInput, ValidateOutput> = {
  name: 'validate',
  description:
    'DEPRECATED alias: prefer `validate spec` (PersonaSpec) or `validate markdown` (render check). Dispatches based on which input field is present.',
  inputSchema: {
    type: 'object',
    properties: {
      spec: { type: 'object', additionalProperties: true },
      md: { type: 'string' },
      persona: { type: 'string' },
    },
    oneOf: [
      { required: ['spec'] },
      { required: ['md'] },
    ],
    additionalProperties: false,
  },
  outputSchema: VALIDATE_OUTPUT_SCHEMA,
  run(input) {
    if (input.spec && input.md) {
      return {
        ok: false,
        errors: [
          {
            message:
              'validate received both `spec` and `md`; use `validate spec` or `validate markdown` to disambiguate',
            severity: 'error',
          },
        ],
        warnings: [],
      }
    }
    if (input.spec) {
      return validateSpecCommand.run({ spec: input.spec })
    }
    if (input.md) {
      return validateMarkdownCommand.run({ md: input.md, persona: input.persona })
    }
    return {
      ok: false,
      errors: [
        {
          message: 'validate requires either `spec` or `md` in input',
          severity: 'error',
        },
      ],
      warnings: [],
    }
  },
}
