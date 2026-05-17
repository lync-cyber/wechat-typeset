/**
 * recommend · card-list（默认）
 *
 * 视觉：粗体大标题 + bullet 链接列表。当前 recommend 容器原视觉，承担"延伸阅读"
 * 的读者面入口——同一作者的其他文章、同号公众号推送。
 * 主题级 voice 由 ctx.containers.recommend 接管；variant 仅决定标题骨架。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="16" width="32" height="3" fill="${text}"/>` +
      `<rect x="10" y="28" width="6" height="2" fill="${accent}"/>` +
      `<rect x="20" y="28" width="42" height="2" fill="${text}"/>` +
      `<rect x="10" y="38" width="6" height="2" fill="${accent}"/>` +
      `<rect x="20" y="38" width="40" height="2" fill="${text}"/>` +
      `<rect x="10" y="48" width="6" height="2" fill="${accent}"/>` +
      `<rect x="20" y="48" width="36" height="2" fill="${text}"/>`,
  )
}

const cardList: VariantDef = {
  meta: {
    id: 'card-list',
    kind: 'recommend',
    name: '推荐列表',
    description: '粗体标题 + bullet 链接列表',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'rec-card-list',
      name: '推荐列表',
      description: '面向读者的延伸阅读：粗体标题 + bullet 链接',
      markdown: '::: recommend 推荐阅读\n- [前作](#)\n- [续篇](#)\n:::\n',
    },
  ],
  render: () => ({
    wrapperCSS: '',
    titleCSS: 'font-weight:700;margin-bottom:10px',
  }),
}

export default cardList
