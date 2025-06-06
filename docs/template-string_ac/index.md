# 字符串模板：AC自动机


- [AC自动机](https://oi.wiki/string/ac-automaton/)
### 基于节点类

```python
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

### 基于数组


```python
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


