# 0409：最长回文串


> <u>**[力扣第 409 题](https://leetcode.cn/problems/longest-palindrome/)**</u>

## 题目

<p>给定一个包含大写字母和小写字母的字符串<meta charset="UTF-8" /> <code>s</code> ，返回 <em>通过这些字母构造成的 <strong>最长的回文串</strong></em> 。</p>

<p>在构造过程中，请注意 <strong>区分大小写</strong> 。比如 <code>"Aa"</code> 不能当做一个回文字符串。</p>



<p><strong>示例 1: </strong></p>

<pre>
<strong>输入:</strong>s = "abccccdd"
<strong>输出:</strong>7
<strong>解释:</strong>
我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong>s = "a"
<strong>输出:</strong>1
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入:</strong>s = "aaaaaccc"
<strong>输出:</strong>7</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 2000</code></li>
<li><code>s</code> 只由小写 <strong>和/或</strong> 大写英文字母组成</li>
</ul>


## 分析

显然如果字符的出现次数是偶数，都能用上。如果次数是奇数，多余的那个只能作为回文串中心。

如果多个字符的出现次数都是奇数，只能选一个多余的作为回文串中心，剩下的都是真正多余的。

因此统计出现次数为奇数的字符个数 n，多余的个数即为 max(0, n-1)。

## 解答

```python
def longestPalindrome(self, s: str) -> int:
	return len(s) - max(0, sum(v % 2 for v in Counter(s).values())-1)
```
36 ms
