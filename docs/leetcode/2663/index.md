# 2663：字典序最小的美丽字符串（2415 分）


> <u>**[力扣第 343 场周赛第 4 题](https://leetcode.cn/problems/lexicographically-smallest-beautiful-string/)**</u>

## 题目

<p>如果一个字符串满足以下条件，则称其为 <strong>美丽字符串</strong> ：</p>

<ul>
<li>它由英语小写字母表的前 <code>k</code> 个字母组成。</li>
<li>它不包含任何长度为 <code>2</code> 或更长的回文子字符串。</li>
</ul>

<p>给你一个长度为 <code>n</code> 的美丽字符串 <code>s</code> 和一个正整数 <code>k</code> 。</p>

<p>请你找出并返回一个长度为 <code>n</code> 的美丽字符串，该字符串还满足：在字典序大于 <code>s</code> 的所有美丽字符串中字典序最小。如果不存在这样的字符串，则返回一个空字符串。</p>

<p>对于长度相同的两个字符串 <code>a</code> 和 <code>b</code> ，如果字符串 <code>a</code> 在与字符串 <code>b</code> 不同的第一个位置上的字符字典序更大，则字符串 <code>a</code> 的字典序大于字符串 <code>b</code> 。</p>

<ul>
<li>例如，<code>"abcd"</code> 的字典序比 <code>"abcc"</code> 更大，因为在不同的第一个位置（第四个字符）上 <code>d</code> 的字典序大于 <code>c</code> 。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "abcz", k = 26
<strong>输出：</strong>"abda"
<strong>解释：</strong>字符串 "abda" 既是美丽字符串，又满足字典序大于 "abcz" 。
可以证明不存在字符串同时满足字典序大于 "abcz"、美丽字符串、字典序小于 "abda" 这三个条件。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "dc", k = 4
<strong>输出：</strong>""
<strong>解释：</strong>可以证明，不存在既是美丽字符串，又字典序大于 "dc" 的字符串。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n == s.length &lt;= 10<sup>5</sup></code></li>
<li><code>4 &lt;= k &lt;= 26</code></li>
<li><code>s</code> 是一个美丽字符串</li>
</ul>


## 分析

- 类似 {{< lc  "0031" >}} 的思想，可以贪心地从后往前找能增大的后缀
- 为了方便，先把字符串 s 转为 0-25 的数字数组 A
- 倒序遍历到 i，假如存在 A[i]<a<k，且 a 不和 A[i-1] 或 A[i-2] 构成回文，即应该增加 A[i] 到 a
- 然后考虑 A[i+1:]，依次选取不构成回文的最小元素即可

## 解答


```python
class Solution:
    def smallestBeautifulString(self, s: str, k: int) -> str:
        A = [ord(c)-ord('a') for c in s]
        n = len(A)
        for i in range(n-1,-1,-1):
            for a in range(A[i]+1,k):
                if a not in A[max(0,i-2):i]:
                    A[i] = a
                    for j in range(i+1,n):
                        for b in range(k):
                            if b not in A[max(0,j-2):j]:
                                A[j] = b
                                break
                    return ''.join(chr(x+ord('a')) for x in A)
        return ''
```
362 ms
