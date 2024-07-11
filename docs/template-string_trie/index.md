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
    def __init__(self,n,k):            # 插入总长度为 n-1 的字符串，字符种类 k
        self.t = [[0]*n for _ in range(k)]
        self.i = 0
        self.f = [False]*n

    def add(self,A):  
        p = 0
        for c in A:
            if not self.t[c][p]:
                self.i += 1
                self.t[c][p] = self.i  
            p = self.t[c][p]
        self.f[p] = True

    def find(self,A):  
        p = 0
        for c in A:
            if not self.t[c][p]:
                return False
            p = self.t[c][p]
        return self.f[p]
```

## 01 字典树

```python
class BitTrie:
    def __init__(self,n,L):                       # 插入总长度 n-1、最长 L 的二进制串
        self.t = [[0]*n for _ in range(2)]  # 模拟树节点
        self.i = 0
        self.L = L
        self.s = [0]*n

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


