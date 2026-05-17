/**
 * applyUserVariant —— 把基底 variant 的 VariantRenderResult 套上用户态变体的 patch / tokens。
 *
 * 纯函数。makeVariantContainer.resolveVariant 在识别到 `attrs.variant=uv_*` 时：
 *   1. 自行从 table 拿到基底 entry 并调 render(ctx, args) 得到 baseResult
 *   2. 把 baseResult 喂进本函数，输出最终的 VariantRenderResult
 *
 * 不在本文件里查 ctx.userVariants —— 那是 resolveVariant 的事。本文件只负责
 *"已知 uv + 已知 base 产物，怎么合成"。把"查表"与"应用"切开，让这块逻辑能被
 * 单测直接覆盖（无需构造完整 ctx）。
 *
 * 不支持 level='custom' —— custom 不复用基底 render，由步骤 7 的"裸 HTML 容器
 * 渲染器"分支单独处理，不走这条路。
 */

import type {
  UserVariantPatch,
  UserVariantTokens,
  UserVariantCssSlot,
} from '../../../variants/userVariant'
import type { VariantRenderResult } from '../../../variants/_core'

export type AppliableUserVariant = UserVariantTokens | UserVariantPatch

export function applyUserVariant(
  uv: AppliableUserVariant,
  base: VariantRenderResult,
): VariantRenderResult {
  if (uv.level === 'tokens') {
    return {
      ...base,
      wrapperCSS: injectTokens(base.wrapperCSS, uv.tokens),
    }
  }
  // level === 'patch'
  return {
    ...base,
    wrapperCSS: appendCss(base.wrapperCSS, uv.cssPatch.wrapperCSS) ?? '',
    titleCSS: appendCss(base.titleCSS, uv.cssPatch.titleCSS),
    bodyCSS: appendCss(base.bodyCSS, uv.cssPatch.bodyCSS),
  }
}

/**
 * 把 `{ accent: '#ff5a00', size: '22px' }` 序列化成 `--uv-accent:#ff5a00;--uv-size:22px`
 * 并追加到 wrapperCSS 末尾。基底 variant 把字面量改写为 `var(--uv-accent, fallback)` 后，
 * CSS cascade 会让追加的 --uv-accent 自动覆盖默认值。
 *
 * 为什么强制 `--uv-` 前缀（USER_TOKEN_PREFIX）：tokenSchema 与本仓自己声明的命名空间
 * 必须隔离开。用户填的 token 名 `accent` 渲染到 DOM 上是 `--uv-accent`，与 variant 作者
 * 自己（未来可能）在 themeTokens 引入的 `--accent` 不会冲突；移除 / 改名 user 变体也不会
 * 误伤主题侧的 CSS 变量。
 *
 * 为什么只注入到 wrapperCSS：CSS custom property 通过 DOM 继承自然向下传播
 * （titleCSS / bodyCSS 是 wrapper 的子节点），一处声明全树可用——避免在每个槽位
 * 重复注入造成的 inline style 膨胀。
 *
 * tokens 为空 → 原 css 不动。
 */
export const USER_TOKEN_PREFIX = '--uv-'

function injectTokens(css: string, tokens: Record<string, string>): string {
  const entries = Object.entries(tokens)
  if (entries.length === 0) return css
  const decls = entries.map(([k, v]) => `${USER_TOKEN_PREFIX}${k}:${v}`).join(';')
  if (!css) return decls
  return `${css};${decls}`
}

/**
 * 把 patch 字符串末尾追加到 base 上，靠 CSS cascade 自然覆盖。
 *
 * SPI 暗号契约保留：base titleCSS === '' 表示 variant 已在 svgSlot 自绘标题、
 * 要求 renderer 跳过默认 title 行——这层意图不能被 user patch 覆盖（否则会出现
 * "svgSlot 自绘标题 + 默认 title 行"重叠的视觉灾难）。
 * 因此 base === '' 时直接返回 ''，丢弃 patch。这是有意的纪律，不是 bug。
 *
 * 想完全自定义 title 的用户应该走 level='custom'（步骤 7）。
 */
function appendCss(
  base: string | undefined,
  patch: string | undefined,
): string | undefined {
  if (!patch) return base
  if (base === '') return ''
  if (!base) return patch
  return `${base};${patch}`
}

/** 给外部测试 / 调试用：判断 uv 是否在 makeVariantContainer 的支持范围。 */
export function isAppliableUserVariant(uv: { level: string }): uv is AppliableUserVariant {
  return uv.level === 'tokens' || uv.level === 'patch'
}

/** 给 makeVariantContainer 用：枚举可被 patch 的 CSS 槽位（与 UserVariantCssSlot 同步）。 */
export const PATCHABLE_SLOTS: ReadonlyArray<UserVariantCssSlot> = [
  'wrapperCSS',
  'titleCSS',
  'bodyCSS',
]
