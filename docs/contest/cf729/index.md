# Codeforces Round 380 Div.1+Div.2 (and Technocup 2017 — Elimination Round 2


> <u>**[

Codeforces Round 380 Div.1+Div.2 (and Technocup 2017 — Elimination Round 2)

](https://codeforces.com/blog/entry/48457)**</u>


## F. Financiers Game

博弈 dp
- 注意到 k 每轮只能加 1，因此最多加到 $m=\sqrt{2n}$ ，同时左边移除数 a 和右边移除数 b 交叉成为更大数，a 和 b 之差不会超过 k
- 令 f[k][i][d] 代表上一轮移除了k个，左边已移到i，左边与右边移除之差为 d 时能得到的结果
	- d<=0 代表本轮该移左边，d>0 代表该移右边，按本轮移除 k 个或 k+1 个即可递推
		- d<=0：f[k][i][d] = max(sum(A[i:i+k])-f[k][i+k][d+k],sum(A[i:i+k+1])-f[k+1][i+k+1][d+k+1])
		- d>0：r=n-i+d,f[i][k][d] = max(sum(A[r-k:r])-f[k][i][d-k],sum(A[r-k-1:r])-f[k+1][i][d-k-1])
	- 为了处理 d<0的情况，可以都加一个偏移量 m
	- 边界情况：已移除的加上 k 不超过 n，即 i+i-d+k<=n，得到 d>=i*2+k-n
- 注意递推顺序，根据递推式，k 从大到小，i 从大到小，d 从小到大
- 递推中 f[k][:] 只和 f[k][:] 与 f[k+1][:] 有关，可以用滚动数组优化

```python []
import sys
from itertools import *
from collections import *
from heapq import *
from bisect import *
input = lambda: sys.stdin.readline().rstrip()
def II(base=10): return int(input(),base)
def LII(): return list(map(int,input().split()))
def LSII(): return [int(x)-1 for x in input().split()]
from math import isqrt

n = II()
A = LII()
p = [0]+list(accumulate(A))
m = isqrt(n*2)+1
f = [[0]*(m*2+1) for _ in range(n+1)]
for k in range(m,0,-1):
    nf = [[0]*(m*2+1) for _ in range(n+1)]
    for i in range(n-1,-1,-1):
        low = i*2+k-n                       # i+i-d+k<=n
        for d in range(max(low,-k),1):
            res = p[i+k]-p[i]-nf[i+k][d+k+m]
            if k<m and low+1<=d:
                res = max(res,p[i+k+1]-p[i]-f[i+k+1][d+k+1+m])
            nf[i][d+m] = res
        for d in range(max(1,low),min(k,i)+1):
            r = n-i+d
            res = p[r]-p[r-k]-nf[i][d-k+m]
            if k<m and low+1<=d:
                res = max(res,p[r]-p[r-k-1]-f[i][d-k-1+m])
            nf[i][d+m] = res
    f = nf
print(f[0][m])
```
906 ms
