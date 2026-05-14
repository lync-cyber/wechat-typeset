#!/usr/bin/env tsx
/**
 * CI 守卫：核对 `src/core/themes/<slug>/persona.data.ts` 与 `src/core/themes/index.ts`
 * 注册表三处（import 列表 / ALL_THEMES 数组 / DISPLAY_ORDER 排序数组）的对齐。
 *
 * 设计动机（review P3）：
 *   themes/index.ts 不能用 import.meta.glob —— tsx 在 Node 下跑 pipeline 不认 Vite 转换。
 *   显式 import 是刻意为之，但新增主题忘记动 index.ts 三行就会留下"主题文件存在但 themeList
 *   不知道"的静默漂移。conformance.spec.ts 兜底在测试阶段，但 LLM 自动化生成场景
 *   下需要更早的 CI gate（无需启动 vitest）。
 *
 * 检查项：
 *   1. 每份 persona.data.ts 对应的目录都被 index.ts import 到（按目录名查 import 路径）
 *   2. 每份 persona.data.ts 的 spec.id 出现在 DISPLAY_ORDER 数组里
 *   3. 反方向：DISPLAY_ORDER / import 列表里没有 dangling 项（指向不存在的目录）
 *
 * 不检查（交给 conformance.spec.ts）：
 *   - specToTheme 投影保真
 *   - schema 同步
 *   - SUPPORTED_SIGNATURE_CONTAINERS 与 vocabulary 同步
 */

import { existsSync, readFileSync } from 'node:fs'
import { globSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { validateSpec, type PersonaSpec } from '../src/core/themes/_shared/spec'

const REPO_ROOT = process.cwd()
const THEMES_INDEX = resolve(REPO_ROOT, 'src/core/themes/index.ts')

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

/**
 * 解析 themes/index.ts 中三处声明：
 *   - import 字符串字面量 `from './<dir>'`
 *   - DISPLAY_ORDER 数组里的字符串字面量
 *
 * 用纯正则解析而非 AST：本文件结构稳定（一头一尾 import + 顶层 const）。
 * 一旦未来引入更复杂语法（动态 import、from 表达式），改用 ts-morph 再说。
 *
 * `./types` 是 ThemeRegistry 自身的类型导入,不是主题目录,过滤掉。
 * 未来如果增加其他非主题相邻模块（如 `./_shared`），按需扩展此白名单。
 */
const NON_THEME_IMPORTS: ReadonlySet<string> = new Set(['types'])

function parseRegistry(source: string): { importDirs: string[]; displayOrder: string[] } {
  const importDirs: string[] = []
  const importRe = /from\s+['"]\.\/([a-z][a-z0-9-]*)['"]/g
  let m: RegExpExecArray | null
  while ((m = importRe.exec(source))) {
    if (!NON_THEME_IMPORTS.has(m[1])) importDirs.push(m[1])
  }

  const displayMatch = /const\s+DISPLAY_ORDER\s*:\s*[^=]*=\s*\[([^\]]*)\]/m.exec(source)
  const displayOrder: string[] = []
  if (displayMatch) {
    const body = displayMatch[1]
    const strRe = /['"]([a-z][a-z0-9-]*)['"]/g
    let s: RegExpExecArray | null
    while ((s = strRe.exec(body))) displayOrder.push(s[1])
  }
  return { importDirs, displayOrder }
}

async function main() {
  if (!existsSync(THEMES_INDEX)) {
    console.error(`[fail] ${THEMES_INDEX} 不存在`)
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

  const src = readFileSync(THEMES_INDEX, 'utf-8')
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
        `themes/${t.dir}/persona.data.ts 存在,但 themes/index.ts 未 import './${t.dir}'`,
      )
    }
  }
  // 2. 磁盘上每个 spec.id 都在 DISPLAY_ORDER
  for (const t of onDisk) {
    if (!orderSet.has(t.specId)) {
      errors.push(
        `themes/${t.dir} 的 spec.id="${t.specId}" 未列入 themes/index.ts:DISPLAY_ORDER`,
      )
    }
  }
  // 3. import 不指向不存在的目录
  for (const d of importDirs) {
    if (!diskDirs.has(d)) {
      errors.push(`themes/index.ts import './${d}' 但 themes/${d}/persona.data.ts 不存在`)
    }
  }
  // 4. DISPLAY_ORDER 不引用不存在的 id
  for (const id of displayOrder) {
    if (!diskIds.has(id)) {
      errors.push(`themes/index.ts:DISPLAY_ORDER 包含 "${id}" 但磁盘上没有对应 persona.data.ts`)
    }
  }

  if (errors.length > 0) {
    console.error('[fail] theme registry 漂移:')
    for (const e of errors) console.error(`  - ${e}`)
    console.error('\n修复方法: 在 src/core/themes/index.ts 同步 import / ALL_THEMES / DISPLAY_ORDER 三处。')
    process.exit(1)
  }

  console.log(`[ok] theme registry 对齐 (${onDisk.length} themes)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
