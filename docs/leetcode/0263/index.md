# 0263：丑数


> <u>**[力扣第 263 题](https://leetcode.cn/problems/ugly-number/)**</u>

## 题目

<p><strong>丑数 </strong>就是只包含质因数 <code>2</code>、<code>3</code> 和 <code>5</code> 的正整数。</p>

<p>给你一个整数 <code>n</code> ，请你判断 <code>n</code> 是否为 <strong>丑数</strong> 。如果是，返回 <code>true</code> ；否则，返回 <code>false</code> 。</p>



<p><strong>示例 1：</strong></p>

<pre>
<strong>输入：</strong>n = 6
<strong>输出：</strong>true
<strong>解释：</strong>6 = 2 × 3</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>n = 1
<strong>输出：</strong>true
<strong>解释：</strong>1 没有质因数，因此它的全部质因数是 {2, 3, 5} 的空集。习惯上将其视作第一个丑数。</pre>

<p><strong>示例 3：</strong></p>

<pre>
<strong>输入：</strong>n = 14
<strong>输出：</strong>false
<strong>解释：</strong>14 不是丑数，因为它包含了另外一个质因数 <code>7 </code>。
</pre>



<p><strong>提示：</strong></p>

<ul>
<li><code>-2<sup>31</sup> &lt;= n &lt;= 2<sup>31</sup> - 1</code></li>
</ul>


**相似问题：**
- [0202：快乐数](/leetcode/0202)
- [0204：计数质数](/leetcode/0204)
- [0264：丑数 II](/leetcode/0264)


## 分析


去掉所有 2、3、5 的因子，看是否变为 1 即可。

## 解答

```python
class Solution:
    def isUgly(self, n: int) -> bool:
        if n<=0:
            return False
        for p in [2,3,5]:
            while n%p==0:
                n//=p
        return n==1
```
32 ms
