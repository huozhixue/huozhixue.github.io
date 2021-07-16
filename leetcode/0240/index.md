# 0240：搜索二维矩阵 II（★★★）


## 题目

编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

- 每行的元素从左到右升序排列。
- 每列的元素从上到下升序排列。

<!--more--> 

示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/11/25/searchgrid2.jpg)

	输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
	输出：true

示例 2：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/11/25/searchgrid.jpg)

	输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
	输出：false



## 分析

### #1

考虑二分。先看第 mi=len(matrix)//2 行，如果 target 在就返回，不在则可以定位到 mj 使得 matrix[mi][mj-1] < target < matrix[mi][mj] 。

此时位于 (mi, mj-1) 左上的元素都更小，可以排除。同理位于 (mi, mj) 右下的元素都更大，可以排除。相当于将搜索范围缩小了一半。
剩下的左下和右上两部分就是递归子问题。

```python
def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
	def help(i0, j0, i1, j1):
		if i0 > i1 or j0 > j1:
			return False
		mid_i = i0 + (i1-i0) // 2
		row = matrix[mid_i]
		mid_j = bisect_right(row, target, j0, j1+1)
		if row[mid_j-1] == target:
			return True
		return help(mid_i+1, j0, i1, mid_j-1) or help(i0, mid_j, mid_i-1, j1)
	return help(0, 0, len(matrix)-1, len(matrix[0])-1)
```

176 ms

### #2

还有个很巧妙的方法，一开始令 (i, j) 在左下角 (m-1, 0)：
	
	matrix[i][j] == target			直接返回
	
	matrix[i][j] < target			第 j 列的元素可以排除，转为递归子问题 help(0, j+1, i, n-1)
	
	matrix[i][j] > target			第 i 行的元素可以排除，转为递归子问题 help(0, j, i-1, n-1)
	
可以写成迭代形式，每次移动 i 或 j 即可。

## 解答

```python
def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
	m, n = len(matrix), len(matrix[0])
	i, j = m-1, 0
	while i>=0 and j<=n-1:
		if matrix[i][j] == target:
			return True
		if matrix[i][j] < target:
			j += 1
		else:
			i -= 1
	return False
```

180 ms
