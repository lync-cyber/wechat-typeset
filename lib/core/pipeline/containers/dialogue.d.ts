/**
 * dialogue + dialogue-turn 容器（嵌套）
 *
 * 外层 4 冒号 dialogue；内层 3 冒号 dialogue-turn。dialogue-turn.body 是 markdown
 * 渲染的多段内容——必须 open / close 双段输出（参考 timeline-item），不能在
 * open 里吐完整 turn。markdown-it 会把每个 turn 的多段 / 列表渲染插入 open / close 之间。
 *
 * 4 个 variant 通过 DIALOGUE_STACK 栈顶 variantId 分派到独立 render 函数，
 * 让每个 variant 自主决定 turn 的"头/尾"HTML 结构。
 */
import type { ContainerRenderer } from './types';
export declare const dialogueContainer: ContainerRenderer;
export declare const dialogueTurnContainer: ContainerRenderer;
