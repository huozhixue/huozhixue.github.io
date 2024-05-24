# 图模板：图匹配

##  二分图

### 最大匹配

```python
def hgr(g):            # g 是二分图中每个 x 对应的 y 列表
    def find(x):
        for y in g[x]:
            if y not in vis:
                vis.add(y)
                if y not in d or find(d[y]):
                    d[y]=x
                    return True
        return False
    res,vis,d = 0,set(),{}
    for x in g:
        res += find(x)
        vis.clear()
    return res
```

### 最大权完美匹配

```python
def km(g):                   # g 是 n-n 完全二分图的权值
    def bfs(i): 
        slack = [inf]*n
        vis = [0]*(n+1)
        pre = [-1]*n
        j=nj=-1
        d[j] = i
        while d[j]!=-1:
            delta = inf
            x = d[j]
            vis[j]=True
            for y in range(n):
                if vis[y]:
                    continue
                tmp=lx[x]+ly[y]-g[x][y]
                if slack[y]>tmp:
                    slack[y]=tmp
                    pre[y]=j
                if slack[y]<delta:
                    delta=slack[y]
                    nj = y
            lx[i]-=delta
            for y in range(n):
                if vis[y]:
                    lx[d[y]]-=delta
                    ly[y]+=delta
                else:
                    slack[y]-=delta
            j = nj
        while j!=-1:
            d[j]=d[pre[j]]
            j=pre[j]

    n = len(g)
    d = [-1]*(n+1)
    lx = [max(row) for row in g]
    ly = [0]*n
    for i in range(n):
        bfs(i)
    return sum(g[d[y]][y] for y in range(n))
```

