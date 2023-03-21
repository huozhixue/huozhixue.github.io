# 0463：岛屿的周长


> <u>**[力扣第 10  场周赛第 1 题](https://leetcode.cn/problems/island-perimeter/)**</u>

## 题目

<p>给定一个 <code>row x col</code> 的二维网格地图 <code>grid</code> ，其中：<code>grid[i][j] = 1</code> 表示陆地， <code>grid[i][j] = 0</code> 表示水域。</p>

<p>网格中的格子 <strong>水平和垂直</strong> 方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。</p>

<p>岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/12/island.png" /></p>

<pre>
<strong>输入：</strong>grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
<strong>输出：</strong>16
<strong>解释：</strong>它的周长是上面图片中的 16 个黄色的边</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>grid = [[1]]
<strong>输出：</strong>4
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>grid = [[1,0]]
<strong>输出：</strong>4
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>row == grid.length</code></li>
<li><code>col == grid[i].length</code></li>
<li><code>1 <= row, col <= 100</code></li>
<li><code>grid[i][j]</code> 为 <code>0</code> 或 <code>1</code></li>
</ul>


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


