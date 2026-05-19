import { getSchema, type JSONSchema7 } from '../../../../src/public'
import type { Command } from '../types'

export const schemaGetCommand: Command<Record<string, never>, JSONSchema7> = {
  name: 'schema get',
  description:
    'Return the PersonaSpec JSON Schema (draft-07) object. Suitable for LLM structured-output constraints or downstream validation.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  outputSchema: { type: 'object', additionalProperties: true },
  readOnly: true,
  run() {
    return getSchema()
  },
}
