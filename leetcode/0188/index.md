# 0188：买卖股票的最佳时机 IV（★★★）


## 题目

给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。



 <!--more--> 


示例 1：

	输入：k = 2, prices = [2,4,1]
	输出：2
	解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
	
示例 2：

	输入：k = 2, prices = [3,2,6,5,0,3]
	输出：7
	解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
		 随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。


## 分析

### #1

和 0123 类似，只是从最多 2 次变成了最多 k 次交易

令 buy[i][j] 代表 prices[:i] 最多交易了 j 次且当前是买入状态的最大利润，sell[i][j] 代表 prices[:i] 最多 j 笔交易 的最大利润

	if i==0:	buy[i][j] = float('-inf'), sell[i][j] = 0
	else:		buy[i][j] = max(buy[i-1][j], sell[i-1][j]-prices[i-1])
				sell[i][j] = max(sell[i-1][j], buy[i-1][j-1]+prices[i-1]) if j else 0
				
另外当 k 很大时，最多也只可能完成 len(prices)//2 次交易，后面的无需再递推
				
```python
def maxProfit(self, k: int, prices: List[int]) -> int:
	n = len(prices)
	k = min(k, n//2)
	buy = [[float('-inf')]*(k+1) for _ in range(n+1)]
	sell = [[0]*(k+1) for _ in range(n+1)]
	for i in range(1, n+1):
		for j in range(k+1):
			buy[i][j] = max(buy[i-1][j], sell[i-1][j]-prices[i-1])
			sell[i][j] = max(sell[i-1][j], buy[i-1][j-1]+prices[i-1]) if j else 0
	return sell[-1][-1]
```

132 ms

### #2

和 0123 类似，可以只用 O(k) 个参数保存状态
 
## 解答

```python
def maxProfit(self, k: int, prices: List[int]) -> int:
	n = len(prices)
	k = min(k, n//2)
	buy, sell = [float('-inf')]*(k+1), [0]*(k+1)
	for price in prices:
		for j in range(k+1):
			buy[j] = max(buy[j], sell[j]-price)
			sell[j] = max(sell[j], buy[j-1]+price) if j else 0
	return sell[-1]
```

96 ms



