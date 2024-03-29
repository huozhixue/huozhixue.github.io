# 0422：有效的单词方块


> <u>**[力扣第 422 题](https://leetcode.cn/problems/valid-word-square/)**</u>

## 题目

<p>给你一个单词序列，判断其是否形成了一个有效的单词方块。</p>

<p>有效的单词方块是指此由单词序列组成的文字方块的 第 k 行 和 第 k 列 (0 &le; <em>k</em> &lt; max(行数, 列数)) 所显示的字符串完全相同。</p>

<p><strong>注意：</strong></p>

<ol>
<li>给定的单词数大于等于 1 且不超过 500。</li>
<li>单词长度大于等于 1 且不超过 500。</li>
<li>每个单词只包含小写英文字母 <code>a-z</code>。</li>
</ol>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>
[
&quot;abcd&quot;,
&quot;bnrt&quot;,
&quot;crmy&quot;,
&quot;dtye&quot;
]

<strong>输出：</strong>
true

<strong>解释：</strong>
第 1 行和第 1 列都是 &quot;abcd&quot;。
第 2 行和第 2 列都是 &quot;bnrt&quot;。
第 3 行和第 3 列都是 &quot;crmy&quot;。
第 4 行和第 4 列都是 &quot;dtye&quot;。

因此，这是一个有效的单词方块。
</pre>



<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>
[
&quot;abcd&quot;,
&quot;bnrt&quot;,
&quot;crm&quot;,
&quot;dt&quot;
]

<strong>输出：</strong>
true

<strong>解释：</strong>
第 1 行和第 1 列都是 &quot;abcd&quot;。
第 2 行和第 2 列都是 &quot;bnrt&quot;。
第 3 行和第 3 列都是 &quot;crm&quot;。
第 4 行和第 4 列都是 &quot;dt&quot;。

因此，这是一个有效的单词方块。
</pre>



<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>
[
&quot;ball&quot;,
&quot;area&quot;,
&quot;read&quot;,
&quot;lady&quot;
]

<strong>输出：</strong>
false

<strong>解释：</strong>
第 3 行是 &quot;read&quot; ，然而第 3 列是 &quot;lead&quot;。

因此，这 <strong>不是</strong> 一个有效的单词方块。
</pre>




## 分析

模拟判断即可。python 可以用 zip_longest 方便地提取每列。

## 解答

```python
def validWordSquare(self, words: List[str]) -> bool:
	return all(a==''.join(b) for a, b in zip(words, zip_longest(*words, fillvalue='')))
```

48 ms
