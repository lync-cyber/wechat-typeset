/**
 * 行内扩展清单：单一真源。capabilities.json / writer-docs / skill references 全部读这一份。
 * 新增扩展必须同时在 markdown.ts (插件 / 规则) 与本表登记。
 */
export interface InlineExtensionSpec {
    syntax: string;
    description: string;
    /** 触发该扩展的正则（字符串形态，下游 LLM 直接消费）。 */
    regex: string;
    /** 作者输入样例（markdown 源码片段）。 */
    inputExample: string;
    /** 渲染后等价 HTML 片段（含包裹元素），便于下游做"反向匹配 / 预览校验"。 */
    outputHtmlExample: string;
}
export declare const INLINE_EXTENSIONS: readonly InlineExtensionSpec[];
