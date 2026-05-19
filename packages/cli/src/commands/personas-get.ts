import { getPersona, type PersonaSpec } from '../../../../src/public'
import type { Command } from '../types'

interface PersonasGetInput {
  id: string
}

export const personasGetCommand: Command<PersonasGetInput, PersonaSpec> = {
  name: 'personas get',
  description:
    'Return full PersonaSpec for the given persona id (throws WtException RESOURCE_NOT_FOUND if unknown).',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string' } },
    additionalProperties: false,
  },
  outputSchema: { type: 'object', additionalProperties: true },
  readOnly: true,
  run(input) {
    return getPersona(input.id)
  },
}
