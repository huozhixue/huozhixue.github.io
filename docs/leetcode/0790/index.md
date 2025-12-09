# 0790：多米诺和托米诺平铺（1830 分）


> <u>**[力扣第 790 题](https://leetcode.cn/problems/domino-and-tromino-tiling/)**</u>

## 题目

<p>有两种形状的瓷砖：一种是 <code>2 x 1</code> 的多米诺形，另一种是形如 "L" 的托米诺形。两种形状都可以旋转。</p>

<p><img src="https://assets.leetcode.com/uploads/2021/07/15/lc-domino.jpg" style="height: 195px; width: 362px;" /></p>

<p>给定整数 n ，返回可以平铺 <code>2 x n</code> 的面板的方法的数量。<strong>返回对</strong> <code>10<sup>9</sup> + 7</code> <strong>取模 </strong>的值。</p>

<p>平铺指的是每个正方形都必须有瓷砖覆盖。两个平铺不同，当且仅当面板上有四个方向上的相邻单元中的两个，使得恰好有一个平铺有一个瓷砖占据两个正方形。</p>



<p><strong>示例 1:</strong></p>

<p><img src="https://assets.leetcode.com/uploads/2021/07/15/lc-domino1.jpg" style="height: 226px; width: 500px;" /></p>

<pre>
<strong>输入:</strong> n = 3
<strong>输出:</strong> 5
<strong>解释:</strong> 五种不同的方法如上所示。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> n = 1
<strong>输出:</strong> 1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 1000</code></li>
</ul>




## 分析

### #1

- 假设最后一列竖着铺 1x2，显然转为递归子问题，横着铺两个 1x2，也同理
- 假如最后一列铺 'L' ，则转为求前面铺了 n-1 列且最后一列只铺一个的方法数
- 为了递推，令 f(i,0/1/2) 分别代表平铺了 i-1 列，第 i 列铺了 0/1/2 个的方法数
- 还可以优化为 3 个变量


```python
mod = 10**9+7
class Solution:
    def numTilings(self, n: int) -> int:
        a, b, c = 0, 0, 1
        for _ in range(n):
            a, b, c = c, (2*a+b)%mod, (a+b+c)%mod
        return c
```
0 ms

### #2

- 还可以用矩阵快速幂优化的通用模板

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
    def numTilings(self, n: int) -> int:
        A = [1]
        a, b, c = 0, 0, 1
        for _ in range(5):
            a, b, c = c, (2*a+b)%mod, (a+b+c)%mod
            A.append(c)
        mp = MatPow(A)
        return mp.get(n)
```
1 ms
