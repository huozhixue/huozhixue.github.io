# Educational Codeforces Round 1


> <u>**[Educational Codeforces Round 1](https://codeforces.com/contest/598)**</u>

## C. Nearest vectors
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

## F. Cut Length

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
