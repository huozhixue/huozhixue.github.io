# 0714：买卖股票的最佳时机含手续费（★）


> <u>**[力扣第 714 题](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)**</u>

## 题目

<p>给定一个整数数组 <code>prices</code>，其中 <code>prices[i]</code>表示第 <code>i</code> 天的股票价格 ；整数 <code>fee</code> 代表了交易股票的手续费用。</p>

<p>你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。</p>

<p>返回获得利润的最大值。</p>

<p><strong>注意：</strong>这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>prices = [1, 3, 2, 8, 4, 9], fee = 2
<strong>输出：</strong>8
<strong>解释：</strong>能够达到的最大利润:
在此处买入 prices[0] = 1
在此处卖出 prices[3] = 8
在此处买入 prices[4] = 4
在此处卖出 prices[5] = 9
总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>prices = [1,3,7,5,10,3], fee = 3
<strong>输出：</strong>6
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= prices.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>1 &lt;= prices[i] &lt; 5 * 10<sup>4</sup></code></li>
<li><code>0 &lt;= fee &lt; 5 * 10<sup>4</sup></code></li>
</ul>


## 分析

### #1

与 0122 类似，但方法行不通了，考虑与 0309 一样，尝试动态规划。

令 sell[i] 表示 prices[:i] 能获得的最大利润，buy[i] 代表买入状态下 prices[:i] 能获得的最大利润，状态转移方程为：

	if i==0:	sell[i]=0, buy[i]=float('-inf')
	else:		sell[i] = max(sell[i-1], buy[i-1]+prices[i-1]-fee)
				buy[i] = max(buy[i-1], sell[i-1]-prices[i-1])
				
```python
def maxProfit(self, prices: List[int], fee: int) -> int:
	n = len(prices)
	buy, sell = [float('-inf')]*(n+1), [0]*(n+1)
	for i in range(1, n+1):
		sell[i] = max(sell[i-1], buy[i-1]+prices[i-1]-fee)
		buy[i] = max(buy[i-1], sell[i-1]-prices[i-1]) 
	return sell[-1]
```

876 ms

### #2

类似 0309 ，可以只用两个参数 buy, sell 保存状态，先更新 buy 不会影响到 sell。

## 解答

```python
def maxProfit(self, prices: List[int], fee: int) -> int:
	buy, sell = float('-inf'), 0
	for price in prices:
		buy = max(buy, sell-price)
		sell = max(sell, buy+price-fee)
	return sell
```

812 ms

