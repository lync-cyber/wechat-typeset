/**
 * note · research-dense
 *
 * 视觉：bgSoft 底 + 10px textMuted 紧凑正文 + 顶部小字粗体 label。
 * 调研口径栏——比叙事性 minimal-callout 更紧、更小，适合附在数据可视化或
 * 调研图旁讲样本量 / 测量方法 / 加权策略。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="59" height="47" fill="${soft}"/>` +
      `<text x="14" y="24" font-size="6" font-weight="700" fill="${text}">方 法 论</text>` +
      `<rect x="14" y="32" width="48" height="1.5" fill="${text}" opacity="0.7"/>` +
      `<rect x="14" y="38" width="50" height="1.5" fill="#a0a8b3"/>` +
      `<rect x="14" y="44" width="46" height="1.5" fill="#a0a8b3"/>` +
      `<rect x="14" y="50" width="42" height="1.5" fill="#a0a8b3"/>` +
      `<rect x="14" y="56" width="38" height="1.5" fill="#a0a8b3"/>`,
  )
}

const researchDense: VariantDef = {
  meta: {
    id: 'research-dense',
    kind: 'note',
    name: '方法论小字',
    description: '紧凑 10px + 粗体 label + bgSoft',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-research-dense',
      name: '方法论 Note',
      description: '调研口径栏：浅底 + 10px 紧凑 + 粗体 label 顶头',
      markdown:
        '::: note variant=research-dense 方法论\n样本 n=1,024，覆盖 18–72 岁都市读者；置信区间 95%，整体误差 ±0.87pp。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        `background-color:${c.bgSoft}`,
        'padding:10px 12px',
        'margin:16px 0',
        'font-size:10px',
        'line-height:1.7',
        `color:${c.textMuted}`,
      ].join(';'),
      titleCSS: [
        `color:${c.text}`,
        'font-weight:700',
        'font-size:10px',
        'margin-bottom:4px',
      ].join(';'),
    }
  },
}

export default researchDense
