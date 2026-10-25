/**
 * 默认模板集合（4 套主题共用的"容器语法"片段库）
 *
 * 写进 theme.templates 供 UI 模板市场调用。每个模板是一段 Markdown 字符串，
 * 用户点选后由编辑器在光标处插入。模板主题无关（用的都是容器语法），
 * 不同主题会通过 tokens/assets 呈现出不同质感。
 */
export declare const commonTemplates: {
    cover: string;
    authorBar: string;
    footerCTA: string;
    recommend: string;
    compare: string;
    steps: string;
    tip: string;
};
