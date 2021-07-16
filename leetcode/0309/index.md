# 0309：最佳买卖股票时机含冷冻期（★★）


## 题目

给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​

设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

- 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
- 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。


<!--more--> 

示例:

	输入: [1,2,3,0,2]
	输出: 3 
	解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]


## 分析

### #1

与 0122 类似，但方法行不通了，考虑与 0123 一样，尝试动态规划

令 sell[i] 表示 prices[:i] 能获得的最大利润，buy[i] 代表买入状态下 prices[:i] 能获得的最大利润

	if i==0:	sell[i]=0, buy[i]=float('-inf')
	else:		sell[i] = max(sell[i-1], buy[i-1]+prices[i-1])
				buy[i] = max(buy[i-1], sell[i-2]-prices[i-1]) if i>1 else -prices[0]
				

```python
def maxProfit(self, prices: List[int]) -> int:
	n = len(prices)
	buy, sell = [float('-inf')]*(n+1), [0]*(n+1)
	for i in range(1, n+1):
		sell[i] = max(sell[i-1], buy[i-1]+prices[i-1])
		buy[i] = max(buy[i-1], sell[i-2]-prices[i-1]) if i>1 else -prices[0]
	return sell[-1]
```

44 ms

### #2

递推式只和前一轮的 buy 和前两轮的 sell 有关，因此可以只用 3 个参数保存状态，分别设为 buy, sell0, sell1

	buy = max(buy, sell0-price)
	sell0, sell1 = sell1, max(sell1, buy+price)
	
先更新 buy 不会影响到后面的 sell1。假如 buy 的值改变了，设改变前后分别为 old_buy, new_buy，有

	因为	old_buy < new_buy = sell0-price
	所以	old_buy+price < sell0
	又因为	sell0 必然小于等于 sell1
	所以	max(sell1, old_buy+price)=max(sell1, new_buy+price)=sell1

## 解答

```python
def maxProfit(self, prices: List[int]) -> int:
	buy, sell0, sell1 = float('-inf'), 0, 0
	for price in prices:
		buy = max(buy, sell0-price)
		sell0, sell1 = sell1, max(sell1, buy+price)
	return sell1
```

36 ms

