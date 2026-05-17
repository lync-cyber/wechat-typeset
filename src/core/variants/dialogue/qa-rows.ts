/**
 * dialogue · qa-rows（default · 访谈整理稿）
 *
 * 人格：访谈整理稿。Q 强 / A 弱纵向交替——左侧 24px 方块徽章 + 右侧 name kicker + 多段 body。
 * 视觉骨架：每轮 display:table 双栏（24px 徽章 + 自动正文）；Q=主色实心方块白字，
 *   A=textMuted 描边方块。轮间 18px 纵向间距。Q/A 视觉权重严格不对称。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="9" height="9" fill="${accent}"/>` +
      `<rect x="21" y="16" width="40" height="2" fill="${text}"/>` +
      `<rect x="21" y="20" width="30" height="2" fill="${text}"/>` +
      `<rect x="8" y="34" width="9" height="9" fill="none" stroke="${text}"/>` +
      `<rect x="21" y="36" width="44" height="2" fill="${text}"/>` +
      `<rect x="21" y="40" width="36" height="2" fill="${text}"/>` +
      `<rect x="8" y="54" width="9" height="9" fill="${accent}"/>` +
      `<rect x="21" y="56" width="38" height="2" fill="${text}"/>`,
  )
}

const qaRows: VariantDef = {
  meta: {
    id: 'qa-rows',
    kind: 'dialogue',
    name: 'Q/A 行',
    description: 'Q 方块强 / A 描边弱，访谈纵向交替堆叠',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dialogue-qa-rows',
      name: '对谈 · Q/A 行',
      description: 'Q 强 A 弱纵向交替访谈稿',
      markdown:
        ':::: dialogue 主编访谈 variant=qa-rows\n' +
        '::: dialogue-turn name="主持人" role="Q"\n你怎么看这次行业转向？\n:::\n' +
        '::: dialogue-turn name="张三" role="A"\n转向是必然的，但节奏会比想象慢。\n:::\n' +
        '::: dialogue-turn name="主持人" role="Q"\n"慢"是相对什么参照？\n:::\n' +
        '::: dialogue-turn name="张三" role="A"\n相对 2020 年的 AI hype。\n:::\n' +
        '::::\n',
    },
  ],
  render: () => ({
    wrapperCSS: 'margin:20px 0;padding:14px 16px;background-color:transparent',
  }),
}

export default qaRows
