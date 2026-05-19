import { render, WtException } from '../../../../src/public'
import type { Command } from '../types'
import type { WtErrorCode } from '../../../../src/public'

interface RenderBatchInput {
  md: string
  personas: string[]
  platform?: string
}

type PersonaResult =
  | { ok: true; html: string; wordCount: number; readingTime: number }
  | { ok: false; code: WtErrorCode | string; message: string }

interface RenderBatchOutput {
  results: Record<string, PersonaResult>
  total: number
  succeeded: number
  failed: number
}

export const markdownRenderBatchCommand: Command<RenderBatchInput, RenderBatchOutput> = {
  name: 'markdown render-batch',
  description:
    'Render one markdown source through multiple personas in a single call. Returns per-persona ok/html/wordCount/readingTime or error details. Failures are isolated per persona — one bad id does not abort the rest.',
  inputSchema: {
    type: 'object',
    required: ['md', 'personas'],
    properties: {
      md: { type: 'string', description: 'Markdown source (may include frontmatter).' },
      personas: {
        type: 'array',
        items: { type: 'string' },
        minItems: 1,
        description: 'Ordered list of persona ids to render against.',
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
    required: ['results', 'total', 'succeeded', 'failed'],
    properties: {
      results: {
        type: 'object',
        additionalProperties: {
          oneOf: [
            {
              type: 'object',
              required: ['ok', 'html', 'wordCount', 'readingTime'],
              properties: {
                ok: { type: 'boolean', enum: [true] },
                html: { type: 'string' },
                wordCount: { type: 'integer' },
                readingTime: { type: 'integer' },
              },
              additionalProperties: false,
            },
            {
              type: 'object',
              required: ['ok', 'code', 'message'],
              properties: {
                ok: { type: 'boolean', enum: [false] },
                code: { type: 'string' },
                message: { type: 'string' },
              },
              additionalProperties: false,
            },
          ],
        },
      },
      total: { type: 'integer' },
      succeeded: { type: 'integer' },
      failed: { type: 'integer' },
    },
    additionalProperties: false,
  },
  readOnly: true,
  run(input) {
    const results: Record<string, PersonaResult> = {}

    for (const persona of input.personas) {
      try {
        const out = render({ md: input.md, persona, platform: input.platform })
        results[persona] = {
          ok: true,
          html: out.html,
          wordCount: out.wordCount,
          readingTime: out.readingTime,
        }
      } catch (err) {
        if (err instanceof WtException) {
          results[persona] = {
            ok: false,
            code: err.code,
            message: err.errors[0]?.message ?? err.message,
          }
        } else {
          const message = err instanceof Error ? err.message : String(err)
          results[persona] = { ok: false, code: 'RENDER_FAILED', message }
        }
      }
    }

    const succeeded = Object.values(results).filter((r) => r.ok).length
    const failed = input.personas.length - succeeded

    return { results, total: input.personas.length, succeeded, failed }
  },
}
