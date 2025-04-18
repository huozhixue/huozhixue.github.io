# 1416：恢复数组（1919 分）


> <u>**[力扣第 24 场双周赛第 4 题](https://leetcode.cn/problems/restore-the-array/)**</u>

## 题目

<p>某个程序本来应该输出一个整数数组。但是这个程序忘记输出空格了以致输出了一个数字字符串，我们所知道的信息只有：数组中所有整数都在 <code>[1, k]</code> 之间，且数组中的数字都没有前导 0 。</p>

<p>给你字符串 <code>s</code> 和整数 <code>k</code> 。可能会有多种不同的数组恢复结果。</p>

<p>按照上述程序，请你返回所有可能输出字符串 <code>s</code> 的数组方案数。</p>

<p>由于数组方案数可能会很大，请你返回它对 <code>10^9 + 7</code> <strong>取余</strong> 后的结果。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>s = &quot;1000&quot;, k = 10000
<strong>输出：</strong>1
<strong>解释：</strong>唯一一种可能的数组方案是 [1000]
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>s = &quot;1000&quot;, k = 10
<strong>输出：</strong>0
<strong>解释：</strong>不存在任何数组方案满足所有整数都 &gt;= 1 且 &lt;= 10 同时输出结果为 s 。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>s = &quot;1317&quot;, k = 2000
<strong>输出：</strong>8
<strong>解释：</strong>可行的数组方案为 [1317]，[131,7]，[13,17]，[1,317]，[13,1,7]，[1,31,7]，[1,3,17]，[1,3,1,7]
</pre>

<p><strong>示例 4：</strong></p>

<pre><strong>输入：</strong>s = &quot;2020&quot;, k = 30
<strong>输出：</strong>1
<strong>解释：</strong>唯一可能的数组方案是 [20,20] 。 [2020] 不是可行的数组方案，原因是 2020 &gt; 30 。 [2,020] 也不是可行的数组方案，因为 020 含有前导 0 。
</pre>

<p><strong>示例 5：</strong></p>

<pre><strong>输入：</strong>s = &quot;1234567890&quot;, k = 90
<strong>输出：</strong>34
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 10^5</code>.</li>
<li><code>s</code> 只包含数字且不包含前导 0 。</li>
<li><code>1 &lt;= k &lt;= 10^9</code>.</li>
</ul>


**相似问题：**
- [1977：划分数字的方案数（2817 分）](/leetcode/1977)
- [2478：完美分割的方案数（2344 分）](/leetcode/2478)


## 分析


### #1

- 要排除前导零，从后往前递推更方便
- 按第一个数字长度递推即可

```python
class Solution:
    def numberOfArrays(self, s: str, k: int) -> int:
        mod = 10**9+7
        n = len(s)
        f = [0]*n+[1]
        for i in range(n-1,-1,-1):
            if s[i]!='0':
                t = 0
                for j in range(i,n):
                    t = t*10+int(s[j])
                    if t>k:
                        break
                    f[i] += f[j+1]
                f[i] %= mod
        return f[0]
```
695 ms

### #2

- 注意到假如 s[i:j] 的位数比 k 少，那么肯定符合
- 设 k 的位数为 m，只需要特判 s[i:i+m] 是否<=k
- 因此若 s[i:i+m]<=k，f[i]=sum(f[i+1:i+m+1])，否则 f[i]=sum(f[i+1:i+m])
- 这个递推式可以用前缀和优化，而 s[i:i+m] 的值也可以对 s 预处理一趟得到

## 解答

```python
class Solution:
    def numberOfArrays(self, s: str, k: int) -> int:
        mod = 10**9+7
        n,m = len(s),len(str(k))
        g,t,p10 = [],0,pow(10,m)
        for i,c in enumerate(s):
            t = (t*10+int(c))%p10
            if i>=m-1:
                g.append(t)
        f = [0]*n+[1]
        suf = [1]*(n+1)+[0]
        for i in range(n-1,-1,-1):
            if s[i]!='0':
                f[i] = suf[i+1]
                if i+m<=n:
                    f[i] -= suf[i+m] if g[i]>k else suf[i+m+1]
                f[i] %= mod
            suf[i] = (suf[i+1]+f[i])%mod
        return f[0]
```
219 ms

