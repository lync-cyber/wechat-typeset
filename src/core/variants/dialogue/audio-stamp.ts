/**
 * dialogue · audio-stamp（音频时间戳 博物笔记）
 *
 * 人格：田野录音 / 博物笔记——顶行 mono 时间码，次行 name + role italic 英文标签，正文段。
 * timestamp 缺省时跳过时间码行；role 缺省时降级为 'speaker'。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="10" width="24" height="2" fill="${accent}"/>` +
      `<rect x="8" y="18" width="18" height="2" fill="${text}"/>` +
      `<rect x="30" y="18" width="20" height="2" fill="${text}" opacity="0.4"/>` +
      `<rect x="8" y="26" width="52" height="2" fill="${text}"/>` +
      `<rect x="8" y="32" width="44" height="2" fill="${text}"/>` +
      `<rect x="8" y="50" width="20" height="2" fill="${accent}"/>` +
      `<rect x="8" y="58" width="16" height="2" fill="${text}"/>` +
      `<rect x="28" y="58" width="22" height="2" fill="${text}" opacity="0.4"/>` +
      `<rect x="8" y="66" width="48" height="2" fill="${text}"/>`,
  )
}

const audioStamp: VariantDef = {
  meta: {
    id: 'audio-stamp',
    kind: 'dialogue',
    name: '音频时间戳',
    description: '顶行 mono 时间码 + name/role 次行，博物笔记 / 田野录音风',
    experimental: true,
    experimentalSince: '2026-05-19',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dialogue-audio-stamp',
      name: '对谈 · 音频时间戳',
      description: '时间码顶行 + 说话人/角色 + 正文，田野访谈风',
      markdown:
        ':::: dialogue 田野访谈 variant=audio-stamp\n' +
        '::: dialogue-turn name="访员" role="interviewer" timestamp="00:04:21"\n' +
        '你能描述当时的场景吗？\n' +
        ':::\n' +
        '::: dialogue-turn name="老李" role="villager" timestamp="00:04:38"\n' +
        '那天清晨雾很大，能见度不到 10 米。\n' +
        ':::\n' +
        '::: dialogue-turn name="访员" role="interviewer" timestamp="00:05:02"\n' +
        '后来怎么确认方向的？\n' +
        ':::\n' +
        '::::\n',
    },
  ],
  render: () => ({
    wrapperCSS: 'margin:20px 0;padding:0',
  }),
}

export default audioStamp
