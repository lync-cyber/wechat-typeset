/**
 * markdown-it 实例构造
 *
 * 启用插件：container / mark（==高亮==）/ ins / footnote / task-lists，
 * 再叠加两条自定义 inline rule（[.着重.] / [~波浪~]）。
 *
 * 容器：从 CONTAINER_REGISTRY 读取每个容器的 open/close 渲染器，
 * 绑到 markdown-it-container。open 调用时解析 info + attrs；
 * close 如果是函数，会复用同一组 ctx（info/attrs 由容器栈回退得到）。
 *
 * 嵌套容器（compare 包 pros/cons）依赖 fence 长度：外 `::::`、内 `:::`。
 */
import MarkdownIt from 'markdown-it';
import type { Theme } from '../themes/types';
import type { UserVariantCustom } from '../variants/userVariant';
export interface CreateMarkdownOptions {
    theme?: Theme;
    /**
     * Custom UV 必须在 createMarkdown 闭包里注册 fence（`uc-${uv.id}`）才能命中；
     * 与 tokens/patch（走 env.__wxUserVariants Map）的分派路径正交。调用方按 level
     * 切分 UV 集合，custom 喂这里，其余走 env。
     * 任一 custom UV 变化都需新建 MarkdownIt 实例（mdCache key 必须含 customsSig）。
     */
    customVariants?: readonly UserVariantCustom[];
}
export declare function createMarkdown(options?: CreateMarkdownOptions): MarkdownIt;
