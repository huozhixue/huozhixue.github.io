# cf598c: Nearest vectors


> <u>**[cf598c: Nearest vectors](https://codeforces.com/contest/598/problem/C)**</u>


### 极角排序

- 先把所有点极角排序
- 然后获得相邻点夹角的表示，取最小
- 为了避免浮点误差，比较角的大小用叉乘判断


```python []
import sys
input = lambda: sys.stdin.readline().rstrip()
from math import atan2

def II(base=10):
    return int(input(),base)

def LI():
    return list(map(int,input()))

def LII():
    return list(map(int,input().split()))

def dot(u,v):
    return u[0]*v[0]+u[1]*v[1]

def cross(u,v):
    return u[0]*v[1]-u[1]*v[0]

n = II()
A = [LII() for _ in range(n)]
B = sorted(range(n),key=lambda i: atan2(A[i][1],A[i][0]))
res = [(-1,0),0,0]
for i,j in zip(B,B[1:]+B[:1]):
    u = [dot(A[i],A[j]),abs(cross(A[i],A[j]))]
    if cross(res[0],u)<=0:
        res = [u,i,j]
i,j = res[1:]
print(i+1,j+1)
```
343 ms


