# 0505：迷宫 II（★）


> <u>**[力扣第 505 题](https://leetcode.cn/problems/the-maze-ii/)**</u>

## 题目

<p><strong>迷宫</strong>中有一个球，它有空地 (表示为 <code>0</code>) 和墙 (表示为 <code>1</code>)。球可以<strong>向上</strong>、<strong>向下</strong>、<strong>向左</strong>或<strong>向右</strong>滚过空地，但直到撞上墙之前它都不会停止滚动。当球停止时，它才可以选择下一个滚动方向。</p>

<p>给定 <code>m × n</code> 的<strong>迷宫</strong>(<code>maze</code>)，球的<strong>起始位置 </strong>(<code>start = [start<sub>row</sub>, start<sub>col</sub>]</code>) 和<strong>目的地 </strong>(<code>destination = [destination<sub>row</sub>, destination<sub>col</sub>]</code>)，返回球在<strong>目的地 </strong>(<code>destination</code>) 停止的最短<strong>距离</strong>。如果球不能在<strong>目的地 </strong>(<code>destination</code>) 停止，返回 <code>-1</code>。</p>

<p><strong>距离</strong>是指球从起始位置 ( 不包括 ) 到终点 ( 包括 ) 所经过的<strong>空地</strong>数。</p>

<p>你可以假设<strong>迷宫的边界都是墙 </strong>( 见例子 )。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/31/maze1-1-grid.jpg" /></p>

<pre>
<strong>输入:</strong> maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
<strong>输出:</strong> 12
<strong>解析:</strong> 一条最短路径 : left -&gt; down -&gt; left -&gt; down -&gt; right -&gt; down -&gt; right。
总距离为 1 + 1 + 3 + 1 + 2 + 2 + 2 = 12。

</pre>

<p><strong>示例 2:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/03/31/maze1-2-grid.jpg" /></p>

<pre>
<strong>输入:</strong> maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [3,2]
<strong>输出:</strong> -1
<strong>解析:</strong> 球不可能在目的地停下来。注意，你可以经过目的地，但不能在那里停下来。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> maze = [[0,0,0,0,0],[1,1,0,0,1],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,0]], start = [4,3], destination = [0,1]
<strong>输出:</strong> -1
</pre>



<p><strong>注意:</strong></p>

<ul>
<li><code>m == maze.length</code></li>
<li><code>n == maze[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 100</code></li>
<li><code>maze[i][j]</code> 是 <code>0</code> 或 <code>1</code>.</li>
<li><code>start.length == 2</code></li>
<li><code>destination.length == 2</code></li>
<li><code>0 &lt;= start<sub>row</sub>, destination<sub>row</sub> &lt; m</code></li>
<li><code>0 &lt;= start<sub>col</sub>, destination<sub>col</sub> &lt; n</code></li>
<li>球和目的地都存在于一个空地中，它们最初不会处于相同的位置。</li>
<li>
<p data-group="1-1">迷宫<strong>至少包含两个空地</strong>。</p>
</li>
</ul>


## 分析

## 解答

```python
    def shortestDistance(self, maze: List[List[int]], start: List[int], destination: List[int]) -> int:
        m, n = len(maze), len(maze[0])
        d, pq = {}, [(0, start[0], start[1])]
        while pq:
            w, i, j = heappop(pq)
            if (i, j) in d:
                continue
            if [i, j] == destination:
                return w
            d[(i, j)] = w
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                x, y, w2 = i, j, w
                while 0<=x+dx<m and 0<=y+dy<n and maze[x+dx][y+dy]==0:
                    x, y, w2 = x+dx, y+dy, w2+1
                if (x, y) not in d:
                    heappush(pq, (w2, x, y))
        return -1
```

100 ms
