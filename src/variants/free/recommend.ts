/**
 * free · recommend（推荐阅读）：列表形式的相关链接。
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

const recommend: VariantDef = {
  meta: {
    id: 'recommend',
    kind: 'none',
    name: '推荐阅读',
    description: '列表形式的相关链接',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'free-recommend',
      name: '推荐阅读',
      description: '列表形式的相关链接',
      markdown: '::: recommend 推荐阅读\n- [文章 A](#)\n- [文章 B](#)\n:::\n',
    },
  ],
}

export default recommend
