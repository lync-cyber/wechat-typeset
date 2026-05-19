/**
 * qa-block · circle-square（包豪斯 圆 vs 方）
 *
 * 设计稿 04·A：24×24 圆环徽章承载 Q（border 2px + border-radius:50%，文字色）+
 * 24×24 实心方块徽章承载 A（accent 底 textInverse 字）。圆描问、方答 = 包豪斯几何对照。
 * 与 compare.paired-shape 同形不同 kind：compare 是两栏内容比对，qa-block 是单 Q 单 A。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<circle cx="16" cy="22" r="10" fill="none" stroke="${text}" stroke-width="2"/>` +
      `<text x="16" y="26" font-family="monospace" font-size="9" font-weight="600" fill="${text}" text-anchor="middle">Q</text>` +
      `<rect x="30" y="14" width="40" height="2" fill="${text}"/>` +
      `<rect x="30" y="20" width="34" height="2" fill="${text}" opacity="0.7"/>` +
      `<rect x="30" y="26" width="36" height="2" fill="${text}" opacity="0.7"/>` +
      `<rect x="6" y="46" width="20" height="20" fill="${accent}"/>` +
      `<text x="16" y="60" font-family="monospace" font-size="9" font-weight="600" fill="#fff" text-anchor="middle">A</text>` +
      `<rect x="30" y="48" width="42" height="2" fill="${text}"/>` +
      `<rect x="30" y="54" width="36" height="2" fill="${text}" opacity="0.7"/>` +
      `<rect x="30" y="60" width="32" height="2" fill="${text}" opacity="0.7"/>`,
  )
}

const circleSquare: VariantDef = {
  meta: {
    id: 'circle-square',
    kind: 'qaBlock',
    name: '圆方代号',
    description: '圆环 Q + 实心方 A 几何徽章，包豪斯对照',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qa-block-circle-square',
      name: '问答 · 圆方代号',
      description: '24×24 圆环描问 + 实心方块答，几何对照',
      markdown:
        '::: qa-block 读者问答 variant=circle-square q="设计师该不该有自己的\\"风格\\"？"\n' +
        '风格是结果，不是目标。刻意打造的风格，往往变成局限。\n' +
        ':::\n',
    },
  ],
  render: () => ({
    wrapperCSS: 'margin:18px 0;padding:6px 0;background-color:transparent',
  }),
}

export default circleSquare
