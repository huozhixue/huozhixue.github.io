# 0405：数字转换为十六进制数


> <u>**[力扣第 405 题](https://leetcode.cn/problems/convert-a-number-to-hexadecimal/)**</u>

## 题目

<p>给定一个整数，编写一个算法将这个数转换为十六进制数。对于负整数，我们通常使用 <a href="https://baike.baidu.com/item/%E8%A1%A5%E7%A0%81/6854613?fr=aladdin">补码运算</a> 方法。</p>

<p><strong>注意:</strong></p>

<ol>
<li>十六进制中所有字母(<code>a-f</code>)都必须是小写。</li>
<li>十六进制字符串中不能包含多余的前导零。如果要转化的数为0，那么以单个字符<code>&#39;0&#39;</code>来表示；对于其他情况，十六进制字符串中的第一个字符将不会是0字符。 </li>
<li>给定的数确保在32位有符号整数范围内。</li>
<li><strong>不能使用任何由库提供的将数字直接转换或格式化为十六进制的方法。</strong></li>
</ol>

<p><strong>示例 1：</strong></p>

<pre>
输入:
26

输出:
&quot;1a&quot;
</pre>

<p><strong>示例 2：</strong></p>

<pre>
输入:
-1

输出:
&quot;ffffffff&quot;
</pre>


## 分析

### #1

最简单的就是调库

```python
def toHex(self, num: int) -> str:
    return hex(num%(1<<32))[2:]
```
44 ms

### #2

也可以模拟进制转换的方法。

> 注意 num 为 0 时的特殊情况

## 解答

```python
def toHex(self, num: int) -> str:
    num %= 1<<32
    res, s = '', '0123456789abcdef'
    while num:
        res = s[num%16]+res
        num //= 16
    return res if res else '0'
```
44 ms
