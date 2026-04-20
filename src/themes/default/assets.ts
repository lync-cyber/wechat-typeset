/**
 * default · 专属 SVG 资产
 *
 * 规范 §1.4：default 刻意只保留 4 件 SVG（+ 4 件语义图标 + stepBadge + sectionCorner 备用）。
 * 核心纪律：
 *   - 不做古籍云纹 / 器皿几何 / K 线 / 终端 § / 巨引号 / 定理框 / issue stamp（各 committed 主题已占）
 *   - 不做任何 emoji 式图标（🎯 💡 ⚠️）
 *   - 几何化 path、干净、网格对齐；stroke-width ≥ 1.2（光栅后不糊）
 *   - 纯白用 #fefefe；数字 font-size ≥ 14
 *   - **不导出 quoteMark**：规范 §2.6 明确 default 的 quoteCard 故意留白，不放引号 SVG
 *   - **不导出 dividerWave / dividerFlower（TODO 暂留）**：规范 §1.4 要求三档分割线"全部退一档装饰强度"，
 *     default 主变体是 rule；wave/dots/flower 保留，但风格已按规范"退一档"重画
 */

import type { ThemeAssets } from '../types'
import { strip } from '../_shared/svgLib'

export interface DefaultPalette {
  primary: string
  border: string
  textInverse: string
  tipAccent: string
  warningAccent: string
  infoAccent: string
  dangerAccent: string
}

