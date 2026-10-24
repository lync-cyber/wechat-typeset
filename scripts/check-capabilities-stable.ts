#!/usr/bin/env tsx
/**
 * CI 守门：比对两份 capabilities.json，若发现未经 deprecations[] 登记的破坏性
 * 变更则退出码非 0。
 *
 * 用法：
 *   npx tsx scripts/check-capabilities-stable.ts <before.json> <after.json>
 *
 * CI 从 PR base SHA 的隔离工作树安装锁定依赖并构建基线，与 PR 合并结果比较。
 * dist/ 不受版本控制；本地比较也需要分别在两个修订上运行 build:capabilities。
 * 退出码：0 = 兼容；1 = 有破坏；2 = 用法错误 / 解析失败。
 *
 * 破坏维度与豁免规则见 capabilities-diff.ts 注释。
 */

import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { diffCapabilities, type CapabilitiesShape } from './capabilities-diff'

function readJson(path: string): CapabilitiesShape {
  if (!existsSync(path)) {
    console.error(`File not found: ${path}`)
    process.exit(2)
  }
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch (err) {
    console.error(`Cannot parse ${path}: ${String(err)}`)
    process.exit(2)
  }
}

function main(): void {
  const [, , beforePath, afterPath] = process.argv
  if (!beforePath || !afterPath) {
    console.error('Usage: check-capabilities-stable <before.json> <after.json>')
    process.exit(2)
  }
  const before = readJson(resolve(beforePath))
  const after = readJson(resolve(afterPath))
  const { breaking, growth } = diffCapabilities(before, after)

  for (const g of growth) console.log(`[growth] ${g}`)
  if (breaking.length === 0) {
    console.log(`OK: no unregistered breaking change vs baseline (${growth.length} growth notes).`)
    process.exit(0)
  }
  console.error(`\nFAIL: ${breaking.length} unregistered breaking change(s):`)
  for (const b of breaking) console.error(`  - ${b.path}: ${b.reason}`)
  console.error(
    `\n要走"合规移除"流程，请把对应 path 加进上一版 capabilities 的 deprecations[]，等一个 minor 版本窗口后再删。`,
  )
  process.exit(1)
}

main()
