import { getContainerSpec, WtException, type ContainerSpec } from '../../../../src/public'
import type { Command } from '../types'

interface ContainersGetInput {
  name: string
}

export const containersGetCommand: Command<ContainersGetInput, ContainerSpec> = {
  name: 'containers get',
  description:
    'Return the ContainerSpec for a single container by fence name. Throws RESOURCE_NOT_FOUND if the name is not in the vocabulary.',
  inputSchema: {
    type: 'object',
    required: ['name'],
    properties: { name: { type: 'string', description: 'Container fence name (e.g. tip / quote-card / steps).' } },
    additionalProperties: false,
  },
  outputSchema: { type: 'object', additionalProperties: true },
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
    return spec
  },
}
