/**
 * tech-explainer · 专属 SVG 资产
 *
 * 视觉语言：**技术文档的 UI 语汇**（Stripe Docs / MDN / Tailwind Docs 家族）
 *   - h2Prefix：3px 宽 16px 高的 primary 蓝短竖条（唯一 heading 装饰，克制）
 *   - 四态 + note 五件套：灯泡 / 空心圆+i / 圆角方+i / 三角+! / 八边形+×
 *     （共用视觉语系：线宽 1.5、stroke 空心、圆角 2px）
 *   - checkmark / cross（Do/Don't 专用）
 *   - stepBadge：primary 蓝 fill 圆 + 白数字（font-size 15，光栅后 ≥ 14）
 *   - copyIcon：两叠圆角方形（github/stripe 通用复制图标语汇）
 *   - externalLinkIcon（可选）：45° 箭头 + L 形框
 *   - terminalPrompt（可选）：$ 字符
 *
 * 严格遵守平台约束：
 *   - 所有 SVG 无 id、无 url()、无 <style>/<script>
 *   - stroke-width ≥ 1.5，光栅后细笔画不糊
 *   - <text> 不声明 font-family（走系统默认）
 *   - 徽章数字 font-size = 15（光栅后 ≥ 14 平台下限）
 *   - 纯白像素一律用 #fefefe，规避公众号 SVG→PNG 的 #fff→alpha=0 坑
 *
 * 按规范 §1.3 的 motif 纪律：**一切 emoji / Font Awesome 彩色图标 / 3D 立体 / 卡通化
 * 装饰 / 手绘线条全部逐出**。这里每个图标都是几何化的、克制的、有文档语汇归属的。
 */

import type { ThemeAssets } from '../types'
import { strip } from '../_shared/svgLib'

/**
 * tech-explainer 的调色板扩展：除 BasePalette 的状态四色 + primary 外，
 * 还需要 note 色（= textMuted）和 textInverse（stepBadge 白数字），
 * 故本主题内定义私有接口，不污染共享 lib。
 */
export interface TechExplainerPalette {
  primary: string
  accent: string
  border: string
  textMuted: string
  textInverse: string
  tipAccent: string
  warningAccent: string
  infoAccent: string
  dangerAccent: string
  noteAccent: string
}

