# 0029：两数相除（★）


> <u>**[力扣第 29 题](https://leetcode.cn/problems/divide-two-integers/)**</u>

## 题目

<p>给你两个整数，被除数 <code>dividend</code> 和除数 <code>divisor</code>。将两数相除，要求 <strong>不使用</strong> 乘法、除法和取余运算。</p>

<p>整数除法应该向零截断，也就是截去（<code>truncate</code>）其小数部分。例如，<code>8.345</code> 将被截断为 <code>8</code> ，<code>-2.7335</code> 将被截断至 <code>-2</code> 。</p>

<p>返回被除数 <code>dividend</code> 除以除数 <code>divisor</code> 得到的 <strong>商</strong> 。</p>

<p><strong>注意：</strong>假设我们的环境只能存储 <strong>32 位</strong> 有符号整数，其数值范围是 <code>[−2<sup>31</sup>,  2<sup>31 </sup>− 1]</code> 。本题中，如果商 <strong>严格大于</strong> <code>2<sup>31 </sup>− 1</code> ，则返回 <code>2<sup>31 </sup>− 1</code> ；如果商 <strong>严格小于</strong> <code>-2<sup>31</sup></code> ，则返回 <code>-2<sup>31</sup></code><sup> </sup>。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> dividend = 10, divisor = 3
<strong>输出:</strong> 3
<strong>解释: </strong>10/3 = 3.33333.. ，向零截断后得到 3 。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> dividend = 7, divisor = -3
<strong>输出:</strong> -2
<strong>解释:</strong> 7/-3 = -2.33333.. ，向零截断后得到 -2 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-2<sup>31</sup> &lt;= dividend, divisor &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>divisor != 0</code></li>
</ul>


## 分析

### #1 

最简单的想法就是把两个数都变成正的，然后被除数不断的减去除数直到小于除数为止，最后再加上正负号。

溢出的唯一可能是 −2^31 除以 -1 等于 2^31。

```python
def divide(self, dividend: int, divisor: int) -> int:
    res, flag = 0, int(dividend ^ divisor >= 0)
    m, n = abs(dividend), abs(divisor)
    while m >= n:
        m -= n
        res += 1
    res = res if flag else -res
    return min(res, 2147483647)
```
超时了

### #2

显然超时是因为两个数的逼近太慢。考虑将除数不断自加，相当于乘 2，就可以快速的逼近了。
- 以求 divide(100, 3) 为例，将 3 不断自加直到 96 （3 的 32 倍），即转化为求 32+divide(4, 3)
- 因此求 divide(m, n) 的过程就是每一轮求最接近 m 的 n*(2^k)，并更新 m -= n*(2^k), res+=2^k 
- 进一步地，0<=k<=31。因此直接遍历 k 从 31 到 0，判断是否减去 n*(2^k) 即可。

## 解答

```python
def divide(self, dividend: int, divisor: int) -> int:
    res, flag = 0, int(dividend ^ divisor >= 0)
    m, n = abs(dividend), abs(divisor)
    A = [(n, 1)]
    for _ in range(31):
        A.append((A[-1][0]+A[-1][0], A[-1][1]+A[-1][1]))
    res = 0
    for i in range(31, -1, -1):
        if m >= A[i][0]:
            m -= A[i][0]
            res += A[i][1]
    res = res if flag else -res
    return min(res, 2147483647)
```
36 ms
