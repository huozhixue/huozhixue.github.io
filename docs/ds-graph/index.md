# 数据结构（五）：图


##  拓扑排序

- {{< lc "0207" >}} 课程表
- {{< lc "0210" >}} 课程表 II
- {{< lc "0269" >}} 火星词典

- {{< lc "0684" >}} 冗余连接
- {{< lc "0310" >}} 最小高度树
- {{< lc "0802" >}} 找到最终的安全状态
- {{< lc "2115" >}} 从给定原材料中找到所有可以做出的菜
- {{< lc "1203" >}} 项目管理
- {{< lc "1591" >}} 奇怪的打印机 II
- {{< lc "1857" >}} 有向图中最大颜色值

##  最短路径

- [带你发明 Floyd 算法：从记忆化搜索到递推](https://leetcode.cn/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/solutions/2525946/dai-ni-fa-ming-floyd-suan-fa-cong-ji-yi-m8s51/)

```python
# dijkstra
def dij(g,s):
	pq,d = [(0,s)], [inf]*n
	d[s] = 0
	while pq:
		w,u = heappop(pq)
		if w>d[u]:
			continue
		for v,w2 in g[u]:
			nw = w+w2
			if nw<d[v]:
				d[v] = nw
				heappush(pq, (nw,v))
	return d
```

```python
# dijkstra
def dij(g,s):
	Q, d = set(range(n)), [inf]*n
	d[s] = 0
	while Q:
		u = min(Q, key=d.__getitem__)
		Q.remove(u)
		for v, w in g[u]:
			if v in Q:
				d[v] = min(d[v], d[u]+w)
```

```python
# floyd
for i in range(n):
    f[i][i] = 0
for k,i,j in product(range(n),range(n),range(n)):
	f[i][j] = min(f[i][j],f[i][k]+f[k][j])
```

```python
# Bellman-Ford 
def BF(edges,s):
	d = [inf]*n
	d[s] = 0
	for _ in range(n-1):
		flag = True
		for u,v,w in edges:
			if d[u]+w<d[v]:
				d[v] = d[u]+w
				flag = False
		if flag:
			break
	return d
```

```python []
# spfa
def spfa(g,s):
    d = [inf] * n
    d[s] = 0
    Q, vis = deque([s]), {s}
    while Q:
        u = Q.popleft()
        vis.remove(u)
        for v, w in g[u]:
            if d[u]+w<d[v]:
                d[v] = d[u]+w
                if v not in vis:
                    vis.add(v)
                    Q.append(v)
    return d
```

bfs
- {{< lc "0126" >}} 单词接龙 II
- {{< lc "0317" >}} 离建筑物最近的距离
- {{< lc "0675" >}} 为高尔夫比赛砍树
dij
- {{< lc "0499" >}} 迷宫 III

- {{< lc "0743" >}} 网络延迟时间
- {{< lc "1334" >}} 阈值距离内邻居最少的城市
- {{< lc "1514" >}} 概率最大的路径
- {{< lc "0787" >}} K 站中转内最便宜的航班
- {{< lc "0847" >}} 访问所有节点的最短路径
- {{< lc "0882" >}} 细分图中的可到达结点
- {{< lc "1368" >}} 使网格图至少有一条有效路径的最小代价
- {{< lc "lcp35" >}} 电动车游城市
- {{< lc "1786" >}} 从第一个节点出发到最后一个节点的受限路径数
- {{< lc "1976" >}} 到达目的地的方案数
- {{< lc "2045" >}} 到达目的地的第二短时间
- {{< lc "2203" >}} 得到要求路径的最小带权子图

##  最小生成树

- {{< lc "1584" >}} 连接所有点的最小费用

## 基环树

```python
n = len(g)
C = []
vis = [0]*n
rg = [[] for _ in range(n)]
for u in range(n):
	A = []
	while not vis[u]:
		A.append(u)
		vis[u] = 1
		u = g[u]
	if u in A:
		i = A.index(u)
		C.append(A[i:])
		A = A[:i]
	for a,b in pairwise(A+[u]):
		rg[b].append(a)
```

##  欧拉图

- {{< lc "0332" >}} 重新安排行程
- {{< lc "0753" >}} 破解保险箱
- {{< lc "2097" >}} 合法重新排列数对

##  连通分量/割点/桥


```python
# 有向图强连通分量，非递归 tarjan
# 有向图强连通分量，非递归 tarjan
def SCC(g,n):
    def tarjan(u):
        nonlocal i,j
        dq = [u]
        while dq:
            u = dq.pop()
            if p[u]==0:
                dfn[u] = low[u] = i = i+1
                sk.append(u)
            if p[u]<len(g[u]):
                dq.append(u)
                v = g[u][p[u]]
                if not dfn[v]:
                    fa[v] = u
                    dq.append(v)
                elif not scc[v]:
                    low[u] = min(low[u],dfn[v])
                p[u] += 1
            else:
                x = fa[u]
                if x!=-1:
                    low[x] = min(low[x],low[u])
                if low[u]==dfn[u]:
                    j += 1
                    while sk[-1]!=u:
                        scc[sk.pop()] = j
                    scc[sk.pop()] = j

    dfn,low= [0]*n,[0]*n
    fa,p = [-1]*n,[0]*n
    scc,sk = [0]*n,[]
    i,j = 0,0
    for u in range(n):
        if not dfn[u]:
            tarjan(u)
    return scc
```

```python []
# 无向图的桥和边双连通分量，非递归 tarjan
def BCC(g,n):
    def tarjan(u):
        nonlocal i,j
        dq = [u]
        while dq:
            u = dq.pop()
            if p[u]==0:
                dfn[u] = low[u] = i = i+1
                sk.append(u)
            if p[u]<len(g[u]):
                dq.append(u)
                v = g[u][p[u]]
                if not dfn[v]:
                    fa[v] = u
                    dq.append(v)
                elif v!=fa[u]:
                    low[u] = min(low[u],dfn[v])
                p[u] += 1
            else:
                x = fa[u]
                if x!=-1:
                    low[x] = min(low[x],low[u])
                    if low[u]>dfn[x]:
                        bridge.append([x,u])
                if low[u]==dfn[u]:
                    j += 1
                    while sk[-1]!=u:
                        bcc[sk.pop()] = j
                    bcc[sk.pop()] = j
    dfn,low = [0]*n,[0]*n
    fa,p = [-1]*n,[0]*n
    bridge = []
    bcc,sk = [0]*n,[]
    i,j = 0,0
    tarjan(0)
    return bridge,bcc
```

```python []
# 无向图的割点和点双连通分量，非递归 tarjan
def DCC(g,n):
    def tarjan(root):
        nonlocal i
        if not g[root]:
            dcc.append([root])
        dq = [root]
        while dq:
            u = dq.pop()
            if p[u]==0:
                dfn[u] = low[u] = i = i+1
                sk.append(u)
            if p[u]<len(g[u]):
                dq.append(u)
                v = g[u][p[u]]
                if not dfn[v]:
                    fa[v] = u
                    dq.append(v)
                else:
                    low[u] = min(low[u],dfn[v])
                p[u] += 1
            else:
                x = fa[u]
                if x!=-1:
                    low[x] = min(low[x],low[u])
                    if low[u]>=dfn[x]:
                        s[x] += 1
                        dcc.append([])
                        while sk[-1]!=u:
                            dcc[-1].append(sk.pop())
                        dcc[-1].extend([sk.pop(),x])
                cut[u] = s[u]>(u==root)
    dfn,low = [0]*n,[0]*n
    fa,p = [-1]*n,[0]*n
    s,cut = [0]*n,[0]*n
    dcc,sk = [],[]
    i = 0
    tarjan(0)
    return cut,dcc
```

- {{< lc "1192" >}} 查找集群内的「关键连接」
- {{< lc "1489" >}} 找到最小生成树里的关键边和伪关键边
- {{< lc "1568" >}} 使陆地分离的最少天数

##  图匹配

- 最大匹配，[匈牙利算法](https://zhuanlan.zhihu.com/p/96229700)
- 最大权匹配，[KM算法](https://www.cnblogs.com/lcbwwy/p/13125327.html)、[bfs版KM算法](https://www.cnblogs.com/zhangjianjunab/p/13812944.html)

```python
# 二分图最大匹配，匈牙利
def KM(g,n):            # 注意 g 包括二分图每个点，但只包含单向边
    def find(u):
        for v in g[u]:
            if not vis[v]:
                vis[v] = 1
                if d[v]==-1 or find(d[v]):
                    d[v] = u
                    return True
        return False
    res = 0
    d = [-1]*n
    for u in range(n):
        vis = [0]*n
        res += find(u)
    return res
```

```python
# 二分图最大权完美匹配，匈牙利
inf = 10**20
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
```


##  网络流

- [最大流](https://zhuanlan.zhihu.com/p/122375531)
- [最小费用最大流](https://zhuanlan.zhihu.com/p/127046673)


```python
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

```python
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


