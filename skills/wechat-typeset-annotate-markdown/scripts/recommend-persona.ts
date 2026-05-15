#!/usr/bin/env tsx
/**
 * recommend-persona —— 标注阶段的 persona 选型助手。
 *
 * 输入：文章标题 + 摘要 + 题材关键词（可选参照锚点）
 * 输出：top-3 内置 persona 推荐 + 评分 + 理由，外加"是否建议造新主题"的提示
 *
 * 与 wechat-typeset-author-persona/scripts/recommend-from-prompt.ts 的边界：
 *   - 本脚本（标注阶段）：判"用哪个内置 persona 渲染本文"
 *   - author-persona 版（设计阶段）：判"复用 / 派生 / 全新造"
 *
 * 评分基于 listPersonas() 的 audience / name / description 字段做关键词匹配 +
 * 参照锚点正则。新增主题只要 audience 写得准就自动进入候选池——这里**刻意**
 * 不维护"题材 → persona id"映射表，避免每新增一套主题就需同步改本脚本。
 *
 * 用法：
 *   tsx recommend-persona.ts \
 *     --title "<标题>" \
 *     --summary "<一句摘要>" \
 *     --topic "<技术|财经|人文|生活|学术|数据|文化|其他>" \
 *     [--style "<参照锚点>"]
 */

import { listPersonas } from '../../../src/public'
import type { PersonaSummary } from '../../../src/public'

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

/**
 * 题材关键词词表 —— 用于在 audience / description 字段里做关键词命中。
 *
 * 每个题材列若干"近义词 / 上位词 / 典型场景词"。某主题的 audience 或 description 命中
 * 越多关键词，越被推荐。这份词表是**针对题材类型的，而不是 persona id**——加新主题
 * 不用改本词表，只要新主题的 audience 含相应关键词即可入选。
 */
const TOPIC_KEYWORDS: Record<string, readonly string[]> = {
  技术: ['技术', '工程', '架构', 'manpage', 'RFC', '内核', '系统', 'API', '文档', '教程', 'step', '开发', '算法'],
  财经: ['财经', '财报', '投资', '内参', '研究所', '行业', 'analyst', '宏观', 'newsletter', 'Bloomberg', 'FT', 'HBR'],
  人文: ['人文', '散文', '书评', '札记', '随笔', '特稿', '人物', 'profile', 'New Yorker', '文学', '古典'],
  生活: ['生活', '美食', '旅行', '随笔', '慢生活', 'Kinfolk', '四时', '小品', '美学'],
  学术: ['学术', '论文', 'arXiv', 'Nature', '研究', '同行评审', '方法学', 'LaTeX'],
  数据: ['数据', '简报', '图表', 'KPI', '数据新闻', '可视化', '指标'],
  文化: ['文化', '编辑', 'mook', 'POPEYE', 'BRUTUS', '电台', '播客', '夜读', '慢读', 'punk', 'zine', '实验', '设计', 'Neue Grafik', '排印', '栅格', 'design'],
  其他: [],
}

/**
 * 参照锚点正则 —— 用户能说出"像 X"是最强信号。每条规则匹配某些关键词后，
 * 直接为命中关键词的 persona 加分。规则按字段查 audience / name / description。
 */
