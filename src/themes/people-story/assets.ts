/**
 * people-story · 专属 SVG 资产
 *
 * 视觉语言（规范 §1.3）：**巨号 serif 引号 + 瘦细 column rule + 罗马数字章节号 +
 * 肖像 silhouette**。四件是装饰总和，少一件都不行，多一件都拒绝。
 *
 * 核心纪律：
 *   - accent 深铁锈 (#8a3f2b) 只出现三处：intro dropcap 首字（markdown rule 负责）+
 *     quoteCard 巨号 serif 引号（本文件）+ h2 罗马数字前缀（markdown rule 负责）
 *   - stepBadge 走 ThemeAssets 标准位，返回"大号罗马数字 + 下横线"的 24×24 徽章
 *   - 所有 SVG 无 id / 无 <style> / 无 url 引号 / <text> 不声 font-family
 *   - font-size ≥ 14（stepBadge 罗马数字用 24，远超光栅化下限）
 *
 * 导出 11 件：h2Prefix（静态占位，behavior.h2RomanNumerals=true 时渲染器走自身
 *           Roman 注入逻辑，h2Prefix SVG 不会被输出）/ dividerWave / dividerDots /
 *           dividerFlower / sectionCorner / quoteMark / tipIcon / infoIcon /
 *           warningIcon / dangerIcon / stepBadge(n)=罗马徽章.
 */

import type { ThemeAssets } from '../types'
import { strip, toRoman } from '../_shared/svgLib'

export interface PeopleStoryPalette {
  primary: string
  accent: string
  secondary: string
  border: string
  textMuted: string
  tipAccent: string
  warningAccent: string
  infoAccent: string
  dangerAccent: string
}

