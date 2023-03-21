# 0171：Excel 表列序号


> <u>**[力扣第 171 题](https://leetcode.cn/problems/excel-sheet-column-number/)**</u>

## 题目

<p>给你一个字符串 <code>columnTitle</code> ，表示 Excel 表格中的列名称。返回 <em>该列名称对应的列序号</em> 。</p>

<p>例如：</p>

<pre>
A -&gt; 1
B -&gt; 2
C -&gt; 3
...
Z -&gt; 26
AA -&gt; 27
AB -&gt; 28
...</pre>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> columnTitle = "A"
<strong>输出:</strong> 1
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong>columnTitle = "AB"
<strong>输出:</strong> 28
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入: </strong>columnTitle = "ZY"
<strong>输出:</strong> 701</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= columnTitle.length &lt;= 7</code></li>
<li><code>columnTitle</code> 仅由大写英文组成</li>
<li><code>columnTitle</code> 在范围 <code>["A", "FXSHRXW"]</code> 内</li>
</ul>


## 分析

类似 26 进制，只不过每一位的范围是 [1, 26] 而不是 [0, 25]。
 
## 解答

```python
def titleToNumber(self, columnTitle: str) -> int:
    res = 0
    for char in columnTitle:
        res = res * 26 + ord(char) - ord('A') + 1
    return res
```
36 ms

