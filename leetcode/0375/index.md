# 0375：猜数字大小 II（★★）



## 题目

我们正在玩一个猜数游戏，游戏规则如下：

我从 1 到 n 之间选择一个数字，你来猜我选了哪个数字。

每次你猜错了，我都会告诉你，我选的数字比你的大了或者小了。

然而，当你猜了数字 x 并且猜错了的时候，你需要支付金额为 x 的现金。直到你猜到我选的数字，你才算赢得了这个游戏。

给定 n ≥ 1，计算你至少需要拥有多少现金才能确保你能赢得这个游戏。

 <!--more--> 
 
示例:

	n = 10, 我选择了8.

	第一轮: 你猜我选择的数字是5，我会告诉你，我的数字更大一些，然后你需要支付5块。
	第二轮: 你猜是7，我告诉你，我的数字更大一些，你支付7块。
	第三轮: 你猜是9，我告诉你，我的数字更小一些，你支付9块。

	游戏结束。8 就是我选的数字。

	你最终要支付 5 + 7 + 9 = 21 块钱。

## 分析

### #1

想想能否递归，假设一开始选 1，那么问题转化为在 2 到 n 之间玩游戏。为了能递归，构建子问题 help(l, r) 代表在 l 到 r 之间玩游戏的结果。

那么一开始选 1 的话，最少要拥有 1+help(2, n) ；一开始选 i 的话，最少要拥有 i+max(help(1,i-1), help(i+1,n))。

遍历 1 到 n，分别求最少要拥有的现金，所有值的最小值即是结果。

```python
def getMoneyAmount(self, n: int) -> int:
	@lru_cache(None)
	def help(l, r):
		if l >= r:
			return 0
		return min(i+max(help(l,i-1), help(i+1,r)) for i in range(l, r+1))
	return help(1, n)
```

3444 ms，空间占得较多

### #2

改写为动态规划。令 dp[i][j] 代表在 i 到 j 之间玩游戏的结果。状态转移方程为：

	if i >= j:	dp[i][j]=0
	else:		dp[i][j]=min(k+max(dp[i][k-1], dp[k+1][j]) for k in range(i, j+1))
	
```python
def getMoneyAmount(self, n: int) -> int:
	dp = [[0]*(n+2) for _ in range(n+2)]
	for i in range(n, 0, -1):
		for j in range(i+1, n+1):
			dp[i][j] = min(k + max(dp[i][k-1],dp[k+1][j]) for k in range(i, j+1))
	return dp[1][n]
```

时间复杂度 $O(N^3)$，1964 ms

### #3

从感觉来说（也可以从递推式来证明），k+dp[i][k-1] 是随着 k 增大而递增的，k+dp[k+1][j] 是随着 k 增大而递减的。
另外，当 k==(i+j)//2 时，dp[i][k-1] 依然是小于 dp[k+1][j] 的.

因此 k<=(i+j)//2 时，k+max(dp[i][k-1], dp[k+1][j]) 是随着 k 增大而递减的。

所以 k 可以直接从 (i+j)//2 开始遍历，节省一半的时间。


## 解答

```python
def getMoneyAmount(self, n: int) -> int:
	dp = [[0]*(n+2) for _ in range(n+2)]
	for i in range(n, 0, -1):
		for j in range(i+1, n+1):
			dp[i][j] = min(k + max(dp[i][k-1],dp[k+1][j]) for k in range((i+j)//2, j+1))
	return dp[1][n]
```

时间复杂度 $O(N^3)$，1060 ms

