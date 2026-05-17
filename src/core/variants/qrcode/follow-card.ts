/**
 * qrcode · follow-card
 *
 * 视觉：左 64×64 QR + 右 kicker/title/desc 三行 newspaper 订阅卡，刊物收尾专用。
 * 与 bare 的边界：bare 是无装饰扫码块（任意 QR 场景），follow-card 是订阅栏排版。
 *
 * QR：attrs.text 走内置 SVG 编码（renderer 处理）；attrs.qr 是外链图 URL。
 * 文字段：attrs.kicker（兜底 ctx.kickers.qrFollowKicker "SUBSCRIBE"）/ info（兜底
 * ctx.kickers.qrFollowTitle）/ attrs.desc。所有 layout 走 display:table + table-cell
 * （避开 flex 被微信粘贴剥）。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="59" height="47" fill="#fefefe" stroke="${text}" stroke-width="1"/>` +
      `<rect x="13" y="20" width="20" height="20" fill="${text}"/>` +
      `<rect x="16" y="23" width="4" height="4" fill="#fefefe"/>` +
      `<rect x="26" y="23" width="4" height="4" fill="#fefefe"/>` +
      `<rect x="16" y="33" width="4" height="4" fill="#fefefe"/>` +
      `<text x="38" y="24" font-size="5" font-weight="700" letter-spacing="0.5" fill="${accent}">SUBSCRIBE</text>` +
      `<rect x="38" y="29" width="24" height="3" fill="${text}"/>` +
      `<rect x="38" y="36" width="22" height="2" fill="#a0a8b3"/>`,
  )
}

const followCard: VariantDef = {
  meta: {
    id: 'follow-card',
    kind: 'qrcode',
    name: '订阅二维码卡',
    description: '左 QR + 右 kicker/标题/说明三行',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qr-follow-card',
      name: '订阅二维码卡',
      description: '刊物收束栏：左 64×64 QR + 右 SUBSCRIBE/标题/说明',
      markdown:
        '::: qrcode variant=follow-card 慢读简报 desc="每周四，一封邮件，一组数据"\n:::\n',
    },
  ],
  render: () => ({ wrapperCSS: '' }),
}

export default followCard
