/**
 * `palette lookup-token` —— 字面 hex → ctx.tokens 路径反查（LLM 写 variant.ts 时调）。
 *
 * 用例：LLM 看到设计稿 IR 里的 `#a03a2a`，要写 `${ctx.tokens.colors.???}`。直接调本命令
 * 拿确定性建议，比让 LLM 猜 token 字典精确得多。
 *
 *   输入: { literal: "#a03a2a", themeId: "literary-humanism" }
 *
 *   输出:
 *     {
 *       "literal": "#a03a2a",
 *       "preferred": {
 *         "themeId": "literary-humanism",
 *         "paletteKey": "accentClassical",
 *         "ctxPath": "tokens.colors.accentClassical"
 *       },
 *       "matches": [
 *         { "themeId": "literary-humanism", "paletteKey": "accentClassical", ... }
 *       ],
 *       "alternatives": [],
 *       "advice": "..."
 *     }
 *
 * 数据来源：[src/core/design-ir/build-token-index] 从 ORDERED_SPECS 派生。改主题
 * palette 后下一次命令调用即生效，不需要重启或重生 IR。
 */

import {
  lookupToken,
  type TokenHit,
} from '../../../../src/core/design-ir'
import type { Command } from '../types'

interface PaletteLookupInput {
  /** 字面色（hex），如 '#a03a2a' / '#1f1b14'。支持 #RGB / #RRGGBB / #RRGGBBAA。 */
  literal: string
  /**
   * 偏好的实现主题 id（如 'literary-humanism'）。
   * 命令优先返回该主题 palette 内的命中；该主题无此色时降级到跨主题命中。
   * 缺省 = 不偏好，返回全部命中按主题 id 字典序。
   */
  themeId?: string
}

export interface PaletteLookupOutput {
  literal: string
  /** 推荐主题内的命中（null = 推荐主题 palette 不含此色 OR 未指定推荐主题）。 */
  preferred: TokenHit | null
  /** 推荐主题内的命中（preferred 的 list 版本，便于同 hex 出现在多个 key 时枚举）。 */
  matches: readonly TokenHit[]
  /** 其它主题内的命中（跨主题借鉴：该色在别处叫什么）。 */
  alternatives: readonly TokenHit[]
  /** 人类可读建议字符串，给 LLM 直接读。 */
  advice: string
}

export const paletteLookupTokenCommand: Command<PaletteLookupInput, PaletteLookupOutput> = {
  name: 'palette lookup-token',
  description: [
    'Look up a literal color hex in the 18-theme palette index.',
    'Returns ctx.tokens path suggestions (preferred theme first), so variant authors and LLMs',
    'can write `${ctx.tokens.colors.<key>}` instead of guessing or hardcoding hex.',
    'Data source: derived from src/core/themes/registry.ts ORDERED_SPECS — auto-syncs with palette changes.',
  ].join(' '),
  inputSchema: {
    type: 'object',
    properties: {
      literal: {
        type: 'string',
        description: 'Literal color hex (#RGB / #RRGGBB / #RRGGBBAA). Plain CSS color names like "transparent" are returned with empty matches.',
      },
      themeId: {
        type: 'string',
        description: 'Preferred implementation theme id (e.g. "literary-humanism"). Hits in this theme appear in `preferred` / `matches`; hits in other themes go to `alternatives`.',
      },
    },
    required: ['literal'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      literal: { type: 'string' },
      preferred: { type: ['object', 'null'], additionalProperties: true },
      matches: { type: 'array' },
      alternatives: { type: 'array' },
      advice: { type: 'string' },
    },
    required: ['literal', 'preferred', 'matches', 'alternatives', 'advice'],
  },
  readOnly: true,
  run(input) {
    const result = lookupToken(input.literal, input.themeId)
    const matches = input.themeId
      ? result.hits.filter((h) => h.themeId === input.themeId)
      : result.hits
    const alternatives = input.themeId
      ? result.hits.filter((h) => h.themeId !== input.themeId)
      : []

    const advice = buildAdvice(result.literal, input.themeId, result.preferred, matches, alternatives)

    return {
      literal: result.literal,
      preferred: result.preferred,
      matches,
      alternatives,
      advice,
    }
  },
}

function buildAdvice(
  literal: string,
  themeId: string | undefined,
  preferred: TokenHit | null,
  matches: readonly TokenHit[],
  alternatives: readonly TokenHit[],
): string {
  if (preferred) {
    const dupHint = matches.length > 1
      ? `（该主题 palette 内同色还有 ${matches.length - 1} 处：${matches.slice(1).map((m) => m.paletteKey).join(' / ')}）`
      : ''
    return `在 variant render 中写 \`\${ctx.${preferred.ctxPath}}\`${dupHint}。`
  }

  if (matches.length === 0 && alternatives.length === 0) {
    if (themeId) {
      return `字面 ${literal} 未在任何主题 palette 登记。如该色将进入 ${themeId}，建议把它加到 ${themeId}/persona.data.ts 的 palette 语义槽（如 textCaption / highlightBg / codeBg / quoteCardBg / noteBorder / accentClassical / accentNaturalist）。`
    }
    return `字面 ${literal} 未在任何主题 palette 登记。如果是平台中性色（transparent / currentColor 等），直接保留字面；否则需要主题作者把它加到 palette 语义槽。`
  }

  // 推荐主题无命中但其它主题有 → 跨主题借鉴
  if (alternatives.length > 0 && themeId) {
    const first = alternatives[0]
    const themeList = Array.from(new Set(alternatives.map((a) => a.themeId))).slice(0, 3).join(' / ')
    return `字面 ${literal} 不在 ${themeId} 的 palette，但在其它主题登记为 ${first.paletteKey}（来自 ${themeList}）。两条路径：(1) 把同名字段加进 ${themeId}/persona.data.ts 的 palette（推荐——保持跨主题语义一致）；(2) 在 variant 里写一个仅 ${themeId} 启用的 fallback。`
  }

  // 未指定 themeId 时
  if (matches.length > 0) {
    const themeList = Array.from(new Set(matches.map((m) => m.themeId))).slice(0, 3).join(' / ')
    return `字面 ${literal} 在多个主题登记为 ${matches[0].paletteKey}（${themeList}）。在 variant render 中写 \`\${ctx.${matches[0].ctxPath}}\`。`
  }

  return `字面 ${literal} 在 ${alternatives.length} 个其它主题登记，但你没有指定 themeId。建议指定 themeId 重查以获得精准建议。`
}
