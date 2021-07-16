# 0039：组合总和（★）


## 题目

给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以无限制重复被选取。

说明：

- 所有数字（包括 target）都是正整数。
- 解集不能包含重复的组合。 

 
<!--more--> 

示例 1：

	输入：candidates = [2,3,6,7], target = 7,
	所求解集为：
	[
	  [7],
	  [2,2,3]
	]
	
示例 2：

	输入：candidates = [2,3,5], target = 8,
	所求解集为：
	[
	  [2,2,2,2],
	  [2,3,3],
	  [3,5]
	]

 

## 分析 

将 candidates 排序，从小到大选取数字就可保证组合不重复。搜索解的过程就是回溯，可以用 dfs。

t, i, tmp 分别是当前目标数，当前遍历 candidates 的起点，当前已取数字集合。

## 解答

```python
def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
	def dfs(t, i, tmp):
		if t == 0:
			res.append(tmp)
			return
		for j in range(i, len(candidates)):
			c = candidates[j]
			if c > t:
				return
			dfs(t-c, j, tmp+[c])
	res = []
	candidates.sort()
	dfs(target, 0, [])
	return res
```

48 ms
