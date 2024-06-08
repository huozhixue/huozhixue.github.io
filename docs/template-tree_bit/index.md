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
## *3 区间最值

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

