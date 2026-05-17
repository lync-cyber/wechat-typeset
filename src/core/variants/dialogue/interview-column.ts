/**
 * dialogue · interview-column（New Yorker 长访谈杂志栏）
 *
 * 人格：New Yorker / Harper's 长访谈——左列固定姓名 + 右列长答 + hairline 沟槽。
 * 视觉骨架：每轮 display:table 双栏（90px 姓名 / 自动正文）。
 *   左：全大写 + letter-spacing 0.15em + textMuted + 顶/右对齐。
 *   右：17px + line-height 1.8 + 左 1px 沟槽 + padding-left 16px。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="14" height="2" fill="${accent}"/>` +
      `<line x1="28" y1="12" x2="28" y2="62" stroke="${text}"/>` +
      `<rect x="32" y="14" width="34" height="2" fill="${text}"/>` +
      `<rect x="32" y="20" width="30" height="2" fill="${text}"/>` +
      `<rect x="32" y="26" width="26" height="2" fill="${text}"/>` +
      `<rect x="8" y="38" width="14" height="2" fill="${accent}"/>` +
      `<rect x="32" y="38" width="32" height="2" fill="${text}"/>` +
      `<rect x="32" y="44" width="34" height="2" fill="${text}"/>` +
      `<rect x="32" y="50" width="22" height="2" fill="${text}"/>`,
  )
}

const interviewColumn: VariantDef = {
  meta: {
    id: 'interview-column',
    kind: 'dialogue',
    name: '杂志访谈栏',
    description: '左列大写姓名 + 右列长答 + hairline 沟槽',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dialogue-interview-column',
      name: '对谈 · 杂志栏',
      description: 'New Yorker 长访谈双栏',
      markdown:
        ':::: dialogue 长访谈 variant=interview-column\n' +
        '::: dialogue-turn name="王某" role="主持人"\n你怎么看这次行业转向？这次转向是真正的产业重构，还是只是一次资本叙事的更替？\n:::\n' +
        '::: dialogue-turn name="张三" role="嘉宾"\n转向是必然的，但节奏会比想象慢得多。底层逻辑是算力供给端在 2026 年才真正进入工程化阶段。\n:::\n' +
        '::: dialogue-turn name="王某" role="主持人"\n那"慢"是相对什么参照？\n:::\n' +
        '::: dialogue-turn name="张三" role="嘉宾"\n相对 2020 年的 AI hype。那时大家把推理成本算错了一个数量级。\n:::\n' +
        '::::\n',
    },
  ],
  render: () => ({
    wrapperCSS: 'margin:24px 0;padding:0;background-color:transparent',
  }),
}

export default interviewColumn