export function defaultAssets(p: DefaultPalette): ThemeAssets {
  // ---------- h2Prefix：3×16 单竖条（规范 §1.4 保留 1） ---------- //
  // 规范纪律：删掉原"主条 4px + 辅条 3px opacity 0.6"的工业仪表盘结构，只留一根 3×16。
  // 参照坐标：Medium 默认视图 h2 左侧单根色线。
  const h2Prefix = strip(`
    <svg viewBox="0 0 3 20" width="3" height="16" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:8px">
      <rect x="0" y="0" width="3" height="20" fill="${p.primary}"/>
    </svg>
  `)

  // ---------- dividerWave：stroke-width 1.2 的单根正弦（规范 §1.4 保留 2） ---------- //
  // 规范纪律：当前 1.5 降到 1.2，"更手松、更不抢戏"。色沿用 border（不走 primary）。
  const dividerWave = strip(`
    <svg viewBox="0 0 240 12" width="220" height="12" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,6 Q15,0 30,6 T60,6 T90,6 T120,6 T150,6 T180,6 T210,6 T240,6"
            fill="none" stroke="${p.border}" stroke-width="1.2"/>
    </svg>
  `)

  // ---------- dividerDots：3 颗圆点居中（规范 §1.4 保留 3） ---------- //
  // 规范纪律：当前 4 点（60/100/140/180）降到 3 点（96/120/144）——
  // 4 点已接近虚线节奏，3 点才是"三颗排布"的装饰节奏；更疏朗、更中性。
  const dividerDots = strip(`
    <svg viewBox="0 0 240 8" width="220" height="8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="96" cy="4" r="2" fill="${p.border}"/>
      <circle cx="120" cy="4" r="2" fill="${p.border}"/>
      <circle cx="144" cy="4" r="2" fill="${p.border}"/>
    </svg>
  `)

  // ---------- dividerFlower：两线 + 中央单圆点（规范 §1.4 保留 4） ---------- //
  // 规范纪律：去掉原中央菱形（`M120,2 L124,9 L120,16 L116,9 Z` 菱形）和两侧小辅助点。
  // 原菱形有"中国结装饰"的隐含联想；留"两条线 + 一个点"= Medium/Substack 通用的 ornamental break。
  const dividerFlower = strip(`
    <svg viewBox="0 0 240 10" width="220" height="10" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="5" x2="110" y2="5" stroke="${p.border}" stroke-width="1"/>
      <line x1="130" y1="5" x2="240" y2="5" stroke="${p.border}" stroke-width="1"/>
      <circle cx="120" cy="5" r="3" fill="${p.primary}"/>
    </svg>
  `)

  // ---------- sectionCorner：2px 细描边 L（规范 §1.4 保留 5 · 可选） ---------- //
  // 规范纪律：从 4px 实心 L 改到 2px stroke 空心 L。
  // 粗实心 L 有"财经角标 / 观察卡角标"味（industry 家族）；细描边版本 = Notion/Substack 可选列表标记。
  const sectionCorner = strip(`
    <svg viewBox="0 0 14 14" width="12" height="12" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M1,1 L13,1 M1,1 L1,13" fill="none" stroke="${p.primary}" stroke-width="2" stroke-linecap="square"/>
    </svg>
  `)

  // ---------- 语义图标：四态同形（规范 §2.10-2.13） ---------- //
  // 规范纪律：四态**故意同骨架**——左 3px 色条 + 浅底 + 图标，只靠色相区分。
  // 图标本身风格统一：线宽 1.5、stroke 空心、16×16 viewBox。

  // tipIcon：圆圈 + i（规范 §2.7）
  const tipIcon = strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="8" cy="8" r="6" fill="none" stroke="${p.tipAccent}" stroke-width="1.5"/>
      <circle cx="8" cy="5" r="0.9" fill="${p.tipAccent}"/>
      <rect x="7.25" y="7" width="1.5" height="5" rx="0.4" fill="${p.tipAccent}"/>
    </svg>
  `)

  // infoIcon：圆圈 + i（规范 §2.8 info = primary 色）
  const infoIcon = strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="8" cy="8" r="6" fill="none" stroke="${p.infoAccent}" stroke-width="1.5"/>
      <circle cx="8" cy="5" r="0.9" fill="${p.infoAccent}"/>
      <rect x="7.25" y="7" width="1.5" height="5" rx="0.4" fill="${p.infoAccent}"/>
    </svg>
  `)

  // warningIcon：三角形 + !（规范 §2.9）
  const warningIcon = strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M8,2 L14.5,13.5 L1.5,13.5 Z" fill="none" stroke="${p.warningAccent}" stroke-width="1.5" stroke-linejoin="round"/>
      <rect x="7.25" y="6" width="1.5" height="4" rx="0.4" fill="${p.warningAccent}"/>
      <circle cx="8" cy="11.5" r="0.9" fill="${p.warningAccent}"/>
    </svg>
  `)

  // dangerIcon：实心圆 + 白色横线（规范 §2.10）
  // 横线用 #fefefe 规避公众号 SVG→PNG 把 #fff 透明化
  const dangerIcon = strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="8" cy="8" r="6" fill="${p.dangerAccent}"/>
      <rect x="3" y="7" width="10" height="2" fill="${p.textInverse}"/>
    </svg>
  `)

  // ---------- stepBadge：实心圆 + 白数字（规范 §1.4 保留 6） ---------- //
  // 规范纪律：font-size 从 15 降到 14（仍满足光栅 ≥ 14），"更小更步骤标签、不似大号编号"。
  // 白数字用 #fefefe 规避 SVG→PNG 纯白透明化。
  const stepBadge = (n: number) => strip(`
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:8px">
      <circle cx="12" cy="12" r="11" fill="${p.primary}"/>
      <text x="12" y="17" text-anchor="middle" font-size="14" font-weight="700" fill="${p.textInverse}">${n}</text>
    </svg>
  `)

  return {
    h2Prefix,
    dividerWave,
    dividerDots,
    dividerFlower,
    sectionCorner,
    tipIcon,
    warningIcon,
    infoIcon,
    dangerIcon,
    stepBadge,
    // 规范 §2.6 明确：default 的 quoteCard **不放** quoteMark SVG（其他主题签名动作）
    // 通过**不导出** quoteMark，classic variant 会走字符回退 `「`（span with opacity），
    // 这是 CSS-styled 文字而非装饰 SVG——尊重规范"故意留白"纪律，同时不破坏 infra
  }
}
