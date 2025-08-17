# 数学模板：计算几何


## 向量

```python []
from math import atan2

def dot(u,v):    # u·v，点乘（内积）
    return u[0]*v[0]+u[1]*v[1]

def cross(u,v):  # u X v，叉乘（外积），逆正顺负
    return u[0]*v[1]-u[1]*v[0]

def qua(u):      # u 所在象限
    return (u[1]<0)<<1 | (u[0]<0)^(u[1]<0)

def psort(A):    # 极角排序
    A.sort(key=lambda p: atan2(p[1],p[0]))

def convex(A):           # 离线生成上凸包
    def check(a,b,c):
        u = [b[0]-a[0],b[1]-a[1]]
        v = [c[0]-b[0],c[1]-b[1]]
        return cross(u,v)>0
    A.sort()
    sk = []
    for u in A:
        while len(sk)>1 and check(sk[-2],sk[-1],u):
            sk.pop()
        sk.append(u)
    return sk

from sortedcontainers import SortedList
def convex(A):           # 在线生成上凸包
    def check(a,b,c):
        u = [b[0]-a[0],b[1]-a[1]]
        v = [c[0]-b[0],c[1]-b[1]]
        return cross(u,v)>0
    sl = SortedList()
    for u in A:
        i = sl.bisect_left(u)
        if 0<i<len(sl) and check(sl[i-1],u,sl[i]):
            continue
        while i+1<len(sl) and check(u,sl[i],sl[i+1]):
            sl.pop(i)
        while i>1 and check(sl[i-2],sl[i-1],u):
            sl.pop(i-1)
            i -= 1
        sl.add(u)
    return list(sl)


v2 = [dot(u,v),cross(u,v)]   # v 以 u 向量为 x 轴的参考系下的向量，长度拉长了 |u| 倍
```

## 直线

```python []
# 用点向式表示，即线上某点+方向向量

def inter(L1,L2):             # 求两线交点

```

##  圆

```python []
def in_circle(x,y,r,x1,y1):                     # 点 (x1,y1) 是否在园内 
    return (x1-x)*(x1-x)+(y1-y)*(y1-y)<=r*r

def cross_v(x,y,r,x1,y1,y2):                    # 线段 (x1,y1)-(x1,y2) 是否与圆（内）相交
    if y<y1:
        return in_circle(x,y,r,x1,y1)
    if y>y2:
        return in_circle(x,y,r,x1,y2)
    return abs(x1-x)<=r

def cross_h(x,y,r,x1,y1,x2):                   # 线段 (x1,y1)-(x2,y1) 是否与圆（内）相交
    if x<x1:
        return in_circle(x,y,r,x1,y1)
    if x>x2:
        return in_circle(x,y,r,x2,y1)
    return abs(y1-y)<=r
```


