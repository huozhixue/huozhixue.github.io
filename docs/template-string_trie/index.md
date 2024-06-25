# 字符串模板：字典树


## 一般字典树
### 哈希表

```python
T = lambda: defaultdict(T)
trie = T()
for w in words:
	reduce(dict.__getitem__, w, trie)['#'] = w
```
### 数组

```python []
class Trie:
    def __init__(self,n,L,k):            # 插入 n 个长为 L 的字符串，字符种类 k
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

## 01 字典树

```python
class BitTrie:
    def __init__(self,n,L):                       # 插入 n 个长为 L 的二进制串
        self.t = [[0]*(n*L+1) for _ in range(2)]  # 模拟树节点
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


