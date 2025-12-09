# 0070：爬楼梯


> <u>**[力扣第 70 题](https://leetcode.cn/problems/climbing-stairs/)**</u>

## 题目

<p>假设你正在爬楼梯。需要 <code>n</code> 阶你才能到达楼顶。</p>

<p>每次你可以爬 <code>1</code> 或 <code>2</code> 个台阶。你有多少种不同的方法可以爬到楼顶呢？</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>2
<strong>解释：</strong>有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>3
<strong>解释：</strong>有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 45</code></li>
</ul>


**相似问题：**
- [0746：使用最小花费爬楼梯（1358 分）](/leetcode/0746)
- [0509：斐波那契数](/leetcode/0509)
- [1137：第 N 个泰波那契数（1142 分）](/leetcode/1137)
- [2244：完成所有任务需要的最少轮数（1371 分）](/leetcode/2244)
- [2320：统计放置房子的方式数（1607 分）](/leetcode/2320)
- [2400：恰好移动 k 步到达某一位置的方法数目（1751 分）](/leetcode/2400)
- [2466：统计构造好字符串的方案数（1694 分）](/leetcode/2466)
- [2498：青蛙过河 II（1759 分）](/leetcode/2498)
- [3154：到达第 K 级台阶的方案数（2071 分）](/leetcode/3154)
- [3183：达到总和的方法数量](/leetcode/3183)


## 分析

### #1

- 经典 dp，dp[i]=dp[i-1]+dp[i-2]
- 还可以优化为两个变量


```python
class Solution:
    def climbStairs(self, n: int) -> int:
        a,b = 1,1
        for _ in range(n-1):
            a,b = b,a+b
        return b
```
0 ms

### #2

- 这是固定的线性递推，可以用矩阵快速幂优化
- 矩阵快速幂结合 [Berlekamp-Massey 算法](https://zhuanlan.zhihu.com/p/1966417899825665440) 和 [Kitamasa 算法](https://zhuanlan.zhihu.com/p/1964051212304364939)，有个通用模板

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
    def climbStairs(self, n: int) -> int:
        A = [1,1]
        for _ in range(10):
            A.append(A[-1]+A[-2])
        mp = MatPow(A)
        return mp.get(n) 
```
0 ms
