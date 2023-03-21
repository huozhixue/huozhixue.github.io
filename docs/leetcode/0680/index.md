# 0680：验证回文串 II


> <u>**[力扣第 50 场双周赛第 1 题](https://leetcode.cn/problems/valid-palindrome-ii/)**</u>

## 题目

<p>给你一个字符串 <code>s</code>，<strong>最多</strong> 可以从中删除一个字符。</p>

<p>请你判断 <code>s</code> 是否能成为回文字符串：如果能，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "aba"
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "abca"
<strong>输出：</strong>true
<strong>解释：</strong>你可以删除字符 'c' 。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "abc"
<strong>输出：</strong>false</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s</code> 由小写英文字母组成</li>
</ul>


## 分析

最直接的就是遍历删除每个字符的情况，判断是否回文，但太费时间。

观察可知，只需从两边遍历，删除第一对不等字符的一个即可。


## 解答

```python
def validPalindrome(self, s: str) -> bool:
	if s == s[::-1]:
		return True
	l, r = 0, len(s) - 1
	while l < r and s[l] == s[r]:
		l += 1
		r -= 1
	a, b = s[l+1:r+1], s[l:r]
	return a==a[::-1] or b==b[::-1]
```

时间复杂度 O(N)，64 ms

