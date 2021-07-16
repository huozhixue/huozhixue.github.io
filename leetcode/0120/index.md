# 0120：三角形最小路径和（★）


## 题目

给定一个三角形 triangle ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 
上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。

你可以只使用 O(n) 的额外空间（n 为三角形的总行数）来解决这个问题吗？

1 <= triangle.length <= 200

triangle[0].length == 1

<!--more--> 

示例 1：

	输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
	输出：11
	解释：如下面简图所示：
	   2
	  3 4
	 6 5 7
	4 1 8 3
	自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。

示例 2：

	输入：triangle = [[-10]]
	输出：-10


## 分析

### #1

可以迭代得到以每一层的每个节点作为终点的最小路径和。再从最后一层中取最小的即可。

```python
def minimumTotal(self, triangle: List[List[int]]) -> int:
	n = len(triangle)
	for i in range(1, n):
		triangle[i][0] += triangle[i-1][0]
		triangle[i][i] += triangle[i-1][i-1]
		for j in range(1, i):
			triangle[i][j] += min(triangle[i-1][j-1], triangle[i-1][j])
	return min(triangle[-1])
```

52 ms

### #2

也可以反向得到每个节点作为起点的最小路径和，最终 triangle[0][0] 即为所求。

## 解答

```python
def minimumTotal(self, triangle: List[List[int]]) -> int:
	n = len(triangle)
	for i in range(n-2, -1, -1):
		for j in range(i+1):
			triangle[i][j] += min(triangle[i+1][j], triangle[i+1][j+1])
	return triangle[0][0]
```

36 ms

