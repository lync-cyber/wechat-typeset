import { annotateMarkdown, type AnnotateResult } from '../heuristics/annotate'
import { getPersona } from '../../../../src/public'
import type { Command } from '../types'

interface AnnotateInput {
  md: string
  persona: string
}

export const annotateCommand: Command<AnnotateInput, AnnotateResult> = {
  name: 'markdown annotate',
  description:
    'Heuristic block-level patch proposals for raw markdown: scan paragraphs / lists / blockquotes / headings, suggest ::: container wraps consistent with theme capabilities. Returns { patches[], capabilitySnapshot, vocabularySubset, blockCount }. Canonical name; `annotate` is kept as a deprecated alias.',
  inputSchema: {
    type: 'object',
    required: ['md', 'persona'],
    properties: {
      md: { type: 'string' },
      persona: { type: 'string' },
    },
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    required: ['patches', 'capabilitySnapshot', 'vocabularySubset', 'blockCount'],
    properties: {
      patches: {
        type: 'array',
        items: {
          type: 'object',
          required: ['line', 'endLine', 'kind', 'container', 'reason', 'confidence', 'preview'],
          properties: {
            line: { type: 'integer', minimum: 1 },
            endLine: { type: 'integer', minimum: 1 },
            kind: {
              enum: [
                'wrap_paragraph',
                'wrap_blockquote',
                'convert_list',
                'wrap_first_paragraph',
                'wrap_section_title',
                'wrap_pros_cons',
              ],
            },
            container: { type: 'string' },
            variant: { type: 'string' },
            reason: { type: 'string' },
            confidence: { enum: ['high', 'medium', 'low'] },
            preview: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
      capabilitySnapshot: { type: 'object', additionalProperties: true },
      vocabularySubset: {
        type: 'array',
        items: {
          type: 'object',
          required: ['name', 'category', 'fenceLength', 'description', 'example'],
          properties: {
            name: { type: 'string' },
            category: { type: 'string' },
            fenceLength: { type: 'integer' },
            description: { type: 'string' },
            example: { type: 'string' },
          },
          additionalProperties: false,
        },
      },
      blockCount: { type: 'integer' },
    },
    additionalProperties: false,
  },
  readOnly: true,
  run(input) {
    getPersona(input.persona)
    return annotateMarkdown(input.md, input.persona)
  },
}
