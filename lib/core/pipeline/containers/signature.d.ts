/**
 * 签名容器渲染器（abstract / key-number）—— 两者都**有内容结构约定**
 * （abstract 有 kicker、key-number 有 value 显示层级），不走 admonition 的
 * variant 分派（避免把 variant 模块污染成模板引擎），改读 ctx.containers.<x>
 * （主题 CSS 槽位）+ ctx.innerStyles.<x>（内层 inline style，主题可深合并接管，
 * 如把 keyNumber 数字字号从 32px 调到 28px）。
 *   - abstract：文章头部 tl;dr。kicker（"Abstract / 摘要"）+ body markdown。
 *   - key-number：大字号数字 + 说明。attrs.value 放数字本体，info 放 kicker，body 放详解。
 */
import type { ContainerRenderer } from './types';
export declare const abstractContainer: ContainerRenderer;
export declare const keyNumberContainer: ContainerRenderer;
