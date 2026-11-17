# AtCoder Beginner Contest 484


> <u>** [AtCoder Beginner Contest 484](https://atcoder.jp/contests/abc484)**</u>


## D - Move One Card Left

- 将 A[i] 插入位置 j 等价于对子数组 A[j:i+1] 进行一次循环左移
- 如果插入后 A[i] 或 A[j] 没有变化，那么等价于对更小的区间进行操作，所以不考虑
- 剩下的操作都是唯一对应变化的
- 因此，统计 A[i]!=A[i-1] 且 A[i]!=A[j] 的位置对即可


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

n = II()
A = LSII()
s = 1
ct = [0]*n
for i,a in enumerate(A):
    ct[a] += 1
    if i and A[i]==A[i-1]:
        continue
    s += i+1-ct[a]
print(s)
```
96 ms

## F - Make them monochrome

- 区间信息可以合并，采用线段树维护即可

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

class Seg:
    def __init__(self,n):  
        self.n = n
        self.N = N = 1<<n.bit_length()         
        self.t = [-1]*N*2

    def merge(self,a,b):                # 区间信息怎么合并的   
        if a==-2 or b==-2:
            return -2
        if a==-1 or b==-1:
            return max(a,b)
        return a if a==b else -2

    def build(self,A):
        for i,a in enumerate(A):
            self.t[self.N+i] = a
        for o in range(self.N-1,0,-1):
            self.pull(o)

    def pull(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def upd(self,a,x):
        a += self.N
        self.t[a] = x
        while a>>1:
            a >>= 1
            self.pull(a)

    def query(self,a,b):
        a,b = a+self.N-1,b+self.N+1
        lres,rres = self.t[0],self.t[0]
        while a^b^1:  
            if not a&1: lres = self.merge(lres,self.t[a^1])  
            if b&1: rres = self.merge(self.t[b^1],rres)  
            a,b = a>>1,b>>1  
        return self.merge(lres,rres)  
    
n,q = LII()
A = LII()
seg = Seg(n)
seg.build(A)
for _ in range(q):
    tp,l,r = LII()
    if tp==1:
        seg.upd(l-1,r)
    else:
        print('Yes' if seg.query(l-1,r-1)!=-2 else 'No')
```
977 ms


## G - Wildcard Construction
#### 自动机 dp

- 定义 f[(mx,my)] 代表遍历到 S_i 时，X/Y 能匹配的前缀状态为 mx/my 的方案数
- 预处理 ox[c]/oy[c] 代表 X/Y 能被 c 匹配的位置掩码
- 于是遍历新的 c 时，递推为：
	- nx = mx<<1&ox[c]
	- ny = my<<1&oy[c]
	- 如果刚完成 X/Y，可以开始新的 X，nx |= 1
	- 如果刚完成 X，可以开始新的 Y，ny |= 1
- 最后计算刚完成 X/Y 的状态总和即可

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

mod = 998244353
S = input()
X = input()
Y = input()
a = len(X)
b = len(Y)
ox = [0,0]                   # ox[c]：X 中能被字符 c 匹配的位置掩码（c=0或1）
oy = [0,0]
for i,c in enumerate(X):
    if c in '0?':
        ox[0] |= 1<<i
    if c in '1?':
        ox[1] |= 1<<i
for i,c in enumerate(Y):
    if c in '0?':
        oy[0] |= 1<<i
    if c in '1?':
        oy[1] |= 1<<i
f = defaultdict(int)                # f[(mx,my)] 匹配的 x/y 前缀状态为 mx/my 的方案数
f[(1<<(a-1),0)] = 1
for c in S:
    nf = defaultdict(int)
    cands = [0,1] if c=='?' else [int(c)]
    for (mx,my),w in f.items():
        for c in cands:
            nx = mx<<1&ox[c]
            ny = my<<1&oy[c]
            # 之前刚完成 X 或 Y → 可以开始新的 X
            if (mx&1<<(a-1) or my&1<<(b-1)) and ox[c]&1:
                nx |= 1
            # 之前刚完成 X→ 可以开始新的 Y
            if mx&1<<(a-1) and oy[c]&1:
                ny |= 1
            if nx or ny:
                nf[(nx,ny)] = (nf[(nx,ny)]+w)%mod
    f = nf
res = 0
for (mx,my),w in f.items():
    if mx&(1<<(a-1)) or my&(1<<(b-1)):
        res = (res+w)%mod
print(res)

```
351 ms


