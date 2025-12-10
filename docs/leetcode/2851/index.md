# 2851：字符串转换（2857 分）


> <u>**[力扣第 362 场周赛第 4 题](https://leetcode.cn/problems/string-transformation/)**</u>

## 题目

<p>给你两个长度都为 <code>n</code> 的字符串 <code>s</code> 和 <code>t</code> 。你可以对字符串 <code>s</code> 执行以下操作：</p>

<ul>
<li>将 <code>s</code> 长度为 <code>l</code> （<code>0 &lt; l &lt; n</code>）的 <strong>后缀字符串</strong> 删除，并将它添加在 <code>s</code> 的开头。<br />
比方说，<code>s = 'abcd'</code> ，那么一次操作中，你可以删除后缀 <code>'cd'</code> ，并将它添加到 <code>s</code> 的开头，得到 <code>s = 'cdab'</code> 。</li>
</ul>

<p>给你一个整数 <code>k</code> ，请你返回 <strong>恰好</strong> <code>k</code> 次操作将<em> </em><code>s</code> 变为<em> </em><code>t</code> 的方案数。</p>

<p>由于答案可能很大，返回答案对 <code>10<sup>9</sup> + 7</code> <strong>取余</strong> 后的结果。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<b>输入：</b>s = "abcd", t = "cdab", k = 2
<b>输出：</b>2
<b>解释：</b>
第一种方案：
第一次操作，选择 index = 3 开始的后缀，得到 s = "dabc" 。
第二次操作，选择 index = 3 开始的后缀，得到 s = "cdab" 。

第二种方案：
第一次操作，选择 index = 1 开始的后缀，得到 s = "bcda" 。
第二次操作，选择 index = 1 开始的后缀，得到 s = "cdab" 。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<b>输入：</b>s = "ababab", t = "ababab", k = 1
<b>输出：</b>2
<b>解释：</b>
第一种方案：
选择 index = 2 开始的后缀，得到 s = "ababab" 。

第二种方案：
选择 index = 4 开始的后缀，得到 s = "ababab" 。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= s.length &lt;= 5 * 10<sup>5</sup></code></li>
<li><code>1 &lt;= k &lt;= 10<sup>15</sup></code></li>
<li><code>s.length == t.length</code></li>
<li><code>s</code> 和 <code>t</code> 都只包含小写英文字母。</li>
</ul>




## 分析

- 先用字符串匹配求出使得 s[i:]+s[:i]=t 的 i 的个数 c
- 然后令 f(k,0/1) 分别代表 k 次操作后 s 等于/不等于 t 的方案数，可以递推
	- f(k,0) = f(k-1,0)*(c-1)+f(k-1,1)*c
	- f(k,1) = f(k-1,0)*(n-c)+f(k-1,1)*(n-c-1)
- 由于 k 很大，用矩阵快速幂优化

## 解答


```python []
mod = 10**9+7

def kmp(s):
    n = len(s)
    pi,j = [0]*n,0
    for i in range(1,n):
        while j>0 and s[i]!=s[j]:
            j = pi[j-1]
        j += s[i]==s[j]
        pi[i] = j
    return pi              # pi[i]:i结尾的最大真前缀长度

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
    def numberOfWays(self, s: str, t: str, k: int) -> int:
        n = len(s)
        pi = kmp(t+'#'+s+s[:-1])
        c = pi.count(n)
        a = s==t
        b = 1-a
        A = [a]
        for _ in range(3):
            a,b = a*(c-1)+b*c,a*(n-c)+b*(n-1-c)
            a,b = a%mod,b%mod
            A.append(a)
        mp = MatPow(A)
        return mp.get(k)
```
947 ms
