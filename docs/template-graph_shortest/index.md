# 图模板：最短路


##  dijkstra

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

## spfa

```python []
def spfa(edges,s):
    g = defaultdict(list)
    for u, v, w in edges:
        g[u].append((v, w))
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
