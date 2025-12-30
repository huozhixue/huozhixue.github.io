# 数据结构（二）：字符串



## 最小表示法

- [最小表示法](https://oi.wiki/string/minimal-string)

```python []
def minimal(s):
    n = len(s)
    i,j,a = 0,1,0
    while i<n and j<n and a<n:
        x,y = s[(i+a)%n],s[(j+a)%n]
        if x==y:
            a += 1
        elif x>y:
            i,j,a = j,max(i+a,j)+1,0
        else:
            j,a = j+a+1,0
    return s[i:]+s[:i]
```

## 字符串匹配


- [前缀函数与 KMP 算法](https://oi.wiki/string/kmp/)
- [Manacher](https://oi.wiki/string/manacher/)
- [Z 函数（扩展 KMP）](https://oi.wiki/string/z-func/)
- [字符串哈希](https://oi.wiki/string/hash/)
	- $$hash(W)=\sum_{i=0}^{|W|-1}base^{|W|-(i+1)}*W[i]$$
	-  base 取一个大于 **元素种数** 的 **质数**，mod 取一个大于 **窗口种数^2** 的 **质数**

```python
def kmp(s):
    n = len(s)
    pi,j = [0]*n,0
    for i in range(1,n):
        while j>0 and s[i]!=s[j]:
            j = pi[j-1]
        j += s[i]==s[j]
        pi[i] = j
    return pi              # pi[i]:i结尾的最大真前缀长度
```

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

例题
- {{< lc "0187" >}} 重复的DNA序列
- {{< lc "0718" >}} 最长重复子数组
- {{< lc "1392" >}} 最长快乐前缀
- {{< lc "1044" >}} 最长重复子串
- {{< lc "1316" >}} 不同的循环子字符串
- {{< lc "1923" >}} 最长公共子路径
 正则
- {{< lc "0008" >}} 字符串转换整数 (atoi)
- {{< lc "0044" >}} 通配符匹配
- {{< lc "0065" >}} 有效数字
- {{< lc "1023" >}} 驼峰式匹配
kmp
- {{< lc "0005" >}} 最长回文子串
- {{< lc "0028" >}} 实现 strStr()
- {{< lc "1392" >}} 最长快乐前缀
macher
- {{< lc "0214" >}} 最短回文串

## 字典树

- [字典树 (Trie)](https://oi.wiki/string/trie/)

```python
# 基于哈希表
T = lambda: defaultdict(T)
trie = T()
for w in words:
	reduce(dict.__getitem__, w, trie)['#'] = w
```

```python
# 基于节点类
class Node:
    __slots__ = 'son'

    def __init__(self):
        self.son = {}

class Trie:

    def __init__(self):
        self.root = Node()

    def add(self,s):
        p = self.root
        for c in s:
            if c not in p.son:
                p.son[c] = Node()
            p = p.son[c]
        p.son['#'] = None

    def find(self,s):
        p = self.root
        for c in s:
            if c not in p.son:
                return False
            p = p.son[c]
        return True
```

```python
# 01字典树，基于数组
class BitTrie:
    def __init__(self,n,L):                       # 插入总长度 n、最长 L 的二进制串
        self.t = [[0]*(n+1) for _ in range(2)]        
        self.s = [0]*(n+1)
        self.L = L
        self.i = 0

    def add(self, x):
        p = 0
        for j in range(self.L-1, -1, -1):
            b = (x>>j)&1
            if not self.t[b][p]:
                self.t[b][p] = self.i = self.i+1
            p = self.t[b][p]
            self.s[p] += 1
            
    def remove(self,x):
        p = 0
        for j in range(self.L-1,-1,-1):
            b = (x>>j)&1
            p = self.t[b][p]
            self.s[p] -= 1

    def maxxor(self,x):             # 树中与 x 异或的最大值
        res = 0
        p = 0
        for j in range(self.L-1, -1, -1):
            b = (x>>j)&1
            q = self.t[b^1][p]
            if q and self.s[q]:
                res |= 1 << j
                b ^= 1
            p = self.t[b][p]
        return res
    
    def lowxor(self, x, high):       # 树中与 x 异或小于 high 的个数
        res = 0
        p = 0
        for j in range(self.L-1, -1, -1):
            b = (x>>j)&1
            h = (high>>j)&1
            if h:
                res += self.s[self.t[b][p]]
            if not self.t[b^h][p]:
                return res
            p = self.t[b^h][p]
        return res
```

字典树
- {{< lc "0208" >}} 实现 Trie (前缀树)
- {{< lc "0212" >}} 单词搜索 II
- {{< lc "0588" >}} 设计内存文件系统
- {{< lc "0642" >}} 设计搜索自动补全系统

01字典树
- {{< lc "0421" >}} 数组中两个数的最大异或值
- {{< lc "1707" >}} 与数组中元素的最大异或值
- {{< lc "1938" >}} 查询最大基因差

## AC自动机

- [AC自动机](https://oi.wiki/string/ac-automaton/)

```python
# 基于节点类
class Node:
    __slots__ = 'son', 'fail', 'last', 'sz'

    def __init__(self):
        self.son = [None] * 26
        self.fail = None  # u 的 fail 指向 v，v 是树中 u 的最长后缀
        self.last = None  # u 的 last 指向 v，v 是树中 u 的最长后缀且是某个单词的结尾
        self.sz = 0       # 假如 u 是某个单词的结尾，sz 即是单词长度

class AC:
    def __init__(self):
        self.root = p = Node()
        dum = Node()              # 哑节点，方便后续 build
        dum.son, p.fail, p.last = [p]*26, dum, p

    def add(self,s,w):
        p = self.root
        for c in s: 
            c = ord(c) - ord('a')
            if not p.son[c]:
                p.son[c] = Node()
            p = p.son[c]
        p.sz = len(s)

    def build(self):
        Q = deque([self.root])
        while Q:
            u = Q.popleft()
            for c,son in enumerate(u.son):
                if son:
                    son.fail = u.fail.son[c]
                    son.last = son.fail if son.fail.sz else son.fail.last
                    Q.append(son)
                else: #  虚拟子节点，失配时直接跳到下一个匹配位置
                    u.son[c] = u.fail.son[c]
```

```python
# 基于数组
class AC:
    def __init__(self,n):                     # 总长度 n-1 的字符串
        self.son = [[0]*n for _ in range(26)]
        self.fail = [0]*n
        self.last = [0]*n
        self.sz = [0]*n
        self.i = 0

    def add(self,s):
        p = 0
        for c in s:
            c = ord(c)-ord('a')
            if not self.son[c][p]:
                self.son[c][p] = self.i = self.i+1
            p = self.son[c][p]
        self.sz[p] = len(s)

    def build(self):
        Q = deque(A[0] for A in self.son if A[0])
        while Q:
            u = Q.popleft()
            for A in self.son:
                if A[u]:
                    v = self.fail[A[u]] = A[self.fail[u]]
                    self.last[A[u]] = v if self.sz[v] else self.last[v]
                    Q.append(A[u])
                else:    # 虚拟子节点，失配时直接跳到下一个匹配位置
                    A[u] = A[self.fail[u]]
```

##  后缀数组

- [后缀数组](https://oi.wiki/string/sa/)

```python
# 后缀数组
from itertools import accumulate
def SA(A):
    def SA_IS(A):
        def equal(p1, p2):
            e1, e2 = LMS.find('*', p1 + 1), LMS.find('*', p2 + 1)
            return A[p1:e1 + 1] == A[p2:e2 + 1]

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
        m = max(A)
        types = list('0' * (n - 1) + 'LS')
        for i in range(n - 2, -1, -1):
            types[i] = 'S' if A[i] < A[i + 1] else 'L' if A[i] > A[i + 1] else types[i + 1]
        LMS = ''.join('*' if types[i - 1:i + 1] == ['L', 'S'] else ' ' for i in range(n + 1))
        bucket = [0] * (m + 1)
        for a in A:
            bucket[a] += 1
        stars = [i for i in range(n) if LMS[i] == '*']
        sa = IS(stars)
        d, cnt, prev = {}, 0, -1
        for pos in sa:
            if LMS[pos] == '*':
                cnt += prev < 0 or not equal(prev, pos)
                d[pos] = cnt
                prev = pos
        B = [d[pos] for pos in stars]
        d1 = {x - 1: i for i, x in enumerate(B)}
        sa1 = [d1[x] for x in range(cnt)] if cnt == len(B) else SA_IS(B)
        return IS([stars[pos] for pos in sa1])

    def SA_h(A, sa):
        n = len(A)
        rk, height, h = [0] * n, [0] * n, 0
        for i in range(n):
            rk[sa[i]] = i
        for i in range(n):
            h = max(0, h - 1)
            j = sa[rk[i] - 1] if rk[i] else n
            while max(i, j) + h < n and A[i + h] == A[j + h]:
                h += 1
            height[rk[i]] = h
        return rk, height
    
    sa = SA_IS(A)  # sa[i]:第i小的后缀编号
    rk, height = SA_h(A, sa)  # rk[i]:后缀i的排名
    return sa, rk, height  # height[i]:lcp(sa[i],sa[i-1])

```

