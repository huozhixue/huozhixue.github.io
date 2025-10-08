# 数据结构（七）：并查集

- 并查集（Union Find）也叫「不相交集合（Disjoint Set）」，是一种树型的数据结构，专门用于 动态处理 不相交集合的「查询」与「合并」问题

```python
class DSU:
    def __init__(self,n):
        self.f = list(range(n))
        self.sz = [1]*n
        self.cc = n
    
    def find(self,x):
        f,y = self.f,x
        while f[y]!=y:
            y = f[y]
        while f[x]!=y:
            f[x],x = y,f[x]
        return y
    
    def union(self,x,y):
        f,sz = self.f,self.sz
        fx,fy = self.find(x),self.find(y)
        if fx==fy:
            return False
        if sz[fx]>sz[fy]:
            fx,fy = fy,fx
        f[fx] = fy
        sz[fy] += sz[fx]
        self.cc -= 1
        return True
```


例题
- {{< lc "0200" >}} 岛屿数量
- {{< lc "0547" >}} 省份数量
- {{< lc "0684" >}} 冗余连接
- {{< lc "0839" >}} 相似字符串组
- {{< lc "0990" >}} 等式方程的可满足性
- {{< lc "0130" >}} 被围绕的区域
- {{< lc "0695" >}} 岛屿的最大面积
- {{< lc "0721" >}} 账户合并
- {{< lc "0959" >}} 由斜杠划分区域
- {{< lc "0399" >}} 除法求值
- {{< lc "0407" >}} 接雨水 II
- {{< lc "0685" >}} 冗余连接 II
- {{< lc "0803" >}} 打砖块