export function peopleStoryAssets(p: PeopleStoryPalette): ThemeAssets {
  // ---------- h2Prefix · 静态占位（behavior 触发时不会被消费） ---------- //
  // 规范 §1.3 ③：h2Prefix 不输出 SVG 图案，而是 renderer 注入 <span> 包的罗马数字。
  // 但 ThemeAssets.h2Prefix 的槽位仍需要一个字符串（theme-variants 测试断言其 typeof 'string'）。
  // 给一个极简 3×13 primary 竖条 —— 若主题作者把 behavior.h2RomanNumerals 关掉，
  // 这根竖条会替代 Roman 注入，保持 h2 仍有装饰。
  const h2Prefix = strip(`
    <svg viewBox="0 0 3 13" width="3" height="13" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:10px">
      <rect x="0" y="0" width="3" height="13" fill="${p.primary}"/>
    </svg>
  `)

  // ---------- sectionCorner · 肖像 silhouette（18×18 border 色） ---------- //
  // 规范 §1.3 ⑤：圆（头）+ 梯形（肩）。头 cx=12,cy=7,r=4.5；肩梯形上底 8 下底 14 高 6.
  // 填色用 border 米色"让它退后"（非 primary —— 不能抢 h2 戏份）
  const sectionCorner = strip(`
    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:8px">
      <circle cx="12" cy="7" r="4.5" fill="${p.border}"/>
      <path d="M8,16 L16,16 L19,22 L5,22 Z" fill="${p.border}"/>
    </svg>
  `)

  // ---------- quoteMark · 巨号 serif 左双引号（48×42 accent 实心） ---------- //
  // 规范 §1.3 ①：**主题第一装饰**。杂志 62pt 级别的大号 serif 左引号。
  // 几何化水滴形双引号 + 拖尾小钩；无描边（断言字符感非图标感）；opacity 0.92.
  // 注意：不画右引号（杂志 pull-quote 只画左引号挂角，右引号靠 byline 自然收束）
  const quoteMark = strip(`
    <svg viewBox="0 0 60 52" width="48" height="42" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:top;margin-right:6px">
      <path d="M10,4 C4,10 4,24 10,34 C14,40 22,38 22,30 C22,24 16,22 14,22 C14,14 16,10 22,6 L22,4 Z
               M36,4 C30,10 30,24 36,34 C40,40 48,38 48,30 C48,24 42,22 40,22 C40,14 42,10 48,6 L48,4 Z"
            fill="${p.accent}" opacity="0.92"/>
    </svg>
  `)

  // ---------- stepBadge(n) · 大号罗马数字徽章（24×24） ---------- //
  // 规范 §1.3 ③：中央大号罗马数字 + 数字下方一根 24px accent 色 1.2 粗横线.
  // 无圆圈、无方框 —— 裸数字 + 一根横线，像章节封面的大章号.
  //
  // viewBox 40×40 但对外 width/height 24×24（适配左侧 24px timeline 列）
  // <text> font-size 24 —— 远超 14 平台下限，光栅后仍可辨
  // 横线 x: 居中从 cx-12 到 cx+12（24 宽），y=30, stroke-width 1.2
  const stepBadge = (n: number) => {
    const roman = toRoman(n)
    return strip(`
      <svg viewBox="0 0 40 40" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
           style="display:inline-block;vertical-align:middle;margin-right:10px">
        <text x="20" y="26" text-anchor="middle" font-size="24" font-weight="700" fill="${p.accent}">${roman}</text>
        <line x1="8" y1="32" x2="32" y2="32" stroke="${p.accent}" stroke-width="1.2"/>
      </svg>
    `)
  }

  // ---------- dividerFlower · 杂志章节分隔（菱形 + 两侧横线） ---------- //
  // 规范 §1.3 ②：中央一个 6×6 的 45° 旋转正方形（菱形占位），两侧 80px border 色横线.
  //   菱形填色 primary，opacity 0.7. 不用花饰、不用云头 —— 杂志就是要这么枯.
  const dividerFlower = strip(`
    <svg viewBox="0 0 240 12" width="220" height="12" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="6" x2="110" y2="6" stroke="${p.border}" stroke-width="1"/>
      <line x1="130" y1="6" x2="210" y2="6" stroke="${p.border}" stroke-width="1"/>
      <path d="M120,2 L124,6 L120,10 L116,6 Z" fill="${p.primary}" opacity="0.7"/>
    </svg>
  `)

  // ---------- dividerDots · byline 分隔（—— · ——） ---------- //
  // 规范 §1.3 ②：两侧各 40px 长 1px border 色横线 + 中央 r=1.8 textMuted 圆点.
  // 用于 cover 里作者 / 日期之间、footer 致谢块分隔。
  const dividerDots = strip(`
    <svg viewBox="0 0 100 8" width="100" height="8" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="4" x2="46" y2="4" stroke="${p.border}" stroke-width="1"/>
      <circle cx="50" cy="4" r="1.8" fill="${p.textMuted}"/>
      <line x1="54" y1="4" x2="94" y2="4" stroke="${p.border}" stroke-width="1"/>
    </svg>
  `)

  // ---------- dividerWave · 保留但本主题默认不用（规范 §2 divider 禁用 wave） ---------- //
  // 规范：wave 禁用 —— 缠枝、装饰字符都不是特稿语汇.
  // 为满足 ThemeAssets 契约（theme-variants 测试枚举所有资产槽），提供极简 3 段短 dash.
  const dividerWave = strip(`
    <svg viewBox="0 0 240 8" width="220" height="8" xmlns="http://www.w3.org/2000/svg">
      <line x1="60" y1="4" x2="90" y2="4" stroke="${p.border}" stroke-width="1"/>
      <line x1="105" y1="4" x2="135" y2="4" stroke="${p.border}" stroke-width="1"/>
      <line x1="150" y1="4" x2="180" y2="4" stroke="${p.border}" stroke-width="1"/>
    </svg>
  `)

  // ---------- 四态图标：minimal 几何（14×14），stroke 0.8 压低存在感 ---------- //
  // 规范 §1.3：人物稿里四件基本不露面，不值得占用装饰额度 —— 全部降一级存在感.

  // tipIcon（采访手记）：铅笔划小点 —— 像记者笔记本里的旁注
  const tipIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="7" cy="7" r="1.2" fill="${p.tipAccent}" opacity="0.7"/>
      <line x1="3" y1="10.5" x2="11" y2="10.5" stroke="${p.tipAccent}" stroke-width="0.8" opacity="0.7"/>
    </svg>
  `)

  // infoIcon（背景说明）：极简 i 柱
  const infoIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <rect x="6.5" y="3" width="1" height="1.5" fill="${p.infoAccent}" opacity="0.7"/>
      <rect x="6.5" y="6" width="1" height="5" fill="${p.infoAccent}" opacity="0.7"/>
    </svg>
  `)

  // warningIcon（FACT CHECK 事实核查）：打勾 —— 编辑部审稿标记
  const warningIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M3,7 L6,10 L11,4" fill="none" stroke="${p.warningAccent}" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" opacity="0.7"/>
    </svg>
  `)

  // dangerIcon（官方回应）：短竖杠 —— 法律意见书封口
  const dangerIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <rect x="6.4" y="3" width="1.2" height="8" fill="${p.dangerAccent}" opacity="0.7"/>
    </svg>
  `)

  return {
    h2Prefix,
    sectionCorner,
    quoteMark,
    stepBadge,
    dividerFlower,
    dividerDots,
    dividerWave,
    tipIcon,
    infoIcon,
    warningIcon,
    dangerIcon,
  }
}
