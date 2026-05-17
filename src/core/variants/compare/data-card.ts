/**
 * compare · data-card（数据卡）
 *
 * data-brief 家族签名：顶 3px primary/danger 色条 + bgSoft 底 + 标签 kicker +
 * 大号 monospace 数字 + 小字 caption。视觉气质：晚点 / 财新数据的"纸 本 +37% / 屏 读 +210%"
 * 横向对比卡，区别于 ledger 的"绿/红双色块整面平铺"。
 *
 * 实现纪律：
 *   - 保留 column-card 的 display:table 骨架（避开 flex/grid 在公众号粘贴期被剥）
 *   - pros = primary 蓝顶条（"正面/基线"），cons = danger 红顶条（"反面/异常"）
 *   - 内部 padding 偏紧（12px 横向 + 10–12 纵向）以贴近设计稿数据卡密度
 *   - bgSoft 底 + 无圆角 + 内部无边框分割 —— 全部交给顶部色条做语义
 *   - titleCSS 渲染 "纸 本"/"屏 读" 小字 kicker
 *   - **首选**：作者用 `value="…"` + `caption="…"` 两个 attr 让 variant 自己排"大号
 *     数字 + 小字说明"——结构稳，不被 markdown 段落 `<p>` 吞掉 `display:block`。
 *     body 内容（如果作者非要写）仍渲染，作为 secondary slot。
 *   - **fallback**：作者也可以在 body 里写 inline `<span style="...">+37%</span>`，
 *     但 markdown 会把它包进 `<p>`，破坏块级排版——保留兼容但不推荐。
 */

import type { VariantDef, CompareRenderArgs } from '../_core'
import { escText } from '../../pipeline/containers/_shared/escape'
import { svg } from '../_thumb'

function thumb(): string {
  return svg(
    `<rect x="6" y="14" width="29" height="46" fill="#f5f7fa"/>` +
      `<rect x="38" y="14" width="29" height="46" fill="#f5f7fa"/>` +
      `<rect x="6" y="14" width="29" height="3" fill="#1756d1"/>` +
      `<rect x="38" y="14" width="29" height="3" fill="#b22d18"/>` +
      `<rect x="11" y="22" width="10" height="2" fill="#5a6068"/>` +
      `<rect x="43" y="22" width="10" height="2" fill="#5a6068"/>` +
      `<rect x="11" y="32" width="18" height="6" fill="#111418"/>` +
      `<rect x="43" y="32" width="18" height="6" fill="#111418"/>` +
      `<rect x="11" y="48" width="20" height="2" fill="#5a6068"/>` +
      `<rect x="43" y="48" width="20" height="2" fill="#5a6068"/>`,
  )
}

const dataCard: VariantDef<CompareRenderArgs> = {
  meta: {
    id: 'data-card',
    kind: 'compare',
    name: '数据卡对比',
    description: '顶 3px 色条 + 大号数字，data-brief 签名',
  },
  thumbnail: thumb,
  snippets: [
    {
      presetId: 'cmp-data-card',
      name: '数据卡对比',
      description: 'data-brief 数据卡：顶蓝/红色条 + 大号数字',
      markdown:
        ':::: compare variant=data-card\n' +
        '::: pros 纸 本 value="+37%" caption="深度理解得分"\n:::\n' +
        '::: cons 屏 读 value="+210%" caption="跳读切换次数"\n:::\n' +
        '::::\n',
    },
  ],
  render: (ctx, { slot }) => {
    if (slot === 'wrapper') {
      // 外层 table：等宽两栏；border-spacing 留出 8px 横向间隙，让两卡顶条独立
      return {
        wrapperCSS:
          `display:table;width:100%;table-layout:fixed;` +
          `border-spacing:8px 0;border-collapse:separate;` +
          `margin:16px 0`,
      }
    }
    const c = ctx.tokens.colors
    // pros 走 primary（数据蓝，"基线/正面"），cons 走 danger（红，"对照/异常"）
    const topColor = slot === 'pros' ? c.primary : c.status.danger.accent
    // attrs 走预格式化的"大号数字 + 小字说明"路径——结构稳，不被 markdown <p> 吞
    const value = (ctx.attrs.value ?? '').trim()
    const caption = (ctx.attrs.caption ?? '').trim()
    const title = ctx.info.trim()
    if (value || caption) {
      // 给了 attrs：variant 全权接管 title + value + caption 三段渲染。
      // compare.ts 默认会先吐 svgSlot 再吐 default title——我们把整体顺序压到 svgSlot 内、
      // 用 titleCSS='' 抑制默认 title，确保产出顺序：label → value → caption。
      const titleEl = title
        ? `<section class="container-${slot}__title" style="font-size:10px;font-weight:400;color:${c.textMuted};letter-spacing:0.1em;margin-bottom:6px">${escText(title)}</section>`
        : ''
      const valueEl = value
        ? `<section class="container-${slot}__value" style="font-size:22px;font-weight:700;color:${c.text};line-height:1;margin-bottom:4px;letter-spacing:-0.01em">${escText(value)}</section>`
        : ''
      const captionEl = caption
        ? `<section class="container-${slot}__caption" style="font-size:10px;color:${c.textMuted};line-height:1.5">${escText(caption)}</section>`
        : ''
      return {
        wrapperCSS:
          `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;` +
          `padding:12px 12px 10px;background-color:${c.bgSoft};` +
          `border-top:3px solid ${topColor};border-radius:0`,
        titleCSS: '',
        svgSlot: titleEl + valueEl + captionEl,
      }
    }
    return {
      wrapperCSS:
        `display:table-cell;vertical-align:top;width:50%;box-sizing:border-box;` +
        `padding:12px 12px 10px;background-color:${c.bgSoft};` +
        `border-top:3px solid ${topColor};border-radius:0`,
      titleCSS:
        // 小字 kicker（"纸 本"/"屏 读" 类标签）：textMuted + 字距宽 + 间距小
        `font-size:10px;font-weight:400;color:${c.textMuted};` +
        `letter-spacing:0.1em;margin-bottom:6px`,
    }
  },
}

export default dataCard
