/**
 * free 目录聚合器（free 容器变体：cover / intro / author / recommend 等）。
 * 新增 free variant 两步：
 *   1. 本目录下新建 `<id>.ts`，default export 一个 VariantDef（含 markdownSnippet）
 *   2. 在此文件 import 并追加到数组
 * free variant 会被 `BUILTIN_COMPONENTS` 摊平供组件库 UI 使用。
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
