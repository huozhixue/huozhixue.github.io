# 树模板：最近公共祖先

##  最近公共祖先

```python
m = n.bit_length()
g = [[] for _ in range(n)]
for u,v in edges: 
	g[u].append(v)
	g[v].append(u)
D = [0]*n
f = [[-1]*m for _ in range(n)]
sk = [(0,-1)]
while sk:
	u,fa = sk.pop()
	f[u][0] = fa
	for i in range(m-1):
		p = f[u][i]
		if p!=-1:
			f[u][i+1] = f[p][i]
	for v in g[u]:
		if v!=fa:
			sk.append(v,u)
			D[v] = D[u]+1
			
def lca(x,y):     # 返回 x 和 y 的最近公共祖先（节点编号从 0 开始）
	if D[x]>D[y]:
		x,y = y,x
	k = D[y]-D[x]
	for i in range(k.bit_length()):
		if k>>i&1:
			y = f[y][i]
	if x!=y:
		for i in range(m-1,-1,-1):
			px,py = f[x][i],f[y][i]
			if px!=py:
				x,y = px,py
		x = f[x][0]
	return x
```
