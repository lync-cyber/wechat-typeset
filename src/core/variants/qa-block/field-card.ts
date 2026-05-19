/**
 * qa-block · field-card（博物笔记 田野卡片）
 *
 * 设计稿 03·B：1px 实色外框 + 顶部 Q kicker + Card NN italic 编号 + dashed 行间分隔
 *   + A kicker 在 Q 段下方继续以 dashed 顶线接续。所有分隔线 dashed = 田野卡片孔位感。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'
import { escText } from '../../pipeline/containers/_shared/escape'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="10" width="63" height="56" fill="none" stroke="${text}" stroke-width="1"/>` +
      `<text x="10" y="22" font-family="monospace" font-size="8" fill="${accent}" letter-spacing="1">Q</text>` +
      `<text x="56" y="22" font-family="serif" font-size="8" font-style="italic" fill="${text}" opacity="0.6">Card 09</text>` +
      `<line x1="10" y1="26" x2="64" y2="26" stroke="${text}" stroke-dasharray="2 2"/>` +
      `<rect x="10" y="30" width="50" height="2" fill="${text}"/>` +
      `<rect x="10" y="36" width="38" height="2" fill="${text}" opacity="0.7"/>` +
      `<line x1="10" y1="42" x2="64" y2="42" stroke="${text}" stroke-dasharray="2 2"/>` +
      `<text x="10" y="50" font-family="monospace" font-size="8" fill="${accent}" letter-spacing="1">A</text>` +
      `<rect x="10" y="54" width="46" height="2" fill="${text}"/>` +
      `<rect x="10" y="60" width="34" height="2" fill="${text}" opacity="0.7"/>`,
  )
}

const fieldCard: VariantDef = {
  meta: {
    id: 'field-card',
    kind: 'qaBlock',
    name: '田野卡片',
    description: '外框 + dashed 分隔 + Q/A kicker + Card 编号，田野采集卡',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qa-block-field-card',
      name: '问答 · 田野卡片',
      description: '边框包裹 + dashed 行分隔 + Card NN 编号',
      markdown:
        '::: qa-block 读者问答 variant=field-card q="为何记录树木胸径而不是树高？"\n' +
        '胸径稳定可测，树高常因树梢断折而失真。\n' +
        ':::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const kickerText = ctx.info.trim() || ctx.kickers.qaBlock
    const q = (ctx.attrs.q ?? '').trim()

    const kickerCSS = [
      `color:${c.primary}`,
      'font-size:11px',
      'font-weight:700',
      'letter-spacing:0.1em',
      'margin-bottom:10px',
    ].join(';')
    const qHeaderRowCSS = [
      'display:table',
      'width:100%',
      `border-bottom:1px dashed ${c.text}`,
      'padding-bottom:6px',
      'margin-bottom:8px',
    ].join(';')
    const qLabelCellCSS = [
      'display:table-cell',
      'vertical-align:baseline',
      'font-size:10px',
      `color:${c.accent}`,
      'letter-spacing:0.16em',
      'font-weight:600',
    ].join(';')
    const qCardNumCellCSS = [
      'display:table-cell',
      'vertical-align:baseline',
      'text-align:right',
      'font-size:11px',
      'font-style:italic',
      `color:${c.textMuted}`,
    ].join(';')
    const qTextCSS = [
      'display:block',
      'font-size:14px',
      'line-height:1.85',
      `color:${c.text}`,
      'margin-bottom:10px',
    ].join(';')
    const aHeaderCSS = [
      'display:block',
      'font-size:10px',
      `color:${c.accent}`,
      'letter-spacing:0.16em',
      'font-weight:600',
      `border-top:1px dashed ${c.text}`,
      'padding-top:6px',
      'margin-bottom:6px',
    ].join(';')
    const aBodyCSS = [
      'display:block',
      'font-size:14px',
      'line-height:1.85',
      `color:${c.text}`,
    ].join(';')

    const qHeaderHtml = q
      ? `<section class="container-qa-block__q-header" style="${qHeaderRowCSS}"><span style="${qLabelCellCSS}">Q</span><span style="${qCardNumCellCSS}">Card 09</span></section>\n` +
        `<span style="${qTextCSS}">${escText(q)}</span>\n`
      : ''

    return {
      wrapperCSS: `margin:18px 0;padding:10px 12px;border:1px solid ${c.text};background-color:transparent`,
      qaBlock: {
        kickerHtml: kickerText
          ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>\n`
          : '',
        qHtml: qHeaderHtml,
        aOpenHtml: `<span style="${aHeaderCSS}">A</span><span style="${aBodyCSS}">\n`,
        aCloseHtml: '</span>\n',
      },
    }
  },
}

export default fieldCard
