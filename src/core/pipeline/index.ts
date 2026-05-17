import type MarkdownIt from 'markdown-it'
import type { Theme } from '../themes/types'
import type { UserVariant } from '../variants/userVariant'
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
  /** 平台 id，默认 'wechat'；走 platforms/registry 派发，未知 id 抛错。 */
  platform?: string
  /** 仅当 platform='wechat' 时生效；其它平台静默忽略。 */
  wxPatch?: WxPatchOptions
  /**
   * 用户态变体快照。入口处一次性转 Map 注入 markdown-it env，由 renderer 在
   * attrs.variant=uv_xxx 时 O(1) 查表。
   *
   * 不进 mdCache key：用户变体每次编辑都可能变，但走的是 attrs.variant 单容器级
   * 开销（每篇文章命中条数 ≤ 容器数），缓存键化反而引入 LRU thrash。
   *
   * 缺省 / 空数组 = 不注入 env 字段，对未声明用户变体的渲染零开销。
   */
  userVariants?: readonly UserVariant[]
}

export interface RenderOutput {
  html: string
  wordCount: number
  readingTime: number
  /** 本次渲染对 HTML 做的微信适配列表，供"渲染透明度面板"展示。 */
  patchLog: PatchLog
  /**
   * Markdown frontmatter（L2 页面局部配置）解析结果——`theme:` 已在上游 `src/public/render`
   * 消费完，pipeline 不再二次生效；此字段透传仅供观察与诊断。
   */
  pageConfig: PageConfig
  frontmatterIssues: readonly FrontmatterParseIssue[]
}

// 缓存 MarkdownIt 实例：容器渲染器在 createMarkdown 闭包里绑定了 theme 引用，主题切换必须换新实例。
// 容量与 themeCSS 缓存对齐。
const MD_CACHE_MAX = 12
const mdCache = createLRU<string, MarkdownIt>(MD_CACHE_MAX)

function getMarkdown(theme: Theme): MarkdownIt {
  const cached = mdCache.get(theme.id)
  if (cached) return cached
  const md = createMarkdown({ theme })
  // 接管 fence 规则而不走 md.options.highlight：默认 fence 规则要求 highlight hook 返回值以
  // `<pre` 开头，否则会被包一层 <pre><code>，吞掉 header-bar variant 的 <section> 外壳。
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]
    const info = token.info ? token.info.trim() : ''
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

  // env.__wxPageVariants / __wxUserVariants 是约定 key（见 markdown.ts ContainerEnv）：
  //   - __wxPageVariants：L2 frontmatter.variants
  //   - __wxUserVariants：用户态变体（id → UserVariant），由 RenderInput.userVariants 转 Map
  const env: {
    __wxPageVariants?: PageConfig['variants']
    __wxUserVariants?: ReadonlyMap<string, UserVariant>
  } = {}
  if (pageConfig.variants) env.__wxPageVariants = pageConfig.variants
  if (input.userVariants && input.userVariants.length > 0) {
    env.__wxUserVariants = new Map(input.userVariants.map((uv) => [uv.id, uv]))
  }

  const bodyHtml = mdInstance.render(body, env)
  const themeCss = generateThemeCSS(theme)

  const htmlWithStyle = [
    `<section class="${ROOT_CLASS}">`,
    `<style>${themeCss}\n${atomOneDarkCss}</style>`,
    bodyHtml,
    `</section>`,
  ].join('\n')

  const inlined = inlineHtml(htmlWithStyle)

  // inspect 必须在 patch 之前：patches 幂等，应用后计数归零，"渲染透明度面板"就看不到改动列表。
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
