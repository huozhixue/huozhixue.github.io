# 0556：下一个更大元素 III（★）


> <u>**[力扣第 556 题](https://leetcode.cn/problems/next-greater-element-iii/)**</u>

## 题目

<p>给你一个正整数 <code>n</code> ，请你找出符合条件的最小整数，其由重新排列 <code>n</code><strong> </strong>中存在的每位数字组成，并且其值大于 <code>n</code> 。如果不存在这样的正整数，则返回 <code>-1</code> 。</p>

<p><strong>注意</strong> ，返回的整数应当是一个 <strong>32 位整数</strong> ，如果存在满足题意的答案，但不是 <strong>32 位整数</strong> ，同样返回 <code>-1</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 12
<strong>输出：</strong>21
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 21
<strong>输出：</strong>-1
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>1 <= n <= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [0496：下一个更大元素 I](/leetcode/0496)
- [0503：下一个更大元素 II](/leetcode/0503)
- [1842：下个由相同数字构成的回文串](/leetcode/1842)


## 分析

- 类似 {{< lc "0031" >}}
- 注意超出范围时返回 -1

## 解答


```python
class Solution:
    def nextGreaterElement(self, n: int) -> int:
        A = list(str(n))
        m = len(A)
        i = m-2
        while i>=0 and A[i]>=A[i+1]:
            i -= 1
        if i<0:
            return -1
        j = m-1
        while A[j]<=A[i]:
            j -= 1
        A[i],A[j] = A[j],A[i]
        A[i+1:] = A[i+1:][::-1]
        res = int(''.join(A))
        return res if res<1<<31 else -1
```
38 ms
