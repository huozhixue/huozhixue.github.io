# 0009：回文数


> <u>**[力扣第 9 题](https://leetcode.cn/problems/palindrome-number/)**</u>

## 题目

<p>给你一个整数 <code>x</code> ，如果 <code>x</code> 是一个回文整数，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>

<p>回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。</p>

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


## 分析

### #1

最简单的就是转为字符串判断。

```python
def isPalindrome(self, x: int) -> bool:
	return str(x) == str(x)[::-1]
```
80 ms

### #2

也可以类似 {{< lc "0007" >}} 将整数反转，判断是否相等。
注意负数必然不是回文数。

## 解答

```python
def isPalindrome(self, x: int) -> bool:
	if x < 0:
		return False
	y, tmp = 0, x
	while tmp:
		y = y * 10 + tmp % 10
		tmp //= 10
	return y == x
```
72 ms

