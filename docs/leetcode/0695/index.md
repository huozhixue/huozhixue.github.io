# 0695：岛屿的最大面积（★★）


## 题目

给定一个包含了一些 0 和 1 的非空二维数组 grid 。

一个 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在水平或者竖直方向上相邻。
你可以假设 grid 的四个边缘都被 0（代表水）包围着。

找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为 0 。)

注意: 给定的矩阵grid 的长度和宽度都不超过 50。

 
示例 1:
    
    [[0,0,1,0,0,0,0,1,0,0,0,0,0],
     [0,0,0,0,0,0,0,1,1,1,0,0,0],
     [0,1,1,0,1,0,0,0,0,0,0,0,0],
     [0,1,0,0,1,1,0,0,1,0,1,0,0],
     [0,1,0,0,1,1,0,0,1,1,1,0,0],
     [0,0,0,0,0,0,0,0,0,0,1,0,0],
     [0,0,0,0,0,0,0,1,1,1,0,0,0],
     [0,0,0,0,0,0,0,1,1,0,0,0,0]]
    对于上面这个给定矩阵应返回 6。注意答案不应该是 11 ，因为岛屿只能包含水平或垂直的四个方向的 1 。

示例 2:

    [[0,0,0,0,0,0,0,0]]
    对于上面这个给定的矩阵, 返回 0。

 
## 分析

### #1

类似 {{< lc "0200" >}}，只不过从求岛屿数量换成求最大岛屿。
遍历时记录面积即可。

```python
def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
    def dfs(i, j):
        cnt, grid[i][j] = 1, 'M'
        for x, y in [(i - 1, j), (i + 1, j), (i, j - 1), (i, j + 1)]:
            if 0 <= x < m and 0 <= y < n and grid[x][y] == 1:
                cnt += dfs(x, y)
        return cnt

    res, m, n = 0, len(grid), len(grid[0])
    for i, j in product(range(m), range(n)):
        if grid[i][j] == 1:
            res = max(res, dfs(i, j))
    return res
```
60 ms

### #2

也可以用并查集，将相邻的陆地连通。最终统计陆地连通块的大小即可。

## 解答

```python
def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
    def find(x):
        if f.setdefault(x, x) != x:
            f[x] = find(f[x])
        return f[x]

    def union(x, y):
        f[find(x)] = find(y)

    f, m, n = {}, len(grid), len(grid[0])
    for i, j in product(range(m), range(n)):
        if i and grid[i - 1][j] == grid[i][j] == 1:
            union((i - 1, j), (i, j))
        if j and grid[i][j - 1] == grid[i][j] == 1:
            union((i, j - 1), (i, j))
    ct = Counter(find((i, j)) for i, j in product(range(m), range(n)) if grid[i][j] == 1)
    return max(ct.values(), default=0)
```
64 ms

