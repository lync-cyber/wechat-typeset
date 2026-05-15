import { render, type PersonaSpec } from '../../../../src/public'
import type { Command } from '../types'

interface RenderInput {
  md: string
  persona?: string
  spec?: PersonaSpec
  platform?: string
}

interface RenderOutput {
  html: string
  wordCount: number
  readingTime: number
  patchLog?: unknown
  frontmatterIssues?: unknown
  pageConfig?: unknown
}

export const renderCommand: Command<RenderInput, RenderOutput> = {
  name: 'render',
  description:
    'Render markdown → HTML through the full pipeline (markdown-it + theme injection + wxPatch).',
  inputSchema: {
    type: 'object',
    required: ['md'],
    properties: {
      md: { type: 'string', description: 'Markdown source (may include frontmatter).' },
      persona: { type: 'string', description: 'Built-in persona id (mutually exclusive with spec).' },
      spec: {
        type: 'object',
        description: 'Inline PersonaSpec. Validated before render.',
        additionalProperties: true,
      },
      platform: {
        type: 'string',
        description: "Publish target id; defaults to 'wechat'.",
      },
    },
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    required: ['html', 'wordCount', 'readingTime'],
    properties: {
      html: { type: 'string' },
      wordCount: { type: 'integer' },
      readingTime: { type: 'integer' },
      patchLog: { type: 'object', additionalProperties: true },
      frontmatterIssues: { type: 'array' },
      pageConfig: { type: 'object', additionalProperties: true },
    },
    additionalProperties: true,
  },
  run(input) {
    const out = render({
      md: input.md,
      persona: input.persona,
      spec: input.spec,
      platform: input.platform,
    })
    return {
      html: out.html,
      wordCount: out.wordCount,
      readingTime: out.readingTime,
      patchLog: out.patchLog,
      frontmatterIssues: out.frontmatterIssues,
      pageConfig: out.pageConfig,
    }
  },
}
