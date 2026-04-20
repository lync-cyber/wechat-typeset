/**
 * admonition · ticket-notch（票根缺口家族）
 *
 * 视觉：上下 dashed + 左右 dotted 模拟"票根撕口"，标题前三个圆点。
 * 微信端 100% 稳定的纯 CSS 方案（避开 background-image data-URI 糊边）。
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="59" height="47" fill="${soft}" stroke="${accent}" stroke-width="1" stroke-dasharray="3 2"/>` +
      `<rect x="8" y="14" width="2" height="47" fill="${accent}"/>` +
      `<rect x="65" y="14" width="2" height="47" fill="${accent}"/>` +
      `<circle cx="28" cy="22" r="1.4" fill="${accent}"/>` +
      `<circle cx="37" cy="22" r="1.4" fill="${accent}"/>` +
      `<circle cx="46" cy="22" r="1.4" fill="${accent}"/>` +
      `<rect x="17" y="36" width="41" height="2" fill="#c0c6cf"/>` +
      `<rect x="17" y="44" width="35" height="2" fill="#c0c6cf"/>`,
  )
}

function dot(color: string): string {
  return (
    '<svg viewBox="0 0 8 8" width="8" height="8"' +
    ' xmlns="http://www.w3.org/2000/svg"' +
    ' style="display:inline-block;vertical-align:middle;margin:0 6px">' +
    `<circle cx="4" cy="4" r="3" fill="${color}"/></svg>`
  )
}

const ticketNotch: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'ticket-notch',
    kind: 'admonition',
    name: '票根',
    description: '虚线撕口 + 三圆点，票据质感',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-warning-ticket-notch',
      name: '票根 Warning',
      description: '虚线撕口 + 三圆点，票据质感',
      admonitionKind: 'warning',
      thumbArgs: { accent: '#b7791f', soft: '#fdf6e3' },
      markdown: '::: warning 注意事项 variant=ticket-notch\n正文内容\n:::\n',
    },
    {
      presetId: 'ad-danger-ticket-notch',
      name: '票根 Danger',
      description: '强警示场景的票据式呈现',
      admonitionKind: 'danger',
      thumbArgs: { accent: '#b42318', soft: '#fdecea' },
      markdown: '::: danger 警告 variant=ticket-notch\n正文内容\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const pad = ctx.tokens.spacing.containerPadding
    return {
      wrapperCSS:
        `background-color:${pair.soft};` +
        `border:1px dashed ${pair.accent};` +
        `border-left:2px dotted ${pair.accent};` +
        `border-right:2px dotted ${pair.accent};` +
        `padding:${pad}px ${pad + 4}px;` +
        `margin:18px 0;` +
        `border-radius:3px`,
      titleCSS:
        `color:${pair.accent};` +
        `font-weight:700;` +
        `letter-spacing:1px;` +
        `text-transform:uppercase;` +
        `font-size:14px;` +
        `margin-bottom:8px`,
      svgSlot: `<section style="text-align:center;margin-bottom:4px">${dot(pair.accent)}${dot(pair.accent)}${dot(pair.accent)}</section>`,
    }
  },
}

export default ticketNotch
