# 0070：爬楼梯（★）


## 题目

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

<!--more--> 

示例 1：

	输入： 2
	输出： 2
	解释： 有两种方法可以爬到楼顶。
	1.  1 阶 + 1 阶
	2.  2 阶
	
示例 2：

	输入： 3
	输出： 3
	解释： 有三种方法可以爬到楼顶。
	1.  1 阶 + 1 阶 + 1 阶
	2.  1 阶 + 2 阶
	3.  2 阶 + 1 阶


## 分析

### #1

很经典的递归问题，一开始爬 1 或 2 个台阶，后面的就是子问题。

```python
@lru_cache(None)
def climbStairs(self, n: int) -> int:
	if n < 2:
		return 1
	return self.climbStairs(n-1) + self.climbStairs(n-2)
```

44 ms，空间占得较多

### #2

改写成动态规划。设 dp[i] 是爬 i 阶楼梯的方法，那么状态转移方程为：

	if i < 2: 	dp[i] = 1
	else:		dp[i] = dp[i-1]+dp[i-2]
	
```python
def climbStairs(self, n: int) -> int:
	dp = [1] * (n+1)
	for i in range(2, n+1):
		dp[i] = dp[i-1] + dp[i-2]
	return dp[-1]
```

40 ms

### #3

遍历过程中，其实只需要前面两个状态，所以可以只用两个参数动态保存。

## 解答

```python
def climbStairs(self, n: int) -> int:
	a, b = 1, 1
	for _ in range(n-1):
		a, b = b, a+b
	return b
```

36 ms
