#!/usr/bin/env tsx
/**
 * lint-contract（export-richtext 入口）—— 契约 md 静态校验。
 *
 * 透传到 annotate-markdown/scripts/lint-contract.ts 的薄壳：让 export-richtext
 * 工作流 Step 1（"render 前 lint"）和 annotate skill 共用同一份 lint 实现，
 * 避免两套 lint 逻辑漂移。
 *
 * 旗标形态归一化：接 --input <md> 而非位置参数，与本目录的 render-html /
 * render-gallery / copy-richtext 保持一致；--json 透传到底层。
 *
 * 用法：
 *   tsx lint-contract.ts --input <md> [--json]
 *
 * 退出码：与 annotate-markdown/scripts/lint-contract.ts 一致
 *   0 ok=true
 *   1 IO / 参数错
 *   2 ok=false（有 issues）
 */

import { spawnSync } from 'node:child_process'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

function fail(code: number, msg: string): never {
  process.stderr.write(`[lint-contract] ${msg}\n`)
  process.exit(code)
}

function parseArgs(argv: string[]): { input: string; json: boolean } {
  let input: string | undefined
  let json = false
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i]
    if (k === '--json') {
      json = true
      continue
    }
    if (k === '--input') {
      const v = argv[++i]
      if (v === undefined || v.startsWith('--')) fail(1, '--input expects a value')
      input = v
      continue
    }
    fail(1, `unknown flag "${k}" (expected --input <md> [--json])`)
  }
  if (!input) fail(1, '--input <md> required')
  return { input, json }
}

function main() {
  const args = parseArgs(process.argv)
  const here = dirname(fileURLToPath(import.meta.url))
  const annotateLint = resolve(here, '../../wechat-typeset-annotate-markdown/scripts/lint-contract.ts')

  const child = spawnSync(
    'npx',
    ['tsx', annotateLint, resolve(process.cwd(), args.input), ...(args.json ? ['--json'] : [])],
    { stdio: 'inherit', shell: process.platform === 'win32' },
  )
  process.exit(child.status ?? 1)
}

main()
