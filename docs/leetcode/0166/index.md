# 0166：分数到小数（★）


> <u>**[力扣第 166 题](https://leetcode.cn/problems/fraction-to-recurring-decimal/)**</u>

## 题目

<p>给定两个整数，分别表示分数的分子 <code>numerator</code> 和分母 <code>denominator</code>，以 <strong>字符串形式返回小数</strong> 。</p>

<p>如果小数部分为循环小数，则将循环的部分括在括号内。</p>

<p>如果存在多个答案，只需返回 <strong>任意一个</strong> 。</p>

<p>对于所有给定的输入，<strong>保证</strong> 答案字符串的长度小于 <code>10<sup>4</sup></code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>numerator = 1, denominator = 2
<strong>输出：</strong>"0.5"
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>numerator = 2, denominator = 1
<strong>输出：</strong>"2"
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>numerator = 4, denominator = 333
<strong>输出：</strong>"0.(012)"
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-2<sup>31</sup> &lt;= numerator, denominator &lt;= 2<sup>31</sup> - 1</code></li>
<li><code>denominator != 0</code></li>
</ul>


## 分析

模拟除法，用哈希表检测循环即可。注意边界条件较多：
- 转为两个非负数相除，并判断是否加上负号
- 若能整除，直接返回商，没有小数点
- 若不能整除，加上小数点，每轮相除，添加商
	- 若除得尽，直接返回
	- 若除不尽，用哈希表找到循环起点，添加括号即可
 
## 解答

```python
def fractionToDecimal(self, numerator: int, denominator: int) -> str:
    res = '' if numerator*denominator >= 0 else '-'
    m, n = abs(numerator), abs(denominator)
    q, r = divmod(m, n)
    res += str(q)
    if r == 0:
        return res
    res += '.'
    d = {}
    while True:
        d[r] = len(res)
        q, r = divmod(r*10, n)
        res += str(q)
        if r == 0:
            return res
        if r in d:
            i = d[r]
            return res[:i] + '(' + res[i:] + ')'
```
24 ms



