# 0122：买卖股票的最佳时机 II（★）


> <u>**[力扣第 122 题](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)**</u>

## 题目

<p>给你一个整数数组 <code>prices</code> ，其中 <code>prices[i]</code> 表示某支股票第 <code>i</code> 天的价格。</p>

<p>在每一天，你可以决定是否购买和/或出售股票。你在任何时候 <strong>最多</strong> 只能持有 <strong>一股</strong> 股票。你也可以先购买，然后在 <strong>同一天</strong> 出售。</p>

<p>返回 <em>你能获得的 <strong>最大</strong> 利润</em> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>prices = [7,1,5,3,6,4]
<strong>输出：</strong>7
<strong>解释：</strong>在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。
总利润为 4 + 3 = 7 。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>prices = [1,2,3,4,5]
<strong>输出：</strong>4
<strong>解释：</strong>在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
总利润为 4 。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>prices = [7,6,4,3,1]
<strong>输出：</strong>0
<strong>解释：</strong>在这种情况下, 交易无法获得正利润，所以不参与交易可以获得最大利润，最大利润为 0 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= prices.length &lt;= 3 * 10<sup>4</sup></code></li>
<li><code>0 &lt;= prices[i] &lt;= 10<sup>4</sup></code></li>
</ul>


## 分析

 {{< lc "0121" >}} 变形，区别在于可以多次买卖，dp[i][0] 可以由dp[i-1][1] 递推。

## 解答

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        a,b = -inf,0
        for x in prices:
            a,b = max(a,b-x),max(b,a+x)
        return b
```
42 ms



