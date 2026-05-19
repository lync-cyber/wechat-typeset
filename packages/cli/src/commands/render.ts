import { listPublishPlatforms, render, type PersonaSpec } from '../../../../src/public'
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

const PLATFORM_IDS = listPublishPlatforms().map((p) => p.id)

export const renderCommand: Command<RenderInput, RenderOutput> = {
  name: 'markdown render',
  description:
    'Render markdown → HTML through the full pipeline (markdown-it + theme injection + wxPatch). Canonical name; `render` is kept as a deprecated alias.',
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
        description:
          "Publish target id; defaults to 'wechat'. Use `platforms list` to enumerate available ids.",
        enum: PLATFORM_IDS,
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
      patchLog: {
        type: 'object',
        required: ['entries', 'total'],
        properties: {
          entries: {
            type: 'array',
            items: {
              type: 'object',
              required: ['patch', 'label', 'count'],
              properties: {
                patch: { type: 'string' },
                label: { type: 'string' },
                count: { type: 'integer' },
                samples: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: ['selector', 'before'],
                    properties: {
                      selector: { type: 'string' },
                      before: { type: 'string' },
                    },
                    additionalProperties: false,
                  },
                },
              },
              additionalProperties: false,
            },
          },
          total: { type: 'integer' },
        },
        additionalProperties: false,
      },
      frontmatterIssues: {
        type: 'array',
        items: {
          type: 'object',
          required: ['path', 'message', 'severity'],
          properties: {
            path: { type: 'string' },
            message: { type: 'string' },
            severity: { enum: ['error', 'warning'] },
          },
          additionalProperties: false,
        },
      },
      pageConfig: {
        type: 'object',
        properties: {
          variants: { type: 'object', additionalProperties: { type: 'string' } },
          theme: { type: 'string' },
        },
        additionalProperties: false,
      },
    },
    additionalProperties: true,
  },
  readOnly: true,
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
