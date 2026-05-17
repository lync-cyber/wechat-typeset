/**
 * announcement · mono-disclaimer（法律 / 财务免责声明）
 *
 * 人格：法律 / 用户协议 / 财报披露的"免责声明"——刚硬、印刷品法律段感、无填充。
 * 视觉骨架：wrapper 1px 全边框（按 tone accent）+ 完全透明底；
 *   title 11px uppercase letter-spacing 0.18em textMuted（禁 inline font-family，用字距 + 大写承担印刷感）；
 *   body 13px line-height 1.7，title 与 body 间一根 hairline；无装饰。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'
import { toneToStatusKey } from './_tone'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="none" stroke="${accent}" stroke-width="1"/>` +
      `<rect x="12" y="22" width="20" height="2" fill="${text}"/>` +
      `<rect x="12" y="28" width="51" height="1" fill="${accent}" opacity="0.5"/>` +
      `<rect x="12" y="34" width="48" height="2" fill="#c0c6cf"/>` +
      `<rect x="12" y="41" width="44" height="2" fill="#c0c6cf"/>` +
      `<rect x="12" y="48" width="40" height="2" fill="#c0c6cf"/>`,
  )
}

const monoDisclaimer: VariantDef = {
  meta: {
    id: 'mono-disclaimer',
    kind: 'announcement',
    name: '免责声明',
    description: '全边框无填充 + uppercase 宽字距标题（法律气质）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'announcement-mono-disclaimer',
      name: '公告 · 免责声明',
      description: '法律 / 用户协议 / 财报披露的免责段',
      markdown:
        '::: announcement DISCLAIMER variant=mono-disclaimer tone=danger\n本文不构成投资建议；过往表现不代表未来收益，决策请咨询持牌顾问。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const status = c.status[toneToStatusKey(ctx.attrs.tone)]
    const padX = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS: [
        'background-color:transparent',
        `border:1px solid ${status.accent}`,
        `padding:${Math.max(10, padX - 4)}px ${padX}px`,
        'margin:18px 0',
        'border-radius:0',
      ].join(';'),
      titleCSS: [
        `color:${c.textMuted}`,
        'font-size:11px',
        'font-weight:700',
        'letter-spacing:0.18em',
        'text-transform:uppercase',
        `border-bottom:1px solid ${c.border}`,
        'padding-bottom:6px',
        'margin-bottom:8px',
      ].join(';'),
      bodyCSS: [
        `color:${c.text}`,
        'font-size:13px',
        'line-height:1.7',
      ].join(';'),
    }
  },
}

export default monoDisclaimer
