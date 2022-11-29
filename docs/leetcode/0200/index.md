# 0200：岛屿数量（★★）


## 题目

给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。


示例 1：

    输入：grid = [
      ["1","1","1","1","0"],
      ["1","1","0","1","0"],
      ["1","1","0","0","0"],
      ["0","0","0","0","0"]
    ]
    输出：1

示例 2：

    输入：grid = [
      ["1","1","0","0","0"],
      ["1","1","0","0","0"],
      ["0","0","1","0","0"],
      ["0","0","0","1","1"]
    ]
    输出：3

提示：
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 300
- grid[i][j] 的值为 '0' 或 '1'



## 分析

本题可以用 dfs/bfs 遍历找到每一个岛。

不过连通问题一般还是用并查集，方便进阶问题的解决。

并查集做法：
- 将相邻的陆地连通
- 最终连通块的个数即是岛屿数量

## 解答

```python
def numIslands(self, grid: List[List[str]]) -> int:
    def find(x):
        if f[x] != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)

    f, m, n = {}, len(grid), len(grid[0])
    for i, j in product(range(m), range(n)):
        if grid[i][j] == '1':
            f[(i, j)] = (i, j)
            if i and grid[i-1][j] == '1':
                union((i-1, j), (i, j))
            if j and grid[i][j-1] == '1':
                union((i, j-1), (i, j))
    return sum(find(x)==x for x in f)
```
188 ms