export function techExplainerAssets(p: TechExplainerPalette): ThemeAssets {
  // ---------- h2Prefix：3px × 16px primary 短竖条 ---------- //
  // 规范 §1.3：唯一的 heading 装饰，克制、清爽。文字草图 `▌ 2. 配置环境`
  const h2Prefix = strip(`
    <svg viewBox="0 0 3 16" width="3" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:10px">
      <rect x="0" y="0" width="3" height="16" fill="${p.primary}"/>
    </svg>
  `)

  // ---------- 五态图标共性：16×16 viewBox、sw=1.5、stroke 空心 ---------- //
  // 共用一个极简 wrapper，保证五态视觉语系一致。

  /**
   * tipIcon：灯泡轮廓（圆头 + 2 道灯座横线），mint 绿
   * 规范 §1.3：不画灯光放射线，那是卡通化。
   */
  const tipIcon = strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M8,2 C5.5,2 3.8,4 3.8,6.4 C3.8,8 4.6,9.2 5.6,10 L5.6,11.5 L10.4,11.5 L10.4,10 C11.4,9.2 12.2,8 12.2,6.4 C12.2,4 10.5,2 8,2 Z"
            fill="none" stroke="${p.tipAccent}" stroke-width="1.5" stroke-linejoin="round"/>
      <line x1="6" y1="12.5" x2="10" y2="12.5" stroke="${p.tipAccent}" stroke-width="1.5"/>
      <line x1="6.5" y1="14" x2="9.5" y2="14" stroke="${p.tipAccent}" stroke-width="1.5"/>
    </svg>
  `)

  /**
   * noteIcon：空心圆 + 中央小 i（note 灰 = textMuted）
   * 规范 §1.3：中性信息标，区别于 info 的"圆角方+i"。
   */
  const noteIcon = strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <circle cx="8" cy="8" r="6" fill="none" stroke="${p.noteAccent}" stroke-width="1.5"/>
      <circle cx="8" cy="5" r="0.9" fill="${p.noteAccent}"/>
      <rect x="7.25" y="7" width="1.5" height="5" rx="0.4" fill="${p.noteAccent}"/>
    </svg>
  `)

  /**
   * infoIcon：圆角方形 + 中央 i（primary 蓝 = info 色）
   * 规范 §1.3：与 note 的圆形区分，方形 = "延伸知识点"的入口。
   */
  const infoIcon = strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <rect x="2" y="2" width="12" height="12" rx="2" fill="none" stroke="${p.infoAccent}" stroke-width="1.5"/>
      <circle cx="8" cy="5" r="0.9" fill="${p.infoAccent}"/>
      <rect x="7.25" y="7" width="1.5" height="5" rx="0.4" fill="${p.infoAccent}"/>
    </svg>
  `)

  /**
   * warningIcon：等边三角形 + 中央 !（warning 琥珀 #b87614）
   * 规范 §1.3：stroke 空心，不 fill，让底色透过来。
   */
  const warningIcon = strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M8,2 L14.5,13.5 L1.5,13.5 Z" fill="none" stroke="${p.warningAccent}" stroke-width="1.5" stroke-linejoin="round"/>
      <rect x="7.25" y="6" width="1.5" height="4" rx="0.4" fill="${p.warningAccent}"/>
      <circle cx="8" cy="11.5" r="0.9" fill="${p.warningAccent}"/>
    </svg>
  `)

  /**
   * dangerIcon：八边形 + 中央 ×（danger 陶土红 #c8322d）
   * 规范 §1.3：stop sign 的简化，不用禁止符（圆+斜线），语义是"危险"而非"禁止"。
   */
  const dangerIcon = strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M5.2,1.5 L10.8,1.5 L14.5,5.2 L14.5,10.8 L10.8,14.5 L5.2,14.5 L1.5,10.8 L1.5,5.2 Z"
            fill="none" stroke="${p.dangerAccent}" stroke-width="1.5" stroke-linejoin="round"/>
      <line x1="5.5" y1="5.5" x2="10.5" y2="10.5" stroke="${p.dangerAccent}" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="10.5" y1="5.5" x2="5.5" y2="10.5" stroke="${p.dangerAccent}" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `)

  // ---------- stepBadge：primary 蓝 fill 圆 + 白数字 ---------- //
  // 规范 §1.3：24×24 primary 蓝 fill 圆 + 中央白色数字（#fefefe 防透明化）
  // font-size 15（光栅后 ≥ 14 平台下限）、字重 600。
  const stepBadge = (n: number) => strip(`
    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:8px">
      <circle cx="12" cy="12" r="11" fill="${p.primary}"/>
      <text x="12" y="17" text-anchor="middle" font-size="15" font-weight="600" fill="${p.textInverse}">${n}</text>
    </svg>
  `)

  // ---------- copyIcon：两叠圆角方形（github/stripe 通用 ⧉ 语汇） ---------- //
  // 规范 §1.3：16×16，后方 sw=1.5 描边、前方 sw=1.5 描边 + 左下偏移 2px。
  // textMuted 色。代码块右上角装饰 —— 公众号不能真复制，但此图标是"这段代码是给你抄的"的文化信号。
  const copyIcon = strip(`
    <svg viewBox="0 0 16 16" width="14" height="14" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle">
      <rect x="5" y="2" width="9" height="9" rx="1.5" fill="none" stroke="${p.textMuted}" stroke-width="1.5"/>
      <rect x="2" y="5" width="9" height="9" rx="1.5" fill="none" stroke="${p.textMuted}" stroke-width="1.5"/>
    </svg>
  `)

  // ---------- externalLinkIcon（可选）：45° 箭头（MDN / Stripe Docs 通用外链标识） ---------- //
  // 规范 §1.3：12×12，primary 色 sw=1.5，一条对角线 + 箭头头 L + 方框左下 L
  const externalLinkIcon = strip(`
    <svg viewBox="0 0 12 12" width="10" height="10" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-left:3px">
      <path d="M5.5,1.5 L10.5,1.5 L10.5,6.5" fill="none" stroke="${p.primary}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="10.5" y1="1.5" x2="5.5" y2="6.5" stroke="${p.primary}" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M8.5,10.5 L1.5,10.5 L1.5,3.5" fill="none" stroke="${p.primary}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `)

  // ---------- terminalPrompt（可选）：$ 前缀 ---------- //
  // 规范 §1.3：提示"这行是 shell 命令"。单独作为 inline SVG。
  const terminalPrompt = strip(`
    <svg viewBox="0 0 18 14" width="14" height="12" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:4px">
      <text x="9" y="11" text-anchor="middle" font-size="14" font-weight="600" fill="${p.primary}">$</text>
    </svg>
  `)

  // ---------- sectionCorner：极简 L 形（可选装饰，bordered variant 不用） ---------- //
  // 规范 §2.4 要求 short-bar-heading，即 3px × 16px 竖条（已是 h2Prefix）。
  // sectionCorner 仅在 sectionTitle variant='cornered' 时才会用；tech-explainer 默认 bordered，保留作兜底。
  const sectionCorner = strip(`
    <svg viewBox="0 0 14 14" width="12" height="12" xmlns="http://www.w3.org/2000/svg"
         style="display:inline-block;vertical-align:middle;margin-right:6px">
      <path d="M1,1 L13,1 L13,4 L4,4 L4,13 L1,13 Z" fill="${p.primary}"/>
    </svg>
  `)

  // ---------- 分割线：只做 rule 默认线 + 点阵（规范 §2.17 禁用 wave / flower） ---------- //
  // dividerRule 走 variants/divider/rule.ts，不需要 asset；此处不暴露 dividerWave / dividerFlower，
  // 即便 divider variant 被用户临时切换也会走各 variant 的内置 SVG。
  const dividerDots = strip(`
    <svg viewBox="0 0 120 6" width="60" height="6" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="3" r="2" fill="${p.primary}"/>
      <circle cx="50" cy="3" r="2" fill="${p.primary}"/>
      <circle cx="70" cy="3" r="2.5" fill="${p.primary}"/>
      <circle cx="90" cy="3" r="2" fill="${p.primary}"/>
    </svg>
  `)

  return {
    h2Prefix,
    sectionCorner,
    dividerDots,
    tipIcon,
    warningIcon,
    infoIcon,
    dangerIcon,
    noteIcon,
    stepBadge,
    copyIcon,
    externalLinkIcon,
    terminalPrompt,
  }
}
