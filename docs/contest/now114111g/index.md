# now114111g: 小红的双排列查询


> <u>**[now114111g: 小红的双排列查询](https://ac.nowcoder.com/acm/contest/114111/G)**</u>


### 线段树


```python []
import sys
input = lambda: sys.stdin.readline().rstrip()

def II(base=10):
    return int(input(),base)

def LI():
    return list(map(int,input()))

def LII():
    return list(map(int,input().split()))

class Seg:
    def __init__(self,N):  
        self.N = N           
        self.t = [-1]*N*2

    def merge(self,a,b):                # 区间信息怎么合并的   
        return min(a,b)
    
    def up(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def update(self,a,x):
        a += self.N
        self.t[a] = x
        while a>>1:
            a >>= 1
            self.up(a)

    def query(self,a,b):
        res,a,b = n,a+self.N-1,b+self.N+1
        while b-a>1:  
            if not a&1: res = self.merge(res,self.t[a^1])  
            if b&1: res = self.merge(res,self.t[b^1])  
            a,b = a>>1,b>>1  
        return res  
    
n,q = LII()
A = LII()
M = n//2+1
g = [[] for _ in range(n)]
for i in range(q):
    l,r = LII()
    g[r-1].append((l-1,i))
res = [1]*q
d = [-1]*M
seg = Seg(1<<M.bit_length())
for r,x in enumerate(A):
    if x<M:
        seg.update(x,d[x])
        d[x] = r
    for l,i in g[r]:
        a,b = divmod(r-l+1,2)
        if b or x>a or a>=M or seg.query(1,a)!=l:
            res[i] = 0
for a in res:
    print('Yes' if a else 'No')

```
1269 ms


