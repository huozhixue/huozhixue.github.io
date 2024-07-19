# 0258：各位相加


> <u>**[力扣第 258 题](https://leetcode.cn/problems/add-digits/)**</u>

## 题目

<p>给定一个非负整数 <code>num</code>，反复将各个位上的数字相加，直到结果为一位数。返回这个结果。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入:</strong> num =<strong> </strong><code>38</code>
<strong>输出:</strong> 2
<strong>解释: </strong>各位相加的过程为<strong>：
</strong>38 --&gt; 3 + 8 --&gt; 11
11 --&gt; 1 + 1 --&gt; 2
由于 <code>2</code> 是一位数，所以返回 2。
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入:</strong> num =<strong> </strong>0
<strong>输出:</strong> 0</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>0 &lt;= num &lt;= 2<sup>31</sup> - 1</code></li>
</ul>



<p><strong>进阶：</strong>你可以不使用循环或者递归，在 <code>O(1)</code> 时间复杂度内解决这个问题吗？</p>


**相似问题：**
- [0202：快乐数](/leetcode/0202)
- [1085：最小元素各数位之和（1256 分）](/leetcode/1085)
- [1945：字符串转化后的各位数字之和（1254 分）](/leetcode/1945)
- [2160：拆分数位后四位数字的最小和（1314 分）](/leetcode/2160)
- [2243：计算字符串的数字和（1301 分）](/leetcode/2243)
- [2535：数组元素和与数字和的绝对差（1222 分）](/leetcode/2535)
- [2544：交替数字和（1184 分）](/leetcode/2544)


## 分析

### #1

模拟即可

```python
class Solution:
    def addDigits(self, num: int) -> int:
        while num >= 10:
            num = sum(map(int,str(num)))
        return num
```
29 ms

### #2

由数学知识可知，一个数各位相加模 9 的余数等于该数模 9 的余数。

## 解答

```python
class Solution:
    def addDigits(self, num: int) -> int:
        return (num-1)%9+1 if num else 0
```
45 ms
