/**
 * gallery · nine-grid
 *
 * 人格：Instagram 九宫格——3×3 强制方形流式。
 * 骨架：wrapper display:block；每项 inline-block 32% 自动换行；
 *      每图 aspect-ratio:1 + object-fit:cover 强制 1:1；caption 8px 紧凑灰。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { soft } = mergeThumb(args ?? {})
  const cells: string[] = []
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      cells.push(`<rect x="${8 + c * 21}" y="${8 + r * 21}" width="18" height="18" fill="${soft}"/>`)
    }
  }
  return svg(cells.join(''))
}

const nineGrid: VariantDef = {
  meta: {
    id: 'nine-grid',
    kind: 'gallery',
    name: '九宫格',
    description: '3×3 强制方形（Instagram 体）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'gallery-nine-grid',
      name: '相册 · 九宫格',
      description: '3×3 方形流式（旅行回忆 / 作品集）',
      markdown:
        ':::: gallery 旅行回忆 variant=nine-grid\n' +
        '::: image-item src="https://placehold.co/400" alt="1"\n:::\n' +
        '::: image-item src="https://placehold.co/400" alt="2"\n:::\n' +
        '::: image-item src="https://placehold.co/400" alt="3"\n:::\n' +
        '::: image-item src="https://placehold.co/400" alt="4"\n:::\n' +
        '::: image-item src="https://placehold.co/400" alt="5"\n:::\n' +
        '::: image-item src="https://placehold.co/400" alt="6"\n:::\n' +
        '::: image-item src="https://placehold.co/400" alt="7"\n:::\n' +
        '::: image-item src="https://placehold.co/400" alt="8"\n:::\n' +
        '::: image-item src="https://placehold.co/400" alt="9"\n:::\n' +
        '::::\n',
    },
  ],
  render: () => {
    return {
      wrapperCSS: '',
      bodyCSS: 'display:block;font-size:0;line-height:0',
    }
  },
}

export default nineGrid
