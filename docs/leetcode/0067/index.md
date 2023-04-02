# 0067：二进制求和


> <u>**[力扣第 67 题](https://leetcode.cn/problems/add-binary/)**</u>

## 题目

<p>给你两个二进制字符串 <code>a</code> 和 <code>b</code> ，以二进制字符串的形式返回它们的和。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入:</strong>a = "11", b = "1"
<strong>输出：</strong>"100"</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>a = "1010", b = "1011"
<strong>输出：</strong>"10101"</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= a.length, b.length &lt;= 10<sup>4</sup></code></li>
<li><code>a</code> 和 <code>b</code> 仅由字符 <code>'0'</code> 或 <code>'1'</code> 组成</li>
<li>字符串如果不是 <code>"0"</code> ，就不含前导零</li>
</ul>


## 分析

### #1

可以直接调库。

```python
def addBinary(self, a: str, b: str) -> str:
	return bin(int(a, 2)+int(b, 2))[2:]
```
40 ms

### #2

也可以模拟进位加法，将除数换成 2 即可。
```python
def addBinary(self, a: str, b: str) -> str:
	res, carry, i, j = '', 0, len(a)-1, len(b)-1
	while i>=0 or j>=0 or carry:
		x = int(a[i]) if i>=0 else 0
		y = int(b[j]) if j>=0 else 0
		carry, r = divmod(x+y+carry, 2)
		res += str(r)
		i -= 1
		j -= 1
	return res[::-1]
```
36 ms
