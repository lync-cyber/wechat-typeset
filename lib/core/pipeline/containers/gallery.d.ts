/**
 * gallery + image-item · 多图组合（4 个空间布局 variant）
 *
 * 弥补 image-caption 只能单图、markdown 多图串联无版式的缺陷。
 *
 * 栈契约（同 KPI_DASHBOARD_STACK）：
 *   gallery.open 推 { variantId, itemCount } 入栈；image-item.open 查栈顶 variantId
 *   分派到 4 个 cell 渲染器；image-item.close 为空（cell 完整 HTML 在 open 一次性吐出）。
 *
 * 为什么 image-item.close 为空：duo / triptych 是 table-cell 的兄弟节点，
 *   nine-grid / ribbon-strip 是 inline-block 的兄弟节点——两种形态都没有"半开 cell"概念。
 */
import type { ContainerRenderer } from './types';
export declare const galleryContainer: ContainerRenderer;
export declare const imageItemContainer: ContainerRenderer;
