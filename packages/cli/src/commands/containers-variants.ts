import {
  getContainerSpec,
  getVariantsForContainer,
  WtException,
  type VariantDescriptor,
} from '../../../../src/public'
import type { Command } from '../types'

interface ContainersVariantsInput {
  name: string
}

export const containersVariantsCommand: Command<ContainersVariantsInput, VariantDescriptor[]> = {
  name: 'containers variants',
  description:
    "Return all switchable variant descriptors for a container. Returns an empty array for containers with no variant system. Throws RESOURCE_NOT_FOUND if the container name is unknown.",
  inputSchema: {
    type: 'object',
    required: ['name'],
    properties: { name: { type: 'string', description: 'Container fence name (e.g. quote-card / steps).' } },
    additionalProperties: false,
  },
  outputSchema: { type: 'array', items: { type: 'object', additionalProperties: true } },
  readOnly: true,
  run(input) {
    const spec = getContainerSpec(input.name)
    if (!spec) {
      throw new WtException('RESOURCE_NOT_FOUND', [
        {
          message: `Unknown container "${input.name}". Use 'containers list' for the full vocabulary.`,
          severity: 'error',
          path: 'container.name',
        },
      ])
    }
    return getVariantsForContainer(input.name)
  },
}
