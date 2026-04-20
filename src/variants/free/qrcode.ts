/**
 * free · qrcode（二维码卡）：说明文字 + 一张二维码图。
 */

import type { VariantDef } from '../_core'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="4" fill="#f7f8fa"/>` +
      `<rect x="6" y="14" width="2" height="47" fill="#2d6fdd"/>` +
      `<rect x="14" y="24" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="14" y="32" width="46" height="2" fill="#c0c6cf"/>` +
      `<rect x="14" y="40" width="34" height="2" fill="#c0c6cf"/>`,
  )
}

const qrcode: VariantDef = {
  meta: {
    id: 'qrcode',
    kind: 'none',
    name: '二维码卡',
    description: '说明文字 + 一张二维码图',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'free-qrcode',
      name: '二维码卡',
      description: '说明文字 + 一张二维码图',
      markdown:
        '::: qrcode 扫码关注\n![二维码](https://placehold.co/240x240)\n:::\n',
    },
  ],
}

export default qrcode
