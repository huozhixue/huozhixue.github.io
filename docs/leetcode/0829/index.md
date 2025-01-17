# 0829：连续整数求和（1694 分）


> <u>**[力扣第 83 场周赛第 3 题](https://leetcode.cn/problems/consecutive-numbers-sum/)**</u>

## 题目

<p>给定一个正整数 <code>n</code>，返回 <em>连续正整数满足所有数字之和为 <code>n</code> 的组数</em> 。 </p>



<p><strong>示</strong><strong>例 1:</strong></p>

<pre>
<strong>输入: </strong>n = 5
<strong>输出: </strong>2
<strong>解释: </strong>5 = 2 + 3，共有两组连续整数([5],[2,3])求和后为 5。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong>n = 9
<strong>输出: </strong>3
<strong>解释: </strong>9 = 4 + 5 = 2 + 3 + 4</pre>

<p><strong>示例 3:</strong></p>

<pre>
<strong>输入: </strong>n = 15
<strong>输出: </strong>4
<strong>解释: </strong>15 = 8 + 7 = 4 + 5 + 6 = 1 + 2 + 3 + 4 + 5</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>1 &lt;= n &lt;= 10<sup>9</sup></code>​​​​​​​</li>
</ul>




## 分析

- 假设某组连续正整数的第一个数是 x，共有 k 个数，那么根据数学的求和公式有：

$$ N = \frac {(x+x+k-1)*k} 2 $$$$x = \frac {N-k*(k-1)/2} k $$
- 遍历 k ，判断 x 是否正整数即可

## 解答

```python
class Solution:
    def consecutiveNumbersSum(self, n: int) -> int:
        res,k = 1,1
        while n>k:
            n -= k
            k += 1
            res += n%k==0
        return res
```
56 ms

