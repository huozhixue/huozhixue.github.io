# 数据结构（四）：树


## 树哈希

- {{< lc "0297" >}} 二叉树的序列化与反序列化
- {{< lc "0449" >}} 序列化和反序列化二叉搜索树
- {{< lc "0572" >}} 另一个树的子树
- {{< lc "0652" >}} 寻找重复的子树

## 树上路径

- {{< lc "0124" >}} 二叉树中的最大路径和
## lca

```python
# 倍增求 lca
class LCA:
    def __init__(self,edges):
        n = len(edges)+1
        m = n.bit_length()
        g = [[] for _ in range(n)]
        for u,v,w in edges: 
            g[u].append((v,w))
            g[v].append((u,w))
        self.D = D = [0]*n
        self.W = W = [0]*n
        self.f = f = [[-1]*m for _ in range(n)]
        sk = [0]
        while sk:
            u = sk.pop()
            for v,w in g[u]:
                if v!=f[u][0]:
                    sk.append(v)
                    f[v][0] = u
                    D[v] = D[u]+1
                    W[v] = W[u]+w
        for i in range(m-1):
            for u in range(n):
                p = f[u][i]
                if p!=-1:
                    f[u][i+1] = f[p][i]
    
    def kth(self,x,k):
        for i in range(k.bit_length()):
            if k>>i&1:
                x = self.f[x][i]
        return x
    
    def get(self,x,y):
        f,D = self.f,self.D
        if D[x]>D[y]:
            x,y = y,x
        y = self.kth(y,D[y]-D[x])
        if x!=y:
            for i in range(len(f[x])-1,-1,-1):
                px,py = f[x][i],f[y][i]
                if px!=py:
                    x,y = px,py
            x = f[x][0]
        return x
```

```python
# 树链剖分求 lca
n = len(edges)+1
g = [[] for _ in range(n)]
for u,v in edges:
	g[u].append(v)
	g[v].append(u)
D,sz = [0]*n,[0]*n
fa,son = [-1]*n,[-1]*n
top = list(range(n))
sons = []

def dfs(u):
	sz[u] = 1
	for v in g[u]:
		if v!=fa[u]:
			D[v] = D[u]+1
			fa[v] = u
			dfs(v)
			sz[u] += sz[v]
			if son[u]==-1 or sz[v]>sz[son[u]]:
				son[u] = v
	if son[u]!=-1:
		sons.append(son[u])
dfs(0)
for u in sons[::-1]:
	top[u] = top[fa[u]]
		
def lca(x,y):
	while top[x]!=top[y]:
		x,y = (fa[top[x]],y) if D[top[x]]>D[top[y]] else (x,fa[top[y]])
	return x if D[x]<D[y] else y
```
##  点分治

```python []
# 点分治
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
