# 0778：水位上升的泳池中游泳（2096 分）


> <u>**[力扣第 778 题](https://leetcode.cn/problems/swim-in-rising-water/)**</u>

## 题目

<p>在一个 <code>n x n</code> 的整数矩阵 <code>grid</code> 中，每一个方格的值 <code>grid[i][j]</code> 表示位置 <code>(i, j)</code> 的平台高度。</p>

<p>当开始下雨时，在时间为 <code>t</code> 时，水池中的水位为 <code>t</code> 。你可以从一个平台游向四周相邻的任意一个平台，但是前提是此时水位必须同时淹没这两个平台。假定你可以瞬间移动无限距离，也就是默认在方格内部游动是不耗时的。当然，在你游泳的时候你必须待在坐标方格里面。</p>

<p>你从坐标方格的左上平台 <code>(0，0)</code> 出发。返回 <em>你到达坐标方格的右下平台 <code>(n-1, n-1)</code> 所需的最少时间 。</em></p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/29/swim1-grid.jpg" /></p>

<pre>
<strong>输入:</strong> grid = [[0,2],[1,3]]
<strong>输出:</strong> 3
<strong>解释:</strong>
时间为0时，你位于坐标方格的位置为 <code>(0, 0)。</code>
此时你不能游向任意方向，因为四个相邻方向平台的高度都大于当前时间为 0 时的水位。
等时间到达 3 时，你才可以游向平台 (1, 1). 因为此时的水位是 3，坐标方格中的平台没有比水位 3 更高的，所以你可以游向坐标方格中的任意位置
</pre>

<p><strong>示例 2:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/29/swim2-grid-1.jpg" /></p>

<pre>
<strong>输入:</strong> grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
<strong>输出:</strong> 16
<strong>解释: </strong>最终的路线用加粗进行了标记。
我们必须等到时间为 16，此时才能保证平台 (0, 0) 和 (4, 4) 是连通的
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>n == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= n &lt;= 50</code></li>
<li><code>0 &lt;= grid[i][j] &lt; n<sup>2</sup></code></li>
<li><code>grid[i][j]</code> 中每个值 <strong>均无重复</strong></li>
</ul>


**相似问题：**
- [1631：最小体力消耗路径（1947 分）](/leetcode/1631)


## 分析

- 即是要找一条左上到右下的路径，使得经过的最大值最小
- 这也是一类典型的最短路问题 ，只是路径的值从边权之和变成边权最大值，用 dijkstra 即可

## 解答


```python
class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        n = len(grid)
        pq = [(grid[0][0],0)]
        d = [inf]*n*n
        d[0] = grid[0][0]
        while pq:
            w,u = heappop(pq)
            if u==n*n-1:
                return w
            if w>d[u]:
                continue
            i,j = divmod(u,n)
            for x,y in [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]:
                if 0<=x<n and 0<=y<n:
                    nw,v = max(w,grid[x][y]),x*n+y
                    if nw<d[v]:
                        d[v]=nw
                        heappush(pq,(nw,v))
```
31 ms

## *附加

也可以用并查集，从低到高遍历格子并连通，直到左上和右下连通即可。

```python
class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        def find(x):
            if f[x]!=x:
                f[x] = find(f[x])
            return f[x]
        
        def union(x,y):
            f[find(x)] = find(y)

        n = len(grid)
        f = list(range(n*n))
        for t,i,j in sorted((grid[i][j],i,j) for i in range(n) for j in range(n)):
            for x,y in [(i+1,j),(i-1,j),(i,j+1),(i,j-1)]:
                if 0<=x<n and 0<=y<n and grid[x][y]<t:
                    union(i*n+j,x*n+y)
            if find(0)==find(n*n-1):
                return t
```
35 ms
