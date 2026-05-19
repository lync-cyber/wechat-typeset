import {
  getContainerSnippet,
  getContainerSpec,
  getPersona,
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
    "Return minimal markdown snippet for a container. Pass `variant` to bind a specific skeleton. Pass `persona` (and omit `variant`) to bind that persona's default variant for the container's variantKind — useful when generating snippets pre-tuned to the active theme. If the container has no variantKind, `persona` is a no-op.",
  inputSchema: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', description: 'Container fence name (e.g. tip / quote-card / steps).' },
      variant: {
        type: 'string',
        description: 'Explicit variant id; takes precedence over `persona` resolution.',
      },
      persona: {
        type: 'string',
        description:
          "Persona id used to resolve the default variant for the container's variantKind when `variant` is omitted.",
      },
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

    let variantId = input.variant
    if (!variantId && input.persona && spec.variantKind) {
      const personaSpec = getPersona(input.persona)
      const themeVariants = personaSpec.variants as unknown as Record<string, string | undefined>
      const fromTheme = themeVariants[spec.variantKind]
      if (fromTheme) variantId = fromTheme
    }

    if (variantId) {
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
      if (!known.some((v) => v.id === variantId)) {
        throw new WtException(
          'RESOURCE_NOT_FOUND',
          [
            {
              message: `Unknown variant "${variantId}" for "${input.name}". Known: ${known
                .map((v) => v.id)
                .join(', ')}`,
              severity: 'error',
              path: 'container.variant',
            },
          ],
        )
      }
      return getContainerSnippet(input.name, { variantId })
    }
    return getContainerSnippet(input.name)
  },
}
