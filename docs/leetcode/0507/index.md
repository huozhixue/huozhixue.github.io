# 0507：完美数


> <u>**[力扣第 507 题](https://leetcode.cn/problems/perfect-number/)**</u>

## 题目

<p>对于一个 <strong>正整数</strong>，如果它和除了它自身以外的所有 <strong>正因子</strong> 之和相等，我们称它为 <strong>「完美数」</strong>。</p>

<p>给定一个 <strong>整数 </strong><code>n</code>， 如果是完美数，返回 <code>true</code>；否则返回 <code>false</code>。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>num = 28
<strong>输出：</strong>true
<strong>解释：</strong>28 = 1 + 2 + 4 + 7 + 14
1, 2, 4, 7, 和 14 是 28 的所有正因子。</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>num = 7
<strong>输出：</strong>false
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 &lt;= num &lt;= 10<sup>8</sup></code></li>
</ul>


**相似问题：**
- [0728：自除数](/leetcode/0728)


## 分析

模拟即可。

## 解答

```python
class Solution:
    def checkPerfectNumber(self, num: int) -> bool:
        s = 0
        for x in range(1,isqrt(num)+1):
            if num%x==0:
                s += sum({x,num//x}-{num})
        return s==num
```

41 ms
