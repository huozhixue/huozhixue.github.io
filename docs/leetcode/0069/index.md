# 0069：x 的平方根 


> <u>**[力扣第 69 题](https://leetcode.cn/problems/sqrtx/)**</u>

## 题目

<p>给你一个非负整数 <code>x</code> ，计算并返回 <code>x</code> 的 <strong>算术平方根</strong> 。</p>

<p>由于返回类型是整数，结果只保留 <strong>整数部分 </strong>，小数部分将被 <strong>舍去 。</strong></p>

<p><strong>注意：</strong>不允许使用任何内置指数函数和算符，例如 <code>pow(x, 0.5)</code> 或者 <code>x ** 0.5</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>x = 4
<strong>输出：</strong>2
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>x = 8
<strong>输出：</strong>2
<strong>解释：</strong>8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= x &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [0050：Pow(x, n)](/leetcode/0050)
- [0367：有效的完全平方数](/leetcode/0367)


## 分析


- 就是求满足 y * y <= x 的最大整数 y 
- y * y 单调递增，因此可以用二分查找

## 解答

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        return bisect_left(range(x+1),True,key=lambda y:y*y>x)-1
```

39 ms

## *附加

- 还可以用牛顿迭代法
- 每一步逼近的表达式为 x(n+1)=x(n)-f(x)/f'(x)
- 对于本题，迭代 $y=(y+x/y)/2$ 即可不断逼近 $\sqrt x$
- y 取整得到 y'，若 y‘<=$\sqrt x$，y‘ 即是所求

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        y = x
        while y*y>x:
            y = (y+x//y)//2
        return y
```
48 ms
