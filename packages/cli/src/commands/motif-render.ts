import {
  renderMotif,
  renderMotifWithValues,
  WtException,
  type MotifShape,
  type MotifTemplate,
} from '../../../../src/public'
import type { Command } from '../types'

interface MotifRenderInput {
  shape?: MotifShape
  template?: MotifTemplate
  values?: Record<string, string | number>
}

export const motifRenderCommand: Command<MotifRenderInput, string> = {
  name: 'motif render',
  description:
    'Render a motif AST → SVG string. Provide EXACTLY ONE of `shape` (plain MotifShape) OR `template` (+ optional `values` for {placeholder} substitution). Passing both or neither throws CONTRACT_VIOLATION.',
  inputSchema: {
    type: 'object',
    properties: {
      shape: {
        type: 'object',
        description: 'Plain MotifShape AST.',
        additionalProperties: true,
      },
      template: {
        type: 'object',
        description: 'MotifTemplate AST with {placeholder} slots.',
        additionalProperties: true,
      },
      values: {
        type: 'object',
        description: 'Map of placeholder name → substitution value. Only used with `template`.',
        additionalProperties: { type: ['string', 'number'] },
      },
    },
    oneOf: [
      { required: ['shape'] },
      { required: ['template'] },
    ],
    additionalProperties: false,
  },
  outputSchema: { type: 'string' },
  run(input) {
    const hasShape = input.shape !== undefined
    const hasTemplate = input.template !== undefined
    if (hasShape && hasTemplate) {
      throw new WtException(
        'CONTRACT_VIOLATION',
        [
          {
            message: 'motif render accepts EXACTLY ONE of `shape` or `template`, got both',
            severity: 'error',
            path: 'motif.input',
          },
        ],
      )
    }
    if (!hasShape && !hasTemplate) {
      throw new WtException(
        'CONTRACT_VIOLATION',
        [
          {
            message: 'motif render requires either `shape` or `template`',
            severity: 'error',
            path: 'motif.input',
          },
        ],
      )
    }
    if (hasTemplate) {
      return renderMotifWithValues(input.template!, input.values ?? {})
    }
    return renderMotif(input.shape!)
  },
}
