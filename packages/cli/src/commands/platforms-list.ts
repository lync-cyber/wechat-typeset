import { listPublishPlatforms, type PublicPlatformInfo } from '../../../../src/public'
import type { Command } from '../types'

export const platformsListCommand: Command<Record<string, never>, readonly PublicPlatformInfo[]> = {
  name: 'platforms list',
  description:
    'List all registered publish-target platforms (id / name / status). Use these ids in `render --platform`. status enum: stable | beta | placeholder.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  outputSchema: {
    type: 'array',
    items: {
      type: 'object',
      required: ['id', 'name', 'status'],
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        status: { enum: ['stable', 'beta', 'placeholder'] },
      },
      additionalProperties: false,
    },
  },
  readOnly: true,
  run() {
    return listPublishPlatforms()
  },
}
