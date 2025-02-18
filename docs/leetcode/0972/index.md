# 0972：相等的有理数（2121 分）


> <u>**[力扣第 118 场周赛第 4 题](https://leetcode.cn/problems/equal-rational-numbers/)**</u>

## 题目

<p>给定两个字符串 <code>s</code> 和 <code>t</code> ，每个字符串代表一个非负有理数，只有当它们表示相同的数字时才返回 <code>true</code> 。字符串中可以使用括号来表示有理数的重复部分。</p>

<p><strong>有理数</strong> 最多可以用三个部分来表示：<em>整数部分</em> <code>&lt;IntegerPart&gt;</code>、<em>小数非重复部分</em> <code>&lt;NonRepeatingPart&gt;</code> 和<em>小数重复部分</em> <code>&lt;(&gt;&lt;RepeatingPart&gt;&lt;)&gt;</code>。数字可以用以下三种方法之一来表示：</p>

<ul>
<li><code>&lt;IntegerPart&gt;</code>

<ul>
<li>例： <code>0</code> ,<code>12</code> 和 <code>123</code> </li>
</ul>
</li>
<li><code>&lt;IntegerPart&gt;&lt;.&gt;&lt;NonRepeatingPart&gt;</code>
<ul>
<li>例： <code>0.5<font color="#333333"><font face="Helvetica Neue, Helvetica, Arial, sans-serif"><span style="font-size:14px"><span style="background-color:#ffffff"> , </span></span></font></font></code><font color="#333333"><font face="Helvetica Neue, Helvetica, Arial, sans-serif"><span style="font-size:14px"><span style="background-color:#ffffff"><code>1.</code> , </span></span></font></font><code>2.12</code> 和 <code>123.0001</code></li>
</ul>
</li>
<li><code>&lt;IntegerPart&gt;&lt;.&gt;&lt;NonRepeatingPart&gt;&lt;(&gt;&lt;RepeatingPart&gt;&lt;)&gt;</code>
<ul>
<li>例： <code>0.1(6)</code> ， <code>1.(9)</code>， <code>123.00(1212)</code></li>
</ul>
</li>
</ul>

<p>十进制展开的重复部分通常在一对圆括号内表示。例如：</p>

<ul>
<li><code>1 / 6 = 0.16666666... = 0.1(6) = 0.1666(6) = 0.166(66)</code></li>
</ul>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>s = "0.(52)", t = "0.5(25)"
<strong>输出：</strong>true
<strong>解释：</strong>因为 "0.(52)" 代表 0.52525252...，而 "0.5(25)" 代表 0.52525252525.....，则这两个字符串表示相同的数字。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>s = "0.1666(6)", t = "0.166(66)"
<strong>输出：</strong>true
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>s = "0.9(9)", t = "1."
<strong>输出：</strong>true
<strong>解释：</strong>"0.9(9)" 代表 0.999999999... 永远重复，等于 1 。[<a href="https://baike.baidu.com/item/0.999…/5615429?fr=aladdin" target="_blank">有关说明，请参阅此链接</a>]
"1." 表示数字 1，其格式正确：(IntegerPart) = "1" 且 (NonRepeatingPart) = "" 。</pre>



<p><strong>提示：</strong></p>

<ul>
<li>每个部分仅由数字组成。</li>
<li>整数部分 <code>&lt;IntegerPart&gt;</code> 不会以零开头。（零本身除外）</li>
<li><code>1 &lt;= &lt;IntegerPart&gt;.length &lt;= 4 </code></li>
<li><code>0 &lt;= &lt;NonRepeatingPart&gt;.length &lt;= 4 </code></li>
<li><code>1 &lt;= &lt;RepeatingPart&gt;.length &lt;= 4 </code></li>
</ul>
<span style="display:block"><span style="height:0px"><span style="position:absolute">​​​​​</span></span></span>



## 分析

转为分数比较即可
- 先提取出三部分，整数 a，小数非重复 b，小数重复 c
- a 分母取1，b 分母取 10^len(b)
- c 根据等比公式，分母取 10^len(b)*(10^len(c)-1)

## 解答


```python
class Solution:
    def isRationalEqual(self, s: str, t: str) -> bool:
        from fractions import Fraction
        def cal(s):
            if '.' not in s:
                return Fraction(int(s),1)
            a,b = s.split('.')
            res = Fraction(int(a),1)
            if '(' not in b:
                res += Fraction(int(b),10**len(b)) if b else 0
                return res
            b,c = b[:-1].split('(')
            res += Fraction(int(b),10**len(b)) if b else 0
            res += Fraction(int(c),(10**len(c)-1)*10**len(b))
            return res
        return cal(s)==cal(t)
```
0 ms
