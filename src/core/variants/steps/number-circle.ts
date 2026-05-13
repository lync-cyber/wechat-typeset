/**
 * steps · number-circle（默认）
 *
 * 只管 wrapper 外框 + 标题行。编号徽章 theme.assets.stepBadge(n) 由 writer 在 h3 里手工使用。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

const BODY3 =
  '### 01 第一步\n正文说明\n\n### 02 第二步\n正文说明\n\n### 03 第三步\n正文说明\n'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<circle cx="14" cy="22" r="5" fill="${accent}"/>` +
      `<text x="14" y="25" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">1</text>` +
      `<rect x="24" y="21" width="34" height="2" fill="#c0c6cf"/>` +
      `<circle cx="14" cy="42" r="5" fill="${accent}"/>` +
      `<text x="14" y="45" text-anchor="middle" font-size="7" font-weight="700" fill="#fff">2</text>` +
      `<rect x="24" y="41" width="30" height="2" fill="#c0c6cf"/>`,
  )
}

const numberCircle: VariantDef = {
  meta: {
    id: 'number-circle',
    kind: 'steps',
    name: '编号圆圈步骤',
    description: 'h3 手写编号，标题加粗',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'st-number-circle',
      name: '编号圆圈步骤',
      description: 'h3 手写编号，标题加粗',
      markdown: '::: steps 流程\n' + BODY3 + ':::\n',
    },
    {
      presetId: 'st-number-circle-short',
      name: '两步精简',
      description: '轻量版双步骤',
      markdown:
        '::: steps\n### 01 准备\n描述\n\n### 02 执行\n描述\n:::\n',
    },
  ],
  render: () => ({
    wrapperCSS: `margin:16px 0`,
    titleCSS: `font-weight:700;margin-bottom:12px`,
  }),
}

export default numberCircle
