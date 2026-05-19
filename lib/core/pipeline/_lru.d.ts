/**
 * 极简 LRU 缓存 —— 用于 pipeline 内热点对象（MarkdownIt 实例、themeCSS 字符串）。
 * 基于 Map 的"迭代序 = 插入序"语义实现：get 命中时删除后重新 set 到末尾；set
 * 满时淘汰 keys().next().value（最老）。容量个位数，不引入 lru-cache 依赖。
 */
export interface LRU<K, V> {
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    has(key: K): boolean;
    delete(key: K): boolean;
    clear(): void;
    readonly size: number;
}
export declare function createLRU<K, V>(max: number): LRU<K, V>;
