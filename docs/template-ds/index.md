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

### 双向链表

```python
class Node:
    # 提高访问属性的速度，并节省内存
    __slots__ = 'pre', 'nxt', 'key', 'val'

    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.pre = self
        self.nxt = self

    def insert(self,x):
        q = self.nxt
        self.nxt = x
        x.pre = self
        x.nxt = q
        q.pre = x
    
    def remove(self,):
        self.pre.nxt = self.nxt
        self.nxt.pre = self.pre
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
class DSU:
    def __init__(self,n):
        self.f = list(range(n))
        self.sz = [1]*n
        self.cc = n
    
    def find(self,x):
        f,y = self.f,x
        while f[y]!=y:
            y = f[y]
        while f[x]!=y:
            f[x],x = y,f[x]
        return y
    
    def union(self,x,y):
        f,sz = self.f,self.sz
        fx,fy = self.find(x),self.find(y)
        if fx==fy:
            return False
        if sz[fx]>sz[fy]:
            fx,fy = fy,fx
        f[fx] = fy
        sz[fy] += sz[fx]
        self.cc -= 1
        return True
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

## 块状数组 懒标记

```python []
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

## 线段树

###  递归式 单点更新

```python []
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

### 递归式 区间更新（lazy）

```python
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

### 迭代式 单点更新

```python
class Seg:
    def __init__(self,N):  
        self.N = N           
        self.t = [0]*N*2

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
        a,b = a+self.N-1,b+self.N+1
        lres,rres = 0,0
        while a^b^1:  
            if not a&1: lres = self.merge(lres,self.t[a^1])  
            if b&1: rres = self.merge(self.t[b^1],rres)  
            a,b = a>>1,b>>1  
        return self.merge(lres,rres)  
    
    def find_right(self,a,func):
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

    def find_left(self,b,func):
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
N = 1<<(n+1).bit_length()
seg = Seg(N)
seg.build(A)
```

### 迭代式 区间更新 （lazy）

```python
class Seg:
    def __init__(self,N):
        self.L = N.bit_length()-1
        self.N = N
        self.t = [0]*N*2
        self.f = [0]*N*2

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
        for i in range(self.L,0,-1):  
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
        for i in range(self.L,0,-1):  
            self.down(a>>i)  
            self.down(b>>i)  
        lres,rres = 0,0
        while a^b^1:  
            if not a&1: lres = self.merge(lres,self.t[a^1])
            if b&1: rres = self.merge(self.t[b^1],rres)
            a,b = a>>1,b>>1  
        return self.merge(lres,rres)
    
    def find_right(self,a,func):
        a += self.N
        lres = 0
        for i in range(self.L,0,-1):  
            self.down(a>>i) 
        while True:
            while not a&1:
                a >>= 1
            tmp = self.merge(lres,self.t[a])
            if func(tmp):
                while a<self.N:
                    self.down(a)
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

    def find_left(self,b,func):
        b += self.N
        rres = 0
        for i in range(self.L,0,-1):  
            self.down(b>>i) 
        while True:
            while b>1 and b&1:
                b >>= 1
            tmp = self.merge(self.t[b],rres)
            if func(tmp):
                while b<self.N:
                    self.down(b)
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
N = 1<<(n+1).bit_length()   
seg = Seg(N)
seg.build(A)
```


## 有序集合

### SortedList

