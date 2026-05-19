/**
 * stripFontFamily：从所有 inline style 中剥 font-family。
 *
 * 设计原则：
 *   公众号读者的字体取决于 iOS/Android 系统默认，作者侧指定 font-family 只会
 *   带来"A 机型和 B 机型看到不同字体"的反直觉体验。我们在 themeCSS 层就已经
 *   严禁主题声明 font-family（generateThemeCSS 遇到会 throw）；
 *   但 inline style 可能来自 markdown-it 插件或用户写的 HTML，此处兜底清理。
 */
export declare function stripFontFamily(html: string): string;
