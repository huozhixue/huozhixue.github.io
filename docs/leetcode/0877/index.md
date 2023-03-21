# 0877：石子游戏（★）


> <u>**[力扣第 95 场周赛第 2 题](https://leetcode.cn/problems/stone-game/)**</u>

## 题目

<p>Alice 和 Bob 用几堆石子在做游戏。一共有偶数堆石子，<strong>排成一行</strong>；每堆都有 <strong>正</strong> 整数颗石子，数目为 <code>piles[i]</code> 。</p>

<p>游戏以谁手中的石子最多来决出胜负。石子的 <strong>总数</strong> 是 <strong>奇数</strong> ，所以没有平局。</p>

<p>Alice 和 Bob 轮流进行，<strong>Alice 先开始</strong> 。 每回合，玩家从行的 <strong>开始</strong> 或 <strong>结束</strong> 处取走整堆石头。 这种情况一直持续到没有更多的石子堆为止，此时手中 <strong>石子最多</strong> 的玩家 <strong>获胜</strong> 。</p>

<p>假设 Alice 和 Bob 都发挥出最佳水平，当 Alice 赢得比赛时返回 <code>true</code> ，当 Bob 赢得比赛时返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>piles = [5,3,4,5]
<strong>输出：</strong>true
<strong>解释：</strong>
Alice 先开始，只能拿前 5 颗或后 5 颗石子 。
假设他取了前 5 颗，这一行就变成了 [3,4,5] 。
如果 Bob 拿走前 3 颗，那么剩下的是 [4,5]，Alice 拿走后 5 颗赢得 10 分。
如果 Bob 拿走后 5 颗，那么剩下的是 [3,4]，Alice 拿走后 4 颗赢得 9 分。
这表明，取前 5 颗石子对 Alice 来说是一个胜利的举动，所以返回 true 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>piles = [3,7,2,3]
<strong>输出：</strong>true
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= piles.length &lt;= 500</code></li>
<li><code>piles.length</code> 是 <strong>偶数</strong></li>
<li><code>1 &lt;= piles[i] &lt;= 500</code></li>
<li><code>sum(piles[i])</code> 是 <strong>奇数</strong></li>
</ul>


## 分析

### #1

本题是 0486 的子问题，可以直接套用代码：
	
```python
def stoneGame(self, piles: List[int]) -> bool:
	n = len(piles)
	dp = [0]*(n+1)
	for i in range(n-1, -1, -1):
		for j in range(i+1, n+1):
			dp[j] = max(piles[i]-dp[j], piles[j-1]-dp[j-1])
	return dp[-1] >= 0
```

236 ms

### #2

还有个巧妙的想法，将数组中位置为偶数的标记为白色，位置为奇数的标记为黑色，那么先手能保证拿到所有白色或所有黑色。
因此先手必胜，拿和较大的颜色即可。

## 解答

```python
def stoneGame(self, piles: List[int]) -> bool:
	return True
```

36 ms

