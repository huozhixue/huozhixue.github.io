# 树模板：线段树

##  线段树

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


