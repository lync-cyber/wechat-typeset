/**
 * qa-block · numbered-faq（编辑部 编号 FAQ）
 *
 * 设计稿 01·A：Q.NN mono 序号 + 加粗设问 + 底线分隔 + 下方多段答复。
 * 默认骨架：DEFAULT_VARIANTS.qaBlock 指向本 id；renderer 在未声明 attrs.variant
 * 且主题 spec.variants.qaBlock 缺省时回退到此。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'
import { escText } from '../../pipeline/containers/_shared/escape'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="14" height="2" fill="${accent}"/>` +
      `<rect x="26" y="14" width="40" height="2" fill="${text}"/>` +
      `<rect x="8" y="20" width="58" height="1" fill="${text}"/>` +
      `<rect x="8" y="26" width="50" height="2" fill="${text}" opacity="0.5"/>` +
      `<rect x="8" y="46" width="14" height="2" fill="${accent}"/>` +
      `<rect x="26" y="46" width="36" height="2" fill="${text}"/>` +
      `<rect x="8" y="52" width="58" height="1" fill="${text}"/>` +
      `<rect x="8" y="58" width="46" height="2" fill="${text}" opacity="0.5"/>`,
  )
}

const numberedFaq: VariantDef = {
  meta: {
    id: 'numbered-faq',
    kind: 'qaBlock',
    name: '编号 FAQ',
    description: 'Q.NN 序号 + 加粗设问 + 底线分隔 + 下方答复段',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qa-block-numbered-faq',
      name: '问答 · 编号 FAQ',
      description: 'Q.01 序号 + 设问 + 底线分隔，编辑部 FAQ 风',
      markdown:
        '::: qa-block 读者问答 · Q&A variant=numbered-faq q="订阅是否包含纸质刊？"\n' +
        '不含。本刊数字订阅与纸刊为独立产品，需分别购买。\n' +
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
      `border-bottom:1px solid ${c.text}`,
      'padding-bottom:6px',
      'margin-bottom:8px',
    ].join(';')
    const qLabelCSS = [
      'display:table-cell',
      'vertical-align:baseline',
      'width:40px',
      'font-family:"IBM Plex Mono",monospace',
      'font-size:10px',
      `color:${c.textMuted}`,
      'letter-spacing:0.16em',
    ].join(';')
    const qTextCSS = [
      'display:table-cell',
      'vertical-align:baseline',
      'font-size:14px',
      'font-weight:600',
      `color:${c.text}`,
    ].join(';')
    const aBodyCSS = [
      'font-size:13.5px',
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
          ? `<section class="container-qa-block__q" style="${qRowCSS}"><span style="${qLabelCSS}">Q.01</span><span style="${qTextCSS}">${escText(q)}</span></section>\n`
          : '',
        aOpenHtml: `<section class="container-qa-block__a" style="${aBodyCSS}"><span class="container-qa-block__answer">\n`,
        aCloseHtml: '</span></section>\n',
      },
    }
  },
}

export default numberedFaq
