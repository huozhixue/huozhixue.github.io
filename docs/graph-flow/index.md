# 网络流入门


##  最大流

#### FF
```python []
# FF 最大流
class MF:
    def __init__(self,N):
        self.g = [[] for _ in range(N)]
        self.vis = [0]*N
        self.N = N

    def add(self,u,v,c):
        self.g[u].append([v,len(self.g[v]),c])
        self.g[v].append([u,len(self.g[u])-1,0])

    def dfs(self,u,t,flow):
        g = self.g
        if u==t:
            return flow
        res = 0
        self.vis[u] = 1
        for i,(v,j,c) in enumerate(g[u]):
            if not self.vis[v] and c>0:
                a = self.dfs(v,t,min(flow,c))
                if a:
                    g[u][i][-1] -= a
                    g[v][j][-1] += a
                    return a
        return 0

    def cal(self,s,t):
        res = 0
        while a:=self.dfs(s,t,inf)>0:
            res += a
            self.vis = [0]*self.N
        return res
```

#### EK

```python
# EK 最大流
class MF:
    def __init__(self,N):
        self.g = [[] for _ in range(N)]
        self.flow = [0]*N
        self.fa = [-1]*N
        self.N = N

    def add(self,u,v,c):
        self.g[u].append([v,len(self.g[v]),c])
        self.g[v].append([u,len(self.g[u])-1,0])

    def bfs(self,s,t):
        self.fa = [-1]*self.N
        dq = deque([s])
        self.flow[s] = inf
        while dq:
            u = dq.popleft()
            if u==t:
                break
            for v,j,c in self.g[u]:
                if c>0 and self.fa[v]==-1:
                    self.fa[v] = j
                    self.flow[v] = min(self.flow[u],c)
                    dq.append(v)
        return self.fa[t]!=-1

    def cal(self,s,t):
        res = 0
        while self.bfs(s,t):
            a = self.flow[t]
            res += a
            v = t
            while v!=s:
                j = self.fa[v]
                u,i,_ = self.g[v][j]
                self.g[u][i][-1] -= a
                self.g[v][j][-1] += a
                v = u
        return res
```

#### dinic
```python []
# 最大流 dinic
from collections import deque
inf = 10**20
class MF:
    def __init__(self,N):
        self.g = [[] for _ in range(N)]          # g 是图中每个 u 对应的 v 列表
        self.d = [inf]*N                         # d 是图中每个 u 离源点 s 的最小距离
        self.p = [0]*N                           # p 是当前弧优化，跳过已增广的边
        self.N = N

    def add(self,u,v,c):                         # 顶点 u 和 v 连边，容量 c
        self.g[u].append([v,len(self.g[v]),c])
        self.g[v].append([u,len(self.g[u])-1,0])

    def bfs(self,s,t):                           # bfs 得到层次图
        self.d = [inf]*self.N
        self.d[s] = 0
        dq = deque([s])
        while dq:
            u = dq.popleft()
            for v,_,c in self.g[u]:
                if c>0 and self.d[v]==inf:
                    dq.append(v)
                    self.d[v]=self.d[u]+1
        return self.d[t]<inf

    def dfs(self,u,t,flow):                     # dfs 得到阻塞流，多路增广+当前弧优化
        if u==t:
            return flow
        res = 0
        for i in range(self.p[u],len(self.g[u])):
            self.p[u] += 1
            v,j,c = self.g[u][i]
            if c>0 and self.d[v]==self.d[u]+1:
                a = self.dfs(v,t,min(flow,c))
                flow -= a
                self.g[u][i][-1] -= a
                self.g[v][j][-1] += a
                res += a
            if flow==0:
                break
        return res

    def cal(self,s,t):                         # 重复增广，计算最大流
        res = 0
        while self.bfs(s,t):
            self.p = [0]*self.N
            res += self.dfs(s,t,inf)
        return res   
```


## 最小费用最大流

#### EK

```python []
# 最小费用最大流，EK+dijkstra
from collections import deque
from heapq import heappush,heappop
inf = 10**20
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
```

#### dinic

```python []
# 最小费用最大流，dinic+dijkstra
from collections import deque
from heapq import heappush,heappop
inf = 10**20
class MCMF:
    def __init__(self,N):
        self.g = [[] for _ in range(N)]         # g 是图中每个 u 对应的 v 列表
        self.h = [inf]*N                        # h 是源点 s 到图中每个 u 的势能
        self.d = [inf]*N                        # d 是图中每个 u 离源点 s 的最小费用距离
        self.p = [0]*N                          # p 是当前弧优化，跳过已增广的边
        self.vis = [0]*N                        # dfs 过程避免循环
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

    def dij(self,s,t):                         # 最短路得到层次图，每条边的费用经过势能转换
        self.d = [inf]*self.N
        self.d[s] = 0
        pq = [(0,s)]
        while pq:
            w,u = heappop(pq)
            if w>self.d[u]:
                continue
            for v,_,c,w2 in self.g[u]:
                nw = w+w2+self.h[u]-self.h[v]
                if c>0 and nw<self.d[v]:
                    self.d[v] = nw
                    heappush(pq,(nw,v))
        return self.d[t]<inf

    def dfs(self,u,t,flow):                    # dfs 得到阻塞流，注意边的费用经过了势能转换
        if u==t:
            return flow
        self.vis[u] = 1
        res = 0
        for i in range(self.p[u],len(self.g[u])):
            self.p[u] += 1
            v,j,c,w = self.g[u][i]
            nw = self.d[u]+w+self.h[u]-self.h[v]
            if c>0 and not self.vis[v] and self.d[v]==nw:
                a = self.dfs(v,t,min(flow,c))
                flow -= a
                self.g[u][i][2]-=a
                self.g[v][j][2]+=a
                res += a
            if flow==0:
                break
        self.vis[u] = 0
        return res

    def cal(self,s,t):                         # 重复增广，维护势能
        res = 0
        self.spfa(s)
        while self.dij(s,t):
            tmp = self.dfs(s,t,inf)
            for u in range(self.N):
                self.h[u] += self.d[u]
            res += tmp*self.h[t]
            self.p = [0]*self.N
        return res
```
