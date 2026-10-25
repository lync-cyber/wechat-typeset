/**
 * note · smallcaps-kicker
 *
 * 视觉：上 letter-spaced uppercase 小字 kicker + hairline + 正文。
 * 粗野主义 / 数据简报骨架——比 minimal-callout 更"模块化"，标题与正文之间有一道
 * 主色 hairline 分隔，但整体仍走 textMuted 中性色调。
 *
 * ctx.attrs.layout 结构性开关（不是颜色/尺寸旋钮，不走 tokenSchema）：
 *   缺省 / 'top-rule' → 顶 2px 主色线（默认行为）
 *   'hanging'         → 悬挂缩进无顶线（text-indent:-12px，学术 / 笔记风）
 */
import type { VariantDef } from '../_core';
declare const smallcapsKicker: VariantDef;
export default smallcapsKicker;
