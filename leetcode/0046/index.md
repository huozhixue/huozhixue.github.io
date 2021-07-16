# 0046：全排列（★）


## 题目

给定一个 没有重复 数字的序列，返回其所有可能的全排列。

<!--more--> 

示例:

	输入: [1,2,3]
	输出:
	[
	  [1,2,3],
	  [1,3,2],
	  [2,1,3],
	  [2,3,1],
	  [3,1,2],
	  [3,2,1]
	]


## 分析 

### #1

python 里可以直接调库。

```python
def permute(self, nums: List[int]) -> List[List[int]]:
	return list(permutations(nums))
```

40 ms

### #2

自然的排列方法就是先排第一个数，有 n 种可能，再排第二个数，有 n-1 种可能，依此类推。
要得到所有排列，就依次遍历所有可能即可，可以用 dfs。

```python
def permute(self, nums: List[int]) -> List[List[int]]:
	def dfs(tmp):
		if len(tmp) == n:
			res.append(tmp)
			return
		for i, num in enumerate(nums):
			if flag[i]:
				flag[i] = False
				dfs(tmp+[num])
				flag[i] = True
	
	n = len(nums)
	res, flag = [], [True] * n
	dfs([])
	return res
```

48 ms

### #3

这里有个巧妙地想法。可以把 nums 选过的数交换到前面，比如示例中第一个数取 3，那么将 nums[2]=3 与 nums[0]=1 互换，
然后排第二个数就等价于遍历 nums[1:] 了，依次类推。这样就无需 flag 数组了。

## 解答

```python
def permute(self, nums: List[int]) -> List[List[int]]:
	def dfs(i):
		if i == n:
			res.append(nums[:])
		for j in range(i, n):
			nums[i], nums[j] = nums[j], nums[i]
			dfs(i+1)
			nums[i], nums[j] = nums[j], nums[i]
	
	res, n = [], len(nums)
	dfs(0)
	return res
```

36 ms

