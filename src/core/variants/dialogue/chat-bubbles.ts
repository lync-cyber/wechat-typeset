/**
 * dialogue · chat-bubbles（聊天 app 气泡）
 *
 * 人格：IM 聊天界面——左右交替气泡 + 头像圆 + 内联 SVG 三角尾巴。
 * 视觉骨架：display:table 三栏（32px 头像槽 + 自动气泡 + 32px 头像槽，按 side 占其一）。
 *   气泡：bgSoft / primarySoft 底 + 圆角 12px + padding 10px 14px。尾巴用 inline SVG path 画三角，
 *   禁用 ::before/::after（公众号后台会剥）。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<circle cx="12" cy="22" r="6" fill="${text}"/>` +
      `<rect x="22" y="16" width="40" height="13" rx="4" fill="${soft}"/>` +
      `<path d="M22,22 L18,25 L22,28 Z" fill="${soft}"/>` +
      `<rect x="14" y="42" width="40" height="13" rx="4" fill="${accent}"/>` +
      `<path d="M54,48 L58,51 L54,54 Z" fill="${accent}"/>` +
      `<circle cx="64" cy="48" r="6" fill="${accent}"/>`,
  )
}

const chatBubbles: VariantDef = {
  meta: {
    id: 'chat-bubbles',
    kind: 'dialogue',
    name: '聊天气泡',
    description: '左右交替气泡 + 头像，IM 风',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dialogue-chat-bubbles',
      name: '对谈 · 聊天气泡',
      description: '左右交替气泡 + 头像圆，IM 体',
      markdown:
        ':::: dialogue 群聊讨论 variant=chat-bubbles\n' +
        '::: dialogue-turn name="主持人" side="left"\n你怎么看这次行业转向？\n:::\n' +
        '::: dialogue-turn name="张三" side="right"\n转向是必然的，但节奏会比想象慢。\n:::\n' +
        '::: dialogue-turn name="主持人" side="left"\n"慢"是相对什么参照？\n:::\n' +
        '::: dialogue-turn name="张三" side="right"\n相对 2020 年的 AI hype。\n:::\n' +
        '::::\n',
    },
  ],
  render: () => ({
    wrapperCSS: 'margin:20px 0;padding:14px 16px;background-color:transparent',
  }),
}

export default chatBubbles
