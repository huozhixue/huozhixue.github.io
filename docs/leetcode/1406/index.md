# 1406：石子游戏 III（★★★）


> <u>**[力扣第 183 场周赛第 4 题](https://leetcode.cn/problems/stone-game-iii/)**</u>

## 题目

<p>Alice 和 Bob 用几堆石子在做游戏。几堆石子排成一行，每堆石子都对应一个得分，由数组 <code>stoneValue</code> 给出。</p>

<p>Alice 和 Bob 轮流取石子，<strong>Alice</strong> 总是先开始。在每个玩家的回合中，该玩家可以拿走剩下石子中的的前 <strong>1、2 或 3 堆石子</strong> 。比赛一直持续到所有石头都被拿走。</p>

<p>每个玩家的最终得分为他所拿到的每堆石子的对应得分之和。每个玩家的初始分数都是 <strong>0</strong> 。比赛的目标是决出最高分，得分最高的选手将会赢得比赛，比赛也可能会出现平局。</p>

<p>假设 Alice 和 Bob 都采取 <strong>最优策略</strong> 。如果 Alice 赢了就返回 <em>&quot;Alice&quot;</em> <em>，</em>Bob 赢了就返回<em> &quot;Bob&quot;，</em>平局（分数相同）返回 <em>&quot;Tie&quot;</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>values = [1,2,3,7]
<strong>输出：</strong>&quot;Bob&quot;
<strong>解释：</strong>Alice 总是会输，她的最佳选择是拿走前三堆，得分变成 6 。但是 Bob 的得分为 7，Bob 获胜。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>values = [1,2,3,-9]
<strong>输出：</strong>&quot;Alice&quot;
<strong>解释：</strong>Alice 要想获胜就必须在第一个回合拿走前三堆石子，给 Bob 留下负分。
如果 Alice 只拿走第一堆，那么她的得分为 1，接下来 Bob 拿走第二、三堆，得分为 5 。之后 Alice 只能拿到分数 -9 的石子堆，输掉比赛。
如果 Alice 拿走前两堆，那么她的得分为 3，接下来 Bob 拿走第三堆，得分为 3 。之后 Alice 只能拿到分数 -9 的石子堆，同样会输掉比赛。
注意，他们都应该采取 <strong>最优策略 </strong>，所以在这里 Alice 将选择能够使她获胜的方案。</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>values = [1,2,3,6]
<strong>输出：</strong>&quot;Tie&quot;
<strong>解释：</strong>Alice 无法赢得比赛。如果她决定选择前三堆，她可以以平局结束比赛，否则她就会输。
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>values = [1,2,3,-1,-2,-3,7]
<strong>输出：</strong>&quot;Alice&quot;
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>values = [-1,-2,-3]
<strong>输出：</strong>&quot;Tie&quot;
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= values.length &lt;= 50000</code></li>
<li><code>-1000 &lt;= values[i] &lt;= 1000</code></li>
</ul>


## 分析

### #1

类似 1140 ，考虑递归。用辅助函数表示 help(i) 表示用 stoneValue[i:] 玩游戏 Alice 最多能拿到的分数。

	亚历克斯先拿 X 堆石子，转为求递归子问题 help(i+X)。
	
	help(i+X) 等价于剩下的石子中 bob 最多能拿到的分数。
	
	两个人一共拿的分数是固定的 sum(stoneValue[i:])，因此遍历 X 找到最小的 help(i+X) 即可。
	
再注意边界条件即可写出递归解法。

```python
def stoneGameIII(self, stoneValue: List[int]) -> str:
	@lru_cache(None)
	def help(i):
		if i>=len(stoneValue):
			return 0
		return sum(stoneValue[i:]) - min(help(i+X) for X in range(1,4))

	a = help(0)
	b = sum(stoneValue)-a
	return 'Alice' if a > b else ('Bob' if a < b else 'Tie')
```

超时了

### #2

改写成动态规划。令 dp[i] 代表用 stoneValue[i:] 玩游戏 Alice 最多能拿到的分数。状态转移方程为：

	if i >= len(stoneValue):		dp[i] = 0
	else:							dp[i] = sum(stoneValue[i:]) - min(dp[i+1:i+4])
	
后缀和可以递推得到

```python
def stoneGameIII(self, stoneValue: List[int]) -> str:
	n = len(stoneValue)
	dp, suf = [0] * (n+1), 0
	for i in range(n-1, -1, -1):
		suf += stoneValue[i]
		dp[i] = suf - min(dp[i+1:i+4])
	a, b = dp[0], suf - dp[0]
	return 'Alice' if a > b else ('Bob' if a < b else 'Tie')
```

588 ms

### #3

因为递推式只和前三个状态有关，可以只用三个参数保存状态。

## 解答

```python
def stoneGameIII(self, stoneValue: List[int]) -> str:
	n = len(stoneValue)
	x = y = z = suf = 0
	for i in range(n-1, -1, -1):
		suf += stoneValue[i]
		x, y, z = suf-min(x,y,z), x, y
	a, b = x, suf - x
	return 'Alice' if a > b else ('Bob' if a < b else 'Tie')
```

368 ms


