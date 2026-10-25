/**
 * compare / pros / cons 容器。wrapper 与列共用同一套 variant 模块，通过 slot
 * 参数分派：compare→'wrapper'，pros→'pros'，cons→'cons'。所有 variant 都避开
 * flex，改用 table / block + margin 组合——公众号粘贴后样式稳定。
 *
 * variant：column-card（display:table 等高两栏）/ stacked-row（小屏堆叠）/
 *           ledger（账本双色 tip.soft / danger.soft）。
 */
import type { ContainerRenderer } from './types';
export declare const compareContainer: ContainerRenderer;
export declare const prosContainer: ContainerRenderer;
export declare const consContainer: ContainerRenderer;
