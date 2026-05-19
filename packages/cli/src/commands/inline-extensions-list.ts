import { getInlineExtensions, type InlineExtensionSpec } from '../../../../src/public'
import type { Command } from '../types'

export const inlineExtensionsListCommand: Command<Record<string, never>, readonly InlineExtensionSpec[]> = {
  name: 'inline-extensions list',
  description:
    'Return the full inline extension vocabulary (==mark==, ~~del~~, [.text.] etc.) with syntax, description, regex, input/output examples.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  outputSchema: { type: 'array', items: { type: 'object', additionalProperties: true } },
  readOnly: true,
  run() {
    return getInlineExtensions()
  },
}
