import { recommendPersona, type RecommendInput, type RecommendResult } from '../heuristics/recommend'
import type { Command } from '../types'

export const personasRecommendCommand: Command<RecommendInput, RecommendResult> = {
  name: 'personas recommend',
  description:
    'Heuristic top-3 persona recommendation using keyword-table + style-anchor scoring. All fields are optional but at least one of title / summary / vibe / audience / topic / style must be non-empty (throws CONTRACT_VIOLATION otherwise). Returns { ranked[], recommendNew, rationaleOneLine }.',
  inputSchema: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      summary: { type: 'string' },
      topic: {
        type: 'string',
        description: '题材：技术 / 财经 / 人文 / 生活 / 学术 / 数据 / 文化 / 其他',
      },
      style: { type: 'string', description: '参照锚点（如 FT中文 / Stripe Docs / Kinfolk）' },
      vibe: {
        type: 'string',
        description: '自由文字氛围/美学描述（如"暖米底圆角，慢生活散文气质"、"VT220 琥珀字"）',
      },
      audience: {
        type: 'string',
        description: '目标读者描述（如"技术布道"、"财经内参"、"散文"）',
      },
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
  readOnly: true,
  run(input) {
    return recommendPersona(input)
  },
}
