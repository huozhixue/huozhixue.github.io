# 0878：第 N 个神奇数字（1896 分）


> <u>**[力扣第 95 场周赛第 3 题](https://leetcode.cn/problems/nth-magical-number/)**</u>

## 题目

<p>一个正整数如果能被 <code>a</code> 或 <code>b</code> 整除，那么它是神奇的。</p>

<p>给定三个整数 <code>n</code> , <code>a</code> , <code>b</code> ，返回第 <code>n</code> 个神奇的数字。因为答案可能很大，所以返回答案 <strong>对 </strong><code>10<sup>9</sup> + 7</code> <strong>取模 </strong>后的值。</p>



<ol>
</ol>

<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 1, a = 2, b = 3
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 4, a = 2, b = 3
<strong>输出：</strong>6
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code></li>
<li><code>2 &lt;= a, b &lt;= 4 * 10<sup>4</sup></code></li>
</ul>






## 分析

- 典型的二分查找，查找第一个 x，使得 <=x 的神奇数字个数 >=n 即可
- <=x 的神奇数字个数，用容斥定理即可
## 解答


```python
class Solution:
    def nthMagicalNumber(self, n: int, a: int, b: int) -> int:
        mod = 10**9+7
        def cal(x):
            return x//a+x//b-x//lcm(a,b)
        return bisect_left(range(a*n),n,key=cal)%mod
```
0 ms
