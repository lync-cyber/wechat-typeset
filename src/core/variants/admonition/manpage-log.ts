/**
 * admonition · manpage-log（manpage 日志输出块）
 *
 * 专为 tech-geek 主题设计：不再"左竖线+浅底的软卡片"，而是**终端/manpage 输出块**：
 *   - 全宽深底 + 顶部 1px accent 实线（像 `======` manpage 分隔条）
 *   - 标题条独立成行：更深底、左对齐、全大写 + 强字距，无图标，
 *     用 `:: NOTE ::` 括号语法承载"日志标签"的语义重量
 *   - 正文紧贴标题条，inset shadow 制造"输出从这里流出"的终端纵深感
 *   - 零圆角：CRT / manpage 从来不圆
 *
 * 区别于 terminal variant：terminal 是"命令窗"（三色圆点 + 标题栏），
 * manpage-log 是"日志输出块"（无窗口 chrome，只有分隔线 + 状态标签 + 流式正文）。
 */

import type { VariantDef, AdmonitionRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/types'
import { mergeThumb, svg } from '../_thumb'

const KIND_TAG: Record<string, string> = {
  tip: 'NOTE',
  warning: 'CAVEAT',
  info: 'SEE ALSO',
  danger: 'PITFALL',
}

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="4" y="14" width="67" height="47" fill="${soft}"/>` +
      `<rect x="4" y="14" width="67" height="1.5" fill="${accent}"/>` +
      `<rect x="4" y="59.5" width="67" height="1.5" fill="${accent}"/>` +
      `<rect x="4" y="20" width="67" height="9" fill="#0a0807"/>` +
      `<rect x="10" y="23" width="18" height="3" fill="${accent}"/>` +
      `<rect x="10" y="36" width="48" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="43" width="42" height="2" fill="#c0c6cf"/>` +
      `<rect x="10" y="50" width="36" height="2" fill="#c0c6cf"/>`,
  )
}

const manpageLog: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'manpage-log',
    kind: 'admonition',
    name: 'manpage 输出',
    description: '顶底分隔线 + 状态标签条，终端日志输出感',
    themeCompat: ['tech-geek'],
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-manpage-log',
      name: 'manpage NOTE',
      description: '工程附注，日志输出块',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#a8c08a', soft: '#1e1f16' },
      markdown: '::: tip 这是一条工程附注 variant=manpage-log\n正文会以日志输出的形式贴在状态条下方。\n:::\n',
    },
    {
      presetId: 'ad-warning-manpage-log',
      name: 'manpage CAVEAT',
      description: '告诫，橙色状态条',
      admonitionKind: 'warning',
      thumbArgs: { accent: '#e06a28', soft: '#1e1a14' },
      markdown: '::: warning 这行会改全局状态 variant=manpage-log\n谨慎使用。\n:::\n',
    },
    {
      presetId: 'ad-danger-manpage-log',
      name: 'manpage PITFALL',
      description: '典型陷阱',
      admonitionKind: 'danger',
      thumbArgs: { accent: '#c85a3a', soft: '#1f1612' },
      markdown: '::: danger 典型陷阱 variant=manpage-log\n某个 edge case 下会炸栈。\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const padX = ctx.tokens.spacing.containerPadding
    const tag = KIND_TAG[kind] ?? kind.toUpperCase()
    const title = ctx.info.trim()
    // 标题条：深底（比 soft 再深一档，用 palette.bg）+ accent 标签 + 内容标题
    // 用户没写 title 就只显示 `:: TAG ::`；写了就 `:: TAG :: 用户文案`
    const labelHtml =
      `<section style="background-color:${ctx.tokens.colors.bg};` +
      `padding:6px ${padX}px;color:${pair.accent};` +
      `font-size:13px;font-weight:600;letter-spacing:2px;` +
      `border-bottom:1px solid ${ctx.tokens.colors.border}">` +
      `:: ${escText(tag)} ::` +
      (title ? `<span style="color:${ctx.tokens.colors.textMuted};` +
        `font-weight:500;letter-spacing:0.6px;margin-left:10px;text-transform:none">` +
        escText(title) + '</span>' : '') +
      '</section>'
    return {
      wrapperCSS:
        `background-color:${pair.soft};` +
        `border-top:1px solid ${pair.accent};` +
        `border-bottom:1px solid ${pair.accent};` +
        `padding:0;` +
        `margin:20px 0;` +
        `border-radius:0;` +
        `box-shadow:inset -14px 0 10px -10px rgba(0,0,0,0.35)`,
      titleCSS: '',
      bodyCSS:
        `color:${ctx.tokens.colors.text};` +
        `padding:12px ${padX}px 14px;` +
        `font-size:14px;` +
        `line-height:1.8;` +
        `letter-spacing:0.6px`,
      svgSlot: labelHtml,
    }
  },
}

export default manpageLog
