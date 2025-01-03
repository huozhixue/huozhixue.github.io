# 图模板：连通性

### 割点

```python
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
### 桥

```python
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

### 强连通分量、边双连通分量

```python
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
### 点双连通分量

```python []
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
