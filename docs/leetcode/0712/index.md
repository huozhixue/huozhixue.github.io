# 0712： 两个字符串的最小ASCII删除和（★★）


> **第  场周赛第  题**

## 题目

给定两个字符串s1 和 s2，返回 使两个字符串相等所需删除字符的 ASCII 值的最小和 。

 

示例 1:

    输入: s1 = "sea", s2 = "eat"
    输出: 231
    解释: 在 "sea" 中删除 "s" 并将 "s" 的值(115)加入总和。
    在 "eat" 中删除 "t" 并将 116 加入总和。
    结束时，两个字符串相等，115 + 116 = 231 就是符合条件的最小和。
示例 2:

    输入: s1 = "delete", s2 = "leet"
    输出: 403
    解释: 在 "delete" 中删除 "dee" 字符串变成 "let"，
    将 100[d]+101[e]+101[e] 加入总和。在 "leet" 中删除 "e" 将 101[e] 加入总和。
    结束时，两个字符串都等于 "let"，结果即为 100+101+101+101 = 403 。
    如果改为将两个字符串转换为 "lee" 或 "eet"，我们会得到 433 或 417 的结果，比答案更大。
 

提示:
- 0 <= s1.length, s2.length <= 1000
- s1 和 s2 由小写英文字母组成



## 分析

{{< lc "0583" >}} 升级版，修改下删除代价即可。

## 解答

```python
def minimumDeleteSum(self, s1: str, s2: str) -> int:
    m, n = len(s1), len(s2)
    dp = [0]+list(accumulate(map(ord, s2)))
    for c in s1:
        prev = dp[:]
        dp[0] += ord(c)
        for j in range(1, n+1):
            if s2[j-1]==c:
                dp[j] = prev[j-1]
            else:
                dp[j] = min(ord(c)+prev[j], ord(s2[j-1])+dp[j-1])
    return dp[-1]
```
512 ms

