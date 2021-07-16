# 1140：石子游戏 II（★★）




## 题目

亚历克斯和李继续他们的石子游戏。许多堆石子 排成一行，每堆都有正整数颗石子 piles[i]。游戏以谁手中的石子最多来决出胜负。

亚历克斯和李轮流进行，亚历克斯先开始。最初，M = 1。

在每个玩家的回合中，该玩家可以拿走剩下的 前 X 堆的所有石子，其中 1 <= X <= 2M。然后，令 M = max(M, X)。

游戏一直持续到所有石子都被拿走。

假设亚历克斯和李都发挥出最佳水平，返回亚历克斯可以得到的最大数量的石头。

 <!--more--> 
 
示例：

	输入：piles = [2,7,9,4,4]
	输出：10
	解释：
	如果亚历克斯在开始时拿走一堆石子，李拿走两堆，接着亚历克斯也拿走两堆。在这种情况下，亚历克斯可以拿到 2 + 4 + 4 = 10 颗石子。 
	如果亚历克斯在开始时拿走两堆石子，那么李就可以拿走剩下全部三堆石子。在这种情况下，亚历克斯可以拿到 2 + 7 = 9 颗石子。
	所以我们返回更大的 10。 


## 分析

这类问题先考虑能否递归。类似 0486 ，但发现 M 会影响过程。

所以用辅助函数 help(i, m) 表示初始 M=m，用 piles[i:] 玩游戏亚历克斯最多能拿到石头的数量。
	
	亚历克斯先拿 X 堆石子，M 变为 max(m,X)，转为求递归子问题 help(i+X, max(m, X))。
	
	help(i+X, max(m, X)) 等价于剩下的石子中李最多拿到的石头个数。
	
	两个人一共拿的石子是固定的 sum(piles[i:])，因此遍历 X 找到最小的 help(i+X, max(m, X)) 即可。
	
再考虑下边界条件，剩下的堆数 <= 2*m 时，全部拿走即可。便可以写出递归解法。

## 解答

```python
def stoneGameII(self, piles: List[int]) -> int:
	@lru_cache(None)
	def help(i, m):
		res = sum(piles[i:])
		if len(piles)-i > 2*m:
			res -= min(help(i+X,max(X,m)) for X in range(1, 2*m+1))
		return res
	return help(0, 1)
```

196 ms

## *附加

可以改写成动态规划。令 dp[i][j] 代表初始 M=j，用 piles[i:] 玩游戏亚历克斯最多能拿到石头的数量。
状态转移方程为：
	
	if len(piles)-i <= 2*j:		dp[i][j] = sum(piles[i:])
	else:						dp[i][j] = sum(piles[i:]) - min(dp[i+X][max(X,j)] for X in range(1, 2*j+1))

显然遍历时 i 应该倒序。

```python
def stoneGameII(self, piles: List[int]) -> int:
	n = len(piles)
	dp, total = [[0]*(n+1) for _ in range(n)], 0
	for i in range(n-1, -1, -1):
		total += piles[i]
		for j in range(1, n+1):
			dp[i][j] = total
			if n-i > 2*j:
				dp[i][j] -= min(dp[i+X][max(X,j)] for X in range(1, 2*j+1))
	return dp[0][1]
```

340 ms

