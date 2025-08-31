# 2123：使矩阵中的 1 互不相邻的最小操作数（★★）


> <u>**[力扣第 2123 题](https://leetcode.cn/problems/minimum-operations-to-remove-adjacent-ones-in-matrix/)**</u>

## 题目

<p>给你一个 <strong>下标从 0 开始 </strong>的矩阵 <code>grid</code>。每次操作，你可以把 <code>grid</code> 中的 一个 <code>1</code> 变成 <code>0</code> 。</p>

<p>如果一个矩阵中，没有 <code>1</code> 与其它的 <code>1</code> <strong>四连通</strong>（也就是说所有 <code>1</code> 在上下左右四个方向上不能与其他 <code>1</code> 相邻），那么该矩阵就是 <strong>完全独立</strong> 的。</p>

<p>请返回让 <code>grid</code> 成为 <strong>完全独立</strong> 的矩阵的 <em>最小操作数</em>。</p>



<p><strong>示例 1:</strong></p>
<img src="https://assets.leetcode.com/uploads/2021/12/23/image-20211223181501-1.png" style="width: 644px; height: 250px;">
<pre><strong>输入:</strong> grid = [[1,1,0],[0,1,1],[1,1,1]]
<strong>输出:</strong> 3
<strong>解释:</strong> 可以进行三次操作（把 grid[0][1], grid[1][2] 和 grid[2][1] 变成 0）。
操作后的矩阵中的所有的 1 与其它 1 均不相邻，因此矩阵是完全独立的。
</pre>

<p><strong>示例 2:</strong></p>
<img src="https://assets.leetcode.com/uploads/2021/12/23/image-20211223181518-2.png" style="height: 250px; width: 255px;">
<pre><strong>输入:</strong> grid = [[0,0,0],[0,0,0],[0,0,0]]
<strong>输出:</strong> 0
<strong>解释:</strong> 矩阵中没有 1，此时矩阵也是完全独立的，因此无需操作，返回 0。
</pre>

<p><strong>示例 3:</strong></p>
<img src="https://assets.leetcode.com/uploads/2021/12/23/image-20211223181817-3.png" style="width: 165px; height: 167px;">
<pre><strong>输入:</strong> grid = [[0,1],[1,0]]
<strong>输出:</strong> 0
<strong>解释:</strong> 矩阵中的所有的 1 与其它 1 均不相邻，已经是完全独立的，因此无需操作，返回 0。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>m == grid.length</code></li>
<li><code>n == grid[i].length</code></li>
<li><code>1 &lt;= m, n &lt;= 300</code></li>
<li><code>grid[i][j]</code> 是 <code>0</code> 或者 <code>1</code>.</li>
</ul>


**相似问题：**
- [0073：矩阵置零](/leetcode/0073)
- [0542：01 矩阵](/leetcode/0542)
- [1284：转化为全零矩阵的最少反转次数（1810 分）](/leetcode/1284)
- [2128：通过翻转行或列来去除所有的 1](/leetcode/2128)


## 分析

- 相邻的 1 连边，即是二分图（按i+j的奇偶性分为两边）
- 问题转为求最小点覆盖，即是最大匹配数，可以用网络流解决
## 解答

```python
class Dinic:
    def __init__(self,):
        self.g = defaultdict(list)          # g 是图中每个 u 对应的 v 列表
        self.h = {}                         # h 是图中每个 u 离源点 s 的距离
        self.p = defaultdict(int)           # p 是当前弧优化，跳过已增广的边

    def add(self,u,v,c):                    # 顶点 u 和 v 连边，容量 c
        self.g[u].append([v,len(self.g[v]),c])
        self.g[v].append([u,len(self.g[u])-1,0])

    def bfs(self,s,t):
        self.h = {s:0}
        self.p = defaultdict(int)
        Q = deque([s])
        while Q:
            u = Q.popleft()
            for v,_,c in self.g[u]:
                if v not in self.h and c>0:
                    Q.append(v)
                    self.h[v]=self.h[u]+1
        return t in self.h

    def dfs(self,u,t,flow):
        if u==t:
            return flow
        res = 0
        for i in range(self.p[u],len(self.g[u])):
            v,j,c = self.g[u][i]
            if self.h[v]==self.h[u]+1 and c>0:
                a = self.dfs(v,t,min(flow,c))
                flow -= a
                self.g[u][i][-1]-=a
                self.g[v][j][-1]+=a
                res += a
            self.p[u] += 1
        return res

    def cal(self,s,t):
        res = 0
        while self.bfs(s,t):
            res += self.dfs(s,t,inf)
        return res

class Solution:
    def minimumOperations(self, grid: List[List[int]]) -> int:
        m,n = len(grid),len(grid[0])
        dic = Dinic()
        s,t = m*n,m*n+1
        for i in range(m):
            for j in range(n):
                if grid[i][j]==1:
                    u = i*n+j
                    if (i+j)%2:
                        dic.add(s,u,1)
                    else:
                        dic.add(u,t,1)
                    for x,y in [(i-1,j),(i,j-1)]:
                        if 0<=x<m and 0<=y<n and grid[x][y]==1:
                            v = x*n+y
                            if (i+j)%2:
                                dic.add(u,v,1)
                            else:
                                dic.add(v,u,1)
        return dic.cal(s,t)
```
3463 ms
