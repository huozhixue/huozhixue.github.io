# 数据结构（八）：区间信息

- 区间静态查询：前缀和、st 表、莫队、猫树
- 区间修改+最终查询：差分
- 单点修改、区间查询：树状数组
- 区间修改、区间查询：线段树、块状数组

#### 块状数组
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

#### st 表

```python
# st 表
class ST:
    def __init__(self,A,func=max):
        f = A[:]
        self.st = st = [f]
        j, N = 1, len(f)
        while 2*j<=N:
            f = [func(f[i],f[i+j]) for i in range(N-2*j+1)]
            st.append(f)
            j <<= 1
        self.func = func
            
    def query(self,l,r):
        j = (r-l+1).bit_length()-1
        return self.func(self.st[j][l],self.st[j][r-(1<<j)+1])
```

#### 树状数组

```python
#树状数组
class BIT:
    def __init__(self, n):
        self.n = n
        self.t = [0]*n
        self.L = n.bit_length()

    def update(self, i, x):
        while i<self.n:
            self.t[i] += x
            i += i&-i

    def get(self, i):
        res = 0
        while i:
            res += self.t[i]
            i &= i-1
        return res
    
    def query(self,l,r):
        return self.get(r)-self.get(l-1)
    
    def kth(self, k):
        x = 0
        for i in range(self.L-1,-1,-1):
            y = x|1<<i
            if y<self.n and self.t[y]<k:
                x = y
                k -= self.t[y]
        return x+1

A = []
n = len(A)
bit = BIT(n+1)
for i,x in enumerate(A,1):
	bit.update(i,x)
```

####  线段树 单点修改

```python []
#  线段树 单点修改
class Seg:
    def __init__(self,n):  
        self.N = N = 1<<n.bit_length()         
        self.t = [0]*N*2

    def merge(self,a,b):                # 区间信息怎么合并的   
        return a+b

    def build(self,A):
        self.t[self.N:self.N+len(A)] = A
        for o in range(self.N-1,0,-1):
            self.pull(o)

    def pull(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def modify(self,a,x):
        a += self.N
        self.t[a] = x
        while a>>1:
            a >>= 1
            self.pull(a)

    def query(self,a,b):
        a,b = a+self.N-1,b+self.N+1
        lres,rres = 0,0
        while a^b^1:  
            if not a&1: lres = self.merge(lres,self.t[a^1])  
            if b&1: rres = self.merge(self.t[b^1],rres)  
            a,b = a>>1,b>>1  
        return self.merge(lres,rres)  
    
    # 递归式修改
    def _modify(self,a,x,o=1,l=0,r=None):
        r = self.N-1 if r is None else r
        if l==r:
            self.t[o] = x
            return
        m = (l+r)//2
        if a<=m: self._modify(a,x,o*2,l,m)
        else: self._modify(a,x,o*2+1,m+1,r)
        self.pull(o)
    
    # 递归式查询
    def _query(self,a,b,o=1,l=0,r=None):
        r = self.N-1 if r is None else r
        if a<=l and r<=b:
            return self.t[o]
        res = self.t[0]
        m = (l+r)//2
        if a<=m: res = self._query(a,b,o*2,l,m)
        if m<b: res = self.merge(res,self._query(a,b,o*2+1,m+1,r))
        return res
    
    def find_first(self,a,func):
        a += self.N
        lres = 0
        while True:
            while not a&1:
                a >>= 1
            tmp = self.merge(lres,self.t[a])
            if func(tmp):
                while a<self.N:
                    a <<= 1
                    tmp2 = self.merge(lres,self.t[a])
                    if not func(tmp2):
                        lres = tmp2
                        a += 1
                return a-self.N
            if a&(a+1)==0:
                return self.N
            lres = tmp
            a += 1

    def find_last(self,b,func):
        b += self.N
        rres = 0
        while True:
            while b>1 and b&1:
                b >>= 1
            tmp = self.merge(self.t[b],rres)
            if func(tmp):
                while b<self.N:
                    b = 2*b+1
                    tmp2 = self.merge(self.t[b],rres)
                    if not func(tmp2):
                        rres = tmp2
                        b -= 1
                return b-self.N
            if b&(b-1)==0:
                return -1
            rres = tmp
            b -= 1

A = []
n = len(A)
seg = Seg(n)
seg.build(A)
```

#### lazy 线段树 区间修改

