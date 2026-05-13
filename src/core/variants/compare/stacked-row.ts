/**
 * compare · stacked-row（上下堆叠）
 *
 * 375px 小屏上，两栏挤到每栏 ~120px 本就勉强。stacked-row 放弃"并列"的视觉，
 * 改为上下两卡片各占全宽，可读性显著提升。用边 color 区分 pros / cons。
 */

import type { VariantDef, CompareRenderArgs } from '../_core'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="14" width="63" height="20" rx="3" fill="#eef7f0"/>` +
      `<rect x="6" y="14" width="3" height="20" fill="#1a8450"/>` +
      `<rect x="14" y="20" width="28" height="2" fill="#1a8450"/>` +
      `<rect x="14" y="26" width="40" height="2" fill="#c0c6cf"/>` +
      `<rect x="6" y="41" width="63" height="20" rx="3" fill="#fdecea"/>` +
      `<rect x="6" y="41" width="3" height="20" fill="#b42318"/>` +
      `<rect x="14" y="47" width="28" height="2" fill="#b42318"/>` +
      `<rect x="14" y="53" width="36" height="2" fill="#c0c6cf"/>`,
  )
}

const stackedRow: VariantDef<CompareRenderArgs> = {
  meta: {
    id: 'stacked-row',
    kind: 'compare',
    name: '上下堆叠对比',
    description: '两行全宽，小屏可读性高',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cmp-stacked',
      name: '上下堆叠对比',
      description: '两行全宽，小屏可读性高',
      markdown:
        ':::: compare variant=stacked-row\n' +
        '::: pros 优点\n- 要点 1\n- 要点 2\n:::\n' +
        '::: cons 缺点\n- 要点 1\n- 要点 2\n:::\n' +
        '::::\n',
    },
    {
      presetId: 'cmp-stacked-rich',
      name: '上下堆叠 + 段落',
      description: '每栏多段正文时推荐',
      markdown:
        ':::: compare variant=stacked-row\n' +
        '::: pros 方案 A\n一段说明。\n\n- 要点一\n- 要点二\n:::\n' +
        '::: cons 方案 B\n一段说明。\n\n- 要点一\n- 要点二\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx, { slot }) => {
    if (slot === 'wrapper') {
      return { wrapperCSS: `margin:16px 0` }
    }
    const pair =
      slot === 'pros' ? ctx.tokens.colors.status.tip : ctx.tokens.colors.status.danger
    return {
      wrapperCSS:
        `display:block;padding:12px 14px;margin-bottom:8px;` +
        `background-color:${pair.soft};` +
        `border-left:3px solid ${pair.accent};` +
        `border-radius:0 4px 4px 0`,
      titleCSS:
        `font-weight:700;color:${pair.accent};margin-bottom:6px;font-size:14px`,
    }
  },
}

export default stackedRow
