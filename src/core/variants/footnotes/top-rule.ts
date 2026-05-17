/**
 * footnotes · top-rule（报纸尾注 / 财经简报底栏）
 *
 * 设计语言：印刷报纸 / WSJ / 财新简报的"END NOTES"栏。
 *   - 单根 hairline 横线 above 收束正文
 *   - 字号 11px、行高 1.55、灰度文字——把信息密度推到顶
 *   - kicker 走 uppercase wide-letter-spacing 的"小标题"模板，靠右压住分隔线
 *   - 无背景、无边框、无圆角——克制到只剩"信息载体"
 *
 * 适合主题：tech-explainer / swiss-grid / business-finance / industry-observer
 * ——任何"事实索引压在文末"的内参 / 简报家族。
 *
 * 与 boxed-aside / dense-academic 的分工：
 *   - boxed-aside    = 卡片化"narrative aside"
 *   - dense-academic = 论文 bibliography 级深 hanging
 *   - top-rule       = 报纸尾注（**本文件**）—— 视觉上最克制的一档
 */

import type { VariantDef } from '../_core'
import { mergeThumb, svg } from '../_thumb'

function thumb(args?: { accent?: string; soft?: string; text?: string }): string {
  const { accent } = mergeThumb(args ?? {})
  return svg(
    `<rect x="6" y="20" width="62" height="0.7" fill="#7a8389"/>` +
      `<text x="6" y="29" font-size="5" fill="${accent}" font-weight="700" letter-spacing="0.8">END NOTES</text>` +
      `<rect x="6" y="34" width="60" height="1.4" fill="#9aa1aa"/>` +
      `<rect x="6" y="40" width="56" height="1.4" fill="#9aa1aa"/>` +
      `<rect x="6" y="46" width="62" height="1.4" fill="#9aa1aa"/>` +
      `<rect x="6" y="52" width="48" height="1.4" fill="#9aa1aa"/>` +
      `<rect x="6" y="58" width="58" height="1.4" fill="#9aa1aa"/>`,
  )
}

const topRule: VariantDef = {
  meta: {
    id: 'top-rule',
    kind: 'footnotes',
    name: '报纸尾注',
    description: '顶部 hairline + 11px 灰字密栏，财新风',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'footnotes-top-rule',
      name: '脚注 · 报纸尾注',
      description: '顶部 hairline 收束 + 紧凑灰字，内参/财经简报底栏',
      markdown:
        '::: footnotes END NOTES variant=top-rule\n' +
        '[1] 数据采集 2023Q4-2024Q3，覆盖一线 + 新一线 32 城。\n' +
        '[2] "30 岁以下"定义见样本说明 §1.2，含 18-29 岁段。\n' +
        ':::\n',
    },
  ],
  render: (ctx) => {
    const c = ctx.tokens.colors
    return {
      wrapperCSS: [
        // 顶部 hairline——本 variant 的唯一硬装饰
        `border-top:1px solid ${c.border}`,
        `padding:12px 0 4px 0`,
        // 报纸密栏字号
        `font-size:11px`,
        `line-height:1.55`,
        `color:${c.textMuted}`,
      ].join(';'),
      titleCSS: [
        // 小尾注题：左对齐 + uppercase + wide-letter
        // "参考文献" / "参考来源 · References" 在中文阅读习惯里期望左对齐；
        // 早期 variant 作者写 text-align:right 是局部审美选择，与作者文案不匹配，已移除。
        `display:block`,
        `font-size:10px`,
        `font-weight:700`,
        `letter-spacing:0.22em`,
        `text-transform:uppercase`,
        `color:${c.primary}`,
        `margin:0 0 10px 0`,
        `text-indent:0`,
      ].join(';'),
    }
  },
}

export default topRule
