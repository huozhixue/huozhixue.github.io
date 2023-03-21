# 0342：4的幂


> <u>**[力扣第 342 题](https://leetcode.cn/problems/power-of-four/)**</u>

## 题目

<p>给定一个整数，写一个函数来判断它是否是 4 的幂次方。如果是，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>

<p>整数 <code>n</code> 是 4 的幂次方需满足：存在整数 <code>x</code> 使得 <code>n == 4<sup>x</sup></code></p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 16
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 5
<strong>输出：</strong>false
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>true
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-2<sup>31</sup> &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
</ul>



<p><strong>进阶：</strong>你能不使用循环或者递归来完成本题吗？</p>


## 分析

{{< lc "0231" >}} 升级版。n 是 4 的幂等价于 n 是 2 的幂且 n 的二进制中的 1 在偶数位上。

只要 n & 0xAAAAAAAA == 0，即说明 n 的二进制不存在奇数位的 1。

## 解答

```python
def isPowerOfFour(self, n: int) -> bool:
    return n > 0 and n&(n-1) == 0 and n & 0xAAAAAAAA == 0
```
32 ms

