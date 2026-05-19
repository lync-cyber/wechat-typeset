import {
  getDefaultKickers,
  getPersona,
  getRecommendedVariantsFor,
  getThemeCapabilities,
  type ThemeCapabilitiesView,
} from '../../../../src/public'
import type { Command } from '../types'

interface PersonasCapabilitiesInput {
  id: string
}

interface PersonasCapabilitiesOutput {
  persona: {
    id: string
    name: string
    description: string
    audience: string
    palettePrimary: string
  }
  defaultVariants: ThemeCapabilitiesView['defaultVariants']
  recommendedVariants: ReturnType<typeof getRecommendedVariantsFor>
  recommendedVariantOverrides: ThemeCapabilitiesView['recommendedVariantOverrides']
  containers: ThemeCapabilitiesView['containers']
  kickers: Record<string, string>
}

export const personasCapabilitiesCommand: Command<
  PersonasCapabilitiesInput,
  PersonasCapabilitiesOutput
> = {
  name: 'personas capabilities',
  description:
    'Aggregate "what works in this theme" view: defaultVariants, recommendedVariants (themeCompat reverse index), containers[] (with available / signature / pack / namespace), kickers.',
  inputSchema: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string' } },
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    required: [
      'persona',
      'defaultVariants',
      'recommendedVariants',
      'recommendedVariantOverrides',
      'containers',
      'kickers',
    ],
    properties: {
      persona: { type: 'object', additionalProperties: true },
      defaultVariants: { type: 'object', additionalProperties: true },
      recommendedVariants: { type: 'object', additionalProperties: true },
      recommendedVariantOverrides: { type: 'object', additionalProperties: true },
      containers: { type: 'array' },
      kickers: { type: 'object', additionalProperties: { type: 'string' } },
    },
    additionalProperties: false,
  },
  readOnly: true,
  run(input) {
    const spec = getPersona(input.id)
    const view = getThemeCapabilities(input.id)
    const recommended = getRecommendedVariantsFor(input.id)
    const kickers = { ...getDefaultKickers(), ...(spec.kickers ?? {}) }
    return {
      persona: {
        id: spec.id,
        name: spec.name,
        description: spec.description,
        audience: spec.audience,
        palettePrimary: spec.palette.primary,
      },
      defaultVariants: view.defaultVariants,
      recommendedVariants: recommended,
      recommendedVariantOverrides: view.recommendedVariantOverrides,
      containers: view.containers,
      kickers,
    }
  },
}
