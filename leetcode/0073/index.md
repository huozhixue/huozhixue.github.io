# 0073：矩阵置零（★★）


## 题目

给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。

你能想出一个常数空间的解决方案吗？

<!--more--> 

示例 1:

	输入: 
	[
	  [1,1,1],
	  [1,0,1],
	  [1,1,1]
	]
	输出: 
	[
	  [1,0,1],
	  [0,0,0],
	  [1,0,1]
	]
	
示例 2:

	输入: 
	[
	  [0,1,2,0],
	  [3,4,5,2],
	  [1,3,1,5]
	]
	输出: 
	[
	  [0,0,0,0],
	  [0,4,5,0],
	  [0,3,1,0]
	]



## 分析

### #1

可以直接把有 0 的行和列标记，第二趟全部置 0 即可。

```python
def setZeroes(self, matrix: List[List[int]]) -> None:
	"""
	Do not return anything, modify matrix in-place instead.
	"""
	r, c, m, n = set(), set(), len(matrix), len(matrix[0])
	for i in range(m):
		for j in range(n):
			if matrix[i][j] == 0:
				r.add(i)
				c.add(j)
	for i in range(m):
		for j in range(n):
			if i in r or j in c:
				matrix[i][j] = 0
```

32 ms

### #2

要求只用常数空间，所以考虑用矩阵内的元素来标记。

遇到 0 时，所在行和列靠前的位置已经遍历过，而且最终都要变成 0，所以可以用来作为标记。
为了方便，直接把行首和列首变为 0 作为标记即可。

第二趟再根据标记置 0 。为了保持标记信息，先不动首行和首列，将其它应该置 0 的元素置 0。最后再改变首行和首列。 

这里有个问题，首行和首列的标记位都是 matrix[0][0]，保存不了两个信息。
所以考虑添加一个额外参数和 matrix[0][0] 分别标记首行和首列。

## 解答

```python
def setZeroes(self, matrix: List[List[int]]) -> None:
	"""
	Do not return anything, modify matrix in-place instead.
	"""
	r, c, m, n, first_row_mark = set(), set(), len(matrix), len(matrix[0]), False
	for i in range(m):
		for j in range(n):
			if not matrix[i][j]:
				if not i:
					first_row_mark = True
				else:
					matrix[i][0] = matrix[0][j] = 0
	for i in range(1, m):
		for j in range(1, n):
			if not matrix[i][0] or not matrix[0][j]:
				matrix[i][j] = 0
	if not matrix[0][0]:
		for i in range(1, m):
			matrix[i][0] = 0
	if first_row_mark:
		matrix[0] = [0] * n
```

52 ms
