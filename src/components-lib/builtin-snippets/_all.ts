/**
 * 内置 free 组件 snippet 源（R6 改名：原 src/variants/free/）。
 *
 * 这里登记的"VariantDef with kind:'none'"其实不是真正的容器骨架变体——
 * 它们的 `render` 是省略的；只有 `snippets` 字段被 BUILTIN_COMPONENTS 摊平消费。
 * 真正的容器渲染逻辑在 src/pipeline/containers/{file}.ts（headline / footer / media / quote）。
 *
 * 用途：给组件库 UI（ComponentPalette）抽屉的"其它"分类提供可一键插入的
 * markdown 片段（intro / cover / author / footer-cta / recommend / qrcode / mpvoice /
 * mpvideo / highlight 等）。
 *
 * 新增 snippet 源两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef（kind:'none'，含 snippets）
 *   2. 在此文件 import 并追加到数组
 *
 * 为什么放在 components-lib 而不是 variants：R6 概念清理。"variant" 一词原本被三件事
 * 共用（容器骨架 / SvgVariant 工厂 / 自由组件 snippet 源），让阅读 src/variants/ 时
 * 无法快速分辨。snippet 源是组件库的资产，归 components-lib 更合适。
 */

import intro from './intro'
import author from './author'
import cover from './cover'
import highlight from './highlight'
import footerCta from './footer-cta'
import recommend from './recommend'
import qrcode from './qrcode'
import mpvoice from './mpvoice'
import mpvideo from './mpvideo'

export default [intro, author, cover, highlight, footerCta, recommend, qrcode, mpvoice, mpvideo]
