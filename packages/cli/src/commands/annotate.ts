import { annotateMarkdown, type AnnotateResult } from '../heuristics/annotate'
import { getPersona } from '../../../../src/public'
import type { Command } from '../types'

interface AnnotateInput {
  md: string
  persona: string
}

export const annotateCommand: Command<AnnotateInput, AnnotateResult> = {
  name: 'annotate',
  description:
    'Heuristic block-level patch proposals for raw markdown: scan paragraphs / lists / blockquotes / headings, suggest ::: container wraps consistent with theme capabilities. Returns { patches[], capabilitySnapshot, vocabularySubset, blockCount }.',
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
      patches: { type: 'array' },
      capabilitySnapshot: { type: 'object', additionalProperties: true },
      vocabularySubset: { type: 'array' },
      blockCount: { type: 'integer' },
    },
    additionalProperties: false,
  },
  run(input) {
    getPersona(input.persona)
    return annotateMarkdown(input.md, input.persona)
  },
}
