#!/usr/bin/env tsx
/**
 * CI 守卫：核对 `src/core/themes/<slug>/persona.data.ts` 与 `src/core/themes/registry.ts`
 * 的对齐（import 列表 + DISPLAY_ORDER）。
 *
 * registry.ts 是 LLM/scripts/editor 共享的单一真源；新增主题忘改 registry 会让
 * themeList / listPersonas() / capabilities.json 看不到。本脚本提供早期 CI gate，
 * 不依赖 vitest。
 */

import { existsSync, readFileSync } from 'node:fs'
import { globSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { validateSpec, type PersonaSpec } from '../src/core/themes/_shared/spec'

const REPO_ROOT = process.cwd()
const REGISTRY_TS = resolve(REPO_ROOT, 'src/core/themes/registry.ts')

interface ThemeOnDisk {
  /** 目录名（kebab） */
  dir: string
  /** spec.id（应与 dir 相等；conformance 守这一道） */
  specId: string
  /** persona.data.ts 绝对路径 */
  path: string
}

async function discoverThemesOnDisk(): Promise<ThemeOnDisk[]> {
  const paths = globSync('src/core/themes/*/persona.data.ts', { cwd: REPO_ROOT })
    .map((p) => resolve(REPO_ROOT, p))
    .sort()
  const out: ThemeOnDisk[] = []
  for (const p of paths) {
    const mod = await import(pathToFileURL(p).href)
    const spec = (mod.spec ?? mod.default) as PersonaSpec | undefined
    if (!spec) {
      console.error(`[fail] ${p} — no "spec" or default export`)
      process.exit(1)
    }
    out.push({ dir: basename(dirname(p)), specId: spec.id, path: p })
  }
  return out
}

function parseRegistry(source: string): { importDirs: string[]; displayOrder: string[] } {
  const importDirs: string[] = []
  const importRe = /from\s+['"]\.\/([a-z][a-z0-9-]*)\/persona\.data['"]/g
  let m: RegExpExecArray | null
  while ((m = importRe.exec(source))) importDirs.push(m[1])

  const displayMatch = /DISPLAY_ORDER\s*:\s*[^=]*=\s*\[([^\]]*)\]/m.exec(source)
  const displayOrder: string[] = []
  if (displayMatch) {
    const strRe = /['"]([a-z][a-z0-9-]*)['"]/g
    let s: RegExpExecArray | null
    while ((s = strRe.exec(displayMatch[1]))) displayOrder.push(s[1])
  }
  return { importDirs, displayOrder }
}

async function main() {
  if (!existsSync(REGISTRY_TS)) {
    console.error(`[fail] ${REGISTRY_TS} 不存在`)
    process.exit(1)
  }
  const onDisk = await discoverThemesOnDisk()

  // 顺便：每份 spec 走一遍 validateSpec —— 避免本脚本"声称对齐但 spec 自身就坏了"
  let invalid = 0
  for (const t of onDisk) {
    const mod = await import(pathToFileURL(t.path).href)
    const spec = (mod.spec ?? mod.default) as PersonaSpec
    const r = validateSpec(spec)
    if (!r.ok) {
      invalid++
      console.error(`[fail] validateSpec(${t.specId}):`)
      for (const e of r.errors) console.error(`  ${e.path}: ${e.message}`)
    }
  }
  if (invalid > 0) process.exit(1)

  const src = readFileSync(REGISTRY_TS, 'utf-8')
  const { importDirs, displayOrder } = parseRegistry(src)

  const errors: string[] = []
  const diskDirs = new Set(onDisk.map((t) => t.dir))
  const diskIds = new Set(onDisk.map((t) => t.specId))
  const importedSet = new Set(importDirs)
  const orderSet = new Set(displayOrder)

  // 1. 磁盘上每个目录都在 import 里
  for (const t of onDisk) {
    if (!importedSet.has(t.dir)) {
      errors.push(
        `themes/${t.dir}/persona.data.ts 存在,但 themes/registry.ts 未 import './${t.dir}/persona.data'`,
      )
    }
  }
  for (const t of onDisk) {
    if (!orderSet.has(t.specId)) {
      errors.push(
        `themes/${t.dir} 的 spec.id="${t.specId}" 未列入 themes/registry.ts:DISPLAY_ORDER`,
      )
    }
  }
  for (const d of importDirs) {
    if (!diskDirs.has(d)) {
      errors.push(`themes/registry.ts import './${d}/persona.data' 但 themes/${d}/persona.data.ts 不存在`)
    }
  }
  for (const id of displayOrder) {
    if (!diskIds.has(id)) {
      errors.push(`themes/registry.ts:DISPLAY_ORDER 包含 "${id}" 但磁盘上没有对应 persona.data.ts`)
    }
  }

  if (errors.length > 0) {
    console.error('[fail] theme registry 漂移:')
    for (const e of errors) console.error(`  - ${e}`)
    console.error('\n修复方法: 在 src/core/themes/registry.ts 同步 import + ALL_SPECS + DISPLAY_ORDER。')
    process.exit(1)
  }

  console.log(`[ok] theme registry 对齐 (${onDisk.length} themes)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
