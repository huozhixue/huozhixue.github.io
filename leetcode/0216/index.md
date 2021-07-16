# 0216：组合总和 III（★★）


## 题目

找出所有相加之和为 n 的 k 个数的组合。组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

解集不能包含重复的组合。 


<!--more--> 

示例 1:

	输入: k = 3, n = 7
	输出: [[1,2,4]]
	
示例 2:

	输入: k = 3, n = 9
	输出: [[1,2,6], [1,3,5], [2,3,4]]



## 分析

本题更类似于 0077 ，注意下终止条件即可。

## 解答

```python
def combinationSum3(self, k: int, n: int) -> List[List[int]]:
	def dfs(i, tmp):
		if len(tmp) == k or sum(tmp)>=n:
			if len(tmp)==k and sum(tmp)==n:
				res.append(tmp)
			return
		for j in range(i, 11-(k-len(tmp))):
			dfs(j+1, tmp+[j])
	
	res = []
	dfs(1, [])
	return res
```

28 ms



