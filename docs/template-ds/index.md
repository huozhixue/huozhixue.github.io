# 数据结构模版

## 位运算
### 遍历子集

```python
y = st                 # 生成 st 的所有子集
while y:
    # 处理子集 y
    y = (y-1)&st
```
### Gosper's Hack

-  [算法学习笔记(75): Gosper's Hack](https://zhuanlan.zhihu.com/p/360512296)

```python   
st,ma = (1<<k)-1, 1<<n                   # 生成 n 元集合所有 k 元子集
while st<ma:
    # 处理子集 st
	lb = st&-st
	r = st+lb
	st = (r^st)>>(lb.bit_length()+1)|r
	if st==0:
		break
```

##  链表

### 反转
```python
def reverse(head):
	tail = head
	while tail and tail.next:
		tmp = tail.next
		tail.next = tmp.next
		tmp.next = head
		head = tmp
	return head
```

## 栈

###  计算器

```python
def cal(s: str) -> int:
	func = {'+':int.__add__,'-':int.__sub__,'*':int.__mul__,'/':lambda x,y:x//y}
	pro = dict(zip('+-*/(','11223'))
	sk,ops = [],[]
	for x,op in re.findall('(\d+)|([-+*/()])',s+'+'):
		if x:
			sk.append(int(x))
		elif op=='(':
			ops.append(op)
		elif op==')':
			while ops[-1] != '(':
				b,a = sk.pop(),sk.pop()
				sk.append(func[ops.pop()](a,b))
			ops.pop()
		else:
			while ops and pro[ops[-1]]<=pro[op]:
				b,a = sk.pop(),sk.pop()
				sk.append(func[ops.pop()](a,b))
			ops.append(op)
	return sk.pop()
```

## 并查集

```python
def find(x):
	if f[x]!=x:
		f[x] = find(f[x])
	return f[x]

def union(x,y):
	fx, fy = find(x),find(y)
	if fx != fy:
		if sz[fx]>sz[fy]:
			fx, fy = fy, fx
		f[fx] = fy
		sz[fy] += sz[fx]
```

## st 表

```python
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

## 树状数组
```python
class BIT:
    def __init__(self, n, t):
        self.n = n
        self.t = t

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
n = len(nums)
bit = BIT(n+1,[0]*(n+1))
for i,x in enumerate(nums,1):
	bit.update(i,x)
```

## 线段树

###  递归式 单点更新

```python []
class Seg:
    def __init__(self, t):             
        self.t = t

    def merge(self,a,b):                  
        return a+b
    
    def up(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def build(self,A,o,l,r):
        if l==r:
            self.t[o] = A[l]
            return
        m = (l+r)//2
        self.build(A,o*2,l,m)
        self.build(A,o*2+1,m+1,r)
        self.up(o)

    def update(self,a,x,o,l,r):
        if l==r:
            self.t[o] = x
            return
        m = (l+r)//2
        if a<=m: self.update(a,x,o*2,l,m)
        else: self.update(a,x,o*2+1,m+1,r)
        self.up(o)

    def query(self,a,b,o,l,r):
        if a<=l and r<=b:
            return self.t[o]
        m = (l+r)//2
        res = 0
        if a<=m: res = self.query(a,b,o*2,l,m)
        if m<b: res = self.merge(res,self.query(a,b,o*2+1,m+1,r))
        return res
        
n = len(nums)
N = 1<<n.bit_length()
seg = Seg([0]*N*2)
seg.build(nums,1,0,n-1)
```

### 递归式 区间更新（lazy）


```python
class Seg:
    def __init__(self,t,f):
        self.t = t
        self.f = f

    def merge(self,a,b):           
        return a+b
    
    def up(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def apply(self,o,x):            
        self.t[o] = x
        self.f[o] = x

    def build(self,A,o,l,r):
        if l==r:
            self.t[o] = A[l]
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
        if a<=l and r<=b:
            self.apply(o,x)
            return
        self.down(o)
        m = (l+r)//2
        if a<=m: self.update(a,b,x,o*2,l,m)
        if m<b: self.update(a,b,x,o*2+1,m+1,r)
        self.up(o)
        
    def query(self,a,b,o,l,r):
        if a<=l and r<=b:
            return self.t[o]
        self.down(o)
        res = 0
        m = (l+r)//2
        if a<=m: res = self.query(a,b,o*2,l,m)
        if m<b: res = self.merge(res,self.query(a,b,o*2+1,m+1,r))
        return res

n = len(nums)
N = 1<<n.bit_length()
seg = Seg([0]*N*2,[0]*N*2)
seg.build(nums,1,0,n-1)
```

### 迭代式 单点更新

```python
class Seg:
    def __init__(self,N,t):  
        self.N = N           
        self.t = t

    def merge(self,a,b):                # 区间信息怎么合并的   
        return a+b
    
    def up(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def build(self,A):
        self.t[self.N+1:self.N+1+len(A)] = A
        for o in range(self.N-1,0,-1):
            self.up(o)

    def update(self,a,x):
        a += self.N
        self.t[a] = x
        while a>>1:
            a >>= 1
            self.up(a)

    def query(self,a,b):
        res,a,b = 0,a+self.N-1,b+self.N+1
        while b-a>1:  
            if not a&1: res = self.merge(res,self.t[a^1])  
            if b&1: res = self.merge(res,self.t[b^1])  
            a,b = a>>1,b>>1  
        return res  
        
n = len(nums)
N = 1<<(n+1).bit_length()
seg = Seg(N,[0]*N*2)
seg.build(nums)
```

### 迭代式 区间更新 （lazy）

```python
class Seg:
    def __init__(self,N,t,f):
        self.L = N.bit_length()-1
        self.N = N
        self.t = t
        self.f = f

    def merge(self,a,b):           
        return a+b
    
    def up(self,o):
        self.t[o] = self.merge(self.t[o*2],self.t[o*2+1])

    def apply(self,o,x):            
        self.t[o] = x
        self.f[o] = x

    def build(self,A):
        self.t[self.N+1:self.N+1+len(A)] = A
        for o in range(self.N-1,0,-1):
            self.up(o)

    def down(self,o):
        if self.f[o] != self.f[0]:
            self.apply(o*2,self.f[o])
            self.apply(o*2+1,self.f[o])
            self.f[o] = self.f[0]

    def update(self,a,b,x):
        a,b = a+self.N-1,b+self.N+1  
        for i in range(self.L-1,0,-1):  
            self.down(a>>i)  
            self.down(b>>i)  
        while a^b^1:  
            if not a&1: self.apply(a^1,x)  
            if b&1: self.apply(b^1,x)  
            a,b = a>>1,b>>1  
            self.up(a)  
            self.up(b)  
        while a>>1:
            a >>= 1
            self.up(a)

    def query(self,a,b):
        a,b = a+self.N-1,b+self.N+1  
        for i in range(self.L-1,0,-1):  
            self.down(a>>i)  
            self.down(b>>i)  
        res = 0
        while a^b^1:  
            if not a&1: res = self.merge(res,self.t[a^1])
            if b&1: res = self.merge(res,self.t[b^1])
            a,b = a>>1,b>>1  
        return res

n = len(nums)
N = 1<<(n+1).bit_length()   
seg = Seg(N,[0]*N*2,[0]*N*2)
seg.build(nums)
```


## 有序集合

### SortedList

```python []
import math  
from bisect import bisect_right,bisect_left  
class SortedList():  
    BUCKET_RATIO = 16  
    SPLIT_RATIO = 24  
    def __init__(self, a=[]):  
        a = list(a)  
        n = self.size = len(a)  
        if any(a[i] > a[i + 1] for i in range(n - 1)):  
            a.sort()  
        num_bucket = int(math.ceil(math.sqrt(n / self.BUCKET_RATIO)))  
        self.a = [a[n * i // num_bucket : n * (i + 1) // num_bucket] for i in range(num_bucket)]  
    def __iter__(self):  
        for i in self.a:  
            for j in i: yield j  
    def __reversed__(self):  
        for i in reversed(self.a):  
            for j in reversed(i): yield j  
    def __eq__(self, other):  
        return list(self) == list(other)  
    def __len__(self):  
        return self.size  
    def __repr__(self):  
        return "SortedMultiset" + str(self.a)  
    def __str__(self):  
        s = str(list(self))  
        return "{" + s[1 : len(s) - 1] + "}"  
    def _position(self, x):  
        for i, a in enumerate(self.a):  
            if x <= a[-1]: break  
        return (a, i, bisect_left(a, x))  
    def __contains__(self, x):  
        if self.size == 0: return False  
        a, _, i = self._position(x)  
        return i != len(a) and a[i] == x  
    def add(self, x):  
        if self.size == 0:  
            self.a = [[x]]  
            self.size = 1  
            return  
        a, b, i = self._position(x)  
        a.insert(i, x)  
        self.size += 1  
        if len(a) > len(self.a) * self.SPLIT_RATIO:  
            mid = len(a) >> 1  
            self.a[b:b+1] = [a[:mid], a[mid:]]  
    def _pop(self, a, b, i):  
        ans = a.pop(i)  
        self.size -= 1  
        if not a: del self.a[b]  
        return ans  
    def remove(self, x):  
        if self.size == 0: return False  
        a, b, i = self._position(x)  
        if i == len(a) or a[i] != x: return False  
        self._pop(a, b, i)  
        return True  
    def __getitem__(self, i):  
        if i < 0:  
            for a in reversed(self.a):  
                i += len(a)  
                if i >= 0: return a[i]  
        else:  
            for a in self.a:  
                if i < len(a): return a[i]  
                i -= len(a)  
        raise IndexError  
    def pop(self, i = -1):  
        if i < 0:  
            for b, a in enumerate(reversed(self.a)):  
                i += len(a)  
                if i >= 0: return self._pop(a, ~b, i)  
        else:  
            for b, a in enumerate(self.a):  
                if i < len(a): return self._pop(a, b, i)  
                i -= len(a)  
        raise IndexError  
    def index(self, x):  
        ans = 0  
        for a in self.a:  
            if a[-1] >= x:  
                return ans + bisect_left(a, x)  
            ans += len(a)  
        return ans  
    def bisect_right(self, x):  
        ans = 0  
        for a in self.a:  
            if a[-1] > x:  
                return ans + bisect_right(a, x)  
            ans += len(a)  
        return ans
```

