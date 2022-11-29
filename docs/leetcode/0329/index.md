# 0329：矩阵中的最长递增路径（★★）


## 题目

给定一个 m x n 整数矩阵 matrix ，找出其中 最长递增路径 的长度。

对于每个单元格，你可以往上，下，左，右四个方向移动。 你 不能 在 对角线 方向上移动或移动到 边界外（即不允许环绕）。

示例 1：

![img](https://assets.leetcode.com/uploads/2021/01/05/grid1.jpg)

    输入：matrix = [[9,9,4],[6,6,8],[2,1,1]]
    输出：4 
    解释：最长递增路径为 [1, 2, 6, 9]。

示例 2：

![img](https://assets.leetcode.com/uploads/2021/01/27/tmp-grid.jpg)

    输入：matrix = [[3,4,5],[3,2,6],[2,2,1]]
    输出：4 
    解释：最长递增路径是 [3, 4, 5, 6]。注意不允许在对角线方向上移动。

示例 3：

    输入：matrix = [[1]]
    输出：1

提示：
- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 200
- 0 <= matrix[i][j] <= 2^31 - 1

## 分析

显然路径中不存在环，所以直接递归每个点出发的最长路径即可。

## 解答

```python
def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
    @lru_cache(None)
    def dfs(i, j):
        res = 1
        for x, y in [(i-1, j), (i+1, j), (i, j-1), (i, j+1)]:
            if 0<=x<m and 0<=y<n and matrix[i][j]<matrix[x][y]:
                res = max(res, 1+dfs(x, y))
        return res

    m, n = len(matrix), len(matrix[0])
    return max(dfs(i, j) for i in range(m) for j in range(n))
```
268 ms

