/**
 * 封面占位 SVG 构造器
 *
 * 9 套主题的封面 visual identity 走"同骨架 + 不同 palette + 可选 accent 元素"路线：
 * 骨架由本助手统一产出（标题左上、副标题、底色、装订线），每个 persona 通过自家
 * palette 染色，并可选传入若干"自家 motif 词汇"primitives（如极客主题的装订孔
 * 竖条、人文主题的朱砂方框）覆盖在右下 / 右侧——这是 cover 的 "persona 签名"。
 *
 * 输出 viewBox 永远是 [0, 0, 1200, 630]（og:image / 公众号图文封面 1.91:1）。
 *
 * 为什么集中在助手里：9 个 persona spec 不希望各自重复 60+ 行布局代码；同时本助手
 * 仍是 build-time 产出 JSON-serializable MotifShape——spec 文件层面"零运行时函数"。
 */
import type { MotifPrimitive, MotifShape, Palette } from './types';
export interface CoverBuilderOptions {
    palette: Palette;
    /** 主标题（persona name 中文） */
    title: string;
    /** 副标题（persona description / audience 浓缩） */
    tagline?: string;
    /** 顶部小字 kicker（如 'TYPESETTING' / '排版主题' / 'theme 编号'） */
    kicker?: string;
    /**
     * persona 签名 motif：自由排版的 primitives 列表（已按 1200×630 坐标系作图）。
     * 助手把它们叠在装订线之外的右侧空区作 hero。缺省时只有 palette 染色的纯骨架。
     */
    signaturePrimitives?: readonly MotifPrimitive[];
    /**
     * 主标题 font-family；缺省 sans-serif。serif 主题（人文 / 学术）建议传 'serif'。
     */
    titleFamily?: 'serif' | 'sans-serif' | 'monospace';
    /** 主标题 font-weight；缺省 700 */
    titleWeight?: number;
    /** 主标题 font-size；缺省 84（顶级布局） */
    titleSize?: number;
}
export declare function makeCoverPlaceholder(opts: CoverBuilderOptions): MotifShape;
