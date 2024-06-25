# 图模板：最短路


## 1 dijkstra

```python
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

## 2 floyd

- [带你发明 Floyd 算法：从记忆化搜索到递推](https://leetcode.cn/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/solutions/2525946/dai-ni-fa-ming-floyd-suan-fa-cong-ji-yi-m8s51/)

```python
for i in range(n):
    f[i][i] = 0
for k,i,j in product(range(n),range(n),range(n)):
	f[i][j] = min(f[i][j],f[i][k]+f[k][j])
```

## 3 Bellman-Ford 

```python
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
## 4 spfa

```python []
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
