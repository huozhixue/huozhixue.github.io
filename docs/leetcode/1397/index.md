# 1397：找到所有好字符串（2666 分）


> <u>**[力扣第 182 场周赛第 4 题](https://leetcode.cn/problems/find-all-good-strings/)**</u>

## 题目

<p>给你两个长度为 <code>n</code> 的字符串 <code>s1</code> 和 <code>s2</code> ，以及一个字符串 <code>evil</code> 。请你返回 <strong>好字符串 </strong>的数目。</p>

<p><strong>好字符串</strong> 的定义为：它的长度为 <code>n</code> ，字典序大于等于 <code>s1</code> ，字典序小于等于 <code>s2</code> ，且不包含 <code>evil</code> 为子字符串。</p>

<p>由于答案可能很大，请你返回答案对 10^9 + 7 取余的结果。</p>



<p><strong>示例 1：</strong></p>

<pre><strong>输入：</strong>n = 2, s1 = &quot;aa&quot;, s2 = &quot;da&quot;, evil = &quot;b&quot;
<strong>输出：</strong>51
<strong>解释：</strong>总共有 25 个以 &#39;a&#39; 开头的好字符串：&quot;aa&quot;，&quot;ac&quot;，&quot;ad&quot;，...，&quot;az&quot;。还有 25 个以 &#39;c&#39; 开头的好字符串：&quot;ca&quot;，&quot;cc&quot;，&quot;cd&quot;，...，&quot;cz&quot;。最后，还有一个以 &#39;d&#39; 开头的好字符串：&quot;da&quot;。
</pre>

<p><strong>示例 2：</strong></p>

<pre><strong>输入：</strong>n = 8, s1 = &quot;leetcode&quot;, s2 = &quot;leetgoes&quot;, evil = &quot;leet&quot;
<strong>输出：</strong>0
<strong>解释：</strong>所有字典序大于等于 s1 且小于等于 s2 的字符串都以 evil 字符串 &quot;leet&quot; 开头。所以没有好字符串。
</pre>

<p><strong>示例 3：</strong></p>

<pre><strong>输入：</strong>n = 2, s1 = &quot;gx&quot;, s2 = &quot;gz&quot;, evil = &quot;x&quot;
<strong>输出：</strong>2
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>s1.length == n</code></li>
<li><code>s2.length == n</code></li>
<li><code>s1 &lt;= s2</code></li>
<li><code>1 &lt;= n &lt;= 500</code></li>
<li><code>1 &lt;= evil.length &lt;= 50</code></li>
<li>所有字符串都只包含小写英文字母。</li>
</ul>




## 分析

- 数位 dp，用 kmp 维护当前匹配 evil 的长度即可
## 解答


```python
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

class Solution:
    def findGoodStrings(self, n: int, s1: str, s2: str, evil: str) -> int:
        @cache 
        def dfs(i,st,lbd,ubd):
            if i==n:
                return 1
            res = 0
            up = s2[i] if ubd else 25
            low = s1[i] if lbd else 0
            for x in range(low,up+1):
                j = st
                while j>0 and x!=evil[j]:
                    j = pi[j-1]
                j += x==evil[j]
                if j<len(evil):
                    res += dfs(i+1,j,lbd and x==low,ubd and x==up)
                    res %= mod
            return res

        gen = lambda s: [ord(c)-ord('a') for c in s]
        s1,s2,evil = gen(s1),gen(s2),gen(evil)
        pi = kmp(evil)
        return dfs(0,0,1,1)
```
338 ms
