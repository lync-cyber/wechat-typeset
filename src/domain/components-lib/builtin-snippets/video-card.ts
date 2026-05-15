/**
 * video-card（腾讯视频占位）。带 qqvid 直出 v.qq.com iframe。
 */

import type { VariantDef } from '../../../core/variants/_core'
import { svg } from '../../../core/variants/_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="22" width="63" height="33" rx="3" fill="#fff3b0"/>` +
      `<rect x="14" y="30" width="46" height="2" fill="#856404"/>` +
      `<rect x="14" y="38" width="38" height="2" fill="#856404"/>`,
  )
}

const videoCard: VariantDef = {
  meta: {
    id: 'video-card',
    kind: 'none',
    name: '腾讯视频',
    description: '直接渲染 v.qq.com iframe',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'free-video-card-qq',
      name: '腾讯视频',
      description: '直接渲染 v.qq.com iframe',
      markdown: '::: video-card qqvid=v326875u4ek\n视频标题\n:::\n',
    },
  ],
}

export default videoCard
