/**
 * 主题 Showcase 生成器：单主题"全组件陈列页"。
 *
 * 与 generate.ts（spec gallery）的边界：
 *   - gallery：spec 数据拼盘（palette / motifs / variants 表格），多卡片，
 *     用于主题间快速对比 ground truth
 *   - showcase：单主题完整页，spec 卡片 + 该主题"真实渲染产物"嵌入 +
 *     voice 覆盖报告。用于"主题作者验收 + LLM few-shot 资料"
 *
 * 依赖注入式设计：本模块**不**调 pipeline.render；调用方（scripts/gen-showcase.ts）
 * 负责把骨架 md 渲染成 HTML 后通过 fragments 传入。这保留了 domain 层"无渲染管线"
 * 的依赖纪律——showcase 也只是一种"卡片装饰器"，不是渲染入口。
 *
 * 公共脚手架（esc / paletteVars / renderPersonaCard / PAGE_STYLES）复用 generate.ts
 * 的 export，避免 chrome CSS 与 spec 卡片渲染逻辑重复。
 */

import type { PersonaSpec } from '../../core/themes/_shared/spec'
import type { ThemeVoiceResult } from '../../core/themes/_shared/spec'
import { esc, PAGE_STYLES, renderPersonaCard } from './generate'

/**
 * 已渲染好的主题产物片段（由调用方分别调 render({md, theme}) 产出）。
 *
 * 四段拆分对应骨架的四个语义层：
 *   - elementCatalog        BASE_ELEMENT_FIXTURE_MD（元素 + inline 基线）
 *   - baseContainers        BASE_CONTAINER_FIXTURE_MD（base 容器全集）
 *   - signatureContainers   buildSignatureFixtureMd(spec).md（扩展签名容器）
 *   - decorationsPreview    DECORATIONS_PREVIEW_MD（装饰契约验证段，主题未声明
 *                           decorations 时传空串）
 *
 * 为什么不传 markdown 让 showcase 自己渲染：避免本模块持有 pipeline 依赖；
 * 同时也让"渲染失败"的责任完全归调用方，与 verify-sample-full.ts 的模式一致。
 */
export interface ShowcaseFragments {
  elementCatalog: string
  baseContainers: string
  /** 主题无扩展签名时传空串。 */
  signatureContainers: string
  /**
   * 装饰预览片段。主题未声明 `spec.decorations` 时传空串——
   * showcase 会渲染 empty-note 提示"本主题未声明任何 decorations 装饰"。
   */
  decorationsPreview: string
}

export interface GenerateShowcaseInput {
  spec: PersonaSpec
  fragments: ShowcaseFragments
  /** 可选嵌入 voice 报告（来自 analyzeThemeVoice）。 */
  voice?: ThemeVoiceResult
  /** ISO 时间戳，副标题用。省略则副标题不显示生成时间。 */
  generatedAt?: string
}

// ============================================================
// Voice 报告区
// ============================================================

function renderVoiceReport(voice: ThemeVoiceResult): string {
  const cov = voice.coverage
  const rate = (cov.rate * 100).toFixed(0)
  const meta = `<div class="voice-meta mono">覆盖率 ${rate}% · 容器 ${cov.coveredContainers}/${cov.expectedContainers} · 元素 ${cov.coveredElements}/${cov.expectedElements}</div>`

  const groups: Array<{ label: string; cls: string; items: typeof voice.issues }> = [
    { label: 'ERROR', cls: 'voice-error', items: voice.errors },
    { label: 'WARNING', cls: 'voice-warning', items: voice.warnings },
    { label: 'INFO', cls: 'voice-info', items: voice.infos },
  ]
  const lists = groups
    .filter((g) => g.items.length > 0)
    .map(
      (g) =>
        `<div class="voice-group ${g.cls}"><b>${g.label} (${g.items.length})</b><ul>` +
        g.items.map((i) => `<li><code>${esc(i.path)}</code> ${esc(i.message)}</li>`).join('') +
        `</ul></div>`,
    )
    .join('')

  return `<div class="section-label">Voice · 覆盖度报告</div>${meta}${lists || '<div class="empty-note">无任何 issue（覆盖率达标且无扩展容器使用）</div>'}`
}

// ============================================================
// 渲染产物区
// ============================================================

