# 0188：买卖股票的最佳时机 IV（★★）


> <u>**[力扣第 188 题](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/)**</u>

## 题目

<p>给你一个整数数组 <code>prices</code> 和一个整数 <code>k</code> ，其中 <code>prices[i]</code> 是某支给定的股票在第 <code>i</code><em> </em>天的价格。</p>

<p>设计一个算法来计算你所能获取的最大利润。你最多可以完成 <code>k</code> 笔交易。也就是说，你最多可以买 <code>k</code> 次，卖 <code>k</code> 次。</p>

<p><strong>注意：</strong>你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>k = 2, prices = [2,4,1]
<strong>输出：</strong>2
<strong>解释：</strong>在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>k = 2, prices = [3,2,6,5,0,3]
<strong>输出：</strong>7
<strong>解释：</strong>在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= k &lt;= 100</code></li>
<li><code>1 &lt;= prices.length &lt;= 1000</code></li>
<li><code>0 &lt;= prices[i] &lt;= 1000</code></li>
</ul>


**相似问题：**
- [0121：买卖股票的最佳时机](/leetcode/0121)
- [0122：买卖股票的最佳时机 II](/leetcode/0122)
- [0123：买卖股票的最佳时机 III](/leetcode/0123)
- [2291：最大股票收益](/leetcode/2291)


## 分析

 {{< lc "0123" >}} 升级版，从 2 次变成了 k 次，最后可以优化为 2*k 个参数。
			
## 解答

```python
class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        dp = [0 if i%2 else -inf for i in range(2*k)]
        for x in prices:
            dp = [max(dp[i],(dp[i-1] if i else 0)+(x if i%2 else -x)) for i in range(2*k)]
        return dp[-1]
```
110 ms


## *附加

还可以采用 [wqs二分](https://leetcode.cn/problems/minimum-white-tiles-after-covering-with-carpets/solutions/1351896/wqs-er-fen-on-log-n-by-zerotrac2-cp7j/)。

