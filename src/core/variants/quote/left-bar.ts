/**
 * quote · left-bar（左竖线简约引用）
 *
 * 视觉：左侧 4px text 色实线竖条 + 无底色 + 左对齐正文 + 中文双破折号 byline。
 * 与 column-rule 的差别：单边 vs 双边——left-bar 更克制,作"日常引用"使用;
 * column-rule 是"金句强调"对齐排印仪式感。
 *
 * 与 markdown `> blockquote` 的差别：>  无 byline 概念,字号一刀切;
 * 本 variant 通过 ctx.info 喂署名 + 走独立 byline 行,字字与正文区分。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent: _accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="16" width="3" height="38" fill="#1a1a1a"/>` +
      `<rect x="20" y="22" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="20" y="30" width="36" height="2" fill="#c0c6cf"/>` +
      `<rect x="20" y="38" width="42" height="2" fill="#c0c6cf"/>` +
      `<rect x="20" y="54" width="22" height="1.5" fill="#9aa0a6"/>`,
  )
}

const leftBar: VariantDef = {
  meta: {
    id: 'left-bar',
    kind: 'quote',
    name: '左竖线简约引用',
    description: '左 4px 主色竖线 + 左对齐 + 中文 byline',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'q-left-bar',
      name: '左竖线引用',
      description: '日常引用,克制的版面装饰',
      markdown:
        '::: quote-card 博尔赫斯 variant=left-bar\n凡我所是，皆因我读。\n:::\n',
    },
    {
      presetId: 'q-left-bar-no-byline',
      name: '左竖线无署名',
      description: '纯引文,无作者标注',
      markdown: '::: quote-card variant=left-bar\n此处填写引文正文\n:::\n',
    },
  ],
  render: (ctx) => {
    const accent = ctx.tokens.colors.text
    return {
      wrapperCSS:
        `padding:10px 0 10px 18px;` +
        `margin:20px 0;` +
        `border-left:4px solid ${accent}`,
      bodyCSS:
        `font-size:18px;line-height:1.7;` +
        `text-align:left;color:${ctx.tokens.colors.text}`,
      bylineCSS:
        `text-align:left;color:${ctx.tokens.colors.textMuted};` +
        `margin-top:8px;font-size:14px`,
      bylinePrefix: '—— ',
    }
  },
}

export default leftBar
