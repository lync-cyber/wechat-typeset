/**
 * inline `style="..."` 字符串 → IRBox。
 *
 * 不依赖 jsdom 的 CSSOM（jsdom 解析 inline style 在 ESM 下偶有别字段名兼容问题），
 * 直接走字符串切分。设计稿的 inline style 都是手写规整的 `prop:value;prop:value;`
 * 形态，正则切分稳定。
 */
import type { IRBox } from './types';
import type { DesignTheme } from './types';
/** 'a:1;b:2' → { a: '1', b: '2' } —— 容忍尾分号缺失 / 空格 / 引号内分号（如 font-family）。 */
export declare function parseInlineStyle(raw: string): Record<string, string>;
/**
 * inline style → IRBox。color/background 字面同时携带 token 建议。
 */
export declare function styleToBox(rawStyle: string, designTheme: DesignTheme): IRBox;
