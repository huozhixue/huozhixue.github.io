# 1411：给 N x 3 网格图涂色的方案数（1844 分）


> <u>**[力扣第 184 场周赛第 4 题](https://leetcode.cn/problems/number-of-ways-to-paint-n-3-grid/)**</u>

## 题目

<p>你有一个 <code>n x 3</code> 的网格图 <code>grid</code> ，你需要用 <strong>红，黄，绿</strong> 三种颜色之一给每一个格子上色，且确保相邻格子颜色不同（也就是有相同水平边或者垂直边的格子颜色不同）。</p>

<p>给你网格图的行数 <code>n</code> 。</p>

<p>请你返回给 <code>grid</code> 涂色的方案数。由于答案可能会非常大，请你返回答案对 <code>10^9 + 7</code> 取余的结果。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>n = 1
<strong>输出：</strong>12
<strong>解释：</strong>总共有 12 种可行的方法：
<img alt="" src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/04/12/e1.png" style="height: 289px; width: 450px;">
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>n = 2
<strong>输出：</strong>54
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>n = 3
<strong>输出：</strong>246
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>n = 7
<strong>输出：</strong>106494
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>n = 5000
<strong>输出：</strong>30228214
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>n == grid.length</code></li>
<li><code>grid[i].length == 3</code></li>
<li><code>1 &lt;= n &lt;= 5000</code></li>
</ul>


**相似问题：**
- [1931：用三种不同颜色为网格涂色（2170 分）](/leetcode/1931)


## 分析

### #1

- 按每列的颜色情况可以递推
- 相邻两列哪些情况合法可以预处理，节省时间

```python
class Solution:
    def numOfWays(self, n: int) -> int:
        mod = 10**9+7
        A = [u for u in product(range(3),repeat=3) if all(a!=b for a,b in pairwise(u))]
        h = defaultdict(list)
        for u in A:
            h[u] = [v for v in A if all(a!=b for a,b in zip(u,v))]
        f = {u:1 for u in A}
        for _ in range(n-1):
            g = defaultdict(int)
            for u,w in f.items():
                for v in h[u]:
                    g[v] = (g[v]+w)%mod
            f = g
        return sum(f.values())%mod 
```
403 ms

### #2

- 注意到每列的 12 种情况可以分为两类：全不相同，两边相同
- 分类后依然可以递推

```python
cmod = 10**9+7
class Solution:
    def numOfWays(self, n: int) -> int:
        a,b = 6,6
        for _ in range(n-1):
            a,b = (a*3+b*2)%mod,(a*2+b*2)%mod
        return (a+b)%mod  
        
```
7 ms

### #3

这个递推式还可以用矩阵快速幂优化
## 解答


```python
# 矩阵快速幂优化
mod = 10**9+7
class MatPow:
    def __init__(self,A):   # k 阶递推式需要给定前 k*2 项
        k = len(A)//2
        self.f = A[:k]
        self.A = A
        self.g = self.gen(A)[::-1]
    
    def gen(self,A):     # Berlekamp-Massey 算法，给定前 k*2 项 A，返回符合的最短系数组 g 
        pre_c = []
        pre_i, pre_d = -1, 0
        g = []
        for i,a in enumerate(A):
            d = (a-sum(x*A[i-1-j] for j,x in enumerate(g)))%mod
            if d == 0:  
                continue
            if pre_i<0:               # 首次算错，初始化 g 为 i+1 个 0
                g = [0]*(i+1)
                pre_i,pre_d = i,d
                continue
            bias = i-pre_i
            old_len = len(g)
            new_len = bias + len(pre_c)
            if new_len>old_len:       # 递推式变长了
                tmp = g[:]
                g += [0]*(new_len-old_len)
            delta = d*pow(pre_d,-1,mod)%mod
            g[bias-1] = (g[bias-1]+delta)%mod
            for j,c in enumerate(pre_c):
                g[bias+j] = (g[bias+j]-delta*c)%mod
            if new_len>old_len:
                pre_c = tmp
                pre_i,pre_d = i,d
        return g

    def get(self,n):        # Kitamasa 算法，给定前 k 项 f 和系数组 g，求第 n 项
        def compose(A,B):  # 根据 g(n) 的系数组 A 和 g(m) 的系数组 B 计算 g(n+m) 的系数组
            C = [0]*k
            for a in A:
                for j,b in enumerate(B):
                    C[j] = (C[j]+a*b)%mod
                B = [((B[i-1] if i else 0)+B[-1]*g[i])%mod for i in range(k)]
            return C

        f,g = self.f,self.g
        if n<len(f):
            return f[n]%mod
        k = len(g)
        if k == 0:
            return 0
        if k == 1:
            return f[0]*pow(g[0],n,mod)%mod
        res = [0]*k
        C = [0]*k
        res[0] = C[1] = 1
        while n:
            res = compose(C,res) if n&1 else res
            C = compose(C,C)
            n >>= 1
        return sum(a*b for a,b in zip(res,f))%mod

class Solution:
    def numOfWays(self, n: int) -> int:
        A = [12]
        a,b = 6,6
        for _ in range(3):
            a,b = (a*3+b*2)%mod,(a*2+b*2)%mod
            A.append((a+b)%mod)
        mp = MatPow(A)
        return mp.get(n-1)
```
0 ms
