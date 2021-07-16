# 1143：最长公共子序列（★★）




## 题目

给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。

若这两个字符串没有公共子序列，则返回 0。

 <!--more--> 
 
示例 1:

	输入：text1 = "abcde", text2 = "ace" 
	输出：3  
	解释：最长公共子序列是 "ace"，它的长度为 3。
	
示例 2:

	输入：text1 = "abc", text2 = "abc"
	输出：3
	解释：最长公共子序列是 "abc"，它的长度为 3。
	
示例 3:

	输入：text1 = "abc", text2 = "def"
	输出：0
	解释：两个字符串没有公共子序列，返回 0。



## 分析

### #1

先考虑递归。

	若 text1[0]==text2[0]		转为递归子问题 text1[1:] 和 text2[1:] 的最长公共序列长度

	如果不等，那公共序列必然是两种情况之一：
	不包含 text1[0]				等价于递归子问题 text1[1:] 和 text2 的最长公共序列长度
	不包含 text2[0]				等价于递归子问题 text1 和 text2[1:] 的最长公共序列长度

再考虑边界条件，即可写出递归解法。

```python
@lru_cache(None)
def longestCommonSubsequence(self, text1: str, text2: str) -> int:
	if not text1 or not text2:
		return 0
	if text1[0] == text2[0]:
		return 1+self.longestCommonSubsequence(text1[1:], text2[1:])
	return max(self.longestCommonSubsequence(text1[1:], text2), self.longestCommonSubsequence(text1, text2[1:]))
```

2684 ms，空间占得很多

### #2

改写为动态规划，令 dp[i][j] 表示 text1[:i] 和 text2[:j] 的最长公共序列长度，则：

	if i==0 or j==0:				dp[i][j] = 0
	elif text1[i-1]==text2[j-1]:	dp[i][j] = 1+dp[i-1][j-1]
	else:							dp[i][j] = max(dp[i-1][j], dp[i][j-1])


## 解答

```python
def longestCommonSubsequence(self, text1: str, text2: str) -> int:
	m, n = len(text1), len(text2)
	dp = [[0]*(n+1) for _ in range(m+1)]
	for i in range(1, m+1):
		for j in range(1, n+1):
			dp[i][j] = 1+dp[i-1][j-1] if text1[i-1]==text2[j-1] else max(dp[i-1][j], dp[i][j-1])
	return dp[-1][-1]
```

384 ms

