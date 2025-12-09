# 0509：斐波那契数


> <u>**[力扣第 509 题](https://leetcode.cn/problems/fibonacci-number/)**</u>

## 题目

<p><strong>斐波那契数</strong> （通常用 <code>F(n)</code> 表示）形成的序列称为 <strong>斐波那契数列</strong> 。该数列由 <code>0</code> 和 <code>1</code> 开始，后面的每一项数字都是前面两项数字的和。也就是：</p>

<pre>
F(0) = 0，F(1) = 1
F(n) = F(n - 1) + F(n - 2)，其中 n &gt; 1
</pre>

<p>给定 <code>n</code> ，请计算 <code>F(n)</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>1
<strong>解释：</strong>F(2) = F(1) + F(0) = 1 + 0 = 1
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>2
<strong>解释：</strong>F(3) = F(2) + F(1) = 1 + 1 = 2
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 4
<strong>输出：</strong>3
<strong>解释：</strong>F(4) = F(3) + F(2) = 2 + 1 = 3
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= n &lt;= 30</code></li>
</ul>


**相似问题：**
- [0070：爬楼梯](/leetcode/0070)
- [0842：将数组拆分成斐波那契序列（1779 分）](/leetcode/0842)
- [0873：最长的斐波那契子序列的长度（1911 分）](/leetcode/0873)
- [1137：第 N 个泰波那契数（1142 分）](/leetcode/1137)


## 分析

### #1

递推即可

```python
class Solution:
    def fib(self, n: int) -> int:
        a,b = 0,1
        for _ in range(n):
            a,b = b,a+b
        return a
```
0 ms

### #2

可以用矩阵快速幂的通用模板
## 解答

```python []
# 矩阵快速幂
mod = 10**31
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
    def fib(self, n: int) -> int:
        A = [0,1]
        for _ in range(2):
            A.append(A[-2]+A[-1])
        MP = MatPow(A)
        return MP.get(n)
```
0 ms
