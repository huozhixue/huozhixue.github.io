# 0343：整数拆分（★）


> <u>**[力扣第 343 题](https://leetcode.cn/problems/integer-break/)**</u>

## 题目

<p>给定一个正整数 <code>n</code> ，将其拆分为 <code>k</code> 个 <strong>正整数</strong> 的和（ <code>k &gt;= 2</code> ），并使这些整数的乘积最大化。</p>

<p>返回 <em>你可以获得的最大乘积</em> 。</p>



<p><strong>示例 1:</strong></p>

<pre>
<strong>输入: </strong>n = 2
<strong>输出: </strong>1
<strong>解释: </strong>2 = 1 + 1, 1 × 1 = 1。</pre>

<p><strong>示例 2:</strong></p>

<pre>
<strong>输入: </strong>n = 10
<strong>输出: </strong>36
<strong>解释: </strong>10 = 3 + 3 + 4, 3 × 3 × 4 = 36。</pre>



<p><strong>提示:</strong></p>

<ul>
<li><code>2 &lt;= n &lt;= 58</code></li>
</ul>


## 分析

### #1

可以按最后一个拆分的数递推。注意 2 和 3 的特殊性。

```python
class Solution:
    def integerBreak(self, n: int) -> int:
        f = list(range(n+1))
        for i in range(2,n+1):
            f[i] = max(f[i],max(f[j]*f[i-j] for j in range(1,i)))
        return f[-1] if n>=4 else n-1
```
41 ms

### #2

还可以利用数学知识：
- 假如拆分出的某个数 x>=4
	- 那么将 x 拆为 2 和 x-2，2*(x-2)>=x，乘积不变或增大
- 因此必然存在最佳方案，拆出的数都是 2 或 3
- 3 个 2 换成 2 个 3，乘积更大，因此优先拆 3
- 根据 n%3 的值，即可确定最佳方案：
	- n%3 == 0 时，全拆为 3
	- n%3 == 1 时，拆为 2 个 2，剩下的都为 3 
	- n%3 == 2 时，拆为 1 个 2，剩下的都为 3 

## 解答

```python
class Solution:
    def integerBreak(self, n: int) -> int:
        if n<4:
            return n-1
        q,r = divmod(n,3)
        return pow(3,q-1)*4 if r==1 else pow(3,q)*(1+(r==2))
```
23 ms
