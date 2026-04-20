/**
 * industry-observer · 专属 SVG 资产
 *
 * 视觉语言（规范 §1.3）：**newsletter 期号印章 + 现代 serif 方头引号 +
 * 中央菱形 ornament + 对比矩阵十字网**。五件互不撞车，故意避开 K 线（business）/
 * 云纹（literary）/ manpage 符号（tech-geek）/ 器物几何（life-aesthetic）。
 *
 * 核心纪律（规范 §1.1 / §1.2 / §1.3）：
 *   - primary 深墨蓝 (#24364f) 用于结构（h2 竖条、引号、分隔菱形）
 *   - accent 橙金 (#b86f2a) 用于信号（issueStamp、sectionCorner、status 色均避让）
 *   - stepBadge 走 timeline-dot 语义 —— 实心圆 + textInverse 数字；但外观文本
 *     仍保留 font-size 15（满足 variant-sanity ≥14 断言）
 *   - issueStamp 是 industry 的 DNA —— 双线矩形框 + 疏朗字距 1.5px + 橙金字，
 *     由 cover/author/footerCTA 共享注入（基于 attrs.issue/date/kind）
 *   - dividerWave 保留资产但主题默认走 glyph variant（菱形 ornament）
 *
 * 导出 11 件：h2Prefix / dividerWave / dividerDots / dividerFlower / sectionCorner /
 *           quoteMark / tipIcon / infoIcon / warningIcon / dangerIcon / stepBadge +
 *           参数化 issueStamp（非计数型，跟 stepBadge 同为函数式资产）。
 */

import type { ThemeAssets } from '../types'
import { strip } from '../_shared/svgLib'
import { escText } from '../../pipeline/containers/types'

export interface IndustryObserverPalette {
  primary: string
  accent: string
  secondary: string
  border: string
  textInverse: string
  tipAccent: string
  warningAccent: string
  infoAccent: string
  dangerAccent: string
}

