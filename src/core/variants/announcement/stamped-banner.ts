/**
 * announcement · stamped-banner（盖章公告）
 *
 * 人格：官方盖章公告——左大字 title + 右侧 inline SVG 印章戳，下方正文，威权感最重。
 * 视觉骨架：顶部 display:table 双栏（左 78% title 16px bold accent / 右 22% 64×64 圆印），
 *   下方 body 14px line-height 1.7 全宽；wrapper bgSoft + 顶部 3px solid accent。
 *   右侧印章用 SVG transform="rotate(-8 32 32)" 自旋转（规避 CSS transform 被微信剥）。
 */

import type { VariantDef } from '../_core'
import { escText } from '../../pipeline/containers/_shared/escape'
import { mergeThumb, svg } from '../_thumb'
import { toneToStatusKey } from './_tone'

const STAMP_TEXT_BY_TONE: Record<string, string> = {
  danger: '通告',
  primary: '公告',
  accent: '启事',
}

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="14" width="63" height="47" fill="${soft}"/>` +
      `<rect x="6" y="14" width="63" height="3" fill="${accent}"/>` +
      `<rect x="12" y="24" width="28" height="3" fill="${accent}"/>` +
      `<rect x="12" y="33" width="34" height="2" fill="#c0c6cf"/>` +
      `<rect x="12" y="40" width="30" height="2" fill="#c0c6cf"/>` +
      `<rect x="12" y="47" width="26" height="2" fill="#c0c6cf"/>` +
      `<circle cx="56" cy="42" r="10" fill="none" stroke="${accent}" stroke-width="1.5"/>` +
      `<text x="56" y="45" text-anchor="middle" font-size="7" fill="${accent}" font-weight="700" transform="rotate(-8 56 42)">通告</text>`,
  )
}

const stampedBanner: VariantDef = {
  meta: {
    id: 'stamped-banner',
    kind: 'announcement',
    name: '盖章公告',
    description: '顶色条 + 右侧 SVG 印章戳（官方威权感）',
    experimental: true,
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'announcement-stamped-banner',
      name: '公告 · 盖章',
      description: '右侧印章戳 + 顶色条，最重的官方告示',
      markdown:
        '::: announcement 重要通告 variant=stamped-banner tone=danger\n本站将于本周日凌晨 02:00–04:00 进行设备搬迁，期间服务不可用，敬请见谅。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const status = c.status[toneToStatusKey(ctx.attrs.tone)]
    const padX = ctx.tokens.spacing.containerPadding
    const stampText = STAMP_TEXT_BY_TONE[ctx.attrs.tone ?? 'danger'] ?? '通告'
    const title = ctx.info.trim()
    // 印章 SVG 自旋转 -8deg：transform 写在 SVG 内层 <text> 上，规避 CSS transform 被微信剥
    const stampSvg =
      `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">` +
      `<circle cx="32" cy="32" r="28" fill="none" stroke="${status.accent}" stroke-width="2"/>` +
      `<circle cx="32" cy="32" r="22" fill="none" stroke="${status.accent}" stroke-width="0.8" opacity="0.6"/>` +
      `<text x="32" y="39" text-anchor="middle" font-size="17" font-weight="700" ` +
      `fill="${status.accent}" letter-spacing="2" transform="rotate(-8 32 32)">${stampText}</text>` +
      `</svg>`
    const titleCSS = `font-weight:700;font-size:16px;color:${status.accent};margin-bottom:6px;line-height:1.4`
    const bodyCSS = `font-size:14px;line-height:1.7;color:${c.text}`
    const titleRow = title
      ? `<section style="${titleCSS}">${escText(title)}</section>`
      : ''
    // svgSlot 自渲 title 与印章 → titleCSS='' 让 renderer 跳过默认 title 行。
    // body 在 svgSlot 之后由 renderer 包出全宽 section（svgSlot 与 body 是兄弟节点）。
    const slot =
      `<section style="display:table;width:100%;table-layout:fixed;margin-bottom:8px">` +
      `<span style="display:table-cell;vertical-align:middle;width:78%">${titleRow}</span>` +
      `<span style="display:table-cell;vertical-align:middle;width:22%;text-align:right;line-height:0">${stampSvg}</span>` +
      `</section>`
    return {
      wrapperCSS: [
        `background-color:${status.soft}`,
        `border-top:3px solid ${status.accent}`,
        `padding:14px ${padX}px`,
        'margin:20px 0',
        'border-radius:0 0 4px 4px',
      ].join(';'),
      titleCSS: '',
      bodyCSS,
      svgSlot: slot,
    }
  },
}

export default stampedBanner
