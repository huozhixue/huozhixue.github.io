# 0070：爬楼梯


## 题目

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 

示例 1：

	输入：n = 2
	输出：2
	解释：有两种方法可以爬到楼顶。
	1. 1 阶 + 1 阶
	2. 2 阶

示例 2：

	输入：n = 3
	输出：3
	解释：有三种方法可以爬到楼顶。
	1. 1 阶 + 1 阶 + 1 阶
	2. 1 阶 + 2 阶
	3. 2 阶 + 1 阶
	 

提示：
- 1 <= n <= 45



## 分析

### #1

很经典的递归问题，最后必然爬 1 或 2 个台阶，转为递归子问题。

显然有很多重复子问题，用动态规划。

```python
def climbStairs(self, n: int) -> int:
    dp = [1]*(n+1)
    for i in range(2, n+1):
        dp[i] = dp[i-1]+dp[i-2]
    return dp[-1]
```
40 ms

### #2

dp[i] 只依赖 dp[i-1] 和 dp[i-2] ，可以优化为两个变量。

## 解答

```python
def climbStairs(self, n: int) -> int:
	a, b = 1, 1
	for _ in range(n-1):
		a, b = b, a+b
	return b
```
32 ms