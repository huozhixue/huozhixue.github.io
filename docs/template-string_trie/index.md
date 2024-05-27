# 字符串模板：字典树


##  字典树

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


