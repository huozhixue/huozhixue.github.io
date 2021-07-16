# 0054：螺旋矩阵（★★）


## 题目

给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 
<!--more--> 

示例 1：

![img](https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg)


	输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
	输出：[1,2,3,6,9,8,7,4,5]
	
示例 2：

![img](https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg)


	输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
	输出：[1,2,3,4,8,12,11,10,9,5,6,7]
	 

## 分析 

### #1

考虑模拟这个过程，初始位置 (0, 0) 按 (0, 1) 方向移动，到达边界位置 (0, n-1) 则改变方向，依此类推。
为了方便，可以根据当前方向会越界到的位置来判断方向怎么更改。

注意在改变方向后更新边界。

```python
def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
	m, n = len(matrix), len(matrix[0])
	res, i, j, di, dj = [], 0, 0, 0, 1
	left, right, up, down = -1, n, -1, m
	for _ in range(m*n):
		res.append(matrix[i][j])
		if j+dj == right:
			di, dj = 1, 0
			up += 1
		elif i+di == down:
			di, dj = 0, -1
			right -= 1
		elif j+dj == left:
			di, dj = -1, 0
			down -= 1
		elif i+di == up:
			di, dj = 0, 1
			left += 1
		i, j = i+di, j+dj
	return res
```

32 ms

### #2

还有种巧妙的方法来判断越界，将走过的地方置 0，然后 matrix[(i+di)%m][(j+dj)%n] == 0 即代表下一步会越界。

而 di、dj 的变换可以统一写作 di, dj = dj, -di。

## 解答

```python
def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
	m, n = len(matrix), len(matrix[0])
	res, i, j, di, dj = [], 0, 0, 0, 1
	for _ in range(m*n):
		res.append(matrix[i][j])
		matrix[i][j] = 0
		if matrix[(i+di)%m][(j+dj)%n] == 0:
			di, dj = dj, -di
		i, j = i + di, j + dj
	return res
```

36 ms

