# now109080g: 经典 DP


> <u>**[now109080g: 经典 DP](https://ac.nowcoder.com/acm/contest/109080/G)**</u>


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




