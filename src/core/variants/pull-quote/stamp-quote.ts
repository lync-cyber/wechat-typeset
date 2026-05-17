/**
 * pull-quote · stamp-quote（印章压字）
 *
 * 人格：粗野 brutalist · 印章压字。装饰由右侧 SVG 印章承担，整体感强。
 * 视觉骨架：display:table 双栏置于 svgSlot 内——左 cell 大字粗体引文（≈85% 宽），
 *   右 cell 一枚 ≈52×52 inline SVG 印章（accent 描线 + 旋转方框）。
 *   旋转走 inline SVG `<g transform="rotate(...)">`，CSS transform 在公众号会被剥。
 *   titleCSS='' 让 renderer 跳过默认标题行（引文已在 svgSlot 自渲染）。
 * 与 giant-mark 的差异：装饰在右且更"重"，引文整体粗壮，印章 rather than 装饰引号。
 */

import type { VariantDef } from '../_core'
import { escText } from '../../pipeline/containers/_shared/escape'
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
    description: '左粗体大字 + 右 SVG 旋转印章（brutalist）',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-stamp-quote',
      name: '拉引 · 印章压字',
      description: '左粗体大字 + 右旋转印章',
      markdown:
        '::: pull-quote variant=stamp-quote\n承诺是免费的，兑现才有价钱。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const quote = ctx.info.trim() || '——'
    const stampInner =
      `<svg width="52" height="52" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" ` +
      `fill="none" stroke="${c.accent}" stroke-width="2" stroke-linejoin="round">` +
      `<g transform="rotate(-9 26 26)">` +
      `<rect x="4" y="4" width="44" height="44"/>` +
      `<rect x="9" y="9" width="34" height="34" stroke-width="1"/>` +
      `<text x="26" y="31" font-size="11" font-weight="700" text-anchor="middle" ` +
      `fill="${c.accent}" stroke="none" font-family="monospace">QUOTE</text>` +
      `</g></svg>`
    const tableHtml =
      `<section style="display:table;width:100%">` +
      `<section style="display:table-cell;vertical-align:middle;color:${c.text};` +
      `font-size:19px;line-height:1.5;font-weight:700;letter-spacing:0.2px;text-align:left">` +
      escText(quote) + `</section>` +
      `<section style="display:table-cell;vertical-align:middle;width:64px;text-align:right;line-height:0">` +
      stampInner + `</section>` +
      `</section>`
    return {
      wrapperCSS: [
        'margin:28px 0',
        `border-top:2px solid ${c.text}`,
        `border-bottom:2px solid ${c.text}`,
        'padding:18px 4px',
        'background-color:transparent',
      ].join(';'),
      titleCSS: '',
      bodyCSS: [
        `color:${c.textMuted}`,
        'font-size:13px',
        'line-height:1.6',
        'margin-top:10px',
        'font-weight:500',
        'text-align:left',
      ].join(';'),
      svgSlot: tableHtml,
    }
  },
}

export default stampQuote
