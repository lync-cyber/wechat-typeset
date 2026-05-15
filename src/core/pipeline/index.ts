/**
 * 渲染管线主入口
 *
 * 流水线：markdown-it（容器 + 行内扩展）→ themeCSS 注入 → highlight 替换 fence
 * → juice 内联 style → wxPatch DOM 后处理 → 最终 HTML。
 *
 * inspectPatchTargets 必须在 applyWxPatches 之前调用：patches 幂等，应用一次后
 * 计数会归零，会让"渲染透明度面板"看不到改动列表。
 */

import type MarkdownIt from 'markdown-it'
import type { Theme } from '../themes/types'
import { createMarkdown } from './markdown'
import { generateThemeCSS } from './themeCSS'
import { atomOneDarkCss, highlightCode } from './highlight'
import { inlineHtml } from './juiceInline'
import type { WxPatchOptions } from './platforms/wechat'
import type { PatchLog } from './platforms/types'
import { DEFAULT_PLATFORM_ID, getPlatform } from './platforms/registry'
import { CODE_BLOCK_VARIANTS } from '../variants/registry'
import { parseInfo } from './containers'
import { ROOT_CLASS } from './constants'
import { createLRU } from './_lru'
import { parseFrontmatter, type FrontmatterParseIssue, type PageConfig } from './frontmatter'

export interface RenderInput {
  md: string
  theme: Theme
  /**
   * 复制 / 导出目标平台 id。默认 'wechat'。
   * 走 platforms/registry 派发；未知 id 抛错。zhihu / xhs 当前为 placeholder。
   */
  platform?: string
  /**
   * 微信平台特定选项。仅当 platform='wechat'（或缺省）时生效；其它平台静默忽略。
   * 命名保留为 wxPatch 是因为公开 API 已用此字段名；增加平台 opts 时不破坏既有调用。
   */
  wxPatch?: WxPatchOptions
}

export interface RenderOutput {
  html: string
  wordCount: number
  readingTime: number
  /**
   * 本次渲染对 HTML 做的微信适配列表（patchListWrap / stripForbiddenAttrs / ...）。
   * 供"渲染透明度面板"展示；作者据此知道我们改了什么、没改什么。
   */
  patchLog: PatchLog
  /**
   * Markdown frontmatter（L2 页面局部配置）解析结果。
   *   - pageConfig: 已校验的 `{ variants?, theme? }`；缺省时为空对象
   *   - issues: 解析期间的告警（非法 variant id / 未识别 key 等），由上层决定 surface 方式
   *
   * `theme:` 字段不会在 pipeline 内部生效——pipeline 接受的是已构建 Theme；
   * 主题切换由 `src/public/render` 在 frontmatter.theme 覆盖 input.persona/theme 后再调用 pipeline。
   * 此字段透传出来仅供调用方观察与诊断。
   */
  pageConfig: PageConfig
  frontmatterIssues: readonly FrontmatterParseIssue[]
}

/**
 * 按 theme.id 缓存 MarkdownIt 实例。容器渲染器在 createMarkdown 的闭包里绑定
 * 了 theme 引用，主题切换必须换新实例。同 theme 复用避免每次击键重建插件链。
 *
 * LRU（MAX=12）：自定义配色 apply 一次就产出 `${base.id}--custom` 新 id，无上限
 * 会堆积。容量对"10 套基础 + 几次自定义"足够，与 themeCSS 缓存对齐。
 */
const MD_CACHE_MAX = 12
const mdCache = createLRU<string, MarkdownIt>(MD_CACHE_MAX)

function getMarkdown(theme: Theme): MarkdownIt {
  const cached = mdCache.get(theme.id)
  if (cached) return cached
  const md = createMarkdown({ theme })
  // 接管 fence 规则而不走 md.options.highlight：
  //   markdown-it 的默认 fence 规则要求 highlight hook 返回值以 `<pre` 开头，
  //   否则会把整段当作 <code> 内容再包一层 <pre><code>—— header-bar variant 需要
  //   以 <section> 外壳开头，直接装进 highlight hook 会被默认 fence 规则吞掉外壳。
  //   换到 renderer.rules.fence 层接管整段 token → HTML 映射，variant 可自由决定
  //   外壳结构而不受 markdown-it 的 "<pre 前缀检测" 约束。
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]
    const info = token.info ? token.info.trim() : ''
    // 复用 parseInfo（与 :::容器 的 attrs 解析同一套）：title = 抠掉 key=value 后剩余文本，
    // 第一个 whitespace token 即语言。attrs.variant 是 P0 引入的"按 fence 覆盖 codeBlock 骨架"开关。
    const { title, attrs } = parseInfo(info)
    const lang = title.split(/\s+/)[0] ?? ''
    const { html, language } = highlightCode(token.content, lang)
    const themeDefault = theme.variants.codeBlock
    const override = attrs.variant
    const chosen =
      override && override in CODE_BLOCK_VARIANTS ? override : themeDefault
    const variant = CODE_BLOCK_VARIANTS[chosen] ?? CODE_BLOCK_VARIANTS.bare
    return variant.render(theme, { language, codeInnerHtml: html }) + '\n'
  }
  mdCache.set(theme.id, md)
  return md
}

export function render(input: RenderInput): RenderOutput {
  const { md: source, theme } = input

  const { config: pageConfig, body, issues: frontmatterIssues } = parseFrontmatter(source)

  const mdInstance = getMarkdown(theme)

  // env.__wxPageVariants 是约定 key（见 markdown.ts ContainerEnv），由容器 ctx 通过 pipeline
  // 透传到 makeVariantContainer.resolveVariant 的 L2 优先级层。frontmatter.theme 已在上游
  // （src/public/render）解析完毕——pipeline 接 Theme 已构建好，theme 字段不在这里二次生效。
  const env: { __wxPageVariants?: PageConfig['variants'] } = {}
  if (pageConfig.variants) env.__wxPageVariants = pageConfig.variants

  const bodyHtml = mdInstance.render(body, env)
  const themeCss = generateThemeCSS(theme)

  const htmlWithStyle = [
    `<section class="${ROOT_CLASS}">`,
    `<style>${themeCss}\n${atomOneDarkCss}</style>`,
    bodyHtml,
    `</section>`,
  ].join('\n')

  const inlined = inlineHtml(htmlWithStyle)

  // Step 3：DOM 后处理层。按 platform 经 registry 派发。
  // inspect 必须在 patch 之前：patches 幂等，应用后计数会归零。
  // wxPatch 字段当前仅 wechat 消费；其它平台 adapter 静默忽略。
  const platform = getPlatform(input.platform ?? DEFAULT_PLATFORM_ID)
  const patchLog: PatchLog = platform.inspect ? platform.inspect(inlined) : { entries: [], total: 0 }
  const finalHtml = platform.patch(inlined, input.wxPatch)

  const wordCount = countWords(body)
  const readingTime = Math.max(1, Math.ceil(wordCount / 300))

  return {
    html: finalHtml,
    wordCount,
    readingTime,
    patchLog,
    pageConfig,
    frontmatterIssues,
  }
}

function countWords(s: string): number {
  // 中文按字符计，英文按空白切分词
  const cjk = (s.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) ?? []).length
  const enWords = s
    .replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
  return cjk + enWords
}
