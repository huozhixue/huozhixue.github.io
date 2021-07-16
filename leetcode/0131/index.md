# 0131：分割回文串（★★）


## 题目

给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

返回 s 所有可能的分割方案。


<!--more--> 

示例:

	输入: "aab"
	输出:
	[
	  ["aa","b"],
	  ["a","a","b"]
	]


## 分析

### #1

可以遍历前缀回文子串，剩下部分显然是递归子问题。

```python
@lru_cache(None)
def partition(self, s: str) -> List[List[str]]:
	if not s:
		return [[]]
	res = []
	for i in range(len(s)):
		l, r = s[:i+1], s[i+1:]
		if l == l[::-1]:
			res.extend([l]+p for p in self.partition(r))
	return res
```

132 ms，空间占得较多

### #2

可以改写为动态规划。用 dp[i] 表示 s[:i] 的所有可能分割方案，状态转移方程为：
	
	if i==0:	dp[i] = [[]] 
	else:		dp[i] = [p+[s[j:i]] for j in range(i) for p in dp[j] if s[j:i]==s[j:i][::-1]]


```python
def partition(self, s: str) -> List[List[str]]:
	n = len(s)
	dp = [[] for _ in range(n+1)]
	dp[0] = [[]]
	for i in range(1, n+1):
		for j in range(i):
			tmp = s[j:i]
			if tmp==tmp[::-1]:
				dp[i].extend(p+[tmp] for p in dp[j])
	return dp[-1]
```

时间复杂度 O(N^3)，80 ms

### #3

显然还可以优化判断回文的时间，类似 0005 ，可以用动态规划、中心扩展法等。
为了方便，就全用动态规划了。

## 解答

```python
def partition(self, s: str) -> List[List[str]]:
	n = len(s)
	dp = [[] for _ in range(n+1)]
	dp[0] = [[]]
	dp2 = [[True]*(n+1) for _ in range(n+1)]
	for i in range(1, n+1):
		for j in range(i-1, -1, -1):
			dp2[j][i] = s[i-1] == s[j] and dp2[j+1][i-1]
			if dp2[j][i]:
				dp[i].extend(p+[s[j:i]] for p in dp[j])
	return dp[-1]
```

时间复杂度 O(N^2)，88 ms



