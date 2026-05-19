/**
 * pull-quote · margin-pull（悬挂拉引）
 *
 * 人格：NYT Sunday / Texas Monthly 报刊体悬挂 pull-quote。
 * 视觉骨架：wrapper 自身 display:table（左 56px 竖向 kicker cell + 右 body cell）。
 *   左 cell 一枚 24×72 inline SVG 竖向 monospace kicker（`<text transform="rotate(-90)">QUOTE</text>`）；
 *   旋转走 SVG `<text transform>`，CSS transform 在公众号被剥。
 *   右 cell 承载 markdown-it 渲染的 `<p>`，pull-quote 容器把 quoteCSS（17px / 600 weight）
 *   通过 `.container-pull-quote--margin-pull > .__body > p` 选择器盖到 p 上。
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
    const verticalKicker =
      `<svg width="24" height="72" viewBox="0 0 24 72" xmlns="http://www.w3.org/2000/svg">` +
      `<text x="12" y="64" font-size="11" font-weight="700" fill="${c.accent}" ` +
      `text-anchor="start" transform="rotate(-90 12 64)" ` +
      `font-family="monospace" letter-spacing="3">${escText(KICKER_TEXT)}</text>` +
      `</svg>`
    const kickerCell =
      `<section style="display:table-cell;vertical-align:top;width:56px;padding-top:2px">` +
      verticalKicker +
      `</section>`
    return {
      // wrapper 自身就是 2 列 table：svgSlot 是左 cell，bodyCSS 把 __body 设为右 cell。
      // 引文 `<p>` 由 markdown-it 渲染在右 cell 内，quoteCSS 通过 descendant selector 盖样式。
      wrapperCSS: [
        'display:table',
        'width:100%',
        'table-layout:fixed',
        'margin:28px 0',
        'padding:14px 4px 14px 0',
        `border-left:1px solid ${c.border}`,
        'background-color:transparent',
      ].join(';'),
      bodyCSS: [
        'display:table-cell',
        'vertical-align:top',
        'padding-left:4px',
        'text-align:left',
      ].join(';'),
      quoteCSS: [
        `color:${c.text}`,
        'font-size:17px',
        'line-height:1.55',
        'font-weight:600',
        'letter-spacing:0.2px',
        'text-align:left',
        'margin-top:0',
        'margin-bottom:0',
      ].join(';'),
      bylineCSS: [
        `color:${c.textMuted}`,
        'font-size:13px',
        'line-height:1.6',
        'margin-top:8px',
        'text-align:left',
        'letter-spacing:0.2px',
      ].join(';'),
      svgSlot: kickerCell,
    }
  },
}

export default marginPull
