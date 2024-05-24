# 算法模板


## 1 字符串

- [字符串匹配](/template-string_match)：kmp、mancher、z函数、滚动哈希
- [后缀数组](/template-string_sa)

## 2 栈

- [计算器](/template-stack_cal)
## 3 贪心
- [贪心](/template-greedy)

## 4 数学
- [数学](/template-math)
## 5 并查集
- [并查集](/template-dsu)

## 6 图

- [最短路](/template-graph_shortest)
- [拓扑排序](/template-graph_topo)
- [图匹配](/template-graph_match)
- [网络流](/template-graph_flow)

## 7 树

### 7.1 lca

```python
class LCA:
    def __init__(self, edges: List[List[int]]):
        n = len(edges) + 1
        m = n.bit_length()
        g = [[] for _ in range(n)]
        for u, v in edges: 
            g[u].append(v)
            g[v].append(u)
        self.D = [0] * n
        self.f = [[-1]*m for _ in range(n)]
        sk = [(0,-1)]
        while sk:
            u,fa = sk.pop()
            for v in g[u]:
                if v!=fa:
                    sk.append(v,u)
                    self.f[v][0] = u
                    self.D[v] = self.D[u]+1
        for i in range(m):
            for u in range(n):
                p = self.f[u][i]
                if p!=-1:
                    self.f[u][i+1] = self.f[p][i]

    def get_kth(self, u: int, k: int) -> int:
        for i in range(k.bit_length()):
            if u!=-1 and k&(1<<i):
                u = self.f[u][i]
        return u

    # 返回 x 和 y 的最近公共祖先（节点编号从 0 开始）
    def lca(self, x: int, y: int) -> int:
        if self.D[x] > self.D[y]:
            x, y = y, x
        y = self.get_kth(y, self.D[y]-self.D[x])
        if x==y:
            return x
        for i in range(len(self.f[x])-1,-1,-1):
            px, py = self.f[x][i], self.f[y][i]
            if px!=py:
                x,y = px,py  
        return self.f[x][0]
```
### 7.2 字典树

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

