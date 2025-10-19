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

- 看作 n 个锁和开锁顺序 [0,n-1] 之间的二分图，问题转为求二分图最大权完美匹配
- 可以用匈牙利算法，也可以用最小费用最大流

## 解答


```python
# 最小费用最大流
class Dinic:
    def __init__(self,N):
        self.g = [[] for _ in range(N)]          # g 是图中每个 u 对应的 v 列表
        self.h = [inf]*N                        # h 是图中每个 u 离源点 s 的距离
        self.p = [0]*N              # p 是当前弧优化，跳过已增广的边
        self.vis = [0]*N
        self.N = N

    def add(self,u,v,c,w):                  # 顶点 u 和 v 连边，容量 c，费用 w
        self.g[u].append([v,len(self.g[v]),c,w])
        self.g[v].append([u,len(self.g[u])-1,0,-w])

    def spfa(self,s,t):
        self.h = [inf]*self.N
        self.h[s]=0
        Q, vis = deque([s]), {s}
        while Q:
            u = Q.popleft()
            vis.remove(u)
            for v,_,c,w in self.g[u]:
                if c>0 and self.h[u]+w<self.h[v]:
                    self.h[v] = self.h[u]+w
                    if v not in vis:
                        vis.add(v)
                        Q.append(v)
        return self.h[t]<inf

    def dfs(self,u,t,flow):
        if u==t:
            return flow
        self.vis[u] = 1
        res = 0
        for i in range(self.p[u],len(self.g[u])):
            v,j,c,w = self.g[u][i]
            if c>0 and not self.vis[v] and self.h[v]==self.h[u]+w:
                a = self.dfs(v,t,min(flow,c))
                flow -= a
                self.g[u][i][2]-=a
                self.g[v][j][2]+=a
                res += a
            self.p[u] += 1
        self.vis[u] = 0
        return res

    def cal(self,s,t):
        res = 0
        while self.spfa(s,t):
            res += self.dfs(s,t,inf)*self.h[t]
            self.p = [0]*self.N
        return res


class Solution:
    def findMinimumTime(self, strength: List[int]) -> int:
        n = len(strength)
        dinic = Dinic(n*2+2)
        s,t = n*2,n*2+1
        for i,a in enumerate(strength):
            dinic.add(s,i,1,0)
            dinic.add(i+n,t,1,0)
            for j in range(n):
                dinic.add(i,j+n,1,(a-1)//(j+1)+1)
        return dinic.cal(s,t)
```
8310 ms
