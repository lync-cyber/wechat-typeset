#!/usr/bin/env tsx
/**
 * validate-and-fix —— 读 spec.json → validatePersona → 输出修复建议。
 *
 * 修复建议设计：每条 error 渲染成"可直接喂回 LLM 的 self-correct prompt"，
 * 含 path / message / fix-hint。LLM 拿到这份建议表 + 原 spec，能稳定 self-correct。
 *
 * 用法：
 *   tsx validate-and-fix.ts <spec.json>
 *
 * 退出码：
 *   0 ok=true
 *   1 参数 / IO 错
 *   2 ok=false（有 errors）
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { validatePersona, type PersonaSpec, type SpecValidationResult } from '../../../src/public'

interface FixHint {
  path: string
  message: string
  severity: 'error' | 'warning'
  hint: string
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
    hint: 'motif text.fontSize 必须 ≥ 14（公众号 SVG 光栅化的 CJK 字号底线）',
  },
  {
    match: /strokeWidth.*< ?1|MIN_STROKE_WIDTH/i,
    hint: 'motif strokeWidth 必须 ≥ 1（亚像素描边在公众号会消失）',
  },
  {
    match: /fontFamily/i,
    hint: 'motif text.fontFamily 只能是 serif / sans-serif / monospace；其他不保证渲染',
  },
  {
    match: /placeholders/i,
    hint:
      'MotifTemplate 的 placeholders 必须声明 primitives 里出现的所有 {name} 占位符，' +
      '反之 placeholders 声明的也应在 primitives 里用到（否则警告）',
  },
  {
    match: /signatureContainers.*\d/i,
    hint:
      'signatureContainers 项必须在 SUPPORTED_SIGNATURE_CONTAINERS 白名单内（camelCase id），' +
      '用 getSupportedSignatureContainers() 查',
  },
  {
    match: /variants\.\w+/i,
    hint:
      'variants 各 slot 的 id 必须在 VARIANT_IDS.<kind> 白名单内，' +
      '用 getVariantIds() 查；常见幻觉如 glow / modern / flat 不存在',
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

function hintFor(path: string, message: string): string {
  for (const { match, hint } of HINT_TABLE) {
    if (match.test(`${path} ${message}`)) return hint
  }
  return '查 hard-rules.md 寻找匹配规则'
}

function loadSpec(p: string): PersonaSpec {
  const txt = readFileSync(resolve(process.cwd(), p), 'utf8')
  try {
    return JSON.parse(txt) as PersonaSpec
  } catch (e) {
    process.stderr.write(`[validate-and-fix] failed to parse JSON: ${(e as Error).message}\n`)
    process.exit(1)
  }
}

function renderCorrectPrompt(spec: PersonaSpec, result: SpecValidationResult, hints: FixHint[]): string {
  return [
    '你刚才生成的 PersonaSpec 校验失败，请按以下 errors 修正后重新输出完整 JSON：',
    '',
    '## 失败列表',
    ...hints.map(
      (h, i) =>
        `${i + 1}. [${h.severity.toUpperCase()}] path: \`${h.path}\`\n` +
        `   message: ${h.message}\n` +
        `   hint: ${h.hint}`,
    ),
    '',
    '## 原 spec（请在此基础上改，不要从头重写丢失字段）',
    '```json',
    JSON.stringify(spec, null, 2),
    '```',
    '',
    '请输出修正后的完整 PersonaSpec JSON 对象，不要包 markdown 代码块。',
  ].join('\n')
}

function main() {
  const path = process.argv[2]
  if (!path) {
    process.stderr.write('[validate-and-fix] usage: tsx validate-and-fix.ts <spec.json>\n')
    process.exit(1)
  }

  const spec = loadSpec(path)
  const result = validatePersona(spec)

  const hints: FixHint[] = [
    ...result.errors.map((e) => ({ ...e, hint: hintFor(e.path, e.message) })),
    ...result.warnings.map((w) => ({ ...w, hint: hintFor(w.path, w.message) })),
  ]

  if (result.ok) {
    const payload = {
      ok: true,
      persona_id: spec.id,
      warnings: hints.filter((h) => h.severity === 'warning'),
    }
    process.stdout.write(JSON.stringify(payload, null, 2) + '\n')
    process.exit(0)
  }

  const payload = {
    ok: false,
    persona_id: spec.id,
    errors: hints.filter((h) => h.severity === 'error'),
    warnings: hints.filter((h) => h.severity === 'warning'),
    correct_prompt: renderCorrectPrompt(spec, result, hints),
  }
  process.stdout.write(JSON.stringify(payload, null, 2) + '\n')
  process.exit(2)
}

main()
