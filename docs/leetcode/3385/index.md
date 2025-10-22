# 3385：破解锁的最少时间 II（★★）


> <u>**[力扣第 3385 题](https://leetcode.cn/problems/minimum-time-to-break-locks-ii/)**</u>

## 题目

<p>Bob 被困在了一个地窖里，他需要破解 <code>n</code> 个锁才能逃出地窖，每一个锁都需要一定的 <strong>能量</strong> 才能打开。每一个锁需要的能量存放在一个数组 <code>strength</code> 里，其中 <code>strength[i]</code> 表示打开第 <code>i</code> 个锁需要的能量。</p>

<p>Bob 有一把剑，它具备以下的特征：</p>

<ul>
<li>一开始剑的能量为 0 。</li>
<li>剑的能量增加因子 <code><font face="monospace">X</font></code> 一开始的值为 1 。</li>
<li>每分钟，剑的能量都会增加当前的 <code>X</code> 值。</li>
<li>打开第 <code>i</code> 把锁，剑的能量需要到达 <strong>至少</strong> <code>strength[i]</code> 。</li>
<li>打开一把锁以后，剑的能量会变回 0 ，<code>X</code> 的值会增加 1。</li>
</ul>

<p>你的任务是打开所有 <code>n</code> 把锁并逃出地窖，请你求出需要的 <strong>最少</strong> 分钟数。</p>

<p>请你返回 Bob<strong> </strong>打开所有 <code>n</code> 把锁需要的 <strong>最少</strong> 时间。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>strength = [3,4,1]</span></p>

<p><span class="example-io"><b>输出：</b>4</span></p>

<p><b>解释：</b></p>

<table style="border: 1px solid black;">
<tbody>
<tr>
<th style="border: 1px solid black;">时间</th>
<th style="border: 1px solid black;">能量</th>
<th style="border: 1px solid black;">X</th>
<th style="border: 1px solid black;">操作</th>
<th style="border: 1px solid black;">更新后的 X</th>
</tr>
<tr>
<td style="border: 1px solid black;">0</td>
<td style="border: 1px solid black;">0</td>
<td style="border: 1px solid black;">1</td>
<td style="border: 1px solid black;">什么也不做</td>
<td style="border: 1px solid black;">1</td>
</tr>
<tr>
<td style="border: 1px solid black;">1</td>
<td style="border: 1px solid black;">1</td>
<td style="border: 1px solid black;">1</td>
<td style="border: 1px solid black;">打开第 3 把锁</td>
<td style="border: 1px solid black;">2</td>
</tr>
<tr>
<td style="border: 1px solid black;">2</td>
<td style="border: 1px solid black;">2</td>
<td style="border: 1px solid black;">2</td>
<td style="border: 1px solid black;">什么也不做</td>
<td style="border: 1px solid black;">2</td>
</tr>
<tr>
<td style="border: 1px solid black;">3</td>
<td style="border: 1px solid black;">4</td>
<td style="border: 1px solid black;">2</td>
<td style="border: 1px solid black;">打开第 2 把锁</td>
<td style="border: 1px solid black;">3</td>
</tr>
<tr>
<td style="border: 1px solid black;">4</td>
<td style="border: 1px solid black;">3</td>
<td style="border: 1px solid black;">3</td>
<td style="border: 1px solid black;">打开第 1 把锁</td>
<td style="border: 1px solid black;">3</td>
</tr>
</tbody>
</table>

<p>无法用少于 4 分钟打开所有的锁，所以答案为 4 。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><span class="example-io"><b>输入：</b>strength = [2,5,4]</span></p>

<p><span class="example-io"><b>输出：</b>6</span></p>

<p><b>解释：</b></p>

<table style="border: 1px solid black;">
<tbody>
<tr>
<th style="border: 1px solid black;">时间</th>
<th style="border: 1px solid black;">能量</th>
<th style="border: 1px solid black;">X</th>
<th style="border: 1px solid black;">操作</th>
<th style="border: 1px solid black;">更新后的 X</th>
</tr>
<tr>
<td style="border: 1px solid black;">0</td>
<td style="border: 1px solid black;">0</td>
<td style="border: 1px solid black;">1</td>
<td style="border: 1px solid black;">什么也不做</td>
<td style="border: 1px solid black;">1</td>
</tr>
<tr>
<td style="border: 1px solid black;">1</td>
<td style="border: 1px solid black;">1</td>
<td style="border: 1px solid black;">1</td>
<td style="border: 1px solid black;">什么也不做</td>
<td style="border: 1px solid black;">1</td>
</tr>
<tr>
<td style="border: 1px solid black;">2</td>
<td style="border: 1px solid black;">2</td>
<td style="border: 1px solid black;">1</td>
<td style="border: 1px solid black;">打开第 1 把锁</td>
<td style="border: 1px solid black;">2</td>
</tr>
<tr>
<td style="border: 1px solid black;">3</td>
<td style="border: 1px solid black;">2</td>
<td style="border: 1px solid black;">2</td>
<td style="border: 1px solid black;">什么也不做</td>
<td style="border: 1px solid black;">2</td>
</tr>
<tr>
<td style="border: 1px solid black;">4</td>
<td style="border: 1px solid black;">4</td>
<td style="border: 1px solid black;">2</td>
<td style="border: 1px solid black;">打开第 3 把锁</td>
<td style="border: 1px solid black;">3</td>
</tr>
<tr>
<td style="border: 1px solid black;">5</td>
<td style="border: 1px solid black;">3</td>
<td style="border: 1px solid black;">3</td>
<td style="border: 1px solid black;">什么也不做</td>
<td style="border: 1px solid black;">3</td>
</tr>
<tr>
<td style="border: 1px solid black;">6</td>
<td style="border: 1px solid black;">6</td>
<td style="border: 1px solid black;">3</td>
<td style="border: 1px solid black;">打开第 2 把锁</td>
<td style="border: 1px solid black;">4</td>
</tr>
</tbody>
</table>

<p>无法用少于 6 分钟打开所有的锁，所以答案为 6。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == strength.length</code></li>
<li><code>1 &lt;= n &lt;= 80</code></li>
<li><code>1 &lt;= strength[i] &lt;= 10<sup>6</sup></code></li>
<li><code>n == strength.length</code></li>
</ul>




## 分析

### #1
- 看作 n 个锁和开锁顺序 [0,n-1] 之间的二分图，问题转为求二分图最大权完美匹配
- 可以用最小费用最大流

```python
# 最小费用最大流，EK+dijkstra
class MCMF:
    def __init__(self,N):
        self.g = [[] for _ in range(N)]        # g 是图中每个 u 对应的 v 列表
        self.h = [inf]*N                       # h 是源点 s 到图中每个 u 的势能
        self.d = [inf]*N                       # d 是图中每个 u 离源点 s 的最小费用距离
        self.flow = [0]*N                      # EK 找增广路时，维护经过每个 u 的流量
        self.fa = [-1]*N                       # EK 找增广路时，维护每个 u 的流量来源
        self.N = N

    def add(self,u,v,c,w):                     # 顶点 u 和 v 连边，容量 c，费用 w
        self.g[u].append([v,len(self.g[v]),c,w])
        self.g[v].append([u,len(self.g[u])-1,0,-w])
    
    def spfa(self,s):                          # 预处理源点 s 到图中每个 u 的势能
        self.h[s] = 0
        dq = deque([s])
        inq = [0]*self.N
        inq[s] = 1
        while dq:
            u = dq.popleft()
            inq[u] = 0
            for v,_,c,w in self.g[u]:
                if c>0 and self.h[u]+w<self.h[v]:
                    self.h[v] = self.h[u]+w
                    if not inq[v]:
                        inq[v] = 1
                        dq.append(v)

    def dij(self,s,t):                        # 找单位费用最小的增广路，每条边的费用经过势能转换
        self.d = [inf]*self.N
        self.d[s] = 0
        self.flow[s] = inf
        pq = [(0,s)]
        while pq:
            w,u = heappop(pq)
            if w>self.d[u]:
                continue
            for v,j,c,w2 in self.g[u]:
                nw = w+w2+self.h[u]-self.h[v]
                if c>0 and nw<self.d[v]:
                    self.d[v] = nw
                    self.fa[v] = j
                    self.flow[v] = min(self.flow[u],c)
                    heappush(pq,(nw,v))
        return self.d[t]<inf

    def cal(self,s,t):                        # 重复增广，维护势能
        res = 0
        self.spfa(s)
        while self.dij(s,t):
            a = self.flow[t]
            v = t
            while v!=s:
                j = self.fa[v]
                u,i,_,_ = self.g[v][j]
                self.g[u][i][2] -= a
                self.g[v][j][2] += a
                v = u
            for u in range(self.N):
                self.h[u] += self.d[u]
            res += a*self.h[t]
        return res

class Solution:
    def findMinimumTime(self, strength: List[int]) -> int:
        n = len(strength)
        mcmf = MCMF(n*2+2)
        s,t = n*2,n*2+1
        for i,a in enumerate(strength):
            mcmf.add(s,i,1,0)
            mcmf.add(i+n,t,1,0)
            for j in range(n):
                mcmf.add(i,j+n,1,(a-1)//(j+1)+1)
        return mcmf.cal(s,t)
```
2411 ms
### #2

- 用匈牙利算法更快
## 解答


```python
# 二分图最大权完美匹配，匈牙利
def KM(g,n):                   # g 是 n-n 完全二分图的权值
    def bfs(i): 
        slack = [inf]*n
        vis = [0]*(n+1)
        pre = [-1]*n
        j = nj =-1
        d[j] = i
        while d[j] != -1:
            delta = inf
            x = d[j]
            vis[j] = 1
            for y in range(n):
                if vis[y]:
                    continue
                tmp = lx[x]+ly[y]-g[x][y]
                if slack[y] > tmp:
                    slack[y] = tmp
                    pre[y] = j
                if slack[y] < delta:
                    delta = slack[y]
                    nj = y
            lx[i] -= delta
            for y in range(n):
                if vis[y]:
                    lx[d[y]] -= delta
                    ly[y] += delta
                else:
                    slack[y] -= delta
            j = nj
        while j!=-1:
            d[j] = d[pre[j]]
            j = pre[j]

    d = [-1]*(n+1)
    lx = [max(row) for row in g]
    ly = [0]*n
    for i in range(n):
        bfs(i)
    return sum(g[d[y]][y] for y in range(n))


class Solution:
    def findMinimumTime(self, strength: List[int]) -> int:
        n = len(strength)
        g = [[0]*n for _ in range(n)]
        for i,a in enumerate(strength):
            for j in range(n):
                g[i][j] = -((a-1)//(j+1)+1)
        return -KM(g,n)
```
399 ms
