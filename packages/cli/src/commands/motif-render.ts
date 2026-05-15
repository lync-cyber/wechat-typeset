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
    'Render a motif AST → SVG string. Use `shape` for a plain MotifShape; use `template` + `values` for a MotifTemplate with {placeholders}.',
  inputSchema: {
    type: 'object',
    properties: {
      shape: { type: 'object', additionalProperties: true },
      template: { type: 'object', additionalProperties: true },
      values: {
        type: 'object',
        additionalProperties: { type: ['string', 'number'] },
      },
    },
    additionalProperties: false,
  },
  outputSchema: { type: 'string' },
  run(input) {
    if (input.template) {
      return renderMotifWithValues(input.template, input.values ?? {})
    }
    if (input.shape) {
      return renderMotif(input.shape)
    }
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
  },
}
