/**
 * dialogue · name-prefix（剧本 / inline 对谈）
 *
 * 人格：剧本 / 谈话录排版——"**名字**：内容..." 一段 inline 流式。
 * 视觉骨架：每轮一段 p；name 加粗 accent 色 + monospace + "：" + 紧接 body 文字。
 *   无方框、无头像、无装饰 SVG——dense 信息密度最高的对话形态。
 *
 * 多主题软推荐（designedFor）：dense inline 排版与"文字密度优先"的主题最适配——
 * tech-explainer / academic-frontier / literary-humanism 三家具有"长篇深度对谈"
 * 出场需求；其它主题作者也能用 attrs.variant=name-prefix 显式切换。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="16" width="14" height="3" fill="${accent}"/>` +
      `<rect x="24" y="16" width="42" height="3" fill="${text}"/>` +
      `<rect x="8" y="24" width="50" height="3" fill="${text}"/>` +
      `<rect x="8" y="38" width="12" height="3" fill="${accent}"/>` +
      `<rect x="22" y="38" width="44" height="3" fill="${text}"/>` +
      `<rect x="8" y="46" width="40" height="3" fill="${text}"/>` +
      `<rect x="8" y="58" width="14" height="3" fill="${accent}"/>` +
      `<rect x="24" y="58" width="38" height="3" fill="${text}"/>`,
  )
}

const namePrefix: VariantDef = {
  meta: {
    id: 'name-prefix',
    kind: 'dialogue',
    name: '名字前缀',
    description: '"**名字**：内容" 行内排版，剧本 / 对谈最 dense',
    designedFor: ['tech-explainer', 'academic-frontier', 'literary-humanism'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dialogue-name-prefix',
      name: '对谈 · 名字前缀',
      description: '剧本式 inline 排版，无装饰',
      markdown:
        ':::: dialogue 创作谈 variant=name-prefix\n' +
        '::: dialogue-turn name="主持人"\n你怎么看这次行业转向？\n:::\n' +
        '::: dialogue-turn name="张三"\n转向是必然的，但节奏会比想象慢。\n:::\n' +
        '::: dialogue-turn name="主持人"\n"慢"是相对什么参照？\n:::\n' +
        '::: dialogue-turn name="张三"\n相对 2020 年的 AI hype。\n:::\n' +
        '::::\n',
    },
  ],
  render: () => ({
    wrapperCSS: 'margin:20px 0;background-color:transparent',
  }),
}

export default namePrefix
