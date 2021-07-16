# 0132：分割回文串II（★★）


## 题目

给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

返回符合要求的最少分割次数。


<!--more--> 

示例:

	输入: "aab"
	输出: 1
	解释: 进行一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。

## 分析

### #1

类似 0131 ，可以用递归。

本题可以先排除 s 本身是回文串和 s 能分成两个回文串的特殊情形，能节省不少时间。

```python
@lru_cache(None)
def minCut(self, s: str) -> int:
	n = len(s)
	if n < 2 or s == s[::-1]:
		return 0
	if any(s[:i] == s[:i][::-1] and s[i:] == s[i:][::-1] for i in range(1, n)):
		return 1
	res = float('inf')
	for i in range(len(s)):
		l, r = s[:i+1], s[i+1:]
		if l == l[::-1]:
			res = min(res, 1+self.minCut(r))
	return res
```

292 ms，空间占得较多

### #2

可以改写成动态规划。用 dp[i] 表示 s[:i] 的最少分割数，状态转移方程为：

	if s[:i]==s[:i][::-1]: 	dp[i] = 0
	else:					dp[i] = 1+min(dp[j] for j in range(i) if s[j:i]==s[j:i][::-1])

```python
def minCut(self, s: str) -> int:
	n = len(s)
	if n < 2 or s == s[::-1]:
		return 0
	if any(s[:i] == s[:i][::-1] and s[i:] == s[i:][::-1] for i in range(1, n)):
		return 1
	dp = [0] * (n+1)
	for i in range(2, n+1):
		if s[:i] == s[:i][::-1]:
			dp[i] = 0
		else:
			dp[i] = 1+min(dp[j] for j in range(1, i) if s[j:i]==s[j:i][::-1])
	return dp[-1]
```

时间复杂度 O(N^3)，140 ms

### #3

类似 0131 ，可以继续优化判断回文的时间。

## 解答

```python
def minCut(self, s: str) -> int:
	n = len(s)
	if n < 2 or s == s[::-1]:
		return 0
	if any(s[:i] == s[:i][::-1] and s[i:] == s[i:][::-1] for i in range(1, n)):
		return 1
	dp = [0] * (n+1)
	dp2 = [[True]*(n+1) for _ in range(n+1)]
	for i in range(2, n+1):
		for j in range(i-1, -1, -1):
			dp2[j][i] = s[j] == s[i-1] and dp2[j+1][i-1]
		if dp2[0][i]:
			dp[i] = 0
		else:
			dp[i] = 1+min(dp[j] for j in range(1, i) if dp2[j][i])
	return dp[-1]
```

时间复杂度 O(N^2)，84 ms
