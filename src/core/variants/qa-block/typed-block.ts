/**
 * qa-block · typed-block（包豪斯 反白上下分栏）
 *
 * 设计稿 04·B：1px 实色外框包裹两段；上半段反白底（text bg + textInverse 字）承载
 * Q · NN mono kicker + 设问；下半段正常底承载 A · NN kicker + 回答。反白对比 =
 * 包豪斯 typed block / typewriter 排版语言。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'
import { escText } from '../../pipeline/containers/_shared/escape'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="10" width="63" height="56" fill="none" stroke="${text}" stroke-width="1"/>` +
      `<rect x="6" y="10" width="63" height="26" fill="${text}"/>` +
      `<text x="10" y="20" font-family="monospace" font-size="7" fill="${accent}" letter-spacing="1.5">Q · 01</text>` +
      `<rect x="10" y="24" width="50" height="2" fill="#fff"/>` +
      `<rect x="10" y="30" width="38" height="2" fill="#fff" opacity="0.7"/>` +
      `<text x="10" y="46" font-family="monospace" font-size="7" fill="${text}" letter-spacing="1.5">A · 01</text>` +
      `<rect x="10" y="50" width="52" height="2" fill="${text}"/>` +
      `<rect x="10" y="56" width="42" height="2" fill="${text}" opacity="0.7"/>` +
      `<rect x="10" y="62" width="46" height="2" fill="${text}" opacity="0.7"/>`,
  )
}

const typedBlock: VariantDef = {
  meta: {
    id: 'typed-block',
    kind: 'qaBlock',
    name: '反白分栏',
    description: '上半段反白 Q · NN + 下半段正常底 A · NN，包豪斯 typed block',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qa-block-typed-block',
      name: '问答 · 反白分栏',
      description: '反白 Q 段 + 正常 A 段 + mono · 编号，包豪斯反衬',
      markdown:
        '::: qa-block 读者问答 variant=typed-block q="如何判断一个项目应该被砍掉？"\n' +
        '当你已经无法回答"为什么是我们来做"时——该砍。\n' +
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
    const qSectionCSS = [
      `background-color:${c.text}`,
      'padding:10px 12px',
    ].join(';')
    const qKickerCSS = [
      'display:block',
      'font-size:9px',
      'letter-spacing:0.2em',
      `color:${c.accent}`,
      'margin-bottom:6px',
    ].join(';')
    const qTextCSS = [
      'display:block',
      'font-size:14px',
      'font-weight:500',
      `color:${c.textInverse}`,
      'line-height:1.75',
    ].join(';')
    const aSectionCSS = [
      'padding:10px 12px',
    ].join(';')
    const aKickerCSS = [
      'display:block',
      'font-size:9px',
      'letter-spacing:0.2em',
      `color:${c.textMuted}`,
      'margin-bottom:6px',
    ].join(';')
    const aBodyCSS = [
      'display:block',
      'font-size:14px',
      'line-height:1.85',
      `color:${c.text}`,
    ].join(';')

    const qBlockHtml = q
      ? `<section class="container-qa-block__q" style="${qSectionCSS}"><span style="${qKickerCSS}">Q · 01</span><span style="${qTextCSS}">${escText(q)}</span></section>\n`
      : ''

    return {
      wrapperCSS: `margin:18px 0;padding:0;border:1px solid ${c.text};background-color:transparent`,
      qaBlock: {
        kickerHtml: kickerText
          ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>\n`
          : '',
        qHtml: qBlockHtml,
        aOpenHtml: `<section class="container-qa-block__a" style="${aSectionCSS}"><span style="${aKickerCSS}">A · 01</span><span style="${aBodyCSS}">\n`,
        aCloseHtml: '</span></section>\n',
      },
    }
  },
}

export default typedBlock
