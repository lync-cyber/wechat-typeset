/**
 * recommend · academic-refs
 *
 * 视觉：uppercase letter-spaced textMuted 小字 kicker + 整段 textMuted 小字列表。
 * 承接原 ::: see-also 容器——学术 / 调研类"参考引用"，比 card-list 更克制，
 * 意图强调"凭证"而非"延伸娱乐"。
 *
 * 主题级 voice 由 ctx.containers.recommend 接管；variant 只重塑 title 行的 letter-spacing /
 * uppercase / textMuted 主色调。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  return svg(
    `<text x="10" y="22" font-size="6" font-weight="700" letter-spacing="1.5" fill="${text}">SEE ALSO</text>` +
      `<rect x="10" y="30" width="55" height="1" fill="${text}" opacity="0.5"/>` +
      `<rect x="10" y="38" width="50" height="1.5" fill="#a0a8b3"/>` +
      `<rect x="10" y="46" width="46" height="1.5" fill="#a0a8b3"/>` +
      `<rect x="10" y="54" width="42" height="1.5" fill="#a0a8b3"/>` +
      `<rect x="10" y="62" width="38" height="1.5" fill="#a0a8b3"/>`,
  )
}

const academicRefs: VariantDef = {
  meta: {
    id: 'academic-refs',
    kind: 'recommend',
    name: '学术参考',
    description: 'uppercase 小字 kicker + textMuted 列表',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'rec-academic-refs',
      name: '学术参考',
      description: '面向论证的"参考引用"：克制小字 + uppercase kicker',
      markdown:
        '::: recommend variant=academic-refs 延伸阅读\n- [相关论文](#)\n- [原始数据](#)\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: '',
      titleCSS: [
        `color:${c.textMuted}`,
        'font-weight:700',
        'font-size:11px',
        'letter-spacing:2px',
        'text-transform:uppercase',
        'margin-bottom:8px',
      ].join(';'),
    }
  },
}

export default academicRefs
