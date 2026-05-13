#!/usr/bin/env tsx
/**
 * recommend-persona —— 标注阶段的 persona 选型助手。
 *
 * 输入：文章标题 + 摘要 + 题材分类（可选参照锚点）
 * 输出：top-3 内置 persona 推荐 + 评分 + 理由，外加"是否建议造新主题"的提示
 *
 * 与 wechat-typeset-author-persona/scripts/recommend-from-prompt.ts 的差异：
 *   - 本脚本：标注阶段判"用哪个内置 persona 渲染本文"
 *   - author-persona 版：设计阶段判"复用 / 派生 / 全新造"
 *
 * 用法：
 *   tsx recommend-persona.ts \
 *     --title "<标题>" \
 *     --summary "<一句摘要>" \
 *     --topic "<技术|财经|人文|生活|学术|其他>" \
 *     [--style "<参照锚点>"]
 */

import { listPersonas } from '../../../src/public'

interface CliArgs {
  title: string
  summary: string
  topic: string
  style?: string
}

interface Candidate {
  id: string
  name: string
  description: string
  audience: string
  variants_signature: Record<string, string>
  signature_containers: readonly string[]
  static_score: number
  static_reasons: string[]
}

const TOPIC_FAVORITES: Record<string, string[]> = {
  技术: ['tech-explainer', 'tech-geek', 'academic-frontier'],
  财经: ['business-finance', 'industry-observer'],
  人文: ['literary-humanism', 'people-story'],
  生活: ['life-aesthetic', 'default'],
  学术: ['academic-frontier'],
  其他: ['default'],
}

const STYLE_HINTS: Array<{ pattern: RegExp; id: string }> = [
  { pattern: /medium|notion|substack|默认|不要太花/i, id: 'default' },
  { pattern: /dan luu|jvns|manpage|rfc|内核|kernel|系统编程/i, id: 'tech-geek' },
  { pattern: /stripe|mdn|教程|step.?by.?step|新手指南|文档/i, id: 'tech-explainer' },
  { pattern: /食谱|旅行|慢生活|kinfolk|美食|四时/i, id: 'life-aesthetic' },
  { pattern: /ft.?中文|财新|hbr|bloomberg|内参|投行|研究所/i, id: 'business-finance' },
  { pattern: /散文|宋椠|古典|三联|札记|书评/i, id: 'literary-humanism' },
  { pattern: /stratechery|ben thompson|newsletter|周刊|周报|analyst/i, id: 'industry-observer' },
  { pattern: /人物|new yorker|纽约客|特稿|口述史/i, id: 'people-story' },
  { pattern: /arxiv|nature|论文|latex|同行评审|研究综述/i, id: 'academic-frontier' },
]

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
  if (!out.title) fail(1, '--title required')
  if (!out.summary) fail(1, '--summary required')
  if (!out.topic) fail(1, '--topic required (技术/财经/人文/生活/学术/其他)')
  return { title: out.title, summary: out.summary, topic: out.topic, style: out.style }
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[recommend-persona] ${msg}\n`)
  process.exit(code)
}

function scoreCandidate(p: ReturnType<typeof listPersonas>[number], args: CliArgs): Candidate {
  const reasons: string[] = []
  let score = 0.3 // 基线

  const favorites = TOPIC_FAVORITES[args.topic] ?? TOPIC_FAVORITES['其他']
  const favIdx = favorites.indexOf(p.id)
  if (favIdx === 0) {
    score += 0.4
    reasons.push(`题材"${args.topic}"的首选 persona`)
  } else if (favIdx > 0) {
    score += 0.2
    reasons.push(`题材"${args.topic}"的备选 persona（第 ${favIdx + 1} 候选）`)
  }

  if (args.style) {
    for (const hint of STYLE_HINTS) {
      if (hint.pattern.test(args.style) && hint.id === p.id) {
        score += 0.3
        reasons.push(`参照锚点"${args.style}"强烈指向本主题`)
        break
      }
    }
  }

  // 通用回退
  if (p.id === 'default' && favorites.length > 1) {
    reasons.push('回退选项——题材匹配不强时安全选择')
  }

  return {
    id: p.id,
    name: p.name,
    description: p.description,
    audience: p.audience,
    variants_signature: {
      admonition: p.variants.admonition,
      quote: p.variants.quote,
      steps: p.variants.steps,
      divider: p.variants.divider,
      codeBlock: p.variants.codeBlock,
    },
    signature_containers: p.signatureContainers,
    static_score: Math.min(score, 1),
    static_reasons: reasons,
  }
}

function main() {
  const args = parseArgs(process.argv)
  const personas = listPersonas()
  const candidates = personas
    .map((p) => scoreCandidate(p, args))
    .sort((a, b) => b.static_score - a.static_score)

  const top3 = candidates.slice(0, 3)
  const topScore = top3[0]?.static_score ?? 0

  const decisionPrompt = [
    '你是 wechat-typeset 的 persona 选型助手。',
    '',
    '请基于以下信息，从 top-3 候选里选最合适的 persona id 用于渲染本文。',
    '若 top-1 评分 < 0.6（即 recommend_new=true），建议先去 wechat-typeset-author-persona skill 造新主题。',
    '',
    '## 文章',
    `标题：${args.title}`,
    `摘要：${args.summary}`,
    `题材：${args.topic}`,
    args.style ? `参照锚点：${args.style}` : '',
    '',
    '## Top-3 候选',
    ...top3.map(
      (c, i) =>
        `[${i + 1}] id=${c.id} · ${c.name} (score=${c.static_score.toFixed(2)})\n` +
        `    audience: ${c.audience}\n` +
        `    description: ${c.description}\n` +
        `    variants: ${Object.entries(c.variants_signature).map(([k, v]) => `${k}=${v}`).join(', ')}\n` +
        `    signatures: [${c.signature_containers.join(', ') || '(none)'}]\n` +
        `    reasons: ${c.static_reasons.join(' / ')}`,
    ),
    '',
    '## 输出 JSON',
    '```json',
    '{',
    '  "selected": "<persona-id>",',
    '  "confidence": 0.0-1.0,',
    '  "reasoning_one_line": "<一句话>"',
    '}',
    '```',
  ]
    .filter(Boolean)
    .join('\n')

  const out = {
    ranked: top3,
    recommend_new: topScore < 0.6,
    rationale_one_line:
      topScore >= 0.85
        ? `强匹配 ${top3[0].id}（${top3[0].static_score.toFixed(2)}）`
        : topScore >= 0.6
        ? `top-3 任一可用，建议 ${top3[0].id}`
        : `top-1 仅 ${topScore.toFixed(2)}——内置主题都不够匹配，建议造新`,
    decision_prompt: decisionPrompt,
  }
  process.stdout.write(JSON.stringify(out, null, 2) + '\n')
}

main()
