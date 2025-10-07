# 算法（八）：根号思想

- 根号分治
- 根号限制
	- 总和为 n 的若干个数，最多只有 $\sqrt n$   种
	- 将边的方向定为从度数小的点连向度数大的点（度数相等可以比较标号），边的出度最多 $O(\sqrt m)$  
- 分块思想：
	- 块状数组、 莫队

```python []
# 块状数组
from math import isqrt
def apply(a,l,r,x):
    if [l,r]==[a*sq,a*sq+sq-1]:
        f[a] += x
        return
    for i in range(a*sq,min(n,a*sq+sq)):
        A[i] += f[a]
        if l<=i<=r:
            A[i] += x
    B[a] = set(A[a*sq:a*sq+sq])
    f[a] = 0

def update(l,r,x):
    a,b = l//sq,r//sq
    if a==b:
        apply(a,l,r,x)
    else:
        apply(a,l,a*sq+sq-1,x)
        apply(b,b*sq,r,x)
        for i in range(a+1,b):
            f[i] += x

A = []
n = len(A)
sq = isqrt(n)
m = (n-1)//sq+1
B = [0]*m
f = [0]*m
for a in range(m):
    B[a] = set(A[a*sq:a*sq+sq])
```


- {{< lc "1761" >}} [一个图中连通三元组的最小度数](https://leetcode.cn/problems/minimum-degree-of-a-connected-trio-in-a-graph/)
