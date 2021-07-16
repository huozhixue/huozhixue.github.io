# 0085：最大矩形（★★★）


## 题目

给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/09/14/maximal.jpg)


	输入：matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
	输出：6
	解释：最大矩形如上图所示。

示例 2：

	输入：matrix = []
	输出：0

示例 3：

	输入：matrix = [["0"]]
	输出：0

示例 4：

	输入：matrix = [["1"]]
	输出：1
	
示例 5：

	输入：matrix = [["0","0"]]
	输出：0




## 分析

### #1

没有思路先暴力，最简单的就是遍历顶，求以 (i, x) 到 (i, y) 为顶对应的最大高度。

```python
def maximalRectangle(self, matrix: List[List[str]]) -> int:
	if not matrix or not matrix[0]:
		return 0
	res, m, n = 0, len(matrix), len(matrix[0])
	for i in range(m):
		for x in range(n):
			h = m
			for y in range(x, n):
				j = 0
				while i+j < m and matrix[i+j][y] == '1':
					j += 1
				h = min(h, j)
				res = max(res, h*(y-x+1))
	return res
```

时间复杂度 $O(N^2*M^2)$，果然超时了

### #2

显然高度的计算有大量重复，可以先保存中间结果以节省时间。

用 H[i][x] 代表以 (i, x) 为顶对应的最大高度，那么状态转移方程为：
	
	if i==0:	H[i][x] = 1 if matrix[i][x] == '1' else 0
	else:		H[i][x] = H[i-1][x]+1 if matrix[i][x] == '1' else 0

```python
def maximalRectangle(self, matrix: List[List[str]]) -> int:
	if not matrix or not matrix[0]:
		return 0
	m, n = len(matrix), len(matrix[0])
	res, H = 0, [[0]*n for _ in range(m)]
	for i in range(m):
		for y in range(n):
			H[i][y] = H[i-1][y]+1 if matrix[i][y] == '1' else 0
			h = H[i][y]
			for x in range(y, -1, -1):
				h = min(h, H[i][x])
				res = max(res, h*(y-x+1))
	return res
```

时间复杂度 $O(M*N^2)$，2452 ms，勉强 AC

### #3

注意到固定 i 时，问题非常类似 0084 ，H[i] 即是各个柱子的高度。因此可以直接调用 0084 的方法。

## 解答

```python
def maximalRectangle(self, matrix: List[List[str]]) -> int:
	def help(heights):
		res, stack = 0, []
		for i, h in enumerate(heights+[0]):
			while stack and heights[stack[-1]] >= h:
				j = stack.pop()
				left = stack[-1] if stack else -1
				res = max(res, heights[j]*(i-left-1))
			stack.append(i)
		return res

	if not matrix or not matrix[0]:
		return 0
	m, n = len(matrix), len(matrix[0])
	res, H = 0, [[0]*n for _ in range(m)]
	for x in range(n):
		for i in range(m):
			H[i][x] = H[i-1][x]+1 if matrix[i][x] == '1' else 0
	return max(help(H[i]) for i in range(m))
```

时间复杂度 O(M*N)，88 ms
