# 0200：岛屿数量（★★）


## 题目

给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。


提示：

- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 300
- grid[i][j] 的值为 '0' 或 '1'

 <!--more--> 

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
 



## 分析

可以先找到 1 格陆地，遍历相邻的陆地并标记，遍历完毕即得到一个岛屿。
然后再找未标记的陆地，重新遍历。依此类推，即可得到岛屿数量。

## 解答

```python
def numIslands(self, grid: List[List[str]]) -> int:
    def dfs(i, j):
        grid[i][j] = 'M'
        for x, y in [(i-1, j), (i+1, j), (i, j-1), (i, j+1)]:
            if 0<=x<m and 0<=y<n and grid[x][y] == '1':
                dfs(x, y)

    res, m, n = 0, len(grid), len(grid[0])
    for i, j in product(range(m), range(n)):
        if grid[i][j] == '1':
            res += 1
            dfs(i, j)
    return res
```

64 ms

## *附加

也可以用并查集，将相邻的陆地连通，最终陆地连通块的个数即是岛屿数量。

```python
def numIslands(self, grid: List[List[str]]) -> int:
    def find(x):
        if f.setdefault(x, x) != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)

    f, m, n = {}, len(grid), len(grid[0])
    for i, j in product(range(m), range(n)):
        if i and grid[i-1][j] == grid[i][j] == '1':
            union((i-1, j), (i, j))
        if j and grid[i][j-1] == grid[i][j] == '1':
            union((i, j-1), (i, j))
    return sum(grid[i][j]=='1' and find((i,j))==(i,j) for i, j in product(range(m), range(n)))
```
76 ms
