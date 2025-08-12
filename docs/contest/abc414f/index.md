# abc414f: Jump Traveling


> <u>**[abc414f: Jump Traveling](https://atcoder.jp/contests/abc414/tasks/abc414_f)**</u>


### bfs


```python []
import sys
input = lambda: sys.stdin.readline().rstrip()
from collections import deque

def II(base=10):
    return int(input(),base)

def LI():
    return list(map(int,input()))

def LII():
    return list(map(int,input().split()))

def main():
    n,k = LII()
    g = [[] for _ in range(n+1)]
    for _ in range(n-1):
        u,v = LII()
        g[u].append(v)
        g[v].append(u)
    res = [-1]*(n+1)
    dq = deque([(0,1,0)])
    vis = [[0]*(n+1) for _ in range(k)] 
    vis[0][1] = -1
    while dq:
        w,u,fa = dq.popleft()
        if w%k==0 and res[u]==-1:
            res[u]=w//k
        for v in g[u]:
            if v==fa and w%k:
                continue
            r = (w+1)%k
            if not vis[r][v]:
                vis[r][v] = u
                dq.append((w+1,v,u))
            elif -2!=vis[r][v]!=u:
                vis[r][v] = -2
                dq.append((w+1,v,u))
    print(*res[2:])

for _ in range(II()):
    main()
```
1587 ms


