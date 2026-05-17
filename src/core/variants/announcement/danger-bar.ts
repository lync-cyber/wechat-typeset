/**
 * announcement · danger-bar（default · 强警示横幅）
 *
 * 人格：常规强警示横幅，与原 announcement 视觉等价 —— tone 主色 + soft 底 + 左色条。
 * 视觉骨架：wrapper bgSoft (tone) + 4px solid accent (tone) left border + 圆角；
 *   title 14px bold accent 色；body 14px text 色 line-height 1.7；无装饰图。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'
import { toneToStatusKey } from './_tone'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="4" fill="${soft}"/>` +
      `<rect x="6" y="14" width="4" height="47" fill="${accent}"/>` +
      `<rect x="16" y="22" width="34" height="3" fill="${accent}"/>` +
      `<rect x="16" y="32" width="46" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="39" width="42" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="46" width="38" height="2" fill="#c0c6cf"/>`,
  )
}

const dangerBar: VariantDef = {
  meta: {
    id: 'danger-bar',
    kind: 'announcement',
    name: '左条警示',
    description: 'tone 主色左条 + soft 底（强警示横幅默认）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'announcement-danger-bar',
      name: '公告 · 左条警示',
      description: '左色条 + soft 底，文章级强警示',
      markdown:
        '::: announcement 重要通告 variant=danger-bar tone=danger\n本文涉及高风险操作，执行前请通读全文并备份。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const status = c.status[toneToStatusKey(ctx.attrs.tone)]
    const padX = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS: [
        `background-color:${status.soft}`,
        `border-left:4px solid ${status.accent}`,
        'border-radius:6px',
        `padding:14px ${padX}px`,
        'margin:20px 0',
      ].join(';'),
      titleCSS: [
        `color:${status.accent}`,
        'font-weight:700',
        'font-size:15px',
        'letter-spacing:0.5px',
        'margin-bottom:6px',
      ].join(';'),
      bodyCSS: [
        `color:${c.text}`,
        'font-size:14px',
        'line-height:1.7',
      ].join(';'),
    }
  },
}

export default dangerBar
