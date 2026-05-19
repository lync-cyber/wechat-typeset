/**
 * qa-block · hanging-qa（编辑部 悬挂 Q./A.）
 *
 * 设计稿 01·B：左侧 32px 列承载大号斜体 Q. / A. 字符，右侧设问与回答；
 * A 行顶部 1px 实线分隔。display:grid 在公众号粘贴时降级为 display:table + 双
 * table-cell，hanging indent 由 width:32px 的首列承担。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'
import { escText } from '../../pipeline/containers/_shared/escape'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<text x="8" y="24" font-family="serif" font-size="18" font-style="italic" fill="${text}">Q.</text>` +
      `<rect x="28" y="14" width="42" height="2" fill="${text}"/>` +
      `<rect x="28" y="20" width="36" height="2" fill="${text}" opacity="0.6"/>` +
      `<rect x="8" y="38" width="58" height="1" fill="${text}" opacity="0.5"/>` +
      `<text x="8" y="56" font-family="serif" font-size="18" font-style="italic" fill="${accent}">A.</text>` +
      `<rect x="28" y="46" width="44" height="2" fill="${text}" opacity="0.6"/>` +
      `<rect x="28" y="52" width="32" height="2" fill="${text}" opacity="0.6"/>`,
  )
}

const hangingQa: VariantDef = {
  meta: {
    id: 'hanging-qa',
    kind: 'qaBlock',
    name: '悬挂 Q./A.',
    description: '左侧大号斜体 Q./A. 标签 + 右侧设问回答悬挂缩进',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qa-block-hanging-qa',
      name: '问答 · 悬挂 Q./A.',
      description: '大号斜体 Q. 起头 + A. 行顶线分隔，杂志 FAQ 母本',
      markdown:
        '::: qa-block 读者问答 variant=hanging-qa q="我是否需要先具备写作基础才能加入这个写作社群？"\n' +
        '不需要。我们更欢迎尚未形成"写作惯性"的初学者。\n' +
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
    const qRowCSS = [
      'display:table',
      'width:100%',
      'margin-bottom:14px',
    ].join(';')
    const qLabelCSS = [
      'display:table-cell',
      'vertical-align:top',
      'width:32px',
      'font-size:24px',
      'font-style:italic',
      `color:${c.text}`,
      'line-height:1',
      'font-weight:500',
    ].join(';')
    const qTextCSS = [
      'display:table-cell',
      'vertical-align:top',
      'font-size:14.5px',
      'line-height:1.85',
      `color:${c.text}`,
      'font-weight:500',
    ].join(';')
    const aRowCSS = [
      'display:table',
      'width:100%',
      `border-top:1px solid ${c.textMuted}`,
      'padding-top:12px',
    ].join(';')
    const aLabelCSS = [
      'display:table-cell',
      'vertical-align:top',
      'width:32px',
      'font-size:24px',
      'font-style:italic',
      `color:${c.textMuted}`,
      'line-height:1',
      'font-weight:500',
    ].join(';')
    const aBodyCSS = [
      'display:table-cell',
      'vertical-align:top',
      'font-size:14.5px',
      'line-height:1.85',
      `color:${c.textMuted}`,
    ].join(';')

    return {
      wrapperCSS: 'margin:18px 0;padding:6px 0;background-color:transparent',
      qaBlock: {
        kickerHtml: kickerText
          ? `<section class="container-qa-block__kicker" style="${kickerCSS}">${escText(kickerText)}</section>\n`
          : '',
        qHtml: q
          ? `<section class="container-qa-block__q" style="${qRowCSS}"><span style="${qLabelCSS}">Q.</span><span style="${qTextCSS}">${escText(q)}</span></section>\n`
          : '',
        aOpenHtml: `<section class="container-qa-block__a" style="${aRowCSS}"><span style="${aLabelCSS}">A.</span><span style="${aBodyCSS}">\n`,
        aCloseHtml: '</span></section>\n',
      },
    }
  },
}

export default hangingQa
