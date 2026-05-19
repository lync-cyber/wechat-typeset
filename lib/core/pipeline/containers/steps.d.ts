/**
 * steps 容器。variant 只管 wrapper + 标题行样式；内部 h3 由用户编号或主题
 * assets.stepBadge(n) 在 writer 阶段注入，renderer 不做 h3 级联。
 * 与 admonition 的差异：未传 defaultText 时仅 ctx.info 非空才渲染标题。
 */
import type { ContainerRenderer } from './types';
export declare const stepsContainer: ContainerRenderer;
