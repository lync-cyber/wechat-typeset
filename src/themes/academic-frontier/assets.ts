/**
 * academic-frontier · 专属 SVG 资产
 *
 * 视觉语言（规范 §1.3）：**无装饰是纪律**。三件资产，每件都承担结构而非装饰：
 *   - theoremMark ■：QED 结束符（quoteCard 定理框右下角 + highlight Finding 末尾）
 *   - rule 横规：极细 1px 水平线（divider 默认）
 *   - glyph ⁂ 三星号：章节间 scene break（全文 ≤ 1 次）
 *
 * 故意**不做**的（规范 §1.3 "必删"）：
 *   - dividerWave / dividerFlower —— fallback 到 rule / dots
 *   - quoteMark 大引号 —— 学术 quote 不做装饰引号
 *   - 任何 emoji / icon / 曲线 / 渐变
 *
 * 核心纪律：
 *   - primary 深靛 (#1e2c4a) 用于 h2 左竖线 / theoremMark / 定理框顶栏
 *   - accent 深酒红 (#8a2a2a) 只出现三处（danger / Finding / DOI 锚色），
 *     assets 层只参与 dangerIcon（其他两处在容器 CSS 层）
 *   - stepBadge 不走圆徽章（number-circle variant）——本主题 steps 走 numbered-points
 *     文字编号。但 ThemeAssets.stepBadge 仍需要字符串（契约）——给极简罗马占位
 *   - 所有 SVG 无 id / 无 style / 无 url / <text> 不声 font-family / stroke-width ≥ 1
 *
 * 导出：h2Prefix（1px 竖线） + sectionCorner（极简 1px L） + dividerDots（三点） +
 *       dividerWave（fallback 退化成 rule 风） + dividerFlower（退化 ⁂ 三星号） +
 *       stepBadge（文字式占位，不走圆徽章）+ 四态图标（最小几何）
 */

import type { ThemeAssets } from '../types'
import { strip } from '../_shared/svgLib'

export interface AcademicFrontierPalette {
  primary: string
  secondary: string
  accent: string
  border: string
  textMuted: string
  textInverse: string
  tipAccent: string
  warningAccent: string
  infoAccent: string
  dangerAccent: string
}

