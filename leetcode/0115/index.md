# 0115：不同的子序列（★★★）


## 题目

给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。

字符串的一个 子序列 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）

题目数据保证答案符合 32 位带符号整数范围。


<!--more--> 

示例 1：

	输入：s = "rabbbit", t = "rabbit"
	输出：3
	解释：
	如下图所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。
	(上箭头符号 ^ 表示选取的字母)
	rabbbit
	^^^^ ^^
	rabbbit
	^^ ^^^^
	rabbbit
	^^^ ^^^
	
示例 2：

	输入：s = "babgbag", t = "bag"
	输出：5
	解释：
	如下图所示, 有 5 种可以从 s 中得到 "bag" 的方案。 
	(上箭头符号 ^ 表示选取的字母)
	babgbag
	^^ ^
	babgbag
	^^    ^
	babgbag
	^    ^^
	babgbag
	  ^  ^^
	babgbag
		^^^



## 分析

### #1

先考虑能否递归。含有 t 的子序列必然是两种情况之一：

	以 s[-1] 结尾		此时必有 s[-1] == t[-1]，转为递归子问题 numDistinct(s[:-1], t[:-1])
	
	不以 s[-1] 结尾		转为递归子问题 numDistinct(s[:-1], t)

再考虑下边界条件即可写出代码。

```python
@lru_cache(None)
def numDistinct(self, s: str, t: str) -> int:
	if not t:
		return 1
	if not s:
		return 0
	if s[-1] != t[-1]:
		return self.numDistinct(s[:-1], t)
	return self.numDistinct(s[:-1], t) + self.numDistinct(s[:-1], t[:-1])
```

72 ms

### #2

可以改写为动态规划。令 dp[i][j] 代表 s[:i] 包含 t[:j] 的子序列个数。状态转移方程为：

	if j==0:				dp[i][j] = 1
	elif i==0:				dp[i][j] = 0
	elif s[i-1]!=t[j-1]:	dp[i][j] = dp[i-1][j]
	else:					dp[i][j] = dp[i-1][j] + dp[i-1][j-1]
	
```python
def numDistinct(self, s: str, t: str) -> int:
	m, n = len(s), len(t)
	dp = [[1]*(n+1) for _ in range(m+1)]
	for i in range(m+1):
		for j in range(1, n+1):
			dp[i][j] = 0 if i==0 else dp[i-1][j] + int(s[i-1]==t[j-1]) * dp[i-1][j-1]
	return dp[-1][-1]
```

64 ms

### #3

还可以将 dp 优化为一维数组。注意 dp[i][j] 和 dp[i-1][j-1] 相关，因此应该先刚更新位置 j，再更新位置 j-1。

## 解答

```python
def numDistinct(self, s: str, t: str) -> int:
	m, n = len(s), len(t)
	dp = [1]*(n+1)
	for i in range(m+1):
		for j in range(n, 0, -1):
			dp[j] = 0 if i==0 else dp[j] + int(s[i-1]==t[j-1]) * dp[j-1]
        return dp[-1]
```

44 ms

