# 1328：破坏回文串（1473 分）


> <u>**[力扣第 18 场双周赛第 2 题](https://leetcode.cn/problems/break-a-palindrome/)**</u>

## 题目

<p>给你一个由小写英文字母组成的回文字符串 <code>palindrome</code> ，请你将其中 <strong>一个</strong> 字符用任意小写英文字母替换，使得结果字符串的 <strong>字典序最小</strong> ，且 <strong>不是</strong> 回文串。</p>

<p>请你返回结果字符串。如果无法做到，则返回一个 <strong>空串</strong> 。</p>

<p>如果两个字符串长度相同，那么字符串 <code>a</code> 字典序比字符串 <code>b</code> 小可以这样定义：在 <code>a</code> 和 <code>b</code> 出现不同的第一个位置上，字符串 <code>a</code> 中的字符严格小于 <code>b</code> 中的对应字符。例如，<code>"abcc”</code> 字典序比 <code>"abcd"</code> 小，因为不同的第一个位置是在第四个字符，显然 <code>'c'</code> 比 <code>'d'</code> 小。</p>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>palindrome = "abccba"
<strong>输出：</strong>"aaccba"
<strong>解释：</strong>存在多种方法可以使 "abccba" 不是回文，例如 "<em><strong>z</strong></em>bccba", "a<em><strong>a</strong></em>ccba", 和 "ab<em><strong>a</strong></em>cba" 。
在所有方法中，"aaccba" 的字典序最小。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>palindrome = "a"
<strong>输出：</strong>""
<strong>解释：</strong>不存在替换一个字符使 "a" 变成非回文的方法，所以返回空字符串。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= palindrome.length &lt;= 1000</code></li>
<li><code>palindrome</code> 只包含小写英文字母。</li>
</ul>




## 分析

- 假如长度 1，显然无法做到，返回空
- 要使字典序最小，考虑尽可能前面的某位变为 'a'
- 因此遍历前半部分（不包括中心位置），找到第一个不为 'a' 的位置，变为 'a' 即可
- 如果全为 'a'，那么将最后一位变为 'b' 即可

## 解答


```python
def breakPalindrome(self, palindrome: str) -> str:
	s = palindrome
	n = len(s)
	if n==1:
		return ''
	for i in range(n//2):
		if s[i] != 'a':
			return s[:i]+'a'+s[i+1:]
	return s[:-1]+'b'
```
36 ms
