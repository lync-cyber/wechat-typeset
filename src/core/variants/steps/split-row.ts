/**
 * steps · split-row
 *
 * 视觉：左侧 4px 主色实线 + 内左 hairline。利用 h3 的"较大字号 + 内左 padding-left"
 * 让作者写 `### 01 准备` 时，编号 + 标题在视觉上像"左列编号 / 右列正文"的两栏。
 * 学术 / 调研主题骨架。
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

const BODY3 =
  '### 01 收集背景\n阅读 5 篇文献，提炼共识与争议点。\n\n### 02 提出假设\n基于共识与争议点形成可验证假设。\n\n### 03 设计实验\n选择对照组、自变量与样本量。\n'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent, text } = mergeThumb(args ?? {})
  return svg(
    `<rect x="10" y="14" width="3" height="48" fill="${accent}"/>` +
      `<text x="18" y="24" font-size="6" font-weight="700" fill="${text}">01</text>` +
      `<rect x="30" y="20" width="35" height="2" fill="${text}"/>` +
      `<rect x="30" y="26" width="28" height="1.5" fill="#c0c6cf"/>` +
      `<text x="18" y="40" font-size="6" font-weight="700" fill="${text}">02</text>` +
      `<rect x="30" y="36" width="32" height="2" fill="${text}"/>` +
      `<rect x="30" y="42" width="26" height="1.5" fill="#c0c6cf"/>` +
      `<text x="18" y="56" font-size="6" font-weight="700" fill="${text}">03</text>` +
      `<rect x="30" y="52" width="30" height="2" fill="${text}"/>`,
  )
}

const splitRow: VariantDef = {
  meta: {
    id: 'split-row',
    kind: 'steps',
    name: '左右分栏分步',
    description: '左竖条 + 左编号 / 右正文两栏感',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'st-split-row',
      name: '左右分栏分步',
      description: '左侧主色实线 + 左编号 / 右正文，学术调研骨架',
      markdown: '::: steps 研究流程 variant=split-row\n' + BODY3 + ':::\n',
    },
    {
      presetId: 'st-split-row-checklist',
      name: '分栏 · 任务清单',
      description: '编号 + 描述的任务清单',
      markdown:
        '::: steps 项目任务 variant=split-row\n' +
        '### 01 立项\n输出 RFC 与负责人。\n\n' +
        '### 02 开发\n按 milestone 推进，2 周一节点。\n\n' +
        '### 03 上线\n灰度 + 监控 + 应急。\n' +
        ':::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        'margin:18px 0',
        `padding:8px 0 8px 16px`,
        `border-left:4px solid ${c.primary}`,
        `box-shadow:inset 1px 0 0 ${c.border}`,
      ].join(';'),
      titleCSS: [
        'font-weight:700',
        'font-size:14px',
        `color:${c.textMuted}`,
        'text-transform:uppercase',
        'letter-spacing:1px',
        'margin-bottom:8px',
      ].join(';'),
    }
  },
}

export default splitRow
