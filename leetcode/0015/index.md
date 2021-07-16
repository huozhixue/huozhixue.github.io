# 0015：三数之和（★★）


## 题目

给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？
请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

提示：

- 0 <= nums.length <= 3000
- -10^5 <= nums[i] <= 10^5

<!--more--> 


示例 1：

	输入：nums = [-1,0,1,2,-1,-4]
	输出：[[-1,-1,2],[-1,0,1]]
	
示例 2：

	输入：nums = []
	输出：[]
	
示例 3：

	输入：nums = [0]
	输出：[]



## 分析

### #1

发现直接遍历三元组的话，去重较麻烦，因此考虑先排序再遍历。
在每一层的遍历范围中，遇到相邻元素相等的情况就跳过，从而保证三元组不重复。

同时类似于 {{< lc "0001" >}} ，可以用哈希表优化最后一层的查找。

```python
def threeSum(self, nums: List[int]) -> List[List[int]]:
	nums.sort()
	d = {num: i for i, num in enumerate(nums)}
	res, n = [], len(nums)
	for i in range(n-2):
		if i and nums[i] == nums[i-1]:
			continue
		for j in range(i+1, n-1):
			if j > i+1 and nums[j] == nums[j-1]:
				continue
			k = d.get(-nums[i]-nums[j], -1)
			if k > j:
				res.append((nums[i], nums[j], nums[k]))
	return res
```

时间复杂度 $O(N^2)$，1056 ms

### #2

观察示例发现有些遍历是不需要的，比如说 nums[i] 已经大于 0，后面的三元组之和肯定大于0，就无需遍历了。

同理遍历 j 时也可以提前退出，以优化时间。


## 解答

```python
def threeSum(self, nums: List[int]) -> List[List[int]]:
	nums.sort()
	d = {num: i for i, num in enumerate(nums)}
	res, n = [], len(nums)
	for i in range(n-2):
		if nums[i] > 0:
			break
		if i and nums[i] == nums[i-1]:
			continue
		for j in range(i+1, n-1):
			if nums[j] > -nums[i]/2:
				break
			if j > i+1 and nums[j] == nums[j-1]:
				continue
			k = d.get(-nums[i]-nums[j], -1)
			if k > j:
				res.append((nums[i], nums[j], nums[k]))
	return res
```

时间复杂度 $O(N^2)$，588 ms
