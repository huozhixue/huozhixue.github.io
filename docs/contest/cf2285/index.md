# Codeforces Round 1135 (Div. 2)


> <u>**[Codeforces Round 1135 (Div. 2)](https://codeforces.com/contest/2285)**</u>


## C. Max Substitution

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
fmin = lambda x,y: x if x<y else y
fmax = lambda x,y: x if x>y else y

mod = 10**9+7
def main():
    n = II()
    A = LII()
    A.sort(reverse=True)
    res = 1
    i = 0
    for c,g in groupby(A):
        k = len(list(g))
        if k>1:
            break
        i += 1
        res += pow(c-1,i,mod)
        res %= mod
    print(res)

for _ in range(II()):
    main()
```
375 ms

## E. Arithmetic Subarray

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
fmin = lambda x,y: x if x<y else y
fmax = lambda x,y: x if x>y else y

def main():
    n, k = LII()
    A = LII()
    R = [{} for _ in range(n)]
    for i,a in enumerate(A):
        for j in range(1,min(n-i,k+2)):
            u = A[i+j]-a
            if u%j==0:
                u //= j
                if u not in R[i]:
                    R[i][u] = i+j
    res = 0
    for i in range(n):
        for w in R[i]:
            u = i
            B = [u]
            while w in R[u] and R[u][w]!=-1:
                v = R[u][w]
                R[u][w] = -1
                u = v
                B.append(u)
            l = 0
            for r,b in enumerate(B):
                while (b-B[l])-(r-l)>k:
                    l += 1
                res = max(res,r-l+1)
    print(min(res+k,n))

for _ in range(II()):
    main()
```
2953 ms
