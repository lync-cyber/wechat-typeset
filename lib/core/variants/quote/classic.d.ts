/**
 * quote · classic（默认）
 *
 * 视觉：浅底卡 + 大号装饰引号（theme.assets.quoteMark 或回退字符）+ 居中排布。
 * byline（ctx.info）由 container renderer 在 close 时拼 "— 作者"。
 */
import type { VariantDef, TokenSchema } from '../_core';
/**
 * tokens 暴露：金句卡的浅底色 + 正文字号——这两个最常被作者要求"调一格"。
 * mark 颜色不开放（主题 assets.quoteMark 是整段 HTML，没有单独颜色变量可抽）。
 * bgSoft default 用 'inherit' 占位（实际 fallback 由 render() 内的 ctx.tokens.colors.bgSoft 承担）。
 */
export declare const tokenSchema: TokenSchema;
declare const classic: VariantDef;
export default classic;
