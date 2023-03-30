# 0387：字符串中的第一个唯一字符


> <u>**[力扣第 387 题](https://leetcode.cn/problems/first-unique-character-in-a-string/)**</u>

## 题目

<p>给定一个字符串 <code>s</code> ，找到 <em>它的第一个不重复的字符，并返回它的索引</em> 。如果不存在，则返回 <code>-1</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong> s = "leetcode"
<strong>输出:</strong> 0
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> s = "loveleetcode"
<strong>输出:</strong> 2
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> s = "aabb"
<strong>输出:</strong> -1
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s</code> 只包含小写字母</li>
</ul>


## 分析

记录每个字符出现的次数，遍历找到第一个出现一次的字符即可。

## 解答

```python
def firstUniqChar(self, s: str) -> int:
	ct = Counter(s)
	for i, char in enumerate(s):
		if ct[char] == 1:
			return i
	return -1
```
92 ms


