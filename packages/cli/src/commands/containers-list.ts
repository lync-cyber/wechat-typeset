import { getContainerVocabulary, type ContainerSpec } from '../../../../src/public'
import type { Command } from '../types'

export const containersListCommand: Command<Record<string, never>, readonly ContainerSpec[]> = {
  name: 'containers list',
  description:
    'Return the complete container vocabulary (fence name → category / fenceLength / variantKind / pack / namespace / attrs / example). Theme-independent.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  outputSchema: { type: 'array', items: { type: 'object', additionalProperties: true } },
  run() {
    return getContainerVocabulary()
  },
}
