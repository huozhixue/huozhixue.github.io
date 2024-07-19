# 0994：腐烂的橘子（1432 分）


> <u>**[力扣第 124 场周赛第 2 题](https://leetcode.cn/problems/rotting-oranges/)**</u>

## 题目

<p>在给定的 <code>m x n</code> 网格<meta charset="UTF-8" /> <code>grid</code> 中，每个单元格可以有以下三个值之一：</p>

<ul>
<li>值 <code>0</code> 代表空单元格；</li>
<li>值 <code>1</code> 代表新鲜橘子；</li>
<li>值 <code>2</code> 代表腐烂的橘子。</li>
</ul>

<p>每分钟，腐烂的橘子 <strong>周围 4 个方向上相邻</strong> 的新鲜橘子都会腐烂。</p>

<p>返回 <em>直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 <code>-1</code></em> 。</p>



<p><strong>示例 1：</strong></p>

<p><strong><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/02/16/oranges.png" style="height: 137px; width: 650px;" /></strong></p>

<pre>
<strong>输入：</strong>grid = [[2,1,1],[1,1,0],[0,1,1]]
<strong>输出：</strong>4
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>grid = [[2,1,1],[0,1,1],[1,0,1]]
<strong>输出：</strong>-1
<strong>解释：</strong>左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>grid = [[0,2]]
<strong>输出：</strong>0
<strong>解释：</strong>因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 10</code></li>
<li><code>grid[i][j]</code> 仅为 <code>0</code>、<code>1</code> 或 <code>2</code></li>
</ul>


**相似问题：**
- [0286：墙与门](/leetcode/0286)
- [2101：引爆最多的炸弹（1880 分）](/leetcode/2101)
- [2258：逃离火灾（2346 分）](/leetcode/2258)


## 分析

多源bfs，模拟即可。注意最后要判断是否还存在新鲜橘子。

## 解答
```python
class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        m,n = len(grid),len(grid[0])
        Q = deque((i,j,0) for i in range(m) for j in range(n) if grid[i][j]==2)
        w = 0
        while Q:
            i,j,w = Q.popleft()
            for x,y in [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]:
                if 0<=x<m and 0<=y<n and grid[x][y]==1:
                    Q.append((x,y,w+1))
                    grid[x][y] = 2
        return -1 if any(1 in row for row in grid) else w
```

43 ms
