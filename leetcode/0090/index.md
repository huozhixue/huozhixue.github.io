# 0090：子集 II（★★）


## 题目

给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

<!--more--> 

示例:

	输入: [1,2,2]
	输出:
	[
	  [2],
	  [1],
	  [1,2,2],
	  [2,2],
	  [1,2],
	  []
	]
 


## 分析

### #1

和 0078 类似，依然考虑递归。

- 不包含末尾元素的显示是个递归子问题
- 包含末尾元素的，为了不和 nums[:-1] 的子集重复，必然包含所有等于末尾元素的值，剩下的是递归子问题

为了方便，可以将 nums 先排序，然后找到末尾重复的一段 nums[j:]，即可递归

```python
def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
	if not nums:
		return [[]]
	nums.sort()
	j = len(nums)-1
	while j and nums[j-1] == nums[-1]:
		j -= 1
	return self.subsetsWithDup(nums[:-1]) + [sub+nums[j:] for sub in self.subsetsWithDup(nums[:j])]
```

32 ms

### #2 

也可以改写成迭代形式，动态保存位置 j 和对应的 nums[:j] 的子集即可

## 解答

```python
def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
	nums.sort()
	res, tmp, j = [[]], [[]], 0
	for i, num in enumerate(nums):
		if num != nums[j]:
			j = i
			tmp = res[:]
		res += [sub+nums[j:i+1] for sub in tmp]
	return res
```

32 ms


