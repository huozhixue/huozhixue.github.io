# 树模板：点分治

##  点分治

```python []
def dvd(u):
	def cal(core):
		pass
		
	def dfs(u,fa):
		sz[u] = 1
		w[u] = 0
		A.append(u)
		for v in g[u]:
			if v!=fa and not vis[v]:
				dfs(v,u)
				sz[u] += sz[v]
				w[u] = max(w[u],sz[v])
	A = [] 
	dfs(u,-1)
	core = min(A,key=lambda x:max(w[x],sz[u]-sz[x]))
	cal(core)
	vis[core] = 1
	for v in g[core]:
		if not vis[v]:
			dvd(v)

n = len(edges)+1
g = [[] for _ in range(n)]
for u,v in edges:
	g[u].append(v)
	g[v].append(u)
res = [0]*n
vis = [0]*n
sz = [0]*n
w = [0]*n
dvd(0)
return res
```

