# 0418：屏幕可显示句子的数量（★）


> <u>**[力扣第 418 题](https://leetcode.cn/problems/sentence-screen-fitting/)**</u>

## 题目

<p>给你一个 <code>rows x cols</code> 的屏幕和一个用 <strong>非空 </strong>的单词列表组成的句子，请你计算出给定句子可以在屏幕上完整显示的次数。</p>

<p><strong>注意：</strong></p>

<ol>
<li>一个单词不能拆分成两行。</li>
<li>单词在句子中的顺序必须保持不变。</li>
<li><strong>在一行中 </strong>的两个连续单词必须用一个空格符分隔。</li>
<li>句子中的单词总量不会超过 100。</li>
<li>每个单词的长度大于 0 且不会超过 10。</li>
<li>1 &le; <code>rows</code>, <code>cols</code> &le; 20,000.</li>
</ol>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>
rows = 2, cols = 8, 句子 sentence = [&quot;hello&quot;, &quot;world&quot;]

<strong>输出：</strong>
1

<strong>解释：</strong>
hello---
world---

<strong>字符 &#39;-&#39; 表示屏幕上的一个空白位置。</strong>
</pre>



<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>
rows = 3, cols = 6, 句子 sentence = [&quot;a&quot;, &quot;bcd&quot;, &quot;e&quot;]

<strong>输出：</strong>
2

<strong>解释：</strong>
a-bcd-
e-a---
bcd-e-

<strong>字符 &#39;-&#39; 表示屏幕上的一个空白位置。</strong>
</pre>



<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>
rows = 4, cols = 5, 句子 sentence = [&quot;I&quot;, &quot;had&quot;, &quot;apple&quot;, &quot;pie&quot;]

<strong>输出：</strong>
1

<strong>解释：</strong>
I-had
apple
pie-I
had--

<strong>字符 &#39;-&#39; 表示屏幕上的一个空白位置。</strong>
</pre>




## 分析

## 解答

```python
def wordsTyping(self, sentence: List[str], rows: int, cols: int) -> int:
	def cal(start):
		cnt = 0
		i, cur = start, -1
		while cur + A[i] + 1 <= r:
			cur += A[i] +1
			cnt += int(i==n-1)
			i = (i+1) % n
		return i, cnt

	A, n = [len(sent) for sent in sentence], len(sentence)
	q, r = divmod(cols, sum(A) + n)
	pre, d, start = [0], {}, 0
	for x in range(rows):
		d[start] = x
		start, cnt = cal(start)
		pre.append(pre[-1] + cnt)
		if start in d:
			y = d[start]
			s = pre[-1]- pre[y]
			_q, _r = divmod(rows-y, x-y+1)
			return q*rows + s*_q + pre[y+_r]
	return q*rows + pre[-1]
```

32 ms
