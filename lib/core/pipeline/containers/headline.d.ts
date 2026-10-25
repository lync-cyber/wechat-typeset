/**
 * 头部/节点叙事容器：intro / cover / author / sectionTitle
 *
 * - intro：文章开头"引子"卡；承载背景+立意。外框 section，内部自由排版。
 * - cover：封面卡，通常内含一张图 + 一行描述。不做 aspect-ratio 强制。
 * - author：作者栏，placeholder 版本。info 作为作者名。
 * - sectionTitle：小节大标题 —— 不靠 Markdown ## 表达的"强力分章线"，
 *   由 theme.assets.sectionCorner 装饰（Step 5）。此处先出标题行。
 */
import type { ContainerRenderer } from './types';
export declare const introContainer: ContainerRenderer;
export declare const coverContainer: ContainerRenderer;
export declare const authorContainer: ContainerRenderer;
export declare const sectionTitleContainer: ContainerRenderer;
