# 0326：3 的幂


> <u>**[力扣第 326 题](https://leetcode.cn/problems/power-of-three/)**</u>

## 题目

<p>给定一个整数，写一个函数来判断它是否是 3 的幂次方。如果是，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>

<p>整数 <code>n</code> 是 3 的幂次方需满足：存在整数 <code>x</code> 使得 <code>n == 3<sup>x</sup></code></p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 27
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 0
<strong>输出：</strong>false
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 9
<strong>输出：</strong>true
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>n = 45
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-2<sup>31</sup> &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
</ul>



<p><strong>进阶：</strong>你能不使用循环或者递归来完成本题吗？</p>


**相似问题：**
- [0231：2 的幂](/leetcode/0231)
- [0342：4的幂](/leetcode/0342)
- [1780：判断一个数字是否可以表示成三的幂的和（1505 分）](/leetcode/1780)


## 分析

要求不用循环递归，考虑用数学
- n 是 3 的幂等价于 n 被范围内最大的 3 的幂数整除

## 解答

```python
class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        return n>0 and pow(3,21)%n==0
```
80 ms

