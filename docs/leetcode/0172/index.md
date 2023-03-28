# 0172：阶乘后的零（★）


> <u>**[力扣第 172 题](https://leetcode.cn/problems/factorial-trailing-zeroes/)**</u>

## 题目

<p>给定一个整数 <code>n</code> ，返回 <code>n!</code> 结果中尾随零的数量。</p>

<p>提示 <code>n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1</code></p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>0
<strong>解释：</strong>3! = 6 ，不含尾随 0
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 5
<strong>输出：</strong>1
<strong>解释：</strong>5! = 120 ，有一个尾随 0
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 0
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= n &lt;= 10<sup>4</sup></code></li>
</ul>



<p><b>进阶：</b>你可以设计并实现对数时间复杂度的算法来解决此问题吗？</p>


## 分析

数学分析：
- 结尾零的个数等于 n! 的质因数中 (2, 5) 对的个数
- 显然 5 更少，因此结果就等于因子 5 的个数
- 从 1 到 n ，含有 1 个因子 5 的个数是 n // 5，含有 2 个因子 5 的个数是 n // 25，依此类推

因此结果为：

$$n // 5 + n // 25 + n // 125 + ...$$
 
## 解答

```python
def trailingZeroes(self, n: int) -> int:
    res = 0
    while n:
        n //= 5
        res += n
    return res
```
28 ms

