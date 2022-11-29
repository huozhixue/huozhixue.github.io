# 0115：不同的子序列（★★★）


## 题目

给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。 

字符串的一个 子序列 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。
（例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）

题目数据保证答案符合 32 位带符号整数范围。
 

示例 1：

    输入：s = "rabbbit", t = "rabbit"
    输出：3
    解释：
    如下图所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。
    rabbbit
    rabbbit
    rabbbit

示例 2：
    
    输入：s = "babgbag", t = "bag"
    输出：5
    解释：
    如下图所示, 有 5 种可以从 s 中得到 "bag" 的方案。 
    babgbag
    babgbag
    babgbag
    babgbag
    babgbag
 
提示：
- 0 <= s.length, t.length <= 1000
- s 和 t 由英文字母组成

## 分析

典型的双串 dp，按是否由 s[-1] 拼成 t[-1] 即可递归。

## 解答

```python
def numDistinct(self, s: str, t: str) -> int:
    @lru_cache(None)
    def dfs(s, t):
        if len(s) < len(t):
            return 0
        if not t:
            return 1
        res = dfs(s[:-1], t)
        if s[-1]==t[-1]:
            res += dfs(s[:-1], t[:-1])
        return res

    return dfs(s, t)
```
60 ms
