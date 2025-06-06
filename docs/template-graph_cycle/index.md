# 图模板：环问题

## 拓扑排序
### 博弈反推

```python
Q = deque(res)                  # res[u]：终态 u 的胜负结果
while Q:
	u = Q.popleft()
	if u==start:                # start：初始态
		return res[u]
	for v in g[u]:
		if v in res:
			continue
		if v[-1]==res[u]:
			res[v] = res[u]
			Q.append(v)
		else:
			deg[v]-=1
			if deg[v]==0:
				res[v] = res[u]
				Q.append(v)
```

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
