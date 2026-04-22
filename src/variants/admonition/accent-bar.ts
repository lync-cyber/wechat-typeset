/**
 * admonition · accent-bar（v2 · 五态差异化皮肤）
 *
 * 旧实现：左 3px 色条 + soft 底——四态同骨架只换色，是 AI slop 的典型。
 * 现在改为：同一 variant 内按 kind 产出四种**形态差异化**皮肤，摆脱
 * "左竖条 + 浅底方框"的工业矩阵：
 *
 *   - tip     → 气泡式不对称圆角 + 纯 soft 底，轻盈引导
 *   - warning → 顶虚线 + 底实线（双层警戒带）+ 斜切圆角，警觉但不刺眼
 *   - info    → 1px 全边框 + 顶端 2px inset accent + 柔阴影，知识卡片浮起
 *   - danger  → 顶端 8px accent 实条 + 全边框 + 零圆角，强迫性紧迫
 *
 * 为什么不拆成四个独立 variant：
 *   variant 选择是**主题级**决定（theme.variants.admonition: 'accent-bar'）。
 *   一个主题声明 variant 后，四态要在这一个 variant 内都能工作。拆开等于
 *   强迫主题作者为每 kind 单独选皮肤，违反"主题一次性签名"的设计。
 *   差异化交给 render 分支——同一 variant id，四种形态。
 *
 * 仍然是 DEFAULT_VARIANTS.admonition 的兜底：主题不声明 variants 时即用此。
 */

import type { VariantDef, AdmonitionRenderArgs, AdmonitionKind } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  // 合成缩略图：左上角气泡圆角（tip）+ 右下角硬角（danger）暗示"四态差异"
  return svg(
    `<rect x="6" y="14" width="63" height="47" rx="12" fill="${soft}"/>` +
      `<rect x="59" y="51" width="10" height="10" fill="${soft}"/>` +
      `<rect x="6" y="14" width="63" height="3" fill="${accent}"/>` +
      `<rect x="16" y="24" width="30" height="3" fill="${accent}"/>` +
      `<rect x="16" y="34" width="46" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="41" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="16" y="48" width="32" height="2" fill="#c0c6cf"/>`,
  )
}

/** 按 kind 分派四种差异化皮肤。所有分支共用 padY/padX 保证节奏一致。 */
function renderForKind(
  kind: AdmonitionKind,
  pair: { accent: string; soft: string },
  bg: string,
  padY: number,
  padX: number,
  radius: number,
): { wrapperCSS: string; titleCSS: string } {
  if (kind === 'tip') {
    // 轻盈引导：气泡式不对称圆角（左上+右下大、右上+左下小）+ 柔阴影
    return {
      wrapperCSS:
        `background-color:${pair.soft};` +
        `padding:${padY}px ${padX}px;` +
        `border-radius:${radius * 4}px ${radius}px ${radius * 4}px ${radius}px;` +
        `box-shadow:0 2px 6px rgba(0,0,0,0.04);` +
        `margin:16px 0`,
      titleCSS:
        `font-size:14px;font-weight:700;color:${pair.accent};` +
        `margin-bottom:6px;letter-spacing:0.3px`,
    }
  }
  if (kind === 'warning') {
    // 警觉但不刺眼：上虚线 + 下实线（双层警戒带）+ 对角斜切圆角（右上/左下）
    return {
      wrapperCSS:
        `background-color:${pair.soft};` +
        `border-top:1px dashed ${pair.accent};` +
        `border-bottom:2px solid ${pair.accent};` +
        `padding:${padY}px ${padX}px;` +
        `border-radius:0 ${radius * 3}px 0 ${radius * 3}px;` +
        `margin:16px 0`,
      titleCSS:
        `font-size:14px;font-weight:700;color:${pair.accent};` +
        `margin-bottom:6px;letter-spacing:1px`,
    }
  }
  if (kind === 'info') {
    // 中性知识：白底卡片 + 1px 全边框 + 顶端 inset accent + 柔阴影
    return {
      wrapperCSS:
        `background-color:${bg};` +
        `border:1px solid ${pair.soft};` +
        `box-shadow:inset 0 2px 0 ${pair.accent}, 0 1px 3px rgba(0,0,0,0.03);` +
        `padding:${padY + 2}px ${padX}px ${padY}px;` +
        `border-radius:${radius * 2}px;` +
        `margin:18px 0`,
      titleCSS:
        `font-size:14px;font-weight:700;color:${pair.accent};` +
        `margin-bottom:6px;letter-spacing:0.3px`,
    }
  }
  // danger：顶端 8px accent 实条 + 全边框 + 零圆角（硬紧迫）
  return {
    wrapperCSS:
      `background-color:${pair.soft};` +
      `border:1px solid ${pair.accent};` +
      `border-top:8px solid ${pair.accent};` +
      `padding:${padY}px ${padX}px;` +
      `border-radius:0;` +
      `margin:18px 0`,
    titleCSS:
      `font-size:14px;font-weight:800;color:${pair.accent};` +
      `margin-bottom:6px;letter-spacing:1.5px;text-transform:uppercase`,
  }
}

const accentBar: VariantDef<AdmonitionRenderArgs> = {
  meta: {
    id: 'accent-bar',
    kind: 'admonition',
    name: '差异皮肤',
    description: '四态各具形态：气泡/警戒带/卡片浮起/硬边紧迫',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'ad-tip-accent-bar',
      name: '差异皮肤 Tip',
      description: '气泡式不对称圆角 + soft 底，轻盈引导',
      admonitionKind: 'tip',
      thumbArgs: { accent: '#1a8450', soft: '#eef7f0' },
      markdown: '::: tip 小贴士 variant=accent-bar\n正文内容\n:::\n',
    },
    {
      presetId: 'ad-warning-accent-bar',
      name: '差异皮肤 Warning',
      description: '上虚下实双警戒带 + 斜切圆角',
      admonitionKind: 'warning',
      thumbArgs: { accent: '#b7791f', soft: '#fdf6e3' },
      markdown: '::: warning 注意 variant=accent-bar\n正文内容\n:::\n',
    },
    {
      presetId: 'ad-info-accent-bar',
      name: '差异皮肤 Info',
      description: '白底卡片 + 顶端 inset 主色 + 柔阴影',
      admonitionKind: 'info',
      thumbArgs: { accent: '#1a73e8', soft: '#eef4ff' },
      markdown: '::: info 说明 variant=accent-bar\n正文内容\n:::\n',
    },
    {
      presetId: 'ad-danger-accent-bar',
      name: '差异皮肤 Danger',
      description: '顶 8px 实条 + 全边框零圆角，硬紧迫',
      admonitionKind: 'danger',
      thumbArgs: { accent: '#b42318', soft: '#fdecea' },
      markdown: '::: danger 警告 variant=accent-bar\n正文内容\n:::\n',
    },
  ],
  render: (ctx, { kind }) => {
    const pair = ctx.tokens.colors.status[kind]
    const bg = ctx.tokens.colors.bg
    const radius = ctx.tokens.radius.sm
    const padY = Math.max(10, Math.round(ctx.tokens.spacing.containerPadding * 0.75))
    const padX = ctx.tokens.spacing.containerPadding
    return renderForKind(kind, pair, bg, padY, padX, radius)
  },
}

export default accentBar