const STYLE_RULES: ReadonlyArray<{
  pattern: RegExp
  /** 命中后在哪几个字段里找候选 persona（audience / name / description 命中即匹配） */
  matchInFields: ReadonlyArray<'audience' | 'name' | 'description'>
  /** 直接命中的关键词集合，用于在字段里再找 */
  targetKeywords: readonly string[]
}> = [
  { pattern: /medium|notion|substack|默认|不要太花/i, matchInFields: ['name'], targetKeywords: ['默认'] },
  { pattern: /dan luu|jvns|manpage|rfc|内核|kernel|系统编程|工程师/i, matchInFields: ['audience', 'description'], targetKeywords: ['manpage', 'RFC', '工程'] },
  { pattern: /stripe|mdn|教程|step.?by.?step|新手指南|文档/i, matchInFields: ['audience', 'description'], targetKeywords: ['教程', '文档', 'Stripe', 'MDN'] },
  { pattern: /食谱|旅行|慢生活|kinfolk|美食|四时|美学/i, matchInFields: ['audience', 'description'], targetKeywords: ['生活', '美食', 'Kinfolk'] },
  { pattern: /ft.?中文|财新|hbr|bloomberg|内参|投行|研究所|财报/i, matchInFields: ['audience', 'description'], targetKeywords: ['财经', '内参', 'Bloomberg', 'FT', 'HBR'] },
  { pattern: /散文|宋椠|古典|三联|札记|书评/i, matchInFields: ['audience', 'description'], targetKeywords: ['散文', '书评', '人文'] },
  { pattern: /stratechery|ben thompson|newsletter|周刊|周报|analyst/i, matchInFields: ['audience', 'description'], targetKeywords: ['newsletter', '周刊', 'analyst'] },
  { pattern: /人物|new yorker|纽约客|特稿|口述史|profile/i, matchInFields: ['audience', 'description'], targetKeywords: ['特稿', '人物', 'profile'] },
  { pattern: /arxiv|nature|论文|latex|同行评审|研究综述|方法学/i, matchInFields: ['audience', 'description'], targetKeywords: ['学术', 'arXiv', 'Nature', 'LaTeX'] },
  { pattern: /晚点|morning brew|数据简报|图表|kpi|数据新闻/i, matchInFields: ['audience', 'description'], targetKeywords: ['数据', '简报', '图表'] },
  { pattern: /popeye|brutus|mook|编辑刊|慢读/i, matchInFields: ['audience', 'description'], targetKeywords: ['mook', 'POPEYE', '编辑', '慢读'] },
  { pattern: /swiss|neue grafik|栅格|苏黎世|设计评论|对开页/i, matchInFields: ['audience', 'description'], targetKeywords: ['Neue Grafik', '栅格', '设计'] },
  { pattern: /punk|zine|brutalist|粗野|凌晨|文化批评/i, matchInFields: ['audience', 'description'], targetKeywords: ['punk', 'zine', '夜读', '文化批评'] },
  { pattern: /电台|播客|长夜|03:41|黑胶|vinyl/i, matchInFields: ['audience', 'description'], targetKeywords: ['电台', '播客', '夜读', '长夜'] },
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
  if (!out.topic) fail(1, '--topic required (技术/财经/人文/生活/学术/数据/文化/其他)')
  return { title: out.title, summary: out.summary, topic: out.topic, style: out.style }
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[recommend-persona] ${msg}\n`)
  process.exit(code)
}

/** 在文本里数关键词命中数（不区分大小写、子串匹配） */
function countKeywordHits(text: string, keywords: readonly string[]): number {
  if (keywords.length === 0) return 0
  const lower = text.toLowerCase()
  let n = 0
  for (const kw of keywords) {
    if (lower.includes(kw.toLowerCase())) n++
  }
  return n
}

function scoreCandidate(p: PersonaSummary, args: CliArgs): Candidate {
  const reasons: string[] = []
  let score = 0.2 // 基线低，避免无关主题被列入 top-3

  // 1. 题材关键词命中 audience + description
  const topicKeywords = TOPIC_KEYWORDS[args.topic] ?? []
  const topicHits = countKeywordHits(`${p.audience} ${p.description}`, topicKeywords)
  if (topicHits > 0) {
    score += Math.min(topicHits * 0.15, 0.45)
    reasons.push(`audience/description 命中题材"${args.topic}"关键词 ${topicHits} 个`)
  }

  // 2. 参照锚点正则匹配
  if (args.style) {
    for (const rule of STYLE_RULES) {
      if (!rule.pattern.test(args.style)) continue
      const fieldText = rule.matchInFields
        .map((f) => p[f])
        .join(' ')
      const hits = countKeywordHits(fieldText, rule.targetKeywords)
      if (hits > 0) {
        score += Math.min(hits * 0.2, 0.4)
        reasons.push(`参照锚点"${args.style}"→ ${rule.matchInFields.join('/')} 命中 ${hits} 个语义词`)
        break
      }
    }
  }

  // 3. 用户标题/摘要里直接出现 audience 关键短语（"为我们的 newsletter…"）
  const userText = `${args.title} ${args.summary}`
  const audienceHits = countKeywordHits(userText, p.audience.split(/[\s/、，,]+/).filter((s) => s.length >= 2))
  if (audienceHits > 0) {
    score += Math.min(audienceHits * 0.1, 0.2)
    reasons.push(`标题/摘要直接出现 audience 关键词 ${audienceHits} 个`)
  }

  // 4. default 兜底说明
  if (p.id === 'default' && reasons.length === 0) {
    score = 0.35 // 兜底分，永远在 top-3 备选区
    reasons.push('中立兜底——题材匹配不强时安全选择')
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
      note: p.variants.note,
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
        `    reasons: ${c.static_reasons.join(' / ') || '(无强信号)'}`,
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
