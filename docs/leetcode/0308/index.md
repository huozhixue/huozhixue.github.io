# 0308：二维区域和检索 - 可变（★★）


## 题目

给你一个二维矩阵 matrix ，你需要处理下面两种类型的若干次查询：
- 更新：更新 matrix 中某个单元的值。
- 求和：计算矩阵 matrix 中某一矩形区域元素的 和 ，该区域由 左上角 (row1, col1) 和 
右下角 (row2, col2) 界定。

实现 NumMatrix 类：
- NumMatrix(int[][] matrix) 用整数矩阵 matrix 初始化对象。
- void update(int row, int col, int val) 更新 matrix[row][col] 的值到 val 。
- int sumRegion(int row1, int col1, int row2, int col2) 返回矩阵 matrix 中指定矩形区域元素的 和 ，
该区域由 左上角 (row1, col1) 和 右下角 (row2, col2) 界定。
 

示例 1：

![img](https://assets.leetcode.com/uploads/2021/03/14/summut-grid.jpg)

	输入
	["NumMatrix", "sumRegion", "update", "sumRegion"]
	[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], 
	[2, 1, 4, 3], [3, 2, 2], [2, 1, 4, 3]]
	输出
	[null, 8, null, 10]

	解释
	NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], 
	[4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
	numMatrix.sumRegion(2, 1, 4, 3); // 返回 8 (即, 左侧红色矩形的和)
	numMatrix.update(3, 2, 2);       // 矩阵从左图变为右图
	numMatrix.sumRegion(2, 1, 4, 3); // 返回 10 (即，右侧红色矩形的和)
 

提示：
- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 200
- -10^5 <= matrix[i][j] <= 10^5
- 0 <= row < m
- 0 <= col < n
- -10^5 <= val <= 10^5
- 0 <= row1 <= row2 < m
- 0 <= col1 <= col2 < n
- 最多调用 10^4 次 sumRegion 和 update 方法


## 分析

{{< lc "0304" >}} 升级版，元素不固定了。

朴素的想法是维护每一行的前缀和即可，update 时间 O(N)，sumRegion 时间 O(M)。

## 解答

```python
class NumMatrix:

    def __init__(self, matrix: List[List[int]]):
        self.matrix = matrix
        self.P = [list(accumulate([0]+sub)) for sub in matrix]

    def update(self, row: int, col: int, val: int) -> None:
        self.matrix[row][col] = val
        self.P[row] = list(accumulate([0]+self.matrix[row]))

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return sum(self.P[r][col2+1]-self.P[r][col1] for r in range(row1, row2+1))
```
52 ms

## *附加

类似 {{< lc "0307" >}} ，也可以用树状数组解决，采用二维树状数组。

```python
class NumMatrix:

    def __init__(self, matrix: List[List[int]]):
        m, n = len(matrix), len(matrix[0])
        self.matrix = matrix
        self.tree = [[0]*(n+1) for _ in range(m+1)]
        for i, j in product(range(m), range(n)):
            self.add(i+1, j+1, matrix[i][j])

    def lowbit(self, x):
        return x & -x

    def add(self, i, j, x):
        while i < len(self.tree):
            k = j
            while k < len(self.tree[0]):
                self.tree[i][k] += x
                k += self.lowbit(k)
            i += self.lowbit(i)

    def query(self, i, j):
        res = 0
        while i:
            k = j
            while k:
                res += self.tree[i][k]
                k -= self.lowbit(k)
            i -= self.lowbit(i)
        return res

    def update(self, row: int, col: int, val: int) -> None:
        self.add(row+1, col+1, val-self.matrix[row][col])
        self.matrix[row][col] = val

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return self.query(row2+1, col2+1)-self.query(row1, col2+1)-self.query(row2+1, col1)+self.query(row1, col1)
```
320 ms

