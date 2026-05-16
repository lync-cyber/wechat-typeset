/**
 * sectionTitle · ribbon-stamp
 *
 * 视觉：标题左侧 inline-block 实色印章（containing 1-2 个 CJK 字 or "§"）+ 标题文字。
 * 印章背景走 primary，文字走 textInverse；attrs.stamp 覆盖默认字符。
 * 与 cornered（svg corner）区别：印章是矩形戳记，更"刊物章"；cornered 是 L-bracket 装饰。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'
import { escText } from '../../pipeline/containers/_shared/escape'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="18" width="14" height="14" fill="${accent}"/>` +
      `<text x="17" y="29" text-anchor="middle" font-size="8" font-weight="700" fill="#fff">章</text>` +
      `<text x="30" y="30" font-size="14" font-weight="700" fill="${text}">缘起</text>` +
      `<rect x="10" y="50" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="58" width="42" height="2" fill="#c0c6cf"/>`,
  )
}

const ribbonStamp: VariantDef = {
  meta: {
    id: 'ribbon-stamp',
    kind: 'sectionTitle',
    name: '印章 + 标题',
    description: '左侧实色戳记 + 主标题',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'sec-ribbon-stamp',
      name: '印章 + 标题',
      description: 'CJK 实色戳记（章 / 节 / §）+ 主标题',
      markdown: '::: section-title 缘起 stamp=章 variant=ribbon-stamp\n:::\n',
    },
    {
      presetId: 'sec-ribbon-stamp-section',
      name: '印章 · 西文章节',
      description: '§ 戳记的西式章节',
      markdown: '::: section-title On Slow Reading stamp=§ variant=ribbon-stamp\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const stamp = ctx.attrs.stamp || '§'
    const slot =
      `<span style="display:inline-block;` +
      `min-width:20px;padding:1px 6px;margin-right:10px;` +
      `background:${c.primary};color:${c.textInverse};` +
      `font-weight:700;font-size:14px;text-align:center;` +
      `vertical-align:middle">${escText(stamp)}</span>`
    return {
      wrapperCSS: `margin:24px 0 12px;padding:0`,
      titleCSS:
        `font-weight:700;font-size:20px;color:${c.text};` +
        `vertical-align:middle;line-height:1.4`,
      svgSlot: slot,
    }
  },
}

export default ribbonStamp
