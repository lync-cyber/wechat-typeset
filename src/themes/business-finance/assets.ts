/**
 * business-finance · 专属 SVG 资产（规范 §1.3 SVG motif）
 *
 * 视觉语言：**研报图表 & 内参装帧**，不是"涨跌箭头"廉价暗示。
 *
 * 保留的瑰宝（规范 §1.3）：
 *   - dividerWave · K 线柱状分割线 —— 全项目单件最强资产
 *     精修：前 5 根压 + 后 4 根反弹的 V 型走势 / 涨柱走 danger 红 / stroke 0.8 → 1.0
 *   - h2Prefix · legend 色块 + 辅横条 —— 几何微调（主块 3×13 更瘦，辅块 14×3 更细）
 *   - sectionCorner · L 形直角 —— accent 方块 4×4 → 3×3 更克制
 *   - stepBadge · 正方形钤印 —— primary 栗墨底 + accent 琥珀底条 + #fefefe 数字
 *
 * 重做（规范 §1.3）：
 *   - dividerFlower · 章节编号 Sec. I —— 双线夹中央 text 标签，替代旧"中心方块+横线"
 *   - dividerDots · 6 方块 → 3 方块，红/蓝/红 交替
 *   - quoteMark · 保留方头几何，primary 栗墨色（旧红让位）
 *
 * 四态图标形状差异化（规范 §1.3 四态骨架）：
 *   - tipIcon: 方框 + ✓（两笔折线）—— 建议采纳
 *   - warningIcon: 方框 + !（上长下短）—— 当前方向保留
 *   - infoIcon: 方框 + i（上点下长）—— 和 warning 视觉镜像
 *   - dangerIcon: 方框 + ×（两笔交叉）—— 勘误感
 *
 * 导出 11 件资产。严守平台约束：无 id / 无 url 引号 / `<text>` 不声 font-family /
 * 光栅字号 ≥ 14 / 纯白用 #fefefe。
 */

import type { ThemeAssets } from '../types'
import { strip, type ExtendedPalette } from '../_shared/svgLib'

/** business-finance 专属 palette：在 ExtendedPalette 基础上多一项 textMuted（dividerFlower 文字色）。 */
interface BFPalette extends ExtendedPalette {
  textMuted: string
}

