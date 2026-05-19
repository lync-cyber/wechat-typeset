import type { Theme } from '../themes/types';
import type { UserVariant } from '../variants/userVariant';
import type { WxPatchOptions } from './platforms/wechat';
import type { PatchLog } from './platforms/types';
import { type FrontmatterParseIssue, type PageConfig } from './frontmatter';
export interface RenderInput {
    md: string;
    theme: Theme;
    /** 平台 id，默认 'wechat'；走 platforms/registry 派发，未知 id 抛错。 */
    platform?: string;
    /** 仅当 platform='wechat' 时生效；其它平台静默忽略。 */
    wxPatch?: WxPatchOptions;
    /**
     * 用户态变体快照。入口处一次性转 Map 注入 markdown-it env，由 renderer 在
     * attrs.variant=uv_xxx 时 O(1) 查表。
     *
     * 不进 mdCache key：用户变体每次编辑都可能变，但走的是 attrs.variant 单容器级
     * 开销（每篇文章命中条数 ≤ 容器数），缓存键化反而引入 LRU thrash。
     *
     * 缺省 / 空数组 = 不注入 env 字段，对未声明用户变体的渲染零开销。
     */
    userVariants?: readonly UserVariant[];
}
export interface RenderOutput {
    html: string;
    wordCount: number;
    readingTime: number;
    /** 本次渲染对 HTML 做的微信适配列表，供"渲染透明度面板"展示。 */
    patchLog: PatchLog;
    /**
     * Markdown frontmatter（L2 页面局部配置）解析结果——`theme:` 已在上游 `src/public/render`
     * 消费完，pipeline 不再二次生效；此字段透传仅供观察与诊断。
     */
    pageConfig: PageConfig;
    frontmatterIssues: readonly FrontmatterParseIssue[];
}
export declare function render(input: RenderInput): RenderOutput;
