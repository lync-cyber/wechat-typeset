import { HARD_RULES, type WtError } from '../../../../../src/public'

export interface ValidateError extends WtError {
  hint?: string
}

export interface ValidateOutput {
  ok: boolean
  errors: ValidateError[]
  warnings: ValidateError[]
}

const HINT_TABLE: Array<{ match: RegExp; hint: string }> = [
  {
    match: /palette\.\w+.*hex|hex.*palette/i,
    hint: '改成 ^#[0-9a-fA-F]{3,8}$ 形式（典型：#1f2937 / #2558b0 / #fefefe）',
  },
  {
    match: /palette.*required|palette\.\w+ missing/i,
    hint:
      'palette 11 键必齐：primary / secondary / accent / bg / bgSoft / bgMuted / ' +
      'text / textMuted / textInverse / border / code',
  },
  {
    match: /status.*missing|status\.(tip|info|warning|danger)/i,
    hint:
      'status 4 态齐全：tip / info / warning / danger，每态 { accent, soft } 成对。' +
      '最容易遗漏 info。',
  },
  {
    match: /fontSize.*< ?14|fontSize.*MIN_FONT_SIZE/i,
    hint: `motif text.fontSize 必须 ≥ ${HARD_RULES.minFontSize}（公众号 SVG 光栅化的 CJK 字号底线）`,
  },
  {
    match: /strokeWidth.*< ?1|MIN_STROKE_WIDTH/i,
    hint: `motif strokeWidth 必须 ≥ ${HARD_RULES.minStrokeWidth}（亚像素描边在公众号会消失）`,
  },
  {
    match: /fontFamily/i,
    hint: `motif text.fontFamily 只能是 ${HARD_RULES.allowedFontFamilies.join(' / ')}；其他不保证渲染`,
  },
  {
    match: /placeholders/i,
    hint:
      'MotifTemplate 的 placeholders 必须声明 primitives 里出现的所有 {name} 占位符，' +
      '反之声明的也应在 primitives 里用到（否则警告）',
  },
  {
    match: /signatureContainers.*\d/i,
    hint:
      'signatureContainers 项必须在 SUPPORTED_SIGNATURE_CONTAINERS 白名单内（camelCase id）',
  },
  {
    match: /variants\.\w+/i,
    hint:
      'variants 各 slot 的 id 必须在 VARIANT_IDS.<kind> 白名单内；常见幻觉如 glow / modern / flat 不存在',
  },
  {
    match: /id.*kebab|id.*pattern/i,
    hint: 'id 必须 ^[a-z][a-z0-9-]*$（小写字母数字连字符），与目录名一致',
  },
  {
    match: /(name|description|audience).*required/i,
    hint: 'name / description / audience 三者必填非空——LLM 选型主要靠这三项',
  },
  {
    match: /createdAt/i,
    hint: 'meta.createdAt 必填，ISO 日期格式 YYYY-MM-DD',
  },
]

export function attachHint(e: WtError): ValidateError {
  for (const { match, hint } of HINT_TABLE) {
    if (match.test(`${e.path ?? ''} ${e.message}`)) return { ...e, hint }
  }
  return { ...e }
}

import type { JSONSchema7 } from '../../../../../src/public'

const ISSUE_ITEM_SCHEMA: JSONSchema7 = {
  type: 'object',
  required: ['message', 'severity'],
  properties: {
    message: { type: 'string' },
    severity: { enum: ['error', 'warning'] },
    path: { type: 'string' },
    hint: { type: 'string' },
  },
  additionalProperties: false,
}

export const VALIDATE_OUTPUT_SCHEMA: JSONSchema7 = {
  type: 'object',
  required: ['ok', 'errors', 'warnings'],
  properties: {
    ok: { type: 'boolean' },
    errors: { type: 'array', items: ISSUE_ITEM_SCHEMA },
    warnings: { type: 'array', items: ISSUE_ITEM_SCHEMA },
  },
  additionalProperties: false,
}
