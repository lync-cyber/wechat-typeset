/**
 * Showcase 生成器 · drift 检查 + 形状合约
 *
 * 验证 generateShowcase 对每份内置主题的产物与 docs/generated/showcase/<id>.html
 * 完全一致。任何 spec / 骨架 / showcase chrome 改动 → 本测试先红 → 作者须跑
 * `pnpm gen:showcase` 补录快照并 commit。
 *
 * 形状合约：
 *   - 单一 <body>、合法 doctype
 *   - 卡片含 data-persona 锚点
 *   - 三段 rendered 区块 section-label 都出现（element / base / signature）
 *   - voice 报告区出现"覆盖率"字样
 *
 * 补录：npx vitest run tests/unit/showcase-generator.spec.ts -u
 */

import { describe, expect, it, beforeAll } from 'vitest'
import { resolve, basename, dirname } from 'node:path'
import { pathToFileURL } from 'node:url'
import { readFileSync, existsSync, globSync } from 'node:fs'

import {
  BASE_ELEMENT_FIXTURE_MD,
  BASE_CONTAINER_FIXTURE_MD,
  buildSignatureFixtureMd,
} from '../../src/domain/gallery/baseFixture'
import { generateShowcase } from '../../src/domain/gallery/showcase'
import { render } from '../../src/core/pipeline'
import {
  analyzeThemeVoice,
  specToTheme,
  type PersonaSpec,
} from '../../src/core/themes/_shared/spec'

interface Loaded {
  dir: string
  spec: PersonaSpec
}

const LOADED: Loaded[] = []

beforeAll(async () => {
  const paths = globSync('src/core/themes/*/persona.data.ts', { cwd: process.cwd() })
    .map((p) => resolve(process.cwd(), p))
    .sort()
  for (const p of paths) {
    const mod = await import(pathToFileURL(p).href)
    const spec = (mod.spec ?? mod.default) as PersonaSpec | undefined
    if (!spec) throw new Error(`No "spec" export in ${p}`)
    LOADED.push({ dir: basename(dirname(p)), spec })
  }
})

function buildShowcaseHtml(spec: PersonaSpec): string {
  const theme = specToTheme(spec)
  const elementCatalog = render({ md: BASE_ELEMENT_FIXTURE_MD, theme }).html
  const baseContainers = render({ md: BASE_CONTAINER_FIXTURE_MD, theme }).html
  const sig = buildSignatureFixtureMd(spec)
  const signatureContainers = sig.md ? render({ md: sig.md, theme }).html : ''
  const voice = analyzeThemeVoice(spec)
  return generateShowcase({
    spec,
    fragments: { elementCatalog, baseContainers, signatureContainers },
    voice,
  })
}

/**
 * drift 单主题独立 it：避免 14 主题串行渲染撞 5s 默认 testTimeout，
 * 且每主题红时能从测试名一眼看到是谁。
 */
describe('showcase generator · drift', () => {
  it.each([
    'academic-frontier',
    'brutalist',
    'business-finance',
    'data-brief',
    'default',
    'editorial-mook',
    'industry-observer',
    'late-night-vinyl',
    'life-aesthetic',
    'literary-humanism',
    'people-story',
    'swiss-grid',
    'tech-explainer',
    'tech-geek',
  ])('%s 产物与 docs/generated/showcase/<id>.html 一致', async (id) => {
    const spec = LOADED.find((l) => l.spec.id === id)?.spec
    if (!spec) throw new Error(`spec not loaded: ${id}`)
    const html = buildShowcaseHtml(spec)
    const out = resolve(process.cwd(), `docs/generated/showcase/${id}.html`)
    await expect(html).toMatchFileSnapshot(out)
  })
})

describe('showcase generator · 形状合约', () => {
  it('每份产物 doctype + 单一 body', () => {
    for (const { spec } of LOADED) {
      const file = resolve(process.cwd(), `docs/generated/showcase/${spec.id}.html`)
      expect(existsSync(file), `产物缺失：${spec.id}.html`).toBe(true)
      const html = readFileSync(file, 'utf8')
      expect(html).toMatch(/^<!doctype html>/i)
      expect(html.match(/<body>/g)?.length).toBe(1)
      expect(html.match(/<\/body>/g)?.length).toBe(1)
    }
  })

  it('每份产物含 data-persona 锚点与三段 rendered 区块标签', () => {
    for (const { spec } of LOADED) {
      const html = readFileSync(
        resolve(process.cwd(), `docs/generated/showcase/${spec.id}.html`),
        'utf8',
      )
      expect(html).toContain(`data-persona="${spec.id}"`)
      expect(html).toContain('Rendered · 元素 + Inline 基线')
      expect(html).toContain('Rendered · Base 容器陈列')
      expect(html).toContain('Rendered · 扩展签名容器')
      expect(html).toContain('Voice · 覆盖度报告')
    }
  })

  it('扩展签名容器区块在主题无扩展签名时显示空提示', () => {
    // default 主题 signatureContainers: [] —— 应渲染 empty-note 而非真实容器
    const html = readFileSync(
      resolve(process.cwd(), 'docs/generated/showcase/default.html'),
      'utf8',
    )
    expect(html).toContain('本主题未声明任何 pack:* / theme:* 扩展签名容器')
  })
})
