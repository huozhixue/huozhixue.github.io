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
```python []
def add(i,x):             # 更新 t[i] 加上 x
	while i<ma:
		t[i] += x
		i += i&-i

def get(i):               # t[:i+1] 的和
	res = 0
	while i:
		res += t[i]
		i &= i-1
	return res

ma = len(nums)+1
t = defaultdict(int)
```

## 线段树

###  递归式

```python
def build(o,l,r):
	if l==r:
		t[o] = A[l]
		return
	m = (l+r)//2
	build(o*2,l,m)
	build(o*2+1,m+1,r)
	t[o] = max(t[o*2],t[o*2+1])

def do(o,x):            # 收到更新信息 x 后，树节点和懒标记的具体操作
	t[o] = max(t[o],x)
	f[o] = max(f[o],x)

def down(o):
	if f[o]:
		do(o*2,f[o])
		do(o*2+1,f[o])
		f[o] = 0

def update(a,b,x,o,l,r):
	if a<=l and r<=b:
		do(o,x)
		return 
	m = (l+r)//2
	down(o)
	if a<=m: update(a,b,x,o*2,l,m)
	if m<b: update(a,b,x,o*2+1,m+1,r)
	t[o] = max(t[o*2],t[o*2+1])

def query(a,b,o,l,r):
	if a<=l and r<=b:
		return t[o]
	m = (l+r)//2
	down(o)
	res = 0
	if a<=m: res = query(a,b,o*2,l,m)
	if m<b: res = max(res,query(a,b,o*2+1,m+1,r))
	return res

t = [0]*n*4                 # 树节点，维护区间信息
f = [0]*n*4                 # 懒标记，注意让初始值代表无标记
```


### 迭代式（zkw）

```python
def build(A):
	t[N:N+len(A)] = A 
	for a in range(N-1,0,-1):
		t[a] = max(t[a*2],t[a*2+1])
		
def do(o,x):
	t[o] = max(t[o],x)
	f[o] = max(f[o],x)

def down(o):
	if f[o]:
		do(o*2,f[o])
		do(o*2+1,f[o])
		f[o] = 0

def update(a,b,x):
	a,b = a+N-1,b+N+1
	for i in range(L-1,0,-1): 
		down(a>>i)
		down(b>>i)
	while b-a>1:
		if not a&1: do(a^1,x)
		if b&1: do(b^1,x)
		a,b = a>>1,b>>1
		t[a] = max(t[a*2],t[a*2+1])
		t[b] = max(t[b*2],t[b*2+1])
	while a:
		t[a] = max(t[a*2],t[a*2+1])
		a >>= 1

def query(a,b):
	res,a,b = 0,a+N-1,b+N+1
	for i in range(L-1,0,-1): 
		down(a>>i)
		down(b>>i)
	while b-a>1:
		if not a&1: res = max(res,t[a^1])
		if b&1: res=max(res,t[b^1])
		a,b = a>>1,b>>1
	return res

L = (ma+1).bit_length()
N = 1<<L
t = [0]*N*2
f = [0]*N*2
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

