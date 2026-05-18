/**
 * pull-quote · stamp-quote（印章压字）
 *
 * 人格：粗野 brutalist · 印章压字。装饰由 SVG 印章承担，正文粗壮。
 * 视觉骨架：印章 ≈52×52 inline SVG（accent 描线 + 旋转方框），右对齐挂在引文上方；
 *   下方 body 段（markdown-it 渲染为 `<p>`，pull-quote 容器通过 quoteCSS 把 p 字号
 *   提到 19px / 700 weight）。wrapper 上下 2px text 色实线收紧整体重量。
 *   印章旋转走 inline SVG `<g transform="rotate(...)">`，CSS transform 在公众号会被剥。
 * 与 giant-mark 的差异：装饰更"重"（旋转印章 rather than 装饰引号），引文整体粗壮。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="22" width="38" height="2.5" fill="#c0c6cf"/>` +
      `<rect x="8" y="30" width="42" height="2.5" fill="#c0c6cf"/>` +
      `<rect x="8" y="38" width="32" height="2.5" fill="#c0c6cf"/>` +
      `<g transform="rotate(-10 56 50)">` +
      `<rect x="46" y="40" width="20" height="20" fill="none" stroke="${accent}" stroke-width="2"/>` +
      `<text x="56" y="54" font-size="9" font-weight="700" text-anchor="middle" fill="${accent}">QT</text>` +
      `</g>`,
  )
}

const stampQuote: VariantDef = {
  meta: {
    id: 'stamp-quote',
    kind: 'pullQuote',
    name: '印章压字',
    description: '右上旋转印章 + 大字粗体（brutalist）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-stamp-quote',
      name: '拉引 · 印章压字',
      description: '右上旋转印章 + 粗体大字',
      markdown:
        '::: pull-quote variant=stamp-quote\n承诺是免费的，兑现才有价钱。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const stamp =
      `<section style="text-align:right;line-height:0;margin-bottom:6px">` +
      `<svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" ` +
      `fill="none" stroke="${c.accent}" stroke-width="2" stroke-linejoin="round" ` +
      `style="display:inline-block;vertical-align:top">` +
      `<g transform="rotate(-9 26 26)">` +
      `<rect x="4" y="4" width="44" height="44"/>` +
      `<rect x="9" y="9" width="34" height="34" stroke-width="1"/>` +
      `<text x="26" y="31" font-size="11" font-weight="700" text-anchor="middle" ` +
      `fill="${c.accent}" stroke="none" font-family="monospace">QUOTE</text>` +
      `</g></svg>` +
      `</section>`
    return {
      wrapperCSS: [
        'margin:28px 0',
        `border-top:2px solid ${c.text}`,
        `border-bottom:2px solid ${c.text}`,
        'padding:14px 4px 18px',
        'background-color:transparent',
      ].join(';'),
      bodyCSS: 'text-align:left',
      quoteCSS: [
        `color:${c.text}`,
        'font-size:19px',
        'line-height:1.5',
        'font-weight:700',
        'letter-spacing:0.2px',
        'text-align:left',
        'margin-top:0',
        'margin-bottom:0',
      ].join(';'),
      bylineCSS: [
        `color:${c.textMuted}`,
        'font-size:13px',
        'line-height:1.6',
        'margin-top:10px',
        'font-weight:500',
        'text-align:left',
      ].join(';'),
      svgSlot: stamp,
    }
  },
}

export default stampQuote
