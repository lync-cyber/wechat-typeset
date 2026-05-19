/**
 * _template · 新主题骨架 · PersonaSpec
 *
 * 定位：复制本目录 → 改 id/name/palette/motifs/variants → 起步可用的最小主题。
 * 受众：写新 persona 的工程师 / LLM。
 * Voice：刻意中性——所有 palette/typography 取通用兜底值，不携带任何风格倾向。
 *        视觉签名（accent 取色、motif 形状、variant 选型）由复制后的主题自己决定。
 *
 * 使用：
 *   1. `cp -r src/core/themes/_template src/core/themes/<your-id>`
 *   2. 把本文件里的 id 改为目录名（kebab-case），同步改 name/description/audience
 *   3. 调 palette / status / typography / motifs（最少留一个 motif，schema 不允许空集）
 *   4. 选择 variants（DEFAULT_VARIANTS 是兜底，若不改即得到 default 主题的骨架）
 *   5. 解开下面 `// optional:` 段里需要用的字段，按 JSDoc 提示填充
 *   6. 在 src/core/themes/registry.ts 追加 import + DISPLAY_ORDER
 *   7. 跑 `npx tsx scripts/validate-spec.ts src/core/themes/<your-id>/persona.data.ts`
 *
 * 本文件被 registry / generator / test glob 显式排除（dir 名以 `_` 开头），
 * 不进运行时 themeList、不上 gallery、不参与 conformance 校验。
 */
import type { PersonaSpec } from '../_shared/spec';
export declare const spec: PersonaSpec;
