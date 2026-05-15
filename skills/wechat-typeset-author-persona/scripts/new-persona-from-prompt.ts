#!/usr/bin/env tsx
/**
 * new-persona-from-prompt —— 产出"给 LLM 用的结构化输出 prompt"。
 *
 * 包含：
 *   - PersonaSpec 的 JSON Schema（getSchema 完整产物）
 *   - 硬约束摘要（11 键 palette / 4 态 status / motif 字号描边 / variant 白名单 / signatureContainers 白名单）
 *   - 邻近样例（用户指定 base_id 时拷该主题 spec 作为起点）
 *   - 用户视觉描述
 *
 * 不调 LLM——只输出 prompt。Agent 拿到后送给 LLM 做 structured output。
 *
 * 用法：
 *   tsx new-persona-from-prompt.ts --description "<视觉描述>" [--base-id <id>] [--out tmp/prompt.json]
 *
 * 退出码：
 *   0 成功
 *   1 参数错
 *   2 未知 base-id
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  HARD_RULES,
  getSchema,
  getSupportedSignatureContainers,
  getVariantIds,
  getPersona,
  listPersonas,
} from '../../../src/public'

interface CliArgs {
  description: string
  baseId?: string
  out?: string
}

function parseArgs(argv: string[]): CliArgs {
  const out: Record<string, string> = {}
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i]
    if (!k.startsWith('--')) fail(1, `expected flag, got "${k}"`)
    const v = argv[i + 1]
    if (v === undefined || v.startsWith('--')) fail(1, `flag ${k} expects a value`)
    out[k.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = v
    i++
  }
  if (!out.description) fail(1, '--description "<视觉描述>" required')
  return { description: out.description, baseId: out.baseId, out: out.out }
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[new-persona-from-prompt] ${msg}\n`)
  process.exit(code)
}

function buildHardRulesSummary() {
  return {
    hex_regex: HARD_RULES.hexPattern,
    min_font_size: HARD_RULES.minFontSize,
    min_stroke_width: HARD_RULES.minStrokeWidth,
    allowed_font_families: HARD_RULES.allowedFontFamilies,
    forbidden_css_props: [
      'font-family',
      'position: absolute/fixed/sticky',
      'float: left/right',
      'display: flex + gap (gap 微信 Android 不支持)',
      '@media / @keyframes / :hover',
      '-webkit-* prefixes',
      '::before / ::after',
    ],
    palette_required_keys: [
      'primary', 'secondary', 'accent', 'bg', 'bgSoft', 'bgMuted',
      'text', 'textMuted', 'textInverse', 'border', 'code',
    ],
    status_required_keys: ['tip', 'info', 'warning', 'danger'],
    status_pair_keys: ['accent', 'soft'],
    signature_containers_whitelist: getSupportedSignatureContainers(),
    variant_ids_whitelist: getVariantIds(),
  }
}

function buildPrompt(args: CliArgs, baseSpec: unknown | null) {
  const schema = getSchema()
  const hard = buildHardRulesSummary()
  const sister = listPersonas().map((p) => ({
    id: p.id,
    description: p.description,
    audience: p.audience,
    palette: { primary: p.palette.primary, bg: p.palette.bg },
  }))

  return {
    instruction: [
      '你是 wechat-typeset 主题作者。请按以下规则产出一份 PersonaSpec JSON：',
      '',
      '1. 严格匹配 schema（draft-07）。',
      '2. 不要在 JSON 里写 $comment 之类的注解字段。',
      '3. motif 必须是 AST（primitives 数组），不允许塞 raw SVG 字符串。',
      '4. 所有 hex 用 6 位（含 # 共 7 字符），except primary/accent 等长度可不同但必须匹配 hex_regex。',
      '5. 所有 motif 内 text.fontSize ≥ ' + HARD_RULES.minFontSize + '，所有 strokeWidth ≥ ' + HARD_RULES.minStrokeWidth + '。',
      '6. motif 内 text.fontFamily 只能是 ' + HARD_RULES.allowedFontFamilies.join(' / ') + '。',
      '7. signatureContainers 只能取 whitelist 内的 camelCase id，且要确认对应主题真的会在该容器上提供视觉。',
      '8. variants 各 slot 的 id 必须在 variant_ids_whitelist 内。',
      '9. meta.createdAt 必填（ISO 日期 YYYY-MM-DD）。',
      '',
      '请直接输出 JSON 对象，不要包 markdown 代码块、不要前后多余文字。',
    ].join('\n'),
    user_description: args.description,
    base_spec_or_null: baseSpec,
    schema,
    hard_rules: hard,
    sister_persona_signatures: sister,
  }
}

function main() {
  const args = parseArgs(process.argv)

  let baseSpec: unknown | null = null
  if (args.baseId) {
    try {
      baseSpec = getPersona(args.baseId)
    } catch (e) {
      const known = listPersonas().map((p) => p.id).join(', ')
      process.stderr.write(
        `[new-persona-from-prompt] unknown --base-id "${args.baseId}". ` +
          `Known: ${known}\n`,
      )
      process.exit(2)
    }
  }

  const prompt = buildPrompt(args, baseSpec)
  const json = JSON.stringify(prompt, null, 2) + '\n'

  if (args.out) {
    const outPath = resolve(process.cwd(), args.out)
    writeFileSync(outPath, json, 'utf8')
    process.stderr.write(`[new-persona-from-prompt] wrote ${outPath}\n`)
  } else {
    process.stdout.write(json)
  }
}

main()
