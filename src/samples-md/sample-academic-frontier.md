# 关于对比学习中表征坍缩的一个新观察

::: abstract ABSTRACT
本文重新审视对比学习（contrastive learning）中的*表征坍缩*现象。不同于以往将坍缩归因于负样本不足的主流观点，我们在三个公开基准上的实验表明：**当批次规模固定时，温度系数 *τ* 的选择比负样本数量更能决定坍缩是否发生**。我们进一步给出一个理论解释，并提出一种不依赖于大批次的轻量级缓解方案。
:::

::: author 张三¹, 李四², 王五¹*
¹清华大学 交叉信息研究院  ·  ²上海人工智能实验室  ·  通讯作者：zhang@mails.tsinghua.edu.cn  ·  投稿日期：2026-04-20
:::

::: divider
:::

## 1 引言

对比学习在自监督表征学习中取得了显著进展。SimCLR、MoCo、BYOL 等方法的核心思想是：把同一样本的两个增强视图拉近，把不同样本的视图推远。然而，当负样本不足时，所有样本的表征会坍缩到同一向量——这被称作 [.表征坍缩.]。

::: quote-card Theorem 1.1
设 *X* 为正则化后的表征空间，*τ* 为 InfoNCE 温度系数。若 *τ* 小于临界值 *τ**，则存在非平凡平衡态使得梯度沿维度收缩方向单调下降，坍缩概率 ≥ 0.5。
:::

本文的贡献有三：

- 给出温度系数 *τ* 与坍缩临界值 *τ** 之间的闭式关系
- 在 ImageNet-100 / CIFAR-10 / STL-10 三个基准上系统验证
- 提出 *τ*-adaptive 调度策略，推理成本几乎为零

## 2 相关工作

::: tip Definition.
设 *f*: *X* → *Y* 为表征映射。若对任意 *x₁*, *x₂* ∈ *X*，均有 ‖*f*(*x₁*) − *f*(*x₂*)‖ < *ε*，则称 *f* 发生了 *ε*-坍缩。当 *ε* → 0，退化为完全坍缩。
:::

::: info Methods.
我们在 ResNet-50 骨干网络上按 SimCLR 协议训练 200 epoch，batch size 固定为 256。所有实验在 8×A100 集群上完成，代码基于 PyTorch 2.1 与 `timm` 库。关键超参搜索范围：`τ ∈ [0.05, 0.5]`，`lr ∈ [0.1, 1.0]`。
:::

::: warning Limitations.
本文实验未覆盖大批次场景（*N* > 4096），对 BYOL 系列非对比方法不直接适用。另外，*τ*-adaptive 调度在 ViT 骨干上的表现仍需后续验证。
:::

::: danger Fallacy.
须指出一种常见的错误归因：将小批次下的坍缩完全归咎于负样本数量，并据此无限扩大批次——这忽略了温度 *τ* 的主导作用。我们在 §4.2 给出反例：即使 *N* = 8192，*τ* = 0.02 仍可诱发坍缩。
:::

::: divider
:::

## 3 方法

::: steps 三阶段 τ-adaptive 调度
### 阶段一：暖启动
在前 10 个 epoch 固定 *τ* = 0.2，使表征在各向同性的高温下均匀铺开，避免早期过早对齐。

### 阶段二：平滑降温
第 10 至 100 epoch 按余弦曲线将 *τ* 从 0.2 降至 *τ**（数据集相关，CIFAR-10 上为 0.12）。此阶段模型开始收获判别力。

### 阶段三：稳态微调
后续 epoch 保持 *τ* = *τ** 不变，配合线性 lr 衰减。此时坍缩风险理论上最低。
:::

核心算法伪码如下：

```python
for epoch in range(E):
    tau = schedule(epoch, tau_star)
    for x in loader:
        z1, z2 = f(aug(x)), f(aug(x))
        loss = info_nce(z1, z2, tau)
        loss.backward(); opt.step()
```

::: divider
:::

## 4 实验

::: highlight Key Finding
在 CIFAR-10 上，*τ*-adaptive 将线性评估准确率从 84.3% 提升至 87.1%，而将 batch size 从 256 翻倍到 512 仅带来 0.4% 提升——**温度的收益显著大于批次的收益**，这与以往"批次越大越好"的主流观点相悖。
:::

:::: compare

::: pros 固定 τ = 0.1
标准 InfoNCE 配置
- Top-1 准确率 84.3%
- 训练曲线抖动较大
- 对 batch size 敏感
:::

::: cons τ-adaptive（本文）
三阶段余弦调度
- Top-1 准确率 87.1%
- 训练曲线平滑收敛
- 对 batch size 鲁棒
:::

::::

::: divider
:::

## 5 结论

我们重新审视了对比学习中的表征坍缩现象，给出了 *τ* 与坍缩临界值的闭式关系，并提出一种几乎零成本的调度策略。代码与预训练权重将开源。

::: footer-cta ACKNOWLEDGEMENTS
感谢 XX 教授对本文初稿的审阅，感谢 YY 实验室提供 A100 计算资源。本研究得到国家自然科学基金（No. 62xxx）与上海市人工智能伦理委员会（No. AI-2026-xxx）资助。

CITE AS — 张三, 李四, 王五. (2026). 关于对比学习中表征坍缩的一个新观察. 公众号《学术前沿》, 第 42 期. DOI: 10.48550/arXiv.2604.12345
:::

::: see-also SEE ALSO · 相关工作导览
- *Wang & Isola, 2020* 的 alignment–uniformity 视角与本文温度主导观点互补
- *Dubois et al., 2022* 对小批次场景的分析可参照本文 §4.2
- OpenReview 上本文预印本：arxiv.org/abs/2604.12345v2 含扩展附录
:::

::: recommend REFERENCES
- [1] Chen, T., Kornblith, S., Norouzi, M., & Hinton, G. (2020). A simple framework for contrastive learning of visual representations. *ICML*, 1597–1607.
- [2] He, K., Fan, H., Wu, Y., Xie, S., & Girshick, R. (2020). Momentum contrast for unsupervised visual representation learning. *CVPR*, 9729–9738.
- [3] Grill, J.-B., Strub, F., Altché, F., et al. (2020). Bootstrap your own latent: A new approach to self-supervised learning. *NeurIPS*, 33, 21271–21284.
- [4] Wang, T., & Isola, P. (2020). Understanding contrastive representation learning through alignment and uniformity on the hypersphere. *ICML*, 9929–9939.
- [5] Liu, M. (2026). On temperature scaling in contrastive objectives. arXiv: 2604.01234.
:::
