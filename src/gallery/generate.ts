/**
 * Spec-first gallery generator.
 *
 * 读入一组 PersonaSpec，产出一份自包含 HTML（内联 CSS，无外部字体依赖）作为
 * 视觉 ground truth。每张卡片的所有可视化信息都直接来自 spec——不读 gallery 元数据，
 * 不读外部素材。这是 spec-first 架构的"三条投影之一"：specToTheme（运行时）/
 * specToGallery（本文件）/ specToJsonSchema（schema.ts）。
 *
 * Drift 检查策略（见 tests/gallery-generator.spec.ts）：
 *   toMatchFileSnapshot 对 docs/generated/personas-spec-gallery.html 做 byte 级快照——
 *   spec 改 → 快照 diff 显式浮现，审核流程看 diff 决定是补录快照还是回滚 spec。
 */

import type { MotifShape, MotifTemplate, PersonaSpec } from '../themes/_shared/spec'
import { shapeToSvg, renderMotifTemplate } from '../themes/_shared/spec'

// ============================================================
// Card fragment
// ============================================================

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function paletteVars(spec: PersonaSpec): string {
  const p = spec.palette
  return [
    `--p-bg:${p.bg}`,
    `--p-bg-soft:${p.bgSoft}`,
    `--p-bg-muted:${p.bgMuted}`,
    `--p-text:${p.text}`,
    `--p-text-muted:${p.textMuted}`,
    `--p-text-inverse:${p.textInverse}`,
    `--p-primary:${p.primary}`,
    `--p-secondary:${p.secondary}`,
    `--p-accent:${p.accent}`,
    `--p-border:${p.border}`,
    `--p-code:${p.code}`,
  ].join(';')
}

function swatch(label: string, hex: string): string {
  return `<div class="swatch"><div class="swatch-chip" style="background:${hex};border:1px solid rgba(0,0,0,.08)"></div><div class="swatch-meta"><b>${esc(label)}</b><span>${esc(hex)}</span></div></div>`
}

function renderPalette(spec: PersonaSpec): string {
  const p = spec.palette
  const swatches = [
    swatch('primary', p.primary),
    swatch('secondary', p.secondary),
    swatch('accent', p.accent),
    swatch('bg', p.bg),
    swatch('bgSoft', p.bgSoft),
    swatch('bgMuted', p.bgMuted),
    swatch('text', p.text),
    swatch('textMuted', p.textMuted),
    swatch('textInverse', p.textInverse),
    swatch('border', p.border),
    swatch('code', p.code),
  ].join('')
  return `<div class="section-label">Palette · 色板（11 键）</div><div class="swatch-grid">${swatches}</div>`
}

function renderStatus(spec: PersonaSpec): string {
  const keys: Array<keyof typeof spec.status> = ['tip', 'info', 'warning', 'danger']
  const cells = keys
    .map((k) => {
      const pair = spec.status[k]
      return `<div class="sem-pair"><div class="sem-side" style="background:${pair.accent};color:${spec.palette.textInverse}"><b>${k}</b><span>${esc(pair.accent)}</span></div><div class="sem-side" style="background:${pair.soft};color:${pair.accent}"><b>soft</b><span>${esc(pair.soft)}</span></div></div>`
    })
    .join('')
  return `<div class="section-label">Status · 语义四态</div><div class="sem-grid">${cells}</div>`
}

function renderTypography(spec: PersonaSpec): string {
  const t = spec.typography
  const p = spec.palette
  const primary = p.primary
  const items: Array<{ tag: string; size: number; weight: number; content: string; label: string }> = [
    { tag: 'h1', size: t.h1Size, weight: 700, content: '一份被认真排过的稿子', label: `h1 · ${t.h1Size} / 700 / ls-${t.letterSpacing}` },
    { tag: 'h2', size: t.h2Size, weight: 700, content: '章节标题示样', label: `h2 · ${t.h2Size} / 700` },
    { tag: 'h3', size: t.h3Size, weight: 700, content: '小节标题', label: `h3 · ${t.h3Size} / 700` },
    { tag: 'p', size: t.baseSize, weight: 400, content: `正文行高 ${t.lineHeight}，字距 ${t.letterSpacing}px。段间 ${spec.spacing.paragraph}px margin。这段文字的排版节奏来自 spec.typography + spec.spacing。`, label: `p · ${t.baseSize} / 400 / lh-${t.lineHeight}` },
  ]
  const rows = items
    .map((it) => {
      const style = `font-size:${it.size}px;font-weight:${it.weight};letter-spacing:${t.letterSpacing}px;line-height:${it.tag === 'p' ? t.lineHeight : 1.45};color:${p.text}`
      return `<div class="ts-row"><div class="ts-sample" style="${style}">${esc(it.content)}</div><div class="ts-meta mono">${esc(it.label)}</div></div>`
    })
    .join('')
  // Pull quote using spec.palette.primary for the left bar
  const pull = `<div class="ts-row"><div class="ts-sample" style="font-size:${t.baseSize + 2}px;font-weight:500;letter-spacing:${t.letterSpacing}px;line-height:1.7;color:${p.text};padding-left:14px;border-left:3px solid ${primary}">引用样式——从 spec.palette.primary 取左边色条。</div><div class="ts-meta mono">pull-quote · ${t.baseSize + 2} / 500</div></div>`
  return `<div class="section-label">Typography · 字体节奏</div><div class="type-stack">${rows}${pull}</div>`
}

