#!/usr/bin/env tsx
/**
 * theme-capabilities —— 主题能力一站式查询入口（LLM / 集成方"开工前先查"）。
 *
 * 调 src/public 的复合 API getThemeCapabilities / getRecommendedVariantsFor，
 * 把"本主题下能用什么容器、推荐什么 variant、有哪些签名 kicker"一次性输出，
 * 让 annotate-markdown 的 agent 决策、export-richtext 的预检都从同一份事实出发。
 *
 * 用法：
 *   tsx theme-capabilities.ts --persona <id>           # 可读文本（markdown）
 *   tsx theme-capabilities.ts --persona <id> --json    # 机器可读 JSON
 *
 * 退出码：
 *   0 成功
 *   1 IO / 参数错
 *   2 未知 persona id
 */

import {
  getPersona,
  getRecommendedVariantsFor,
  getThemeCapabilities,
} from '../../../src/public'
import { DEFAULT_KICKERS } from '../../../src/core/themes/types'

interface CliArgs {
  persona: string
  json: boolean
}

function parseArgs(argv: string[]): CliArgs {
  const out: Record<string, string | boolean> = {}
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i]
    if (k === '--json') {
      out.json = true
      continue
    }
    if (!k.startsWith('--')) fail(1, `expected flag, got "${k}"`)
    const v = argv[i + 1]
    if (v === undefined || v.startsWith('--')) fail(1, `flag ${k} expects a value`)
    out[k.slice(2)] = v
    i++
  }
  if (!out.persona) fail(1, '--persona <id> required')
  return { persona: String(out.persona), json: out.json === true }
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[theme-capabilities] ${msg}\n`)
  process.exit(code)
}

function main() {
  const args = parseArgs(process.argv)

  let spec
  try {
    spec = getPersona(args.persona)
  } catch (e) {
    fail(2, (e as Error).message)
  }

  const view = getThemeCapabilities(args.persona)
  const recommended = getRecommendedVariantsFor(args.persona)
  // kickers：合并 DEFAULT_KICKERS + spec.kickers，告诉作者"qaBlock/editorNote 等容器
  // 在本主题下默认 kicker 文案是什么"——避免反复写 info。
  const kickers = { ...DEFAULT_KICKERS, ...(spec.kickers ?? {}) }

  if (args.json) {
    process.stdout.write(
      JSON.stringify(
        {
          persona: {
            id: spec.id,
            name: spec.name,
            description: spec.description,
            audience: spec.audience,
            palettePrimary: spec.palette.primary,
          },
          defaultVariants: view.defaultVariants,
          recommendedVariants: recommended,
          recommendedVariantOverrides: view.recommendedVariantOverrides,
          containers: view.containers,
          kickers,
        },
        null,
        2,
      ) + '\n',
    )
    return
  }

  // 可读文本：分组列容器（按 namespace × available × category），高亮签名容器
  const lines: string[] = []
  lines.push(`# ${spec.name} (${spec.id}) · 主题能力速查`)
  lines.push('')
  lines.push(`- 描述: ${spec.description}`)
  lines.push(`- 受众: ${spec.audience}`)
  lines.push(`- 主色: ${spec.palette.primary}`)
  lines.push('')

  lines.push('## 默认骨架（spec.variants）')
  for (const [k, v] of Object.entries(view.defaultVariants)) {
    const overridden = view.recommendedVariantOverrides[k as keyof typeof view.recommendedVariantOverrides]
    const overrideHint = overridden && overridden !== v ? ` · 额外推荐: \`${overridden}\`` : ''
    lines.push(`- ${k}: \`${v}\`${overrideHint}`)
  }
  lines.push('')

  lines.push('## 启用容器')
  const ns = (n: string) => (n === 'base' ? 'base' : n === 'pack' ? '领域扩展' : '主题专属')
  const groupedByPack = new Map<string, typeof view.containers[number][]>()
  for (const c of view.containers) {
    const key = c.pack
    if (!groupedByPack.has(key)) groupedByPack.set(key, [])
    groupedByPack.get(key)!.push(c)
  }
  // base 在前，pack:* 中间，theme:* 在后
  const sortedPacks = [...groupedByPack.keys()].sort((a, b) => {
    const rank = (p: string) => (p === 'base' ? 0 : p.startsWith('pack:') ? 1 : 2)
    const ra = rank(a)
    const rb = rank(b)
    return ra !== rb ? ra - rb : a.localeCompare(b)
  })
  for (const pack of sortedPacks) {
    const items = groupedByPack.get(pack)!
    const sample = items[0]
    const enabledCount = items.filter((c) => c.available).length
    const totalCount = items.length
    const statusBadge =
      sample.namespace === 'theme' && enabledCount === 0
        ? ' · **未启用**（非本主题专属扩展）'
        : ''
    lines.push('')
    lines.push(`### ${pack} (${enabledCount}/${totalCount}) · ${ns(sample.namespace)}${statusBadge}`)
    for (const c of items) {
      const sig = c.signature ? ' ★签名' : ''
      const status = c.excluded ? ' · 已排除' : c.available ? '' : ' · 未启用'
      lines.push(`- \`${c.id}\`${sig}${status}`)
    }
  }
  lines.push('')

  lines.push('## 推荐 variants（themeCompat 反向索引）')
  for (const [kind, ids] of Object.entries(recommended)) {
    const def = view.defaultVariants[kind as keyof typeof view.defaultVariants]
    if (ids.length === 0) {
      lines.push(`- ${kind}: 仅默认 \`${def}\``)
    } else {
      const others = ids.filter((id) => id !== def)
      const list = [`**\`${def}\`** (默认)`, ...others.map((id) => `\`${id}\``)].join(' / ')
      lines.push(`- ${kind}: ${list}`)
    }
  }
  lines.push('')

  lines.push('## Kicker 文案兜底（renderer 内默认值，info 仍可单稿覆盖）')
  for (const [k, v] of Object.entries(kickers)) {
    lines.push(`- ${k}: "${v}"`)
  }
  lines.push('')

  lines.push('## Agent 决策提示')
  lines.push(
    '- 在 annotate-markdown 阶段，**只对 `available: true` 的容器**提议（避免给 default 主题写 kpi-dashboard 之类）。',
  )
  lines.push(
    '- variant 优先用各 slot 默认；如要覆盖，挑"推荐 variants"列表里的 id，**不要凭记忆写**。',
  )
  lines.push(
    '- 已签名容器（★ 标记）走主题的签名视觉；未签名容器走 token 驱动的中性兜底。',
  )

  process.stdout.write(lines.join('\n') + '\n')
}

main()
