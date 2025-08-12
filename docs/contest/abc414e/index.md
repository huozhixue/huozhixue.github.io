# abc414e: Count A%B=C


> <u>**[abc414e: Count A%B=C](https://atcoder.jp/contests/abc414/tasks/abc414_e)**</u>


### 分块


```python []
import sys
input = lambda: sys.stdin.readline().rstrip()
from math import isqrt

def II(base=10):
    return int(input(),base)

def LI():
    return list(map(int,input()))

def LII():
    return list(map(int,input().split()))

mod = 998244353
n = II()
s = n*(n+1)//2%mod
m = isqrt(n)
for a in range(1,m):
    s -= a*(n//a-n//(a+1))
    s %= mod
for a in range(1,n//m+1):
    s -= n//a
    s %= mod
print(s)
```
73 ms


