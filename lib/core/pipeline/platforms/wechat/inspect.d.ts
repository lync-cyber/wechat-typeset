/**
 * wechat patch 变更计数 —— 供"渲染透明度面板"展示本次渲染对原始 HTML 做的适配。
 *
 * 为什么走"扫描计数"而不是"改装每个 patch 返回 log"：
 *   所有 patch 都是幂等的（满足"看到已处理标记跳过"的性质），因此
 *   **扫描尚未修补的 HTML** 得到的目标数 === 即将被修补的元素数。
 *   这样每个 patch 的函数签名无需改变，测试也不需要配合重写；计数逻辑在
 *   单一模块里维护，一次 DOM 遍历拿到全部数据。
 *
 * 与 ./patch.ts 的约束关系：
 *   每新增一个 patch，此处对应加一段扫描。Stage 3 当前覆盖：
 *     - patchListWrap          （listWrap + deepList 两条）
 *     - stripForbiddenAttrs    （id + position/top/z-index 等）
 *     - stripForbiddenTags     （hard-remove + 非白名单 iframe）
 *     - stripFontFamily
 *     - patchFlexToFallback
 *     - patchSvgIds
 *   暂不计入（实现代价大于信息增益）：patchSvgUrlQuotes / patchSvgWhiteBg —— 这两
 *   个属于"字符级样式修正"，不产生结构变动，作者无需在透明度面板感知。
 */
export interface PatchLogSample {
    /** 节点的"路径式"选择器（如 `section.container-pull-quote__title`），便于作者反查源码位置。 */
    selector: string;
    /** 即将被改写 / 剥离的原文片段（如 `font-family: 'Source Han Serif'`）。 */
    before: string;
}
export interface PatchLogEntry {
    /** patch 函数名（稳定键，供测试断言） */
    patch: string;
    /** 面向作者的中文说明（给 UI 用） */
    label: string;
    /** 命中次数（元素 / 声明 / 节点） */
    count: number;
    /**
     * 前 N 处命中的"原文片段"样本，给 UI 显示 diff 用（步骤 6）。
     * 没采集到样本（或 patch 性质本就不适合采样，如纯结构包裹）的条目不设此字段。
     * 上限：见 inspect.ts:SAMPLE_LIMIT；多于该数静默截断，不污染。
     */
    samples?: ReadonlyArray<PatchLogSample>;
}
export interface PatchLog {
    entries: PatchLogEntry[];
    /** Σ entries[i].count —— 给"共 N 处修改"文案用 */
    total: number;
}
/**
 * 扫描 juice 内联后、wxPatch 应用前的 HTML，返回即将被各 patch 命中的次数。
 * 解析失败 / 空 HTML 返回空 log，不抛异常。
 */
export declare function inspectPatchTargets(html: string): PatchLog;
