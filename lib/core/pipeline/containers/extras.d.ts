/**
 * 第二批 base 容器渲染器：announcement / author-bio / image-caption / timeline
 *
 * 与 admonition / signature / data-brief 家族的边界：
 *   - announcement: 文章级强警示横幅（比 tip/warning 强势）；走 variant 注册表分派
 *     （danger-bar / mono-disclaimer / ai-notice / stamped-banner）。attrs.tone 在
 *     variant render 内通过 _tone.ts 映射到 status key（primary→info, accent→tip, 其它→danger）。
 *   - author-bio: 多行作者简介卡。与 author 单行署名行正交。attrs.avatar 触发头像渲染。
 *   - image-caption: 图 + 居中小字灰说明。attrs.src 触发 img 自动渲染；body 接续描述。
 *   - timeline: 年份 + 事件的时序列表；外层 4 个冒号，内部 timeline-item 列条目。
 *     与 steps 的边界：steps 是动作序列，timeline 是历史时序。
 */
import type { ContainerRenderer } from './types';
export declare const announcementContainer: ContainerRenderer;
export declare const authorBioContainer: ContainerRenderer;
export declare const imageCaptionContainer: ContainerRenderer;
export declare const timelineContainer: ContainerRenderer;
export declare const timelineItemContainer: ContainerRenderer;
