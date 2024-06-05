# 1358：包含所有三种字符的子字符串数目（1646 分）


> <u>**[力扣第 20 场双周赛第 3 题](https://leetcode.cn/problems/number-of-substrings-containing-all-three-characters/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，它只包含三种字符 a, b 和 c 。</p>

<p>请你返回 a，b 和 c 都 <strong>至少 </strong>出现过一次的子字符串数目。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>s = &quot;abcabc&quot;
<strong>输出：</strong>10
<strong>解释：</strong>包含 a，b 和 c 各至少一次的子字符串为<em> &quot;</em>abc<em>&quot;, &quot;</em>abca<em>&quot;, &quot;</em>abcab<em>&quot;, &quot;</em>abcabc<em>&quot;, &quot;</em>bca<em>&quot;, &quot;</em>bcab<em>&quot;, &quot;</em>bcabc<em>&quot;, &quot;</em>cab<em>&quot;, &quot;</em>cabc<em>&quot; </em>和<em> &quot;</em>abc<em>&quot; </em>(<strong>相同</strong><strong>字符串算多次</strong>)<em>。</em>
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>s = &quot;aaacb&quot;
<strong>输出：</strong>3
<strong>解释：</strong>包含 a，b 和 c 各至少一次的子字符串为<em> &quot;</em>aaacb<em>&quot;, &quot;</em>aacb<em>&quot; </em>和<em> &quot;</em>acb<em>&quot; 。</em>
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>s = &quot;abc&quot;
<strong>输出：</strong>1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>3 &lt;= s.length &lt;= 5 x 10^4</code></li>
<li><code>s</code> 只包含字符 a，b 和 c 。</li>
</ul>


## 分析

子字符串的总数很好求，因此可以反过来求不同时包含 a、b、c 的子字符串个数。这即是典型的滑动窗口问题。

## 解答


```python
def numberOfSubstrings(self, s: str) -> int:
	res,i,ct = 0,0,Counter()
	for j,c in enumerate(s):
		ct[c] += 1
		while ct['a'] and ct['b'] and ct['c']:
			ct[s[i]] -= 1
			i += 1
		res += i
	return res
```
212 ms
