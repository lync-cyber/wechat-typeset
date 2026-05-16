#!/usr/bin/env tsx
/**
 * 生成 docs/generated/showcase/<id>.html —— 每个内置主题一份单页 showcase。
 *
 * Showcase 是"主题视觉契约页"：spec 卡片 + 该主题真实渲染产物（元素 / base 容器 /
 * 扩展签名容器三段）+ voice 覆盖报告。是主题作者验收与 LLM few-shot 资料的 ground truth。
 *
 * 命令：
 *   tsx scripts/gen-showcase.ts          # 原地写 14 份 HTML
 *   tsx scripts/gen-showcase.ts --check  # CI 模式：与现有产物对账，drift 即 exit 1
 *
 * 双层守卫：tests/unit/showcase-generator.spec.ts 在 `npm test` 守 drift，
 * 本脚本 `--check` 在 `npm run build` 守 drift（不跑 test 也能拦）。
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { JSDOM } from 'jsdom'
import { loadAllSpecs, normalizeEol } from './_lib'

// wxPatch 用了浏览器 DOMParser；Node 下缺，先把 jsdom 注入 globalThis
const dom = new JSDOM('', { url: 'http://localhost/' })
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).DOMParser = dom.window.DOMParser
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).XMLSerializer = dom.window.XMLSerializer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).document = dom.window.document
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).Node = dom.window.Node

const { render } = await import('../src/core/pipeline')
import {
  BASE_ELEMENT_FIXTURE_MD,
  BASE_CONTAINER_FIXTURE_MD,
  DECORATIONS_PREVIEW_MD,
  buildSignatureFixtureMd,
} from '../src/domain/gallery/baseFixture'
import { generateShowcase } from '../src/domain/gallery/showcase'
import { analyzeThemeVoice, specToTheme } from '../src/core/themes/_shared/spec'

async function main() {
  const isCheck = process.argv.includes('--check')
  const specs = await loadAllSpecs()
  if (specs.length === 0) {
    console.error('No persona.data.ts files found')
    process.exit(1)
  }

  const outDir = resolve(process.cwd(), 'docs/generated/showcase')
  if (!isCheck) mkdirSync(outDir, { recursive: true })

  const drifted: string[] = []
  const missing: string[] = []

  for (const { spec } of specs) {
    const theme = specToTheme(spec)

    const elementCatalog = render({ md: BASE_ELEMENT_FIXTURE_MD, theme }).html
    const baseContainers = render({ md: BASE_CONTAINER_FIXTURE_MD, theme }).html
    const sig = buildSignatureFixtureMd(spec)
    const signatureContainers = sig.md ? render({ md: sig.md, theme }).html : ''
    // C7 装饰预览：主题声明 spec.decorations 才渲染；否则传空串，showcase 显示 empty-note
    const decorationsPreview = spec.decorations
      ? render({ md: DECORATIONS_PREVIEW_MD, theme }).html
      : ''
    const voice = analyzeThemeVoice(spec)

    const html = generateShowcase({
      spec,
      fragments: { elementCatalog, baseContainers, signatureContainers, decorationsPreview },
      voice,
    })

    const out = resolve(outDir, `${spec.id}.html`)

    if (isCheck) {
      if (!existsSync(out)) {
        missing.push(out)
        continue
      }
      const current = readFileSync(out, 'utf8')
      if (normalizeEol(current) !== normalizeEol(html)) drifted.push(out)
      continue
    }

    writeFileSync(out, html, 'utf8')
    console.log(`wrote ${out} (${html.length} chars, voice=${(voice.coverage.rate * 100).toFixed(0)}%)`)
  }

  if (isCheck) {
    if (drifted.length === 0 && missing.length === 0) {
      process.stdout.write(`[gen:showcase] up to date ✓ (${specs.length} themes)\n`)
      return
    }
    if (missing.length > 0) {
      process.stderr.write(
        `[gen:showcase] 以下产物缺失（首次生成？）：\n` +
          missing.map((p) => `  - ${p}`).join('\n') +
          `\n`,
      )
    }
    if (drifted.length > 0) {
      process.stderr.write(
        `[gen:showcase] 以下 showcase 与当前 spec / 主题 voice 不同步：\n` +
          drifted.map((p) => `  - ${p}`).join('\n') +
          `\n请本地跑 \`npm run gen:showcase\` 后重新提交。\n`,
      )
    }
    process.exit(1)
  }

  console.log(`\n[gen:showcase] ${specs.length} themes → docs/generated/showcase/`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
