import { listPersonas, type PersonaSummary } from '../../../../src/public'
import type { Command } from '../types'

interface PersonasListInput {
  topic?: string
  audience?: string
}

export const personasListCommand: Command<PersonasListInput, readonly PersonaSummary[]> = {
  name: 'personas list',
  description:
    'List built-in personas, optionally filtered by topic (case-insensitive substring match on audience + description) or audience (case-insensitive substring match on audience only). All filters are ANDed. No filters → full list.',
  inputSchema: {
    type: 'object',
    properties: {
      topic: { type: 'string', description: 'Case-insensitive substring match against audience + description (e.g. "technical", "财经", "人物").' },
      audience: { type: 'string', description: 'Case-insensitive substring match against audience only.' },
    },
    additionalProperties: false,
  },
  outputSchema: {
    type: 'array',
    items: { type: 'object', additionalProperties: true },
  },
  readOnly: true,
  run(input) {
    let results = listPersonas()
    if (input.topic !== undefined) {
      const needle = input.topic.toLowerCase()
      results = results.filter((p) =>
        (p.audience + ' ' + p.description).toLowerCase().includes(needle),
      )
    }
    if (input.audience !== undefined) {
      const needle = input.audience.toLowerCase()
      results = results.filter((p) => p.audience.toLowerCase().includes(needle))
    }
    return results
  },
}
