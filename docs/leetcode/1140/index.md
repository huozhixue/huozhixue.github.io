# 1140：石子游戏 II（★★）


> <u>**[力扣第 147 场周赛第 4 题](https://leetcode.cn/problems/stone-game-ii/)**</u>

## 题目

<p>爱丽丝和鲍勃继续他们的石子游戏。许多堆石子 <strong>排成一行</strong>，每堆都有正整数颗石子 <code>piles[i]</code>。游戏以谁手中的石子最多来决出胜负。</p>

<p>爱丽丝和鲍勃轮流进行，爱丽丝先开始。最初，<code>M = 1</code>。</p>

<p>在每个玩家的回合中，该玩家可以拿走剩下的 <strong>前</strong> <code>X</code> 堆的所有石子，其中 <code>1 &lt;= X &lt;= 2M</code>。然后，令 <code>M = max(M, X)</code>。</p>

<p>游戏一直持续到所有石子都被拿走。</p>

<p>假设爱丽丝和鲍勃都发挥出最佳水平，返回爱丽丝可以得到的最大数量的石头。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>piles = [2,7,9,4,4]
<strong>输出：</strong>10
<strong>解释：</strong>如果一开始Alice取了一堆，Bob取了两堆，然后Alice再取两堆。爱丽丝可以得到2 + 4 + 4 = 10堆。如果Alice一开始拿走了两堆，那么Bob可以拿走剩下的三堆。在这种情况下，Alice得到2 + 7 = 9堆。返回10，因为它更大。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入：</strong>piles = [1,2,3,4,5,100]
<strong>输出：</strong>104
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= piles.length &lt;= 100</code></li>
<li><meta charset="UTF-8" /><code>1 &lt;= piles[i] &lt;= 10<sup>4</sup></code></li>
</ul>


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

