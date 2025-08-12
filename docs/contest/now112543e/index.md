# now112543e: 森友会里打音游


> <u>**[now112543e: 森友会里打音游](https://ac.nowcoder.com/acm/contest/112543/E)**</u>


### dp


```python []
import sys
input = lambda: sys.stdin.readline()[:-1]
 
def II(base=10):
    return int(input(),base)
 
def LI():
    return list(map(int,input()))
 
def LII():
    return list(map(int,input().split()))

N = 2*10**5+1
g = [[] for _ in range(N)]
for x in range(1,N):
    for y in range(x,N,x):
        g[y].append(x)

for _ in range(II()):
    n = II()
    A = LII()
    f = [0]*(n+1)
    f2 = [0]*(n+1)
    for a in A:
        s = f2[a]
        for b in g[a]:
            s = max(s,f[b])
        f[a] = s+1
        for b in g[a]:
            f2[b] = max(f2[b],1+s)
    print(max(f))
```
1096 ms


