# 0273：整数转换英文表示（★★）


> <u>**[力扣第 273 题](https://leetcode.cn/problems/integer-to-english-words/)**</u>

## 题目

<p>将非负整数 <code>num</code> 转换为其对应的英文表示。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>num = 123
<strong>输出：</strong>"One Hundred Twenty Three"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>num = 12345
<strong>输出：</strong>"Twelve Thousand Three Hundred Forty Five"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>num = 1234567
<strong>输出：</strong>"One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= num &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [0012：整数转罗马数字](/leetcode/0012)


## 分析

用递归比较方便，注意特判 num 为 0 返回 Zero。


## 解答

```python
class Solution:
    def numberToWords(self, num: int) -> str:
        A = [(10**9,'Billion'),(10**6,'Million'),(1000,'Thousand'),(100,'Hundred')]
        B = ['Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety']
        C = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten', 
            'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
            'Seventeen', 'Eighteen', 'Nineteen']
        def dfs(x):
            for w,s in A:
                if x>=w:
                    return dfs(x//w)+[s]+dfs(x%w)
            if x>=20:
                return [B[x//10-2]]+dfs(x%10)
            return [C[x-1]] if x else []
        return ' '.join(dfs(num)) or 'Zero'
```
30 ms

