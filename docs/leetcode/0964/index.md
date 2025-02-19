# 0964：表示数字的最少运算符（2594 分）


> <u>**[力扣第 116 场周赛第 4 题](https://leetcode.cn/problems/least-operators-to-express-number/)**</u>

## 题目

<p>给定一个正整数 <code>x</code>，我们将会写出一个形如 <code>x (op1) x (op2) x (op3) x ...</code> 的表达式，其中每个运算符 <code>op1</code>，<code>op2</code>，… 可以是加、减、乘、除（<code>+</code>，<code>-</code>，<code>*</code>，或是 <code>/</code>）之一。例如，对于 <code>x = 3</code>，我们可以写出表达式 <code>3 * 3 / 3 + 3 - 3</code>，该式的值为 3 。</p>

<p>在写这样的表达式时，我们需要遵守下面的惯例：</p>

<ul>
<li>除运算符（<code>/</code>）返回有理数。</li>
<li>任何地方都没有括号。</li>
<li>我们使用通常的操作顺序：乘法和除法发生在加法和减法之前。</li>
<li>不允许使用一元否定运算符（<code>-</code>）。例如，“<code>x - x</code>” 是一个有效的表达式，因为它只使用减法，但是 “<code>-x + x</code>” 不是，因为它使用了否定运算符。 </li>
</ul>

<p>我们希望编写一个能使表达式等于给定的目标值 <code>target</code> 且运算符最少的表达式。返回所用运算符的最少数量。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>x = 3, target = 19
<strong>输出：</strong>5
<strong>解释：</strong>3 * 3 + 3 * 3 + 3 / 3 。表达式包含 5 个运算符。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>x = 5, target = 501
<strong>输出：</strong>8
<strong>解释：</strong>5 * 5 * 5 * 5 - 5 * 5 * 5 + 5 / 5 。表达式包含 8 个运算符。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>x = 100, target = 100000000
<strong>输出：</strong>3
<strong>解释：</strong>100 * 100 * 100 * 100 。表达式包含 3 个运算符。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>2 &lt;= x &lt;= 100</code></li>
<li><code>1 &lt;= target &lt;= 2 * 10<sup>8</sup></code></li>
</ul>




## 分析

- 将连乘的 x 和 x/x 看作 1 块，显然值就是 x^i 
	- 为了方便，表达式第一个 x 前看作有个加号
	- 那么对于 x^i，要用到 i 个符号，（1 特殊，要用 2 个）
- 问题转为用这些块拼出 target，符号最少
- 首先算出 r=target%x
	- 要么用 r 个 1，转为求 t=target-r
	- 要么用 x-r 个 1，转为求 t=target+x-r
- 剩下的不需要用 1 了，继续算 r=t//x%x，讨论要用多少个 x
	- 注意只需要 t//x 的值了，所以上一步可以直接传 t//x 
- 因此令 dfs(t,i) 代表 t*x^i 用 >=x^i 的块拼的最少数，即可递归
- 注意终止条件，当 x^i>=target*x 时，用 x^i 显然是浪费的，无需考虑

## 解答

```python
class Solution:
    def leastOpsExpressTarget(self, x: int, target: int) -> int:
        @cache
        def dfs(t,i):
            if t==0:
                return 0
            if i>ma:
                return inf
            w = i if i>0 else 2
            q,r = divmod(t,x)
            return min(r*w+dfs(q,i+1),(x-r)*w+dfs(q+1,i+1))
        ma = ceil(log(target,x))
        return dfs(target,0)-1
```
0 ms

