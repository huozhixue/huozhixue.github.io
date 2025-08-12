# now109080e: 旷课大师


> <u>**[now109080e: 旷课大师](https://ac.nowcoder.com/acm/contest/109080/E)**</u>


### dp


```python []
inf = 10**12

def dp1():
    def check(x):
        f = [a if a<=x else inf for a in P]
        for _ in range(k):
            g = [0]*(n+1)
            for i in range(1,n+1):
                g[i] = min(g[i-1]+A[i-1],f[i-1]//2)
                g[i] = g[i] if g[i]<=x else inf
            f = g
        return f[-1]<inf
    l,r = 0,P[-1]
    while l<r:
        x = (l+r)//2
        if check(x):
            r = x
        else:
            l = x+1
    return r

def dp2():
    f = P[:]
    for _ in range(k):
        g = [0]*(n+1)
        for i in range(1,n+1):
            g[i] = min(A[i-1]+g[i-1],f[i-m] if i>m else 0)
        f = g
    return f[-1]

n,k,m = map(int,input().split())
A = list(map(int,input().split()))
P = [0]*(n+1)
for i in range(1,n+1):
    P[i] = P[i-1]+A[i-1]
print(min(dp1(),dp2()))
```
173 ms




