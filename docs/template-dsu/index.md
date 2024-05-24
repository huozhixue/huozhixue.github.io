# 并查集模板

## 并查集

```python
def find(x):
	if f[x]!=x:
		f[x] = find(f[x])
	return f[x]

def union(x,y):
	fx, fy = find(x),find(y)
	if fx != fy:
		if sz[fx]>sz[fy]:
			fx, fy = fy, fx
		f[fx] = fy
		sz[fy] += sz[fx]
```

