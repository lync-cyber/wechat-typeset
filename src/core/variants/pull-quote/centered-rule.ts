/**
 * pull-quote · centered-rule（居中夹线）
 *
 * 人格：杂志正文中段"金句框" / 美术馆铭牌 / gallery placard。
 * 视觉骨架：wrapper 仅上下 1px primary 实线（无左右），引文居中 + uppercase
 *   小字 kicker（HTML span，不是 SVG），克制对称、内边距宽。
 * 与 giant-mark 的差异：无大型 SVG、居中对称、靠留白与夹线承担分量。
 */

import type { VariantDef } from '../_core'
import { escText } from '../../pipeline/containers/_shared/escape'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="18" width="59" height="1.5" fill="${accent}"/>` +
      `<rect x="8" y="58" width="59" height="1.5" fill="${accent}"/>` +
      `<rect x="26" y="28" width="22" height="2" fill="${accent}"/>` +
      `<rect x="14" y="38" width="47" height="2.5" fill="#c0c6cf"/>` +
      `<rect x="18" y="46" width="39" height="2.5" fill="#c0c6cf"/>`,
  )
}

const KICKER_LABEL = 'QUOTE · 引言'

const centeredRule: VariantDef = {
  meta: {
    id: 'centered-rule',
    kind: 'pullQuote',
    name: '居中夹线',
    description: '上下细线 + 居中 kicker，gallery placard 体',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-centered-rule',
      name: '拉引 · 居中夹线',
      description: '上下 1px 线居中夹 + 引言 kicker',
      markdown:
        '::: pull-quote variant=centered-rule\n真正改变一个人的，往往是最简单的一句话。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const kickerHtml =
      `<section style="text-align:center;margin-bottom:10px">` +
      `<span style="display:inline-block;color:${c.textMuted};font-size:11px;` +
      `font-weight:700;letter-spacing:0.35em;text-transform:uppercase;line-height:1.4">` +
      escText(KICKER_LABEL) +
      `</span></section>`
    return {
      wrapperCSS: [
        'margin:28px 0',
        `border-top:1px solid ${c.primary}`,
        `border-bottom:1px solid ${c.primary}`,
        'padding:24px 12px',
        'text-align:center',
        'border-radius:0',
        'background-color:transparent',
      ].join(';'),
      titleCSS: [
        `color:${c.text}`,
        'font-size:17px',
        'line-height:1.7',
        'font-style:italic',
        'letter-spacing:0.5px',
        'text-align:center',
        'font-weight:500',
      ].join(';'),
      bodyCSS: [
        `color:${c.textMuted}`,
        'font-size:12px',
        'line-height:1.6',
        'margin-top:8px',
        'text-align:center',
        'letter-spacing:0.3px',
      ].join(';'),
      svgSlot: kickerHtml,
    }
  },
}

export default centeredRule
