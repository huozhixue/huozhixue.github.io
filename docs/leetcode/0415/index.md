# 0415：字符串相加


> <u>**[力扣第 415 题](https://leetcode.cn/problems/add-strings/)**</u>

## 题目

<p>给定两个字符串形式的非负整数 <code>num1</code> 和<code>num2</code> ，计算它们的和并同样以字符串形式返回。</p>

<p>你不能使用任何內建的用于处理大整数的库（比如 <code>BigInteger</code>）， 也不能直接将输入的字符串转换为整数形式。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>num1 = "11", num2 = "123"
<strong>输出：</strong>"134"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>num1 = "456", num2 = "77"
<strong>输出：</strong>"533"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>num1 = "0", num2 = "0"
<strong>输出：</strong>"0"
</pre>





<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= num1.length, num2.length &lt;= 10<sup>4</sup></code></li>
<li><code>num1</code> 和<code>num2</code> 都只包含数字 <code>0-9</code></li>
<li><code>num1</code> 和<code>num2</code> 都不包含任何前导零</li>
</ul>


## 分析

类似 {{< lc "0067">}} ，将除数换成 10 即可。


## 解答

```python
class Solution:
    def addStrings(self, num1: str, num2: str) -> str:
        res,c = [],0
        for x,y in zip_longest(num1[::-1],num2[::-1],fillvalue=0):
            c,r = divmod(int(x)+int(y)+c,10)
            res.append(str(r))
        if c:
            res.append('1')
        return ''.join(res[::-1])
```
49 ms

