# 1368：使网格图至少有一条有效路径的最小代价（2068 分）


> <u>**[力扣第 178 场周赛第 4 题](https://leetcode.cn/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/)**</u>

## 题目

<p>给你一个 m x n 的网格图 <code>grid</code> 。 <code>grid</code> 中每个格子都有一个数字，对应着从该格子出发下一步走的方向。 <code>grid[i][j]</code> 中的数字可能为以下几种情况：</p>

<ul>
<li><strong>1</strong> ，下一步往右走，也就是你会从 <code>grid[i][j]</code> 走到 <code>grid[i][j + 1]</code></li>
<li><strong>2</strong> ，下一步往左走，也就是你会从 <code>grid[i][j]</code> 走到 <code>grid[i][j - 1]</code></li>
<li><strong>3</strong> ，下一步往下走，也就是你会从 <code>grid[i][j]</code> 走到 <code>grid[i + 1][j]</code></li>
<li><strong>4</strong> ，下一步往上走，也就是你会从 <code>grid[i][j]</code> 走到 <code>grid[i - 1][j]</code></li>
</ul>

<p>注意网格图中可能会有 <strong>无效数字</strong> ，因为它们可能指向 <code>grid</code> 以外的区域。</p>

<p>一开始，你会从最左上角的格子 <code>(0,0)</code> 出发。我们定义一条 <strong>有效路径</strong> 为从格子 <code>(0,0)</code> 出发，每一步都顺着数字对应方向走，最终在最右下角的格子 <code>(m - 1, n - 1)</code> 结束的路径。有效路径 <strong>不需要是最短路径</strong> 。</p>

<p>你可以花费 <code>cost = 1</code> 的代价修改一个格子中的数字，但每个格子中的数字 <strong>只能修改一次</strong> 。</p>

<p>请你返回让网格图至少有一条有效路径的最小代价。</p>



<p><strong>示例 1：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/02/29/grid1.png" style="height: 528px; width: 542px;"></p>

<pre><strong>输入：</strong>grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]
<strong>输出：</strong>3
<strong>解释：</strong>你将从点 (0, 0) 出发。
到达 (3, 3) 的路径为： (0, 0) --&gt; (0, 1) --&gt; (0, 2) --&gt; (0, 3) 花费代价 cost = 1 使方向向下 --&gt; (1, 3) --&gt; (1, 2) --&gt; (1, 1) --&gt; (1, 0) 花费代价 cost = 1 使方向向下 --&gt; (2, 0) --&gt; (2, 1) --&gt; (2, 2) --&gt; (2, 3) 花费代价 cost = 1 使方向向下 --&gt; (3, 3)
总花费为 cost = 3.
</pre>

<p><strong>示例 2：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/02/29/grid2.png" style="height: 408px; width: 419px;"></p>

<pre><strong>输入：</strong>grid = [[1,1,3],[3,2,2],[1,1,4]]
<strong>输出：</strong>0
<strong>解释：</strong>不修改任何数字你就可以从 (0, 0) 到达 (2, 2) 。
</pre>

<p><strong>示例 3：</strong></p>

<p><img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/02/29/grid3.png" style="height: 302px; width: 314px;"></p>

<pre><strong>输入：</strong>grid = [[1,2],[4,3]]
<strong>输出：</strong>1
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>grid = [[2,2,2],[2,2,2]]
<strong>输出：</strong>3
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>grid = [[4]]
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 100</code></li>
</ul>


**相似问题：**
- [2203：得到要求路径的最小带权子图（2364 分）](/leetcode/2203)
- [2556：二进制矩阵中翻转最多一次使路径不连通（2368 分）](/leetcode/2556)


## 分析

- 相邻格子按是否需要修改看作代价 0 和 1，即是典型的最短路问题
- 由于代价只有 01，可以用 01bfs
	- 01bfs 和 dijkstra 的区别仅在于一个用队列，一个用堆
## 解答

```python
class Solution:
    def minCost(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        Q = deque([(0, 0, 0)])
        d = defaultdict(lambda:inf)
        while Q:
            w,i,j = Q.popleft()
            if (i,j)==(m-1,n-1):
                return w
            if w>d[(i,j)]:
                continue
            for x,y,p in [(i,j+1,1),(i,j-1,2),(i+1,j,3),(i-1,j,4)]:
                if 0<=x<m and 0<=y<n:
                    if grid[i][j]==p:
                        if w<d[(x,y)]:
                            d[(x,y)] = w
                            Q.appendleft((w,x,y))
                    elif w+1<d[(x,y)]:
                        d[(x,y)] = w+1
                        Q.append((w+1,x,y))
```
151 ms


