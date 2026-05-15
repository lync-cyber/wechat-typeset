/**
 * 内置 free 组件 snippet 源。这里登记的 VariantDef（kind:'none'）的 `render`
 * 被省略——只有 `snippets` 字段被 BUILTIN_COMPONENTS 摊平消费；真正的容器渲染
 * 在 pipeline/containers/{file}.ts（headline / footer / media / quote）。
 *
 * 用途：给 ComponentPalette 的"其它"分类提供可一键插入的 markdown 片段
 * （intro / cover / author / footer-cta / recommend / qrcode / mpvoice / mpvideo / highlight）。
 *
 * 新增 snippet 源：本目录下新建 `<id>.ts`（default export 一个 VariantDef，kind:'none'，
 * 含 snippets），在此文件 import 并追加到数组。
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
