# 0078：子集（★）


## 题目

给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。


<!--more--> 

示例 1：

	输入：nums = [1,2,3]
	输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
	
示例 2：

	输入：nums = [0]
	输出：[[],[0]]


## 分析

### #1

nums 的子集可以按是否包含 nums[-1] 分类，然后是递归子问题。

```python
def subsets(self, nums: List[int]) -> List[List[int]]:
	if not nums:
		return [[]]
	tmp = self.subsets(nums[:-1])
	return tmp + [sub+[nums[-1]] for sub in tmp]
```

36 ms

### #2

可以改写成迭代形式。

## 解答

```python
def subsets(self, nums: List[int]) -> List[List[int]]:
	res = [[]]
	for num in nums:
		res += [sub+[num] for sub in res]
	return res
```

32 ms
