#!/usr/bin/env tsx
/**
 * CLI：校验一个或多个 persona.spec.ts 文件的合法性。
 *
 * 用法：
 *   tsx scripts/validate-spec.ts src/themes/default/persona.spec.ts
 *   tsx scripts/validate-spec.ts src/themes/**\/persona.spec.ts
 *
 * 不传参则扫描 src/themes/*\/persona.spec.ts。
 */

import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { globSync } from 'node:fs'
import { validateSpec, type PersonaSpec } from '../src/themes/_shared/spec'

async function loadSpec(path: string): Promise<PersonaSpec> {
  const mod = await import(pathToFileURL(path).href)
  const spec = (mod.spec ?? mod.default) as PersonaSpec | undefined
  if (!spec) throw new Error(`No default export or "spec" export in ${path}`)
  return spec
}

async function main() {
  const args = process.argv.slice(2)
  const paths = args.length > 0
    ? args.map((p) => resolve(process.cwd(), p))
    : globSync('src/themes/*/persona.spec.ts', { cwd: process.cwd() }).map((p) =>
        resolve(process.cwd(), p),
      )

  if (paths.length === 0) {
    console.error('No persona.spec.ts files found')
    process.exit(1)
  }

  let failed = 0
  for (const p of paths) {
    if (!existsSync(p)) {
      console.error(`[skip] ${p} — does not exist`)
      continue
    }
    const spec = await loadSpec(p)
    const r = validateSpec(spec)
    if (r.ok) {
      console.log(`[ok] ${spec.id} (${p})`)
    } else {
      failed++
      console.error(`[fail] ${spec.id} (${p})`)
      for (const e of r.errors) console.error(`  error  ${e.path}: ${e.message}`)
      for (const w of r.warnings) console.error(`  warn   ${w.path}: ${w.message}`)
    }
  }
  if (failed > 0) process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
