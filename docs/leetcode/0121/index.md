# 0121：买卖股票的最佳时机（★）


## 题目

给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。
设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。



示例 1：

	输入：[7,1,5,3,6,4]
	输出：5
	解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
		 注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
		 
示例 2：

	输入：prices = [7,6,4,3,1]
	输出：0
	解释：在这种情况下, 没有交易完成, 所以最大利润为 0。

提示：
- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^4

## 分析

经典 dp 问题。

考虑最后一天的交易状态：
- 如果没有卖出，则转为 prices[:-1] 的递归子问题
- 如果卖了，则要求 prices[:-1] 有股票状态下的最大值

那么令 dp[i][0]、dp[i][1] 分别代表 prices[:i] 手里有/无股票的最大利润，即可递推：

    dp[i][0] = max(dp[i-1][0], -prices[i-1])
	dp[i][1] = max(dp[i-1][1], dp[i-1][0]+prices[i-1])
   
还可以优化为两个参数。

## 解答

```python
def maxProfit(self, prices: List[int]) -> int:
    a, b = float('-inf'), 0
    for price in prices:
        a, b = max(a, -price), max(b, a+price)
    return b
```
188 ms



