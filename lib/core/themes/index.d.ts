/**
 * Theme 运行时入口。spec 注册表见 ./registry；本文件只做 spec → Theme 投影 + 索引。
 */
import type { Theme } from './types';
export declare const themeList: readonly Theme[];
export declare const themeRegistry: Readonly<Record<string, Theme>>;
export declare function getTheme(id: string): Theme;
