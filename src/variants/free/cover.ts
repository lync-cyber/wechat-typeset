/**
 * free · cover（封面卡）：标题 + 一张图 + 一行描述。
 * 缩略图复用 intro 的 SVG，视觉上等价。
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

const cover: VariantDef = {
  meta: {
    id: 'cover',
    kind: 'none',
    name: '封面卡',
    description: '标题 + 一张图 + 一行描述',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'free-cover',
      name: '封面卡',
      description: '标题 + 一张图 + 一行描述',
      markdown:
        '::: cover 本期封面\n![封面图](https://placehold.co/1200x630)\n\n_一句描述_\n:::\n',
    },
  ],
}

export default cover
