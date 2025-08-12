# now110696f: 小苯的小球分组


> <u>**[now110696f: 小苯的小球分组](https://ac.nowcoder.com/acm/contest/110696/F)**</u>


### 组合数学


```python []
from sys import stdin
input = stdin.readline

mod = 998244353
N = 5001
fac,inv = [1]*N,[1]*N
for i in range(1,N):
    fac[i] = fac[i-1]*i%mod
inv[-1] = pow(fac[-1],mod-2,mod)
for i in range(N-1,0,-1):
    inv[i-1] = inv[i]*i%mod

def comb(m,n):
    if m<n or n<0 or m<0:
        return 0
    return fac[m]*inv[m-n]%mod*inv[n]%mod

def main():
    n = int(input())
    A = list(map(int,input().split()))
    d = {}
    for a in A:
        d[a] = d.get(a,0)+1
    s = 0
    for i in range(1,n+1):
        s += (i+1)//2*comb(n,i)
        s %= mod
    for a in d.values():
        for i in range(2,a+1):
            for j in range(min(i-1,n+1-i)):
                s += (i-(i+j+1)//2)*comb(a,i)*comb(n-a,j)
                s %= mod
    return s
        
for _ in range(int(input())):
    print(main())
```
141 ms


