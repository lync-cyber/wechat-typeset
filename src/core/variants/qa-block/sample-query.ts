/**
 * qa-block · sample-query（博物笔记 QUERY / FINDING）
 *
 * 设计稿 03·A：左 54px 列承载 mono 大写标签（QUERY / FINDING）+ italic 编号
 * （N° 014 / obs. 014.b），右栏为设问 / 发现正文；Q 行底部 1px 实线分隔。
 * 田野调查 / 标本采样气质，textMuted + accent 双色交替。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'
import { escText } from '../../pipeline/containers/_shared/escape'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="12" width="20" height="2" fill="${text}" opacity="0.6"/>` +
      `<rect x="6" y="18" width="14" height="2" fill="${accent}" opacity="0.7"/>` +
      `<rect x="30" y="12" width="40" height="2" fill="${text}"/>` +
      `<rect x="30" y="18" width="34" height="2" fill="${text}" opacity="0.7"/>` +
      `<rect x="6" y="28" width="64" height="1" fill="${text}"/>` +
      `<rect x="6" y="40" width="22" height="2" fill="${accent}"/>` +
      `<rect x="6" y="46" width="16" height="2" fill="${accent}" opacity="0.7"/>` +
      `<rect x="30" y="40" width="36" height="2" fill="${text}"/>` +
      `<rect x="30" y="46" width="32" height="2" fill="${text}" opacity="0.7"/>`,
  )
}

const sampleQuery: VariantDef = {
  meta: {
    id: 'sample-query',
    kind: 'qaBlock',
    name: '采样设问',
    description: 'QUERY / FINDING 双栏 + 编号 italic 标签，博物笔记体',
    experimental: true,
    experimentalSince: '2026-05-19',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qa-block-sample-query',
      name: '问答 · 采样设问',
      description: 'QUERY N°014 + FINDING obs.014.b，田野调查 Q/A',
      markdown:
        '::: qa-block 读者问答 variant=sample-query q="山中昼夜温差超过多少时，应当停止野外考察？"\n' +
        '温差 ≥ 15℃ 且海拔超过 3000m 时，应即刻撤回营地。\n' +
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
    const rowCSS = [
      'display:table',
      'width:100%',
    ].join(';')
    const qRowCSS = [
      'display:table',
      'width:100%',
      `border-bottom:1px solid ${c.text}`,
      'padding-bottom:8px',
      'margin-bottom:8px',
    ].join(';')
    const labelCellCSS = [
      'display:table-cell',
      'vertical-align:top',
      'width:54px',
    ].join(';')
    const qLabelMainCSS = [
      'display:block',
      'font-size:10px',
      `color:${c.textMuted}`,
      'letter-spacing:0.12em',
      'font-weight:600',
    ].join(';')
    const labelItalicCSS = [
      'display:block',
      'font-size:10px',
      'font-style:italic',
      `color:${c.accent}`,
      'letter-spacing:0.06em',
    ].join(';')
    const bodyCellCSS = [
      'display:table-cell',
      'vertical-align:top',
      'font-size:14px',
      'line-height:1.85',
      `color:${c.text}`,
      'font-weight:500',
    ].join(';')
    const aBodyCellCSS = [
      'display:table-cell',
      'vertical-align:top',
      'font-size:14px',
      'line-height:1.85',
      `color:${c.text}`,
    ].join(';')

    const qLabelHtml =
      `<span style="${labelCellCSS}">` +
      `<span style="${qLabelMainCSS}">QUERY</span>` +
      `<span style="${labelItalicCSS}">N° 014</span>` +
      `</span>`
    const aLabelHtml =
      `<span style="${labelCellCSS}">` +
      `<span style="${qLabelMainCSS}">FINDING</span>` +
      `<span style="${labelItalicCSS}">obs. 014.b</span>` +
      `</span>`

    return {
      wrapperCSS: 'margin:18px 0;padding:6px 0;background-color:transparent',
      qaBlock: {
        kickerHtml: kickerText
          ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>\n`
          : '',
        qHtml: q
          ? `<section class="container-qa-block__q" style="${qRowCSS}">${qLabelHtml}<span style="${bodyCellCSS}">${escText(q)}</span></section>\n`
          : '',
        aOpenHtml: `<section class="container-qa-block__a" style="${rowCSS}">${aLabelHtml}<span style="${aBodyCellCSS}">\n`,
        aCloseHtml: '</span></section>\n',
      },
    }
  },
}

export default sampleQuery
