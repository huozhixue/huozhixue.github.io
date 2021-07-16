# 0386：字典序排数（★）


第 1 场周赛第 1 题

## 题目

给定一个整数 n, 返回从 1 到 n 的字典顺序。

例如，给定 n = 13，返回 [1,10,11,12,13,2,3,4,5,6,7,8,9] 。

请尽可能的优化算法的时间复杂度和空间复杂度。 输入的数据 n 小于等于 5,000,000。

 <!--more--> 
 
## 分析

### #1

观察知道字典排序和字符串排序是一样的，可直接调包。

```python
def lexicalOrder(self, n: int) -> List[int]:
	return sorted(range(1, n+1), key=lambda x: str(x))
```

104 ms

### #2

也可以按照顺序给出结果。

先考虑 '1'，然后在后面加 '0'，当大于 n 时就返回上一步，尝试加更大的数。这个过程就是回溯法，可以用 dfs 解决。 

## 解答

```python
def lexicalOrder(self, n: int) -> List[int]:
	def dfs(i):
		for j in range(max(1, i*10), min(i*10+10, n+1)):
			res.append(j)
			dfs(j) 
	res = []
	dfs(0)
	return res
```

136 ms



