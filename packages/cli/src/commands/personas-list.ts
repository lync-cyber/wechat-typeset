import { listPersonas, type PersonaSummary } from '../../../../src/public'
import type { Command } from '../types'

export const personasListCommand: Command<Record<string, never>, readonly PersonaSummary[]> = {
  name: 'personas list',
  description:
    'List all built-in personas as PersonaSummary[] (id / name / description / audience / palette / variants / signatureContainers).',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  outputSchema: {
    type: 'array',
    items: { type: 'object', additionalProperties: true },
  },
  run() {
    return listPersonas()
  },
}
