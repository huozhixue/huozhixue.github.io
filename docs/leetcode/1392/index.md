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

### #1

暴力法就是直接遍历 L 判断 s[:L] 和 s[-L:] 是否相等。

要优化判断子串相等的时间，容易想到用滚动哈希。

> 元素种类最多 26，窗口种类最多 10^5 级别，因此考虑 base 取 31，mod 取 10^11+3

```python
def longestPrefix(self, s: str) -> str:
    res, n = -1, len(s)
    base, mod = 31, 10**11+3
    w1, w2, bL = 0, 0, 1
    for i in range(n-1):
        w1 = (w1*base+ord(s[i])-ord('a')+1)%mod
        w2 = (w2+(ord(s[n-1-i])-ord('a')+1)*bL)%mod
        bL = bL*base%mod
        if w1==w2:
            res = i
    return s[:res+1]
```
760 ms

### #2

求最长的既是前缀又是后缀的子串，容易想到 KMP，KMP 中的 nxt[i] 即是 s[:i] 的快乐前缀长度。


## 解答

```python
def longestPrefix(self, s: str) -> str:
    nxt, j, n = [-1], -1, len(s)
    for i in range(n):
        while j >= 0 and s[i] != s[j]:
            j = nxt[j]
        j += 1
        nxt.append(j)
    return s[:nxt[-1]]
```
228 ms


