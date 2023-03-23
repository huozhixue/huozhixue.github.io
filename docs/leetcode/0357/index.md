# 0357：统计各位数字都不同的数字个数（★）


> <u>**[力扣第 357 题](https://leetcode.cn/problems/count-numbers-with-unique-digits/)**</u>

## 题目

给你一个整数 <code>n</code> ，统计并返回各位数字都不同的数字 <code>x</code> 的个数，其中 <code>0 &lt;= x &lt; 10<sup>n</sup></code><sup> </sup>。
<div class="original__bRMd">
<div>


<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 2
<strong>输出：</strong>91
<strong>解释：</strong>答案应为除去 <code>11、22、33、44、55、66、77、88、99 </code>外，在 0 ≤ x &lt; 100 范围内的所有数字。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 0
<strong>输出：</strong>1
</pre>
</div>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= n &lt;= 8</code></li>
</ul>


## 分析

根据数学知识：
- [1, 9] 的对应个数：9
- [10, 99] 的对应个数：9*9
- [100, 999] 的对应个数：9*9*8
- 一般性的，[10^k, 10^(k+1)-1] 的对应个数为 9*perm(9, k)。

因此可以分段计算 [0, 10^n-1] 的对应个数。甚至可以直接打表。

## 解答

```python
def countNumbersWithUniqueDigits(self, n: int) -> int:
    return 1+9*sum(perm(9, k) for k in range(n))
```
36 ms

