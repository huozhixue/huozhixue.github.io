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

模拟进位加法，除数换成 2 即可。

## 解答

```python
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        res,c = [],0
        for x,y in zip_longest(a[::-1],b[::-1],fillvalue=0):
            c,r = divmod(int(x)+int(y)+c,2)
            res.append(str(r))
        if c:
            res.append('1')
        return ''.join(res[::-1])
```
40 ms
