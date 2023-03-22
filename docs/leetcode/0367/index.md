# 0367：有效的完全平方数


> <u>**[力扣第 367 题](https://leetcode.cn/problems/valid-perfect-square/)**</u>

## 题目

<p>给你一个正整数 <code>num</code> 。如果 <code>num</code> 是一个完全平方数，则返回 <code>true</code> ，否则返回 <code>false</code> 。</p>

<p><strong>完全平方数</strong> 是一个可以写成某个整数的平方的整数。换句话说，它可以写成某个整数和自身的乘积。</p>

<p>不能使用任何内置的库函数，如  <code>sqrt</code> 。</p>



<p><strong class="example">示例 1：</strong></p>

<pre>
<strong>输入：</strong>num = 16
<strong>输出：</strong>true
<strong>解释：</strong>返回 true ，因为 4 * 4 = 16 且 4 是一个整数。
</pre>

<p><strong class="example">示例 2：</strong></p>

<pre>
<strong>输入：</strong>num = 14
<strong>输出：</strong>false
<strong>解释：</strong>返回 false ，因为 3.742 * 3.742 = 14 但 3.742 不是一个整数。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= num &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


## 分析

{{< lc "0069" >}} 升级版，找到平方根取整后，判断其平方是否等于 num 即可。

找平方根可以用二分查找，也可以用牛顿迭代法。

## 解答

```python
def isPerfectSquare(self, num: int) -> bool:
    i = num
    while i * i > num:
        i = (i+num//i) // 2
    return i * i == num
```
32 ms

