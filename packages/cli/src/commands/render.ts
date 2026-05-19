import { listPublishPlatforms, render, type PersonaSpec } from '../../../../src/public'
import type { Command } from '../types'

interface RenderInput {
  md: string
  persona?: string
  spec?: PersonaSpec
  platform?: string
  dryRun?: boolean
  asDocument?: boolean
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

const H1_RE = /^# (.+)$/m

function deriveTitle(md: string): string {
  const m = H1_RE.exec(md)
  return m ? m[1].trim() : 'wechat-typeset 渲染'
}

function wrapDocument(fragment: string, title: string): string {
  return [
    '<!DOCTYPE html>',
    '<html lang="zh">',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    `<title>${title}</title>`,
    '</head>',
    '<body style="margin:0;padding:0;background:#fff;">',
    fragment,
    '</body>',
    '</html>',
  ].join('\n')
}

export const renderCommand: Command<RenderInput, RenderOutput> = {
  name: 'markdown render',
  description:
    'Render markdown → HTML through the full pipeline (markdown-it + theme injection + wxPatch). Canonical name; `render` is kept as a deprecated alias.\n\n`dryRun: true` skips HTML output but still computes wordCount / readingTime / pageConfig / frontmatterIssues (html is empty string, patchLog has no entries). Useful for batch cost estimation before paying for full rendering.\n\n`asDocument: true` wraps the fragment in a complete HTML document (<!DOCTYPE html> … </html>); title is derived from frontmatter, then the first H1 in the markdown, then falls back to "wechat-typeset 渲染". No-op when dryRun is also true.',
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
      dryRun: {
        type: 'boolean',
        description:
          'When true, skip HTML rendering and return an empty html string with patchLog { entries: [], total: 0 }. Metadata (wordCount, readingTime, pageConfig, frontmatterIssues) is still computed.',
      },
      asDocument: {
        type: 'boolean',
        description:
          'When true, wrap the rendered fragment in a complete HTML document. Title is resolved from frontmatter → first H1 → fallback string. No-op when dryRun is true.',
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

    if (input.dryRun) {
      return {
        html: '',
        wordCount: out.wordCount,
        readingTime: out.readingTime,
        patchLog: { entries: [], total: 0 },
        frontmatterIssues: out.frontmatterIssues,
        pageConfig: out.pageConfig,
      }
    }

    const title = deriveTitle(input.md)
    const html = input.asDocument ? wrapDocument(out.html, title) : out.html

    return {
      html,
      wordCount: out.wordCount,
      readingTime: out.readingTime,
      patchLog: out.patchLog,
      frontmatterIssues: out.frontmatterIssues,
      pageConfig: out.pageConfig,
    }
  },
}
