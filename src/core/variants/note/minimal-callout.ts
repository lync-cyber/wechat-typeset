/**
 * note · minimal-callout（默认骨架）。
 * 视觉：顶端 1px 短分隔线 + textMuted 标题，无背景、无左条、无圆角。
 * 用于"低调补充说明"——和正文段落仅以 1px 短线分隔，不抢注意力。
 * DEFAULT_VARIANTS.note 兜底——主题不声明 variants.note 时即此。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { text } = mergeThumb(args ?? {})
  // 顶端短线 + 标题字 + 几行正文条
  return svg(
    `<rect x="10" y="18" width="20" height="1" fill="${text}"/>` +
      `<rect x="10" y="26" width="18" height="2" fill="${text}"/>` +
      `<rect x="10" y="36" width="55" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="44" width="48" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="52" width="40" height="2" fill="#c0c6cf"/>`,
  )
}

const minimalCallout: VariantDef = {
  meta: {
    id: 'minimal-callout',
    kind: 'note',
    name: '极简短线',
    description: '顶端 1px 短分隔 + textMuted 标题，低调批注',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'note-minimal-callout',
      name: '极简短线 Note',
      description: '不抢色的低调补注，顶端短线分隔',
      markdown: '::: note 补注\n中性补充说明 …\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: `margin:16px 0;padding:0`,
      titleCSS: [
        `color:${c.textMuted}`,
        'font-weight:600',
        'font-size:13px',
        'margin-bottom:4px',
        'letter-spacing:0.3px',
      ].join(';'),
    }
  },
}

export default minimalCallout
