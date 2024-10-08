# 0592：分数加减运算（★）


> <u>**[力扣第 592 题](https://leetcode.cn/problems/fraction-addition-and-subtraction/)**</u>

## 题目

<p>给定一个表示分数加减运算的字符串 <code>expression</code> ，你需要返回一个字符串形式的计算结果。 </p>

<p>这个结果应该是不可约分的分数，即<a href="https://baike.baidu.com/item/%E6%9C%80%E7%AE%80%E5%88%86%E6%95%B0" target="_blank">最简分数</a>。 如果最终结果是一个整数，例如 <code>2</code>，你需要将它转换成分数形式，其分母为 <code>1</code>。所以在上述例子中, <code>2</code> 应该被转换为 <code>2/1</code>。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> <code>expression</code> = "-1/2+1/2"
<strong>输出:</strong> "0/1"
</pre>

<p><strong> 示例 2:</strong></p>

<pre>
<strong>输入:</strong> <code>expression</code> = "-1/2+1/2+1/3"
<strong>输出:</strong> "1/3"
</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入:</strong> <code>expression</code> = "1/3-1/2"
<strong>输出:</strong> "-1/6"
</pre>



<p><strong>提示:</strong></p>

<ul>
<li>输入和输出字符串只包含 <code>'0'</code> 到 <code>'9'</code> 的数字，以及 <code>'/'</code>, <code>'+'</code> 和 <code>'-'</code>。 </li>
<li>输入和输出分数格式均为 <code>±分子/分母</code>。如果输入的第一个分数或者输出的分数是正数，则 <code>'+'</code> 会被省略掉。</li>
<li>输入只包含合法的<strong>最简分数</strong>，每个分数的<strong>分子</strong>与<strong>分母</strong>的范围是  [1,10]。 如果分母是1，意味着这个分数实际上是一个整数。</li>
<li>输入的分数个数范围是 [1,10]。</li>
<li><strong>最终结果</strong>的分子与分母保证是 32 位整数范围内的有效整数。</li>
</ul>


**相似问题：**
- [0640：求解方程](/leetcode/0640)


## 分析

提取出每个分数计算即可。

## 解答


```python
class Solution:
    def fractionAddition(self, expression: str) -> str:
        from fractions import Fraction
        x = sum(map(Fraction, re.findall('-?\d+/\d+', expression)))
        return f'{x.numerator}/{x.denominator}'
```
45 ms
