# 0072：编辑距离（★★）


## 题目

给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。

你可以对一个单词进行如下三种操作：

- 插入一个字符
- 删除一个字符
- 替换一个字符

word1 和 word2 由小写英文字母组成

<!--more--> 

示例 1：

	输入：word1 = "horse", word2 = "ros"
	输出：3
	解释：
	horse -> rorse (将 'h' 替换为 'r')
	rorse -> rose (删除 'r')
	rose -> ros (删除 'e')
	
示例 2：

	输入：word1 = "intention", word2 = "execution"
	输出：5
	解释：
	intention -> inention (删除 't')
	inention -> enention (将 'i' 替换为 'e')
	enention -> exention (将 'n' 替换为 'x')
	exention -> exection (将 'n' 替换为 'c')
	exection -> execution (插入 'u')



## 分析

### #1

先考虑能否递归。如果 word1[0]==word2[0]，那么等价于子问题 minDistance(word1[1:], word2[1:])。
否则，那么要将 word1 转换成 word2 有三种操作方法：

	先将 word1[0] 替换为 word2[0]		转为子问题 1+minDistance(word1[1:], word2[1:])
	先将 word1[0] 删除					转为子问题 1+minDistance(word1[1:], word2])
	先在 word1 前插入 word2[0]			转为子问题 1+minDistance(word1, word2[1:])

特别的，如果 word1 或 word2 为空，编辑距离即为 len(word1)+len(word2)

```python
@lru_cache(None)
def minDistance(self, word1: str, word2: str) -> int:
	if not word1 or not word2:
		return len(word1)+len(word2)
	if word1[0] == word2[0]:
		return self.minDistance(word1[1:], word2[1:])
	d1 = 1+self.minDistance(word1[1:], word2[1:])
	d2 = 1+self.minDistance(word1[1:], word2)
	d3 = 1+self.minDistance(word1, word2[1:])
	return min(d1, d2, d3)
```

168 ms，空间占得较多

### #2

可以改写为动态规划。设 dp[i][j] 表示 word1[:i] 和 word2[:j] 的编辑距离，状态转移方程为：

	if i==0 or j==0:				dp[i][j] = i+j
	elif word1[i-1]==word2[j-1]:	dp[i][j] = dp[i-1][j-1]
	else:							dp[i][j] = 1+min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1])

## 解答

```python
def minDistance(self, word1: str, word2: str) -> int:
	n, m = len(word1), len(word2)
	dp = [[0]*(m+1) for _ in range(n+1)]
	for i in range(n+1):
		for j in range(m+1):
			if not i or not j:
				dp[i][j] = i+j
			elif word1[i-1]==word2[j-1]:
				dp[i][j] = dp[i-1][j-1]
			else:
				dp[i][j] = 1+min(dp[i-1][j-1],dp[i-1][j],dp[i][j-1])
	return dp[-1][-1]
```

时间复杂度 O(N*M)， 160 ms
