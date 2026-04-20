/**
 * steps · timeline-dot
 *
 * 视觉：wrapper 左侧用 2px 点线，标题前插一个主色小圆点（inline SVG），"时间轴"感。
 * 点线样式 border-left:2px dotted 在公众号稳定；真正的"连线+圆点"用 inline SVG 最可靠。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

const BODY3 =
  '### 01 第一步\n正文说明\n\n### 02 第二步\n正文说明\n\n### 03 第三步\n正文说明\n'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<line x1="14" y1="14" x2="14" y2="61" stroke="${accent}" stroke-width="2" stroke-dasharray="2 2"/>` +
      `<circle cx="14" cy="22" r="3" fill="${accent}"/>` +
      `<circle cx="14" cy="42" r="3" fill="${accent}"/>` +
      `<rect x="22" y="21" width="36" height="2" fill="#c0c6cf"/>` +
      `<rect x="22" y="41" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

const timelineDot: VariantDef = {
  meta: {
    id: 'timeline-dot',
    kind: 'steps',
    name: '时间轴步骤',
    description: '左侧点线 + 主色小圆点',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'st-timeline',
      name: '时间轴步骤',
      description: '左侧点线 + 主色小圆点',
      markdown: '::: steps 变更轨迹 variant=timeline-dot\n' + BODY3 + ':::\n',
    },
    {
      presetId: 'st-timeline-log',
      name: '时间轴日志',
      description: '日期 + 事件的日志流',
      markdown:
        '::: steps 更新日志 variant=timeline-dot\n### 2026-04-01 初版上线\n说明\n\n### 2026-04-10 修复若干\n说明\n:::\n',
    },
  ],
  render: (ctx) => {
    const dot =
      '<svg viewBox="0 0 10 10" width="10" height="10"' +
      ' xmlns="http://www.w3.org/2000/svg"' +
      ' style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:-16px">' +
      `<circle cx="5" cy="5" r="4" fill="${ctx.tokens.colors.primary}"/></svg>`
    return {
      wrapperCSS:
        `margin:18px 0;padding:4px 0 4px 20px;` +
        `border-left:2px dotted ${ctx.tokens.colors.primary}`,
      titleCSS: `font-weight:700;color:${ctx.tokens.colors.primary};margin-bottom:10px`,
      svgSlot: dot,
    }
  },
}

export default timelineDot
