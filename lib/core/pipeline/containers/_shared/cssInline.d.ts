/**
 * CSSObject → inline style 字符串。容器渲染器必须把 token 驱动样式落到 wrapper
 * 的 `style="..."` 上，才能在 juice 内联前就附在 DOM 上、避免被微信粘贴时的
 * CSS 提取/外联规则吞掉（themeCSS.ts 的 `<style>` 通路只服务 .markdown-body 选择器）。
 *
 * 行为：undefined/null/'' 跳过；number 补 px；string 仅 trim 不做单位推断；
 *      key trim 但保留 kebab-case 连字符。
 */
import type { CSSObject } from '../../../themes/types';
export declare function inlineCss(obj: CSSObject | undefined): string;
