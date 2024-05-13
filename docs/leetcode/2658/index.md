# 2658：网格图中鱼的最大数目（★）


> <u>**[力扣第 103 场双周赛第 3 题](https://leetcode.cn/problems/maximum-number-of-fish-in-a-grid/)**</u>

## 题目

<p>给你一个下标从 <strong>0</strong> 开始大小为 <code>m x n</code> 的二维整数数组 <code>grid</code> ，其中下标在 <code>(r, c)</code> 处的整数表示：</p>

<ul>
<li>如果 <code>grid[r][c] = 0</code> ，那么它是一块 <strong>陆地</strong> 。</li>
<li>如果 <code>grid[r][c] &gt; 0</code> ，那么它是一块 <strong>水域</strong> ，且包含 <code>grid[r][c]</code> 条鱼。</li>
</ul>

<p>一位渔夫可以从任意 <strong>水域</strong> 格子 <code>(r, c)</code> 出发，然后执行以下操作任意次：</p>

<ul>
<li>捕捞格子 <code>(r, c)</code> 处所有的鱼，或者</li>
<li>移动到相邻的 <strong>水域</strong> 格子。</li>
</ul>

<p>请你返回渔夫最优策略下， <strong>最多</strong> 可以捕捞多少条鱼。如果没有水域格子，请你返回 <code>0</code> 。</p>

<p>格子 <code>(r, c)</code> <strong>相邻</strong> 的格子为 <code>(r, c + 1)</code> ，<code>(r, c - 1)</code> ，<code>(r + 1, c)</code> 和 <code>(r - 1, c)</code> ，前提是相邻格子在网格图内。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2023/03/29/example.png" style="width: 241px; height: 161px;"></p>

<pre><b>输入：</b>grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]
<b>输出：</b>7
<b>解释：</b>渔夫可以从格子 <code>(1,3)</code> 出发，捕捞 3 条鱼，然后移动到格子 <code>(2,3)</code> ，捕捞 4 条鱼。
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode.com/uploads/2023/03/29/example2.png"></p>

<pre><b>输入：</b>grid = [[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]]
<b>输出：</b>1
<b>解释：</b>渔夫可以从格子 (0,0) 或者 (3,3) ，捕捞 1 条鱼。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 10</code></li>
<li><code>0 &lt;= grid[i][j] &lt;= 10</code></li>
</ul>


## 分析

类似 {{< lc "0695" >}}，统计连通块的值之和即可。

## 解答


```python
class Solution:
    def findMaxFish(self, grid: List[List[int]]) -> int:
        def find(x):
            if f[x] != x:
                f[x] = find(f[x])
            return f[x]

        def union(x, y):
            f[find(x)]=find(y)

        m, n = len(grid), len(grid[0])
        f = list(range(m*n))
        sz = [x for row in grid for x in row]
        for i, j in product(range(m), range(n)):
            if grid[i][j]:
                if i and grid[i-1][j]:
                    union(i*n+j,(i-1)*n+j)
                if j and grid[i][j-1]:
                    union(i*n+j,i*n+j-1)
        d = defaultdict(int)
        for i, j in product(range(m), range(n)):
            if grid[i][j]:
                d[find(i*n+j)] += grid[i][j]
        return max(d.values(),default=0)
```
72 ms
