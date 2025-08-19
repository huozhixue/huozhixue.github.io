# cf598f: Cut Length


> <u>**[cf598f: Cut Length](https://codeforces.com/contest/598/problem/F)**</u>


### 极角排序

- 以直线上某点为原点，直线方向向量为x轴，得到 n 个顶点的向量表示
- 相邻两个顶点的边与 x 轴相交（不与x轴重合）时，记录交点和边的方向
- 所有交点排序，遍历交点，当交点状态（正负零）与最初态不同时，加上前一段的长度


```python []
import sys
input = lambda: sys.stdin.readline().rstrip()
from itertools import pairwise

def II(base=10):
    return int(input(),base)

def LI():
    return list(map(int,input()))

def LII():
    return list(map(int,input().split()))

def LFI():
    return list(map(float,input().split()))

def dot(u,v):
    return u[0]*v[0]+u[1]*v[1]

def cross(u,v):
    return u[0]*v[1]-u[1]*v[0]

n,m = LII()
A = [LFI() for _ in range(n)]
cmp = lambda x: (x>=0)-(x<=0)

for _ in range(m):
    x0, y0, x1, y1 = LFI()
    u = [x1-x0,y1-y0]
    delta = (u[0]**2+u[1]**2)**0.5
    B = []
    for x,y in A:
        v = [x-x0,y-y0]
        B.append([dot(u,v),cross(u,v)])
    C = []
    for u,v in zip(B,B[1:]+B[:1]):
        if cmp(u[1])!=cmp(v[1]):
            C.append([cross(u,v)/(v[1]-u[1]),cmp(v[1])-cmp(u[1])])
    C.sort()
    res,s = 0,0
    for a,b in pairwise(C):
        s += a[1]
        if s:
            res += b[0]-a[0]
    print(res/delta)
```
171 ms


