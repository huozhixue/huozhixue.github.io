# 0131：分割回文串（★★）


## 题目

给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。
返回 s 所有可能的分割方案。

回文串 是正着读和反着读都一样的字符串。


示例 1：

    输入：s = "aab"
    输出：[["a","a","b"],["aa","b"]]

示例 2：

    输入：s = "a"
    输出：[["a"]]

提示：
- 1 <= s.length <= 16
- s 仅由小写英文字母组成

## 分析

典型的单串 dp，按第一个回文子串的长度可以递归。

## 解答

```python
def partition(self, s: str) -> List[List[str]]:
    @lru_cache(None)
    def dfs(i):
        if i==len(s):
            return [[]]
        res = []
        for j in range(i+1, len(s)+1):
            pre = s[i:j]
            if pre == pre[::-1]:
                res.extend([pre]+sub for sub in dfs(j))
        return res

    return dfs(0)
```
88 ms


