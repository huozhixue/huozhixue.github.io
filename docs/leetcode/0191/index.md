# 0191：位1的个数


> <u>**[力扣第 191 题](https://leetcode.cn/problems/number-of-1-bits/)**</u>

## 题目

<p>编写一个函数，获取一个正整数的二进制形式并返回其二进制表达式中 <span data-keyword="set-bit">设置位</span> 的个数（也被称为<a href="https://baike.baidu.com/item/%E6%B1%89%E6%98%8E%E9%87%8D%E9%87%8F" target="_blank">汉明重量</a>）。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 11
<strong>输出：</strong>3
<strong>解释：</strong>输入的二进制串 <code><strong>1011</strong> 中，共有 3 个设置位。</code>
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 128
<strong>输出：</strong>1
<strong>解释：</strong>输入的二进制串 <strong>10000000</strong> 中，共有 1 个设置位。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 2147483645
<strong>输出：</strong>30
<strong>解释：</strong>输入的二进制串 <strong>11111111111111111111111111111101</strong> 中，共有 30 个设置位。</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
</ul>

<ul>
</ul>



<p><strong>进阶</strong>：</p>

<ul>
<li>如果多次调用这个函数，你将如何优化你的算法？</li>
</ul>


**相似问题：**
- [0190：颠倒二进制位](/leetcode/0190)
- [0231：2 的幂](/leetcode/0231)
- [0338：比特位计数](/leetcode/0338)
- [0401：二进制手表](/leetcode/0401)
- [0461：汉明距离](/leetcode/0461)
- [0693：交替位二进制数](/leetcode/0693)
- [0762：二进制表示中质数个计算置位（1383 分）](/leetcode/0762)


## 分析

### #1

可以直接调包。

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        return n.bit_count()
```
30 ms

### #2

有个巧妙的位计算技巧：
- n & (n-1) 等价于将 n 中最后一个 1 变为 0
- 循环操作直到 n 变为 0 即可
 
## 解答

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        res = 0
        while n:
            n &= n-1
            res += 1
        return res
```
40 ms



