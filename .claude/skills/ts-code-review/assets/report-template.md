# Code Review Report — {{project}} ({{mode}})

Generated: {{generatedAt}}
Stack: {{stack}}
Files with findings: {{fileCount}} / Total findings: {{issueCount}}
{{#if diffRange}}Diff: `{{diffRange}}`{{/if}}

## Summary

{{summary}}

## Findings by kind

| Kind | Count |
|---|---:|
{{#each kindCounts}}
| `{{kind}}` | {{count}} |
{{/each}}

## Priority files

| Tier | Score | File | Issues |
|---|---:|---|---|
{{#each priority}}
| {{tier}} | {{score}} | `{{file}}` | {{issues}} |
{{/each}}

## Findings by file

{{#each filesByPriority}}
### `{{file}}` ({{tier}})

{{#each issues}}
- L{{line}} **{{kind}}** ({{detector}}, conf {{confidence}}) — {{evidence}}{{#if suggestion}}  _-> {{suggestion}}_{{/if}}
{{/each}}

{{/each}}

{{#if remainingFiles}}
_...and {{remainingFiles}} more files with findings; see `review-report.json` for full list._
{{/if}}
