/**
 * brutalist · 粗野主义报刊 · PersonaSpec
 *
 * 定位：凌晨三点印刷厂 —— 荧光黄是唯一允许存在的颜色。
 * 设计原型：docs/themes-specs/themes/07-brutalist.html
 * 视觉语汇：暗底 + 等宽字 + 直角硬边 + 荧光黄高亮 + 反色贴纸 + 终端注释 // 前缀。
 *
 * 三条不可妥协决策：
 *   1. radius = 0 全直角 —— "圆角即软，软即软文"，与粗野主义反向
 *   2. primary = #ebff00 荧光黄 —— 唯一允许的强调色，承担"被点名"的视觉重量
 *   3. status 四态打破交通灯：NOTE 蓝 / TIP 绿 / WARN 黄 / HALT 红
 *      —— "STOP" 太工业平淡，"HALT" 更 brutalist-aggressive 的终端 / 汇编传统
 *
 * 复用关系：除签名变体 `tilted-sticker` 与 masthead 的 `kicker` ribbon 模式外，
 * 全部容器 / 变体 / 装饰均复用现有词汇：
 *   - admonition · news-row（"四态共骨架 + 色相 + 标签字"）—— data-brief 同源
 *   - masthead / toc / qa-block / footnotes / colophon —— data-brief 家族签名容器
 *   - note variant=editorial-stripe（编 者 按）/ qrcode variant=follow-card（订阅卡）
 *   - footer-cta variant=triptych-actions（LIKE / STAR / FWD 三栏）
 *   - decorations.headingPrefix · arabic-padded / arabic-section —— 章节序号
 *
 * 平台兼容：transform:rotate 不在 wxPatch 删除列表（FORBIDDEN_POSITION_PROPS 不含），
 * tilted-sticker 的 -1deg 在公众号粘贴期保留。font-family 仍统一被剥（系统字体兜底）;
 * 等宽语义靠 letter-spacing 与字号节奏承担，而非真等宽字。
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
