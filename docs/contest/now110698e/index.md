# now110698e: 火之歌


> <u>**[now110698e: 火之歌](https://ac.nowcoder.com/acm/contest/110698/E)**</u>


### 组合数学


```python []
from sys import stdin
input = stdin.readline

mod = 10**9+7
ma = 12*10**5+1
fac = [1]*ma
inv = [1]*ma
for i in range(1,ma):
    fac[i] = fac[i-1]*i%mod
inv[-1] = pow(fac[-1],mod-2,mod)
for i in range(ma-1,0,-1):
    inv[i-1] = inv[i]*i%mod
    
def comb(m,n):
    if m<n:
        return 0
    return fac[m]*inv[m-n]%mod*inv[n]%mod

for _ in range(int(input())):
    n,m = map(int,input().split())
    s = 0
    for k in range(1,n//m+1):
        a = n-k*m
        s += comb(a+k*2,k*2)-comb(a+k,k*2)
        s %= mod
    print(s)
```
1470 ms


