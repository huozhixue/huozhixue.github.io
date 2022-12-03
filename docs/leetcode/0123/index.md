# 0123：买卖股票的最佳时机 III（★★★）


## 题目

给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。


示例 1:

	输入：prices = [3,3,5,0,0,3,1,4]
	输出：6
	解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，
	这笔交易所能获得利润 = 3-0 = 3 。随后，在第 7 天（股票价格 = 1）的时候买入，
	在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
	
示例 2：

	输入：prices = [1,2,3,4,5]
	输出：4
	解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 
	这笔交易所能获得利润 = 5-1 = 4 。 注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   
	因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
	
示例 3：

	输入：prices = [7,6,4,3,1] 
	输出：0 
	解释：在这个情况下, 没有交易完成, 所以最大利润为 0。
	
示例 4：

	输入：prices = [1]
	输出：0

提示：
- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^5

## 分析

### #1

{{< lc "0121" >}} 升级版，添加了次数限制，所以考虑加一个状态参数。

令 dp[i][j][0]、dp[i][j][1] 分别代表 prices[:i] 最多买过 j 支股票且手里有/无股票的最大利润，即可递推：

	dp[i][j][0] = max(dp[i-1][j][0], dp[i-1][j-1][1]-prices[i-1])
    dp[i][j][1] = max(dp[i-1][j][1], dp[i-1][j][0]+prices[i-1])
 
```python
def maxProfit(self, prices: List[int]) -> int:
    n = len(prices)
    dp = [[[float('-inf'), 0] for _ in range(3)] for _ in range(n+1)]
    for i in range(1, n+1):
        for j in range(1, 3):
            dp[i][j][0] = max(dp[i-1][j][0], dp[i-1][j-1][1]-prices[i-1])
            dp[i][j][1] = max(dp[i-1][j][1], dp[i-1][j][0]+prices[i-1])
    return dp[-1][-1][-1]
```
1660 ms

### #2

可以用滚动数组优化空间。

## 解答

```python
def maxProfit(self, prices: List[int]) -> int:
    n = len(prices)
    dp = [[float('-inf'), 0] for _ in range(3)] 
    for x in prices:
        prev = dp[:]
        for j in range(1, 3):
            dp[j][0] = max(prev[j][0], prev[j-1][1]-x)
            dp[j][1] = max(prev[j][1], prev[j][0]+x)
    return dp[-1][-1]
```
692 ms



