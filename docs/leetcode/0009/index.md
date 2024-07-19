# 0009：回文数


> <u>**[力扣第 9 题](https://leetcode.cn/problems/palindrome-number/)**</u>

## 题目

<p>给你一个整数 <code>x</code> ，如果 <code>x</code> 是一个回文整数，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>

<p><span data-keyword="palindrome-integer">回文数</span>是指正序（从左向右）和倒序（从右向左）读都是一样的整数。</p>

<ul>
<li>例如，<code>121</code> 是回文，而 <code>123</code> 不是。</li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>x = 121
<strong>输出：</strong>true
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>x = -121
<strong>输出：</strong>false
<strong>解释：</strong>从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>x = 10
<strong>输出：</strong>false
<strong>解释：</strong>从右向左读, 为 01 。因此它不是一个回文数。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-2<sup>31</sup> &lt;= x &lt;= 2<sup>31</sup> - 1</code></li>
</ul>



<p><strong>进阶：</strong>你能不将整数转为字符串来解决这个问题吗？</p>


**相似问题：**
- [0234：回文链表](/leetcode/0234)
- [2217：找到指定长度的回文数（1822 分）](/leetcode/2217)
- [2396：严格回文的数字（1328 分）](/leetcode/2396)
- [2843：统计对称整数的数目（1269 分）](/leetcode/2843)


## 分析

### #1

最简单的就是转为字符串判断。

```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        return str(x)==str(x)[::-1]
```
42 ms

### #2

也可以类似 {{< lc "0007" >}} 将整数反转，判断是否相等。

## 解答

```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False
        res, y = 0, x
        while y:
            y,r = divmod(y,10)
            res = res*10+r
        return res==x
```
63 ms