export function industryObserverAssets(p: IndustryObserverPalette): ThemeAssets {
  // ---------- h2Prefix · 3×13 primary 竖条 + 3×3 accent 橙金小方块 ---------- //
  // 规范 §1.3：h2 前缀 = 主色竖条 + 橙金点缀，两支色各司其职
  const h2Prefix = strip(`
    <svg viewBox="0 0 11 14" width="11" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:10px">
      <rect x="0" y="0" width="3" height="13" fill="${p.primary}"/>
      <rect x="7" y="5" width="3" height="3" fill="${p.accent}"/>
    </svg>
  `)

  // ---------- sectionCorner · 3×3 accent 橙金小方块 ---------- //
  // 规范 §2.4：section-title cornered variant 左上角。纯方块，不做 L 形（L 形是 business 专属）
  const sectionCorner = strip(`
    <svg viewBox="0 0 6 6" width="5" height="5" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:7px">
      <rect x="0" y="0" width="3" height="3" fill="${p.accent}"/>
    </svg>
  `)

  // ---------- quoteMark · 方头双引号（28×22，primary 实心） ---------- //
  // 规范 §1.3 ②：方头、粗实、断言感。与 people-story 的杂志花体引号刻意区分。
  // 路径用两个"C"形断言块：上横 + 左竖 + 下横（比 business 更矮更粗）
  const quoteMark = strip(`
    <svg viewBox="0 0 32 24" width="28" height="22" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:top;margin-right:4px">
      <path d="M2,4 L10,4 L10,8 L6,8 L6,14 L10,14 L10,18 L2,18 Z
               M16,4 L24,4 L24,8 L20,8 L20,14 L24,14 L24,18 L16,18 Z"
            fill="${p.primary}"/>
    </svg>
  `)

  // ---------- stepBadge(n) · 时间轴印章（但 timeline-dot variant 不消费此件） ---------- //
  // 规范 §2 steps：本主题走 timeline-dot —— variant 自带 10px 实心圆点，
  // 不读 stepBadge。此处保留标准 24×24 数字印章作兜底（若作者改 variant=number-circle）
  // font-size 15 ≥ 14 光栅化下限（variant-sanity 测试硬断言）
  const stepBadge = (n: number) => strip(`
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:8px">
      <circle cx="12" cy="12" r="11" fill="${p.primary}"/>
      <text x="12" y="17" text-anchor="middle" font-size="15" font-weight="700" fill="${p.textInverse}">${n}</text>
    </svg>
  `)

  // ---------- issueStamp(issue, date, kind) · 期号戳（industry 的 DNA） ---------- //
  // 规范 §1.3 ①：双线矩形框 + 中英混排 + 字距 1.5px 疏朗。横宽可伸缩。
  // 跨 cover / author / footerCTA 三容器共享（由 renderer 按 attrs 自动注入）
  //
  // 文本合成纪律（规范 §1.2 Issue stamp 排印）：
  //   - 分隔符用 `·` 中点（非 / - |）
  //   - 拉丁 `ISSUE #xxx` 全大写
  //   - 任一参数为空则跳过，保留"可选三段"结构
  // font-size 14 同样过光栅化下限；viewBox 宽 260 可容 ~32 字符（含中文）
  const issueStamp = (issue: string, date: string, kind: string): string => {
    const parts: string[] = []
    if (issue) parts.push(`ISSUE #${escText(issue)}`)
    if (date) parts.push(escText(date))
    if (kind) parts.push(escText(kind))
    const text = parts.join(' · ')
    if (!text) return ''
    return strip(`
      <svg viewBox="0 0 260 24" width="260" height="24" xmlns="http://www.w3.org/2000/svg"
           style="display:inline-block;vertical-align:middle">
        <rect x="0.5" y="0.5" width="259" height="23" fill="none" stroke="${p.accent}" stroke-width="1"/>
        <rect x="3" y="3" width="254" height="18" fill="none" stroke="${p.accent}" stroke-width="0.5" opacity="0.55"/>
        <text x="10" y="16" font-size="14" font-weight="600" fill="${p.accent}" letter-spacing="1.5">${text}</text>
      </svg>
    `)
  }

  // ---------- dividerFlower · 中央菱形 ornament（规范 §1.3 ④） ---------- //
  // 规范原文：简单实心菱形 8×8，primary 填充，不加装饰线、不加横线。
  // 与 literary-humanism 的 ❦ 花饰刻意区分：花饰是装饰，菱形是 ornament（饰记）
  const dividerFlower = strip(`
    <svg viewBox="0 0 24 12" width="18" height="10" xmlns="http://www.w3.org/2000/svg">
      <path d="M12,2 L16,6 L12,10 L8,6 Z" fill="${p.primary}"/>
    </svg>
  `)

  // ---------- dividerDots · 三点横排（极淡） ---------- //
  // 规范 §1.3：newsletter 段间停顿用 3 点，border 米纸边色，克制
  const dividerDots = strip(`
    <svg viewBox="0 0 240 8" width="220" height="8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="108" cy="4" r="1.6" fill="${p.border}"/>
      <circle cx="120" cy="4" r="1.6" fill="${p.border}"/>
      <circle cx="132" cy="4" r="1.6" fill="${p.border}"/>
    </svg>
  `)

  // ---------- dividerWave · 保留但本主题默认不用（规范 §1.3 禁用 wave） ---------- //
  // 为满足 ThemeAssets 契约（theme-variants 测试枚举所有资产槽），仍提供一个
  // 中性 SVG：3 段短 dash 模拟 newsletter 浅分隔，无 K 线语义。
  // 用户若 `::: divider variant=wave` 触发，视觉仍可用。
  const dividerWave = strip(`
    <svg viewBox="0 0 240 8" width="220" height="8" xmlns="http://www.w3.org/2000/svg">
      <line x1="60" y1="4" x2="90" y2="4" stroke="${p.border}" stroke-width="1.2"/>
      <line x1="105" y1="4" x2="135" y2="4" stroke="${p.border}" stroke-width="1.2"/>
      <line x1="150" y1="4" x2="180" y2="4" stroke="${p.border}" stroke-width="1.2"/>
    </svg>
  `)

  // ---------- 四态图标（14×14，status accent 色） ---------- //
  // 规范 §2.10-2.13：industry 的四态靠"胶囊标签 + 形状策略"差异化，图标仅做辅助
  // 设计上刻意简化，不抢胶囊标签的风头

  // tipIcon（要点 TL;DR）：列表三横线 —— "要点摘要"语义
  const tipIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <line x1="3" y1="4" x2="11" y2="4" stroke="${p.tipAccent}" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="3" y1="7" x2="11" y2="7" stroke="${p.tipAccent}" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="3" y1="10" x2="8" y2="10" stroke="${p.tipAccent}" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
  `)

  // infoIcon（背景 Context）：圆框 + i 柱 —— 经典"信息"
  const infoIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="7" cy="7" r="5.5" fill="none" stroke="${p.infoAccent}" stroke-width="1.2"/>
      <rect x="6.4" y="3.4" width="1.2" height="1.2" fill="${p.infoAccent}"/>
      <rect x="6.4" y="5.6" width="1.2" height="5" fill="${p.infoAccent}"/>
    </svg>
  `)

  // warningIcon（存疑 Questioned）：问号 —— 与传统"三角警告"区分（那是 business 专属）
  const warningIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="7" cy="7" r="5.5" fill="none" stroke="${p.warningAccent}" stroke-width="1.2"/>
      <path d="M5.2,5.2 C5.2,4 6,3.2 7,3.2 C8,3.2 8.8,4 8.8,5 C8.8,5.8 8.2,6.2 7.5,6.8 L7,7.5 L7,8.5"
            fill="none" stroke="${p.warningAccent}" stroke-width="1.2" stroke-linecap="round"/>
      <rect x="6.4" y="10" width="1.2" height="1.2" fill="${p.warningAccent}"/>
    </svg>
  `)

  // dangerIcon（错判 Flawed）：交叉（×）—— 勘误条审美，比 business 的火警色更冷
  const dangerIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="7" cy="7" r="5.5" fill="none" stroke="${p.dangerAccent}" stroke-width="1.2"/>
      <line x1="4.5" y1="4.5" x2="9.5" y2="9.5" stroke="${p.dangerAccent}" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="9.5" y1="4.5" x2="4.5" y2="9.5" stroke="${p.dangerAccent}" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
  `)

  return {
    h2Prefix,
    sectionCorner,
    quoteMark,
    stepBadge,
    issueStamp,
    dividerFlower,
    dividerDots,
    dividerWave,
    tipIcon,
    infoIcon,
    warningIcon,
    dangerIcon,
  }
}
