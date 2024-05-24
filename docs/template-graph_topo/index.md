# 图模板：拓扑排序


### 博弈反推

```python
Q = deque(res)                  # res[u]：终态 u 的胜负结果
while Q:
	u = Q.popleft()
	if u==start:                # start：初始态
		return res[u]
	for v in nxt[u]:
		if v in res:
			continue
		if v[-1]==res[u]:
			res[v] = res[u]
			Q.append(v)
		else:
			indeg[v]-=1
			if indeg[v]==0:
				res[v] = res[u]
				Q.append(v)
```

