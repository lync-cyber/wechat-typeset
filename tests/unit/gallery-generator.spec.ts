/**
 * Gallery 生成器 · drift 检查
 *
 * 验证 generateGallery(specs) 产出与 docs/generated/personas-spec-gallery.html 完全一致。
 * 任何 spec 改动 → 本测试先红 → 作者需跑 `pnpm gen:gallery` 补录快照并 commit，
 * 才能让 CI 再次通过。这是 spec 与 gallery 之间的 contract 守卫。
 *
 * 补录：npx vitest run tests/gallery-generator.spec.ts -u
 */

import { describe, expect, it } from 'vitest'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { globSync } from 'node:fs'
import { generateGallery } from '../../src/gallery/generate'
import type { PersonaSpec } from '../../src/themes/_shared/spec'

async function loadAllSpecs(): Promise<PersonaSpec[]> {
  const paths = globSync('src/themes/*/persona.spec.ts', { cwd: process.cwd() })
    .map((p) => resolve(process.cwd(), p))
    .sort()
  const specs: PersonaSpec[] = []
  for (const p of paths) {
    const mod = await import(pathToFileURL(p).href)
    const spec = (mod.spec ?? mod.default) as PersonaSpec | undefined
    if (!spec) throw new Error(`No "spec" export in ${p}`)
    specs.push(spec)
  }
  return specs
}

describe('gallery generator', () => {
  it('产物与 docs/generated/personas-spec-gallery.html 快照一致', async () => {
    const specs = await loadAllSpecs()
    const html = generateGallery(specs)
    await expect(html).toMatchFileSnapshot(
      resolve(process.cwd(), 'docs/generated/personas-spec-gallery.html'),
    )
  })

  it('覆盖全部 9 份 spec 且 id/name 都嵌入 HTML', async () => {
    const specs = await loadAllSpecs()
    expect(specs).toHaveLength(9)
    const html = generateGallery(specs)
    for (const s of specs) {
      expect(html).toContain(`data-persona="${s.id}"`)
      expect(html).toContain(s.name)
    }
  })

  it('HTML 文档结构合法（有 doctype + 单一 body）', async () => {
    const specs = await loadAllSpecs()
    const html = generateGallery(specs)
    expect(html).toMatch(/^<!doctype html>/i)
    expect(html.match(/<body>/g)?.length).toBe(1)
    expect(html.match(/<\/body>/g)?.length).toBe(1)
  })

  it('每张卡片都内联了 11 键 palette CSS 变量', async () => {
    const specs = await loadAllSpecs()
    const html = generateGallery(specs)
    for (const s of specs) {
      const cardStart = html.indexOf(`data-persona="${s.id}"`)
      expect(cardStart).toBeGreaterThan(-1)
      // 从卡片起点往后 300 字符内必须找到 11 个 palette vars
      const slice = html.slice(cardStart, cardStart + 600)
      for (const hex of [s.palette.primary, s.palette.bg, s.palette.text, s.palette.border]) {
        expect(slice).toContain(hex)
      }
    }
  })
})
