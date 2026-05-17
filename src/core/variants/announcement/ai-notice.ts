/**
 * announcement · ai-notice（2026 AI 内容合规告知）
 *
 * 人格：pill 形态紧凑告知 + 一枚识别度极强的 inline SVG 芯片图标。
 * 视觉骨架：wrapper bgMuted + 1.5px solid accent border + 圆角 12px；
 *   顶部 display:table 双栏：左 24×24 AI 芯片 SVG（圆角方 + 4 die + 引脚），右 title 13px bold textMuted。
 *   下方 body 12px line-height 1.6 灰字（全宽，紧凑 pill 内）。
 *   info 为空时兜底 "本文部分内容由 AI 生成"；title 由 svgSlot 自渲，titleCSS=''。
 */

import type { VariantDef } from '../_core'
import { escText } from '../../pipeline/containers/_shared/escape'
import { mergeThumb, svg } from '../_thumb'
import { toneToStatusKey } from './_tone'

const DEFAULT_NOTICE = '本文部分内容由 AI 生成'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="22" width="63" height="32" rx="8" fill="${soft}" stroke="${accent}" stroke-width="1.5"/>` +
      `<rect x="14" y="30" width="14" height="14" rx="2" fill="none" stroke="${accent}" stroke-width="1.2"/>` +
      `<rect x="18" y="34" width="3" height="3" fill="${accent}"/>` +
      `<rect x="22" y="34" width="3" height="3" fill="${accent}"/>` +
      `<rect x="18" y="38" width="3" height="3" fill="${accent}"/>` +
      `<rect x="22" y="38" width="3" height="3" fill="${accent}"/>` +
      `<rect x="34" y="34" width="28" height="2" fill="${text}"/>` +
      `<rect x="34" y="40" width="24" height="1.5" fill="#c0c6cf"/>` +
      `<rect x="34" y="45" width="20" height="1.5" fill="#c0c6cf"/>`,
  )
}

const aiNotice: VariantDef = {
  meta: {
    id: 'ai-notice',
    kind: 'announcement',
    name: 'AI 合规告知',
    description: 'pill 形态 + 芯片图标 + 灰字告知（AI 内容披露）',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'announcement-ai-notice',
      name: '公告 · AI 告知',
      description: 'AI 内容合规告知，pill + 芯片图标',
      markdown:
        '::: announcement variant=ai-notice tone=primary\n本文图示由模型辅助生成，文字由编辑审校；如发现事实错误请反馈。\n:::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const status = c.status[toneToStatusKey(ctx.attrs.tone)]
    const padX = ctx.tokens.spacing.containerPadding
    const title = ctx.info.trim() || DEFAULT_NOTICE
    // 24×24 芯片 die：圆角方框 + 4 个内部小方块 + 4 边外引脚（accent 描线 + bgMuted 填充）
    const chip =
      `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ` +
      `fill="none" stroke="${status.accent}" stroke-width="1.5" stroke-linecap="round">` +
      `<rect x="5" y="5" width="14" height="14" rx="2" fill="${c.bgMuted}"/>` +
      `<rect x="8.5" y="8.5" width="3" height="3" fill="${status.accent}" stroke="none"/>` +
      `<rect x="12.5" y="8.5" width="3" height="3" fill="${status.accent}" stroke="none"/>` +
      `<rect x="8.5" y="12.5" width="3" height="3" fill="${status.accent}" stroke="none"/>` +
      `<rect x="12.5" y="12.5" width="3" height="3" fill="${status.accent}" stroke="none"/>` +
      `<path d="M9 5 V2 M15 5 V2 M9 22 V19 M15 22 V19 M5 9 H2 M5 15 H2 M22 9 H19 M22 15 H19"/>` +
      `</svg>`
    const iconCell =
      `<span style="display:table-cell;vertical-align:middle;width:32px;padding-right:10px">${chip}</span>`
    const titleCSS = `font-weight:700;font-size:13px;color:${c.textMuted};letter-spacing:0.3px;line-height:1.4`
    const titleRow =
      `<span style="display:table-cell;vertical-align:middle">` +
      `<section style="${titleCSS}">${escText(title)}</section>` +
      `</span>`
    const slot = `<section style="display:table;width:100%">${iconCell}${titleRow}</section>`
    return {
      wrapperCSS: [
        `background-color:${c.bgMuted}`,
        `border:1.5px solid ${status.accent}`,
        'border-radius:12px',
        `padding:10px ${padX}px`,
        'margin:18px 0',
      ].join(';'),
      titleCSS: '',
      bodyCSS: [
        `color:${c.textMuted}`,
        'font-size:12px',
        'line-height:1.6',
        'margin-top:6px',
      ].join(';'),
      svgSlot: slot,
    }
  },
}

export default aiNotice
