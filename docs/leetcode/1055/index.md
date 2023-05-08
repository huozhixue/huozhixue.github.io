# 1055：形成字符串的最短路径（★）


> <u>**[力扣第 1055 题](https://leetcode.cn/problems/shortest-way-to-form-string/)**</u>

## 题目

<p>对于任何字符串，我们可以通过删除其中一些字符（也可能不删除）来构造该字符串的 <strong>子序列</strong> 。(例如，<code>“ace”</code> 是 <code>“abcde”</code> 的子序列，而 <code>“aec”</code> 不是)。</p>

<p>给定源字符串 <code>source</code> 和目标字符串 <code>target</code>，返回 <em>源字符串 <code>source</code> 中能通过串联形成目标字符串 </em><code>target</code> <em>的 <strong>子序列</strong> 的最小数量 </em>。如果无法通过串联源字符串中的子序列来构造目标字符串，则返回 <code>-1</code>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>source = "abc", target = "abcbc"
<strong>输出：</strong>2
<strong>解释：</strong>目标字符串 "abcbc" 可以由 "abc" 和 "bc" 形成，它们都是源字符串 "abc" 的子序列。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>source = "abc", target = "acdbc"
<strong>输出：</strong>-1
<strong>解释：</strong>由于目标字符串中包含字符 "d"，所以无法由源字符串的子序列构建目标字符串。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>source = "xyz", target = "xzyxz"
<strong>输出：</strong>3
<strong>解释：</strong>目标字符串可以按如下方式构建： "xz" + "y" + "xz"。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= source.length, target.length &lt;= 1000</code></li>
<li><code>source</code> 和 <code>target</code> 仅包含英文小写字母。</li>
</ul>


## 分析

暴力循环遍历 source ，依此找 target 的字符即可。

## 解答

```python
def shortestWay(self, source: str, target: str) -> int:
	if set(target)-set(source):
		return -1
	res, i = 0, 0
	while i<len(target):
		for c in source:
			if i<len(target) and c==target[i]:
				i += 1
		res += 1
	return res
```
40 ms
