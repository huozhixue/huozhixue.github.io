# 0007：整数反转（★）


> <u>**[力扣第 7 题](https://leetcode.cn/problems/reverse-integer/)**</u>

## 题目

<p>给你一个 32 位的有符号整数 <code>x</code> ，返回将 <code>x</code> 中的数字部分反转后的结果。</p>

<p>如果反转后整数超过 32 位的有符号整数的范围 <code>[−2<sup>31</sup>,  2<sup>31 </sup>− 1]</code> ，就返回 0。</p>
<strong>假设环境不允许存储 64 位整数（有符号或无符号）。</strong>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>x = 123
<strong>输出：</strong>321
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>x = -123
<strong>输出：</strong>-321
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>x = 120
<strong>输出：</strong>21
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>x = 0
<strong>输出：</strong>0
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-2<sup>31</sup> <= x <= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [0008：字符串转换整数 (atoi)](/leetcode/0008)
- [0190：颠倒二进制位](/leetcode/0190)
- [2119：反转两次的数字（1187 分）](/leetcode/2119)
- [2442：反转之后不同整数的数目（1218 分）](/leetcode/2442)


## 分析

### #1

- 最直接的就是转为字符串反转，再判断是否溢出
- 注意负数的负号

```python
class Solution:
    def reverse(self, x: int) -> int:
        y = int('-'*(x<0)+str(abs(x))[::-1])
        return y if -2**31<=y<2**31 else 0
```
48 ms

### #2

也可以按位依次构建，python 中不需要担心溢出。

## 解答

```python
class Solution:
    def reverse(self, x: int) -> int:
        flag = 1 if x>=0 else -1
        res,x = 0,abs(x)
        while x:
            x,r = divmod(x,10)
            res = res*10+r
        res *= flag
        return res if -2**31<=res<2**31 else 0
```
43 ms


