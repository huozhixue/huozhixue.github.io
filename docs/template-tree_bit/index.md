# 树模板：树状数组


## 1 区间和 

```python
class BIT:
    def __init__(self, n):
        self.n = n+1
        self.t = [0]*(n+1)

    def update(self, i, x):
        i += 1
        while i<self.n:
            self.t[i] += x
            i += i&-i

    def get(self, i):
        res, i = 0, i+1
        while i:
            res += self.t[i]
            i &= i-1
        return res
```

## 2 区间最大值（只变大）

```python
class BIT:
    def __init__(self, n):
        self.n = n+1
        self.t = defaultdict(int)

    def update(self, i, x):
        i += 1
        while i<self.n:
            self.t[i] = max(self.t[i],x)
            i += i&(-i)

    def get(self, i):
        res, i = 0, i+1
        while i:
            res = max(res,self.t[i])
            i &= i-1
        return res
```

