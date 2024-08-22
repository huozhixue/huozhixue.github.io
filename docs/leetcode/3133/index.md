# 3133：数组最后一个元素的最小值（1934 分）


> <u>**[力扣第 395 场周赛第 3 题](https://leetcode.cn/problems/minimum-array-end/)**</u>

## 题目

<p>给你两个整数 <code>n</code> 和 <code>x</code> 。你需要构造一个长度为 <code>n</code> 的 <strong>正整数 </strong>数组 <code>nums</code> ，对于所有 <code>0 &lt;= i &lt; n - 1</code> ，满足 <code>nums[i + 1]</code><strong> 大于 </strong><code>nums[i]</code> ，并且数组 <code>nums</code> 中所有元素的按位 <code>AND</code> 运算结果为 <code>x</code> 。</p>

<p>返回 <code>nums[n - 1]</code> 可能的<strong> 最小 </strong>值。</p>



<p><strong class="example">示例 1：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">n = 3, x = 4</span></p>

<p><strong>输出：</strong><span class="example-io">6</span></p>

<p><strong>解释：</strong></p>

<p>数组 <code>nums</code> 可以是 <code>[4,5,6]</code> ，最后一个元素为 <code>6</code> 。</p>
</div>

<p><strong class="example">示例 2：</strong></p>

<div class="example-block">
<p><strong>输入：</strong><span class="example-io">n = 2, x = 7</span></p>

<p><strong>输出：</strong><span class="example-io">15</span></p>

<p><strong>解释：</strong></p>

<p>数组 <code>nums</code> 可以是 <code>[7,15]</code> ，最后一个元素为 <code>15</code> 。</p>
</div>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n, x &lt;= 10<sup>8</sup></code></li>
</ul>




## 分析

- 考虑元素的二进制位，x 二进制为 1 的位数集合 A 是所有元素的交集
- 去掉位数集合 A，剩下的位数拼成的数，等价于从 0 到 n-1 
- 因此将 n-1 的二进制填入 A 以外的空即可

## 解答


```python
class Solution:
    def minEnd(self, n: int, x: int) -> int:
        n -= 1
        i = 0
        for j in range(n.bit_length()):
            while x>>i&1:
                i += 1 
            x |= (n>>j&1)<<i
            i += 1
        return x
```
36 ms
