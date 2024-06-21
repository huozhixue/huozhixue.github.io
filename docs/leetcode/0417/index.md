# 0417：太平洋大西洋水流问题（★）


> <u>**[力扣第 417 题](https://leetcode.cn/problems/pacific-atlantic-water-flow/)**</u>

## 题目

<p>有一个 <code>m × n</code> 的矩形岛屿，与 <strong>太平洋</strong> 和 <strong>大西洋</strong> 相邻。 <strong>“太平洋” </strong>处于大陆的左边界和上边界，而 <strong>“大西洋”</strong> 处于大陆的右边界和下边界。</p>

<p>这个岛被分割成一个由若干方形单元格组成的网格。给定一个 <code>m x n</code> 的整数矩阵 <code>heights</code> ， <code>heights[r][c]</code> 表示坐标 <code>(r, c)</code> 上单元格 <strong>高于海平面的高度</strong> 。</p>

<p>岛上雨水较多，如果相邻单元格的高度 <strong>小于或等于</strong> 当前单元格的高度，雨水可以直接向北、南、东、西流向相邻单元格。水可以从海洋附近的任何单元格流入海洋。</p>

<p>返回网格坐标 <code>result</code> 的 <strong>2D 列表</strong> ，其中 <code>result[i] = [r<sub>i</sub>, c<sub>i</sub>]</code> 表示雨水从单元格 <code>(ri, ci)</code> 流动 <strong>既可流向太平洋也可流向大西洋</strong> 。</p>



<p><strong>示例 1：</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/06/08/waterflow-grid.jpg" /></p>

<pre>
<strong>输入:</strong> heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
<strong>输出:</strong> [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入:</strong> heights = [[2,1],[1,2]]
<strong>输出:</strong> [[0,0],[0,1],[1,0],[1,1]]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>m == heights.length</code></li>
<li><code>n == heights[r].length</code></li>
<li><code>1 &lt;= m, n &lt;= 200</code></li>
<li><code>0 &lt;= heights[r][c] &lt;= 10<sup>5</sup></code></li>
</ul>


## 分析

- 从每个单元格开始遍历，显然会有很多重复路径
- 考虑反过来，从边界往里面遍历
- 多源 dfs/bfs 求出两边的列表，返回交集即可

## 解答


```python
class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        def bfs(A):
            Q,vis = deque(A),set(A)
            while Q:
                i,j = Q.popleft()
                for x,y in [(i+1,j),(i,j+1),(i-1,j),(i,j-1)]:
                    if 0<=x<m and 0<=y<n and H[x][y]>=H[i][j] and (x,y) not in vis:
                        vis.add((x,y))
                        Q.append((x,y))
            return vis
        H = heights
        m,n = len(H),len(H[0])
        A = [(0,j) for j in range(n)]+[(i,0) for i in range(1,m)] 
        B = [(m-1,j) for j in range(n)]+[(i,n-1) for i in range(m-1)]
        return [[i,j] for i,j in bfs(A)&bfs(B)]
```
67 ms
