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
	return B       # B[i]:i结尾的最大回文子串长度
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

## 4 区间查询

### 4.1 树状数组

#### 4.1.1 前缀和

```python []
class Fwk:
    def __init__(self, N):
        self.tree = [0] * (N + 1)

    def update(self, i, x):          # 更新 i-1 位置的值
        while i < len(self.tree):
            self.tree[i] += x
            i += i & (-i)

    def get(self, i):                # 前缀 [0,i) 的和
        res = 0
        while i > 0:
            res += self.tree[i]
            i &= i-1
        return res
```

#### 4.1.2 前缀最大值

```python
class Fwk:
    def __init__(self, N):
        self.tree = [-inf] * (N + 1)

    def update(self, i, x):          # 更新 i-1 位置的值（只能变大）
        while i < len(self.tree):
            self.tree[i] = max(self.tree[i], x)
            i += i & (-i)

    def get(self, i):                # 前缀 [0,i) 的最大值
        res = -inf
        while i > 0:
            res = max(res, self.tree[i])
            i &= i-1
        return res
```

### 4.2 ST 表

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
            
    def query(self,l,r):
        j = (r-l+1).bit_length()-1
        return max(self.st[j][l],self.st[j][r-(1<<j)+1])
```




## 5 数学

### 5.1 质因数分解

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

### 5.2 乘法逆元

```python
ma = 
mod = 10**9+7
fac, inv = [1]*ma, [1]*ma
for i in range(1,ma):
    fac[i] = fac[i-1]*i%mod
    inv[i] = pow(fac[i],-1,mod)
```

### 5.3 爬山法
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

## 6 并查集

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

## 7 图

### 7.1 拓扑排序

#### 7.1.1 博弈反推

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

### 7.2 欧拉图

```python
def dfs(u):
	while nxt[u]:
		dfs(nxt[u].pop())
	res.append(u)
```
