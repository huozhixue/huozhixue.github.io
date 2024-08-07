# 2398：预算内的最多机器人数目（1917 分）


> <u>**[力扣第 86 场双周赛第 4 题](https://leetcode.cn/problems/maximum-number-of-robots-within-budget/)**</u>

## 题目

<p>你有 <code>n</code> 个机器人，给你两个下标从 <strong>0</strong> 开始的整数数组 <code>chargeTimes</code> 和 <code>runningCosts</code> ，两者长度都为 <code>n</code> 。第 <code>i</code> 个机器人充电时间为 <code>chargeTimes[i]</code> 单位时间，花费 <code>runningCosts[i]</code> 单位时间运行。再给你一个整数 <code>budget</code> 。</p>

<p>运行 <code>k</code> 个机器人 <strong>总开销</strong> 是 <code>max(chargeTimes) + k * sum(runningCosts)</code> ，其中 <code>max(chargeTimes)</code> 是这 <code>k</code> 个机器人中最大充电时间，<code>sum(runningCosts)</code> 是这 <code>k</code> 个机器人的运行时间之和。</p>

<p>请你返回在 <strong>不超过</strong> <code>budget</code> 的前提下，你 <strong>最多</strong> 可以 <strong>连续</strong> 运行的机器人数目为多少。</p>



<p><strong>示例 1：</strong></p>

<pre>
<b>输入：</b>chargeTimes = [3,6,1,3,4], runningCosts = [2,1,3,4,5], budget = 25
<b>输出：</b>3
<b>解释：</b>
可以在 budget 以内运行所有单个机器人或者连续运行 2 个机器人。
选择前 3 个机器人，可以得到答案最大值 3 。总开销是 max(3,6,1) + 3 * sum(2,1,3) = 6 + 3 * 6 = 24 ，小于 25 。
可以看出无法在 budget 以内连续运行超过 3 个机器人，所以我们返回 3 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<b>输入：</b>chargeTimes = [11,12,19], runningCosts = [10,8,7], budget = 19
<b>输出：</b>0
<b>解释：</b>即使运行任何一个单个机器人，还是会超出 budget，所以我们返回 0 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>chargeTimes.length == runningCosts.length == n</code></li>
<li><code>1 &lt;= n &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= chargeTimes[i], runningCosts[i] &lt;= 10<sup>5</sup></code></li>
<li><code>1 &lt;= budget &lt;= 10<sup>15</sup></code></li>
</ul>


**相似问题：**
- [0239：滑动窗口最大值](/leetcode/0239)
- [2040：两个有序数组的第 K 小乘积（2517 分）](/leetcode/2040)
- [2071：你可以安排的最多任务数目（2648 分）](/leetcode/2071)
- [2064：分配给商店的最多商品的最小值（1885 分）](/leetcode/2064)
- [2187：完成旅途的最少时间（1640 分）](/leetcode/2187)


## 分析

典型的滑动窗口，维护窗口不超过 budget 即可。

其中，维护 chargeTimes  的窗口最大值即是问题 {{< lc "0239" >}}

## 解答


```python
def maximumRobots(self, chargeTimes: List[int], runningCosts: List[int], budget: int) -> int:
	Q, s = deque(), 0
	res, i = 0, 0
	for j,(t,c) in enumerate(zip(chargeTimes, runningCosts)):
		while Q and Q[-1][-1]<=t:
			Q.pop()
		Q.append((j, t))
		s += runningCosts[j]
		while Q and Q[0][-1]+(j-i+1)*s>budget:
			if Q[0][0]==i:
				Q.popleft()
			s -= runningCosts[i]
			i += 1
		res = max(res, j-i+1)
	return res
```
360 ms
