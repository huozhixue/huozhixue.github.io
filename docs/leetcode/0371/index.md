# 0371：两整数之和（★）


> <u>**[力扣第 371 题](https://leetcode.cn/problems/sum-of-two-integers/)**</u>

## 题目

<p>给你两个整数 <code>a</code> 和 <code>b</code> ，<strong>不使用 </strong>运算符 <code>+</code> 和 <code>-</code> ​​​​​​​，计算并返回两整数之和。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>a = 1, b = 2
<strong>输出：</strong>3
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>a = 2, b = 3
<strong>输出：</strong>5
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-1000 &lt;= a, b &lt;= 1000</code></li>
</ul>


## 分析

可以用位运算来解决，但 python 处理负数较为麻烦，所以直接调库。
## 解答

```python
class Solution:
    def getSum(self, a: int, b: int) -> int:
        return int.__add__(a,b)
```
37 ms

