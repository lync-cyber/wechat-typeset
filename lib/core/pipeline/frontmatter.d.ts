/**
 * 轻量 frontmatter 解析（P0 · L2 页面局部配置）。
 *
 * 设计纪律：只识别白名单字段（variants / theme），其它键收进 unknown 报告但不写入
 * 渲染上下文。严格 YAML 子集——支持 `key: value` 与一层缩进的 `key:` 嵌套对象，
 * 足够 variants slot 表达；故意不引入 yaml/gray-matter 依赖（bundle 体积 + 平台粘贴
 * 安全考虑：复杂 YAML 让作者写出 anchors / tags / multiline 反而是漂移源）。
 *
 * 失败语义：解析任何一条非法值都不抛错，记入 issues 让上层（pipeline / render API）
 * 决定 warning 还是静默——遵循"frontmatter 缺省即可"的承诺，L2 是可选层。
 */
import type { ThemeVariants } from '../themes/types';
/** L2 页面级配置承载。所有字段可缺省。 */
export interface PageConfig {
    /** 页面级 variant 覆盖（按 slot 部分指定），介于 attrs.variant 与 theme.variants 之间。 */
    variants?: Partial<ThemeVariants>;
    /** 页面级主题切换。覆盖 render(input.persona/theme/spec)；id 须命中已注册主题。 */
    theme?: string;
}
export interface FrontmatterParseIssue {
    path: string;
    message: string;
    severity: 'error' | 'warning';
}
export interface FrontmatterParseResult {
    /** 解析得到的页面配置（白名单字段） */
    config: PageConfig;
    /** 剥去 frontmatter 后的 markdown 正文 */
    body: string;
    /** 解析期间发现的问题（非法 variant id / 未知主题 / 未知键 等） */
    issues: FrontmatterParseIssue[];
}
/**
 * 解析 markdown 开头 `---\nyaml\n---` frontmatter。
 *
 *   - 没有 frontmatter：返回 { config: {}, body: 原文, issues: [] }
 *   - 有 frontmatter：剥离 + 校验后返回；非法字段写 issues 不抛错
 */
export declare function parseFrontmatter(source: string): FrontmatterParseResult;