export function academicFrontierAssets(p: AcademicFrontierPalette): ThemeAssets {
  // ---------- h2Prefix · 1px 深靛竖线（规范 §1.3 ①） ---------- //
  // 规范原文："如果实现层坚持要 SVG 资产：那就是一根 1px 宽 × 16px 高的 primary 色实线"
  // 极简到不能再简——学术排印不给章节加装饰
  const h2Prefix = strip(`
    <svg viewBox="0 0 2 16" width="2" height="16" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:10px">
      <rect x="0" y="1" width="2" height="14" fill="${p.primary}"/>
    </svg>
  `)

  // ---------- sectionCorner · 极简 L 形直角（规范 §1.3 ③ figureCorner） ---------- //
  // 规范原文：viewBox 14×14，两条 1px 线组成 L 形，色 border。
  // 虽然 sectionTitle 走 bordered variant（不消费 sectionCorner），
  // 但 ThemeAssets 契约需要字符串占位；用它作 figure 左上角标记的备用资产
  const sectionCorner = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M1,1 L1,8 M1,1 L8,1" stroke="${p.border}" stroke-width="1" fill="none"/>
    </svg>
  `)

  // ---------- quoteMark · 故意不导出 ---------- //
  // 规范 §1.3 "必删"：学术 quote 不做装饰引号（那是杂志审美），靠 blockquote 左竖线即可
  // 不导出 quoteMark —— classic variant 会走 FALLBACK_OPEN_MARK 字符回退（与 default 同策略）

  // ---------- stepBadge(n) · 极简文字徽章（规范 §2.16 steps） ---------- //
  // 规范原文：steps 走 numbered-points 文字编号，不做圆徽章（那是 default/tech-explainer 签名）
  // 本主题默认 variants.steps 走 timeline-dot，不消费 stepBadge。此处保留极简字号 14
  // 纯文字徽章（透明背景）作契约占位——若作者改 variant=number-circle 可退回兜底
  //
  // font-size 14 过光栅化下限（≥14）；无背景色（学术 steps 无圆底）
  const stepBadge = (n: number) => strip(`
    <svg viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:8px">
      <text x="10" y="15" text-anchor="middle" font-size="14" font-weight="500" fill="${p.primary}">${n}</text>
    </svg>
  `)

  // ---------- dividerDots · 三点（保留为次选，body 中极少用） ---------- //
  // 规范 §2.17：divider 推荐优先级 rule > glyph，其余退化。dots 作 fallback，等视觉气
  const dividerDots = strip(`
    <svg viewBox="0 0 240 8" width="220" height="8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="108" cy="4" r="1.2" fill="${p.border}"/>
      <circle cx="120" cy="4" r="1.2" fill="${p.border}"/>
      <circle cx="132" cy="4" r="1.2" fill="${p.border}"/>
    </svg>
  `)

  // ---------- dividerFlower · 退化到 ⁂ 三星号 glyph（规范 §2.17） ---------- //
  // 规范 §1.3 "必删"：学术不做花饰。为满足 ThemeAssets 契约，给一个文本 glyph 退化版：
  // 中央 ⁂ 三星号（scene break 传统记号），每篇 ≤ 1 次出现
  // font-size 14 过光栅化下限
  const dividerFlower = strip(`
    <svg viewBox="0 0 240 16" width="220" height="16" xmlns="http://www.w3.org/2000/svg">
      <text x="120" y="13" text-anchor="middle" font-size="14" fill="${p.textMuted}" letter-spacing="4">⁂</text>
    </svg>
  `)

  // ---------- dividerWave · 退化到平直 rule（规范 §1.3 "必删 wave"） ---------- //
  // 规范原文："dividerWave：本主题完全不用 wave，删除或让它 fallback 到 rule"
  // 为满足 ThemeAssets 契约，给一条纯直线（不含任何波形）——用户 variant=wave 触发也不破纪律
  const dividerWave = strip(`
    <svg viewBox="0 0 240 4" width="220" height="4" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="2" x2="220" y2="2" stroke="${p.border}" stroke-width="1"/>
    </svg>
  `)

  // ---------- 四态图标（14×14，status accent 色） ---------- //
  // 规范 §2.10-2.13：四态靠英文 label + 形状冗余识别，图标仅做最后一档弱信号
  // 几何化到极简：句点 / 下划线 / 虚线 / 方块——对应"定义 / 方法 / 局限 / 谬误"

  // tipIcon（Definition）：实心小方块——承载"定义边界"语义，呼应 theoremMark
  const tipIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <rect x="4" y="4" width="6" height="6" fill="${p.tipAccent}"/>
    </svg>
  `)

  // infoIcon（Methods）：短下横线——呼应 methods 容器 minimal-underline 形状
  const infoIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <line x1="3" y1="10" x2="11" y2="10" stroke="${p.infoAccent}" stroke-width="1.4"/>
    </svg>
  `)

  // warningIcon（Limitations）：四点虚框——呼应 warning 容器的 dashed border
  const warningIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <rect x="3" y="3" width="8" height="8" fill="none" stroke="${p.warningAccent}" stroke-width="1" stroke-dasharray="1.5 1.5"/>
    </svg>
  `)

  // dangerIcon（Fallacy）：L 形双线——呼应 danger 容器的 L 形缺角
  const dangerIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M2,2 L2,7 M2,2 L7,2" stroke="${p.dangerAccent}" stroke-width="1.2" fill="none"/>
      <path d="M12,12 L12,7 M12,12 L7,12" stroke="${p.dangerAccent}" stroke-width="1.2" fill="none"/>
    </svg>
  `)

  return {
    h2Prefix,
    sectionCorner,
    // 规范 §1.3 "必删 quoteMark" —— 故意不导出，走 FALLBACK_OPEN_MARK 字符回退
    stepBadge,
    dividerDots,
    dividerFlower,
    dividerWave,
    tipIcon,
    infoIcon,
    warningIcon,
    dangerIcon,
  }
}
