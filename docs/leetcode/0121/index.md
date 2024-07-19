# 0121：买卖股票的最佳时机


> <u>**[力扣第 121 题](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)**</u>

## 题目

<p>给定一个数组 <code>prices</code> ，它的第 <code>i</code> 个元素 <code>prices[i]</code> 表示一支给定股票第 <code>i</code> 天的价格。</p>

<p>你只能选择 <strong>某一天</strong> 买入这只股票，并选择在 <strong>未来的某一个不同的日子</strong> 卖出该股票。设计一个算法来计算你所能获取的最大利润。</p>

<p>返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 <code>0</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>[7,1,5,3,6,4]
<strong>输出：</strong>5
<strong>解释：</strong>在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>prices = [7,6,4,3,1]
<strong>输出：</strong>0
<strong>解释：</strong>在这种情况下, 没有交易完成, 所以最大利润为 0。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= prices.length <= 10<sup>5</sup></code></li>
<li><code>0 <= prices[i] <= 10<sup>4</sup></code></li>
</ul>


**相似问题：**
- [0053：最大子数组和](/leetcode/0053)
- [0122：买卖股票的最佳时机 II](/leetcode/0122)
- [0123：买卖股票的最佳时机 III](/leetcode/0123)
- [0188：买卖股票的最佳时机 IV](/leetcode/0188)
- [0309：买卖股票的最佳时机含冷冻期](/leetcode/0309)
- [2012：数组美丽值求和（1467 分）](/leetcode/2012)
- [2016：增量元素之间的最大差值（1246 分）](/leetcode/2016)
- [2291：最大股票收益](/leetcode/2291)


## 分析

经典 dp 问题：
- 考虑最后一天的交易状态：
	- 如果没有卖出，则转为 prices[:-1] 的递归子问题
	- 如果卖了，则要求 prices[:-1] 有股票状态下的最大值
- 令 dp[i][0]、dp[i][1] 分别代表 prices[:i] 手里有/无股票的最大利润，即可递推：
$$ \begin{cases} 
dp[i][0] = max(dp[i-1][0], -prices[i-1]) \\\ 
dp[i][1] = max(dp[i-1][1], dp[i-1][0]+prices[i-1])
\end{cases} $$
- 还可以优化为两个参数

## 解答

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        a,b = -inf,0
        for x in prices:
            a,b = max(-x,a),max(a+x,b)
        return b
```
198 ms




