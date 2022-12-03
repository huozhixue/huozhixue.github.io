# 0730：统计不同回文子序列（★★★）


## 题目

给定一个字符串 s，返回 s 中不同的非空「回文子序列」个数 。

通过从 s 中删除 0 个或多个字符来获得子序列。

如果一个字符序列与它反转后的字符序列一致，那么它是「回文字符序列」。

如果有某个 i , 满足 ai != bi ，则两个序列 a1, a2, ... 和 b1, b2, ... 不同。

注意：
- 结果可能很大，你需要对 10^9 + 7 取模 。
 

示例 1：

    输入：s = 'bccb'
    输出：6
    解释：6 个不同的非空回文子字符序列分别为：'b', 'c', 'bb', 'cc', 'bcb', 'bccb'。
    注意：'bcb' 虽然出现两次但仅计数一次。
示例 2：

    输入：s = 'abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba'
    输出：104860361
    解释：共有 3104860382 个不同的非空回文子序列，104860361 对 10^9 + 7 取模后的值。
 

提示：
- 1 <= s.length <= 1000
- s[i] 仅包含 'a', 'b', 'c' 或 'd' 


## 分析

不考虑重复的话，就是一般的区间 dp 问题，按序列最外层的字符递推。

考虑重复的话要复杂很多。假设最外层字符为 'a'，位置分别为 i、j，那么：
- [i,j] 范围内最外层为 'b'/'c'/'d' 的不同回文子序列，加上 'a' 后显然是不同的
- [i,j] 范围内最外层为 'a' 的不同回文子序列，加上 'a' 后也是不同的
    - 但加/不加 'a' 的两个集合是有很多重复的
    - 观察发现，加上 'a' 后基本包括了不加 'a' 的集合，除了 'a' 和 'aa'
    - 两个集合的大小是相同的，因此加/不加 'a' 的合集只比不加 'a' 的集合多 2

于是令 dp[i][j][x] 代表 [i,j] 范围内最外层为字符 x 的不同回文子序列个数，即可区间递推。

为了方便，可以将 s 的字符都转为整数。

## 解答

```python
def countPalindromicSubsequences(self, s: str) -> int:
    n, mod = len(s), 10**9+7
    A = [ord(c)-ord('a') for c in s]
    dp = [[[0]*4 for _ in range(n)] for _ in range(n)]
    for j in range(n):
        dp[j][j][A[j]] = 1
        for i in range(j-1, -1, -1):
            dp[i][j] = dp[i+1][j-1][:]
            if A[i]==A[j]:
                dp[i][j][A[i]] = (sum(dp[i+1][j-1])+2)%mod
            else:
                dp[i][j][A[i]] = dp[i][j-1][A[i]]
                dp[i][j][A[j]] = dp[i+1][j][A[j]]
    return sum(dp[0][-1])%mod
```
3408 ms
