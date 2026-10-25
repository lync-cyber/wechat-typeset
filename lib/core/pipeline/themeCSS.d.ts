/**
 * Theme → <style> 字符串生成器
 *
 * 硬性约束：整个 Theme 对象中任何 CSSObject 不得出现 font-family；
 * 遇到则抛 ThemeAuthoringError，让主题作者立即发现。
 * 理由：微信客户端会用系统字体覆盖，写 font-family 无意义且浪费字符。
 */
import type { Theme } from '../themes/types';
export declare function generateThemeCSS(theme: Theme): string;
/** 测试钩子：本测试间清空缓存，避免上一个 it 的 theme 引用泄漏到下一个。 */
export declare function __resetThemeCssCacheForTest(): void;
