# 2403：杀死所有怪物的最短时间（★★）


> <u>**[力扣第 2403 题](https://leetcode.cn/problems/minimum-time-to-kill-all-monsters/)**</u>

## 题目

<p>你有一个整数数组 <code>power</code>，其中  <code>power[i]</code> 是第 <code>i</code> 个怪物的力量。</p>

<p>你从 <code>0</code> 点法力值开始，每天获取 <code>gain</code> 点法力值，最初 <code>gain</code> 等于 <code>1</code>。</p>

<p>每天，在获得 <code>gain</code> 点法力值后，如果你的法力值大于或等于怪物的力量，你就可以打败怪物。当你打败怪物时:</p>

<ul>
<li>
<p data-group="1-1">你的法力值会被重置为 <code>0</code>，并且</p>
</li>
<li>
<p data-group="1-1"><code>gain</code> 的值增加 <code>1</code>。</p>
</li>
</ul>

<p>返回<em>打败所有怪物所需的 <strong>最少 </strong>天数。</em></p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> power = [3,1,4]
<strong>输出:</strong> 4
<strong>解释:</strong> 打败所有怪物的最佳方法是:
- 第 1 天: 获得 1 点法力值，现在总共拥有 1 点法力值。用尽所有法力值击杀第 2 个怪物。
- 第 2 天: 获得 2 点法力值，现在总共拥有 2 点法力值。
- 第 3 天: 获得 2 点法力值，现在总共拥有 4 点法力值。用尽所有法力值击杀第 3 个怪物。
- 第 4 天: 获得 3 点法力值，现在总共拥有 3 点法力值。 用尽所有法力值击杀第 1 个怪物。
可以证明，4 天是最少需要的天数。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> power = [1,1,4]
<strong>输出:</strong> 4
<strong>解释:</strong> 打败所有怪物的最佳方法是:
- 第 1 天: 获得 1 点法力值，现在总共拥有 1 点法力值。用尽所有法力值击杀第 1 个怪物。
- 第 2 天: 获得 2 点法力值，现在总共拥有 2 点法力值。用尽所有法力值击杀第 2 个怪物。
- 第 3 天: 获得 3 点法力值，现在总共拥有 3 点法力值。
- 第 4 天: 获得 3 点法力值，现在总共拥有 6 点法力值。用尽所有法力值击杀第 3 个怪物。
可以证明，4 天是最少需要的天数。
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> power = [1,2,4,9]
<strong>输出:</strong> 6
<strong>解释:</strong> 打败所有怪物的最佳方法是:
- 第 1 天: 获得 1 点法力值，现在总共拥有 1 点法力值。用尽所有法力值击杀第 1 个怪物
- 第 2 天: 获得 2 点法力值，现在总共拥有 2 点法力值。用尽所有法力值击杀第 2 个怪物。
- 第 3 天: 获得 3 点法力值，现在总共拥有 3 点法力值。
- 第 4 天: 获得 3 点法力值，现在总共拥有 6 点法力值。
- 第 5 天: 获得 3 点法力值，现在总共拥有 9 点法力值。用尽所有法力值击杀第 4 个怪物。
- 第 6 天: 获得 4 点法力值，现在总共拥有 4 点法力值。用尽所有法力值击杀第 3 个怪物。
可以证明，6 天是最少需要的天数。
</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= power.length &lt;= 17</code></li>
<li><code>1 &lt;= power[i] &lt;= 10<sup>9</sup></code></li>
</ul>


**相似问题：**
- [1847：最近的房间（2081 分）](/leetcode/1847)
- [1921：消灭怪物的最大数量（1527 分）](/leetcode/1921)
- [2184：建造坚实的砖墙的方法数](/leetcode/2184)


## 分析

- 范围较小，可以用状压 dp
- 类似 {{< lc "3385" >}}，可以用最小费用最大流

## 解答

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
    def minimumTime(self, power: List[int]) -> int:
        n = len(power)
        mcmf = MCMF(n*2+2)
        s,t = n*2,n*2+1
        for i,a in enumerate(power):
            mcmf.add(s,i,1,0)
            mcmf.add(i+n,t,1,0)
            for j in range(n):
                mcmf.add(i,j+n,1,(a-1)//(j+1)+1)
        return mcmf.cal(s,t)
```
23 ms
