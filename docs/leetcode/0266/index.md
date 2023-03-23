# 0266：回文排列


> <u>**[力扣第 266 题](https://leetcode.cn/problems/palindrome-permutation/)**</u>

## 题目

<p>给定一个字符串，判断该字符串中是否可以通过重新排列组合，形成一个回文字符串。</p>

<p><strong>示例 1：</strong></p>

<pre><strong>输入:</strong> <code>&quot;code&quot;</code>
<strong>输出:</strong> false</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入:</strong> <code>&quot;aab&quot;</code>
<strong>输出:</strong> true</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入:</strong> <code>&quot;carerac&quot;</code>
<strong>输出:</strong> true</pre>


## 分析

假如回文字符串长度是偶数，所有字符个数都应该是偶数。

假如回文字符串长度是奇数，只有一个字符个数为奇数。

因此，用计数器判断即可。

## 解答

```python
def canPermutePalindrome(self, s: str) -> bool:
    return sum(v%2 for v in Counter(s).values())<=1
```
36 ms

