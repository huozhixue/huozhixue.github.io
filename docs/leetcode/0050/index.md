# 0050：Pow(x, n)（★）


> <u>**[力扣第 50 题](https://leetcode.cn/problems/powx-n/)**</u>

## 题目

<p>实现 <a href="https://www.cplusplus.com/reference/valarray/pow/" target="_blank">pow(<em>x</em>, <em>n</em>)</a> ，即计算 <code>x</code> 的整数 <code>n</code> 次幂函数（即，<code>x<sup>n</sup></code><sup><span style="font-size:10.8333px"> </span></sup>）。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>x = 2.00000, n = 10
<strong>输出：</strong>1024.00000
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>x = 2.10000, n = 3
<strong>输出：</strong>9.26100
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>x = 2.00000, n = -2
<strong>输出：</strong>0.25000
<strong>解释：</strong>2<sup>-2</sup> = 1/2<sup>2</sup> = 1/4 = 0.25
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-100.0 &lt; x &lt; 100.0</code></li>
<li><code>-2<sup>31</sup> &lt;= n &lt;= 2<sup>31</sup>-1</code></li>
<li><code>n</code> 是一个整数</li>
<li><code>-10<sup>4</sup> &lt;= x<sup>n</sup> &lt;= 10<sup>4</sup></code></li>
</ul>


## 分析 

### #1

递归的典型应用，特别注意下 n 为负数、x 为 0 的边界情况。

```python
def myPow(self, x: float, n: int) -> float:
    if n == 0:
        return 1
    if x == 0:
        return 0
    if n < 0:
        x, n = 1 / x, -n
    return self.myPow(x, n // 2) ** 2 * (x if n % 2 else 1)
```
28 ms

### #2

还可以写成非递归形式。假设 n 的二进制字符串为 s，可以递推求得 pow(x, s[:i]对应的数)。
（也可以迭代 s 的后缀，递推求得 pow(x, int(s[i:], 2))）

## 解答

```python
def myPow(self, x: float, n: int) -> float:
    if n == 0:
        return 1
    if x == 0:
        return 0
    if n < 0:
        x, n = 1 / x, -n
    res = 1
    for bit in bin(n)[2:]:
        res *= res
        res *= x if bit == '1' else 1
    return res
```
28 ms
