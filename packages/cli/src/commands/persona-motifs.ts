import { getMotifSpec, type MotifSpec } from '../../../../src/public'
import type { Command } from '../types'

interface PersonaMotifsInput {
  id: string
}

export const personaMotifsCommand: Command<PersonaMotifsInput, MotifSpec> = {
  name: 'persona motifs',
  description:
    'Return the MotifSpec (motif AST collection) for the given persona id. Throws RESOURCE_NOT_FOUND if unknown.',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string', description: 'Persona id.' } },
    additionalProperties: false,
  },
  outputSchema: { type: 'object', additionalProperties: true },
  readOnly: true,
  run(input) {
    return getMotifSpec(input.id)
  },
}
