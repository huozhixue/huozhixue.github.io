# 力扣总结 算法模板


## 1 字符串匹配

### 1.1 kmp

```python
def kmp(s):
	nxt, j = [-1], -1
	for i in range(len(s)):
		while j >= 0 and s[i] != s[j]:
			j = nxt[j]
		j += 1
		nxt.append(j)
	return nxt     # nxt[i]:i-1结尾的最大真前缀长度
```

### 1.2 manacher

```python
def manacher(s):
	n = len(s)
	A, B = [], [1]*n
	mid, r = 0, 0
	for i in range(n):
		a = min(A[2*mid-i], r-i) if r>i else 0
		while i-a and i+a<n-1 and s[i-a-1]==s[i+a+1]:
			a += 1
			B[i+a] = max(B[i+a],a*2+1)
		A.append(a)
		if i+a>r:
			mid, r = i, i+a
	return B       # B[i]:i结尾的最大回文子串长度（奇数）
```

### 1.3 z 函数

```python
def zfunc(s):
	n = len(s)
	z, l, r = [0]*n, 0, 0
	for i in range(1,n):
		z[i] = max(min(z[i-l],r-i+1), 0)
		while i+z[i]<n and s[z[i]]==s[i+z[i]]:
			l, r = i, i+z[i]
			z[i] += 1
	return z      # z[i]:lcp(后缀i,后缀0) 
```

### 1.4 滚动哈希

```python
## 滚动哈希
base, mod = 29, 10**11+13
B = [1]
for _ in range(3*10**4):
    B.append(B[-1]*base%mod)
def gen(A):
    return list(accumulate([0]+A,lambda a,b:(a*base+b)%mod))
def cal(pre,i,j):
    return (pre[j+1]-pre[i]*B[j-i+1])%mod
```

### 1.5 后缀数组

```python
def SA(A):
	def SA_IS(A):
		def equal(pos1, pos2):
			end1, end2 = LMS.find('*', pos1+1), LMS.find('*', pos2+1)
			return A[pos1:end1+1] == A[pos2:end2+1]

		def IS(stars):
			sa = [n] + [-1] * n
			tails = list(accumulate(bucket))
			for i in stars[::-1]:
				sa[tails[A[i]]] = i
				tails[A[i]] -= 1
			heads = list(accumulate([1] + bucket[:-1]))
			for i in range(n + 1):
				j = sa[i] - 1
				if j >= 0 and types[j] == 'L':
					sa[heads[A[j]]] = j
					heads[A[j]] += 1
			tails = list(accumulate(bucket))
			for i in range(n, -1, -1):
				j = sa[i] - 1
				if j >= 0 and types[j] == 'S':
					sa[tails[A[j]]] = j
					tails[A[j]] -= 1
			return sa[1:]
		n = len(A)
		types = list('0' * (n - 1) + 'LS')
		for i in range(n - 2, -1, -1):
			types[i] = 'S' if A[i] < A[i + 1] else 'L' if A[i] > A[i + 1] else types[i + 1]
		LMS = ''.join('*' if types[i - 1:i + 1] == ['L', 'S'] else ' ' for i in range(n + 1))
		ct = Counter(A)
		bucket = [ct[x] for x in range(max(ct) + 1)]
		stars = [i for i in range(n) if LMS[i] == '*']
		sa = IS(stars)
		d, cnt, prev = {}, 0, -1
		for pos in sa:
			if LMS[pos] == '*':
				cnt += prev < 0 or not equal(prev, pos)
				d[pos] = cnt
				prev = pos
		B = [d[pos] for pos in stars]
		d1 = {x-1:i for i,x in enumerate(B)}
		sa1 = [d1[x] for x in range(cnt)] if cnt == len(B) else SA_IS(B)
		return IS([stars[pos] for pos in sa1])
	
	def SA_h(A,sa):
		n = len(A)
		rk, height, h = [0]*n,[0]*n,0
		for i in range(n):
			rk[sa[i]] = i
		for i in range(n):
			h = max(0, h-1)
			j = sa[rk[i]-1] if rk[i] else n
			while max(i,j)+h<n and A[i+h]==A[j+h]:
				h += 1
			height[rk[i]] = h
		return rk, height
	sa = SA_IS(A)           # sa[i]:第i小的后缀编号
	rk, height = SA_h(A,sa) # rk[i]:后缀i的排名
	return sa,rk,height     # height[i]:lcp(sa[i],sa[i-1])
```

## 2 计算器




## 3 贪心

### 3.1 下一个排列

```python
def nxt(A):
	n = len(A)
	i = n-2
	while i >= 0 and A[i] >= A[i+1]:
		i -= 1
	if i < 0:
		return []
	j = n-1
	while A[j] <= A[i]:
		j -= 1
	A[i], A[j] = A[j], A[i]
	A[i+1:] = A[i+1:][::-1]
	return A
```


## 4 数学

### 4.1 质因数分解

