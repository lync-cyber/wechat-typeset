import { createRequire } from 'node:module'
import { buildCapabilitiesV3, type CapabilitiesV3 } from '../../../../src/core/capabilities/build'
import type { Command } from '../types'

const require_ = createRequire(import.meta.url)
const pkg = require_('../../package.json') as { name: string; version: string; homepage?: string }

export const capabilitiesCommand: Command<Record<string, never>, CapabilitiesV3> = {
  name: 'capabilities',
  description:
    'Return the full capabilities object (same shape as dist/api/capabilities.json) without writing to disk. URI fields are empty strings when called from CLI; the build script fills them with jsDelivr URLs.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  outputSchema: { type: 'object', additionalProperties: true },
  readOnly: true,
  run() {
    return buildCapabilitiesV3({
      toolName: pkg.name,
      toolVersion: pkg.version,
      toolRepo: pkg.homepage,
    })
  },
}
