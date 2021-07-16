# 0498：对角线遍历（★）


## 题目

给定一个含有 M x N 个元素的矩阵（M 行，N 列），请以对角线遍历的顺序返回这个矩阵中的所有元素，对角线遍历如下图所示。


 <!--more--> 
 
示例:

	输入:
	[
	 [ 1, 2, 3 ],
	 [ 4, 5, 6 ],
	 [ 7, 8, 9 ]
	]

	输出:  [1,2,4,7,5,3,6,8,9]

	解释:

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/diagonal_traverse.png)

## 分析
  
### #1

最简单的就是先保存每一条对角线的列表，然后再拼接，注意第偶数条对角线反转即可。

每条对角线中的元素行列坐标之和相等，因此遍历时将 (i, j) 位置的元素添加到 i+j 对应的对角线即可。

```python
def findDiagonalOrder(self, matrix: List[List[int]]) -> List[int]:
	m, n = len(matrix), len(matrix) and len(matrix[0])
	tmp = [[] for _ in range(m+n-1)]
	for i in range(m):
		for j in range(n):
			tmp[i+j].append(matrix[i][j])
	res = []
	for i, diag in enumerate(tmp):
		res.extend(diag if i%2 else diag[::-1])
	return res
```

196 ms

### #2

也可以直接按对角线遍历。注意边界范围，第偶数条对角线反着遍历。

## 解答

```python
def findDiagonalOrder(self, matrix: List[List[int]]) -> List[int]:
	res, m, n = [], len(matrix), len(matrix) and len(matrix[0])
	for k in range(m+n-1):
		start, end = max(0, k-n+1), min(k, m-1)
		span = range(start, end+1) if k%2 else range(end, start-1, -1)
		res.extend(matrix[i][k-i] for i in span)
	return res
```

220 ms
