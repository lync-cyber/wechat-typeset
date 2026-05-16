/**
 * footnotes · lined（默认骨架）。
 * 视觉：一条一行 + hanging indent（padding-left + 负 text-indent）。
 * 适合 5~10 条短引用；编号悬挂在外、正文左缘对齐。
 * DEFAULT_VARIANTS.footnotes 兜底——主题不声明 variants.footnotes 时即此。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="14" width="55" height="1" fill="${text}"/>` +
      `<text x="10" y="28" font-size="10" fill="${accent}" font-family="monospace">[1]</text>` +
      `<rect x="22" y="24" width="38" height="2" fill="#c0c6cf"/>` +
      `<text x="10" y="42" font-size="10" fill="${accent}" font-family="monospace">[2]</text>` +
      `<rect x="22" y="38" width="32" height="2" fill="#c0c6cf"/>` +
      `<text x="10" y="56" font-size="10" fill="${accent}" font-family="monospace">[3]</text>` +
      `<rect x="22" y="52" width="42" height="2" fill="#c0c6cf"/>`,
  )
}

const lined: VariantDef = {
  meta: {
    id: 'lined',
    kind: 'footnotes',
    name: '逐条',
    description: '一条一行 + hanging indent，编号悬挂',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'footnotes-lined',
      name: '脚注 · 逐条',
      description: '一行一条 + hanging indent，5~10 条短引用',
      markdown: '::: footnotes\n[1] 数据覆盖 2010–2025。\n[2] 深度理解得分取自 24h 回忆测试。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        'padding-top:6px',
        'padding-left:1.6em',
        'text-indent:-1.6em',
        'line-height:1.5',
      ].join(';'),
      titleCSS: [
        `color:${c.primary}`,
        'font-size:10px',
        'font-weight:700',
        'letter-spacing:0.15em',
        'margin-bottom:6px',
        'text-indent:0',
      ].join(';'),
    }
  },
}

export default lined
