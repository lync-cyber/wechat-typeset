#!/usr/bin/env tsx
/**
 * 生成 dist/api/covers/<personaId>.svg —— 每 persona 一张占位 SVG，按 palette 染色。
 * 下游可由 capabilities.json 的 coverUriPattern 算出封面 URL；svg 是矢量唯一真源，
 * 需光栅由下游自行 svg2png（仓库不提交 PNG）。
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { listPersonas, getPersona } from '../src/public'
import { makeCoverPlaceholder, shapeToSvg, toThemeTokens } from '../src/core/themes/_shared/spec'

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
    // tokens 透传：spec.motifs.coverPlaceholder 可能含 'token:<key>' 引用，需要 tokens 解析。
    const svg = shapeToSvg(shape, toThemeTokens(spec))
    const out = resolve(OUT_DIR, `${s.id}.svg`)
    writeFileSync(out, svg, 'utf8')
    console.log(`wrote ${out} (${svg.length} bytes)`)
  }
  console.log(`\n${summaries.length} covers written to ${OUT_DIR}`)
}

build()
