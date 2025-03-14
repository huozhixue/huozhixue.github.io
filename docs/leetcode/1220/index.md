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

还可以用矩阵幂优化
## 解答


```python
mod = 10**9+7
def mul(A,B):
    return [[sum(a*b for a,b in zip(r,c))%mod for c in zip(*B)] for r in A]
def mpow(mat, n):
    res = mat
    for i in range(n.bit_length()-2,-1,-1):
        res = mul(res,res)
        if n>>i&1:
            res = mul(res,mat)
    return res

class Solution:
    def countVowelPermutation(self, n: int) -> int:
        f = [[1],[1],[1],[1],[1]]
        A = [[0,1,1,0,1],[1,0,1,0,0],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,1,0]]
        f = mul(mpow(A,n-1),f) if n>1 else f
        return sum(a[0] for a in f)%mod
```
15 ms
