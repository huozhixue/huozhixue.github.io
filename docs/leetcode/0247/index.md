# 0247：中心对称数 II（★）


> <u>**[力扣第 247 题](https://leetcode.cn/problems/strobogrammatic-number-ii/)**</u>

## 题目

<p>给定一个整数 <code>n</code> ，返回所有长度为 <code>n</code> 的 <strong>中心对称数</strong> 。你可以以 <strong>任何顺序</strong> 返回答案。</p>

<p><strong>中心对称数 </strong>是一个数字在旋转了 <code>180</code> 度之后看起来依旧相同的数字（或者上下颠倒地看）。</p>



<p><strong>示例 1:</strong></p>

<pre>
<b>输入：</b>n = 2
<b>输出：</b>["11","69","88","96"]
</pre>

<p><strong>示例 2:</strong></p>

<pre>
<b>输入：</b>n = 1
<b>输出：</b>["0","1","8"]</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 14</code></li>
</ul>


## 分析

可以按最外层的数字递归。

注意当 n>=2 时，最外层不能为 0。

## 解答

```python
def findStrobogrammatic(self, n: int) -> List[str]:
    res = ['0', '1', '8'] if n%2 else ['']
    for _ in range(n%2+2, n-1, 2):
        res = [a+sub+b for sub in res for a,b in zip('01689', '01986')]
    if n>=2:
        res = [a+sub+b for sub in res for a,b in zip('1689', '1986')]
    return res
```
36 ms
