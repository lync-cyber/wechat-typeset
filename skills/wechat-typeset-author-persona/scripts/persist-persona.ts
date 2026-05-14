#!/usr/bin/env tsx
/**
 * persist-persona —— spec.json → src/core/themes/<id>/persona.data.ts + 改 src/public/personas.ts
 *
 * 落地流程：
 *   1. 校验 spec（不通过拒绝写）
 *   2. 生成 persona.data.ts（导出 spec = ...）
 *   3. 修改 src/public/personas.ts（追加 import + 加入 PERSONA_SPECS 数组）
 *
 * 安全性：
 *   - id 已存在时拒绝（不覆盖现有主题，除非传 --force）
 *   - 落盘前先 dry-run，--dry 只打印 diff 不写文件
 *
 * 用法：
 *   tsx persist-persona.ts <spec.json> [--id <override-id>] [--dry] [--force]
 *
 * 退出码：
 *   0 成功
 *   1 IO / 参数错
 *   2 spec validation 失败
 *   3 id 冲突且未给 --force
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { validatePersona, type PersonaSpec } from '../../../src/public'

interface CliArgs {
  specPath: string
  overrideId?: string
  dry: boolean
  force: boolean
}

const PUBLIC_PERSONAS_TS = 'src/public/personas.ts'

function parseArgs(argv: string[]): CliArgs {
  const positional: string[] = []
  const flags = { dry: false, force: false }
  let overrideId: string | undefined
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i]
    if (k === '--dry') flags.dry = true
    else if (k === '--force') flags.force = true
    else if (k === '--id') {
      overrideId = argv[++i]
      if (!overrideId) fail(1, '--id expects a value')
    } else if (k.startsWith('--')) {
      fail(1, `unknown flag ${k}`)
    } else {
      positional.push(k)
    }
  }
  if (positional.length === 0) fail(1, 'usage: tsx persist-persona.ts <spec.json> [--id <override>] [--dry] [--force]')
  return { specPath: positional[0], overrideId, ...flags }
}

function fail(code: number, msg: string): never {
  process.stderr.write(`[persist-persona] ${msg}\n`)
  process.exit(code)
}

function loadSpec(p: string): PersonaSpec {
  const txt = readFileSync(resolve(process.cwd(), p), 'utf8')
  return JSON.parse(txt) as PersonaSpec
}

/** 序列化 spec → TS 字面量（不带函数，全是 JSON-serializable） */
function specToTsLiteral(spec: PersonaSpec): string {
  // 直接 JSON.stringify 然后稍微整理：TS 与 JSON 在对象/数组语法上兼容，
  // 只需把 string key 的引号在合法处去掉。为了简单与稳健，保留全引号风格。
  const json = JSON.stringify(spec, null, 2)
  return json
}

function renderPersonaSpecModule(spec: PersonaSpec): string {
  const literal = specToTsLiteral(spec)
  return `/**
 * ${spec.name} (${spec.id}) · PersonaSpec
 *
 * 由 skills/wechat-typeset-author-persona/scripts/persist-persona.ts 生成。
 * ${spec.meta?.basedOn ? `基于 ${spec.meta.basedOn} 派生。` : ''}
 */

import type { PersonaSpec } from '../_shared/spec'

export const spec: PersonaSpec = ${literal} as PersonaSpec

export default spec
`
}

function patchPublicPersonas(existing: string, id: string, varName: string): string {
  const importLine = `import { spec as ${varName} } from '../core/themes/${id}/persona.data'`
  const importBlock = existing.match(
    /(import \{ spec as \w+ \} from '\.\.\/core\/themes\/[^']+\/persona\.spec'\n)+/,
  )
  if (!importBlock) {
    throw new Error(`failed to locate import block in ${PUBLIC_PERSONAS_TS}`)
  }
  if (existing.includes(`from '../core/themes/${id}/persona.data'`)) {
    return existing // 已存在
  }

  const withImport = existing.replace(importBlock[0], importBlock[0] + importLine + '\n')

  // 追加到 PERSONA_SPECS 数组末尾
  const arrayMatch = withImport.match(/export const PERSONA_SPECS[^=]*=\s*\[([^\]]*)\]/)
  if (!arrayMatch) {
    throw new Error(`failed to locate PERSONA_SPECS array in ${PUBLIC_PERSONAS_TS}`)
  }
  const oldBody = arrayMatch[1]
  // 去掉末尾空白和尾逗号，再追加新条目（避免双逗号）
  const trimmed = oldBody.replace(/,?\s*$/, '')
  const newBody = trimmed + `,\n  ${varName},\n`
  return withImport.replace(arrayMatch[0], `export const PERSONA_SPECS: readonly PersonaSpec[] = [${newBody}]`)
}

function camelCaseFromKebab(s: string): string {
  return s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()) + 'Spec'
}

function main() {
  const args = parseArgs(process.argv)
  let spec = loadSpec(args.specPath)
  if (args.overrideId) {
    spec = { ...spec, id: args.overrideId }
  }

  const validation = validatePersona(spec)
  if (!validation.ok) {
    process.stderr.write(`[persist-persona] validation failed (${validation.errors.length} errors):\n`)
    for (const e of validation.errors) {
      process.stderr.write(`  ${e.path}: ${e.message}\n`)
    }
    process.stderr.write(`\nRun \`validate-and-fix.ts\` first to repair.\n`)
    process.exit(2)
  }

  const personaPath = resolve(process.cwd(), `src/core/themes/${spec.id}/persona.data.ts`)
  if (existsSync(personaPath) && !args.force) {
    process.stderr.write(
      `[persist-persona] persona id "${spec.id}" already exists at ${personaPath}.\n` +
        `Pass --force to overwrite.\n`,
    )
    process.exit(3)
  }

  const personaTs = renderPersonaSpecModule(spec)
  const varName = camelCaseFromKebab(spec.id)

  const publicPath = resolve(process.cwd(), PUBLIC_PERSONAS_TS)
  const publicSource = readFileSync(publicPath, 'utf8')
  const publicSourceNew = patchPublicPersonas(publicSource, spec.id, varName)

  if (args.dry) {
    process.stdout.write('=== ' + personaPath + ' ===\n')
    process.stdout.write(personaTs + '\n')
    process.stdout.write('=== ' + publicPath + ' (diff) ===\n')
    process.stdout.write(
      publicSourceNew === publicSource
        ? '(no changes)\n'
        : '(would patch import + PERSONA_SPECS)\n',
    )
    process.exit(0)
  }

  mkdirSync(dirname(personaPath), { recursive: true })
  writeFileSync(personaPath, personaTs, 'utf8')
  writeFileSync(publicPath, publicSourceNew, 'utf8')

  process.stdout.write(
    JSON.stringify(
      {
        ok: true,
        persona_id: spec.id,
        files_written: [personaPath, publicPath],
        next_steps: [
          'npx tsx scripts/validate-spec.ts （仓库根脚本，校验全部 spec）',
          'npm run build:capabilities （刷新 dist/api/capabilities.json）',
          '在 src/themes/index.ts 的 DISPLAY_ORDER 里加上新 id（如果你用 Vue 端预览）',
        ],
      },
      null,
      2,
    ) + '\n',
  )
}

main()
