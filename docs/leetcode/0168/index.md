# 0168：Excel表列名称


> <u>**[力扣第 168 题](https://leetcode.cn/problems/excel-sheet-column-title/)**</u>

## 题目

<p>给你一个整数 <code>columnNumber</code> ，返回它在 Excel 表中相对应的列名称。</p>

<p>例如：</p>

<pre>
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28
...
</pre>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>columnNumber = 1
<strong>输出：</strong>"A"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>columnNumber = 28
<strong>输出：</strong>"AB"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>columnNumber = 701
<strong>输出：</strong>"ZY"
</pre>

<p><strong>示例 4：</strong></p>

<pre>
<strong>输入：</strong>columnNumber = 2147483647
<strong>输出：</strong>"FXSHRXW"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= columnNumber <= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [0171：Excel 表列序号](/leetcode/0171)
- [2194：Excel 表中某个范围内的单元格（1253 分）](/leetcode/2194)


## 分析

类似 26 进制，只不过每一位的范围是 [1, 26] 而不是 [0, 25]，注意每次除 26 之前先减一。

## 解答

```python
class Solution:
    def convertToTitle(self, columnNumber: int) -> str:
        res = ''
        while columnNumber:
            columnNumber,r = divmod(columnNumber-1,26)
            res = chr(ord('A')+r)+res
        return res
```
37 ms

