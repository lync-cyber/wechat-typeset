/**
 * dialogue · screenplay（剧本式顶行小标签）
 *
 * 人格：编辑部剧本排版——name 独占顶行 mono 小字 + letter-spacing + textMuted，
 *   下方多段正文段落。与 name-prefix 的区别：name-prefix 是 inline 同行加粗；
 *   screenplay 是 name 单独占行，作为角色标签引导多段发言。
 * 视觉骨架：每轮 display:block section；顶行 span mono 小字；正文 span block。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="12" width="22" height="2" fill="${accent}"/>` +
      `<rect x="8" y="20" width="56" height="2" fill="${text}"/>` +
      `<rect x="8" y="26" width="50" height="2" fill="${text}"/>` +
      `<rect x="8" y="32" width="44" height="2" fill="${text}"/>` +
      `<rect x="8" y="44" width="18" height="2" fill="${accent}"/>` +
      `<rect x="8" y="52" width="52" height="2" fill="${text}"/>` +
      `<rect x="8" y="58" width="42" height="2" fill="${text}"/>`,
  )
}

const screenplay: VariantDef = {
  meta: {
    id: 'screenplay',
    kind: 'dialogue',
    name: '剧本顶行',
    description: '角色名独占顶行 mono 小字，下方多段正文',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dialogue-screenplay',
      name: '对谈 · 剧本顶行',
      description: '角色名顶行标签 + 多段正文，剧本体',
      markdown:
        ':::: dialogue 剧本 variant=screenplay\n' +
        '::: dialogue-turn name="主持人"\n你怎么看这次行业转向？\n:::\n' +
        '::: dialogue-turn name="张三"\n转向是必然的，但节奏会比想象慢。\n\n底层逻辑是算力供给端在 2026 年才真正进入工程化阶段。\n:::\n' +
        '::: dialogue-turn name="主持人"\n"慢"是相对什么参照？\n:::\n' +
        '::: dialogue-turn name="张三"\n相对 2020 年的 AI hype。\n:::\n' +
        '::::\n',
    },
  ],
  render: () => ({
    wrapperCSS: 'margin:18px 0;padding:0;background-color:transparent',
  }),
}

export default screenplay
