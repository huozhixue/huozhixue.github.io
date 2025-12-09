# 1931：用三种不同颜色为网格涂色（2170 分）


> <u>**[力扣第 249 场周赛第 3 题](https://leetcode.cn/problems/painting-a-grid-with-three-different-colors/)**</u>

## 题目

<p>给你两个整数 <code>m</code> 和 <code>n</code> 。构造一个 <code>m x n</code> 的网格，其中每个单元格最开始是白色。请你用 <strong>红、绿、蓝</strong> 三种颜色为每个单元格涂色。所有单元格都需要被涂色。</p>

<p>涂色方案需要满足：<strong>不存在相邻两个单元格颜色相同的情况</strong> 。返回网格涂色的方法数。因为答案可能非常大， 返回 <strong>对 </strong><code>10<sup>9</sup> + 7</code><strong> 取余</strong> 的结果。</p>



<p><strong>示例 1：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/22/colorthegrid.png" style="width: 200px; height: 50px;" />
<pre>
<strong>输入：</strong>m = 1, n = 1
<strong>输出：</strong>3
<strong>解释：</strong>如上图所示，存在三种可能的涂色方案。
</pre>

<p><strong>示例 2：</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/06/22/copy-of-colorthegrid.png" style="width: 321px; height: 121px;" />
<pre>
<strong>输入：</strong>m = 1, n = 2
<strong>输出：</strong>6
<strong>解释：</strong>如上图所示，存在六种可能的涂色方案。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>m = 5, n = 5
<strong>输出：</strong>580986
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= m <= 5</code></li>
<li><code>1 <= n <= 1000</code></li>
</ul>


**相似问题：**
- [1411：给 N x 3 网格图涂色的方案数（1844 分）](/leetcode/1411)


## 分析

### #1

- 注意 m 很小
- 令 f(i,st) 代表涂了前 i 列且第 i 列颜色状态为 st 的方法数，即可递推

```python []
mod = 10**9+7
class Solution:
    def colorTheGrid(self, m: int, n: int) -> int:
        valid = []
        for A in product(range(3),repeat=m):
            if all(a!=b for a,b in pairwise(A)):
                valid.append(A)
        N = len(valid)
        g = [[] for _ in range(N)]
        for i in range(N):
            for j in range(N):
                if all(a!=b for a,b in zip(valid[i],valid[j])):
                    g[i].append(j)
        f = [1]*N
        for _ in range(n-1):
            nf = [0]*N
            for i in range(N):
                nf[i] = sum(f[j] for j in g[i])%mod
            f = nf
        return sum(f)%mod
```
219 ms

### #2

- 还可以用矩阵快速幂优化
- m 很小，可以预处理每个 m 对应的递推式
## 解答

```python []
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

MP = []
for m in range(1,6):
    valid = []
    for A in product(range(3),repeat=m):
        if all(a!=b for a,b in pairwise(A)):
            valid.append(A)
    N = len(valid)
    g = [[] for _ in range(N)]
    for i in range(N):
        for j in range(N):
            if all(a!=b for a,b in zip(valid[i],valid[j])):
                g[i].append(j)
    A = [N]
    f = [1]*N
    for _ in range(N*2-1):
        f = [sum(f[j] for j in g[i])%mod for i in range(N)]
        A.append(sum(f)%mod)
    MP.append(MatPow(A))

class Solution:
    def colorTheGrid(self, m: int, n: int) -> int:
        return MP[m-1].get(n-1)
```
0 ms
