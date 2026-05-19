import { getPersona, validatePersona } from '../../../../src/public'
import type { PersonaSpec, SpecValidationResult } from '../../../../src/public'
import type { Command } from '../types'

interface PersonasDeriveInput {
  base: string
  patch: Record<string, unknown>
  id?: string
  name?: string
}

interface PersonasDeriveOutput {
  spec: PersonaSpec
  validation: SpecValidationResult
}

export const personasDeriveCommand: Command<PersonasDeriveInput, PersonasDeriveOutput> = {
  name: 'personas derive',
  description:
    'Derive a new PersonaSpec by merging a patch over a base persona. Shallow-merges palette / variants / meta / motifs per key. Returns the merged spec + validation result without throwing on validation failure.',
  inputSchema: {
    type: 'object',
    required: ['base', 'patch'],
    properties: {
      base: { type: 'string', description: 'Base persona id (must exist).' },
      patch: {
        type: 'object',
        description: 'Partial PersonaSpec to merge over the base.',
        additionalProperties: true,
      },
      id: { type: 'string', description: 'Override id for the derived persona.' },
      name: { type: 'string', description: 'Override name for the derived persona.' },
    },
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    required: ['spec', 'validation'],
    properties: {
      spec: { type: 'object', additionalProperties: true },
      validation: {
        type: 'object',
        required: ['ok', 'errors', 'warnings'],
        properties: {
          ok: { type: 'boolean' },
          errors: { type: 'array', items: { type: 'object', additionalProperties: true } },
          warnings: { type: 'array', items: { type: 'object', additionalProperties: true } },
        },
        additionalProperties: false,
      },
    },
    additionalProperties: false,
  },
  readOnly: true,
  run(input) {
    const baseSpec = getPersona(input.base)
    const patch = input.patch as Partial<PersonaSpec> & Record<string, unknown>

    const random4 = Math.random().toString(36).slice(2, 6)
    const derivedId = input.id ?? (patch.id as string | undefined) ?? `${baseSpec.id}-derived-${random4}`
    const derivedName = input.name ?? (patch.name as string | undefined) ?? `${baseSpec.name} · 派生`

    const patchMeta = patch.meta as Record<string, unknown> | undefined
    const mergedMeta = {
      ...baseSpec.meta,
      ...patchMeta,
      createdAt:
        (patchMeta?.createdAt as string | undefined) ??
        baseSpec.meta.createdAt ??
        new Date().toISOString().slice(0, 10),
      basedOn: input.base,
    } as PersonaSpec['meta']

    const merged: PersonaSpec & Record<string, unknown> = {
      ...baseSpec,
      ...patch,
      id: derivedId,
      name: derivedName,
      palette: { ...baseSpec.palette, ...(patch.palette as object | undefined) },
      variants: { ...baseSpec.variants, ...(patch.variants as object | undefined) },
      motifs: mergeMotifs(baseSpec.motifs, patch.motifs as object | undefined),
      meta: mergedMeta,
    }

    const validation = validatePersona(merged as PersonaSpec)

    return { spec: merged as PersonaSpec, validation }
  },
}

function mergeMotifs(
  base: PersonaSpec['motifs'],
  patchMotifs: object | undefined,
): PersonaSpec['motifs'] {
  if (!patchMotifs) return base
  return { ...base, ...patchMotifs }
}
