# 0005：最长回文子串（★★★）


## 题目

给你一个字符串 s，找到 s 中最长的回文子串。

示例 1：

	输入：s = "babad"
	输出："bab"
	解释："aba" 同样是符合题意的答案。

示例 2：

	输入：s = "cbbd"
	输出："bb"
	 

提示：
- 1 <= s.length <= 1000
- s 仅由数字和英文字母组成

 


## 分析

### #1

暴力法是直接遍历所有子串，判断是否是回文。
- 显然有很多不必要的判断，观察发现回文子串是可以递推的。
s[i:j+1] 是回文等价于 s[i-1:j] 是回文且 s[i]==s[j]。
- 因此考虑从短到长递推判断所有子串，取最长的即可。
- 注意到递推中很多子串是重复使用的，因此可以保存中间结果，避免重复递推。

> 这种递推方式被称为区间 dp。

具体实现时，令 dp[i][j] 代表 s[i:j+1] 是否回文，递推式为：

	dp[i][j] = dp[i+1][j-1] and s[i]==s[j]

dp[i][j] 依赖 dp[i+1][j-1]，要特别注意遍历顺序：
- 可以先遍历 j，再遍历 i
- 也可以反向遍历 i，再遍历 j


```python
def longestPalindrome(self, s: str) -> str:
    res, n = (0, 0), len(s)
    dp = [[True]*n for _ in range(n)]
    for j in range(n):
        for i in range(j):
            dp[i][j] = dp[i+1][j-1] and s[i]==s[j]
            if dp[i][j] and j-i>res[1]-res[0]:
                res = (i, j)
    return s[res[0]:res[1]+1]
```
时间复杂度 $O(N^2)$，5925 ms

### #2

注意到递推过程中假如 dp[i+1][j-1] 非真，那么就没必要递推 dp[i][j] 了。

因此考虑从初始的 dp[i][i-1] 或 dp[i][i] 往两边递推，一旦非真，就无需考虑了。

于是得到中心扩展法：
- 遍历所有中心 (i, i-1) 或 (i, i)
- 对于每个中心，往两边扩展找到最长的回文子串
- 过程中找到的最长的即为所求

```python
def longestPalindrome(self, s: str) -> str:
    def expand(l, r):
        while l and r<n-1 and s[l-1]==s[r+1]:
            l -= 1
            r += 1
        return l, r

    res, n = (0, 0), len(s)
    for i in range(n):
        for l, r in [expand(i, i), expand(i, i - 1)]:
            if r - l > res[1] - res[0]:
                res = (l, r)
    return s[res[0]:res[1]+1]
```
时间复杂度 $O(N^2)$，840 ms

### #3

还有个更巧妙的想法。

令 dp[j] 代表 s[:j] 的最长回文子串长度。那么:
- s[:j] 的回文子串要么是 s[:j-1] 的回文子串，要么是某个 s[i:j]
- 如果 s[i:j] 是回文子串，其长度是 s[i+1:j-1] 的长度加 2

因此 dp[j] 不可能超过 dp[j-1]+2，也就是说 dp[j] 只有 3 种可能值，分别判断即可。

> 这种递推方式则被称为线性 dp。
> 特别的，因为 dp[j] 只依赖 dp[j-1]，所以可以只用一个变量。

## 解答

```python
def longestPalindrome(self, s: str) -> str:
    res, dp = '', 0
    for j in range(1, len(s)+1):
        for L in [dp+1, min(dp+2, j)]:
            tmp = s[j-L:j]
            if tmp == tmp[::-1]:
                res, dp = tmp, L
    return res
```
时间复杂度 $O(N^2)$，104 ms

## *附加

此题还有一个经典的的 
[Manacher算法](https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zui-chang-hui-wen-zi-chuan-by-leetcode-solution)
。

它在 O(N) 时间内不仅能找到最长回文子串，而且能得到所有中心子串的扩展距离。
因此在与回文相关的问题中，都可以试试能否用 Manacher 算法解决。

```python
def longestPalindrome(self, s: str) -> str:
    def expand(l, r):
        while l and r<len(ss)-1 and ss[l-1]==ss[r+1]:
            l -= 1
            r += 1
        return (r-l)//2

    pair, ss = (0, 0), '#' + '#'.join(s) + '#'
    A, center, right = [], 0, 0
    for i in range(len(ss)):
        min_arm = min(A[2*center-i], right-i) if right > i else 0
        cur_arm = expand(i-min_arm, i+min_arm)
        A.append(cur_arm)
        if i + cur_arm > right:
            center, right = i, i + cur_arm
        if 2*cur_arm > pair[1]-pair[0]:
            pair = (i-cur_arm, i+cur_arm)
    return ss[pair[0]+1:pair[1]:2]
```
时间复杂度 O(N)，148 ms


