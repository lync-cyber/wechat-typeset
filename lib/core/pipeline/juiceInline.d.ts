/**
 * juice/client 封装
 *
 * 输入：包含 <style> 块的完整 HTML 片段（字符串）
 * 输出：<style> 被内联到元素 style 属性后的 HTML 字符串，<style> 被移除
 *
 * 注意：juice/client 的导出是 inlineContent(html, css, options) 而非 Node 版本
 * 的 juiceFile / juiceResources。我们这里把 <style>…</style> 抽出来手动调用。
 */
export declare function inlineHtml(htmlWithStyle: string): string;
