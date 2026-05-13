#!/usr/bin/env tsx
/**
 * preview-motifs —— spec.json → HTML gallery（独立浏览看效果）。
 *
 * 输出单页 HTML，包含：
 *   - 色板色块（11 键 palette + 4 态 status）
 *   - 所有 motif 渲染（h2Prefix / dividerWave / 4 态 admonition icon / noteIcon / stepBadge 等）
 *   - typography 字号样例（h1-h3 / 正文 / 等宽代码）
 *   - 5 态 admonition variant 预览（accent / soft 色应用）
 *
 * 不调浏览器，纯字符串拼。便于本地浏览或 CI 截图。
 *
 * 用法：
 *   tsx preview-motifs.ts <spec.json> [--out tmp/preview.html]
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  type PersonaSpec,
  validatePersona,
  renderMotif,
  renderMotifWithValues,
} from '../../../src/public'

function loadSpec(p: string): PersonaSpec {
  const txt = readFileSync(resolve(process.cwd(), p), 'utf8')
  return JSON.parse(txt) as PersonaSpec
}

function renderPaletteSwatches(spec: PersonaSpec): string {
  const keys = Object.keys(spec.palette) as Array<keyof PersonaSpec['palette']>
  return `
<section class="block">
  <h2>Palette · 11 键</h2>
  <div class="grid swatches">
    ${keys
      .map(
        (k) => `
      <div class="swatch">
        <div class="chip" style="background:${spec.palette[k]}"></div>
        <div class="label"><code>${k}</code><br/><span class="hex">${spec.palette[k]}</span></div>
      </div>`,
      )
      .join('')}
  </div>
</section>`
}

function renderStatusSwatches(spec: PersonaSpec): string {
  const keys: Array<'tip' | 'info' | 'warning' | 'danger'> = ['tip', 'info', 'warning', 'danger']
  return `
<section class="block">
  <h2>Status · 4 态语义色</h2>
  <div class="grid status-grid">
    ${keys
      .map(
        (k) => `
      <div class="status-row">
        <div class="status-name">${k}</div>
        <div class="chip" style="background:${spec.status[k].accent}"><span>accent</span></div>
        <div class="chip" style="background:${spec.status[k].soft}"><span>soft</span></div>
        <div class="status-hex">
          <code>${spec.status[k].accent}</code> /
          <code>${spec.status[k].soft}</code>
        </div>
      </div>`,
      )
      .join('')}
  </div>
</section>`
}

function renderMotifs(spec: PersonaSpec): string {
  const out: string[] = []
  const m = spec.motifs

  const shapes: Array<[string, string]> = []
  if (m.h2Prefix) shapes.push(['h2Prefix', renderMotif(m.h2Prefix)])
  if (m.h3Prefix) shapes.push(['h3Prefix', renderMotif(m.h3Prefix)])
  if (m.dividerWave) shapes.push(['dividerWave', renderMotif(m.dividerWave)])
  if (m.dividerDots) shapes.push(['dividerDots', renderMotif(m.dividerDots)])
  if (m.dividerFlower) shapes.push(['dividerFlower', renderMotif(m.dividerFlower)])
  if (m.quoteMark) shapes.push(['quoteMark', renderMotif(m.quoteMark)])
  if (m.listBullet) shapes.push(['listBullet', renderMotif(m.listBullet)])
  if (m.sectionCorner) shapes.push(['sectionCorner', renderMotif(m.sectionCorner)])
  if (m.tipIcon) shapes.push(['tipIcon', renderMotif(m.tipIcon)])
  if (m.warningIcon) shapes.push(['warningIcon', renderMotif(m.warningIcon)])
  if (m.infoIcon) shapes.push(['infoIcon', renderMotif(m.infoIcon)])
  if (m.dangerIcon) shapes.push(['dangerIcon', renderMotif(m.dangerIcon)])
  if (m.noteIcon) shapes.push(['noteIcon', renderMotif(m.noteIcon)])
  if (m.copyIcon) shapes.push(['copyIcon', renderMotif(m.copyIcon)])
  if (m.externalLinkIcon) shapes.push(['externalLinkIcon', renderMotif(m.externalLinkIcon)])
  if (m.terminalPrompt) shapes.push(['terminalPrompt', renderMotif(m.terminalPrompt)])
  if (m.sealMark) shapes.push(['sealMark', renderMotif(m.sealMark)])

  out.push(`
<section class="block">
  <h2>Motif · 静态 ${shapes.length} 个</h2>
  <div class="grid motif-grid">
    ${shapes
      .map(
        ([name, svg]) => `
      <div class="motif-card">
        <div class="motif-svg" style="background:${spec.palette.bg}">${svg}</div>
        <code>${name}</code>
      </div>`,
      )
      .join('')}
  </div>
</section>`)

  // 模板 motif
  const templates: string[] = []
  if (m.stepBadge) {
    const badges = [1, 2, 3].map((n) => renderMotifWithValues(m.stepBadge!, { N: n })).join(' ')
    templates.push(`
      <div class="motif-card wide">
        <div class="motif-svg" style="background:${spec.palette.bg}">${badges}</div>
        <code>stepBadge · {N}=1,2,3</code>
      </div>`)
  }
  if (m.issueStamp) {
    const stamp = renderMotifWithValues(m.issueStamp, {
      issue: '023',
      date: '2026-04-20',
      kind: '周刊',
    })
    templates.push(`
      <div class="motif-card wide">
        <div class="motif-svg" style="background:${spec.palette.bg}">${stamp}</div>
        <code>issueStamp · issue=023</code>
      </div>`)
  }

  if (templates.length > 0) {
    out.push(`
<section class="block">
  <h2>Motif · 模板 ${templates.length} 个</h2>
  <div class="grid motif-grid">${templates.join('')}</div>
</section>`)
  }

  return out.join('')
}

function renderTypography(spec: PersonaSpec): string {
  const t = spec.typography
  return `
<section class="block">
  <h2>Typography</h2>
  <div class="typography-demo" style="font-size:${t.baseSize}px;line-height:${t.lineHeight};letter-spacing:${t.letterSpacing}px;color:${spec.palette.text};background:${spec.palette.bg};padding:24px;">
    <div style="font-size:${t.h1Size}px;font-weight:700;">H1 · 大标题示例（${t.h1Size}px）</div>
    <div style="font-size:${t.h2Size}px;font-weight:600;margin-top:16px;">H2 · 二级标题（${t.h2Size}px）</div>
    <div style="font-size:${t.h3Size}px;font-weight:600;margin-top:12px;">H3 · 三级标题（${t.h3Size}px）</div>
    <p style="margin-top:16px;">
      正文段落（${t.baseSize}px / line-height ${t.lineHeight}）。
      中文与英文混排示例：The quick brown fox jumps over the lazy dog. 中文测试段落，字距 ${t.letterSpacing}px。
      行高决定密集段落是否压抑，字号决定 375px 屏上的清晰度。
    </p>
    <p>
      第二段落，<span style="color:${spec.palette.textMuted};">textMuted 灰色文字</span>，
      <code style="color:${spec.palette.code};background:${spec.palette.bgMuted};padding:2px 4px;border-radius:3px;">code 行内代码</code>，
      <a style="color:${spec.palette.primary};">primary 主色链接</a>。
    </p>
  </div>
</section>`
}

function renderHtml(spec: PersonaSpec): string {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <title>Persona Preview · ${spec.name} (${spec.id})</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 24px; font-family: system-ui, -apple-system, sans-serif; background: #fafafa; color: #1a1a1a; }
    .header { margin-bottom: 24px; }
    .header h1 { margin: 0 0 8px 0; }
    .header .meta { color: #666; font-size: 14px; }
    .header .meta code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; }
    .block { background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin-bottom: 16px; }
    .block h2 { margin: 0 0 16px 0; font-size: 16px; color: #444; }
    .grid { display: grid; gap: 12px; }
    .swatches { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
    .swatch { border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden; }
    .swatch .chip { height: 56px; }
    .swatch .label { padding: 8px; font-size: 12px; line-height: 1.4; }
    .swatch .hex { color: #888; font-family: monospace; }
    .status-grid { grid-template-columns: 1fr; gap: 8px; }
    .status-row { display: flex; align-items: center; gap: 12px; border: 1px solid #e0e0e0; border-radius: 6px; padding: 8px 12px; }
    .status-name { font-weight: 600; min-width: 80px; }
    .status-row .chip { width: 60px; height: 32px; border-radius: 4px; position: relative; }
    .status-row .chip span { position: absolute; top: 6px; left: 6px; color: #fff; font-size: 10px; mix-blend-mode: difference; }
    .status-hex { font-size: 12px; color: #888; font-family: monospace; }
    .motif-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
    .motif-card { border: 1px solid #e0e0e0; border-radius: 6px; padding: 12px; text-align: center; }
    .motif-card.wide { grid-column: span 2; }
    .motif-card .motif-svg { padding: 16px; border-radius: 4px; margin-bottom: 8px; min-height: 40px; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .motif-card code { font-size: 11px; color: #555; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${spec.name} <span class="meta"><code>${spec.id}</code></span></h1>
    <div class="meta">${spec.description} · 受众：${spec.audience}</div>
    <div class="meta" style="margin-top:4px;">created at ${spec.meta?.createdAt ?? '(missing)'}</div>
  </div>
  ${renderPaletteSwatches(spec)}
  ${renderStatusSwatches(spec)}
  ${renderTypography(spec)}
  ${renderMotifs(spec)}
</body>
</html>`
}

function main() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    process.stderr.write('[preview-motifs] usage: tsx preview-motifs.ts <spec.json> [--out path]\n')
    process.exit(1)
  }
  const specPath = args[0]
  const outIdx = args.indexOf('--out')
  const outPath = outIdx >= 0 ? args[outIdx + 1] : undefined

  const spec = loadSpec(specPath)
  const validation = validatePersona(spec)
  if (!validation.ok) {
    process.stderr.write(
      `[preview-motifs] warning: spec validation failed (${validation.errors.length} errors). ` +
        `Preview will still render in best-effort mode.\n`,
    )
  }

  const html = renderHtml(spec)
  if (outPath) {
    writeFileSync(resolve(process.cwd(), outPath), html, 'utf8')
    process.stderr.write(`[preview-motifs] wrote ${outPath}\n`)
  } else {
    process.stdout.write(html)
  }
}

main()
