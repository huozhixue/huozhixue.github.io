# 0066：加一


> <u>**[力扣第 66 题](https://leetcode.cn/problems/plus-one/)**</u>

## 题目

<p>给定一个由 <strong>整数 </strong>组成的<strong> 非空</strong> 数组所表示的非负整数，在该数的基础上加一。</p>

<p>最高位数字存放在数组的首位， 数组中每个元素只存储<strong>单个</strong>数字。</p>

<p>你可以假设除了整数 0 之外，这个整数不会以零开头。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>digits = [1,2,3]
<strong>输出：</strong>[1,2,4]
<strong>解释：</strong>输入数组表示数字 123。
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>digits = [4,3,2,1]
<strong>输出：</strong>[4,3,2,2]
<strong>解释：</strong>输入数组表示数字 4321。
</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>digits = [0]
<strong>输出：</strong>[1]
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= digits.length <= 100</code></li>
<li><code>0 <= digits[i] <= 9</code></li>
</ul>


**相似问题：**
- [0043：字符串相乘](/leetcode/0043)
- [0067：二进制求和](/leetcode/0067)
- [0369：给单链表加一](/leetcode/0369)
- [0989：数组形式的整数加法（1234 分）](/leetcode/0989)
- [2571：将整数减少到零需要的最少操作数（1649 分）](/leetcode/2571)


## 分析

模拟进位加法即可，若最终还有进位，需要再加一位。

## 解答

```python
class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        res,c = [],1
        for x in digits[::-1]:
            c,r = divmod(x+c,10)
            res.append(r)
        if c:
            res.append(c)
        return res[::-1]
```
39 ms
