# 树模板：树状数组


## 1 动态区间和

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

## 2 动态区间最值

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

