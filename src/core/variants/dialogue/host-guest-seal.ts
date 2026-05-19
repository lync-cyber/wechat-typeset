/**
 * dialogue · host-guest-seal（主客名签 朱印徽章）
 *
 * 人格：宋本批注风——中文徽章 22×22 inline-block 紧贴正文左侧。
 *   主持人 = 实心 primary 底 + textInverse 字；嘉宾 = 透明底 + primary 描边 + primary 字。
 * 角色判定：role 含"主/主持/Host/host/Q/q" → 主；其它 → 客。
 * 中文 name 取首字作徽章字面；英文 name 降级为首字母大写。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="13" height="13" fill="${accent}"/>` +
      `<rect x="25" y="16" width="40" height="2" fill="${text}"/>` +
      `<rect x="25" y="21" width="34" height="2" fill="${text}"/>` +
      `<rect x="8" y="38" width="13" height="13" fill="none" stroke="${accent}"/>` +
      `<rect x="25" y="40" width="44" height="2" fill="${text}"/>` +
      `<rect x="25" y="45" width="30" height="2" fill="${text}"/>` +
      `<rect x="8" y="62" width="13" height="13" fill="${accent}"/>` +
      `<rect x="25" y="64" width="36" height="2" fill="${text}"/>`,
  )
}

const hostGuestSeal: VariantDef = {
  meta: {
    id: 'host-guest-seal',
    kind: 'dialogue',
    name: '主客名签',
    description: '朱印徽章：主持人实心 / 嘉宾描边，宋本批注风',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'dialogue-host-guest-seal',
      name: '对谈 · 主客名签',
      description: '主持人实心徽章 + 嘉宾描边徽章，朱印风',
      markdown:
        ':::: dialogue 对谈录 variant=host-guest-seal\n' +
        '::: dialogue-turn name="王敏" role="主持人"\n你怎么看这次行业转向？\n:::\n' +
        '::: dialogue-turn name="张三" role="嘉宾"\n转向是必然的，但节奏会比想象慢。\n:::\n' +
        '::: dialogue-turn name="王敏" role="主持人"\n"慢"是相对什么参照？\n:::\n' +
        '::: dialogue-turn name="张三" role="嘉宾"\n相对 2020 年的 AI hype。\n:::\n' +
        '::::\n',
    },
  ],
  render: () => ({
    wrapperCSS: 'margin:18px 0;padding:14px 16px;background-color:transparent',
  }),
}

export default hostGuestSeal