export function businessFinanceAssets(p: BFPalette): ThemeAssets {
  // ---------- ① h2Prefix · legend 色块 + 辅横条（规范 §1.3 ②） ---------- //
  // 规范原文：主块 3×13 primary 深栗墨 + 辅块 14×3 secondary opacity 0.75
  //   几何比旧版更瘦更细，像 figure legend 的"方块 + 标签线"
  const h2Prefix = strip(`
    <svg viewBox="0 0 18 18" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:8px">
      <rect x="0" y="2" width="3" height="13" fill="${p.primary}"/>
      <rect x="4" y="7" width="14" height="3" fill="${p.secondary}" opacity="0.75"/>
    </svg>
  `)

  // ---------- ② dividerWave · K 线 V 型走势（规范 §1.3 ① 瑰宝精修） ---------- //
  // 规范原文：前 5 根下压 + 后 4 根反弹的 V 型（触底回升）；涨柱走 danger 红 #9a1b20，
  //   阴柱走 secondary 蓝 #0e3654；柱宽 4px 保留；stroke 0.8 → 1.0。
  // 柱体中心高度：6 → 8 → 10 → 12 → 14（V 底） → 12 → 10 → 8 → 6（反弹顶）
  // 红蓝交替：1 红 2 蓝 3 红 4 蓝 5 红 6 蓝 7 红 8 蓝 9 红
  const dividerWave = strip(`
    <svg viewBox="0 0 240 20" width="220" height="20" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="10" x2="240" y2="10" stroke="${p.border}" stroke-width="0.8"/>
      ${[
        { x: 70, cy: 6, color: p.dangerAccent },
        { x: 82, cy: 8, color: p.secondary },
        { x: 94, cy: 10, color: p.dangerAccent },
        { x: 106, cy: 12, color: p.secondary },
        { x: 118, cy: 14, color: p.dangerAccent },
        { x: 130, cy: 12, color: p.secondary },
        { x: 142, cy: 10, color: p.dangerAccent },
        { x: 154, cy: 8, color: p.secondary },
        { x: 166, cy: 6, color: p.dangerAccent },
      ]
        .map(({ x, cy, color }) => {
          const h = 4
          const top = cy - h / 2
          // 影线：柱体上下各延伸 2px
          const shadowTop = cy - h / 2 - 2
          const shadowBot = cy + h / 2 + 2
          return (
            `<line x1="${x + 2}" y1="${shadowTop}" x2="${x + 2}" y2="${shadowBot}" stroke="${color}" stroke-width="1.0"/>` +
            `<rect x="${x}" y="${top}" width="4" height="${h}" fill="${color}"/>`
          )
        })
        .join('')}
    </svg>
  `)

  // ---------- ③ dividerDots · 紧凑 3 方块（规范 §1.3 ⑥） ---------- //
  // 规范原文：6 方块降到 3，居中，红/蓝/红 交替
  //   用于段落间紧凑停顿，频率较低
  const dividerDots = strip(`
    <svg viewBox="0 0 240 10" width="220" height="10" xmlns="http://www.w3.org/2000/svg">
      <rect x="108" y="3" width="4" height="4" fill="${p.dangerAccent}"/>
      <rect x="118" y="3" width="4" height="4" fill="${p.secondary}"/>
      <rect x="128" y="3" width="4" height="4" fill="${p.dangerAccent}"/>
    </svg>
  `)

  // ---------- ④ dividerFlower · 章节编号 Sec. I（规范 §1.3 ⑤） ---------- //
  // 规范原文：双线夹中央 text 标签"Sec.I"，替代旧"中心方块+横线"
  //   左右各一根 1px border 细线（92px），中央 text letter-spacing 1.5px
  //   编号默认 "Sec. I"（规范支持后续通过 attrs / 递增扩展）
  //   viewBox 高 20，font-size 14 光栅后仍 ≥ 14 —— 纪律
  const dividerFlower = strip(`
    <svg viewBox="0 0 240 20" width="220" height="16" xmlns="http://www.w3.org/2000/svg">
      <line x1="4" y1="10" x2="96" y2="10" stroke="${p.border}" stroke-width="1"/>
      <line x1="144" y1="10" x2="236" y2="10" stroke="${p.border}" stroke-width="1"/>
      <text x="120" y="14" text-anchor="middle" font-size="14" font-weight="600"
            fill="${p.textMuted}" letter-spacing="1.5">Sec. I</text>
    </svg>
  `)

  // ---------- ⑤ quoteMark · 方头锐利引号（规范 §1.3 ⑦） ---------- //
  // 规范原文：保留方头几何（M4,6 L4,14 ...），primary 栗墨色（旧红让位）
  //   放在 quoteCard 左上角 inline-block + margin-right 8px
  const quoteMark = strip(`
    <svg viewBox="0 0 40 32" width="34" height="28" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:top;margin-right:4px">
      <path d="M4,6 L4,14 L8,14 L8,20 L14,20 L14,6 Z M22,6 L22,14 L26,14 L26,20 L32,20 L32,6 Z"
            fill="${p.primary}" opacity="0.5"/>
    </svg>
  `)

  // ---------- ⑥ sectionCorner · L 形直角（规范 §1.3 ③） ---------- //
  // 规范原文：accent 方块 4×4 → 3×3（更克制）
  //   配合 sectionTitle 的 cornered variant
  const sectionCorner = strip(`
    <svg viewBox="0 0 18 18" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M0,0 L6,0 L6,3 L3,3 L3,18 L0,18 Z" fill="${p.primary}"/>
      <rect x="9" y="14" width="3" height="3" fill="${p.accent}"/>
    </svg>
  `)

  // ---------- ⑦-⑩ 四态图标（规范 §1.3 四态骨架，形状差异化） ---------- //
  const iconSquare = (color: string, inner: string) => strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <rect x="1" y="1" width="14" height="14" fill="none" stroke="${color}" stroke-width="1.5"/>
      ${inner}
    </svg>
  `)

  // tip · ✓（两笔折线）—— "要点 · 建议采纳"
  const tipIcon = iconSquare(
    p.tipAccent,
    `<path d="M4,8 L7,11 L12,5" fill="none" stroke="${p.tipAccent}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  )

  // warning · !（上长下短 —— 旧版保留方向）
  const warningIcon = iconSquare(
    p.warningAccent,
    `<rect x="7" y="3" width="2" height="7" fill="${p.warningAccent}"/>` +
      `<rect x="7" y="11" width="2" height="2" fill="${p.warningAccent}"/>`,
  )

  // info · i（上短下长 —— 与 warning 视觉镜像）
  const infoIcon = iconSquare(
    p.infoAccent,
    `<rect x="7" y="3" width="2" height="2" fill="${p.infoAccent}"/>` +
      `<rect x="7" y="6" width="2" height="7" fill="${p.infoAccent}"/>`,
  )

  // danger · ×（两笔交叉 —— 勘误感）
  const dangerIcon = iconSquare(
    p.dangerAccent,
    `<path d="M4,4 L12,12 M12,4 L4,12" fill="none" stroke="${p.dangerAccent}" stroke-width="1.8" stroke-linecap="round"/>`,
  )

  // ---------- ⑪ stepBadge · 正方形钤印（规范 §1.3 ④） ---------- //
  // 规范原文：primary 栗墨底（旧红已让位）+ 底部 3px accent 琥珀条 + #fefefe 数字
  //   viewBox 24×24，font-size=15 ≥ 14 光栅下限；数字色 #fefefe 规避平台透明化
  const stepBadge = (n: number) => strip(`
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:8px">
      <rect x="1" y="1" width="22" height="22" fill="${p.primary}"/>
      <rect x="1" y="20" width="22" height="3" fill="${p.accent}"/>
      <text x="12" y="16" text-anchor="middle" font-size="15" font-weight="700" fill="${p.textInverse}">${n}</text>
    </svg>
  `)

  return {
    h2Prefix,
    dividerWave,
    dividerDots,
    dividerFlower,
    quoteMark,
    sectionCorner,
    tipIcon,
    warningIcon,
    infoIcon,
    dangerIcon,
    stepBadge,
  }
}
