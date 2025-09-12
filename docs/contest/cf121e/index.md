# cf121e: Lucky Array


> <u>**[cf121e: Lucky Array](https://codeforces.com/contest/121/problem/E)**</u>



### 线段树

线段树 beats

```python []
import sys
input = lambda: sys.stdin.readline().rstrip()
from bisect import bisect_left

def II(base=10):
    return int(input(),base)

def LI():
    return list(map(int,input()))

def LII():
    return list(map(int,input().split()))

inf = 10**5
lucky = tmp = [4,7]
for _ in range(3):
    tmp = [a*10+b for a in tmp for b in [4,7]]
    lucky.extend(tmp)
lucky.append(inf)

class Seg:
    def __init__(self,N):
        self.mi = [inf]*N*2
        self.w = [1]*N*2
        self.f = [0]*N*2

    def merge(self,a,b):           
        return [a[0],a[1]+b[1]] if a[0]==b[0] else a[:] if a[0]<b[0] else b[:]
    
    def up(self,o):
        self.mi[o],self.w[o] = self.merge([self.mi[o*2],self.w[o*2]],[self.mi[o*2+1],self.w[o*2+1]])

    def apply(self,o,x):            
        self.mi[o] -= x
        self.f[o] += x

    def build(self,A,o,l,r):
        if l==r:
            self.mi[o] = lucky[bisect_left(lucky,A[l])]-A[l]
            return
        m = (l+r)//2
        self.build(A,o*2,l,m)
        self.build(A,o*2+1,m+1,r)
        self.up(o)

    def down(self,o):
        if self.f[o] != self.f[0]:
            self.apply(o*2,self.f[o])
            self.apply(o*2+1,self.f[o])
            self.f[o] = self.f[0]

    def update(self,a,b,x,o,l,r):
        if a<=l and r<=b and self.mi[o]>=x:
            self.apply(o,x)
            return
        if l==r:
            A[l] += self.f[o]+x
            self.f[o] = 0
            self.mi[o] = lucky[bisect_left(lucky,A[l])]-A[l]
            return
        self.down(o)
        m = (l+r)//2
        if a<=m: self.update(a,b,x,o*2,l,m)
        if m<b: self.update(a,b,x,o*2+1,m+1,r)
        self.up(o)
        
    def query(self,a,b,o,l,r):
        if a<=l and r<=b:
            return self.mi[o],self.w[o]
        self.down(o)
        res = [inf,0]
        m = (l+r)//2
        if a<=m: res = self.query(a,b,o*2,l,m)
        if m<b: res = self.merge(res,self.query(a,b,o*2+1,m+1,r))
        return res

n,m = LII()
A = LII()
seg = Seg(1<<n.bit_length())
seg.build(A,1,0,n-1)
for _ in range(m):
    p = input().split()
    if p[0]=='add':
        l,r,d = map(int,p[1:])
        seg.update(l-1,r-1,d,1,0,n-1)
    else:
        l,r = map(int,p[1:])
        res = seg.query(l-1,r-1,1,0,n-1)
        print(res[1] if res[0]==0 else 0)
```
3904 ms
