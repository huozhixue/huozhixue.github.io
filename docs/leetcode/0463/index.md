# 0463：岛屿的周长（★）


> **第 10  场周赛第 1 题**

## 题目

给定一个 row x col 的二维网格地图 grid ，其中：grid[i][j] = 1 表示陆地， grid[i][j] = 0 表示水域。

网格中的格子 水平和垂直 方向相连（对角线方向不相连）。整个网格被水完全包围，
但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。

岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。
网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。

提示：
- row == grid.length
- col == grid[i].length
- 1 <= row, col <= 100
- grid[i][j] 为 0 或 1

 
示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/island.png)

	输入：grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
	输出：16
	解释：它的周长是上面图片中的 16 个黄色的边

示例 2：

	输入：grid = [[1]]
	输出：4

示例 3：

	输入：grid = [[1,0]]
	输出：4

## 分析

遍历陆地并去掉相邻陆地的重叠边即可。

## 解答

```python
def islandPerimeter(self, grid: List[List[int]]) -> int:
    res, m, n = 0, len(grid), len(grid[0])
    for i, j in product(range(m), range(n)):
        if grid[i][j]:
            res += 4
            if i and grid[i-1][j]:
                res -= 2
            if j and grid[i][j-1]:
                res -= 2
    return res
```
96 ms


