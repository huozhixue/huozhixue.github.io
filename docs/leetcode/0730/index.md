# 0730：统计不同回文子序列（★★）


> <u>**[力扣第 730 题](https://leetcode.cn/problems/count-different-palindromic-subsequences/)**</u>

## 题目

<p>给你一个字符串 <code>s</code> ，返回 <code>s</code> 中不同的非空回文子序列个数 。由于答案可能很大，请返回对 <code>10<sup>9</sup> + 7</code> <strong>取余</strong> 的结果。</p>

<p>字符串的子序列可以经由字符串删除 0 个或多个字符获得。</p>

<p>如果一个序列与它反转后的序列一致，那么它是回文序列。</p>

<p>如果存在某个 <code>i</code> , 满足 <code>a<sub>i</sub> != b<sub>i</sub></code><sub> </sub>，则两个序列 <code>a<sub>1</sub>, a<sub>2</sub>, ...</code> 和 <code>b<sub>1</sub>, b<sub>2</sub>, ...</code> 不同。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = 'bccb'
<strong>输出：</strong>6
<strong>解释：</strong>6 个不同的非空回文子字符序列分别为：'b', 'c', 'bb', 'cc', 'bcb', 'bccb'。
注意：'bcb' 虽然出现两次但仅计数一次。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = 'abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba'
<strong>输出：</strong>104860361
<strong>解释：</strong>共有 3104860382 个不同的非空回文子序列，104860361 是对 10<sup>9</sup> + 7 取余后的值。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 1000</code></li>
<li><code>s[i]</code> 仅包含 <code>'a'</code>, <code>'b'</code>, <code>'c'</code> 或 <code>'d'</code> </li>
</ul>


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

