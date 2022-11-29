# 0048：旋转图像（★）


## 题目

给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。
请不要 使用另一个矩阵来旋转图像。

示例 1：

![img](https://assets.leetcode.com/uploads/2020/08/28/mat1.jpg)


	输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
	输出：[[7,4,1],[8,5,2],[9,6,3]]
	
示例 2：

![img](https://assets.leetcode.com/uploads/2020/08/28/mat2.jpg)


	输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
	输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
	
提示：
- n == matrix.length == matrix[i].length
- 1 <= n <= 20
- -1000 <= matrix[i][j] <= 1000



## 分析 

### #1

观察可知，这个旋转操作等价于按主对角线翻转，再左右翻转。

```python
def rotate(self, matrix: List[List[int]]) -> None:
	for i in range(1, len(matrix)):
		for j in range(i):
			matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
	for row in matrix:
		row.reverse()
```
32 ms

### #2

可以用 zip 一行实现。

## 解答

```python
def rotate(self, matrix: List[List[int]]) -> None:
    matrix[:] = zip(*matrix[::-1])
```
36 ms