```python
# lazy 线段树 区间修改
class Seg:
    def __init__(self,n):
        self.L = n.bit_length()
        self.N = N = 1<<self.L
        self.t = [0]*N*2
        self.f = [0]*N*2
        
    def apply(self,o,x):            
        self.t[o] += x
        self.f[o] += x

    def merge(self,a,b):           
        return max(a,b)
    
    def build(self,A):
        self.t[self.N:self.N+len(A)] = A
        for o in range(self.N-1,0,-1):
            self.pull(o)

    def pull(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def push(self,o):
        if self.f[o] != self.f[0]:
            self.apply(o*2,self.f[o])
            self.apply(o*2+1,self.f[o])
            self.f[o] = self.f[0]

    def modify(self,a,b,x):
        a,b = a+self.N-1,b+self.N+1  
        for i in range(self.L,0,-1):  
            self.push(a>>i)  
            self.push(b>>i)  
        while a^b^1:  
            if not a&1: self.apply(a^1,x)  
            if b&1: self.apply(b^1,x)  
            a,b = a>>1,b>>1  
            self.pull(a)  
            self.pull(b)  
        while a>>1:
            a >>= 1
            self.pull(a)

    def query(self,a,b):
        a,b = a+self.N-1,b+self.N+1  
        for i in range(self.L,0,-1):  
            self.push(a>>i)  
            self.push(b>>i)  
        lres,rres = 0,0
        while a^b^1:  
            if not a&1: lres = self.merge(lres,self.t[a^1])
            if b&1: rres = self.merge(self.t[b^1],rres)
            a,b = a>>1,b>>1  
        return self.merge(lres,rres)
    
    # 递归式修改
    def _modify(self,a,b,x,o=1,l=0,r=None):
        r = self.N-1 if r is None else r
        if a<=l and r<=b:
            self.apply(o,x)
            return
        self.push(o)
        m = (l+r)//2
        if a<=m: self._modify(a,b,x,o*2,l,m)
        if m<b: self._modify(a,b,x,o*2+1,m+1,r)
        self.pull(o)
    
    # 递归式查询
    def _query(self,a,b,o=1,l=0,r=None):
        r = self.N-1 if r is None else r
        if a<=l and r<=b:
            return self.t[o]
        self.push(o)
        res = self.t[0]
        m = (l+r)//2
        if a<=m: res = self._query(a,b,o*2,l,m)
        if m<b: res = self.merge(res,self._query(a,b,o*2+1,m+1,r))
        return res
    
    def find_first(self,a,func):
        a += self.N
        lres = 0
        for i in range(self.L,0,-1):  
            self.push(a>>i) 
        while True:
            while not a&1:
                a >>= 1
            tmp = self.merge(lres,self.t[a])
            if func(tmp):
                while a<self.N:
                    self.push(a)
                    a <<= 1
                    tmp2 = self.merge(lres,self.t[a])
                    if not func(tmp2):
                        lres = tmp2
                        a += 1
                return a-self.N
            if a&(a+1)==0:
                return self.N
            lres = tmp
            a += 1

    def find_last(self,b,func):
        b += self.N
        rres = 0
        for i in range(self.L,0,-1):  
            self.push(b>>i) 
        while True:
            while b>1 and b&1:
                b >>= 1
            tmp = self.merge(self.t[b],rres)
            if func(tmp):
                while b<self.N:
                    self.push(b)
                    b = 2*b+1
                    tmp2 = self.merge(self.t[b],rres)
                    if not func(tmp2):
                        rres = tmp2
                        b -= 1
                return b-self.N
            if b&(b-1)==0:
                return -1
            rres = tmp
            b -= 1

A = []
n = len(A)
seg = Seg(n)
seg.build(A)
```

单点修改
- {{< lc "0307" >}} [区域和检索 - 数组可修改](https://leetcode.cn/problems/range-sum-query-mutable/)
- {{< lc "2407" >}} [最长递增子序列 II](https://leetcode.cn/problems/longest-increasing-subsequence-ii/)
- {{< lc "2736" >}} [最大和查询](https://leetcode.cn/problems/maximum-sum-queries/)
- {{< lc "0673" >}} [最长递增子序列的个数](https://leetcode.cn/problems/number-of-longest-increasing-subsequence/)
二维
- {{< lc "0308" >}} 二维区域和检索 - 可变

区间修改（赋相同值可用珂朵莉树）
- {{< lc "0699" >}} [掉落的方块](https://leetcode.cn/problems/falling-squares/)
- {{< lc "0715" >}} [Range 模块](https://leetcode.cn/problems/range-module/)
- {{< lc "0732" >}} [我的日程安排表 III](https://leetcode.cn/problems/my-calendar-iii/)
- {{< lc "2276" >}} [统计区间中的整数数目](https://leetcode.cn/problems/count-integers-in-intervals/)
- {{< lc "2569" >}} [更新数组后处理求和查询](https://leetcode.cn/problems/handling-sum-queries-after-update/)
- {{< lc "lcp05" >}} [发 LeetCoin](https://leetcode.cn/problems/coin-bonus/)

区间多个信息
- {{< lc "1157" >}} [子数组中占绝大多数的元素](https://leetcode.cn/problems/online-majority-element-in-subarray/)
- {{< lc "1622" >}} [奇妙序列](https://leetcode.cn/problems/fancy-sequence/)
- {{< lc "2213" >}} [由单个字符重复的最长子字符串](https://leetcode.cn/problems/longest-substring-of-one-repeating-character/)

树上二分
- {{< lc "2286" >}} [以组为单位订音乐会的门票](https://leetcode.cn/problems/booking-concert-tickets-in-groups/)


#### 无旋 treap 

```python []
# 无旋 treap
class Node:
    __slots__ = ('l','r','prio','sz','val','xo','rev')
    def __init__(self, v):
        self.l = self.r = None
        self.prio = random.randrange(1 << 30)
        self.sz = 1
        self.val = v
        self.xo = v
        self.rev = 0

def pull(t):                    # 结构改变后更新信息
    t.sz = 1
    t.xo = t.val
    if t.l:
        t.sz += t.l.sz
        t.xo ^= t.l.xo
    if t.r:
        t.sz += t.r.sz
        t.xo ^= t.r.xo

def push(t):                    # 下传懒标记
    if t and t.rev:
        t.l, t.r = t.r, t.l
        if t.l: t.l.rev ^= 1
        if t.r: t.r.rev ^= 1
        t.rev = 0

def split(t,k):                 # 按前k个节点/剩余节点拆分
    if not t:
        return None,None
    push(t)
    lsz = t.l.sz if t.l else 0
    if lsz >= k:
        L,R = split(t.l,k)
        t.l = R
        pull(t)
        return L,t
    else:
        L,R = split(t.r,k-lsz-1)
        t.r = L
        pull(t)
        return t,R

def merge(u,v):                 # 合并，u中最大值小于v中最小值
    if not u or not v:
        return u or v
    if u.prio<v.prio:
        push(u)
        u.r = merge(u.r, v)
        pull(u)
        return u
    else:
        push(v)
        v.l = merge(u,v.l)
        pull(v)
        return v
```
