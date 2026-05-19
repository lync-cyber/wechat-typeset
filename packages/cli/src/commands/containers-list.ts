import { getContainerVocabulary, type ContainerSpec } from '../../../../src/public'
import { packOf, namespaceOf } from '../../../../src/core/vocabulary'
import type { Command } from '../types'

interface ContainersListInput {
  category?: string
  pack?: string
  namespace?: string
}

export const containersListCommand: Command<ContainersListInput, readonly ContainerSpec[]> = {
  name: 'containers list',
  description:
    'Return the container vocabulary, optionally filtered by category (exact), pack (exact), or namespace (exact). All filters are ANDed. No filters → full list.',
  inputSchema: {
    type: 'object',
    properties: {
      category: { type: 'string', description: "Exact match on ContainerSpec.category (e.g. 'admonition', 'structure', 'signature')." },
      pack: { type: 'string', description: "Exact match on container pack (e.g. 'base', 'pack:editorial', 'pack:data-viz', 'theme:<id>')." },
      namespace: { type: 'string', description: "High-level grouping: 'base' | 'pack' | 'theme'." },
    },
    additionalProperties: false,
  },
  outputSchema: { type: 'array', items: { type: 'object', additionalProperties: true } },
  readOnly: true,
  run(input) {
    let results = getContainerVocabulary()
    if (input.category !== undefined) {
      results = results.filter((s) => s.category === input.category)
    }
    if (input.pack !== undefined) {
      results = results.filter((s) => packOf(s) === input.pack)
    }
    if (input.namespace !== undefined) {
      results = results.filter((s) => namespaceOf(packOf(s)) === input.namespace)
    }
    return results
  },
}
