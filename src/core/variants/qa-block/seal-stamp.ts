/**
 * qa-block · seal-stamp（宋本批注 问/答 朱印）
 *
 * 设计稿 02·A：26×26 实心徽章承载 CJK"问"+ 描边徽章承载 CJK"答"，
 * 主色与反白文字互换。徽章下基线对齐设问 / 回答正文段。
 * 与 dialogue.host-guest-seal 同一徽章语言，但 qa-block 单 Q 单 A 而非多轮。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'
import { escText } from '../../pipeline/containers/_shared/escape'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="12" width="16" height="16" fill="${accent}"/>` +
      `<text x="16" y="24" font-family="serif" font-size="11" fill="#fff" text-anchor="middle">问</text>` +
      `<rect x="30" y="16" width="38" height="2" fill="${text}"/>` +
      `<rect x="30" y="22" width="32" height="2" fill="${text}" opacity="0.6"/>` +
      `<rect x="8" y="46" width="16" height="16" fill="none" stroke="${accent}" stroke-width="1.5"/>` +
      `<text x="16" y="58" font-family="serif" font-size="11" fill="${accent}" text-anchor="middle">答</text>` +
      `<rect x="30" y="50" width="40" height="2" fill="${text}" opacity="0.8"/>` +
      `<rect x="30" y="56" width="28" height="2" fill="${text}" opacity="0.6"/>`,
  )
}

const sealStamp: VariantDef = {
  meta: {
    id: 'seal-stamp',
    kind: 'qaBlock',
    name: '问答朱印',
    description: 'CJK 问 / 答 朱印徽章：实心 vs 描边，宋本批注语言',
    experimental: true,
    experimentalSince: '2026-05-19',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qa-block-seal-stamp',
      name: '问答 · 问答朱印',
      description: '中文 问 / 答 朱印徽章对齐设问与回答',
      markdown:
        '::: qa-block 读者问答 variant=seal-stamp q="读古书是否一定要懂训诂之学？"\n' +
        '未必。能读懂大意已属可贵，训诂之学，可俟后日积累。\n' +
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
      'margin-bottom:10px',
    ].join(';')
    const qBadgeCSS = [
      'display:table-cell',
      'vertical-align:top',
      'width:28px',
      'padding-right:10px',
    ].join(';')
    const qBadgeInnerCSS = [
      'display:inline-block',
      'width:26px',
      'height:26px',
      `background-color:${c.primary}`,
      `color:${c.textInverse}`,
      'font-size:13px',
      'text-align:center',
      'line-height:26px',
    ].join(';')
    const aBadgeInnerCSS = [
      'display:inline-block',
      'width:26px',
      'height:26px',
      'background-color:transparent',
      `border:1.5px solid ${c.primary}`,
      `color:${c.primary}`,
      'font-size:13px',
      'text-align:center',
      'line-height:23px',
    ].join(';')
    const bodyCSS = [
      'display:table-cell',
      'vertical-align:top',
      'font-size:14px',
      'line-height:1.85',
      `color:${c.text}`,
    ].join(';')

    return {
      wrapperCSS: 'margin:18px 0;padding:6px 0;background-color:transparent',
      qaBlock: {
        kickerHtml: kickerText
          ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>\n`
          : '',
        qHtml: q
          ? `<section class="container-qa-block__q" style="${rowCSS}"><span style="${qBadgeCSS}"><span style="${qBadgeInnerCSS}">问</span></span><span style="${bodyCSS}">${escText(q)}</span></section>\n`
          : '',
        aOpenHtml: `<section class="container-qa-block__a" style="${rowCSS}"><span style="${qBadgeCSS}"><span style="${aBadgeInnerCSS}">答</span></span><span style="${bodyCSS}">\n`,
        aCloseHtml: '</span></section>\n',
      },
    }
  },
}

export default sealStamp