```python
ma = 

def get_primes(M):
    f = [1]*M
    for i in range(2,isqrt(M)+1):
        if f[i]:
            f[i*i:M:i] = [0] * ((M-1-i*i)//i+1)
    return [i for i in range(2,M) if f[i]]

primes = get_primes(isqrt(ma)+1)

@cache
def factor(x):
    ct = Counter()
    for p in primes:
        while x%p==0:
            x//=p
            ct[p] += 1
    if x>1:
        ct[x] += 1
    return ct
```

### 4.2 乘法逆元

```python
ma = 
mod = 10**9+7
fac, inv = [1]*(ma+1), [1]*(ma+1)
for i in range(1,ma+1):
    fac[i] = fac[i-1]*i%mod
    inv[i] = pow(fac[i],-1,mod)
```

### 4.3 爬山法
```python
def climb(p,cal):
	eps, step = 1e-7, 1
	while step > eps:
		for i,w in product(range(len(p)),[step,-step]):
			p2 = [a+w*(j==i) for j,a in enumerate(p)]
			if cal(p2)<cal(p):
				p = p2
				break
		else:
			step *= 0.5
	return p
```

## 5 并查集

```python
def find(x):
	if f.setdefault(x,x)!=x:
		f[x] = find(f[x])
	return f[x]

def union(x,y):
	fx, fy = find(x),find(y)
	if fx != fy:
		if sz[fx]>sz[fy]:
			fx, fy = fy, fx
		f[fx] = fy
		sz[fy] += sz[fx]

f, sz = {}, defaultdict(lambda: 1)
```

## 6 图

### 6.1 最短路

#### 6.1.1 dijkstra

```python
def dij(nxt,s):
	pq, D = [(0,s)], defaultdict(lambda:inf)
	D[s] = 0
	while pq:
		w,u = heappop(pq)
		if w>D[u]:
			continue
		for v,w2 in nxt[u]:
			nw = w+w2
			if nw<D[v]:
				D[v] = nw
				heappush(pq, (nw,v))
	return D
```

```python
def dij(s):
	Q, d = set(range(n)), [inf]*n
	d[s] = 0
	while Q:
		u = min(Q, key=d.__getitem__)
		Q.remove(u)
		for v, w in nxt[u]:
			if v in Q:
				d[v] = min(d[v], d[u]+w)
```

### 6.2 拓扑排序

#### 6.2.1 博弈反推

```python
Q = deque(res)                  # res[u]：终态 u 的胜负结果
while Q:
	u = Q.popleft()
	if u==start:                # start：初始态
		return res[u]
	for v in nxt[u]:
		if v in res:
			continue
		if v[-1]==res[u]:
			res[v] = res[u]
			Q.append(v)
		else:
			indeg[v]-=1
			if indeg[v]==0:
				res[v] = res[u]
				Q.append(v)
```

### 6.3 欧拉图

```python
def dfs(u):
	while nxt[u]:
		dfs(nxt[u].pop())
	res.append(u)
```

## 7 字典树

```python
T = lambda: defaultdict(T)
trie = T()
for w in words:
	reduce(dict.__getitem__, w, trie)['#'] = w
```

```python
y = 0
for j in range(ma-1,-1,-1):
	y *= 2
	y += T[j][(y+1)^(x>>j)]>0
```

```python []
class Trie:
    def __init__(self,n,L,k):
        self.t = [[0]*k for _ in range(n*L+1)]
        self.i = 0
        self.f = [False]*(n*L+1)  
        self.L = L

    def add(self, A):  
        p = 0
        for a in A:
            if not self.t[p][a]:
                self.i += 1
                self.t[p][a] = self.i  
            p = self.t[p][a]
        self.f[p] = True

    def find(self, A):  
        p = 0
        for a in A:
            if not self.t[p][a]:
                return False
            p = self.t[p][a]
        return self.f[p]
```

```python
class BitTrie:
    def __init__(self,n,L):
        self.t = [[0]*(n*L+1) for _ in range(2)]
        self.i = 0
        self.L = L
        self.s = [0]*(n*L+1)

    def add(self, x):
        p = 0
        for j in range(self.L-1, -1, -1):
            bit = (x>>j)&1
            if not self.t[bit][p]:
                self.i += 1
                self.t[bit][p] = self.i  
            p = self.t[bit][p]
            self.s[p] += 1
            
    def remove(self,x):
        p = 0
        for j in range(self.L-1,-1,-1):
            bit = (x>>j)&1
            p = self.t[bit][p]
            self.s[p]-=1
        
    def lowxor(self, x, high):
        res = 0
        p = 0
        for j in range(self.L-1, -1, -1):
            bit = (x>>j)&1
            h = (high>>j)&1
            if h:
                res += self.s[self.t[bit][p]]
            if not self.t[bit^h][p]:
                return res
            p = self.t[bit^h][p]
        return res

    def maxxor(self,x):
        p = 0
        res = 0
        for j in range(self.L-1, -1, -1):
            bit = (x>>j)&1
            if self.t[bit^1][p]:
                res |= 1 << j
                bit ^= 1
            p = self.t[bit][p]
        return res
```


