# 0552：学生出勤记录 II（★★）


> <u>**[力扣第 552 题](https://leetcode.cn/problems/student-attendance-record-ii/)**</u>

## 题目

可以用字符串表示一个学生的出勤记录，其中的每个字符用来标记当天的出勤情况（缺勤、迟到、到场）。记录中只含下面三种字符：
<ul>
<li><code>'A'</code>：Absent，缺勤</li>
<li><code>'L'</code>：Late，迟到</li>
<li><code>'P'</code>：Present，到场</li>
</ul>

<p>如果学生能够 <strong>同时</strong> 满足下面两个条件，则可以获得出勤奖励：</p>

<ul>
<li>按 <strong>总出勤</strong> 计，学生缺勤（<code>'A'</code>）<strong>严格</strong> 少于两天。</li>
<li>学生 <strong>不会</strong> 存在 <strong>连续</strong> 3 天或 <strong>连续</strong> 3 天以上的迟到（<code>'L'</code>）记录。</li>
</ul>

<p>给你一个整数 <code>n</code> ，表示出勤记录的长度（次数）。请你返回记录长度为 <code>n</code> 时，可能获得出勤奖励的记录情况 <strong>数量</strong> 。答案可能很大，所以返回对 <code>10<sup>9</sup> + 7</code> <strong>取余</strong> 的结果。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>8
<strong>解释：
</strong>有 8 种长度为 2 的记录将被视为可奖励：
"PP" , "AP", "PA", "LP", "PL", "AL", "LA", "LL"
只有"AA"不会被视为可奖励，因为缺勤次数为 2 次（需要少于 2 次）。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>3
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 10101
<strong>输出：</strong>183236316
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>5</sup></code></li>
</ul>


**相似问题：**
- [0551：学生出勤记录 I](/leetcode/0551)


## 分析

### #1
- 按最后一个字符递推
- 令 f[i][j][k] 代表长度 i，有 j 个 'A' 且末尾 k 个连续 'L' 的个数，即可递推
- 可以用滚动数组优化掉 i，还可以将 j 和 k 合并为一维


```python
class Solution:
    def checkRecord(self, n: int) -> int:
        mod = 10**9+7
        f = [1,0,0,0,0,0]
        for _ in range(n):
            f = [sum(f[:3])%mod,f[0],f[1],sum(f)%mod,f[3],f[4]]
        return sum(f)%mod
```
550 ms

### #2

 这是完全的线性递推关系，还可以用矩阵快速幂优化的通用模板
## 解答

```python
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
    def checkRecord(self, n: int) -> int:
        A = [1]
        f = [1,0,0,0,0,0]
        for _ in range(11):
            f = [sum(f[:3])%mod,f[0],f[1],sum(f)%mod,f[3],f[4]]
            A.append(sum(f)%mod)
        mp = MatPow(A)
        return mp.get(n)
```
10 ms
