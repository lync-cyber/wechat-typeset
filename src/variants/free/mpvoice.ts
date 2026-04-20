/**
 * free · mpvoice（音频占位）。<mpvoice> 无法粘贴，此为占位。
 */

import type { VariantDef } from '../_core'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/>` +
      `<rect x="14" y="30" width="46" height="2" fill="#856404"/>` +
      `<rect x="14" y="38" width="38" height="2" fill="#856404"/>`,
  )
}

const mpvoice: VariantDef = {
  meta: {
    id: 'mpvoice',
    kind: 'none',
    name: '音频占位',
    description: '<mpvoice> 无法粘贴，此为占位',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'free-mpvoice',
      name: '音频占位',
      description: '<mpvoice> 无法粘贴，此为占位',
      markdown:
        '::: mpvoice 本期播客\n粘贴后在公众号后台从素材库重新插入。\n:::\n',
    },
  ],
}

export default mpvoice
