#!/usr/bin/env tsx
/**
 * show-snippet —— 容器名 → 完整 example 片段。
 *
 * 用法：
 *   tsx show-snippet.ts <container-name>          # 单个容器示例
 *   tsx show-snippet.ts --list                    # 列出全部容器名
 *   tsx show-snippet.ts --list --category content # 按类别筛
 *
 * 数据源：getContainerVocabulary()。本脚本不发明 example，全用权威 vocabulary 自带的。
 */

import { getContainerVocabulary, type ContainerSpec } from '../../../src/public'

function main() {
  const args = process.argv.slice(2)
  const vocab = getContainerVocabulary()

  if (args.includes('--list')) {
    const categoryIdx = args.indexOf('--category')
    const filter = categoryIdx >= 0 ? args[categoryIdx + 1] : undefined
    const filtered = filter ? vocab.filter((v) => v.category === filter) : vocab
    const grouped = new Map<string, ContainerSpec[]>()
    for (const v of filtered) {
      const arr = grouped.get(v.category) ?? []
      arr.push(v)
      grouped.set(v.category, arr)
    }
    for (const [cat, items] of grouped) {
      process.stdout.write(`\n## ${cat} (${items.length})\n`)
      for (const v of items) {
        const fenceMark = ':'.repeat(v.fenceLength)
        process.stdout.write(`  ${fenceMark} ${v.name.padEnd(20)} — ${v.description}\n`)
      }
    }
    return
  }

  const name = args[0]
  if (!name) {
    process.stderr.write('[show-snippet] usage: tsx show-snippet.ts <name> | --list [--category <cat>]\n')
    process.exit(1)
  }

  const spec = vocab.find((v) => v.name === name)
  if (!spec) {
    const suggestions = vocab
      .map((v) => v.name)
      .filter((n) => n.toLowerCase().includes(name.toLowerCase()))
      .slice(0, 5)
    process.stderr.write(
      `[show-snippet] unknown container "${name}".\n` +
        (suggestions.length > 0
          ? `Did you mean: ${suggestions.join(', ')}?\n`
          : `Try --list to see all ${vocab.length} containers.\n`),
    )
    process.exit(2)
  }

  process.stdout.write(`# ${spec.name}\n\n`)
  process.stdout.write(`- category: ${spec.category}\n`)
  process.stdout.write(`- fence: ${':'.repeat(spec.fenceLength)}\n`)
  if (spec.variantKind) {
    process.stdout.write(`- variant_kind: ${spec.variantKind}（用 variant=xxx 切骨架）\n`)
  }
  if (spec.styleKey) {
    process.stdout.write(`- style_key: ${spec.styleKey}（ThemeContainers 字段名）\n`)
  }
  if (spec.pack && spec.pack !== 'base') {
    process.stdout.write(`- pack: ${spec.pack}（契约扩展包）\n`)
  }
  if (spec.parent) {
    process.stdout.write(`- parent: ${spec.parent}（必须嵌在该父容器内）\n`)
  }
  if (spec.children && spec.children.length > 0) {
    process.stdout.write(`- children: [${spec.children.join(', ')}]\n`)
  }
  if (spec.nestable) {
    process.stdout.write(`- nestable: true\n`)
  }
  if (spec.attrs && spec.attrs.length > 0) {
    process.stdout.write(`- attrs:\n`)
    for (const a of spec.attrs) {
      const valueHint = a.enum ? ` (one of: ${a.enum.join(' | ')})` : a.example ? ` (e.g. ${a.example})` : ''
      process.stdout.write(`    - ${a.key}: ${a.description}${valueHint}\n`)
    }
  }
  process.stdout.write(`- description: ${spec.description}\n`)

  process.stdout.write(`\n## example\n\n`)
  process.stdout.write('```markdown\n' + spec.example.trimEnd() + '\n```\n')
}

main()
