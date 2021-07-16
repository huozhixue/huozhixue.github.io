# 0047：全排列 II（★★）


## 题目

给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。


<!--more--> 

示例 1：

	输入：nums = [1,1,2]
	输出：
	[[1,1,2],
	 [1,2,1],
	 [2,1,1]]
	 
示例 2：

	输入：nums = [1,2,3]
	输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

## 分析 

### #1

依然可以调库

```python
def permuteUnique(self, nums: List[int]) -> List[List[int]]:
	return list(set(permutations(nums)))
```

64 ms

### #2

与 0046 的区别是包含重复数字，所以先把 nums 排序。然后遍历时，当前可选数组的相邻元素相等就跳过。


## 解答

```python
def permuteUnique(self, nums: List[int]) -> List[List[int]]:
	def dfs(tmp):
		if len(tmp) == len(nums):
			res.append(tmp)
			return
		for i, num in enumerate(nums):
			if flag[i] and not (i>0 and num==nums[i-1] and flag[i-1]):
				flag[i] = False
				dfs(tmp+[num])
				flag[i] = True
	
	nums.sort()
	res, flag = [], [True] * len(nums)
	dfs([])
	return res
```

44 ms

