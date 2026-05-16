/**
 * steps · step-card
 *
 * 视觉：每个 h3 = 一张浅底卡片（bgSoft + padding + 边角），适合长说明步骤 / SOP。
 * wrapper 仅外框，h3 与 p 的卡片化由主题 elements.h3 / elements.p 承担——这里只
 * 给 wrapper 一个"容器内统一基线节奏"的 padding + 行距。
 *
 * 与 number-circle 的差别：number-circle 期望作者手写编号；step-card 让"卡片本身"
 * 承担分步视觉，编号变得可选。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

const BODY3 =
  '### 准备阶段\n收集材料与团队节奏。\n\n### 执行阶段\n按 SOP 推进，每步验收。\n\n### 复盘阶段\n输出 retrospective 文档。\n'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, soft } = mergeThumb(args ?? {})
  return svg(
    `<rect x="8" y="14" width="59" height="14" fill="${soft}" stroke="${accent}" stroke-width="1"/>` +
      `<rect x="14" y="19" width="22" height="2" fill="${accent}"/>` +
      `<rect x="14" y="24" width="34" height="1.5" fill="#c0c6cf"/>` +
      `<rect x="8" y="32" width="59" height="14" fill="${soft}" stroke="${accent}" stroke-width="1"/>` +
      `<rect x="14" y="37" width="22" height="2" fill="${accent}"/>` +
      `<rect x="14" y="42" width="34" height="1.5" fill="#c0c6cf"/>` +
      `<rect x="8" y="50" width="59" height="14" fill="${soft}" stroke="${accent}" stroke-width="1"/>` +
      `<rect x="14" y="55" width="22" height="2" fill="${accent}"/>`,
  )
}

const stepCard: VariantDef = {
  meta: {
    id: 'step-card',
    kind: 'steps',
    name: '卡片化分步',
    description: '每步独立浅底卡片，长说明步骤',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'st-step-card',
      name: '卡片化分步',
      description: '每步独立浅底卡片，适合长说明 / SOP',
      markdown: '::: steps 执行流程 variant=step-card\n' + BODY3 + ':::\n',
    },
    {
      presetId: 'st-step-card-checklist',
      name: '卡片化 · 上线清单',
      description: '上线 SOP 卡片式清单',
      markdown:
        '::: steps 上线清单 variant=step-card\n' +
        '### 灰度发布\n按 5% / 25% / 100% 三档放量。\n\n' +
        '### 监控告警\n关键指标接告警，p95 延迟与错误率双指标。\n\n' +
        '### 应急预案\n备好回滚脚本与值班联系人。\n' +
        ':::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    const radius = ctx.tokens.radius.sm
    return {
      wrapperCSS: [
        'margin:18px 0',
        `padding:14px 0 4px`,
        `border-top:1px solid ${c.border}`,
      ].join(';'),
      titleCSS: [
        'font-weight:700',
        'font-size:14px',
        `color:${c.textMuted}`,
        'letter-spacing:0.5px',
        'text-transform:uppercase',
        'margin-bottom:10px',
      ].join(';'),
      bodyCSS: [
        `background:${c.bgSoft}`,
        `border-radius:${radius}px`,
        'padding:12px 16px',
      ].join(';'),
    }
  },
}

export default stepCard
