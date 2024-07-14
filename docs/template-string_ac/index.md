# 字符串模板：AC自动机

### 基于类节点

```python
class Node:
    __slots__ = 'son', 'fail', 'last', 'sz'
    
    def __init__(self):
        self.son = {}
        self.fail = self.last = None
        self.sz = 0

class AC:
    def __init__(self):
        self.root = Node()
    
    def add(self,s):
        p = self.root
        for c in s:
            if c not in p.son:
                p.son[c] = Node()
            p = p.son[c]
        p.sz = len(s)

    def build(self):
        Q = deque()
        for u in self.root.son.values():
            u.fail = u.last = self.root
            Q.append(u) 
        while Q:
            u = Q.popleft()
            for c,v in u.son.items():
                p = u.fail
                while p and c not in p.son:
                    p = p.fail
                v.fail = p.son[c] if p else self.root
                v.last = v.fail if v.fail.sz else v.fail.last
                Q.append(v)
    
    def find(s):
        p = self.root
        for c in s:
            while p and c not in p.son:
                p = p.fail
            p = p.son[c] if p else self.root
        return p.sz>0 or (p.last!=None and p.last.sz>0)
```

### 基于数组


```python
class AC:
    def __init__(self,n,k):                      # 总长度 n-1 的字符串，字符种类 k
        self.t = [[0]*n for _ in range(k)]
        self.fail = [0]*n
        self.i = 0
        self.sz = [0]*n
        self.last = [0]*n

    def add(self,A):
        p = 0
        for c in A:
            if not self.t[c][p]:
                self.i += 1
                self.t[c][p] = self.i
            p = self.t[c][p]
        self.sz[p] = len(A)

    def build(self):
        Q = deque(A[0] for A in self.t if A[0])
        while Q:
            u = Q.popleft()
            for A in self.t:
                if not A[u]:    # 虚拟子节点，失配时直接跳到下一个匹配位置
                    A[u] = A[self.fail[u]]
                    continue
                q = self.fail[A[u]] = A[self.fail[u]]  # 计算失配位置
                self.last[A[u]] = q if self.sz[q] else self.last[q]
                Q.append(A[u])
```


