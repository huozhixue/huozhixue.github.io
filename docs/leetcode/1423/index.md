# 1423：可获得的最大点数（1573 分）


> <u>**[力扣第 186 场周赛第 2 题](https://leetcode.cn/problems/maximum-points-you-can-obtain-from-cards/)**</u>

## 题目

<p>几张卡牌<strong> 排成一行</strong>，每张卡牌都有一个对应的点数。点数由整数数组 <code>cardPoints</code> 给出。</p>

<p>每次行动，你可以从行的开头或者末尾拿一张卡牌，最终你必须正好拿 <code>k</code> 张卡牌。</p>

<p>你的点数就是你拿到手中的所有卡牌的点数之和。</p>

<p>给你一个整数数组 <code>cardPoints</code> 和整数 <code>k</code>，请你返回可以获得的最大点数。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>cardPoints = [1,2,3,4,5,6,1], k = 3
<strong>输出：</strong>12
<strong>解释：</strong>第一次行动，不管拿哪张牌，你的点数总是 1 。但是，先拿最右边的卡牌将会最大化你的可获得点数。最优策略是拿右边的三张牌，最终点数为 1 + 6 + 5 = 12 。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>cardPoints = [2,2,2], k = 2
<strong>输出：</strong>4
<strong>解释：</strong>无论你拿起哪两张卡牌，可获得的点数总是 4 。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>cardPoints = [9,7,7,9,7,7,9], k = 7
<strong>输出：</strong>55
<strong>解释：</strong>你必须拿起所有卡牌，可以获得的点数为所有卡牌的点数之和。
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>cardPoints = [1,1000,1], k = 1
<strong>输出：</strong>1
<strong>解释：</strong>你无法拿到中间那张卡牌，所以可以获得的最大点数为 1 。
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>cardPoints = [1,79,80,1,1,1,200,1], k = 3
<strong>输出：</strong>202
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= cardPoints.length &lt;= 10^5</code></li>
<li><code>1 &lt;= cardPoints[i] &lt;= 10^4</code></li>
<li><code>1 &lt;= k &lt;= cardPoints.length</code></li>
</ul>


**相似问题：**
- [1770：执行乘法运算的最大分数（2068 分）](/leetcode/1770)
- [2091：从数组中移除最大值和最小值（1384 分）](/leetcode/2091)
- [2379：得到 K 个黑块的最少涂色次数（1360 分）](/leetcode/2379)
- [2931：购买物品的最大开销（1822 分）](/leetcode/2931)


## 分析

- 显然最终只能拿头部的连续一段加上尾部的连续一段
- 设尾部拿了 i 个，头部就拿了 k-i 个，用前缀和即可快速求出两段的区间和
- 因此遍历  i 从 0 到 k，求最大的区间和即可。

## 解答


```python
def maxScore(self, cardPoints: List[int], k: int) -> int:
	pre = list(accumulate([0]+cardPoints))
	return max(pre[k-i]+pre[-1]-pre[-1-i] for i in range(k+1))
```
72 ms
