import { applyPatches, type AnnotateApplyResult } from '../heuristics/apply'
import type { AnnotatePatch } from '../heuristics/annotate'
import type { Command } from '../types'

interface AnnotateApplyInput {
  md: string
  patches: readonly AnnotatePatch[]
}

const PATCH_KINDS = [
  'wrap_paragraph',
  'wrap_blockquote',
  'convert_list',
  'wrap_first_paragraph',
  'wrap_section_title',
  'wrap_pros_cons',
] as const

const CONFIDENCE_VALUES = ['high', 'medium', 'low'] as const

export const annotateApplyCommand: Command<AnnotateApplyInput, AnnotateApplyResult> = {
  name: 'markdown annotate apply',
  description:
    "Pure function `(md, patches[]) → newMd`. Applies the patch plan from `markdown annotate` mechanically: each patch wraps its declared line range in `::: <container>[ variant=X]` (or `::::` for 4-fence containers). Patches are applied in descending line order so earlier ranges stay valid. Returns { md, applied, skipped[] } — overlapping ranges, invalid line numbers, unknown containers, and `wrap_pros_cons` (which requires manual structure) are reported in `skipped[]` with a reason. The function never throws. Canonical name; `annotate apply` is kept as a deprecated alias.",
  inputSchema: {
    type: 'object',
    required: ['md', 'patches'],
    properties: {
      md: { type: 'string', description: 'Original markdown source (line numbers in `patches` are 1-indexed against this).' },
      patches: {
        type: 'array',
        description: 'Patch plan, typically the `patches[]` field from `annotate` output.',
        items: {
          type: 'object',
          required: ['line', 'endLine', 'kind', 'container'],
          properties: {
            line: { type: 'integer', minimum: 1 },
            endLine: { type: 'integer', minimum: 1 },
            kind: { enum: PATCH_KINDS as unknown as string[] },
            container: { type: 'string' },
            variant: { type: 'string' },
            reason: { type: 'string' },
            confidence: { enum: CONFIDENCE_VALUES as unknown as string[] },
            preview: { type: 'string' },
          },
          additionalProperties: true,
        },
      },
    },
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    required: ['md', 'applied', 'skipped'],
    properties: {
      md: { type: 'string' },
      applied: { type: 'integer' },
      skipped: {
        type: 'array',
        items: {
          type: 'object',
          required: ['patch', 'reason'],
          properties: {
            patch: { type: 'object', additionalProperties: true },
            reason: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
    },
    additionalProperties: false,
  },
  readOnly: true,
  run(input) {
    return applyPatches(input.md, input.patches)
  },
}
