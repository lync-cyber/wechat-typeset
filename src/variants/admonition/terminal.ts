/**
 * admonition · terminal（终端窗口）
 *
 * 视觉：黑底 + 顶部灰色标题栏 + 三色圆点（红/黄/绿）。等宽字体无法指定
 *（禁 font-family）——"终端感"靠配色 + 圆点 + 标题栏承担。
 *
 * wrapperCSS padding=0：让 svgSlot 圆点行贴 wrapper 顶边不露缝。
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/types'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="4" fill="#1f2937"/>` +
      `<rect x="6" y="14" width="63" height="11" fill="#2d3748"/>` +
      `<circle cx="12" cy="20" r="1.8" fill="#ff5f56"/>` +
      `<circle cx="18" cy="20" r="1.8" fill="#ffbd2e"/>` +
      `<circle cx="24" cy="20" r="1.8" fill="#27c93f"/>` +
      `<rect x="12" y="34" width="36" height="2" fill="#9ca3af"/>` +
      `<rect x="12" y="42" width="46" height="2" fill="#9ca3af"/>` +
      `<rect x="12" y="50" width="28" height="2" fill="#9ca3af"/>`,
  )
}

const TRAFFIC_LIGHTS =
  '<svg viewBox="0 0 54 14" width="42" height="11"' +
  ' xmlns="http://www.w3.org/2000/svg"' +
  ' style="display:inline-block;vertical-align:middle;margin-right:10px">' +
  '<circle cx="7" cy="7" r="5" fill="#ff5f56"/>' +
  '<circle cx="22" cy="7" r="5" fill="#ffbd2e"/>' +
  '<circle cx="37" cy="7" r="5" fill="#27c93f"/>' +
  '</svg>'

const DEFAULT_TITLES: Record<string, string> = {
  tip: 'tip',
  warning: 'warning',
  info: 'info',
  danger: 'error',
}

const terminal: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'terminal',
    kind: 'admonition',
    name: '终端窗口',
    description: '黑底 + 三色圆点，代码讲解专用',
    themeCompat: ['tech-geek', 'default'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-terminal',
      name: '终端 Tip',
      description: '黑底 + 三色圆点，代码讲解专用',
      admonitionKind: 'tip',
      themeCompat: ['tech-geek', 'default'],
      markdown: '::: tip $ 执行这行 variant=terminal\n内容会渲染成终端风格\n:::\n',
    },
    {
      presetId: 'ad-info-terminal',
      name: '终端 Info',
      description: '命令日志类信息',
      admonitionKind: 'info',
      themeCompat: ['tech-geek'],
      markdown: '::: info $ deploy.sh variant=terminal\n2026-04-19 success\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    // titleCSS='' 约定：renderer 跳过默认 title 渲染，交给 svgSlot 自建
    const title = ctx.info.trim() || DEFAULT_TITLES[kind] || kind
    return {
      wrapperCSS:
        `background-color:#1f2937;` +
        `padding:0;` +
        `margin:18px 0;` +
        `border-radius:6px;` +
        `box-shadow:0 2px 8px rgba(0,0,0,0.18)`,
      titleCSS: '',
      bodyCSS:
        `color:#e5e7eb;padding:14px 16px;font-size:14px;line-height:1.7;` +
        `border-radius:0 0 6px 6px`,
      svgSlot:
        '<section style="background-color:#2d3748;padding:8px 14px;border-bottom:1px solid #111827;border-radius:6px 6px 0 0;color:#e5e7eb;font-weight:600;font-size:13px;letter-spacing:0.4px">' +
        TRAFFIC_LIGHTS +
        escText(title) +
        '</section>',
    }
  },
}

export default terminal
