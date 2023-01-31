# 1392：最长快乐前缀（★★★）


> **第 181 场周赛第 4 题**


## 题目

「快乐前缀」 是在原字符串中既是 非空 前缀也是后缀（不包括原字符串自身）的字符串。

给你一个字符串 s，请你返回它的 最长快乐前缀。如果不存在满足题意的前缀，则返回一个空字符串 "" 。

 

示例 1：

    输入：s = "level"
    输出："l"
    解释：不包括 s 自己，一共有 4 个前缀（"l", "le", "lev", "leve"）和 4 个后缀（"l", "el", "vel", "evel"）。
    最长的既是前缀也是后缀的字符串是 "l" 。
示例 2：

    输入：s = "ababab"
    输出："abab"
    解释："abab" 是最长的既是前缀也是后缀的字符串。题目允许前后缀在原字符串中重叠。
 

提示：
- 1 <= s.length <= 10^5
- s 只含有小写英文字母





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


