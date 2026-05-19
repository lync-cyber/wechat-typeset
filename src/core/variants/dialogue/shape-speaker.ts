/**
 * dialogue · shape-speaker（圆方代号 包豪斯）
 *
 * 人格：几何包豪斯——22×22 徽章（circle 描边 / square 实心）紧贴正文 inline。
 * shape 显式指定 circle/square；缺省时按 idx 奇偶交替（0=circle, 1=square）。
 * 徽章字面取 name 首字母大写。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<circle cx="19" cy="19" r="7" fill="none" stroke="${text}" stroke-width="1.5"/>` +
      `<rect x="32" y="28" width="36" height="2" fill="${text}"/>` +
      `<rect x="32" y="34" width="28" height="2" fill="${text}"/>` +
      `<rect x="12" y="46" width="14" height="14" fill="${accent}"/>` +
      `<rect x="32" y="50" width="40" height="2" fill="${text}"/>` +
      `<rect x="32" y="56" width="32" height="2" fill="${text}"/>`,
  )
}

const shapeSpeaker: VariantDef = {
  meta: {
    id: 'shape-speaker',
    kind: 'dialogue',
    name: '圆方代号',
    description: '22×22 几何徽章（circle 描边 / square 实心）+ 正文 inline，包豪斯风',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dialogue-shape-speaker',
      name: '对谈 · 圆方代号',
      description: '几何徽章 + 首字母，circle/square 按奇偶自动交替，包豪斯风',
      markdown:
        ':::: dialogue 设计评审 variant=shape-speaker\n' +
        '::: dialogue-turn name="Ana" shape="circle"\n' +
        '这个方案的留白比例还需要调整。\n' +
        ':::\n' +
        '::: dialogue-turn name="Ben" shape="square"\n' +
        '我理解，但网格系统限制了可用区域。\n' +
        ':::\n' +
        '::: dialogue-turn name="Ana"\n' +
        '可以考虑突破网格做 bleed 排版。\n' +
        ':::\n' +
        '::: dialogue-turn name="Ben"\n' +
        '这需要和印厂确认出血线规格。\n' +
        ':::\n' +
        '::::\n',
    },
  ],
  render: () => ({
    wrapperCSS: 'margin:20px 0;padding:0',
  }),
}

export default shapeSpeaker
