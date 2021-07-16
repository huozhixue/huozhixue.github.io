# 0377：组合总和 Ⅳ（★★）



## 题目

给定一个由正整数组成且不存在重复数字的数组，找出和为给定目标正整数的组合的个数。

 <!--more--> 
 
示例:

	nums = [1, 2, 3]
	target = 4

	所有可能的组合为：
	(1, 1, 1, 1)
	(1, 1, 2)
	(1, 2, 1)
	(1, 3)
	(2, 1, 1)
	(2, 2)
	(3, 1)

	请注意，顺序不同的序列被视作不同的组合。

	因此输出为 7。



## 分析

### #1

顺序不同也算作不同组合，因此取了第一个数 num 后，剩下的等价于递归子问题 help(target-num) 。

再注意下边界情况即可。

```python
def combinationSum4(self, nums: List[int], target: int) -> int:
	@lru_cache(None)
	def help(t):
		return 1 if t==0 else sum(help(t-num) for num in nums if num<=t)
	
	return help(target)
```

68 ms，空间占得较多

### #2

改写为动态规划。令 dp[i] 代表和为 i 的组合个数。状态转移方程为：

	if i==0:	dp[i] = 1
	else:		dp[i] = sum(dp[i-num] for num in nums if num <= i)


## 解答

```python
def combinationSum4(self, nums: List[int], target: int) -> int:
	dp = [1] * (target+1)
	for i in range(1, target+1):
		dp[i] = sum(dp[i-num] for num in nums if num <= i)
	return dp[-1]
```

52 ms

