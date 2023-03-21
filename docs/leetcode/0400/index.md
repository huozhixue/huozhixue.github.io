# 0400：第 N 位数字（★）


> <u>**[力扣第 5 场周赛第 1 题](https://leetcode.cn/problems/nth-digit/)**</u>

## 题目

<p>给你一个整数 <code>n</code> ，请你在无限的整数序列 <code>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...]</code> 中找出并返回第 <code>n</code><em> </em>位上的数字。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 3
<strong>输出：</strong>3
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 11
<strong>输出：</strong>0
<strong>解释：</strong>第 11 位数字在序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... 里是 <strong>0 </strong>，它是 10 的一部分。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


## 分析

依次统计发现

    [1, 9]      共 1*9 位
    [10, 99]    共 2*90 位
    [100, 999]  共 3*900 位
    。。。
    
因此可以计算出第 n 位数字对应的是 几位数中的第几个。

## 解答

```python
def findNthDigit(self, n: int) -> int:
    x, y = 1, 9
    while n > x*y:
        n -= x*y
        x+=1
        y*=10
    q, r = divmod(n-1, x)
    ans = 10**(x-1)+q
    return int(str(ans)[r])
```
24 ms


