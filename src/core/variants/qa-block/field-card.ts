/**
 * qa-block · field-card（博物笔记 田野卡片）
 *
 * 设计稿 03·B：1px 实色外框 + 顶部 Q kicker + Card NN italic 编号 + dashed 行间分隔
 *   + A kicker 在 Q 段下方继续以 dashed 顶线接续。所有分隔线 dashed = 田野卡片孔位感。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="10" width="63" height="56" fill="none" stroke="${text}" stroke-width="1"/>` +
      `<text x="10" y="22" font-family="monospace" font-size="8" fill="${accent}" letter-spacing="1">Q</text>` +
      `<text x="56" y="22" font-family="serif" font-size="8" font-style="italic" fill="${text}" opacity="0.6">Card 09</text>` +
      `<line x1="10" y1="26" x2="64" y2="26" stroke="${text}" stroke-dasharray="2 2"/>` +
      `<rect x="10" y="30" width="50" height="2" fill="${text}"/>` +
      `<rect x="10" y="36" width="38" height="2" fill="${text}" opacity="0.7"/>` +
      `<line x1="10" y1="42" x2="64" y2="42" stroke="${text}" stroke-dasharray="2 2"/>` +
      `<text x="10" y="50" font-family="monospace" font-size="8" fill="${accent}" letter-spacing="1">A</text>` +
      `<rect x="10" y="54" width="46" height="2" fill="${text}"/>` +
      `<rect x="10" y="60" width="34" height="2" fill="${text}" opacity="0.7"/>`,
  )
}

const fieldCard: VariantDef = {
  meta: {
    id: 'field-card',
    kind: 'qaBlock',
    name: '田野卡片',
    description: '外框 + dashed 分隔 + Q/A kicker + Card 编号，田野采集卡',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qa-block-field-card',
      name: '问答 · 田野卡片',
      description: '边框包裹 + dashed 行分隔 + Card NN 编号',
      markdown:
        '::: qa-block 读者问答 variant=field-card q="为何记录树木胸径而不是树高？"\n' +
        '胸径稳定可测，树高常因树梢断折而失真。\n' +
        ':::\n',
    },
  ],
  render: () => ({
    wrapperCSS: 'margin:18px 0;padding:0;background-color:transparent',
  }),
}

export default fieldCard
