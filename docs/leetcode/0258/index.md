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


## 分析

### #1

模拟即可。

```python
def addDigits(self, num: int) -> int:
    while num >= 10:
        num = sum(map(int, str(num)))
    return num
```

### #2

由数学知识可知，一个数各位相加模 9 的余数等于该数模 9 的余数。

注意排除 num 为 0 的情况。

## 解答

```python
def addDigits(self, num: int) -> int:
    return num%9 or min(num, 9)
```
32 ms
