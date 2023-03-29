# 0309：最佳买卖股票时机含冷冻期（★）


> <u>**[力扣第 309 题](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/)**</u>

## 题目

<p>给定一个整数数组<meta charset="UTF-8" /><code>prices</code>，其中第 <em> </em><code>prices[i]</code> 表示第 <code><em>i</em></code> 天的股票价格 。​</p>

<p>设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:</p>

<ul>
<li>卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。</li>
</ul>

<p><strong>注意：</strong>你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> prices = [1,2,3,0,2]
<strong>输出: </strong>3
<strong>解释:</strong> 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> prices = [1]
<strong>输出:</strong> 0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= prices.length &lt;= 5000</code></li>
<li><code>0 &lt;= prices[i] &lt;= 1000</code></li>
</ul>


## 分析

{{< lc "0122" >}} 升级版，dp[i][0] 的递推式有变化：

$$dp[i][0] = max(dp[i-1][0], dp[i-2][1]-prices[i-1])$$


## 解答

```python
def maxProfit(self, prices: List[int]) -> int:
    a, b, c = float('-inf'), 0, 0
    for price in prices:
        a, b, c = max(a, b-price), c, max(c, a+price)
    return c
```
32 ms

