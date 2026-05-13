#!/usr/bin/env tsx
/**
 * recommend-from-prompt —— 用户口语描述 → 输出"给 LLM 用的选型 prompt"。
 *
 * 与 wechat-typeset-annotate-markdown/scripts/recommend-persona.ts 的差异：
 *   - 本脚本（author-persona）：判断"复用 / 派生 / 全新造"，含"是否建议造新"信号
 *   - annotate-markdown 版：只判"在 9 个内置里选哪个"，不输出"造新"建议
 *
 * 用法：
 *   tsx recommend-from-prompt.ts --description "<用户描述>"
 *   tsx recommend-from-prompt.ts --description "..." --style "<参照锚点>"
 *
 * 输出：JSON 到 stdout，结构见 OUTPUT_SHAPE。
 *
 * 设计：脚本本身不调 LLM，只产 prompt + 候选 spec 摘要；agent 拿到输出后让 LLM 决策。
 */

import { listPersonas } from '../../../src/public'

interface CliArgs {
  description: string
  style?: string
}

interface OutputShape {
  candidates: Array<{
    id: string
    name: string
    description: string
    audience: string
    palette_signature: { primary: string; bg: string; bgSoft: string }
    variants_signature: Record<string, string>
    signature_containers: readonly string[]
  }>
  user_input: { description: string; style: string | undefined }
  decision_prompt: string
}

function parseArgs(argv: string[]): CliArgs {
  const out: Record<string, string> = {}
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i]
    if (!k.startsWith('--')) fail(1, `expected flag, got "${k}"`)
    const v = argv[i + 1]
    if (v === undefined || v.startsWith('--')) fail(1, `flag ${k} expects a value`)
    out[k.slice(2)] = v
    i++
  }
  if (!out.description) fail(1, '--description "<用户描述>" required')
  return { description: out.description, style: out.style }
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[recommend-from-prompt] ${msg}\n`)
  process.exit(code)
}

function buildDecisionPrompt(args: CliArgs, candidates: OutputShape['candidates']): string {
  const personaCard = candidates
    .map(
      (c, i) =>
        `[${i + 1}] id=${c.id} · name=${c.name}\n` +
        `    audience: ${c.audience}\n` +
        `    description: ${c.description}\n` +
        `    palette.primary=${c.palette_signature.primary}, bg=${c.palette_signature.bg}\n` +
        `    variants: ${Object.entries(c.variants_signature).map(([k, v]) => `${k}=${v}`).join(', ')}\n` +
        `    signatureContainers: [${c.signature_containers.join(', ') || '(none)'}]`,
    )
    .join('\n\n')

  return [
    '你是 wechat-typeset 的主题选型助手。',
    '',
    '用户描述了想要的视觉气质，请判断：',
    '  A. 强匹配某个内置 persona（直接复用）→ 走 wechat-typeset-export-richtext',
    '  B. 部分匹配（改色板或换骨架就够）→ 走"派生现有主题"路径',
    '  C. 气质全新（9 套都拉不上）→ 走"全新造主题"路径',
    '',
    '决策规则：',
    '  1. audience 匹配优先级最高',
    '  2. 用户给了参照锚点（"像 X"）→ 直接套用 hard-rules 决策表',
    '  3. 复用得分 ≥ 0.85 时不建议改；0.6-0.85 派生；< 0.6 造新',
    '',
    '## 用户描述',
    args.description,
    args.style ? `## 参照锚点\n${args.style}` : '',
    '',
    '## 候选 persona（9 套内置）',
    personaCard,
    '',
    '## 请输出 JSON',
    '```json',
    '{',
    '  "decision": "reuse" | "derive" | "create",',
    '  "ranked": [',
    '    { "id": "<persona-id>", "score": 0.0-1.0, "reasons": ["..."] }',
    '  ],',
    '  "derive_base_id": "<如果 decision=derive，从哪个 persona 派生>",',
    '  "create_brief": "<如果 decision=create，造新主题的视觉 brief，2-3 句>",',
    '  "rationale_one_line": "<一句话总结>"',
    '}',
    '```',
  ]
    .filter(Boolean)
    .join('\n')
}

function main() {
  const args = parseArgs(process.argv)
  const personas = listPersonas()

  const candidates: OutputShape['candidates'] = personas.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    audience: p.audience,
    palette_signature: { primary: p.palette.primary, bg: p.palette.bg, bgSoft: p.palette.bgSoft },
    variants_signature: {
      admonition: p.variants.admonition,
      quote: p.variants.quote,
      steps: p.variants.steps,
      divider: p.variants.divider,
    },
    signature_containers: p.signatureContainers,
  }))

  const out: OutputShape = {
    candidates,
    user_input: { description: args.description, style: args.style },
    decision_prompt: buildDecisionPrompt(args, candidates),
  }
  process.stdout.write(JSON.stringify(out, null, 2) + '\n')
}

main()
