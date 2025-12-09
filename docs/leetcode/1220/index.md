# 1220：统计元音字母序列的数目（1729 分）


> <u>**[力扣第 157 场周赛第 4 题](https://leetcode.cn/problems/count-vowels-permutation/)**</u>

## 题目

<p>给你一个整数 <code>n</code>，请你帮忙统计一下我们可以按下述规则形成多少个长度为 <code>n</code> 的字符串：</p>

<ul>
<li>字符串中的每个字符都应当是小写元音字母（<code>&#39;a&#39;</code>, <code>&#39;e&#39;</code>, <code>&#39;i&#39;</code>, <code>&#39;o&#39;</code>, <code>&#39;u&#39;</code>）</li>
<li>每个元音 <code>&#39;a&#39;</code> 后面都只能跟着 <code>&#39;e&#39;</code></li>
<li>每个元音 <code>&#39;e&#39;</code> 后面只能跟着 <code>&#39;a&#39;</code> 或者是 <code>&#39;i&#39;</code></li>
<li>每个元音 <code>&#39;i&#39;</code> 后面 <strong>不能</strong> 再跟着另一个 <code>&#39;i&#39;</code></li>
<li>每个元音 <code>&#39;o&#39;</code> 后面只能跟着 <code>&#39;i&#39;</code> 或者是 <code>&#39;u&#39;</code></li>
<li>每个元音 <code>&#39;u&#39;</code> 后面只能跟着 <code>&#39;a&#39;</code></li>
</ul>

<p>由于答案可能会很大，所以请你返回 模 <code>10^9 + 7</code> 之后的结果。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>n = 1
<strong>输出：</strong>5
<strong>解释：</strong>所有可能的字符串分别是：&quot;a&quot;, &quot;e&quot;, &quot;i&quot; , &quot;o&quot; 和 &quot;u&quot;。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>n = 2
<strong>输出：</strong>10
<strong>解释：</strong>所有可能的字符串分别是：&quot;ae&quot;, &quot;ea&quot;, &quot;ei&quot;, &quot;ia&quot;, &quot;ie&quot;, &quot;io&quot;, &quot;iu&quot;, &quot;oi&quot;, &quot;ou&quot; 和 &quot;ua&quot;。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>n = 5
<strong>输出：</strong>68</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 2 * 10^4</code></li>
</ul>


**相似问题：**
- [2930：重新排列后包含指定子字符串的字符串数目（2227 分）](/leetcode/2930)


## 分析

### #1

递推即可

```python
class Solution:
    def countVowelPermutation(self, n: int) -> int:
        mod = 10**9+7
        a,e,i,o,u = 1,1,1,1,1
        for _ in range(n-1):
            a,e,i,o,u = (e+i+u)%mod,(a+i)%mod,(e+o)%mod,i,(i+o)%mod
        return (a+e+i+o+u)%mod
```
71 ms

### #2

还可以用矩阵幂优化的通用模板
## 解答


```python
# 矩阵快速幂 优化
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
    def countVowelPermutation(self, n: int) -> int:
        A = [0,5]
        a,e,i,o,u = 1,1,1,1,1
        for _ in range(10):
            a,e,i,o,u = (e+i+u)%mod,(a+i)%mod,(e+o)%mod,i,(i+o)%mod
            A.append((a+e+i+o+u)%mod)
        mp = MatPow(A)
        return mp.get(n)
```
7 ms
