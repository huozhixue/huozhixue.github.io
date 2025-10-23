# 0711：不同岛屿的数量 II（★★）


> <u>**[力扣第 711 题](https://leetcode.cn/problems/number-of-distinct-islands-ii/)**</u>

## 题目

<p>给定一个 <code>m x n</code> 二进制数组表示的网格 <code>grid</code> ，一个岛屿由 <strong>四连通</strong> （上、下、左、右四个方向）的 <code>1</code> 组成（代表陆地）。你可以认为网格的四周被海水包围。</p>

<p>如果两个岛屿的形状相同，或者通过旋转（顺时针旋转 90°，180°，270°）、翻转（左右翻转、上下翻转）后形状相同，那么就认为这两个岛屿是相同的。</p>

<p>返回 <em>这个网格中形状 <strong>不同</strong> 的岛屿的数量 </em>。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/05/01/distinctisland2-1-grid.jpg" style="height: 162px; width: 200px;" /></p>

<pre>
<strong>输入:</strong> grid = [[1,1,0,0,0],[1,0,0,0,0],[0,0,0,0,1],[0,0,0,1,1]]
<strong>输出:</strong> 1
<strong>解释:</strong> 这两个是相同的岛屿。因为我们通过 180° 旋转第一个岛屿，两个岛屿的形状相同。
</pre>

<p><strong>示例 2:</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2021/05/01/distinctisland1-1-grid.jpg" style="height: 162px; width: 200px;" /></p>

<pre>
<strong>输入:</strong> grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]
<strong>输出:</strong> 1
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 50</code></li>
<li><code>grid[i][j]</code> 不是 <code>0</code> 就是 <code>1</code>.</li>
</ul>


## 分析

- 考虑对岛屿哈希，以最左上角为原点，所有网格的相对坐标的集合作为哈希值
- 可以取所有旋转翻转操作的最小哈希值作为 key

## 解答

```python
class Solution:
    def numDistinctIslands2(self, grid: List[List[int]]) -> int:
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        flip_directions = [(1, 1), (1, -1), (-1, 1), (-1, -1)]
        m, n = len(grid), len(grid[0])

        def get_shape(shape):

            def encode(shape):
                x, y = shape[0]
                return "".join(str(i - x) + ":" + str(j - y) for i, j in shape)

            shapes = [[(i * a, j * b) for i, j in shape] for a, b in flip_directions]
            shapes += [[(j, i) for i, j in s] for s in shapes]

            return min(encode(sorted(s)) for s in shapes)

        def dfs(i, j):
            grid[i][j] *= -1
            shape = [(i, j)]
            for dx, dy in directions:
                x, y = i + dx, j + dy
                if 0 <= x < m and 0 <= y < n and grid[x][y] == 1:
                    shape += dfs(x, y)
            return shape

        islands = set()
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1:
                    islands.add(get_shape(dfs(i, j)))
        return len(islands)
```
223 ms
