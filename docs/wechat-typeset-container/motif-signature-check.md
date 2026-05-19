# motif-to-signature 一致性报告

生成时间: 2026-05-19T08:25:28.856Z

> 仅列出 content-1.html 中有对应 src/core/variants TS 文件的 variant。
> 其余 HTML 文件的 variant 为画布原型，暂无 TS 对应（标注为 html-only）。

---

## motif: bilingual-stack

  variants:
    pull-quote/bilingual-stack → designedFor: [academic-frontier]

  conclusion: 同手法变体全部签名 academic-frontier ✓ (一致)

## motif: disc-device

  variants:
    note/initial-disc → designedFor: [swiss-grid]
    quote/ring-device → designedFor: [swiss-grid, brutalist]

  conclusion: 同手法变体全部签名 swiss-grid ✓ (一致)

## motif: dotted-underline

  variants:
    highlight/dotted-underline → designedFor: [editorial-mook]

  conclusion: 同手法变体全部签名 editorial-mook ✓ (一致)

## motif: editor-signoff

  variants:
    admonition/hanging-nb → designedFor: [official-gazette]
    note/ed-signoff → designedFor: [editorial-mook]
    note/inline-label → designedFor: [editorial-mook]

  conclusion: 签名不一致 ✗
  差异列表: official-gazette vs editorial-mook

## motif: filled-square

  variants:
    admonition/filled-square → (no signature)
    admonition/triangle-top → designedFor: [brutalist]
    note/geometric-mark → designedFor: [brutalist]
    highlight/geometric-flag → designedFor: [brutalist]

  conclusion: 同手法变体全部签名 brutalist ✓ (一致)

## motif: interlinear-gloss

  variants:
    note/interlinear-gloss → designedFor: [literary-humanism]
    note/vermilion-gloss → designedFor: [literary-humanism]
    pull-quote/with-gloss → designedFor: [literary-humanism]

  conclusion: 同手法变体全部签名 literary-humanism ✓ (一致)

## motif: inverted-plate

  variants:
    pull-quote/inverted-plate → designedFor: [brutalist]

  conclusion: 同手法变体全部签名 brutalist ✓ (一致)

## motif: latin-subhead

  variants:
    note/latin-subhead → designedFor: [academic-frontier]
    quote/binomial-attrib → designedFor: [academic-frontier, tech-explainer]

  conclusion: 同手法变体全部签名 academic-frontier ✓ (一致)

## motif: numbered-cell

  variants:
    admonition/specimen-box → designedFor: [life-aesthetic]
    pull-quote/grid-block → designedFor: [brutalist]

  conclusion: 签名不一致 ✗
  差异列表: life-aesthetic vs brutalist

## motif: numbered-rule

  variants:
    admonition/numbered-rule → designedFor: [official-gazette]
    quote/numbered-lines → designedFor: [editorial-mook, data-brief]
    quote/huge-numeral → designedFor: [swiss-grid, brutalist]

  conclusion: 签名不一致 ✗
  差异列表: official-gazette vs editorial-mook vs swiss-grid

## motif: oversized-mark

  variants:
    quote/oversized-mark → designedFor: [editorial-mook, data-brief]
    pull-quote/drop-capital → designedFor: [people-story]

  conclusion: 签名不一致 ✗
  差异列表: editorial-mook vs people-story

## motif: paper-slip

  variants:
    admonition/paper-slip → designedFor: [literary-humanism]

  conclusion: 同手法变体全部签名 literary-humanism ✓ (一致)

## motif: ruler-tick

  variants:
    admonition/field-tag → designedFor: [life-aesthetic]
    note/ruler-note → designedFor: [academic-frontier]
    quote/specimen-quote → designedFor: [academic-frontier, tech-explainer]
    highlight/bracketed-tick → designedFor: [academic-frontier]
    pull-quote/caliper-mark → designedFor: [academic-frontier]

  conclusion: 签名不一致 ✗
  差异列表: life-aesthetic vs academic-frontier

## motif: single-stroke

  variants:
    highlight/single-stroke → designedFor: [swiss-grid]

  conclusion: 同手法变体全部签名 swiss-grid ✓ (一致)

## motif: tracked-emphasis

  variants:
    highlight/tracked-emphasis → designedFor: [editorial-mook]
    pull-quote/weight-contrast → designedFor: [people-story]

  conclusion: 签名不一致 ✗
  差异列表: editorial-mook vs people-story

## motif: vermilion-seal

  variants:
    admonition/vermilion-seal → designedFor: [literary-humanism]
    quote/double-frame → designedFor: [literary-humanism, life-aesthetic]
    highlight/vermilion-inline → designedFor: [literary-humanism]
    highlight/side-dots → designedFor: [literary-humanism]
    pull-quote/calligraphic → designedFor: [literary-humanism]

  conclusion: 同手法变体全部签名 literary-humanism ✓ (一致)

## motif: wash-ground

  variants:
    highlight/wash-ground → designedFor: [academic-frontier]

  conclusion: 同手法变体全部签名 academic-frontier ✓ (一致)

---

## 汇总

- 总 motif 桶（有 TS variant）: 17
- 一致 ✓: 11 — bilingual-stack, disc-device, dotted-underline, filled-square, interlinear-gloss, inverted-plate, latin-subhead, paper-slip, single-stroke, vermilion-seal, wash-ground
- 不一致 ✗: 6 — editor-signoff, numbered-cell, numbered-rule, oversized-mark, ruler-tick, tracked-emphasis

## HTML 原型 data-motif 分布（含 html-only variant）

- bilingual-stack: 1 variant
- disc-device: 8 variant
- dotted-underline: 1 variant
- editor-signoff: 20 variant
- filled-square: 36 variant
- interlinear-gloss: 10 variant
- inverted-plate: 5 variant
- latin-subhead: 5 variant
- numbered-cell: 26 variant
- numbered-rule: 41 variant
- oversized-mark: 5 variant
- paper-slip: 4 variant
- ruler-tick: 52 variant
- single-stroke: 1 variant
- tracked-emphasis: 2 variant
- vermilion-seal: 54 variant
- wash-ground: 1 variant