function motifTile(key: string, svg: string): string {
  return `<div class="motif-tile"><div class="motif-svg-box">${svg}</div><div class="motif-label mono">${esc(key)}</div></div>`
}

function renderMotifs(spec: PersonaSpec): string {
  const shapeKeys: Array<keyof typeof spec.motifs> = [
    'h2Prefix', 'h3Prefix', 'dividerFlower', 'dividerWave', 'dividerDots',
    'quoteMark', 'listBullet', 'sectionCorner', 'tipIcon', 'warningIcon',
    'infoIcon', 'dangerIcon', 'noteIcon', 'copyIcon', 'externalLinkIcon',
    'terminalPrompt', 'sealMark',
  ]
  const tiles: string[] = []
  for (const k of shapeKeys) {
    const shape = spec.motifs[k] as MotifShape | undefined
    if (!shape) continue
    tiles.push(motifTile(k, shapeToSvg(shape)))
  }
  if (spec.motifs.stepBadge) {
    const tpl = spec.motifs.stepBadge as MotifTemplate
    tiles.push(motifTile('stepBadge(1)', renderMotifTemplate(tpl, { N: 1 })))
  }
  if (spec.motifs.issueStamp) {
    const tpl = spec.motifs.issueStamp as MotifTemplate
    tiles.push(motifTile('issueStamp', renderMotifTemplate(tpl, { issue: '47', date: '2026-04', kind: 'WEEKLY' })))
  }
  if (tiles.length === 0) {
    return `<div class="section-label">Motifs · 签名母题</div><div class="empty-note">该 spec 未声明任何 motif。</div>`
  }
  return `<div class="section-label">Motifs · 签名母题（${tiles.length} 件）</div><div class="motif-grid">${tiles.join('')}</div>`
}

function renderVariants(spec: PersonaSpec): string {
  const v = spec.variants
  const entries = Object.entries(v).map(([k, val]) => `<div class="var-row"><b>${esc(k)}</b><code>${esc(String(val))}</code></div>`).join('')
  const sig = (spec.signatureContainers ?? []).map((id) => `<code class="sig-chip">${esc(id)}</code>`).join('')
  const sigBlock = sig
    ? `<div class="section-sub">Signature Containers</div><div class="sig-row">${sig}</div>`
    : `<div class="section-sub">Signature Containers</div><div class="empty-note">（通用容器栈）</div>`
  return `<div class="section-label">Variants & Signature</div><div class="var-grid">${entries}</div>${sigBlock}`
}

function renderBehavior(spec: PersonaSpec): string {
  if (!spec.behavior || Object.keys(spec.behavior).length === 0) return ''
  const rows = Object.entries(spec.behavior)
    .map(([k, v]) => `<div class="var-row"><b>${esc(k)}</b><code>${esc(String(v))}</code></div>`)
    .join('')
  return `<div class="section-label">Behavior · 渲染器行为</div><div class="var-grid">${rows}</div>`
}

function renderOwnerNotes(spec: PersonaSpec): string {
  const notes = spec.meta.ownerNotes
  if (!notes) return ''
  return `<div class="section-label">Owner Notes</div><p class="owner-notes">${esc(notes)}</p>`
}