```python []
class SortedList:
    def __init__(self, iterable=[], _load=200):
        """Initialize sorted list instance."""
        values = sorted(iterable)
        self._len = _len = len(values)
        self._load = _load
        self._lists = _lists = [values[i:i + _load] for i in range(0, _len, _load)]
        self._list_lens = [len(_list) for _list in _lists]
        self._mins = [_list[0] for _list in _lists]
        self._fen_tree = []
        self._rebuild = True

    def _fen_build(self):
        """Build a fenwick tree instance."""
        self._fen_tree[:] = self._list_lens
        _fen_tree = self._fen_tree
        for i in range(len(_fen_tree)):
            if i | i + 1 < len(_fen_tree):
                _fen_tree[i | i + 1] += _fen_tree[i]
        self._rebuild = False

    def _fen_update(self, index, value):
        """Update `fen_tree[index] += value`."""
        if not self._rebuild:
            _fen_tree = self._fen_tree
            while index < len(_fen_tree):
                _fen_tree[index] += value
                index |= index + 1

    def _fen_query(self, end):
        """Return `sum(_fen_tree[:end])`."""
        if self._rebuild:
            self._fen_build()

        _fen_tree = self._fen_tree
        x = 0
        while end:
            x += _fen_tree[end - 1]
            end &= end - 1
        return x

    def _fen_findkth(self, k):
        """Return a pair of (the largest `idx` such that `sum(_fen_tree[:idx]) <= k`, `k - sum(_fen_tree[:idx])`)."""
        _list_lens = self._list_lens
        if k < _list_lens[0]:
            return 0, k
        if k >= self._len - _list_lens[-1]:
            return len(_list_lens) - 1, k + _list_lens[-1] - self._len
        if self._rebuild:
            self._fen_build()

        _fen_tree = self._fen_tree
        idx = -1
        for d in reversed(range(len(_fen_tree).bit_length())):
            right_idx = idx + (1 << d)
            if right_idx < len(_fen_tree) and k >= _fen_tree[right_idx]:
                idx = right_idx
                k -= _fen_tree[idx]
        return idx + 1, k

    def _delete(self, pos, idx):
        """Delete value at the given `(pos, idx)`."""
        _lists = self._lists
        _mins = self._mins
        _list_lens = self._list_lens

        self._len -= 1
        self._fen_update(pos, -1)
        del _lists[pos][idx]
        _list_lens[pos] -= 1

        if _list_lens[pos]:
            _mins[pos] = _lists[pos][0]
        else:
            del _lists[pos]
            del _list_lens[pos]
            del _mins[pos]
            self._rebuild = True

    def _loc_left(self, value):
        """Return an index pair that corresponds to the first position of `value` in the sorted list."""
        if not self._len:
            return 0, 0

        _lists = self._lists
        _mins = self._mins

        lo, pos = -1, len(_lists) - 1
        while lo + 1 < pos:
            mi = (lo + pos) >> 1
            if value <= _mins[mi]:
                pos = mi
            else:
                lo = mi

        if pos and value <= _lists[pos - 1][-1]:
            pos -= 1

        _list = _lists[pos]
        lo, idx = -1, len(_list)
        while lo + 1 < idx:
            mi = (lo + idx) >> 1
            if value <= _list[mi]:
                idx = mi
            else:
                lo = mi

        return pos, idx

    def _loc_right(self, value):
        """Return an index pair that corresponds to the last position of `value` in the sorted list."""
        if not self._len:
            return 0, 0

        _lists = self._lists
        _mins = self._mins

        pos, hi = 0, len(_lists)
        while pos + 1 < hi:
            mi = (pos + hi) >> 1
            if value < _mins[mi]:
                hi = mi
            else:
                pos = mi

        _list = _lists[pos]
        lo, idx = -1, len(_list)
        while lo + 1 < idx:
            mi = (lo + idx) >> 1
            if value < _list[mi]:
                idx = mi
            else:
                lo = mi

        return pos, idx

    def add(self, value):
        """Add `value` to sorted list."""
        _load = self._load
        _lists = self._lists
        _mins = self._mins
        _list_lens = self._list_lens

        self._len += 1
        if _lists:
            pos, idx = self._loc_right(value)
            self._fen_update(pos, 1)
            _list = _lists[pos]
            _list.insert(idx, value)
            _list_lens[pos] += 1
            _mins[pos] = _list[0]
            if _load + _load < len(_list):
                _lists.insert(pos + 1, _list[_load:])
                _list_lens.insert(pos + 1, len(_list) - _load)
                _mins.insert(pos + 1, _list[_load])
                _list_lens[pos] = _load
                del _list[_load:]
                self._rebuild = True
        else:
            _lists.append([value])
            _mins.append(value)
            _list_lens.append(1)
            self._rebuild = True

    def discard(self, value):
        """Remove `value` from sorted list if it is a member."""
        _lists = self._lists
        if _lists:
            pos, idx = self._loc_right(value)
            if idx and _lists[pos][idx - 1] == value:
                self._delete(pos, idx - 1)

    def remove(self, value):
        """Remove `value` from sorted list; `value` must be a member."""
        _len = self._len
        self.discard(value)
        if _len == self._len:
            raise ValueError('{0!r} not in list'.format(value))

    def pop(self, index=-1):
        """Remove and return value at `index` in sorted list."""
        pos, idx = self._fen_findkth(self._len + index if index < 0 else index)
        value = self._lists[pos][idx]
        self._delete(pos, idx)
        return value

    def bisect_left(self, value):
        """Return the first index to insert `value` in the sorted list."""
        pos, idx = self._loc_left(value)
        return self._fen_query(pos) + idx

    def bisect_right(self, value):
        """Return the last index to insert `value` in the sorted list."""
        pos, idx = self._loc_right(value)
        return self._fen_query(pos) + idx

    def count(self, value):
        """Return number of occurrences of `value` in the sorted list."""
        return self.bisect_right(value) - self.bisect_left(value)

    def __len__(self):
        """Return the size of the sorted list."""
        return self._len

    def __getitem__(self, index):
        """Lookup value at `index` in sorted list."""
        pos, idx = self._fen_findkth(self._len + index if index < 0 else index)
        return self._lists[pos][idx]

    def __delitem__(self, index):
        """Remove value at `index` from sorted list."""
        pos, idx = self._fen_findkth(self._len + index if index < 0 else index)
        self._delete(pos, idx)

    def __contains__(self, value):
        """Return true if `value` is an element of the sorted list."""
        _lists = self._lists
        if _lists:
            pos, idx = self._loc_left(value)
            return idx < len(_lists[pos]) and _lists[pos][idx] == value
        return False

    def __iter__(self):
        """Return an iterator over the sorted list."""
        return (value for _list in self._lists for value in _list)

    def __reversed__(self):
        """Return a reverse iterator over the sorted list."""
        return (value for _list in reversed(self._lists) for value in reversed(_list))

    def __repr__(self):
        """Return string representation of sorted list."""
        return 'SortedList({0})'.format(list(self))
```

