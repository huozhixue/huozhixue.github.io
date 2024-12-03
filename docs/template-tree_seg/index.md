# 树模板：线段树

##  递归式

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


## 迭代式（zkw）

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
	while a^b^1:
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
	while a^b^1:
		if not a&1: res = max(res,t[a^1])
		if b&1: res=max(res,t[b^1])
		a,b = a>>1,b>>1
	return res

L = (ma+1).bit_length()
N = 1<<L
t = [0]*N*2
f = [0]*N*2
```

