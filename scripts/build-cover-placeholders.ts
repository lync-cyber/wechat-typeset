#!/usr/bin/env tsx
/**
 * 生成 dist/api/covers/<personaId>.svg —— og:image / 公众号图文封面尺寸的占位
 * SVG，每 persona 一张，按各家 palette 染色。
 *
 * 设计意图：
 *   - 下游消费方（agent / 自动化发文工具）拉到 capabilities.json 后，可由
 *     `coverUriPattern` 算出每 persona 的封面 URL，无需自己合成 og:image。
 *   - 仓库本身不提交 PNG —— 需要光栅由下游 svg2png 自己跑（svg 是矢量唯一真源）。
 *   - 每张文件 ~2-3 KB，10 张 < 30 KB，跟着 dist/api/capabilities.json 同 CDN 分发。
 *
 * 生成策略：
 *   1. 若 persona.motifs.coverPlaceholder 显式存在 → 直接用（persona 自家设计）。
 *   2. 否则 → 调用 makeCoverPlaceholder({ palette, title, tagline }) 合成默认款。
 *
 * 运行：`npx tsx scripts/build-cover-placeholders.ts`（与 build:capabilities 并列；
 * `npm run build` 链应当串起来一起跑）。
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { listPersonas, getPersona } from '../src/public'
import { makeCoverPlaceholder, shapeToSvg } from '../src/core/themes/_shared/spec'

const OUT_DIR = resolve(process.cwd(), 'dist/api/covers')

function ensureDir(p: string): void {
  mkdirSync(p, { recursive: true })
}

function build(): void {
  ensureDir(OUT_DIR)
  const summaries = listPersonas()
  for (const s of summaries) {
    const spec = getPersona(s.id)
    // 优先 persona 自家显式定义的 coverPlaceholder
    const shape =
      spec.motifs.coverPlaceholder ??
      makeCoverPlaceholder({
        palette: spec.palette,
        title: spec.name,
        tagline: spec.description,
        kicker: spec.id.toUpperCase().replace(/-/g, ' '),
      })
    const svg = shapeToSvg(shape)
    const out = resolve(OUT_DIR, `${s.id}.svg`)
    writeFileSync(out, svg, 'utf8')
    console.log(`wrote ${out} (${svg.length} bytes)`)
  }
  console.log(`\n${summaries.length} covers written to ${OUT_DIR}`)
}

build()
