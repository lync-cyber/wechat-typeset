/**
 * late-night-vinyl · 深夜电台 · PersonaSpec
 *
 * 视觉灵魂：03:41 AM —— 黑胶落针声后，声音和文字都变慢了。
 *   深夜蓝黑底 + 暖米白字 + 橙色唱针 + 老金辅助 + monospace 电台元数据。
 *
 * 视觉 ground truth：docs/themes-specs/themes/09-late-night-vinyl.html。
 *
 * 与其它"刊物化"主题的边界：
 *   - data-brief 走"数据蓝 + 报告版式 + 直角"——理性、数字、报表感
 *   - editorial-mook 走"米白 + 朱橙 + 单字 CJK 附注"——慢读、编集
 *   - late-night-vinyl 走"深夜蓝 + 暖米白 + 橙色单点缀"——电台、声音、慢
 *
 * 三条不可妥协决策：
 *   1. 暗底纪律：bg = #0e1a2b 深夜蓝黑（不是黑），text = #d9c9a8 暖米白
 *      （不是纯白；纯白在暗底刺眼）。配色族系完全脱离 default 浅底假设。
 *   2. radius 全部为 0（直角硬边）——黑胶 / 磁带 / 老式收音机的几何语言
 *   3. accent 稀缺：橙 #d97a3c 单色担当所有 highlight / 链接 / kicker /
 *      章节序号 / pull-quote 上下线。secondary 老金 #a89070 做"元数据"灰色调
 *
 * 复用纪律（与 user 指令 §3 §4 对齐）：
 *   - 21 个设计组件 100% 通过现有 container / element / variant 体系表达
 *   - 不新增任何 container；签名 admonition variant 走现有 news-row（status 四色对应
 *     电台广播母语 cue / b-side / static / off-air 标签）
 *   - 装饰类（vinyl SVG、side-b 三横线）走 markdown 标准 img / divider，不为
 *     "一次性视觉"新建组件
 *   - 章节自动编号（01 / 02 / 03）由 decorations.headingPrefix 一处声明、管线统一执行
 *
 * 微信公众号兼容性处理（与 user 指令 §2 对齐）：
 *   - 禁 font-family / position / float / @media / @keyframes / :hover —— 全部由
 *     themeCSS guard + variant-sanity 测试守住,本 spec 不触碰
 *   - 禁 display:flex / display:grid —— 仅在 renderer inline style 出现（容器骨架），
 *     主题层 elements / containers CSS 不写
 *   - SVG 白色一律使用 #fefefe（NEAR_WHITE），避免 SVG→PNG 光栅化把纯白转 alpha=0
 *   - pre 代码块走 overflow-x:auto + white-space:pre + inset box-shadow，与 default
 *     共用代码块横滑契约（公众号移动端原生支持触摸横滑）
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
