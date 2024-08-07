# 1081：不同字符的最小子序列（2184 分）


> <u>**[力扣第 140 场周赛第 4 题](https://leetcode.cn/problems/smallest-subsequence-of-distinct-characters/)**</u>

## 题目

<p>返回 <code>s</code> 字典序最小的<span data-keyword="subsequence-array">子序列</span>，该子序列包含 <code>s</code> 的所有不同字符，且只包含一次。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong><code>s = "bcabc"</code>
<strong>输出<code>：</code></strong><code>"abc"</code>
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong><code>s = "cbacdcbc"</code>
<strong>输出：</strong><code>"acdb"</code></pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 1000</code></li>
<li><code>s</code> 由小写英文字母组成</li>
</ul>



<p><strong>注意：</strong>该题与 316 <a href="https://leetcode.cn/problems/remove-duplicate-letters/">https://leetcode.cn/problems/remove-duplicate-letters/</a> 相同</p>


**相似问题：**
- [1673：找出最具竞争力的子序列（1802 分）](/leetcode/1673)


## 分析


与 0316 完全相同。


## 解答

```python
def smallestSubsequence(self, s: str) -> str:
	tmp = ''
	for i, char in enumerate(s):
		if char not in tmp:
			while tmp and tmp[-1]>char and s.find(tmp[-1], i)!=-1:
				tmp = tmp[:-1]
			tmp += char
	return tmp
```

40 ms

