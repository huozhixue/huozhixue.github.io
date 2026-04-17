# 牛客小白月赛116


> <u>**[牛客小白月赛116](https://ac.nowcoder.com/acm/contest/109080)**</u>

## E. 旷课大师
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

## G. 经典 DP

### 矩阵冪

```python []
from sys import stdin
input = stdin.readline

mod = 10**9+7
def mul(A,B):
    return [[sum(a*b for a,b in zip(r,c))%mod for c in zip(*B)] for r in A]
def mpow(mat, n):
    res = mat
    for i in range(n.bit_length()-2,-1,-1):
        res = mul(res,res)
        if n>>i&1:
            res = mul(res,mat)
    return res

n = int(input())
A = list(map(int,input().split()))
c,m,k,t = map(int,input().split())
ct = [0]*m
ct[0] = 1
for a in A:
    for i,x in enumerate(ct[:]):
        j = (i+a)%m
        ct[j] = (ct[j]+x)%mod
ct[0] -= 1
B = [[0]*m for _ in range(m)]
for i in range(m):
    for j in range(m):
        a = i*j%m
        B[i][a] += ct[j]
        B[i][a] %= mod
f = [[0]*m]
f[0][c%m] = 1
f = mul(f,mpow(B,t))
print(f[0][k])
```
1580 ms


