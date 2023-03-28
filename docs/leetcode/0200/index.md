# 0200：岛屿数量（★）


> <u>**[力扣第 200 题](https://leetcode.cn/problems/number-of-islands/)**</u>

## 题目

<p>给你一个由 <code>'1'</code>（陆地）和 <code>'0'</code>（水）组成的的二维网格，请你计算网格中岛屿的数量。</p>

<p>岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。</p>

<p>此外，你可以假设该网格的四条边均被水包围。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>grid = [
["1","1","1","1","0"],
["1","1","0","1","0"],
["1","1","0","0","0"],
["0","0","0","0","0"]
]
<strong>输出：</strong>1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>grid = [
["1","1","0","0","0"],
["1","1","0","0","0"],
["0","0","1","0","0"],
["0","0","0","1","1"]
]
<strong>输出：</strong>3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 <= m, n <= 300</code></li>
<li><code>grid[i][j]</code> 的值为 <code>'0'</code> 或 <code>'1'</code></li>
</ul>


## 分析

本题可以用 dfs/bfs 遍历找到每一个岛。

不过连通问题一般还是用并查集，方便进阶问题的解决。
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
