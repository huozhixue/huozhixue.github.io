# 0013：罗马数字转整数


> <u>**[力扣第 13 题](https://leetcode.cn/problems/roman-to-integer/)**</u>

## 题目

<p>罗马数字包含以下七种字符: <code>I</code>， <code>V</code>， <code>X</code>， <code>L</code>，<code>C</code>，<code>D</code> 和 <code>M</code>。</p>

<pre>
<strong>字符</strong>          <strong>数值</strong>
I             1
V             5
X             10
L             50
C             100
D             500
M             1000</pre>

<p>例如， 罗马数字 <code>2</code> 写做 <code>II</code> ，即为两个并列的 1 。<code>12</code> 写做 <code>XII</code> ，即为 <code>X</code> + <code>II</code> 。 <code>27</code> 写做  <code>XXVII</code>, 即为 <code>XX</code> + <code>V</code> + <code>II</code> 。</p>

<p>通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 <code>IIII</code>，而是 <code>IV</code>。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 <code>IX</code>。这个特殊的规则只适用于以下六种情况：</p>

<ul>
<li><code>I</code> 可以放在 <code>V</code> (5) 和 <code>X</code> (10) 的左边，来表示 4 和 9。</li>
<li><code>X</code> 可以放在 <code>L</code> (50) 和 <code>C</code> (100) 的左边，来表示 40 和 90。 </li>
<li><code>C</code> 可以放在 <code>D</code> (500) 和 <code>M</code> (1000) 的左边，来表示 400 和 900。</li>
</ul>

<p>给定一个罗马数字，将其转换成整数。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> s = "III"
<strong>输出:</strong> 3</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> s = "IV"
<strong>输出:</strong> 4</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> s = "IX"
<strong>输出:</strong> 9</pre>

<p><strong>示例 4:</strong></p>

<pre>
<strong>输入:</strong> s = "LVIII"
<strong>输出:</strong> 58
<strong>解释:</strong> L = 50, V= 5, III = 3.
</pre>

<p><strong>示例 5:</strong></p>

<pre>
<strong>输入:</strong> s = "MCMXCIV"
<strong>输出:</strong> 1994
<strong>解释:</strong> M = 1000, CM = 900, XC = 90, IV = 4.</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 15</code></li>
<li><code>s</code> 仅含字符 <code>('I', 'V', 'X', 'L', 'C', 'D', 'M')</code></li>
<li>题目数据保证 <code>s</code> 是一个有效的罗马数字，且表示整数在范围 <code>[1, 3999]</code> 内</li>
<li>题目所给测试用例皆符合罗马数字书写规则，不会出现跨位等情况。</li>
<li>IL 和 IM 这样的例子并不符合题目要求，49 应该写作 XLIX，999 应该写作 CMXCIX 。</li>
<li>关于罗马数字的详尽书写规则，可以参考 <a href="https://baike.baidu.com/item/%E7%BD%97%E9%A9%AC%E6%95%B0%E5%AD%97/772296">罗马数字 - 百度百科</a>。</li>
</ul>


**相似问题：**
- [0012：整数转罗马数字](/leetcode/0012)


## 分析

观察发现，如果小数字放在大数字左边，则小数字代表负数，遍历求和即可。

## 解答

```python
class Solution:
    def romanToInt(self, s: str) -> int:
        d = dict(zip('IVXLCDM',[1,5,10,50,100,500,1000]))
        return sum(-d[a] if d[a]<d[b] else d[a] for a,b in pairwise(s+'I'))
```
43 ms
