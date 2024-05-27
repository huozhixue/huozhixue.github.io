# 图模板：网络流


## 1 最大流

```python
class Dinic:
    def __init__(self,):
        self.g = defaultdict(list)          # g 是图中每个 u 对应的 v 列表
        self.h = {}                         # h 是图中每个 u 离源点 s 的距离
        self.p = defaultdict(int)           # p 是当前弧优化，跳过已增广的边

    def add(self,u,v,c):
        self.g[u].append([v,len(self.g[v]),c])
        self.g[v].append([u,len(self.g[u])-1,0])

    def bfs(self,s,t):
        self.p.clear()
        self.h.clear()
        self.h[s]=0
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
```

## 2 最小费用最大流

```python
class Dinic:
    def __init__(self,):
        self.g = defaultdict(list)          # g 是图中每个 u 对应的 v 列表
        self.h = defaultdict(lambda:inf)    # h 是图中每个 u 离源点 s 的距离
        self.p = defaultdict(int)           # p 是当前弧优化，跳过已增广的边
        self.vis = set()

    def add(self,u,v,c,w):
        self.g[u].append([v,len(self.g[v]),c,w])
        self.g[v].append([u,len(self.g[u])-1,0,-w])

    def spfa(self,s,t):
        self.h.clear()
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
        self.vis.add(u)
        res = 0
        for i in range(self.p[u],len(self.g[u])):
            v,j,c,w = self.g[u][i]
            if c>0 and v not in self.vis and self.h[v]==self.h[u]+w:
                a = self.dfs(v,t,min(flow,c))
                flow -= a
                self.g[u][i][2]-=a
                self.g[v][j][2]+=a
                res += a
            self.p[u] += 1
        self.vis.remove(u)
        return res

    def cal(self,s,t):
        res = 0
        while self.spfa(s,t):
            res += self.dfs(s,t,inf)*self.h[t]
            self.p.clear()
        return res
```
