/**
 * 容器渲染器注册表
 *
 * 使用方：pipeline/markdown.ts 在构造 MarkdownIt 时遍历此 Map，
 * 把每个 name → ContainerRenderer 绑到 markdown-it-container 上。
 *
 * 注意 fence 长度：
 *   compare 必须用 4 个冒号（`::::`），其内部 pros/cons 用 3 个（`:::`）。
 *   markdown-it-container 按 fence 长度匹配闭合，同名同长度才互相关闭。
 *   这是插件的原生行为，不是我们的规定。
 */
import type { ContainerRenderer } from './types';
export declare const CONTAINER_REGISTRY: Record<string, ContainerRenderer>;
export type { ContainerRenderer, ContainerRenderContext } from './types';
export { parseInfo } from './types';
