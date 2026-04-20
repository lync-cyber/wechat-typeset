/**
 * literary-humanism · 专属 SVG 资产
 *
 * 视觉语言：**版心规制** > "装饰"（规范 §1.3）。留白的重量 > 花饰的重量。
 * 参照坐标：宋版书、毛边本、《读库》目录页、岩波文库扉页。
 *
 * 核心纪律（规范 §1.3 / §3.1 "符号通货膨胀"规避）：
 *   - 朱砂色 (#9a3b2e) 全文仅两处：quoteCard 首字（variant 负责）+ footer sealMark（本文件）
 *   - 云头 SVG 降频：只在 dividerFlower 和 sectionCorner 出现（原 h2 云头取消）
 *   - stepBadge 数字色 = primary 墨褐，不是朱（规范 §1.3 / 结语 §3）
 *   - 回纹单枚居中（原五连回纹"印章店招牌"感否决）
 *   - 所有 SVG 无 id / 无 <style> / 无 url 引号 / <text> 不声明 font-family
 *
 * 导出 11 件：h2Prefix / dividerWave / dividerDots / dividerFlower / sectionCorner /
 *           tipIcon / infoIcon / warningIcon / dangerIcon / stepBadge / sealMark。
 * **刻意不导出 quoteMark**（规范 §2.6 —— 与 default 同策略）。
 * sealMark 由 footerCTA renderer 在容器尾部自动右对齐注入（规范 §1.3 ④ / §2 footerCTA）。
 * stepBadge viewBox 24×24；font-size 15 ≥ 14 光栅化下限。
 */

import type { ThemeAssets } from '../types'
import { strip, type ExtendedPalette } from '../_shared/svgLib'

