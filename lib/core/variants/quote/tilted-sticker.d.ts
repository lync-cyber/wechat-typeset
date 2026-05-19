/**
 * quote · tilted-sticker（旋转贴纸金句）
 *
 * 视觉：punk-zine / 粗野主义印刷传统的"撕下来的贴纸"——信息卡轻微旋转 -1deg,
 * 大号 sans 粗体正文 + 左对齐 + 直角硬边。punk-zine 的 DNA 由 transform:rotate
 * 与 border-radius:0 承担,颜色取主题"软底色"token 保证 `<p>` 默认字色（tokens.text）
 * 在底色上仍有充分对比——而非"反色卡"硬翻 token，那条路径会让 baseElements 注入的
 * inline `<p style="color: text">` 与 wrapper bg=tokens.text 同色，正文不可读。
 *
 * 适用主题：粗野主义报刊（brutalist）/ 深夜电台（late-night-vinyl）/ 未来的 zine /
 * 朋克编辑系。每个主题的 bgSoft 已被作者刻意配为"比 bg 略提一档的信息卡底"，
 * 与正文 tokens.text 形成主题自有的对比节奏。
 *
 * 实现纪律：
 *   - transform:rotate 在 WeChat 粘贴期不被剥（不在 FORBIDDEN_POSITION_PROPS / 不在
 *     wxPatch 删除列表）。CSS specificity 上属 inline，能被覆盖
 *   - 不使用 font-family（被 stripFontFamily 剥掉）。粗体 + 大字号承担字体气质
 *   - text-align:left 故意区别于 classic 的居中——punk-zine 的张力来自对齐"不规整"
 *   - 不显式 bodyCSS.color：让 `<p>` 走 baseElements 默认 tokens.text，避免与
 *     wrapper bg 同 token 造成"字 = 底"的不可读
 */
import type { VariantDef } from '../_core';
declare const tiltedSticker: VariantDef;
export default tiltedSticker;
