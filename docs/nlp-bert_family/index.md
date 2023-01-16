# 后 BERT 时代小结


2018年10月，Google 发布 BERT 模型，然后 BERT 横扫了 NLP 的各个任务：
文本分类、序列标注、文本摘要、信息检索、问答系统、阅读理解等等。

<!--more-->

到如今，BERT 及其变种几乎一统了 NLU（Natural Language Understanding，自然语言理解）领域，
只有 GPT 模型依托 NLG（Natural Language Generation，自然语言生成）领域能与之周旋。
而细究下来，GPT 与 BERT 的结构其实只有一处不同。

不夸张地说，这是属于 BERT 的时代。因此，本文对 BERT 及其之后的发展作一个粗略的小结，以供参考。

## BERT：一切之始

BERT，全称 Bidirectional Encoder Representation from Transformers，
融合了前辈 GPT 和 ELMO 的优点，是 NLP 模型的一个里程碑。

![bert00.png](https://s2.loli.net/2022/01/17/pI3ter1MUl9bCK7.png "BERT 模型结构")

BERT的核心特点在于：

1）**两阶段的预训练过程**。第一阶段利用语言模型进行预训练；第二阶段是迁移学习，
将预训练网络结构中的高层特征用于下游任务，进行微调。与以前的 Word2Vec 的区别在于，
下游任务不仅利用了预训练网络的 Word Embedding 层，还利用了更高层的特征。这个结构来源于 GPT；

2）采用 **双向的 Transformer** 提取特征，这是 BERT 最核心的优势，也正是 BERT 的名字由来。
之前，ELMO 采用的是双向的 LSTM，GPT 采用的是单向的 Transformer，而 BERT 融合了两者的优点，引起了质变；

3）利用 **mask 机制** 来设计语言模型任务，从而能利用双向 Transformer 的特征。
区别于之前的按顺序预测的（术语叫自回归）语言模型任务，BERT 的 MLM 任务类似于完形填空，
即随机 mask 掉一些词，通过上下文预测这些词。这个思路来源于 CBOW（连续词袋模型）或者 DAE（去噪自编码语言模型）；

4）更深更大的结构。BERT-Large 堆叠了 24 层 Transformer，隐藏层大小 1024 ，在当时应该算是 NLP 深度模型里最深最大的了，
而效果的提升也立竿见影。这也为之后的发展埋下了伏笔。

由此看来，BERT 可以说是 NLP 深度学习的集大成者，而实践下来也确实如此。
直到现在，各大 NLP 任务的榜单依然被 BERT 家族所垄断。

![bert01.png](https://s2.loli.net/2022/01/17/zuY5JDTFWsCgrBA.png "NLP 榜单")

自然，BERT 也成为了后来者的基石。

## 后 BERT 时代：八仙过海

BERT 点燃了 NLP 的新一轮热潮，各大公司开始堆人堆钱各显神通，不断刷新热点。其中的进展可以粗略地分为三个方向。

### 一、大：有钱任性，大力出奇迹

其实从工程的视角来看，BERT 本身已可算为巨型模型。BERT-Large 的预训练语料共 16 G，模型参数 3.4 亿，
整个预训练过程用 64 块 TPU 芯片跑了 4 天。

然而，或许是 BERT 的成功带来了启发，各大巨头在烧钱的路上一去不返。

- 2019年2月，OpenAI 发布 GPT 升级版 **GPT-2**，预训练语料用了 800 万个网页，总共 40 G，而模型参数也增加到 15 亿
- 2019年6月，谷歌提出 **XLNET**，预训练语料增长为 113 G
- 2019年7月，facebook 发布 BERT 升级版 **RoBERTa**，预训练语料 160 G
- 2019年8月，英伟达发布 GPT 超级版 **GPT-2 8B**，模型参数 83 亿
- 2019年10月，谷歌提出 **T5**，预训练语料 750 G，模型参数 110 亿
- 2020年2月，微软发布 **Turing-NLG**，模型参数 170 亿
- 2020年5月，OpenAI 发布 GPT 究极版 **GPT-3**，预训练语料 45 T，是 BERT 的 2800 多倍，
模型参数 1750 亿，是 BERT 的 500 多倍

![bert02.png](https://s2.loli.net/2022/01/17/zKdpGrtR1NJUnCo.png "GPT-3")

如今，再回头看 BERT，或许印象已截然不同。

### 二、小：落地为王，浓缩才是精华

虽然原始的 BERT 在各个怪物面前不算啥，但想要工程落地，依然过于笨重。因此在模型压缩的方向，也有不少的努力和尝试。

- **Compressing BERT**：利用剪枝技术，去掉模型中影响较小的参数或层
- **Q-BERT**：利用量化技术，用低精度取代高精度模型
- **ALBERT**：利用参数共享技术，将所有 transformer 层的参数共享，减少训练时间
- **DistilBERT** / TinyBERT：利用知识蒸馏技术，将大型模型的知识蒸馏到小型模型
- **FastBERT**：利用自适应推理技术，减少简单样本的推理时间
- ······

目前，这些尝试或许不尽如人意，很难保证模型的效果，但这个方向无疑是更符合实际的。

### 三、改：创新与微创新，哪里能改改哪里

BERT模型虽然效果很好，但其设计也有明显的缺陷，即预训练过程的任务是MLM而微调过程的下游任务大多是自回归语言模型。
两个过程的不一致导致了部分信息的损失，也使得BERT不适合NLG任务。因此，如何改进设计就举足轻重。

而在细节方面，自然也有不断的尝试。

- **ERNIE / BERT-WWM**：针对中文模型，改进 mask 方式，ERNIE mask 掉实体和短语，BERT-WWM mask 掉词
- **StructBERT**：新添了词序重建和句序判定两个预训练任务，即预测出句子中正确的词语顺序和文章中正确的句子对顺序
- **MASS / T5**：将 BERT 的 Transformer Encoder 结构改为 Encoder-Decoder 结构，使其更加适合于下游的 NLG 任务
- **XLNET**：采用 PLM（排列语言模型）任务替代了 BERT 的 MLM 任务，综合了 MLM 和自回归语言模型的优点，
规避了 BERT 的设计缺陷
- **ELECTRA**：用 RTD（Replaced Token Detection ）任务替换了 BERT 的 MLM 任务。模型根据上下文预测 token 是否替换，
而非预测 token 是什么
- ······

## 展望：路漫漫其修远兮

![bert03.png](https://s2.loli.net/2022/01/17/bTY8vNCfEjMRtas.png "未来")

BERT 的发展之快其实已超出很多人的想象，然而往前看，NLP 的道路依然十分漫长。

从工程上讲，如何得到效果更好的轻量模型，如何解决实际项目中样本不足的困境，依然是巨大的挑战。

从学术上讲，BERT 哪怕利用到极限，似乎离 NLP 的真正目标——让机器理解自然语言，还是隔着天堑。

希望下一个里程碑，能够尽快到来。

## 参考文献

1.Pre-trained Models for Natural Language Processing: A Survey, Xipeng Qiu, 2020.

2.Deep contextualized word representations, Matthew E. Peters, NAACL 2018. (ELMo)

3.Improving Language Understanding by Generative Pre-Training, Alec Radford, 2018 (GPT)

4.BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding, Jacob Devlin, NAACL 2019. 

5.ERNIE: Enhanced Representation through Knowledge Integration, Yu Sun, 2019. 

6.XLNet: Generalized Autoregressive Pretraining for Language Understanding, Zhilin Yang, NeurIPS 2019. 

7.Pre-Training with Whole Word Masking for Chinese BERT, Yiming Cui, 2019. (Chinese-BERT-wwm)

8.ELECTRA: Pre-training Text Encoders as Discriminators Rather Than Generators, Kevin Clark, ICLR 2020.

9.Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer, Colin Raffel, 2019. (T5)

10.StructBERT: Incorporating Language Structures into Pre-training for Deep Language Understanding, Wei Wang, ICLR 2020. 

11.ALBERT: A Lite BERT for Self-supervised Learning of Language Representations, Zhenzhong Lan, ICLR 2020. 

12.DistilBERT, a distilled version of BERT: smaller, faster, cheaper and lighter, Victor Sanh, 2019.



