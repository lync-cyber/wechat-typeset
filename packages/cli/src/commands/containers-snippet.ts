import {
  getContainerSnippet,
  getContainerSpec,
  getVariantsForContainer,
  WtException,
} from '../../../../src/public'
import type { Command } from '../types'

interface ContainersSnippetInput {
  name: string
  variant?: string
  persona?: string
}

export const containersSnippetCommand: Command<ContainersSnippetInput, string> = {
  name: 'containers snippet',
  description:
    'Return minimal markdown snippet for a container; pass `variant` to bind a specific skeleton. `persona` is accepted for symmetry but does not affect output (use `personas capabilities` for theme-aware filtering).',
  inputSchema: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' },
      variant: { type: 'string' },
      persona: { type: 'string' },
    },
    additionalProperties: false,
  },
  outputSchema: { type: 'string' },
  run(input) {
    const spec = getContainerSpec(input.name)
    if (!spec) {
      throw new WtException(
        'RESOURCE_NOT_FOUND',
        [
          {
            message: `Unknown container "${input.name}". Use 'containers list' for the full vocabulary.`,
            severity: 'error',
            path: 'container.name',
          },
        ],
      )
    }
    if (input.variant) {
      if (!spec.variantKind) {
        throw new WtException(
          'CONTRACT_VIOLATION',
          [
            {
              message: `Container "${input.name}" has no variant system; drop the variant flag`,
              severity: 'error',
              path: 'container.variant',
            },
          ],
        )
      }
      const known = getVariantsForContainer(input.name)
      if (!known.some((v) => v.id === input.variant)) {
        throw new WtException(
          'RESOURCE_NOT_FOUND',
          [
            {
              message: `Unknown variant "${input.variant}" for "${input.name}". Known: ${known
                .map((v) => v.id)
                .join(', ')}`,
              severity: 'error',
              path: 'container.variant',
            },
          ],
        )
      }
      return getContainerSnippet(input.name, { variantId: input.variant })
    }
    return getContainerSnippet(input.name)
  },
}
