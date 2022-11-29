# 0064：最小路径和（★）


## 题目

给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

示例 1：

![img](https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg)

	输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
	输出：7
	解释：因为路径 1→3→1→1→1 的总和最小。
	
示例 2：

	输入：grid = [[1,2,3],[4,5,6]]
	输出：12

提示：
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 200
- 0 <= grid[i][j] <= 100


## 分析

类似 {{< lc "0062">}}，只是递推关系变成了：

	dp[i][j] = min(dp[-1][j], dp[i][j-1]) + grid[i][j]。

## 解答

```python
def minPathSum(self, grid: List[List[int]]) -> int:
    m, n = len(grid), len(grid[0])
    dp = [float('inf')] * (n + 1)
    for i, j in product(range(1, m + 1), range(1, n + 1)):
        dp[j] = grid[i-1][j-1] + (0 if i==j==1 else min(dp[j], dp[j-1]))
    return dp[-1]
```
36 ms
