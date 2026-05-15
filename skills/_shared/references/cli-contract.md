# CLI 契约速查（共享 reference）

> 三个 skill 的脚本签名 / JSON 输出 / 退出码 / lint issue 表的**单一真源**。改这里 = 改所有调用方文档。
>
> 权威依据：各脚本头部注释；本文件应与 [skills/wechat-typeset-annotate-markdown/scripts/](../../wechat-typeset-annotate-markdown/scripts) / [skills/wechat-typeset-author-persona/scripts/](../../wechat-typeset-author-persona/scripts) / [skills/wechat-typeset-export-richtext/scripts/](../../wechat-typeset-export-richtext/scripts) 同步。

## 目录

- [统一旗标约定](#统一旗标约定)
- [脚本签名表](#脚本签名表)
- [退出码语义](#退出码语义)
- [lint issue 修复表](#lint-issue-修复表)
- [validate-and-fix 错误模式表](#validate-and-fix-错误模式表)
- [JSON 输出形状](#json-输出形状)

## 统一旗标约定

| 旗标 | 适用脚本 | 语义 |
| --- | --- | --- |
| `--input <md>` | annotate-md / lint-contract / render-html / render-gallery / copy-richtext | 输入 markdown 路径（相对 cwd） |
| `--output <path>` 或 `--out <path>` | annotate-md (`--out`) / render-html (`--output`) / render-gallery (`--output`) / preview-motifs (`--out`) | 输出落盘路径；省略则写 stdout |
| `--persona <id>` | render-html / render-gallery（限内置） / copy-richtext / annotate-md / recommend-persona | 内置 persona id（见 [personas.md](personas.md)） |
| `--personas <ids \| all>` | render-gallery | 逗号分隔多个 id，或 `all` 渲染全部已注册 |
| `--spec <path>` | validate-and-fix / preview-motifs / persist-persona / new-persona-from-prompt（--out spec.json） | PersonaSpec JSON 路径 |
| `--meta` | render-html | 只打印元数据 JSON，不写 HTML |
| `--no-svg-white-bg` | render-html | 关闭 wxPatch 的 `#fff → #fefefe` 替换 |
| `--variant <id>` | show-snippet | 让生成的 snippet 带 variant=xxx |
| `--variants <container>` | show-snippet | 列出某容器可切换的 variant id |
| `--list` / `--list --category <cat>` | show-snippet | 列容器名 |
| `--json` | lint-contract / theme-capabilities | 输出 JSON 而非可读文本 |
| `--check` | build-skill-refs / build-writer-docs | CI 模式：差异即 exit 1 |

> **统一规则**：render / lint / copy 系脚本一律 `--input <md>` + `--output <path>`，**不接受位置参数**。show-snippet / validate-and-fix / preview-motifs 等"主题工具"脚本仍接位置参数（按其 usage 写）。

## 脚本签名表

### wechat-typeset-annotate-markdown/scripts

| 脚本 | 必填旗标 | 可选旗标 | 输出 |
| --- | --- | --- | --- |
| `recommend-persona.ts` | `--title` / `--summary` / `--topic` | `--style` | JSON（top-3 ranked + decision_prompt） |
| `theme-capabilities.ts` | `--persona <id>` | `--json` | 可读文本 或 JSON（defaultVariants / recommendedVariants / containers / kickers） |
| `annotate-md.ts` | `--input` / `--persona` | `--out` | patches.json（结构见下文，含 capability_snapshot） |
| `lint-contract.ts` | `<md>`（位置参数）或在 export-richtext 入口走 `--input` | `--persona <id>` / `--json` | 可读文本 或 `{ ok, issues, count, error_count, warning_count, effective_persona, persona_source }` |
| `show-snippet.ts` | `<container-name>` 或 `--list` 或 `--variants <name>` | `--variant <id>` / `--category <cat>` / `--persona <id>` | markdown snippet + 元信息（带 --persona 时 list 按 pack 分组，单容器跨主题出 warning） |

### wechat-typeset-author-persona/scripts

| 脚本 | 必填旗标 | 可选旗标 | 输出 |
| --- | --- | --- | --- |
| `recommend-from-prompt.ts` | `--description` | `--style` | JSON（candidates + decision_prompt） |
| `new-persona-from-prompt.ts` | `--description` | `--base-id` / `--out` | "给 LLM 的 prompt + schema + 邻近样例" JSON |
| `validate-and-fix.ts` | `<spec.json>`（位置参数） | — | JSON（errors[] + 修复建议） |
| `preview-motifs.ts` | `<spec.json>` | `--out tmp/preview.html` | 单页 HTML gallery（色板 + motif） |
| `persist-persona.ts` | `<spec.json>` / `--id <kebab>` | — | 落盘到 `src/core/themes/<id>/persona.data.ts` + patch 注册表 |

### wechat-typeset-export-richtext/scripts

| 脚本 | 必填旗标 | 可选旗标 | 输出 |
| --- | --- | --- | --- |
| `lint-contract.ts` | `--input` | `--persona <id>` / `--json` | 透传 annotate 的同名脚本（旗标全转发） |
| `render-html.ts` | `--input` / `--persona` | `--output` / `--meta` / `--no-svg-white-bg` | HTML 文件 + 元数据 JSON |
| `render-gallery.ts` | `--input` / `--personas` | `--output` | 多 persona 并排 HTML |
| `copy-richtext.ts` | `--input` / `--persona` | `--save-fallback` | 写入剪贴板 / 落盘 fallback |
| `open-in-browser.ts` | — | — | 启 vite preview + open browser |

## 退出码语义

按场景分层（同一退出码在不同脚本中语义一致）：

| 码 | 通用语义 | 出现脚本 |
| --- | --- | --- |
| `0` | 成功（含 `ok=true`） | 全部 |
| `1` | IO / 参数错（找不到文件、缺少必填旗标、未知旗标） | 全部 |
| `2` | 资源未知 / 业务校验失败（unknown persona id / unknown container name / lint `ok=false`） | render-html / render-gallery / copy-richtext / show-snippet / lint-contract / recommend-persona |
| `3` | `SpecValidationError`（PersonaSpec 校验失败） | render-html（`--spec` 路径）/ validate-and-fix |
| `4` | render 失败（容器语法错 / 嵌套不闭合 / wxPatch 边界 case） | render-html / render-gallery / copy-richtext |
| `5` | 平台不支持（如 copy-richtext 在无剪贴板工具的 Linux 容器） | copy-richtext |

## lint issue 修复表

`lint-contract.ts` 输出的 `issues[].kind` 全集 + `severity` + 修复路径：

| issue.kind | severity | 原因 | 修法 |
| --- | --- | --- | --- |
| `unknown_container` | error | fence 名拼错或发明了新名字 | 改成 [container-vocabulary.md](container-vocabulary.md) 内的合法名 |
| `unexpected_jsx_attrs` | error | 写了 `{variant="xxx"}` JSX 风格 | 改成 `variant=xxx`（不带大括号引号） |
| `html_comment_variant` | error | 写了 `<!-- variant=xxx -->` | 删注释，写到 `::: name` open 行 |
| `fence_not_closed` | error | 缺 `:::` | 补 close fence（同长度） |
| `nesting_depth` | error | compare/toc 等外层用了 3 个冒号 | 外层升级为 `::::`（4 个冒号） |
| `inline_unclosed` | error | `[.着重` 或 `[~波浪` 或 `==` 数量奇偶不对 | 补对应闭合标记 |
| `fence_attr_yaml` | error | 在 open 行内/后写 YAML 风格属性 | 改成 `key=value` 形式 |
| `wrong_theme_namespace` | **warning** | 用了 theme:* 容器但当前主题不是其专属（如 default 主题写 `kpi-dashboard`） | 切换主题 / 换 base / pack:editorial 内的替代容器；不阻塞导出但失去签名视觉 |
| `frontmatter_invalid` | **warning** | frontmatter 内 variant id / theme id 非法 / 未识别字段 | 改成合法值或删除字段；pipeline 会回退 |

**修复完所有 error 再交付**（warning 不阻塞 export，但应该告诉用户后果） —— 不要把 error 残留的 md 喂给 render 阶段。

**主题敏感**：触发 `wrong_theme_namespace` 检查需要主题来源；优先级 `frontmatter.theme:` > `--persona <id>`。两者都没有时跳过主题敏感检查（仅做语法 lint）。

## validate-and-fix 错误模式表

`validate-and-fix.ts` 输出的 `errors[].path` 模式 + 推断 + 修法：

| path 模式 | 推断 | 修法 |
| --- | --- | --- |
| `palette.<key>` hex 报错 | hex 格式非法 | 用 `^#[0-9a-fA-F]{3,8}$` 形式（典型：`#1f2937` / `#fefefe`） |
| `palette` 缺键 | 11 键不齐 | 补齐 `primary / secondary / accent / bg / bgSoft / bgMuted / text / textMuted / textInverse / border / code` |
| `status.<key>` | 四态不齐 / `{accent,soft}` 不成对 | 必填 `tip / info / warning / danger`，每态两键 |
| `motifs.*.primitives[N].fontSize` | < 14 | 放大到 ≥ 14 |
| `motifs.*.primitives[N].strokeWidth` | < 1 | 放粗到 ≥ 1 |
| `motifs.*.primitives[N].fontFamily` | 非白名单 | 只能 `serif` / `sans-serif` / `monospace` |
| `motifs.*.placeholders` | 未声明占位符 | 把 primitives 里的 `{name}` 全部加进 `placeholders` |
| `signatureContainers[N]` | id 不在白名单 | 用 `getSupportedSignatureContainers()`；camelCase，不是 kebab |
| `variants.<kind>` | id 不在白名单 | 用 `getVariantIds().<kind>`；常见幻觉 `'glow'` / `'modern'` / `'flat'` 不存在 |

完整规则与"为什么"见 [hard-rules.md](hard-rules.md)。

## JSON 输出形状

### annotate-md.ts 输出

```json
{
  "input": "<input.md 路径>",
  "persona": "<persona id>",
  "block_count": 24,
  "patch_count": 5,
  "patches": [
    {
      "line": 3,
      "end_line": 5,
      "kind": "wrap_first_paragraph | wrap_paragraph | wrap_blockquote | convert_list | wrap_section_title | wrap_pros_cons",
      "container": "<容器 fence 名>",
      "variant": "<可选 variant id>",
      "reason": "<人话理由>",
      "confidence": "high | medium | low",
      "preview": "<首 60 字符摘要>"
    }
  ],
  "apply_hint": "<应用顺序提示>",
  "capability_snapshot": {
    "persona_id": "<id>",
    "default_variants": { "admonition": "accent-bar", ... },
    "recommended_variants": { "admonition": ["accent-bar", ...], ... },
    "containers": [
      { "id": "tip", "namespace": "base", "pack": "base", "available": true, "signature": false, "excluded": false },
      { "id": "kpi-dashboard", "namespace": "theme", "pack": "theme:data-brief", "available": false, "signature": false, "excluded": false }
    ]
  },
  "vocabulary_subset": [{ "name": "...", "category": "...", "fenceLength": 3, "description": "...", "example": "..." }]
}
```

> **agent 取 `capability_snapshot.containers` 作为"本主题下可用容器"的权威单一真源**，而非 `vocabulary_subset`。后者只用来查 example / attrs。

### render-html.ts 输出（写文件 + 元数据 JSON）

```json
{
  "ok": true,
  "persona": "<id>",
  "word_count": 1234,
  "reading_time_min": 5,
  "html_length": 56789,
  "svg_white_bg": true,
  "patch_summary": { "stripFontFamily": 12, "patchFlexToFallback": 3, "patchSvgWhiteBg": 8 }
}
```

失败时（exit 3 / 4）：

```json
{ "ok": false, "error": "spec_validation | render_failure", "errors": [...] | "message": "..." }
```

### lint-contract.ts 输出（`--json` 模式）

```json
{
  "ok": false,
  "count": 3,
  "error_count": 1,
  "warning_count": 2,
  "effective_persona": "default",
  "persona_source": "flag | frontmatter | none",
  "issues": [
    {
      "line": 12,
      "kind": "<kind>",
      "severity": "error | warning",
      "name": "<可选容器名>",
      "hint": "<修法>",
      "excerpt": "<原文片段>"
    }
  ]
}
```

> `ok` 现在只看 error 数；warning（如 `wrong_theme_namespace`）不阻塞导出。

### theme-capabilities.ts 输出（`--json` 模式）

```json
{
  "persona": { "id": "<id>", "name": "...", "description": "...", "audience": "...", "palettePrimary": "#xxxxxx" },
  "defaultVariants": { "admonition": "...", "quote": "...", ... },
  "recommendedVariants": { "admonition": ["..."], ... },
  "recommendedVariantOverrides": {},
  "containers": [
    { "id": "<fence-name>", "namespace": "base | pack | theme", "pack": "base | pack:X | theme:X", "available": true, "signature": false, "excluded": false }
  ],
  "kickers": { "toc": "...", "qaBlock": "...", ... }
}
```

### recommend-persona.ts 输出

```json
{
  "ranked": [
    {
      "id": "<persona id>", "name": "...", "description": "...", "audience": "...",
      "variants_signature": { "admonition": "...", "quote": "...", "...": "..." },
      "signature_containers": ["..."],
      "static_score": 0.85,
      "static_reasons": ["..."]
    }
  ],
  "recommend_new": false,
  "rationale_one_line": "强匹配 swiss-grid（0.92）",
  "decision_prompt": "<给 LLM 用的多行 prompt>"
}
```

`recommend_new=true`（top-1 < 0.6）= 信号 "内置都不够，建议去 wechat-typeset-author-persona 造新"。
