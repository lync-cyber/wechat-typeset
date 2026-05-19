import { validatePersona, type PersonaSpec } from '../../../../src/public'
import { attachHint, VALIDATE_OUTPUT_SCHEMA, type ValidateOutput } from './_shared/validate-hint'
import type { Command } from '../types'

interface ValidateSpecInput {
  spec: PersonaSpec
}

export const validateSpecCommand: Command<ValidateSpecInput, ValidateOutput> = {
  name: 'validate spec',
  description:
    'Validate a PersonaSpec against hard rules (palette / status 4-states / motif font ≥14 / strokeWidth ≥1 / fontFamily whitelist / variant ids / signatureContainers whitelist). Returns { ok, errors[], warnings[] }; each entry carries `path` + `hint` when matched.',
  inputSchema: {
    type: 'object',
    required: ['spec'],
    properties: {
      spec: {
        type: 'object',
        description: 'PersonaSpec JSON to validate. Schema available via `describe` output → personaSpecSchema (or src/public:getSchema()).',
        additionalProperties: true,
      },
    },
    additionalProperties: false,
  },
  outputSchema: VALIDATE_OUTPUT_SCHEMA,
  readOnly: true,
  run(input) {
    const result = validatePersona(input.spec)
    return {
      ok: result.ok,
      errors: result.errors.map(attachHint),
      warnings: result.warnings.map(attachHint),
    }
  },
}
