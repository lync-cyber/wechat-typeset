/**
 * tech-geek · 专属 SVG 资产（规范 §1.3 motif —— manpage / RFC / Plan 9 / TAOCP）
 *
 * 视觉语汇**只从印刷传统取**，不从 CRT 怀旧取；不做 VSCode / Dracula / neon。
 *
 * 必删（规范 §1.3）：
 *   - 原"频谱条"dividerFlower —— Dribbble 营销页最泛滥的装饰
 *   - 原"三方块 + 竖条"sectionCorner —— macOS 窗口装饰的模仿物
 *
 * 保留重做（规范 §1.3）：
 *   - h2Prefix: 单色 1.5×14 primary 琥珀竖条 + `§` 字符
 *   - dividerWave: manpage rule —— 虚线横规 + 两端 `§`（替代旧"两端方块"）
 *   - dividerDots: 5 点省略号（降调，从 9 点收缩；中间 1 点 primary 暗示重点）
 *   - quoteMark: heredoc `<` `>` —— stroke 压到 2px，primary 琥珀色
 *   - stepBadge: 方括号脚注 `[n]`（替代旧"圆角方形 + 数字"）
 *
 * 新增（规范 §1.3）：
 *   - sectionCorner 重做为"§"章节号 —— manpage heading prefix
 *   - dividerFlower 重做为"ruler-double"—— 两根平行 1px 实线（RFC 大分隔）
 *
 * 四态图标（规范 §2.10-§2.13 四重冗余的其中一重）：
 *   - tip（`// NOTE`）: 空 —— 规范"无图标"，与 dashed-border 的虚线配合已够信号
 *   - warning（`// CAVEAT`）: `[!]` 方括号感叹号（manpage 风）
 *   - info（`// REF`）: `¶` pilcrow（段落标记）
 *   - danger（`// PITFALL`）: `[X]` 方括号叉（STOP 风）
 *
 * 严守平台约束：无 id / 无 url 引号 / `<text>` 不声 font-family / 光栅字号 ≥ 14 /
 * 纯白 #fff 绝不出现（深底主题会刺眼 + 平台透明化陷阱）。
 */

import type { ThemeAssets } from '../types'
import { strip, type BasePalette } from '../_shared/svgLib'

/** tech-geek palette：BasePalette + textMuted（manpage 章节符号的暗色备用） */
interface TGPalette extends BasePalette {
  textMuted: string
}

