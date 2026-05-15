#!/usr/bin/env tsx
/**
 * 从 src 派生 `skills/_shared/references/` 下的速查表段。
 *
 * 为什么：personas / variant 白名单两份是给 LLM 的权威 reference，但内容（主题
 * 数、variant id 集合）全是 src 派生信息——任何手维护版本都会与源漂移。
 *
 * 工作方式：
 *   - personas 表 → 从 listPersonas() 派生（含 audience / variants / signatureContainers）
 *   - 变体白名单 → 从 VARIANT_IDS 派生
 *   - 两份 reference 各自留 `<!-- generated:<key>:start/end -->` 标记对，原地替换；
 *     其余手写段（决策树、设计原型、独有能力描述）不动
 *
 * 命令：
 *   tsx scripts/build-skill-refs.ts          # 原地更新
 *   tsx scripts/build-skill-refs.ts --check  # CI 模式：差异即 exit 1
 *
 * 行尾归一化策略与 build-writer-docs.ts 一致（CRLF/LF 混入不报伪阳）。
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { listPersonas } from '../src/public'
import { VARIANT_IDS } from '../src/core/themes/types'

interface SpliceTarget {
  /** reference 文件绝对路径 */
  docPath: string
  /** 区段 key（用于 generated:<key>:start/end 标记） */
  key: string
  /** 生成的段落正文 */
  generated: string
}

function renderPersonasTable(): string {
  const personas = listPersonas()
  const lines: string[] = []
  lines.push('| id | 中文名 | 受众 | admonition | quote | steps | divider | codeBlock | note | signatureContainers |')
  lines.push('| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |')
  for (const p of personas) {
    const v = p.variants
    const sig = p.signatureContainers.length === 0 ? '——' : p.signatureContainers.join('、')
    lines.push(
      `| \`${p.id}\` | ${p.name} | ${p.audience} | \`${v.admonition}\` | \`${v.quote}\` | \`${v.steps}\` | \`${v.divider}\` | \`${v.codeBlock}\` | \`${v.note}\` | ${sig} |`,
    )
  }
  return lines.join('\n')
}

function renderPersonaCards(): string {
  const personas = listPersonas()
  const lines: string[] = []
  for (const p of personas) {
    lines.push(`### ${p.id} · ${p.name}`)
    lines.push('')
    lines.push(`**受众**：${p.audience}`)
    lines.push('')
    lines.push(`**描述**：${p.description}`)
    lines.push('')
    const v = p.variants
    lines.push(
      `**视觉签名**：admonition=\`${v.admonition}\` · quote=\`${v.quote}\` · steps=\`${v.steps}\` · divider=\`${v.divider}\` · codeBlock=\`${v.codeBlock}\` · note=\`${v.note}\``,
    )
    if (p.signatureContainers.length > 0) {
      lines.push('')
      lines.push(`**signatureContainers**：${p.signatureContainers.map((s) => `\`${s}\``).join('、')}`)
    }
    lines.push('')
  }
  return lines.join('\n').trimEnd()
}

function renderVariantWhitelist(): string {
  const lines: string[] = []
  lines.push('```ts')
  for (const [kind, ids] of Object.entries(VARIANT_IDS)) {
    const padding = ' '.repeat(Math.max(0, 14 - kind.length))
    lines.push(`${kind}:${padding}${ids.map((id) => `'${id}'`).join(' | ')}`)
  }
  lines.push('```')
  return lines.join('\n')
}

const TARGETS = (): SpliceTarget[] => [
  {
    docPath: resolve(process.cwd(), 'skills/_shared/references/personas.md'),
    key: 'personas-table',
    generated: renderPersonasTable(),
  },
  {
    docPath: resolve(process.cwd(), 'skills/_shared/references/personas.md'),
    key: 'persona-cards',
    generated: renderPersonaCards(),
  },
  {
    docPath: resolve(process.cwd(), 'skills/_shared/references/hard-rules.md'),
    key: 'variant-whitelist',
    generated: renderVariantWhitelist(),
  },
]

function splice(source: string, target: SpliceTarget): string {
  const startMark = `<!-- generated:${target.key}:start -->`
  const endMark = `<!-- generated:${target.key}:end -->`
  const startIdx = source.indexOf(startMark)
  const endIdx = source.indexOf(endMark)
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error(
      `[build-skill-refs] ${target.docPath} 缺少 ${startMark} / ${endMark} 标记对。` +
        '请在 reference 中加上标记后重跑。',
    )
  }
  const before = source.slice(0, startIdx + startMark.length)
  const after = source.slice(endIdx)
  return `${before}\n\n${target.generated}\n\n${after}`
}

function detectEol(source: string): '\r\n' | '\n' {
  return source.includes('\r\n') ? '\r\n' : '\n'
}

function normalizeEol(source: string): string {
  return source.replace(/\r\n/g, '\n')
}

function main() {
  const isCheck = process.argv.includes('--check')
  const drifted: string[] = []
  const written = new Set<string>()

  // 按 docPath 分组，一次性应用所有 splice，避免互相覆盖
  const byPath = new Map<string, SpliceTarget[]>()
  for (const t of TARGETS()) {
    const arr = byPath.get(t.docPath) ?? []
    arr.push(t)
    byPath.set(t.docPath, arr)
  }

  for (const [docPath, targets] of byPath) {
    const current = readFileSync(docPath, 'utf8')
    let next = current
    for (const t of targets) {
      next = splice(next, t)
    }
    if (normalizeEol(current) === normalizeEol(next)) continue
    if (isCheck) {
      drifted.push(docPath)
      continue
    }
    const eol = detectEol(current)
    const out = eol === '\r\n' ? next.replace(/\r?\n/g, '\r\n') : next
    writeFileSync(docPath, out, 'utf8')
    written.add(docPath)
    process.stdout.write(`[build-skill-refs] ${docPath} updated\n`)
  }

  if (isCheck && drifted.length > 0) {
    process.stderr.write(
      `[build-skill-refs] 以下 reference 与源不一致，请跑 \`npm run build:skill-refs\` 重生成：\n` +
        drifted.map((p) => `  - ${p}`).join('\n') +
        '\n',
    )
    process.exit(1)
  }

  if (written.size === 0 && drifted.length === 0) {
    process.stdout.write('[build-skill-refs] up to date\n')
  }
}

main()
