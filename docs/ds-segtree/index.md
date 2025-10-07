# 数据结构（九）：线段树

- [算法学习笔记(14): 线段树](https://zhuanlan.zhihu.com/p/106118909)
- 线段树（Segment Tree）是一种二叉树形数据结构，支持区间修改和区间查询。

```python []
#  递归式 单点更新
class Seg:
    def __init__(self,n):
        N = 1<<n.bit_length()
        self.t = [0]*N*2  
        self.n = n

    def apply(self,o,x):       
        self.t[o] = x

    def merge(self,a,b):           
        return max(a,b)

    def build(self,A,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if l==r:
            self.apply(o,A[l])
            return
        m = (l+r)//2
        self.build(A,o*2,l,m)
        self.build(A,o*2+1,m+1,r)
        self.pull(o)

    def pull(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def modify(self,a,x,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if l==r:
            self.apply(o,x)
            return
        m = (l+r)//2
        if a<=m: self.modify(a,x,o*2,l,m)
        else: self.modify(a,x,o*2+1,m+1,r)
        self.pull(o)
        
    def query(self,a,b,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if a<=l and r<=b:
            return self.t[o]
        res = self.t[0]
        m = (l+r)//2
        if a<=m: res = self.query(a,b,o*2,l,m)
        if m<b: res = self.merge(res,self.query(a,b,o*2+1,m+1,r))
        return res

A = []
n = len(A)
seg = Seg(n)
seg.build(A)
```

```python
# 递归式 区间更新（lazy）
class Seg:
    def __init__(self,n):
        N = 1<<n.bit_length()
        self.t = [0]*N*2
        self.f = [0]*N*2
        self.n = n

    def apply(self,o,x):            
        self.t[o] = x
        self.f[o] = x

    def merge(self,a,b):           
        return max(a,b)

    def build(self,A,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if l==r:
            self.t[o] = A[l]
            return
        m = (l+r)//2
        self.build(A,o*2,l,m)
        self.build(A,o*2+1,m+1,r)
        self.pull(o)
    
    def pull(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def push(self,o):
        if self.f[o] != self.f[0]:
            self.apply(o*2,self.f[o])
            self.apply(o*2+1,self.f[o])
            self.f[o] = self.f[0]

    def modify(self,a,b,x,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if a<=l and r<=b:
            self.apply(o,x)
            return
        self.push(o)
        m = (l+r)//2
        if a<=m: self.modify(a,b,x,o*2,l,m)
        if m<b: self.modify(a,b,x,o*2+1,m+1,r)
        self.pull(o)
        
    def query(self,a,b,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if a<=l and r<=b:
            return self.t[o]
        self.push(o)
        res = self.t[0]
        m = (l+r)//2
        if a<=m: res = self.query(a,b,o*2,l,m)
        if m<b: res = self.merge(res,self.query(a,b,o*2+1,m+1,r))
        return res

A = []
n = len(A)
seg = Seg(n)
seg.build(A)
```

```python
# 迭代式 单点更新
class Seg:
    def __init__(self,n):  
        self.N = N = 1<<n.bit_length()         
        self.t = [0]*N*2

    def merge(self,a,b):                # 区间信息怎么合并的   
        return a+b
    
    def pull(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def build(self,A):
        self.t[self.N:self.N+len(A)] = A
        for o in range(self.N-1,0,-1):
            self.pull(o)

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

```python
# 迭代式 区间更新 （lazy）
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

单点更新
- {{< lc "0307" >}} [区域和检索 - 数组可修改](https://leetcode.cn/problems/range-sum-query-mutable/)
- {{< lc "2407" >}} [最长递增子序列 II](https://leetcode.cn/problems/longest-increasing-subsequence-ii/)
- {{< lc "2736" >}} [最大和查询](https://leetcode.cn/problems/maximum-sum-queries/)
区间更新
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


