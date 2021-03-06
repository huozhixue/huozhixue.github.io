# 0740：删除与获得点数（★★）


## 题目

给定一个整数数组 nums ，你可以对它进行一些操作。

每次操作中，选择任意一个 nums[i] ，删除它并获得 nums[i] 的点数。之后，你必须删除每个等于 nums[i] - 1 或 nums[i] + 1 的元素。

开始你拥有 0 个点数。返回你能通过这些操作获得的最大点数。

 <!--more--> 
 
示例 1:

	输入: nums = [3, 4, 2]
	输出: 6
	解释: 
	删除 4 来获得 4 个点数，因此 3 也被删除。
	之后，删除 2 来获得 2 个点数。总共获得 6 个点数。
	
示例 2:

	输入: nums = [2, 2, 3, 3, 3, 4]
	输出: 9
	解释: 
	删除 3 来获得 3 个点数，接着要删除两个 2 和 4 。
	之后，再次删除 3 获得 3 个点数，再次删除 3 获得 3 个点数。
	总共获得 9 个点数。


## 分析

### #1

拿了 nums[i] 的点数，就拿不到 nums[i]-1 和 nums[i]+1 的点数，这个限制类似 {{< lc "0198" >}} 打家劫舍。

因此，统计得到 min(nums) 到 max(nums) 每个数能拿到的点数，就转为打家劫舍问题了。

```python
def deleteAndEarn(self, nums: List[int]) -> int:
	def rob(nums):
		a, b = 0, 0
		for num in nums:
			a, b = b, max(b, a+num)
		return b

	ct = Counter(nums)
	A = [x*ct[x] for x in range(1, max(nums)+1)]
	return rob(A)
```

48 ms

### #2

去掉子函数，还可以再简化一下。

## 解答

```python
def deleteAndEarn(self, nums: List[int]) -> int:
	ct, a, b = Counter(nums), 0, 0
	for x in range(1, max(nums)+1):
		a, b = b, max(b, a+x*ct[x])
	return b
```

36 ms

