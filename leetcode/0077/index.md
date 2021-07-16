# 0077：组合（★）


## 题目

给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。


<!--more--> 

示例:

	输入: n = 4, k = 2
	输出:
	[
	  [2,4],
	  [3,4],
	  [2,3],
	  [1,2],
	  [1,3],
	  [1,4],
	]



## 分析

### #1

可以直接调库。

```python
def combine(self, n: int, k: int) -> List[List[int]]:
	return list(combinations(range(1, n+1), k))
```

44 ms

### #2

自然的方法就是先取 1 个数 j，然后再从 j+1, ……, n 中选 k-1 个数 ，可以用 dfs。

注意到还剩下 x 个数时，取的数最大不超过 n+1-x，否则就不够选了。所以添加限制节省时间。

## 解答

```python
def combine(self, n: int, k: int) -> List[List[int]]:
	def dfs(i, tmp):
		if len(tmp) == k:
			res.append(tmp)
			return
		for j in range(i, n+2-(k-len(tmp))):
			dfs(j+1, tmp+[j])
	
	res = []
	dfs(1, [])
	return res
```

48 ms
