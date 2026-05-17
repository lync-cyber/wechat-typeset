/**
 * qrcode · qr-stack（垂直堆叠 · QR 上 / 文字下）
 *
 * 与 follow-card 的边界：follow-card 是"左 QR + 右三行"水平栏目卡（NYT 订阅条母语）；
 * qr-stack 是"QR 居中上 + kicker/title/desc 居中下"垂直栈（数据简报 / Neue Grafik 收尾
 * 抓眼语序：先视觉锚再说明）。两者各取一种刊物收束惯例。
 *
 * 实际渲染逻辑在 footer.ts qrcodeContainer.open 分支里——variant 文件只提供 meta /
 * snippet / thumbnail（与 follow-card 同模式：layout 走 renderer 强制，wrapper 装饰
 * 由主题 voice ctx.containers.qrcode 决定）。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    // 上半：居中 QR（32×32）
    `<rect x="22" y="10" width="32" height="32" fill="${text}"/>` +
      `<rect x="26" y="14" width="8" height="8" fill="#fefefe"/>` +
      `<rect x="42" y="14" width="8" height="8" fill="#fefefe"/>` +
      `<rect x="26" y="30" width="8" height="8" fill="#fefefe"/>` +
      // 下半：kicker + 主标题条
      `<text x="38" y="50" font-size="5" font-weight="700" letter-spacing="0.5" ` +
      `text-anchor="middle" fill="${accent}">SUBSCRIBE</text>` +
      `<rect x="22" y="54" width="32" height="3" fill="${text}"/>` +
      `<rect x="26" y="60" width="24" height="2" fill="#a0a8b3"/>`,
  )
}

const qrStack: VariantDef = {
  meta: {
    id: 'qr-stack',
    kind: 'qrcode',
    name: '垂直堆叠二维码',
    description: '上 QR + 下 kicker/标题/说明，先视觉锚后说明（Neue Grafik 收尾）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'qr-stack',
      name: '垂直堆叠二维码',
      description: '上 96×96 QR 居中 + 下三行（kicker / title / desc），数据简报收束语序',
      markdown:
        '::: qrcode variant=qr-stack 慢读简报 desc="每周四，一封邮件，一组数据"\n:::\n',
    },
  ],
  render: () => ({ wrapperCSS: '' }),
}

export default qrStack