export function literaryHumanismAssets(p: ExtendedPalette): ThemeAssets {
  // ---------- ① h2Prefix · 版框竖条（规范 §1.3 ①） ---------- //
  // 规范原文：viewBox 4x22，左侧 rect x=0 y=0 w=2 h=20 fill=primary，仅此而已。
  // 拒绝原"如意云头"—— 云头留给 dividerFlower / sectionCorner 稀有位置。
  const h2Prefix = strip(`
    <svg viewBox="0 0 4 22" width="4" height="20" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:10px">
      <rect x="0" y="0" width="2" height="20" fill="${p.primary}"/>
    </svg>
  `)

  // ---------- ② dividerFlower · 如意云头单颗（规范 §1.3 ②） ---------- //
  // 规范原文：viewBox 0 0 240 18（收紧）；中间三连云头（不是五连），宽度 32px，两侧长线各 100px；
  //   云头下方朱点 r=1.5；stroke-width 0.9；删除原"下方水平线 + 顶部朱圆 + 连接短线"三件套。
  // 三连云头用 3 个 A 弧 + 底边 Z 闭合；每个云 cx 间距 ≈ 10.67px，共 32px 宽。
  const dividerFlower = strip(`
    <svg viewBox="0 0 240 18" width="220" height="18" xmlns="http://www.w3.org/2000/svg">
      <line x1="4" y1="9" x2="104" y2="9" stroke="${p.border}" stroke-width="0.9"/>
      <line x1="136" y1="9" x2="236" y2="9" stroke="${p.border}" stroke-width="0.9"/>
      <path d="M104,9 A5.33,5.33 0 0 1 114.67,9 A5.33,5.33 0 0 1 125.33,9 A5.33,5.33 0 0 1 136,9 L136,13 L104,13 Z"
            fill="${p.primary}" opacity="0.82"/>
      <circle cx="120" cy="16" r="1.5" fill="${p.accent}" opacity="0.85"/>
    </svg>
  `)

  // ---------- ③ dividerDots · 版心回纹单枚（规范 §1.3 ③） ---------- //
  // 规范原文：viewBox 0 0 240 12；中央单枚 rect 10×10 外框 + 内部 L 形双折线，stroke 1，opacity 0.7；
  //   两侧 border 色细线各 108px，单线（拒绝原双线 + 半透明第二线的过度）。
  // L 形双折线用两条 path，占 rect 内部。
  const dividerDots = strip(`
    <svg viewBox="0 0 240 12" width="220" height="12" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="6" x2="108" y2="6" stroke="${p.border}" stroke-width="1"/>
      <line x1="132" y1="6" x2="240" y2="6" stroke="${p.border}" stroke-width="1"/>
      <rect x="115" y="1" width="10" height="10" fill="none" stroke="${p.primary}" stroke-width="1" opacity="0.7"/>
      <path d="M117,3 L123,3 L123,9" fill="none" stroke="${p.primary}" stroke-width="0.8" opacity="0.7"/>
      <path d="M119,5 L121,5 L121,7" fill="none" stroke="${p.primary}" stroke-width="0.8" opacity="0.7"/>
    </svg>
  `)

  // ---------- ④ dividerWave · 缠枝（规范 §2 divider：section 级别超大分隔） ---------- //
  // 规范 §2 divider：wave 留给 section 级别超大分隔（每 3-4 个 h2 之间用一次）。
  // 保留 S 曲线主干，但降节律密度（从原 4 个花点收缩到 2 个），仍用 primary + accent 点。
  // viewBox 与原来一致（240×20），宽 220 —— variant-sanity 对 dividerWave 无 viewBox 断言。
  const dividerWave = strip(`
    <svg viewBox="0 0 240 20" width="220" height="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,10 C60,2 100,18 140,10 C170,5 200,14 220,10"
            fill="none" stroke="${p.primary}" stroke-width="1" opacity="0.6"/>
      <ellipse cx="80" cy="6" rx="3" ry="1.4" fill="${p.primary}" opacity="0.55"/>
      <circle cx="80" cy="6" r="1.1" fill="${p.accent}" opacity="0.75"/>
      <ellipse cx="160" cy="14" rx="3" ry="1.4" fill="${p.primary}" opacity="0.55"/>
      <circle cx="160" cy="14" r="1.1" fill="${p.accent}" opacity="0.75"/>
    </svg>
  `)

  // ---------- ⑤ sectionCorner · 书角折页（规范 §2.4） ---------- //
  // 规范 §2.4：cornered 左上书角折页。保留原"双折边"意匠，收细 stroke 到 1，去掉原朱点
  // （朱点稀缺纪律 —— 朱只在 quoteCard 首字 + sealMark 出现）。
  const sectionCorner = strip(`
    <svg viewBox="0 0 20 20" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:8px">
      <path d="M2,2 L14,2 L18,6 L18,18 L2,18 Z" fill="none" stroke="${p.primary}" stroke-width="1" opacity="0.85"/>
      <path d="M14,2 L14,6 L18,6" fill="none" stroke="${p.primary}" stroke-width="1" opacity="0.85"/>
    </svg>
  `)

  // ---------- ⑥ stepBadge · 钤印（规范 §1.3 ④） ---------- //
  // 规范原文：外圈 r=11 stroke 1.2（保留）；内圈 r=8.5 stroke 0.6 opacity 0.55（保留）；
  //   底色浅填充从 primary 0.12 降到 0.08（更像宣纸透印）；
  //   数字色 **由 accent 朱改为 primary 墨褐**（朱砂稀缺纪律 —— 结语 §3）。
  const stepBadge = (n: number) => strip(`
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:8px">
      <circle cx="12" cy="12" r="11" fill="${p.primary}" opacity="0.08"/>
      <circle cx="12" cy="12" r="11" fill="none" stroke="${p.primary}" stroke-width="1.2"/>
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="${p.primary}" stroke-width="0.6" opacity="0.55"/>
      <text x="12" y="17" text-anchor="middle" font-size="15" font-weight="700" fill="${p.primary}">${n}</text>
    </svg>
  `)

  // ---------- ⑦ quoteMark · 已删除（规范 §2.6 显式"不用"） ---------- //
  // 规范 §2.6：quoteCard 走 magazine-dropcap —— 首字本身是装饰，再加引号就太满。
  // literary 主动**不导出** quoteMark，让 classic variant 走字符回退（与 default 同路径）。
  // 参照 default/assets.ts 的做法。

  // ---------- ⑧ sealMark · 大钤印（规范 §1.3 ④ · 规范 §2 footerCTA） ---------- //
  // 规范原文：24×24 方形外框 + 内部两字留位；**这颗才用朱**；作为全文收束。
  // 经由 ThemeAssets.sealMark 槽位导出，footerCTA renderer 检测到后在容器末尾
  // 右对齐注入一次。整篇文章只出现在卷尾一次，符合"朱砂稀缺"纪律。
  //
  // 结构：外框正方形 + 水平中分线造"两字位"，每位内用极简"十字笔画"几何暗示，
  // 不画真字（避免光栅后字形不稳定 + 规避 font-family 禁令）。
  // stroke-width 1.4（光栅后 ≈ 0.82px，仍可见），opacity 梯度控制两字可见度。
  const sealMark = strip(`
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle">
      <rect x="1" y="1" width="22" height="22" fill="none" stroke="${p.accent}" stroke-width="1.4" opacity="0.92"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke="${p.accent}" stroke-width="0.6" opacity="0.5"/>
      <line x1="7" y1="6.5" x2="17" y2="6.5" stroke="${p.accent}" stroke-width="1.1" opacity="0.85"/>
      <line x1="12" y1="4" x2="12" y2="9" stroke="${p.accent}" stroke-width="1.1" opacity="0.85"/>
      <line x1="7" y1="17.5" x2="17" y2="17.5" stroke="${p.accent}" stroke-width="1.1" opacity="0.85"/>
      <line x1="12" y1="15" x2="12" y2="20" stroke="${p.accent}" stroke-width="1.1" opacity="0.85"/>
    </svg>
  `)

  // ---------- ⑨-⑫ 四态图标 · 批注号（规范 §1.3 ⑤） ---------- //
  // 规范原文：仿古籍"夹注"双鱼尾符号，14×14 SVG；两条 2px 弧线开口朝右；
  //   颜色跟随 status.accent；"四种 admonition 都用同一形状，只换颜色 + 换开口方向"。
  // 四者开口方向差异：
  //   - tip（批注）：开口朝右 〗 右侧
  //   - info（案语）：无图标（规范 §2.11：低调，不加图标）—— 但 ThemeAssets.infoIcon 可选
  //     为了让 admonition accent-bar variant 仍能注入 icon，提供一个极简"·"点式占位
  //   - warning（商榷）：开口朝上（倒 U）
  //   - danger（校勘）：开口朝左 〖
  // 统一用"两段弧 + 中央文字提示"的几何化 path；弧用 M/A 命令绘制开口。
  // 因为"〖〗"的弧线在 14×14 viewBox 内用两条竖弧近似：开口右 = 左边开口；开口左 = 右边开口。

  // 形状统一：外框用两条竖弧（C 形），开口方向由弧的朝向决定
  // tip：开口朝右 = 左边一条 C 形（朝右开） + 中央无物（留白，最轻）
  //      14×14，弧线 x=3 的一条 C：从 (3,3) Q (5,7) (3,11)，开口朝右
  const tipIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M4,2 L2,4 L2,10 L4,12" fill="none" stroke="${p.tipAccent}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M8,2 L10,4 L10,10 L8,12" fill="none" stroke="${p.tipAccent}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>
  `)

  // info（案语）：规范 §2.11 "无图标（低调）"—— 但 renderer 会尝试注入 infoIcon；
  //   提供一个"按"字几何化：居中单点 + 下划线（象征"按"的句首停顿标），最低调
  const infoIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="7" cy="5" r="1" fill="${p.infoAccent}" opacity="0.9"/>
      <line x1="3" y1="10" x2="11" y2="10" stroke="${p.infoAccent}" stroke-width="1.2" opacity="0.85"/>
    </svg>
  `)

  // warning（商榷）：开口朝上的倒 U —— 双鱼尾"上开"变体
  const warningIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M2,4 L4,2 L10,2 L12,4" fill="none" stroke="${p.warningAccent}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M2,8 L4,6 L10,6 L12,8" fill="none" stroke="${p.warningAccent}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>
  `)

  // danger（校勘）：开口朝左 〖 —— 双鱼尾左开
  const dangerIcon = strip(`
    <svg viewBox="0 0 14 14" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M10,2 L12,4 L12,10 L10,12" fill="none" stroke="${p.dangerAccent}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M6,2 L4,4 L4,10 L6,12" fill="none" stroke="${p.dangerAccent}" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>
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
    sealMark,
    // 规范 §2.6：literary 刻意**不导出** quoteMark —— 与 default 同策略
    //   （quoteCard 走 magazine-dropcap，首字本身是装饰，不再叠引号 SVG）
  }
}
