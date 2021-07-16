# 0628：三个数的最大乘积（★）


## 题目

给你一个整型数组 nums ，在数组中找出由三个数组成的最大乘积，并输出这个乘积。

<!--more--> 

示例 1：

	输入：nums = [1,2,3]
	输出：6
	
示例 2：

	输入：nums = [1,2,3,4]
	输出：24
	
示例 3：

	输入：nums = [-1,-2,-3]
	输出：-6


## 分析

### #1

nums 可能有负数，需要分类讨论：

	nums 里最多 1 个负数，那么找最大的三个数即可

	nums 里至少 2 个负数，还要考虑最小的两个负数乘以最大数的情况

为了方便，直接比较两种情况即可。

```python
def maximumProduct(self, nums: List[int]) -> int:
	nums.sort()
	return max(nums[0]*nums[1]*nums[-1], nums[-3]*nums[-2]*nums[-1])
```

时间复杂度 O(N*log N)，64 ms

### #2

也可以不排序，直接找最大和最小的几个数。

## 解答

```python
def maximumProduct(self, nums: List[int]) -> int:
	a = b = c = float('-inf')
	d = e = float('inf')
	for num in nums:
		if num > a:
			a, b, c = num, a, b
		elif num > b:
			b, c = num, b
		elif num > c:
			c = num
		if num < d:
			d, e = num, d
		elif num < e:
			e = num
	return max(d*e*a, a*b*c)
```

时间复杂度 O(N)，68 ms

