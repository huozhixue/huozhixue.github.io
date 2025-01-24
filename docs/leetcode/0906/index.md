# 0906：超级回文数（2140 分）

 
> <u>**[力扣第 102 场周赛第 4 题](https://leetcode.cn/problems/super-palindromes/)**</u>

## 题目

<p>如果一个正整数自身是回文数，而且它也是一个回文数的平方，那么我们称这个数为超级回文数。</p>

<p>现在，给定两个正整数 <code>L</code> 和 <code>R</code> （以字符串形式表示），返回包含在范围 <code>[L, R]</code> 中的超级回文数的数目。</p>



<p><strong>示例：</strong></p>

<pre><strong>输入：</strong>L = &quot;4&quot;, R = &quot;1000&quot;
<strong>输出：</strong>4
<strong>解释：
</strong>4，9，121，以及 484 是超级回文数。
注意 676 不是一个超级回文数： 26 * 26 = 676，但是 26 不是回文数。</pre>



<p><strong>提示：</strong></p>

<ol>
<li><code>1 &lt;= len(L) &lt;= 18</code></li>
<li><code>1 &lt;= len(R) &lt;= 18</code></li>
<li><code>L</code> 和 <code>R</code> 是表示 <code>[1, 10^18)</code> 范围的整数的字符串。</li>
<li><code>int(L) &lt;= int(R)</code></li>
</ol>






## 分析

类似 {{< lc "0866" >}}，从小到大构造回文数，并判断其平方是否满足要求即可。

## 解答


```python
class Solution:
    def superpalindromesInRange(self, left: str, right: str) -> int:
        l,r = int(left), int(right)
        res, base = 0, 1
        while True:
            for odd in [1,0]:
                for h in range(base,base*10):
                    x = int(str(h)+str(h)[::-1][odd:])
                    y = x*x
                    if y>r:
                        return res
                    if l<=y and str(y)==str(y)[::-1]:
                        res += 1
            base *= 10
```
351 ms
