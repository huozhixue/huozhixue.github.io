# 0583：两个字符串的删除操作（★★）




## 题目

给定两个单词 word1 和 word2 ，返回使得 word1 和  word2 相同所需的最小步数。

每步 可以删除任意一个字符串中的一个字符。

 

示例 1：

    输入: word1 = "sea", word2 = "eat"
    输出: 2
    解释: 第一步将 "sea" 变为 "ea" ，第二步将 "eat "变为 "ea"
示例  2:

    输入：word1 = "leetcode", word2 = "etco"
    输出：4
 

提示：
- 1 <= word1.length, word2.length <= 500
- word1 和 word2 只包含小写英文字母




## 分析

显然用动态规划即可，可以用滚动数组优化。

## 解答

```python
def minDistance(self, word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = list(range(n+1))
    for char in word1:
        prev = dp[:]
        dp[0] += 1
        for j in range(1, n+1):
            if word2[j-1]==char:
                dp[j] = prev[j-1]
            else:
                dp[j] = 1+min(prev[j], dp[j-1])
    return dp[-1]
```
244 ms

