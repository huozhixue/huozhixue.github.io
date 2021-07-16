# 0516：最长回文子序列（★★）


## 题目

给定一个字符串 s ，找到其中最长的回文子序列，并返回该序列的长度。可以假设 s 的最大长度为 1000 。

 <!--more--> 
 
示例 1:

	输入:
	"bbbab"
	
	输出:
	4
	
	一个可能的最长回文子序列为 "bbbb"。

示例 2:

	输入:
	"cbbd"
	
	输出:
	2
	
	一个可能的最长回文子序列为 "bb"。


	
## 分析

### #1

本题思路类似 1143 ，事实上，本题等价于求 s 和 s[::-1] 的最长公共子序列，是 1143 的子问题。

	如果 s 的两端相等	转化为递归子问题求 s[1:-1] 的最长回文子序列

	如果 s 的两端不等，那 s 的回文子序列必然是两种情况之一：
	不包含首位字符		等价于递归子问题求 s[1:] 的最长回文子序列
	不包含末尾字符		等价于递归子问题求 s[:-1] 的最长回文子序列

再考虑下边界条件即可写出递归解法

```python
@lru_cache(None)
def longestPalindromeSubseq(self, s: str) -> int:
	if len(s)<2:
		return len(s)
	if s[0]==s[-1]:
		return 2+self.longestPalindromeSubseq(s[1:-1])
	return max(self.longestPalindromeSubseq(s[1:]), self.longestPalindromeSubseq(s[:-1]))
```

2916 ms，空间占得很多

### #2

可以改写成动态规划。令 dp[i][j] 代表 s[i:j] 的最长回文子序列长度，状态转移方程为：

	if j-i < 2:				dp[i][j] = j-i
	elif s[i]==s[j-1]:		dp[i][j] = 2+dp[i+1][j-1] 
	else:					dp[i][j] = max(dp[i+1][j], dp[i][j-1])
	
可以先排除 s 是回文串的特殊情况，以节省时间。

## 解答

```python
def longestPalindromeSubseq(self, s: str) -> int:
	n = len(s)
	if n<2 or s==s[::-1]:
		return n
	dp = [[0]*(n+1) for _ in range(n+1)]
	for i in range(n-1, -1, -1):
		dp[i][i+1] = 1
		for j in range(i+2, n+1):
			dp[i][j] = 2+dp[i+1][j-1] if s[i]==s[j-1] else max(dp[i+1][j], dp[i][j-1])
	return dp[0][-1]
```

时间复杂度 $O(N^2)$，552 ms

