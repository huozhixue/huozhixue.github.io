# 0317：离建筑物最近的距离（★★）


> <u>**[力扣第 317 题](https://leetcode.cn/problems/shortest-distance-from-all-buildings/)**</u>

## 题目

<p>给你一个 <code>m × n</code> 的网格，值为 <code>0</code> 、 <code>1</code> 或 <code>2</code> ，其中:</p>

<ul>
<li>每一个 <code>0</code> 代表一块你可以自由通过的 <strong>空地</strong> </li>
<li>每一个 <code>1</code> 代表一个你不能通过的 <strong>建筑</strong></li>
<li>每个 <code>2</code> 标记一个你不能通过的 <strong>障碍</strong> </li>
</ul>

<p>你想要在一块空地上建造一所房子，在 <strong>最短的总旅行距离</strong> 内到达所有的建筑。你只能上下左右移动。</p>

<p>返回到该房子的 <strong>最短旅行距离</strong> 。如果根据上述规则无法建造这样的房子，则返回 <code>-1</code> 。</p>

<p><strong>总旅行距离 </strong>是朋友们家到聚会地点的距离之和。</p>

<p>使用 <strong>曼哈顿距离</strong> 计算距离，其中距离 <code>(p1, p2) = |p2.x - p1.x | + | p2.y - p1.y |</code> 。</p>



<p><strong>示例  1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/14/buildings-grid.jpg" /></p>

<pre>
<strong>输入：</strong>grid = [[1,0,2,0,1],[0,0,0,0,0],[0,0,1,0,0]]
<strong>输出：</strong>7
<strong>解析：</strong>给定<code>三个建筑物 (0,0)、</code><code>(0,4) 和</code> <code>(2,2) 以及一个</code>位于 <code>(0,2) 的障碍物。
由于总距离之和 3+3+1=7 最优，所以位置</code> <code>(1,2)</code> 是符合要求的最优地点。
故返回7。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> grid = [[1,0]]
<strong>输出:</strong> 1
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> grid = [[1]]
<strong>输出:</strong> -1
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 50</code></li>
<li><code>grid[i][j]</code> 是 <code>0</code>, <code>1</code> 或 <code>2</code></li>
<li><code>grid</code> 中 <strong>至少</strong> 有 <strong>一幢</strong> 建筑</li>
</ul>


## 分析

典型的 bfs。从每个建筑开始遍历，求得空地到每个建筑的距离，总和最小的空地即为所求。

遍历时，注意记录空地能到达的建筑个数，若小于总建筑个数，则不符合要求
- 可以直接用grid 记录，为了与障碍区分，可以记录为负数

## 解答

```python
class Solution:
    def shortestDistance(self, grid: List[List[int]]) -> int:
        def bfs(i,j,k):
            Q, vis = deque([(0,i,j)]), {(i,j)}
            while Q:
                w,i,j = Q.popleft()
                for x,y in [(i+1,j),(i-1,j),(i,j+1),(i,j-1)]:
                    if 0<=x<m and 0<=y<n and grid[x][y]==-k:
                        Q.append((w+1,x,y))
                        grid[x][y]-=1
                        dis[(x,y)] += w+1

        m, n = len(grid), len(grid[0])
        dis, k = defaultdict(int), 0
        for i,j in product(range(m),range(n)):
            if grid[i][j]==1:
                bfs(i,j,k)
                k += 1
        return min([w for (x,y),w in dis.items() if grid[x][y]==-k],default=-1)
```
2640  ms