export function techGeekAssets(p: TGPalette): ThemeAssets {
  // ---------- ① h2Prefix · primary 竖条 + § 字符（规范 §1.3） ---------- //
  // 规范原文：1px 宽 14px 高的单色竖条（primary 琥珀，不叠渐隐方块）+ 5px 间距 + 方头 §
  //   viewBox 足够容 `§` font-size 14；光栅后仍 ≥ 14（主题 h2Prefix 未做缩放断言）
  const h2Prefix = strip(`
    <svg viewBox="0 0 20 18" width="18" height="16" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:8px">
      <rect x="0" y="2" width="1.5" height="14" fill="${p.primary}"/>
      <text x="6" y="14" font-size="13" font-weight="600" fill="${p.primary}">§</text>
    </svg>
  `)

  // ---------- ② dividerWave · manpage rule · 虚线 + 两端 §（规范 §1.3） ---------- //
  // 规范原文：中段 220px 1px 虚线横规（border 色）+ 两端各一个 § SVG text（primary 琥珀 14px）
  //   去掉原"两端方块"装饰 —— 这是 manpage 底部标注章节分隔的经典样式
  const dividerWave = strip(`
    <svg viewBox="0 0 240 16" width="220" height="14" xmlns="http://www.w3.org/2000/svg">
      <text x="4" y="12" font-size="12" font-weight="600" fill="${p.primary}">§</text>
      <line x1="18" y1="8" x2="222" y2="8" stroke="${p.border}" stroke-width="1" stroke-dasharray="4 3"/>
      <text x="226" y="12" font-size="12" font-weight="600" fill="${p.primary}">§</text>
    </svg>
  `)

  // ---------- ③ dividerDots · 5 点省略号（规范 §1.3 降调） ---------- //
  // 规范原文：9 点改 5 点，间距拉大到 20px；颜色从全 primary 改为 border 暖灰 +
  //   中间 1 点 primary —— 像印刷稿的省略号 `. . . . .`
  const dividerDots = strip(`
    <svg viewBox="0 0 240 10" width="220" height="10" xmlns="http://www.w3.org/2000/svg">
      <circle cx="80" cy="5" r="1.5" fill="${p.border}"/>
      <circle cx="100" cy="5" r="1.5" fill="${p.border}"/>
      <circle cx="120" cy="5" r="1.8" fill="${p.primary}"/>
      <circle cx="140" cy="5" r="1.5" fill="${p.border}"/>
      <circle cx="160" cy="5" r="1.5" fill="${p.border}"/>
    </svg>
  `)

  // ---------- ④ dividerFlower · ruler-double RFC 大分隔（规范 §1.3 新增） ---------- //
  // 规范原文 §1.3 "新增 ruler-double"：两条平行 1px 实线（间距 2px）
  //   像 RFC 文档的章节大分隔，比单线更重一档
  const dividerFlower = strip(`
    <svg viewBox="0 0 240 8" width="220" height="8" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="3" x2="228" y2="3" stroke="${p.border}" stroke-width="1"/>
      <line x1="12" y1="6" x2="228" y2="6" stroke="${p.border}" stroke-width="1"/>
    </svg>
  `)

  // ---------- ⑤ quoteMark · heredoc `<` `>` 精修（规范 §1.3） ---------- //
  // 规范原文：保留 `<` `>` heredoc 语义（tech-geek 最有作者气的一件），但
  //   字重压到 2px stroke（旧 3px 偏粗）；色改 primary 琥珀（旧低饱和青绿）
  const quoteMark = strip(`
    <svg viewBox="0 0 40 24" width="36" height="22" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:top;margin-right:6px">
      <path d="M12,4 L4,12 L12,20" fill="none" stroke="${p.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M28,4 L36,12 L28,20" fill="none" stroke="${p.primary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `)

  // ---------- ⑥ sectionCorner · § 章节号（规范 §1.3 新增 manpagePrefix） ---------- //
  // 规范原文：删除原"三方块 + 竖条"macOS 窗口装饰；改为单个 § 字符
  //   配合 sectionTitle cornered variant 使用 —— manpage heading prefix
  const sectionCorner = strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <text x="8" y="13" font-size="14" font-weight="600" text-anchor="middle" fill="${p.primary}">§</text>
    </svg>
  `)

  // ---------- ⑦ tipIcon · 空（规范 §2.10 "无"） ---------- //
  // 规范原文表：tip | 无（注释前缀语 `// NOTE` + 虚线已是四重冗余的 3 重，不再加图标）
  //   空字符串满足 ThemeAssets.tipIcon 的 string 签名，renderer 注入零宽度内容
  const tipIcon = ''

  // ---------- ⑧ warningIcon · `[!]` 方括号感叹号（规范 §2.11） ---------- //
  // 规范原文：manpage 里的 `[!]` 方括号 + 感叹号，不是三角警告
  //   font-size 13 对应 viewBox 16 高度 —— 光栅后可辨
  const warningIcon = strip(`
    <svg viewBox="0 0 20 16" width="18" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <text x="10" y="13" font-size="13" font-weight="600" text-anchor="middle" fill="${p.warningAccent}">[!]</text>
    </svg>
  `)

  // ---------- ⑨ infoIcon · `¶` pilcrow（规范 §2.12 / §1.3 新增） ---------- //
  // 规范原文：¶ 段落标记 —— Knuth 排版里分段落时冒出来的符号
  const infoIcon = strip(`
    <svg viewBox="0 0 14 16" width="12" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <text x="7" y="13" font-size="14" font-weight="600" text-anchor="middle" fill="${p.infoAccent}">¶</text>
    </svg>
  `)

  // ---------- ⑩ dangerIcon · `[X]` 方括号叉（规范 §2.13） ---------- //
  // 规范原文：方括号 `[X]` —— STOP 风格，不是八角标志
  const dangerIcon = strip(`
    <svg viewBox="0 0 20 16" width="18" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <text x="10" y="13" font-size="13" font-weight="600" text-anchor="middle" fill="${p.dangerAccent}">[X]</text>
    </svg>
  `)

  // ---------- ⑪ stepBadge · 方括号脚注 `[n]`（规范 §1.3 新增） ---------- //
  // 规范原文：方括号字重 600、primary 琥珀，无背景无边框 —— learned-paper footnote
  //   完全脱离旧"圆角方形 + 数字"的徽章语言；向 TAOCP 脚注号看齐
  //   font-size 16 满足 stepBadge min_font_size ≥ 14 硬检测
  const stepBadge = (n: number) => strip(`
    <svg viewBox="0 0 32 22" width="28" height="20" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:8px">
      <text x="16" y="17" font-size="16" font-weight="600" text-anchor="middle" fill="${p.primary}">[${n}]</text>
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
