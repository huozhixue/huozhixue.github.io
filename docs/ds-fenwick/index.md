# 数据结构（八）：树状数组

- [算法学习笔记(2) : 树状数组](https://zhuanlan.zhihu.com/p/93795692)
- 树状数组或二叉索引树（Binary Indexed Tree），又以其发明者命名为 Fenwick 树，支持单点修改和区间查询

```python
class BIT:
    def __init__(self, n):
        self.n = n
        self.t = [0]*n
        self.L = n.bit_length()

    def update(self, i, x):
        while i<self.n:
            self.t[i] += x
            i += i&-i

    def get(self, i):
        res = 0
        while i:
            res += self.t[i]
            i &= i-1
        return res
    
    def query(self,l,r):
        return self.get(r)-self.get(l-1)
    
    def kth(self, k):
        x = 0
        for i in range(self.L-1,-1,-1):
            y = x|1<<i
            if y<self.n and self.t[y]<k:
                x = y
                k -= self.t[y]
        return x+1

A = []
n = len(A)
bit = BIT(n+1)
for i,x in enumerate(A,1):
	bit.update(i,x)
```

例题
- {{< lc "0307" >}} 区域和检索 - 数组可修改
- {{< lc "0308" >}} 二维区域和检索 - 可变

dp+树状数组
- {{< lc "0673" >}} [最长递增子序列的个数](https://leetcode.cn/problems/number-of-longest-increasing-subsequence/)
