# 0504：七进制数


> <u>**[力扣第 504 题](https://leetcode.cn/problems/base-7/)**</u>

## 题目

<p>给定一个整数 <code>num</code>，将其转化为 <strong>7 进制</strong>，并以字符串形式输出。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> num = 100
<strong>输出:</strong> "202"
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> num = -7
<strong>输出:</strong> "-10"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-10<sup>7</sup> &lt;= num &lt;= 10<sup>7</sup></code></li>
</ul>


## 分析


模拟即可，注意负数。

## 解答

```python
class Solution:
    def convertToBase7(self, num: int) -> str:
        sign = '-' if num<0 else ''
        num = abs(num)
        res = ''
        while num:
            num,r = divmod(num,7)
            res = str(r)+res
        return sign+res or '0'
```
36 ms



