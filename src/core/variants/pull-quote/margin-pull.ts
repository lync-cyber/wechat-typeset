/**
 * pull-quote · margin-pull（悬挂拉引）
 *
 * 人格：NYT Sunday / Texas Monthly 报刊体悬挂 pull-quote。
 * 视觉骨架：display:table 双栏置于 svgSlot 内——左 cell 56px 宽，含一枚
 *   24×72 inline SVG 竖向 monospace kicker（`<text transform="rotate(-90)">QUOTE</text>`）；
 *   右 cell 引文本体，weight 600 size 17 line-height 1.7 左对齐。
 *   旋转走 SVG `<text transform>`，CSS transform 在公众号被剥。
 *   titleCSS='' 让 renderer 跳过默认标题行（引文已在 svgSlot 自渲染）。
 * 与 stamp-quote 的差异：装饰在左不在右，竖向 kicker rather than 印章。
 */

import type { VariantDef } from '../_core'
import { escText } from '../../pipeline/containers/_shared/escape'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<text x="14" y="56" font-size="9" font-weight="700" fill="${accent}" ` +
      `transform="rotate(-90 14 56)" font-family="monospace" letter-spacing="2">QUOTE</text>` +
      `<rect x="24" y="20" width="42" height="2.5" fill="#c0c6cf"/>` +
      `<rect x="24" y="28" width="44" height="2.5" fill="#c0c6cf"/>` +
      `<rect x="24" y="36" width="38" height="2.5" fill="#c0c6cf"/>` +
      `<rect x="24" y="44" width="32" height="2.5" fill="#c0c6cf"/>`,
  )
}

const KICKER_TEXT = 'QUOTE'

const marginPull: VariantDef = {
  meta: {
    id: 'margin-pull',
    kind: 'pullQuote',
    name: '悬挂拉引',
    description: '左侧竖向 monospace kicker + 右大字（NYT Sunday）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'pull-quote-margin-pull',
      name: '拉引 · 悬挂',
      description: '左竖向 QUOTE kicker + 右大字引文',
      markdown:
        '::: pull-quote variant=margin-pull\n时代变得太快，慢的人反而成了风景。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const quote = ctx.info.trim() || '——'
    // SVG <text transform="rotate"> 替代 CSS transform：后者被公众号后台剥
    const verticalKicker =
      `<svg width="24" height="72" viewBox="0 0 24 72" xmlns="http://www.w3.org/2000/svg">` +
      `<text x="12" y="64" font-size="11" font-weight="700" fill="${c.accent}" ` +
      `text-anchor="start" transform="rotate(-90 12 64)" ` +
      `font-family="monospace" letter-spacing="3">${escText(KICKER_TEXT)}</text>` +
      `</svg>`
    const tableHtml =
      `<section style="display:table;width:100%">` +
      `<section style="display:table-cell;vertical-align:top;width:56px;padding-top:2px">` +
      verticalKicker + `</section>` +
      `<section style="display:table-cell;vertical-align:top;color:${c.text};` +
      `font-size:17px;line-height:1.7;font-weight:600;letter-spacing:0.2px;text-align:left">` +
      escText(quote) + `</section>` +
      `</section>`
    return {
      wrapperCSS: [
        'margin:28px 0',
        'padding:14px 4px 14px 0',
        `border-left:1px solid ${c.border}`,
        'background-color:transparent',
      ].join(';'),
      titleCSS: '',
      bodyCSS: [
        `color:${c.textMuted}`,
        'font-size:13px',
        'line-height:1.6',
        'margin-top:8px',
        'padding-left:56px',
        'text-align:left',
        'letter-spacing:0.2px',
      ].join(';'),
      svgSlot: tableHtml,
    }
  },
}

export default marginPull
