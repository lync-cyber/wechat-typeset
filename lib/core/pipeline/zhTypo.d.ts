/**
 * 中文排版修订 —— 把中英混排常见的"半角噪声"统一到中文书刊标准。
 *
 * 规则（code 与 diagnose.ts 对齐）：
 *   1. zh-ascii-spacing   —— CJK 与 ASCII 字母/数字之间插入半角空格
 *   2. zh-halfwidth-punct —— CJK 后紧邻 `,` `.` `!` `?` `:` `;` 改为全角 `，。！？：；`
 *   3. zh-straight-quote  —— 含 CJK 的段内 `"xxx"` 改为 `"xxx"`；单引号保留（歧义过大）
 *   4. zh-dash-ellipsis   —— CJK 周围的 `...`→`……`、`--`→`——`
 *
 * 保护区（不触碰）：
 *   - ``` ``` ``` fenced 代码块 ```
 *   - 缩进代码块（行首 ≥ 4 空格）
 *   - inline code (`` `...` ``)
 *   - URL（`https?://...` 直到空白）
 *   - markdown 链接 URL 部分：`](...)`
 *   - HTML 标签：`<...>`
 *
 * 出口：
 *   - `scanZhTypo(src)` 返回命中列表（供 diagnose / 显示）
 *   - `fixZhTypo(src)`  返回一次性修正后的字符串（供 Toolbar "一键修复"）
 *
 * 同一份 Hit 在两个出口间共享，是"检测 ↔ 修正"一致性的单一真源。
 */
export type ZhTypoCode = 'zh-ascii-spacing' | 'zh-halfwidth-punct' | 'zh-straight-quote' | 'zh-dash-ellipsis';
export interface ZhTypoHit {
    /** 半开区间 [from, to)，覆盖"被修改的原片段"（含上下文字符） */
    from: number;
    to: number;
    code: ZhTypoCode;
    /** 原文片段（便于诊断消息直接引用） */
    original: string;
    /** 修正后的等价片段（长度可不同） */
    replacement: string;
}
/** 扫描全文返回所有命中，按 from 升序。保护区内不命中。 */
export declare function scanZhTypo(source: string): ZhTypoHit[];
/**
 * 一次性把所有命中应用到 source，返回修正后的字符串。
 *
 * 注意：同一个偏移可能同时命中多条规则（如 `word。` 先空格再标点）——此处按 from
 * 从后向前应用，遇到与上一次修改**发生重叠**的 hit 丢弃，避免二次改写。
 * 作者可以再点一次"一键修复"完成二轮收敛。
 */
export declare function fixZhTypo(source: string): string;
/**
 * F3 diff 路径：与 fixZhTypo 行为完全一致，同时返回每条改动在 **新文本** 中的
 * post-fix 半开区间，供编辑器装饰高亮（让作者看到"哪些片段被一键修复改了"）。
 *
 * 实现两阶段：
 *   1) 倒序模拟一次"重叠跳过"决策，挑出真正被采纳的 hits（与 fixZhTypo 算法一致）
 *   2) 正序应用 + 累计 delta，得到每条 hit 在新串中的位置
 *
 * 没有把这层算法塞回 fixZhTypo 是为了 fixZhTypo 保持 O(n) 单次分配 + 单一职责
 * （现有 29 个单测、其它消费方仅需 string→string）。
 */
export interface FixZhTypoRange {
    /** 新文本中的起点（含） */
    from: number;
    /** 新文本中的终点（不含） */
    to: number;
    code: ZhTypoCode;
}
export interface FixZhTypoResult {
    fixed: string;
    /** 长度 = 实际被采纳的 hits 数；按 `from` 升序 */
    ranges: FixZhTypoRange[];
}
export declare function fixZhTypoWithRanges(source: string): FixZhTypoResult;
