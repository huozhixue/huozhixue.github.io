# 1034：边界着色（1578 分）


> <u>**[力扣第 134 场周赛第 2 题](https://leetcode.cn/problems/coloring-a-border/)**</u>

## 题目

<p>给你一个大小为 <code>m x n</code> 的整数矩阵 <code>grid</code> ，表示一个网格。另给你三个整数 <code>row</code>、<code>col</code> 和 <code>color</code> 。网格中的每个值表示该位置处的网格块的颜色。</p>

<p>如果两个方块在任意 4 个方向上相邻，则称它们 <strong>相邻 </strong>。</p>

<p>如果两个方块具有相同的颜色且相邻，它们则属于同一个 <strong>连通分量</strong> 。</p>

<p><strong>连通分量的边界</strong><strong> </strong>是指连通分量中满足下述条件之一的所有网格块：</p>

<ul>
<li>在上、下、左、右任意一个方向上与不属于同一连通分量的网格块相邻</li>
<li>在网格的边界上（第一行/列或最后一行/列）</li>
</ul>

<p>请你使用指定颜色 <code>color</code> 为所有包含网格块 <code>grid[row][col]</code> 的 <strong>连通分量的边界</strong> 进行着色。</p>

<p>并返回最终的网格 <code>grid</code> 。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>grid = [[1,1],[1,2]], row = 0, col = 0, color = 3
<strong>输出：</strong>[[3,3],[3,2]]</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>grid = [[1,2,2],[2,3,2]], row = 0, col = 1, color = 3
<strong>输出：</strong>[[1,3,3],[2,3,3]]</pre>

<p><strong class="example">示例 3：</strong></p>

<pre>
<strong>输入：</strong>grid = [[1,1,1],[1,1,1],[1,1,1]], row = 1, col = 1, color = 2
<strong>输出：</strong>[[2,2,2],[2,1,2],[2,2,2]]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 50</code></li>
<li><code>1 &lt;= grid[i][j], color &lt;= 1000</code></li>
<li><code>0 &lt;= row &lt; m</code></li>
<li><code>0 &lt;= col &lt; n</code></li>
</ul>


**相似问题：**
- [0463：岛屿的周长](/leetcode/0463)


## 分析

连通问题，依然可以用并查集，连通后，遍历 (row,col) 所在连通块的格子，判断是否边界即可。

## 解答


```python
class Solution:
    def colorBorder(self, grid: List[List[int]], row: int, col: int, color: int) -> List[List[int]]:
        def find(x):
            if f[x] != x:
                f[x] = find(f[x])
            return f[x]

        def union(x, y):
            f[find(x)] = find(y)

        m, n = len(grid), len(grid[0])
        f = list(range(m*n))
        for i, j in product(range(m), range(n)):
            a = grid[i][j]
            if i and grid[i-1][j]==a:
                union(i*n+j,(i-1)*n+j)
            if j and grid[i][j-1]==a:
                union(i*n+j,i*n+j-1)
        res,fa = [],find(row*n+col)
        for i, j in product(range(m), range(n)):
            if find(i*n+j)==fa:
                for x,y in [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]:
                    if not (0<=x<m and 0<=y<n and find(x*n+y)==fa):
                        res.append((i,j))
                        break
        for i,j in res:
            grid[i][j] = color
        return grid
```
59 ms
