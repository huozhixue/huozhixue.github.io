# 1293：网格中的最短路径（1967 分）


> <u>**[力扣第 167 场周赛第 4 题](https://leetcode.cn/problems/shortest-path-in-a-grid-with-obstacles-elimination/)**</u>

## 题目

<p>给你一个 <code>m * n</code> 的网格，其中每个单元格不是 <code>0</code>（空）就是 <code>1</code>（障碍物）。每一步，您都可以在空白单元格中上、下、左、右移动。</p>

<p>如果您 <strong>最多</strong> 可以消除 <code>k</code> 个障碍物，请找出从左上角 <code>(0, 0)</code> 到右下角 <code>(m-1, n-1)</code> 的最短路径，并返回通过该路径所需的步数。如果找不到这样的路径，则返回 <code>-1</code> 。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://pic.leetcode.cn/1700710956-kcxqcC-img_v3_025f_d55a658c-8f40-464b-800f-22ccd27cc9fg.jpg" style="width: 243px; height: 404px;" /></p>

<pre>
<strong>输入：</strong> grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1
<strong>输出：</strong>6
<strong>解释：
</strong>不消除任何障碍的最短路径是 10。
消除位置 (3,2) 处的障碍后，最短路径是 6 。该路径是 <code>(0,0) -&gt; (0,1) -&gt; (0,2) -&gt; (1,2) -&gt; (2,2) -&gt; <strong>(3,2)</strong> -&gt; (4,2)</code>.
</pre>

<p><strong>示例 2：</strong></p>

<p><img src="https://pic.leetcode.cn/1700710701-uPqkZe-img_v3_025f_0edd50fb-8a70-4a42-add0-f602caaad35g.jpg" style="width: 243px; height: 244px;" /></p>

<pre>
<strong>输入：</strong>grid = [[0,1,1],[1,1,1],[1,0,0]], k = 1
<strong>输出：</strong>-1
<strong>解释：</strong>我们至少需要消除两个障碍才能找到这样的路径。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>grid.length == m</code></li>
<li><code>grid[0].length == n</code></li>
<li><code>1 &lt;= m, n &lt;= 40</code></li>
<li><code>1 &lt;= k &lt;= m*n</code></li>
<li><code>grid[i][j]</code> 是 <code>0</code> 或<strong> </strong><code>1</code></li>
<li><code>grid[0][0] == grid[m-1][n-1] == 0</code></li>
</ul>


**相似问题：**
- [1730：获取食物的最短路径](/leetcode/1730)
- [2290：到达角落需要移除障碍物的最小数目（2137 分）](/leetcode/2290)


## 分析

### #1

将 （当前位置，经过障碍数）看作状态，即是典型的 bfs 问题

```python
class Solution:
    def shortestPath(self, grid: List[List[int]], k: int) -> int:
        m,n = len(grid),len(grid[0])
        Q = deque([(0,0,0,k)])
        vis = {(0,0,k)}
        while Q:
            w,i,j,k = Q.popleft()
            if (i,j)==(m-1,n-1):
                return w
            for x,y in [(i-1,j),(i,j-1),(i+1,j),(i,j+1)]:
                if 0<=x<m and 0<=y<n:
                    k2 = k-grid[x][y]
                    if k2>=0 and (x,y,k2) not in vis:
                        vis.add((x,y,k2))
                        Q.append((w+1,x,y,k2))
        return -1
```
467 ms

### #2

针对 k 有个剪枝：
- 若没有障碍，最短即是 m+n-2，除起始点外经过 m+n-3 个格子
- 因此若 k>=m+n-3，直接返回即可

## 解答

```python
class Solution:
    def shortestPath(self, grid: List[List[int]], k: int) -> int:
        m,n = len(grid),len(grid[0])
        if k>=m+n-3:
            return m+n-2
        Q = deque([(0,0,0,k)])
        vis = {(0,0,k)}
        while Q:
            w,i,j,k = Q.popleft()
            if (i,j)==(m-1,n-1):
                return w
            for x,y in [(i-1,j),(i,j-1),(i+1,j),(i,j+1)]:
                if 0<=x<m and 0<=y<n:
                    k2 = k-grid[x][y]
                    if k2>=0 and (x,y,k2) not in vis:
                        vis.add((x,y,k2))
                        Q.append((w+1,x,y,k2))
        return -1
```
7 ms

