# 树模板：点分治

##  点分治

```python []
def dvd(u):
	def cal(u):
		pass
		
	def dfs(u,fa):
		sz[u],w[u] = 1,0
		sub.append(u)
		for v in g[u]:
			if v!=fa and not vis[v]:
				h[v] = h[u]+1
				dfs(v,u)
				sz[u] += sz[v]
				w[u] = max(w[u],sz[v])
			
	vis[u] = 1
	h[u],sz[u] = 0,1
	A = [v for v in g[u] if not vis[v]]
	subs = []
	for v in A:
		h[v] = 1
		sub = []
		dfs(v,u)
		sz[u] += sz[v]
		subs.append(sub)
	cal(u)
	for v,sub in zip(A,subs):
		vc = min(sub,key=lambda x:max(w[x],sz[v]-sz[x]))
		dvd(vc)

n = len(edges)+1
g = [[] for _ in range(n)]
for u,v in edges:
	g[u].append(v)
	g[v].append(u)
res = [0]*n
vis = [0]*n
h,sz,w = [0]*n,[0]*n,[0]*n
dvd(0)
return res
```

