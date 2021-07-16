# 0064：最小路径和（★）


## 题目

给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg)

	输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
	输出：7
	解释：因为路径 1→3→1→1→1 的总和最小。
	
示例 2：

	输入：grid = [[1,2,3],[4,5,6]]
	输出：12


## 分析

### #1

和 0063 类似，显然还是可以递归。

```python
def minPathSum(self, grid: List[List[int]]) -> int:
	@lru_cache(None)
	def dfs(i, j):
		if i < 0 or j < 0:
			return float('inf')
		if i==j==0:
			return grid[i][j]
		return min(dfs(i-1, j), dfs(i, j-1)) + grid[i][j]
	return dfs(len(grid)-1, len(grid[0])-1)
```

72 ms，空间占得较多

### #2

改写成动态规划。用 dp[i][j] 表示机器人到位置 (i-1, j-1) 的最小路径和，则状态转移方程为：

	if i==0 or j==0: 		dp[i][j] = float('inf')
	elif i==j==1: 			dp[i][j] = grid[i-1][j-1]
	else: 					dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i-1][j-1]

类似 0063 ，可以简化为一维数组。

## 解答

```python
def minPathSum(self, grid: List[List[int]]) -> int:
	m, n = len(grid), len(grid[0])
	dp = [float('inf')]*(n+1)
	for i in range(1, m+1):
		for j in range(1, n+1):
			dp[j] = grid[i-1][j-1] + (0 if i==j==1 else min(dp[j], dp[j-1]))
	return dp[-1]
```

48 ms
