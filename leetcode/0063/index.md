# 0063：不同路径 II（★）


## 题目

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

网格中的障碍物和空位置分别用 1 和 0 来表示。

<!--more--> 

示例 1:

![img](https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg)

	输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
	输出：2
	解释：
	3x3 网格的正中间有一个障碍物。
	从左上角到右下角一共有 2 条不同的路径：
	1. 向右 -> 向右 -> 向下 -> 向下
	2. 向下 -> 向下 -> 向右 -> 向右

示例 2：

![img](https://assets.leetcode.com/uploads/2020/11/04/robot2.jpg)

	输入：obstacleGrid = [[0,1],[0,0]]
	输出：1

## 分析

### #1

现在不好用数学解决了，考虑能否递归。用辅助函数 help(i, j) 代表从左上角到位置 (i, j) 的路径条数，那么：

	如果 obstacleGrid[i][j] 是障碍，help(i, j) = 0
	否则，路径的上一步位置必然是 (i-1, j) 或者 (i, j-1)，因此 help(i, j) = help(i-1, j) + help(i, j-1)
	
再考虑边界条件即可。

```python
def uniquePathsWithObstacles(self, obstacleGrid) -> int:
	@lru_cache(None)
	def help(i, j):
		if i < 0 or j < 0 or obstacleGrid[i][j] == 1:
			return 0
		if i == j == 0:
			return 1
		return help(i-1, j) + help(i, j-1)
	return help(len(obstacleGrid)-1, len(obstacleGrid[0])-1)
```

44 ms，空间占得较多

### #2

改写成动态规划。用 dp[i][j] 表示机器人到位置 (i-1, j-1) 的路径条数，则状态转移方程为：

	if i==0 or j==0 or obstacleGrid[i-1][j-1]==1: 	dp[i][j] = 0
	elif i==j==1: 									dp[i][j] = 1
	else: 											dp[i][j] = dp[i-1][j] + dp[i][j-1]
	
```python
def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
	m, n = len(obstacleGrid), len(obstacleGrid[0])
	dp = [[0]*(n+1) for _ in range(m+1)]
	for i in range(1, m+1):
		for j in range(1, n+1):
			if obstacleGrid[i-1][j-1] == 1:
				dp[i][j] = 0
			elif i == j == 1:
				dp[i][j] = 1
			else:
				dp[i][j] = dp[i-1][j] + dp[i][j-1]
	return dp[-1][-1]
```

44 ms

### #3

还可以将 dp 简化为一维数组。

## 解答

```python
def uniquePathsWithObstacles(self, obstacleGrid) -> int:
	m, n = len(obstacleGrid), len(obstacleGrid[0])
	dp = [0]*(n+1)
	for i in range(1, m+1):
		for j in range(1, n+1):
			if obstacleGrid[i-1][j-1] == 1:
				dp[j] = 0
			elif i == j == 1:
				dp[j] = 1
			else:
				dp[j] += dp[j-1]
	return dp[-1]
```

40 ms
