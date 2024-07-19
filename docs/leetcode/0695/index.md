# 0695：岛屿的最大面积（★）


> <u>**[力扣第 695 题](https://leetcode.cn/problems/max-area-of-island/)**</u>

## 题目

<p>给你一个大小为 <code>m x n</code> 的二进制矩阵 <code>grid</code> 。</p>

<p><strong>岛屿</strong> 是由一些相邻的 <code>1</code> (代表土地) 构成的组合，这里的「相邻」要求两个 <code>1</code> 必须在 <strong>水平或者竖直的四个方向上 </strong>相邻。你可以假设 <code>grid</code> 的四个边缘都被 <code>0</code>（代表水）包围着。</p>

<p>岛屿的面积是岛上值为 <code>1</code> 的单元格的数目。</p>

<p>计算并返回 <code>grid</code> 中最大的岛屿面积。如果没有岛屿，则返回面积为 <code>0</code> 。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/05/01/maxarea1-grid.jpg" style="width: 500px; height: 310px;" />
<pre>
<strong>输入：</strong>grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
<strong>输出：</strong>6
<strong>解释：</strong>答案不应该是 <code>11</code> ，因为岛屿只能包含水平或垂直这四个方向上的 <code>1</code> 。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>grid = [[0,0,0,0,0,0,0,0]]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 50</code></li>
<li><code>grid[i][j]</code> 为 <code>0</code> 或 <code>1</code></li>
</ul>


**相似问题：**
- [0200：岛屿数量](/leetcode/0200)
- [0463：岛屿的周长](/leetcode/0463)
- [1727：重新排列后的最大子矩阵（1926 分）](/leetcode/1727)
- [2101：引爆最多的炸弹（1880 分）](/leetcode/2101)


## 分析


类似 {{< lc "0200" >}}，可以用并查集，最终统计连通块的大小即可。

## 解答

```python
class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        def find(x):
            if f[x] != x:
                f[x] = find(f[x])
            return f[x]

        def union(x, y):
            f[find(x)] = find(y)

        m, n = len(grid), len(grid[0])
        f = list(range(m*n))
        for i, j in product(range(m), range(n)):
            if grid[i][j] == 1:
                if i and grid[i-1][j] == 1:
                    union(i*n+j,(i-1)*n+j)
                if j and grid[i][j-1] == 1:
                    union(i*n+j,i*n+j-1)
        ct = Counter(find(x) for x in range(m*n) if grid[x//n][x%n]==1)
        return max(ct.values(),default=0)
```
67 ms

