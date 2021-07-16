# 0018：四数之和（★★）


## 题目

给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？
找出所有满足条件且不重复的四元组。

注意：答案中不可以包含重复的四元组。 

提示：

- 0 <= nums.length <= 200
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9

<!--more--> 

示例：

	给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

	满足要求的四元组集合为：
	[
	  [-1,  0, 0, 1],
	  [-2, -1, 1, 2],
	  [-2,  0, 0, 2]
	]




## 分析

### #1

类似 {{< lc "0015" >}}，不过是多加了一重循环。

```python
def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
	nums.sort()
	dic = {num: i for i, num in enumerate(nums)}
	res, n = [], len(nums)
	for i in range(n-3):
		if nums[i] > target/4:
			break
		if i and nums[i] == nums[i-1]:
			continue
		a, t0 = nums[i], target - nums[i]
		for j in range(i+1, n-2):
			if nums[j] > t0/3:
				break
			if j > i+1 and nums[j] == nums[j-1]:
				continue
			b, t1 = nums[j], t0 - nums[j]
			for k in range(j+1, n-1):
				if nums[k] > t1/2:
					break
				if k > j+1 and nums[k] == nums[k-1]:
					continue
				c, d = nums[k], t1 - nums[k]
				if dic.get(d, -1) > k:
					res.append([a, b, c, d])
	return res
```

时间复杂度 $O(N^3)$，860 ms

### #2

循环轮数较多，所以可以加强遍历的限制，例如当 sum(nums[i:i+4])<target 时，便可中止第一层循环。

## 解答

```python
def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
	nums.sort()
	dic = {num: i for i, num in enumerate(nums)}
	res, n = [], len(nums)
	for i in range(n-3):
		if sum(nums[i:i+4]) > target:
			break
		if i and nums[i] == nums[i-1]:
			continue
		if nums[i] + sum(nums[-3:]) < target:
			continue
		a, t0 = nums[i], target - nums[i]
		for j in range(i+1, n-2):
			if sum(nums[j:j+3]) > t0:
				break
			if j > i+1 and nums[j] == nums[j-1]:
				continue
			if nums[j] + sum(nums[-2:]) < t0:
				continue
			b, t1 = nums[j], t0 - nums[j]
			for k in range(j+1, n-1):
				if sum(nums[k:k+2]) > t1:
					break
				if k > j+1 and nums[k] == nums[k-1]:
					continue
				c, d = nums[k], t1 - nums[k]
				if dic.get(d, -1) > k:
					res.append([a, b, c, d])
	return res
```

时间复杂度 $O(N^3)$，60 ms
