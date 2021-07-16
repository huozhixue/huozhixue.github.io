# 0123：买卖股票的最佳时机 III（★★★）


## 题目

给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。


<!--more--> 

示例 1:

	输入：prices = [3,3,5,0,0,3,1,4]
	输出：6
	解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
	     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
	
示例 2：

	输入：prices = [1,2,3,4,5]
	输出：4
	解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。   
	     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
	     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
	
示例 3：

	输入：prices = [7,6,4,3,1] 
	输出：0 
	解释：在这个情况下, 没有交易完成, 所以最大利润为 0。
	
示例 4：

	输入：prices = [1]
	输出：0


## 分析

### #1

最多交易两次，发现系列前两题的思路都完全不行了，考虑能否递归。

若最后一天没有卖出，转为 prices[:-1] 对应的子问题，若卖出了，则问题转变为求在 prices[:-1] 中 最多交易了一次且当前是买入状态 的最大利润。

令 dp1[i] 表示 prices[:i] 最多两笔交易 的最大利润，dp2[i] 代表 prices[:i] 中最多交易了一次且当前是买入状态的最大利润，那么有：

	if i==0:	dp1[i] = 0, dp2[i] = float('-inf')
	else:		dp1[i] = max(dp1[i-1], dp2[i-1]+prices[i-1])

而如果令 dp3[i] 代表在 princes[:i] 中 最多一笔交易 的最大利润，那么 dp2 也可以由 dp3 递推得到：

	if i==0:	dp2[i] = float('-inf'), dp3[i] = 0
	else:		dp2[i] = max(dp2[i-1], dp3[i-1]-prices[i-1])

在 0121 的求解过程中其实已经得到了 dp3，因此线性时间内即可求解。

```python
def maxProfit(self, prices: List[int]) -> int:
	n = len(prices)
	dp3, Min = [0]*(n+1), float('inf')
	for i in range(1, n+1):
		dp3[i] = max(dp3[i-1], prices[i-1]-Min)
		Min = min(Min, prices[i-1])
	dp2 = [float('-inf')]*(n+1)
	for i in range(1, n+1):
		dp2[i] = max(dp2[i-1], dp3[i-1]-prices[i-1])
	dp1 =  [0]*(n+1)
	for i in range(1, n+1):
		dp1[i] = max(dp1[i-1], dp2[i-1]+prices[i-1])
	return dp1[-1]
```

816 ms

### #2

注意到求 dp3 的过程和后面的递推很相似，其实还可以改写成统一的形式。
令 dp4[i] 代表在 prices[:-1] 中 没交易过且当前是买入状态 的最大利润，那么：
	
	if i==0:	dp3[i] = 0, dp4[i] = float('-inf')
	else:		dp3[i] = max(dp3[i-1], dp4[i-1]+prices[i-1])
				dp4[i] = max(dp4[i-1], -prices[i-1])
				
还可以合并为一次遍历。

```python
def maxProfit(self, prices: List[int]) -> int:
	n = len(prices)
	dp1, dp2, dp3, dp4 = [0]*(n+1), [float('-inf')]*(n+1), [0]*(n+1),  [float('-inf')]*(n+1)
	for i in range(1, n+1):
		dp4[i] = max(dp4[i-1], -prices[i-1])
		dp3[i] = max(dp3[i-1], dp4[i-1]+prices[i-1])
		dp2[i] = max(dp2[i-1], dp3[i-1]-prices[i-1])
		dp1[i] = max(dp1[i-1], dp2[i-1]+prices[i-1])
	return dp1[-1]
```

772 ms

### #3

所有递推式只和上一轮状态有关，因此可以只用 4 个参数保存状态。

## 解答

```python
def maxProfit(self, prices: List[int]) -> int:
	buy1, sell1, buy2, sell2 = float('-inf'), 0, float('-inf'), 0
	for price in prices:
		sell2 = max(sell2, buy2+price)
		buy2 = max(buy2, sell1-price)
		sell1 = max(sell1, buy1+price)
		buy1 = max(buy1, -price)
	return sell2
```

416 ms