function renderCard(spec: PersonaSpec, idx: number, total: number): string {
  const vars = paletteVars(spec)
  const idxLabel = `${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
  return `<section class="persona-card" data-persona="${esc(spec.id)}" style="${vars}">
<div class="card-head">
  <div class="card-idx mono">${idxLabel}</div>
  <div class="card-title-row">
    <div class="card-zh">${esc(spec.name)}</div>
    <code class="card-slug">${esc(spec.id)}</code>
  </div>
  <p class="card-description">${esc(spec.description)}</p>
  <div class="card-audience"><span class="kicker">Audience</span>${esc(spec.audience)}</div>
</div>
${renderPalette(spec)}
${renderStatus(spec)}
${renderTypography(spec)}
${renderMotifs(spec)}
${renderVariants(spec)}
${renderBehavior(spec)}
${renderOwnerNotes(spec)}
</section>`
}

// ============================================================
// Page chrome
// ============================================================

const PAGE_STYLES = `
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #1c1f24;
  background: #f7f7f5;
  font-size: 14px;
  line-height: 1.5;
}
.mono { font-family: "SF Mono", Menlo, Consolas, "Liberation Mono", monospace; font-size: 12px; }
code { font-family: "SF Mono", Menlo, Consolas, monospace; font-size: 12px; padding: 1px 5px; border-radius: 3px; background: #eceae4; }
.page { max-width: 1080px; margin: 0 auto; padding: 32px 24px 80px; }
.masthead { padding: 12px 0 24px; border-bottom: 2px solid #1c1f24; margin-bottom: 32px; }
.masthead h1 { margin: 0 0 6px; font-size: 24px; font-weight: 700; letter-spacing: 0.3px; }
.masthead .sub { margin: 0; color: #636870; font-size: 13px; }
.persona-card {
  background: var(--p-bg);
  color: var(--p-text);
  border: 1px solid var(--p-border);
  border-radius: 8px;
  padding: 24px 24px 28px;
  margin-bottom: 28px;
}
.card-head { margin-bottom: 20px; border-bottom: 1px dashed var(--p-border); padding-bottom: 16px; }
.card-idx { color: var(--p-text-muted); font-size: 11px; letter-spacing: 1px; margin-bottom: 6px; }
.card-title-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 8px; flex-wrap: wrap; }
.card-zh { font-size: 20px; font-weight: 700; letter-spacing: 0.3px; }
.card-slug { font-size: 11px; background: var(--p-bg-muted); color: var(--p-text-muted); padding: 2px 6px; border-radius: 3px; }
.card-description { margin: 0 0 6px; font-size: 13px; color: var(--p-text); }
.card-audience { font-size: 12px; color: var(--p-text-muted); }
.card-audience .kicker { display: inline-block; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--p-text-muted); margin-right: 6px; }
.section-label {
  font-size: 10px;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: var(--p-text-muted);
  margin: 18px 0 10px;
  font-weight: 600;
}
.section-sub { font-size: 11px; color: var(--p-text-muted); margin: 12px 0 6px; font-weight: 600; }
.swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
.swatch { display: flex; align-items: center; gap: 8px; }
.swatch-chip { width: 28px; height: 28px; border-radius: 4px; flex-shrink: 0; }
.swatch-meta { display: flex; flex-direction: column; font-size: 11px; line-height: 1.35; }
.swatch-meta b { font-weight: 600; color: var(--p-text); }
.swatch-meta span { color: var(--p-text-muted); font-family: "SF Mono", Menlo, monospace; font-size: 10px; }
.sem-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
.sem-pair { display: flex; border-radius: 4px; overflow: hidden; font-size: 11px; }
.sem-side { flex: 1; padding: 8px 10px; display: flex; flex-direction: column; gap: 2px; }
.sem-side b { font-weight: 700; }
.sem-side span { font-family: "SF Mono", Menlo, monospace; font-size: 10px; opacity: 0.85; }
.type-stack { display: flex; flex-direction: column; gap: 14px; }
.ts-row { display: flex; flex-direction: column; gap: 4px; }
.ts-meta { color: var(--p-text-muted); }
.motif-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }
.motif-tile { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px; background: var(--p-bg-soft); border-radius: 4px; }
.motif-svg-box { width: 100%; display: flex; align-items: center; justify-content: center; min-height: 40px; }
.motif-label { color: var(--p-text-muted); text-align: center; }
.var-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 6px; }
.var-row { display: flex; justify-content: space-between; font-size: 12px; padding: 4px 8px; background: var(--p-bg-soft); border-radius: 3px; }
.var-row b { color: var(--p-text-muted); font-weight: 500; }
.sig-row { display: flex; flex-wrap: wrap; gap: 6px; }
.sig-chip { font-size: 11px; padding: 3px 8px; background: var(--p-bg-muted); color: var(--p-primary); border-radius: 3px; }
.owner-notes { margin: 6px 0 0; font-size: 12px; color: var(--p-text-muted); line-height: 1.6; }
.empty-note { font-size: 12px; color: var(--p-text-muted); font-style: italic; }
`.trim()

export function generateGallery(specs: readonly PersonaSpec[], meta: { generatedAt?: string } = {}): string {
  const cards = specs.map((s, i) => renderCard(s, i, specs.length)).join('\n\n')
  const ts = meta.generatedAt ?? ''
  const sub = ts ? `从 ${specs.length} 份 persona.spec.ts 派生 · ${esc(ts)}` : `从 ${specs.length} 份 persona.spec.ts 派生`
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Personas Spec Gallery · wechat-typeset</title>
<style>${PAGE_STYLES}</style>
</head>
<body>
<div class="page">
  <header class="masthead">
    <h1>Personas Spec Gallery</h1>
    <p class="sub">${sub}。改 spec → 跑 <code>pnpm gen:gallery</code> → commit。drift 由 tests/gallery-generator.spec.ts 把守。</p>
  </header>

${cards}

</div>
</body>
</html>
`
}
