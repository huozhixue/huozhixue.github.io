# 树模板：最近公共祖先

##  最近公共祖先

```python
class LCA:
    def __init__(self, edges: List[List[int]]):
        n = len(edges) + 1
        m = n.bit_length()
        g = [[] for _ in range(n)]
        for u, v in edges: 
            g[u].append(v)
            g[v].append(u)
        self.D = [0] * n
        self.f = [[-1]*m for _ in range(n)]
        sk = [(0,-1)]
        while sk:
            u,fa = sk.pop()
            for v in g[u]:
                if v!=fa:
                    sk.append(v,u)
                    self.f[v][0] = u
                    self.D[v] = self.D[u]+1
        for i in range(m-1):
            for u in range(n):
                p = self.f[u][i]
                if p!=-1:
                    self.f[u][i+1] = self.f[p][i]

    def get_kth(self, u: int, k: int) -> int:
        for i in range(k.bit_length()):
            if u!=-1 and k&(1<<i):
                u = self.f[u][i]
        return u

    # 返回 x 和 y 的最近公共祖先（节点编号从 0 开始）
    def lca(self, x: int, y: int) -> int:
        if self.D[x] > self.D[y]:
            x, y = y, x
        y = self.get_kth(y, self.D[y]-self.D[x])
        if x==y:
            return x
        for i in range(len(self.f[x])-1,-1,-1):
            px, py = self.f[x][i], self.f[y][i]
            if px!=py:
                x,y = px,py  
        return self.f[x][0]
```
