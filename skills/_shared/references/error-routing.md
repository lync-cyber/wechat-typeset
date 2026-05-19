# Error 路由矩阵（共享 reference）

> `WtException` 错误码 → 应**转向哪个 skill 修复** + 退出码语义。3 个工作流 skill + 路由 skill 共用。
>
> 真源：`src/core/errors.ts` 的 `WT_ERROR_INFO`；机器可读副本：`capabilities.json.errorCodes[]` / `describe.errorCodes[]` / `error-codes list` 命令。

## 完整映射

| WtErrorCode | exitCode | 触发场景 | 修复路径（去哪个 skill） |
| --- | --- | --- | --- |
| `CONTRACT_VIOLATION` | 4 | fence 不闭合 / 嵌套错（compare/toc 没升 4 冒号）/ 未知容器名 / 行内扩展未闭合 | **`wechat-typeset-annotate-markdown`** → 跑 `markdown lint --persona <id>` 找具体行 |
| `SPEC_INVALID` | 3 | `markdown render --spec` 投影时 PersonaSpec 校验失败（palette 缺键 / motif 字号 < 14 / variant id 不在白名单等） | **`wechat-typeset-author-persona`** → 跑 `validate spec` 喂 errors[] + hint 回 LLM self-correct |
| `RESOURCE_NOT_FOUND` | 2 | persona id / container 名 / variant id 拼错或未注册 | 当前 skill 内：调用 `personas list` / `containers list` / `containers variants` 查可选值；不需要换 skill |
| `INPUT_AMBIGUOUS` | 1 | `markdown render` 同时给了 persona + theme + spec 多于一个 | 调用方修正——三选一 |
| `PLATFORM_UNSUPPORTED` | 5 | `markdown render --platform <id>` 用了未注册平台 | 跑 `platforms list` 查可选 id（也可通过 `describe.platforms` 拿到） |
| `RENDER_FAILED` | 6 | 管线内部异常（未归类兜底，与 `CONTRACT_VIOLATION` 区分） | 通常是 bug；附 stderr stack 提 issue。**短期绕过**：lint 检查 markdown / validate 检查 spec 是否提前能发现 |

## CLI 端程序化分支（shell）

```bash
if ! npm run cli -- markdown render --input article.md --persona swiss-grid > out.html; then
  case $? in
    1) echo "调用方参数错（输入解析失败 / persona+theme+spec 多给）" ;;
    2) echo "未知 id — 跑 personas list / containers list 自查" ;;
    3) echo "SPEC_INVALID — 转 author-persona 跑 validate spec" ;;
    4) echo "CONTRACT_VIOLATION — 转 annotate-markdown 跑 markdown lint" ;;
    5) echo "PLATFORM_UNSUPPORTED — 跑 platforms list" ;;
    6) echo "RENDER_FAILED 兜底 — 提 issue" ;;
  esac
fi
```

## MCP 端程序化分支（structuredContent）

```js
const result = await tools.markdown_render({ md, persona })
if (result.isError && result.structuredContent) {
  const { code, exitCode, errors } = result.structuredContent
  switch (code) {
    case 'CONTRACT_VIOLATION':
      // → 转 annotate-markdown skill
      break
    case 'SPEC_INVALID':
      // → 转 author-persona skill；errors[*].hint 直接喂回 LLM
      break
    case 'RESOURCE_NOT_FOUND':
      // → personas_list / containers_list 自查
      break
    default:
      // 其余按需
  }
}
```

## 跨 skill 的转向规则

| 当前在 | 出现 WtException | 转向 |
| --- | --- | --- |
| annotate-markdown | `CONTRACT_VIOLATION` | 留在本 skill，修 markdown |
| annotate-markdown | `SPEC_INVALID`（用了 `--spec`） | 转 author-persona |
| annotate-markdown | `RESOURCE_NOT_FOUND` persona id | 留在本 skill；用 `personas list` 重选 |
| author-persona | `SPEC_INVALID` | 留在本 skill，跑 self-correct loop（详见该 skill Step 4） |
| author-persona | `CONTRACT_VIOLATION` | 转 annotate-markdown（spec 没问题，markdown 写错了） |
| export-richtext | `CONTRACT_VIOLATION` | 转 annotate-markdown |
| export-richtext | `SPEC_INVALID` | 转 author-persona |
| export-richtext | `RENDER_FAILED` | 重试一次 + 提 issue；附 stderr |

## 不在错误码体系内的情况

- **lint `ok=false` 但无 WtException**：`markdown lint` 始终返回 `{ ok, issues[] }`，不抛错。`ok=false` 不映射到 exitCode 2 以外的码。LLM 应读 `issues[]` 内容直接修。
- **validate `ok=false` 但无 WtException**：同理。读 `errors[]` + `hint` 修。
- **annotate apply `skipped[]`**：纯函数，永不抛错。LLM 读 `skipped[*].reason` 自行决策。
