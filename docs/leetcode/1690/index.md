# 1690：石子游戏 VII（★）


> <u>**[力扣第 219 场周赛第 3 题](https://leetcode.cn/problems/stone-game-vii/)**</u>

## 题目

<p>石子游戏中，爱丽丝和鲍勃轮流进行自己的回合，<strong>爱丽丝先开始</strong> 。</p>

<p>有 <code>n</code> 块石子排成一排。每个玩家的回合中，可以从行中 <strong>移除</strong> 最左边的石头或最右边的石头，并获得与该行中剩余石头值之 <strong>和</strong> 相等的得分。当没有石头可移除时，得分较高者获胜。</p>

<p>鲍勃发现他总是输掉游戏（可怜的鲍勃，他总是输），所以他决定尽力 <strong>减小得分的差值</strong> 。爱丽丝的目标是最大限度地 <strong>扩大得分的差值</strong> 。</p>

<p>给你一个整数数组 <code>stones</code> ，其中 <code>stones[i]</code> 表示 <strong>从左边开始</strong> 的第 <code>i</code> 个石头的值，如果爱丽丝和鲍勃都 <strong>发挥出最佳水平</strong> ，请返回他们 <strong>得分的差值</strong> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>stones = [5,3,1,4,2]
<strong>输出：</strong>6
<strong>解释：</strong>
- 爱丽丝移除 2 ，得分 5 + 3 + 1 + 4 = 13 。游戏情况：爱丽丝 = 13 ，鲍勃 = 0 ，石子 = [5,3,1,4] 。
- 鲍勃移除 5 ，得分 3 + 1 + 4 = 8 。游戏情况：爱丽丝 = 13 ，鲍勃 = 8 ，石子 = [3,1,4] 。
- 爱丽丝移除 3 ，得分 1 + 4 = 5 。游戏情况：爱丽丝 = 18 ，鲍勃 = 8 ，石子 = [1,4] 。
- 鲍勃移除 1 ，得分 4 。游戏情况：爱丽丝 = 18 ，鲍勃 = 12 ，石子 = [4] 。
- 爱丽丝移除 4 ，得分 0 。游戏情况：爱丽丝 = 18 ，鲍勃 = 12 ，石子 = [] 。
得分的差值 18 - 12 = 6 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>stones = [7,90,5,1,100,10,10,2]
<strong>输出：</strong>122</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == stones.length</code></li>
<li><code>2 <= n <= 1000</code></li>
<li><code>1 <= stones[i] <= 1000</code></li>
</ul>


## 分析

### #1

先考虑递归。用辅助函数 help(i, j) 直接表示用 stones[i:j] 玩游戏爱丽丝和鲍勃能拿到的最大分数差。

	爱丽丝先拿 i 位，最大分数差是 sum(stones[i+1:j])-help(i+1, j)（注意这里是减）
	爱丽丝先拿 j-1 位，最大分数差是 sum(stones[i:j-1])-help(i,j-1)（注意这里是减）
	比较两种情况即可

```python
def stoneGameVII(self, stones: List[int]) -> int:
	@lru_cache(None)
	def help(i, j):
		if j-i == 1:
			return 0
		return max(sum(stones[i+1:j])-help(i+1, j), sum(stones[i:j-1])-help(i,j-1))
	return help(0, len(stones))
```

超时了

### #2

改写为动态规划试试。令 dp[i][j] 表示用 stones[i:j] 玩游戏爱丽丝和鲍勃能拿到的最大分数差。状态转移方程为：

	if j<=i+1:		dp[i][j] = 0
	else:			dp[i][j] = max(sum(stones[i+1:j])-help(i+1, j), sum(stones[i:j-1])-help(i,j-1))
	
可以先计算保存所有前缀和，以减少计算。

```python
def stoneGameVII(self, stones: List[int]) -> int:
	pre = [0]
	for stone in stones:
		pre.append(pre[-1]+stone)
	n = len(stones)
	dp = [[0]*(n+1) for _ in range(n+1)]
	for i in range(n-1, -1, -1):
		for j in range(i+1, n+1):
			dp[i][j] = max(pre[j]-pre[i+1]-dp[i+1][j], pre[j-1]-pre[i]-dp[i][j-1])
	return dp[0][-1]
```

时间复杂度 $O(N^2)$，3376 ms

### #3

直觉来说应该有更简单的规律。观察发现，如果把爱丽丝先选、鲍勃后选合起来看成一轮，那么这一轮的得分之差其实就是鲍勃选的数字。
不管数组长度是奇数或偶数，最终的得分之差就是鲍勃选的数字之和。

所以爱丽丝和鲍勃的目标等价于使选的数字之和最小化，问题等价于求最终鲍勃选的数字之和。这非常类似 0486 了，只是最大化变成了最小化。

可以直接调用 0486 的代码。注意这里求出的是爱丽丝和鲍勃选的数字之和的差，需要结合 sum(stones) 求出鲍勃选出的数字之和。

## 解答

```python
def stoneGameVII(self, stones: List[int]) -> int:
	n = len(stones)
	dp = [0]*(n+1)
	for i in range(n-1, -1, -1):
		for j in range(i+1, n+1):
			dp[j] = min(stones[i]-dp[j], stones[j-1]-dp[j-1])
	return (sum(stones)-dp[-1]) // 2
```

2256 ms


