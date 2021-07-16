# 0040：组合总和 II（★★）


## 题目

给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

说明：

- 所有数字（包括 target）都是正整数。
- 解集不能包含重复的组合。 

 
<!--more--> 

示例 1:

	输入: candidates = [10,1,2,7,6,1,5], target = 8,
	所求解集为:
	[
	  [1, 7],
	  [1, 2, 5],
	  [2, 6],
	  [1, 1, 6]
	]
	
示例 2:

	输入: candidates = [2,5,2,1,2], target = 5,
	所求解集为:
	[
	  [1,2,2],
	  [5]
	]

## 分析 

和上一题的区别是一个数只能用一次了，而且 candidates 含有重复元素。

所以遍历 candidates 时遇到相邻元素相等就跳过，保证结果不重复。取了数以后，要将起点 i 增 1，保证一个数只用一次。

## 解答

```python
def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
	def dfs(t, i, tmp):
		if t == 0:
			res.append(tmp)
			return
		for j in range(i, len(candidates)):
			c = candidates[j]
			if c > t:
				return
			if j > i and c == candidates[j-1]:
				continue
			dfs(t-c, j+1, tmp+[c])

	res = []
	candidates.sort()
	dfs(target, 0, [])
	return res
```

48 ms
