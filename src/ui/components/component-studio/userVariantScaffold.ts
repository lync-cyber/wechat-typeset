/**
 * patch / custom 档默认脚手架 —— 把空编辑器变成"3 行能跑"的最小示例，
 * 降低作者对 inline CSS 追加 / 自定义模板的心智门槛。
 *
 * 设计原则：
 *   - 脚手架内容必须通过 lintInlineCSS / lintTemplateHTML 硬闸（作者按"保存"也不会被拦）
 *   - 不使用 CSS 注释 —— 作者要么改值要么 Ctrl+A 删了重写，最终保存的就是真 CSS
 *   - 教学价值在"形态"而非"内容"：作者一眼看到 `prop: value;` 三连写、看到 template
 *     里 `{{title}}` / `{{body}}` 怎么和 CSS slot 互联，就知道接下来怎么写
 *
 * 与基底 variant 解耦：脚手架不读 (kind, variantId) —— 这层教学跟主题 / 骨架无关，
 * 跟 inline patch 这种**形式**有关。把脚手架做成纯字面常量便于单测和复用。
 */

import type { DraftCssPatch, DraftCustom } from './useComponentDraft'

/**
 * patch 档脚手架：三个 slot 各 3 条常用属性。所有 prop 都不在
 * FORBIDDEN_CSS_PROPS（无 position/float/font-family 等），lint 直接通过。
 *
 * 形式上是合法 inline style 片段，会被 cascade 追加到基底之后—— 作者点保存即可看到
 * 视觉变化、立刻验证"是 work 的"。
 */
export function defaultPatchScaffold(): DraftCssPatch {
  return {
    wrapperCSS:
      'background-color: #f6f7f9;\n' +
      'padding: 16px 20px;\n' +
      'border-radius: 8px;',
    titleCSS:
      'color: #1a1a1a;\n' +
      'font-size: 16px;\n' +
      'font-weight: 600;',
    bodyCSS:
      'color: #4a4a4a;\n' +
      'font-size: 14px;\n' +
      'line-height: 1.7;',
  }
}

/**
 * custom 档脚手架：完整可跑的最小骨架。
 *
 * template 用 `<section>` + `<div>` 三层结构，`{{wrapperCSS}}` / `{{titleCSS}}` /
 * `{{bodyCSS}}` 占位符把对应 CSS slot 注入到 inline style —— 作者改任意 slot
 * 都能在右侧大预览立刻看到效果。
 *
 * 必含 `{{body}}` 恰好 1 次（lintTemplateHTML 硬闸）；data-uc-* 属性是装饰性
 * "意图标签"，方便作者将来用 attribute selector，不影响渲染。
 */
export function defaultCustomScaffold(): DraftCustom {
  return {
    template:
      '<section data-uc-wrap style="{{wrapperCSS}}">\n' +
      '  <h3 data-uc-title style="{{titleCSS}}">{{title}}</h3>\n' +
      '  <div data-uc-body style="{{bodyCSS}}">{{body}}</div>\n' +
      '</section>',
    wrapperCSS:
      'background-color: #f6f7f9;\n' +
      'padding: 18px 20px;\n' +
      'border-radius: 10px;\n' +
      'margin: 16px 0;',
    titleCSS:
      'color: #1a1a1a;\n' +
      'font-size: 16px;\n' +
      'font-weight: 600;\n' +
      'margin-bottom: 8px;',
    bodyCSS:
      'color: #4a4a4a;\n' +
      'font-size: 14px;\n' +
      'line-height: 1.7;',
    svgSlot: '',
  }
}

/** patch 档草稿是否全空 —— 切档时用来决定是否注入脚手架（已有内容不动）。 */
export function isPatchDraftEmpty(p: DraftCssPatch): boolean {
  return !p.wrapperCSS.trim() && !p.titleCSS.trim() && !p.bodyCSS.trim()
}

/** custom 档草稿是否全空 —— 同上。 */
export function isCustomDraftEmpty(c: DraftCustom): boolean {
  return (
    !c.template.trim() &&
    !c.wrapperCSS.trim() &&
    !c.titleCSS.trim() &&
    !c.bodyCSS.trim() &&
    !c.svgSlot.trim()
  )
}
