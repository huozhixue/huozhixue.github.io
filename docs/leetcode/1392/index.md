# 1392：最长快乐前缀（1876 分）


> <u>**[力扣第 181 场周赛第 4 题](https://leetcode.cn/problems/longest-happy-prefix/)**</u>

## 题目

<p><strong>「快乐前缀」</strong> 是在原字符串中既是 <strong>非空</strong> 前缀也是后缀（不包括原字符串自身）的字符串。</p>

<p>给你一个字符串 <code>s</code>，请你返回它的 <strong>最长快乐前缀</strong>。如果不存在满足题意的前缀，则返回一个空字符串<meta charset="UTF-8" /> <code>""</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "level"
<strong>输出：</strong>"l"
<strong>解释：</strong>不包括 s 自己，一共有 4 个前缀（"l", "le", "lev", "leve"）和 4 个后缀（"l", "el", "vel", "evel"）。最长的既是前缀也是后缀的字符串是 "l" 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "ababab"
<strong>输出：</strong>"abab"
<strong>解释：</strong>"abab" 是最长的既是前缀也是后缀的字符串。题目允许前后缀在原字符串中重叠。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
<li><code>s</code> 只含有小写英文字母</li>
</ul>


**相似问题：**
- [2223：构造字符串的总得分和（2220 分）](/leetcode/2223)
- [2430：对字母串可执行的最大删除数（2101 分）](/leetcode/2430)
- [3031：将单词恢复初始状态所需的最短时间 II（2277 分）](/leetcode/3031)
- [3029：将单词恢复初始状态所需的最短时间 I（1659 分）](/leetcode/3029)


## 分析

kmp 模板题

## 解答

```python
def kmp(s):
    n = len(s)
    pi,j = [0]*n,0
    for i in range(1,n):
        while j>0 and s[i]!=s[j]:
            j = pi[j-1]
        j += s[i]==s[j]
        pi[i] = j
    return pi

class Solution:
    def longestPrefix(self, s: str) -> str:
        i = kmp(s)[-1]
        return s[:i]
```
135 ms


