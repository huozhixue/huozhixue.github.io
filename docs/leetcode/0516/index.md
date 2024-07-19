# 0516：最长回文子序列（★）


> <u>**[力扣第 516 题](https://leetcode.cn/problems/longest-palindromic-subsequence/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，找出其中最长的回文子序列，并返回该序列的长度。</p>

<p>子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "bbbab"
<strong>输出：</strong>4
<strong>解释：</strong>一个可能的最长回文子序列为 "bbbb" 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "cbbd"
<strong>输出：</strong>2
<strong>解释：</strong>一个可能的最长回文子序列为 "bb" 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= s.length <= 1000</code></li>
<li><code>s</code> 仅由小写英文字母组成</li>
</ul>


**相似问题：**
- [0005：最长回文子串](/leetcode/0005)
- [0647：回文子串](/leetcode/0647)
- [0730：统计不同回文子序列](/leetcode/0730)
- [1143：最长公共子序列](/leetcode/1143)
- [1682：最长回文子序列 II](/leetcode/1682)
- [1771：由子序列构造的最长回文串的长度（2182 分）](/leetcode/1771)
- [2002：两个回文子序列长度的最大乘积（1869 分）](/leetcode/2002)


## 分析

典型的区间 dp，按两端是否选取即可递推。

## 解答

```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        f = [[0]*n for _ in range(n)]
        for i in range(n-1,-1,-1):
            f[i][i] = 1
            for j in range(i+1,n):
                f[i][j] = 2+f[i+1][j-1] if s[i]==s[j] else max(f[i+1][j],f[i][j-1])
        return f[0][-1]
```
869 ms

