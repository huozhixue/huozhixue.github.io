# 2002：两个回文子序列长度的最大乘积（★★）


> **第 258 场周赛第 3 题**

## 题目

给你一个字符串 s ，请你找到 s 中两个 不相交回文子序列 ，使得它们长度的 乘积最大 。
两个子序列在原字符串中如果没有任何相同下标的字符，则它们是 不相交 的。

请你返回两个回文子序列长度可以达到的 最大乘积 。

子序列 指的是从原字符串中删除若干个字符（可以一个也不删除）后，剩余字符不改变顺序而得到的结果。
如果一个字符串从前往后读和从后往前读一模一样，那么这个字符串是一个 回文字符串 。

提示：
- 2 <= s.length <= 12
- s 只含有小写英文字母。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/08/24/two-palindromic-subsequences.png)
    
    输入：s = "leetcodecom"
    输出：9
    解释：最优方案是选择 "ete" 作为第一个子序列，"cdc" 作为第二个子序列。
    它们的乘积为 3 * 3 = 9 。

示例 2：

    输入：s = "bb"
    输出：1
    解释：最优方案为选择 "b" （第一个字符）作为第一个子序列，"b" （第二个字符）作为第二个子序列。
    它们的乘积为 1 * 1 = 1 。

示例 3：

    输入：s = "accbcaxxcxx"
    输出：25
    解释：最优方案为选择 "accca" 作为第一个子序列，"xxcxx" 作为第二个子序列。
    它们的乘积为 5 * 5 = 25 。
     

 
## 分析

数据规模很小，考虑暴力。

遍历所有子序列，如果是回文序列，那么将剩下的位置拼接为 s2，在 s2 中找最长的回文子序列即可。
求最长的回文子序列即是问题 {{< lc "0516" >}}

> 为了方便将 s 拆为两个子序列，可以用状态压缩。

## 解答

```python
def maxProduct(self, s: str) -> int:
    def cal(s):
        n = len(s)
        dp = [[0] * n for _ in range(n)]
        for i in range(n - 1, -1, -1):
            dp[i][i] = 1
            for j in range(i + 1, n):
                dp[i][j] = 2 + dp[i + 1][j - 1] if s[i] == s[j] else max(dp[i + 1][j], dp[i][j - 1])
        return dp[0][-1]

    res, n = 0, len(s)
    for state in range(1, (1 << n)-1):
        s1, s2, state = '', '', bin(state)[2:].zfill(n)
        for char, bit in zip(s, state):
            s1 += char if bit == '1' else ''
            s2 += char if bit == '0' else ''
        if s1 == s1[::-1] and len(s1)*len(s2) > res:
            res = max(res, len(s1)*cal(s2))
    return res
```
时间复杂度 $O(N^2*2^N)$，364 ms

