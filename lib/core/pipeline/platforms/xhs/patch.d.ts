/**
 * 小红书平台 patch 占位
 *
 * 当前状态：identity（不修改 HTML）。
 *
 * 小红书图文创作器与公众号 / 知乎差异更大：
 *   - 富文本支持窄：粗体、链接、@话题；段落级样式基本不带入
 *   - 图片走自家上传通道；外链图通常会丢
 *   - 长内容需要拆图（"九宫格" / 多图）；HTML → 视觉图的方向，与本工具复制富文本路径不一致
 *
 * 因此本占位主要服务于"未来若有作者要把工具产物当原始 HTML 备份"场景；
 * 真正的小红书适配可能更接近"导出图片"而非"copy HTML"，届时再决定 patch 形态。
 */
export interface XhsPatchOptions {
    /** 占位字段，待具体 patch 实现时再细化 */
    _reserved?: never;
}
export declare function applyXhsPatches(html: string, _opts?: XhsPatchOptions): string;
