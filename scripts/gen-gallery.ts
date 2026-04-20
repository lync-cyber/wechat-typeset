#!/usr/bin/env tsx
/**
 * 生成 docs/personas-spec-gallery.html。
 *
 * 读取 src/themes/*\/persona.spec.ts 里的 9 份 spec，按目录名排序后投射为单文件 HTML。
 * 输出路径固定，drift 检查在 tests/gallery-generator.spec.ts 用 toMatchFileSnapshot。
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { globSync } from 'node:fs'
import { generateGallery } from '../src/gallery/generate'
import type { PersonaSpec } from '../src/themes/_shared/spec'

async function main() {
  const paths = globSync('src/themes/*/persona.spec.ts', { cwd: process.cwd() })
    .map((p) => resolve(process.cwd(), p))
    .sort()
  if (paths.length === 0) {
    console.error('No persona.spec.ts files found')
    process.exit(1)
  }

  const specs: PersonaSpec[] = []
  for (const p of paths) {
    const mod = await import(pathToFileURL(p).href)
    const spec = (mod.spec ?? mod.default) as PersonaSpec | undefined
    if (!spec) throw new Error(`No "spec" export in ${p}`)
    specs.push(spec)
  }

  const html = generateGallery(specs)
  const out = resolve(process.cwd(), 'docs/personas-spec-gallery.html')
  writeFileSync(out, html, 'utf8')
  console.log(`wrote ${out} (${specs.length} personas, ${html.length} chars)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
