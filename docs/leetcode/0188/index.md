# 0188：买卖股票的最佳时机 IV（★★）


> <u>**[力扣第 188 题](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/)**</u>

## 题目

<p>给定一个整数数组 <code>prices</code> ，它的第<em> </em><code>i</code> 个元素 <code>prices[i]</code> 是一支给定的股票在第 <code>i</code><em> </em>天的价格。</p>

<p>设计一个算法来计算你所能获取的最大利润。你最多可以完成 <strong>k</strong> 笔交易。</p>

<p><strong>注意：</strong>你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>k = 2, prices = [2,4,1]
<strong>输出：</strong>2
<strong>解释：</strong>在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>k = 2, prices = [3,2,6,5,0,3]
<strong>输出：</strong>7
<strong>解释：</strong>在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 <= k <= 100</code></li>
<li><code>0 <= prices.length <= 1000</code></li>
<li><code>0 <= prices[i] <= 1000</code></li>
</ul>


## 分析

类似 {{< lc "0121" >}}，只是从 2 次变成了 k 次。
			
## 解答

```python
def maxProfit(self, k: int, prices: List[int]) -> int:
    n = len(prices)
    dp = [[float('-inf'), 0] for _ in range(k+1)] 
    for x in prices:
        prev = dp[:]
        for j in range(1, k+1):
            dp[j][0] = max(prev[j][0], prev[j-1][1]-x)
            dp[j][1] = max(prev[j][1], prev[j][0]+x)
    return dp[-1][-1]
```
84 ms
