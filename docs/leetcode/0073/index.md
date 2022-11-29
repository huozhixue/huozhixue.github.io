# 0073：矩阵置零（★★）


## 题目

给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。


示例 1：

![img](https://assets.leetcode.com/uploads/2020/08/17/mat1.jpg)  

    输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
    输出：[[1,0,1],[0,0,0],[1,0,1]]

示例 2：
 
![img](https://assets.leetcode.com/uploads/2020/08/17/mat2.jpg)   
    
    输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
    输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]

提示：
- m == matrix.length
- n == matrix[0].length
- 1 <= m, n <= 200
- -2^31 <= matrix[i][j] <= 2^31 - 1

## 分析

### #1

可以先遍历一趟记录有 0 的行和列，再遍历一趟将符合的元素置 0 即可。

```python
def setZeroes(self, matrix: List[List[int]]) -> None:
    row, col, m, n = set(), set(), len(matrix), len(matrix[0])
    for i, j in product(range(m), range(n)):
        if matrix[i][j] == 0:
            row.add(i)
            col.add(j)
    for i, j in product(range(m), range(n)):
        if i in row or j in col:
            matrix[i][j] = 0
```
32 ms

### #2

要求只用常数空间，所以考虑用矩阵内的元素来标记：
- 为了方便，直接把行首和列首变为 0 来作为标记
- 第二趟遍历时先根据首行和首列的信息改变其它位置的元素，最后再改变首行和首列。
- 注意首行和首列的标记位都是 matrix[0][0]，冲突了，所以添加一个额外参数来标记首行

## 解答

```python
def setZeroes(self, matrix: List[List[int]]) -> None:
    m, n, first_row = len(matrix), len(matrix[0]), False
    for i, j in product(range(m), range(n)):
        if matrix[i][j] == 0:
            if i == 0:
                first_row = True
            else:
                matrix[i][0] = matrix[0][j] = 0
    for i, j in product(range(1, m), range(1, n)):
        if matrix[i][0] == 0 or matrix[0][j] == 0:
            matrix[i][j] = 0
    if matrix[0][0] == 0:
        for i in range(1, m):
            matrix[i][0] = 0
    if first_row:
        matrix[0] = [0] * n
```
44 ms
