# 0174：地下城游戏（★★★）


## 题目

一些恶魔抓住了公主（P）并将她关在了地下城的右下角。地下城是由 M x N 个房间组成的二维网格。我们英勇的骑士（K）最初被安置在左上角的房间里，他必须穿过地下城并通过对抗恶魔来拯救公主。

骑士的初始健康点数为一个正整数。如果他的健康点数在某一时刻降至 0 或以下，他会立即死亡。

有些房间由恶魔守卫，因此骑士在进入这些房间时会失去健康点数（若房间里的值为负整数，则表示骑士将损失健康点数）；其他房间要么是空的（房间里的值为 0），要么包含增加骑士健康点数的魔法球（若房间里的值为正整数，则表示骑士将增加健康点数）。

为了尽快到达公主，骑士决定每次只向右或向下移动一步。

编写一个函数来计算确保骑士能够拯救到公主所需的最低初始健康点数。

 <!--more--> 

例如，考虑到如下布局的地下城，如果骑士遵循最佳路径 右 -> 右 -> 下 -> 下，则骑士的初始健康点数至少为 7。

	-2(K)	-3		3
	-5		-10		1
	10		30		-5(P)


## 分析

### #1

先考虑能否递归。设辅助函数 help(i, j) 代表从 (i,j) 处出发救公主所需的最低点数。那么：

	第一步向右移动，则所需的最低点数为 max(1, help(i,j+1)-dungeon[i][j])
	
	第一步向下移动，则所需的最低点数为 max(1, help(i+1,j)-dungeon[i][j])
	
再考虑下边界条件即可。

```python
def calculateMinimumHP(self, dungeon: List[List[int]]) -> int:
	@lru_cache(None)
	def help(i, j):
		if i>=m or j>=n:
			return float('inf')
		if i==m-1 and j==n-1:
			return max(1, 1-dungeon[i][j])
		return max(1, min(help(i+1,j), help(i,j+1))-dungeon[i][j])

	m, n = len(dungeon), len(dungeon[0])
	return help(0, 0)
```

60 ms

### #2

可以改写为动态规划。令 dp[i][j] 代表从 (i,j) 处出发救公主所需的最低点数。状态转移方程为：

	if i==m or j==n:			dp[i][j] = float('inf')
	elif i==m-1 and j==n-1:		dp[i][j] = max(1, 1-dungeon[i][j])
	else:						dp[i][j] = max(1, min(dp[i+1][j], dp[i][j+1])-dungeon[i][j])
	
注意到还是只能从右下往左上递推，不能反过来递推。因为 dp[i][j] 只代表了最佳路径起点的点数，推不出终点的点数。

```python
def calculateMinimumHP(self, dungeon: List[List[int]]) -> int:
	m, n = len(dungeon), len(dungeon[0])
	dp = [[float('inf')]*(n+1) for _ in range(m+1)]
	for i in range(m-1,-1,-1):
		for j in range(n-1,-1,-1):
			nxt = 1 if i==m-1 and j==n-1 else min(dp[i+1][j], dp[i][j+1])
			dp[i][j] = max(1, nxt-dungeon[i][j])
	return dp[0][0]
```

56 ms

### #3

可以将 dp 优化为一维数组。
 
## 解答

```python
def calculateMinimumHP(self, dungeon: List[List[int]]) -> int:
	m, n = len(dungeon), len(dungeon[0])
	dp = [float('inf')]*(n+1)
	for i in range(m-1,-1,-1):
		for j in range(n-1,-1,-1):
			nxt = 1 if i==m-1 and j==n-1 else min(dp[j], dp[j+1])
			dp[j] = max(1, nxt-dungeon[i][j])
	return dp[0]
```

36 ms



