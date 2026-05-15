#!/usr/bin/env tsx
/**
 * show-snippet —— 容器名 → 完整 example 片段（主题敏感）。
 *
 * 用法：
 *   tsx show-snippet.ts <container-name>                       # 单个容器示例
 *   tsx show-snippet.ts <container-name> --variant <id>        # 指定 variant 骨架
 *   tsx show-snippet.ts <container-name> --persona <id>        # 主题敏感：theme:* 跨主题会出 warning
 *   tsx show-snippet.ts --list                                 # 列出全部容器名（按 pack 分组）
 *   tsx show-snippet.ts --list --persona <id>                  # 列出该主题下可用容器（unavailable 灰显）
 *   tsx show-snippet.ts --list --category content              # 按类别筛
 *   tsx show-snippet.ts --variants <container-name>            # 列出该容器可切换的 variant
 *
 * 数据源：getContainerVocabulary() / getContainerSnippet() / getVariantsForContainer() /
 *         getThemeCapabilities()。本脚本不发明 example，全用公共 API 派生。
 */

import {
  getContainerVocabulary,
  getContainerSnippet,
  getVariantsForContainer,
  getThemeCapabilities,
  getPersona,
  type ContainerSpec,
} from '../../../src/public'

function main() {
  const args = process.argv.slice(2)
  const vocab = getContainerVocabulary()

  // 主题敏感：--persona 在 list / single-container 两条路径上都生效
  const personaIdx = args.indexOf('--persona')
  const personaId = personaIdx >= 0 ? args[personaIdx + 1] : undefined
  if (personaId) {
    try {
      getPersona(personaId)
    } catch (e) {
      process.stderr.write(`[show-snippet] ${(e as Error).message}\n`)
      process.exit(2)
    }
  }

  if (args.includes('--list')) {
    const categoryIdx = args.indexOf('--category')
    const filter = categoryIdx >= 0 ? args[categoryIdx + 1] : undefined
    const filtered = filter ? vocab.filter((v) => v.category === filter) : vocab

    // 有 --persona：按 pack 分组（base / pack:* / theme:*），各组内按 available 排序，未启用灰显
    if (personaId) {
      const caps = getThemeCapabilities(personaId)
      const availableMap = new Map(caps.containers.map((c) => [c.id, c]))
      const byPack = new Map<string, ContainerSpec[]>()
      for (const v of filtered) {
        const meta = availableMap.get(v.name)
        if (!meta) continue
        const key = meta.pack
        if (!byPack.has(key)) byPack.set(key, [])
        byPack.get(key)!.push(v)
      }
      const sortedPacks = [...byPack.keys()].sort((a, b) => {
        const rank = (p: string) => (p === 'base' ? 0 : p.startsWith('pack:') ? 1 : 2)
        const ra = rank(a)
        const rb = rank(b)
        return ra !== rb ? ra - rb : a.localeCompare(b)
      })
      process.stdout.write(`# 容器清单 · persona=${personaId}\n`)
      for (const pack of sortedPacks) {
        const items = byPack.get(pack)!
        const sampleMeta = availableMap.get(items[0].name)!
        const enabled = items.filter((v) => availableMap.get(v.name)!.available).length
        process.stdout.write(
          `\n## ${pack} (${enabled}/${items.length})${sampleMeta.namespace === 'theme' && enabled === 0 ? ' · 未启用（非本主题专属）' : ''}\n`,
        )
        for (const v of items) {
          const c = availableMap.get(v.name)!
          const fenceMark = ':'.repeat(v.fenceLength)
          const sig = c.signature ? ' ★' : ''
          const tag = c.available ? '' : ' · 未启用'
          process.stdout.write(
            `  ${fenceMark} ${v.name.padEnd(20)}${sig.padEnd(2)} — ${v.description}${tag}\n`,
          )
        }
      }
      return
    }

    // 无 --persona：旧行为，按 category 分组
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

  // --variants <name>：列出某容器可切换的 variant id
  const variantsIdx = args.indexOf('--variants')
  if (variantsIdx >= 0) {
    const containerName = args[variantsIdx + 1]
    if (!containerName) {
      process.stderr.write('[show-snippet] --variants 需要容器名参数\n')
      process.exit(1)
    }
    const variants = getVariantsForContainer(containerName)
    if (variants.length === 0) {
      process.stdout.write(
        `[show-snippet] "${containerName}" 不支持 variant 切换（无 variantKind 或不存在）\n`,
      )
      return
    }
    process.stdout.write(`# ${containerName} · 可用 variants\n\n`)
    for (const v of variants) {
      process.stdout.write(`- \`${v.id}\` · ${v.name}\n  ${v.description}\n\n`)
    }
    return
  }

  const positional = args.filter((a) => !a.startsWith('--'))
  const name = positional[0]
  if (!name) {
    process.stderr.write(
      '[show-snippet] usage: tsx show-snippet.ts <name> [--variant <id>] | --list [--category <cat>] | --variants <name>\n',
    )
    process.exit(1)
  }

  // --variant <id>：用 getContainerSnippet 生成带 variant= 的 markdown
  const variantIdx = args.indexOf('--variant')
  const variantId = variantIdx >= 0 ? args[variantIdx + 1] : undefined

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
  // 主题敏感：theme:* 容器跨主题使用时显式给出 warning
  if (personaId) {
    const caps = getThemeCapabilities(personaId)
    const c = caps.containers.find((x) => x.id === name)
    if (c) {
      if (!c.available && c.namespace === 'theme') {
        process.stdout.write(
          `> [warn] "${name}" 属于 ${c.pack}（仅该主题渲染）。当前 persona "${personaId}" 不启用——renderer 仍会出 HTML，但走 token 中性兜底，失去签名视觉。\n>\n`,
        )
      } else if (c.signature) {
        process.stdout.write(`> [info] "${name}" 是 ${personaId} 主题的 ★签名容器。\n>\n`)
      }
    }
  }
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

  // 例子段：默认是 vocabulary.example；指定 --variant <id> 时走 getContainerSnippet
  // 以便在 open 行带上 variant=xxx
  let snippet: string
  if (variantId) {
    if (!spec.variantKind) {
      process.stderr.write(
        `[show-snippet] "${name}" 没有 variant 系统（variantKind 未定义），忽略 --variant ${variantId}\n`,
      )
      snippet = spec.example
    } else {
      const variants = getVariantsForContainer(name)
      if (!variants.some((v) => v.id === variantId)) {
        process.stderr.write(
          `[show-snippet] "${variantId}" 不是 ${name} 的合法 variant。合法 id：${variants.map((v) => v.id).join(', ')}\n`,
        )
        process.exit(2)
      }
      snippet = getContainerSnippet(name, { variantId })
      process.stdout.write(`- variant: ${variantId}\n`)
    }
  } else {
    snippet = spec.example
  }

  process.stdout.write(`\n## example\n\n`)
  process.stdout.write('```markdown\n' + snippet.trimEnd() + '\n```\n')
}

main()