## 8 区间查询

### 8.1 树状数组

#### 8.1.1 动态区间和

```python
class BIT:
    def __init__(self, A):
        self.tree = [0]*(len(A)+1)
        self.A = [0]*len(A)
        for i,a in enumerate(A):
            self.update(i,a)

    def update(self, i, x):
        add = x - self.A[i]
        self.A[i] = x
        i += 1
        while i < len(self.tree):
            self.tree[i] += add
            i += i & (-i)

    def get(self, i):
        res, i = 0, i+1
        while i > 0:
            res += self.tree[i]
            i &= i-1
        return res
    
    def query(self,l,r):
        return self.get(r)-self.get(l-1)
```

#### 8.1.2 动态区间最值

```python
class Fwk:
    def __init__(self, A, func=max):
        self.A = A
        self.func = func
        self.tree = [0]*(len(A)+1)
        for i in range(1,len(A)+1):
            self.tree[i] = self.cal(i)
    
    def cal(self, i):
        res = self.A[i-1]
        j = (i&(-i)).bit_length()-1
        for k in range(j):
            res = self.func(res, self.tree[i-(1<<k)])
        return res

    def update(self, i, x):
        flag = self.A[i]==self.tree[i+1]==self.func(self.A[i],x)!=x
        self.A[i] = x
        i += 1
        while i < len(self.tree):
            self.tree[i] = self.cal(i) if flag else self.func(self.tree[i],x)
            i += i & (-i)

    def query(self, l, r):
        res = self.A[r]
        r += 1
        while l < r:
            if (r&(r-1))>=l:
                res = self.func(res,self.tree[r])
                r &= r-1
            else:
                r -= 1
                res = self.func(res,self.A[r])
        return res
```

### 8.2 ST 表（静态区间最值）

```python
class ST:
    def __init__(self,A,func=max):
        dp = A[:]
        self.st = st = [dp]
        j, N = 1, len(dp)
        while 2*j<=N:
            dp = [func(dp[i],dp[i+j]) for i in range(N-2*j+1)]
            st.append(dp)
            j <<= 1
        self.func = func
            
    def query(self,l,r):
        j = (r-l+1).bit_length()-1
        return self.func(self.st[j][l],self.st[j][r-(1<<j)+1])
```

### 8.3 线段树

```python
class Seg:
    def __init__(self, n, A=None):
        self.n = n                     
        self.t = defaultdict(int)      # 树节点，维护区间信息
        self.f = defaultdict(int)      # 懒标记，注意让初始值代表无标记
        if A:                          
            self.A = A
            self.build()

    def up(self,a,b):                  # 区间归并函数
        return a+b

    def do(self,o,l,r,x):              # 收到更新信息 x 后，树节点和懒标记的具体操作
        self.t[o] += x*(r-l+1)
        self.f[o] += x

    def build(self,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if l==r:
            self.t[o] = self.A[l]
            return
        m = (l+r)//2
        self.build(o*2,l,m)
        self.build(o*2+1,m+1,r)
        self.t[o] = self.up(self.t[o*2],self.t[o*2+1])

    def down(self,o,l,m,r):
        if self.f[o] != self.f[0]:
            self.do(o*2,l,m,self.f[o])
            self.do(o*2+1,m+1,r,self.f[o])
            self.f[o] = self.f[0]

    def update(self,a,b,x,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if a<=l and r<=b:
            self.do(o,l,r,x)
            return
        m = (l+r)//2
        self.down(o,l,m,r)
        if a<=m:
            self.update(a,b,x,o*2,l,m)
        if m<b:
            self.update(a,b,x,o*2+1,m+1,r)
        self.t[o] = self.up(self.t[o*2],self.t[o*2+1])

    def query(self,a,b,o=1,l=0,r=None):
        r = self.n-1 if r is None else r
        if a<=l and r<=b:
            return self.t[o]
        m = (l+r)//2
        self.down(o,l,m,r)
        res = self.t[0]                      # 查询时的初值，可能要修改 
        if a<=m:
            res = self.up(res,self.query(a,b,o*2,l,m))
        if m<b:
            res = self.up(res,self.query(a,b,o*2+1,m+1,r))
        return res
```

### 8.4 珂朵莉树

```python
class ODT:
    def __init__(self,):
        from sortedcontainers import SortedList
        self.sl = SortedList()
    
    def update(self,l,r,x):
        s, e = l, r
        pos = self.sl.bisect_right((r+2,))-1
        while pos>=0 and self.sl[pos][1]>=l-1:
            a, b, y = self.sl.pop(pos)
            if y==x:
                s, e = min(s, a), max(e, b)
            else:
                if b>r:
                    self.sl.add((r+1,b,y))
                if a<l:
                    self.sl.add((a,l-1,y))
            pos -= 1
        self.sl.add((s, e, x))
```

