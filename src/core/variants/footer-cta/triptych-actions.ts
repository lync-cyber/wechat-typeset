/**
 * footerCTA · triptych-actions
 *
 * 视觉：三栏 CTA（display:table）—— 左/右描边格 + 中实色格。
 * info 非空时顶部追加黑底白字 header bar；attrs.like / star / share 控制三格文字。
 * 数据简报家族签名（赞同 / 收藏 / 转发的并列动作集）。
 *
 * 单元格间无白缝：左格 + 中格 border-right 共享 1px 黑线（border-collapse:collapse）。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="20" width="63" height="14" fill="none" stroke="${text}" stroke-width="1"/>` +
      `<line x1="27" y1="20" x2="27" y2="34" stroke="${text}" stroke-width="1"/>` +
      `<line x1="48" y1="20" x2="48" y2="34" stroke="${text}" stroke-width="1"/>` +
      `<rect x="27" y="20" width="21" height="14" fill="${accent}"/>` +
      `<text x="17" y="30" text-anchor="middle" font-size="6" fill="${text}">♡ LIKE</text>` +
      `<text x="37" y="30" text-anchor="middle" font-size="6" fill="#fff" font-weight="700">★</text>` +
      `<text x="58" y="30" text-anchor="middle" font-size="6" fill="${text}">↗ FWD</text>` +
      `<rect x="6" y="44" width="63" height="2" fill="#c0c6cf"/>` +
      `<rect x="6" y="52" width="50" height="2" fill="#c0c6cf"/>`,
  )
}

const triptychActions: VariantDef = {
  meta: {
    id: 'triptych-actions',
    kind: 'footerCTA',
    name: '三栏动作 CTA',
    description: '赞同 / 收藏 / 转发三栏（左右描边 + 中实色）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'fc-triptych-actions',
      name: '三栏动作 CTA',
      description: 'display:table 三栏：赞同 / 收藏 / 转发，data-brief 家族签名',
      markdown:
        '::: footer-cta variant=triptych-actions like="♡ 赞同" star="★ 收藏" share="↗ 转发"\n:::\n',
    },
    {
      presetId: 'fc-triptych-actions-header',
      name: '三栏 CTA · 顶部 kicker',
      description: 'info 触发顶部黑底白字 header bar',
      markdown:
        '::: footer-cta variant=triptych-actions IF YOU LIKED THIS like="♡ LIKE" star="◎ SEEN" share="→ SHARE"\n:::\n',
    },
  ],
  render: () => ({ wrapperCSS: '' }),
}

export default triptychActions
