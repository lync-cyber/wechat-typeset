import { WT_ERROR_INFO } from '../../../../src/public'
import type { Command } from '../types'

interface ErrorCodeEntry {
  code: string
  exitCode: number
  description: string
}

export const errorCodesListCommand: Command<Record<string, never>, ErrorCodeEntry[]> = {
  name: 'error-codes list',
  description:
    'Return all WtException error codes with their CLI exit code and one-line description.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  outputSchema: {
    type: 'array',
    items: {
      type: 'object',
      required: ['code', 'exitCode', 'description'],
      properties: {
        code: { type: 'string' },
        exitCode: { type: 'number' },
        description: { type: 'string' },
      },
      additionalProperties: false,
    },
  },
  readOnly: true,
  run() {
    return (Object.keys(WT_ERROR_INFO) as Array<keyof typeof WT_ERROR_INFO>).map((code) => ({
      code,
      exitCode: WT_ERROR_INFO[code].exitCode,
      description: WT_ERROR_INFO[code].description,
    }))
  },
}
