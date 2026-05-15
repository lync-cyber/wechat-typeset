import { recommendPersona, type RecommendInput, type RecommendResult } from '../heuristics/recommend'
import type { Command } from '../types'

export const personasRecommendCommand: Command<RecommendInput, RecommendResult> = {
  name: 'personas recommend',
  description:
    'Heuristic top-3 persona recommendation from { title, summary, topic?, style? } using keyword-table + style-anchor scoring. Returns { ranked[], recommendNew, rationaleOneLine }.',
  inputSchema: {
    type: 'object',
    required: ['title', 'summary'],
    properties: {
      title: { type: 'string' },
      summary: { type: 'string' },
      topic: {
        type: 'string',
        description: '题材：技术 / 财经 / 人文 / 生活 / 学术 / 数据 / 文化 / 其他',
      },
      style: { type: 'string', description: '参照锚点（如 FT中文 / Stripe Docs / Kinfolk）' },
    },
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    required: ['ranked', 'recommendNew', 'rationaleOneLine'],
    properties: {
      ranked: { type: 'array' },
      recommendNew: { type: 'boolean' },
      rationaleOneLine: { type: 'string' },
    },
    additionalProperties: false,
  },
  run(input) {
    return recommendPersona(input)
  },
}
