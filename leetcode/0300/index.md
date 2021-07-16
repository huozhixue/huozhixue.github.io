# 0300：最长递增子序列（★★★）


## 题目

给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

<!--more--> 

示例 1：

	输入：nums = [10,9,2,5,3,7,101,18]
	输出：4
	解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。

示例 2：

	输入：nums = [0,1,0,3,2,3]
	输出：4

示例 3：

	输入：nums = [7,7,7,7,7,7,7]
	输出：1



## 分析

### #1

先考虑能否递推。令 dp[i] 代表以 nums[i] 结尾的最长递增子序列长度。对于 dp[i]，可以在前面找比 nums[i] 小的数 nums[j]，
然后将 nums[i] 接到以 nums[j] 结尾的最长递增子序列后面，得到 1+dp[j] 长度的递增子序列。遍历 j 取最大即可。

因此写出状态转移方程：

	if i==0:	dp[i] = 1
	else:		dp[i] = 1 + max(dp[j] if nums[j] < nums[i] else 0 for j in range(i))
					
```python
def lengthOfLIS(self, nums: List[int]) -> int:
	n = len(nums)
	dp = [1] * n
	for i in range(1, n):
		dp[i] += max(dp[j] if nums[j] < nums[i] else 0 for j in range(i))
	return max(dp)
```

时间复杂度 $O(N^2)$，2552 ms

### #2

本题有个经典的解法。先观察上面的方法，对于 dp[i]，前面很多的遍历是不必要的。因为是求最长，所以应该从长到短遍历前面的
递增子序列，判断能否添加到后面。

注意若有多条长度相等的递增子序列，只需要考虑尾数最小的那条就行了。
因此只要有 每个长度对应的递增子序列的最小尾数 即可推得 dp[i]。

令 tmp[i] 表示当前长度为 i+1 的递增子序列的最小尾数，那么：

	对于 dp[i]，从长到短找前面能接尾的递增子序列，等价于从后往前遍历 tmp 找到第一个小于 nums[i] 的位置 j。
	
	然后 dp[i] = j+2。显然应该更新 tmp[j+1]=nums[i]。
	
	分类讨论一下即知 tmp 的其它位置不变。
	
最终 max(dp) 即为所求，但显然 len(tmp) 也就等于结果，所以可以不用 dp 数组。

再注意下边界条件即可。

## 解答

```python
def lengthOfLIS(self, nums: List[int]) -> int:
	tmp = []
	for num in nums:
		j = bisect_left(tmp, num)
		tmp[j:j+1] = [num]
	return len(tmp)
```

时间复杂度 $O(N*logN)$，44 ms

