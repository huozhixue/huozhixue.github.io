# 数据结构（五）：图


##  拓扑排序

- {{< lc "0207" >}} 课程表
- {{< lc "0210" >}} 课程表 II
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

例题
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

##  割点和桥

```python
# 割点
def tarjan(u,root):
	nonlocal t
	dfn[u]=low[u]=t=t+1
	s = 0
	for v in g[u]:
		if not dfn[v]:
			tarjan(v,0)
			low[u] = min(low[u],low[v])
			s += low[v]>=dfn[u]
		else:
			low[u] = min(low[u],dfn[v])
	cut[u] = s>root
dfn,low,t = [0]*n,[0]*n,0
cut = [0]*n
tarjan(0,1)
```

```python
# 桥
def tarjan(u,fa):
	nonlocal t
	dfn[u]=low[u]=t=t+1
	for v in g[u]:
		if not dfn[v]:
			tarjan(v,u)
			low[u] = min(low[u],low[v])
			if low[v]>dfn[u]:
				bridge.append([u,v])
		elif v!=fa:
			low[u] = min(low[u],dfn[v])
dfn,low,t = [0]*n,[0]*n,0
bridge = []
tarjan(0,-1)
```

```python
# 强连通分量、边双连通分量
def tarjan(u,fa):
	nonlocal t,i
	dfn[u]=low[u]=t=t+1
	sk.append(u)
	vis[u] = 1
	for v in g[u]:
		if not dfn[v]:
			tarjan(v,u)
			low[u] = min(low[u],low[v])
		elif v!=fa and vis[v]:
			low[u] = min(low[u],dfn[v])
	if low[u]==dfn[u]:
		i += 1
		v = -1
		while v!=u:
			v = sk.pop()
			vis[v] = 0
			scc[v] = i
dfn,low,vis,sk = [0]*n,[0]*n,[0]*n,[]
t,i = 0,0
scc = []
tarjan(0,-1)
```

```python []
# 点双连通分量
def tarjan(u,root):
	if root and not g[u]:
		dcc.append([u])
	nonlocal t
	dfn[u]=low[u]=t=t+1
	sk.append(u)
	s = 0
	for v in g[u]:
		if not dfn[v]:
			tarjan(v,0)
			low[u] = min(low[u],low[v])
			if low[v]>=dfn[u]:
				s += 1
				dcc.append([])
				while sk[-1]!=v:
					dcc[-1].append(sk.pop())
				dcc[-1].extend([sk.pop(),u])
		else:
			low[u] = min(low[u],dfn[v])
	cut[u] = s>root
dfn,low,sk,t = [0]*n,[0]*n,[],0
dcc,cut = [],[0]*n
tarjan(0,1)
```

- {{< lc "1192" >}} 查找集群内的「关键连接」
- {{< lc "1489" >}} 找到最小生成树里的关键边和伪关键边
- {{< lc "1568" >}} 使陆地分离的最少天数

##  图匹配

- 最大匹配，[匈牙利算法](https://zhuanlan.zhihu.com/p/96229700)
- 最大权匹配，[KM算法](https://www.cnblogs.com/lcbwwy/p/13125327.html)、[bfs版KM算法](https://www.cnblogs.com/zhangjianjunab/p/13812944.html)

```python
# 二分图最大匹配，匈牙利
def hgr(g):            # g 是二分图中每个 x 对应的 y 列表
    def find(x):
        for y in g[x]:
            if y not in vis:
                vis.add(y)
                if y not in d or find(d[y]):
                    d[y]=x
                    return True
        return False
    res,vis,d = 0,set(),{}
    for x in g:
        res += find(x)
        vis.clear()
    return res
```

```python
# 二分图最大权完美匹配，匈牙利
def km(g):                   # g 是 n-n 完全二分图的权值
    def bfs(i): 
        slack = [inf]*n
        vis = [0]*(n+1)
        pre = [-1]*n
        j=nj=-1
        d[j] = i
        while d[j]!=-1:
            delta = inf
            x = d[j]
            vis[j]=True
            for y in range(n):
                if vis[y]:
                    continue
                tmp=lx[x]+ly[y]-g[x][y]
                if slack[y]>tmp:
                    slack[y]=tmp
                    pre[y]=j
                if slack[y]<delta:
                    delta=slack[y]
                    nj = y
            lx[i]-=delta
            for y in range(n):
                if vis[y]:
                    lx[d[y]]-=delta
                    ly[y]+=delta
                else:
                    slack[y]-=delta
            j = nj
        while j!=-1:
            d[j]=d[pre[j]]
            j=pre[j]

    n = len(g)
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
# 最大流
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
        return res         self.g[u][i][-1]-=a
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

```python
# 最小费用最大流
class Dinic:
    def __init__(self,):
        self.g = defaultdict(list)          # g 是图中每个 u 对应的 v 列表
        self.h = defaultdict(lambda:inf)    # h 是图中每个 u 离源点 s 的距离
        self.p = defaultdict(int)           # p 是当前弧优化，跳过已增广的边
        self.vis = set()

    def add(self,u,v,c,w):                  # 顶点 u 和 v 连边，容量 c，费用 w
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
