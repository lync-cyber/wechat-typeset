import {
  parseFrontmatter,
  type FrontmatterParseIssue,
  type PageConfig,
} from '../../../../src/public'
import type { Command } from '../types'

interface FrontmatterParseInput {
  md: string
}

interface FrontmatterParseOutput {
  config: PageConfig
  body: string
  issues: FrontmatterParseIssue[]
}

export const frontmatterParseCommand: Command<FrontmatterParseInput, FrontmatterParseOutput> = {
  name: 'frontmatter parse',
  description:
    'Parse the YAML frontmatter block at the top of a markdown string. Returns config (variants/theme overrides), the stripped body, and any parse issues. Never throws — issues are non-fatal.',
  inputSchema: {
    type: 'object',
    required: ['md'],
    properties: { md: { type: 'string', description: 'Markdown source (may start with ---\\n...\\n--- frontmatter).' } },
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    required: ['config', 'body', 'issues'],
    properties: {
      config: { type: 'object', additionalProperties: true },
      body: { type: 'string' },
      issues: { type: 'array', items: { type: 'object', additionalProperties: true } },
    },
    additionalProperties: false,
  },
  readOnly: true,
  run(input) {
    return parseFrontmatter(input.md)
  },
}