function renderFragments(fragments: ShowcaseFragments): string {
  const blocks: string[] = []
  blocks.push(
    `<div class="section-label">Rendered · 元素 + Inline 基线</div>` +
      `<div class="rendered-wrap">${fragments.elementCatalog}</div>`,
  )
  blocks.push(
    `<div class="section-label">Rendered · Base 容器陈列</div>` +
      `<div class="rendered-wrap">${fragments.baseContainers}</div>`,
  )
  if (fragments.signatureContainers && fragments.signatureContainers.trim().length > 0) {
    blocks.push(
      `<div class="section-label">Rendered · 扩展签名容器</div>` +
        `<div class="rendered-wrap">${fragments.signatureContainers}</div>`,
    )
  } else {
    blocks.push(
      `<div class="section-label">Rendered · 扩展签名容器</div>` +
        `<div class="empty-note">本主题未声明任何 pack:* / theme:* 扩展签名容器</div>`,
    )
  }
  if (fragments.decorationsPreview && fragments.decorationsPreview.trim().length > 0) {
    blocks.push(
      `<div class="section-label">Rendered · Decorations 装饰预览</div>` +
        `<div class="rendered-wrap">${fragments.decorationsPreview}</div>`,
    )
  } else {
    blocks.push(
      `<div class="section-label">Rendered · Decorations 装饰预览</div>` +
        `<div class="empty-note">本主题未声明任何 decorations（headingPrefix / introDropcap）装饰</div>`,
    )
  }
  return blocks.join('\n')
}

// ============================================================
// Page chrome 增量（仅 showcase 专属新样式）
// ============================================================

const SHOWCASE_STYLES = `
.rendered-wrap {
  background: var(--p-bg);
  border: 1px solid var(--p-border);
  border-radius: 6px;
  padding: 16px 18px;
  margin-bottom: 12px;
  overflow: hidden;
}
.rendered-wrap > section[class*="markdown-body"] {
  /* 主题渲染产物自身已有 padding/bg；这里只清掉外层 padding，避免双重缩进 */
  padding: 0 !important;
  background: transparent !important;
}
.voice-meta { color: var(--p-text-muted); font-size: 11px; margin-bottom: 8px; }
.voice-group { margin: 8px 0; padding: 8px 12px; border-radius: 4px; font-size: 12px; }
.voice-group b { display: block; font-size: 10px; letter-spacing: 1px; margin-bottom: 4px; }
.voice-group ul { margin: 0; padding-left: 18px; }
.voice-group li { line-height: 1.5; margin-bottom: 2px; }
.voice-group code { font-size: 11px; }
.voice-error   { background: #fbecea; color: #b42318; }
.voice-warning { background: #f7f0df; color: #9a6b1a; }
.voice-info    { background: #eef2f9; color: #2558b0; }
`.trim()

// ============================================================
// 入口
// ============================================================

export function generateShowcase(input: GenerateShowcaseInput): string {
  const { spec, fragments, voice, generatedAt } = input
  const subParts = [
    '改 spec / 改主题 voice → 跑 <code>pnpm gen:showcase</code> → commit',
    'drift 由 tests/unit/showcase-generator.spec.ts 把守',
  ]
  if (generatedAt) subParts.unshift(esc(generatedAt))
  const sub = subParts.join(' · ')

  const card = renderPersonaCard(spec)
  const renderedSection = renderFragments(fragments)
  const voiceSection = voice ? renderVoiceReport(voice) : ''

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(spec.name)} · Showcase · wechat-typeset</title>
<style>${PAGE_STYLES}
${SHOWCASE_STYLES}</style>
</head>
<body>
<div class="page">
  <header class="masthead">
    <h1>${esc(spec.name)} · <span style="opacity:.7">Showcase</span></h1>
    <p class="sub">${sub}</p>
  </header>

${card}

<section class="persona-card" data-section="rendered" style="${esc(`--p-bg:${spec.palette.bg};--p-bg-soft:${spec.palette.bgSoft};--p-bg-muted:${spec.palette.bgMuted};--p-text:${spec.palette.text};--p-text-muted:${spec.palette.textMuted};--p-text-inverse:${spec.palette.textInverse};--p-primary:${spec.palette.primary};--p-secondary:${spec.palette.secondary};--p-accent:${spec.palette.accent};--p-border:${spec.palette.border};--p-code:${spec.palette.code}`)}">
${renderedSection}
${voiceSection}
</section>

</div>
</body>
</html>
`
}
