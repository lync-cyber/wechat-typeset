/**
 * free · mpvideo（腾讯视频占位）。直接渲染 v.qq.com iframe。
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

const mpvideo: VariantDef = {
  meta: {
    id: 'mpvideo',
    kind: 'none',
    name: '腾讯视频',
    description: '直接渲染 v.qq.com iframe',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'free-mpvideo-qq',
      name: '腾讯视频',
      description: '直接渲染 v.qq.com iframe',
      markdown: '::: mpvideo qqvid=v326875u4ek\n视频标题\n:::\n',
    },
  ],
}

export default mpvideo
