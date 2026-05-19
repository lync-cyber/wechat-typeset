import { getInlineExtensions, WtException } from '../../../../src/public'
import type { Command } from '../types'

interface InlineExtensionsSnippetInput {
  syntax: string
}

export const inlineExtensionsSnippetCommand: Command<InlineExtensionsSnippetInput, string> = {
  name: 'inline-extensions snippet',
  description:
    'Return the inputExample string for a given inline extension syntax (e.g. ==mark==). Throws RESOURCE_NOT_FOUND if the syntax is unknown.',
  inputSchema: {
    type: 'object',
    required: ['syntax'],
    properties: {
      syntax: { type: 'string', description: 'Inline extension syntax key (e.g. ==mark== / ~~del~~ / [.text.]).' },
    },
    additionalProperties: false,
  },
  outputSchema: { type: 'string' },
  readOnly: true,
  run(input) {
    const ext = getInlineExtensions().find((e) => e.syntax === input.syntax)
    if (!ext) {
      const known = getInlineExtensions().map((e) => e.syntax).join(', ')
      throw new WtException('RESOURCE_NOT_FOUND', [
        {
          message: `Unknown inline extension syntax "${input.syntax}". Known: ${known}`,
          severity: 'error',
          path: 'syntax',
        },
      ])
    }
    return ext.inputExample
  },
}
