# now112576g: 小红的双排列期望（hard）


> <u>**[now112576g: 小红的双排列期望（hard）](https://ac.nowcoder.com/acm/contest/112576/G)**</u>


### 概率dp


```python []
import sys
input = lambda: sys.stdin.readline().rstrip()

def II(base=10):
    return int(input(),base)

def LI():
    return list(map(int,input()))

def LII():
    return list(map(int,input().split()))

mod = 10**9+7
n = II()
A = LII()
A.sort()
d = [[] for _ in range(101)]
for i,a in enumerate(A):
    d[a].append(i//2+1)
res = 0
for i in range(1,101):
    if d[i]:
        N = d[i][-1]+1
        p = i*pow(100,mod-2,mod)%mod
        invp = pow(p,mod-2,mod)
        f = [0]*N
        f[1] = invp
        for j in range(2,N):
            f[j] = (1+f[j-1]-(1-p)*f[j-2])%mod*invp%mod
        for a in d[i]:
            res = (res+f[a])%mod
print(res)
# f[j]-f[j-1]=1+(1-p)*(f[j]-f[j-2])
# f[j]*p = 1+f[j-1]-(1-p)*f[j-2]
```
212 ms


