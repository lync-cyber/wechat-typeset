import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

const BODY3 =
  '### 0KM\n出发点描述\n\n### 30KM\n途经点描述\n\n### 72KM\n终点描述\n'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="18" width="59" height="1.5" fill="${text}"/>` +
      `<rect x="10" y="14" width="1.5" height="6" fill="${text}"/>` +
      `<rect x="30" y="14" width="1.5" height="6" fill="${text}"/>` +
      `<rect x="50" y="14" width="1.5" height="6" fill="${text}"/>` +
      `<text x="8" y="28" font-size="5" fill="${accent}">0KM</text>` +
      `<rect x="8" y="31" width="20" height="1.5" fill="#c0c6cf"/>` +
      `<text x="28" y="28" font-size="5" fill="${accent}">30KM</text>` +
      `<rect x="28" y="31" width="16" height="1.5" fill="#c0c6cf"/>` +
      `<text x="48" y="28" font-size="5" fill="${accent}">72KM</text>` +
      `<rect x="48" y="31" width="16" height="1.5" fill="#c0c6cf"/>`,
  )
}

const rulerRow: VariantDef = {
  meta: {
    id: 'ruler-row',
    kind: 'steps',
    name: '刻度尺步骤',
    description: '顶部一根实线作主轴，h3 充当刻度标签，博物笔记风格',
    experimental: true,
    experimentalSince: '2026-05-19',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'st-ruler-row',
      name: '刻度尺步骤',
      description: '顶部实线主轴 + h3 刻度标签，博物笔记感',
      markdown: '::: steps 旅程 variant=ruler-row\n' + BODY3 + ':::\n',
    },
    {
      presetId: 'st-ruler-row-time',
      name: '刻度尺 · 时间轴',
      description: '时间刻度标签版本',
      markdown:
        '::: steps 项目时间线 variant=ruler-row\n' +
        '### W1\n启动会，确认目标与分工。\n\n' +
        '### W4\n完成原型评审。\n\n' +
        '### W8\n灰度上线，开始数据收集。\n' +
        ':::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        'margin:24px 0',
        `border-top:1px solid ${c.text}`,
        'padding-top:18px',
      ].join(';'),
      titleCSS: [
        'font-weight:600',
        'font-size:11px',
        `color:${c.textMuted}`,
        'letter-spacing:0.2em',
        'text-transform:uppercase',
        'margin-bottom:14px',
      ].join(';'),
    }
  },
}

export default rulerRow
